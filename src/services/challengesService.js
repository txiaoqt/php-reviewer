import { supabase } from '../lib/supabase';

export class ChallengesService {
  // Create a new challenge
  static async createChallenge(challengeData) {
    const { data, error } = await supabase
      .from('challenges')
      .insert([{
        title: challengeData.title,
        description: challengeData.description,
        challenge_type: challengeData.challengeType || 'coding',
        difficulty: challengeData.difficulty || 'medium',
        max_participants: challengeData.maxParticipants || 10,
        time_limit_minutes: challengeData.timeLimitMinutes || 30,
        starts_at: challengeData.startsAt,
        ends_at: challengeData.endsAt,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get all active challenges
  static async getActiveChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select(`
        *,
        creator:user_profiles!challenges_creator_id_fkey(username, full_name),
        challenge_participants(count)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Get challenges created by current user
  static async getMyChallenges() {
    const { data, error } = await supabase
      .from('challenges')
      .select(`
        *,
        challenge_participants(count)
      `)
      .eq('creator_id', (await supabase.auth.getUser()).data.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Join a challenge
  static async joinChallenge(challengeId) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('challenge_participants')
      .insert([{
        challenge_id: challengeId,
        user_id: user.id,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Get challenge details with participants
  static async getChallengeDetails(challengeId) {
    const { data, error } = await supabase
      .from('challenges')
      .select(`
        *,
        creator:user_profiles!challenges_creator_id_fkey(username, full_name),
        challenge_participants(
          id,
          joined_at,
          status,
          score,
          time_taken_seconds,
          completed_at,
          user:user_profiles(username, full_name)
        ),
        challenge_questions(
          id,
          question_text,
          question_type,
          options,
          points,
          time_limit_seconds,
          order_position
        )
      `)
      .eq('id', challengeId)
      .single();

    if (error) throw error;
    return data;
  }

  // Add questions to a challenge
  static async addQuestionsToChallenge(challengeId, questions) {
    const questionsData = questions.map((q, index) => ({
      challenge_id: challengeId,
      question_text: q.text,
      question_type: q.type || 'coding',
      correct_answer: q.correctAnswer,
      options: q.options,
      points: q.points || 10,
      time_limit_seconds: q.timeLimitSeconds,
      order_position: index + 1,
    }));

    const { data, error } = await supabase
      .from('challenge_questions')
      .insert(questionsData)
      .select();

    if (error) throw error;
    return data;
  }

  // Submit an answer for a question
  static async submitAnswer(challengeId, questionId, submissionText) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get participant record
    const { data: participant, error: participantError } = await supabase
      .from('challenge_participants')
      .select('id')
      .eq('challenge_id', challengeId)
      .eq('user_id', user.id)
      .single();

    if (participantError) throw participantError;

    // Get question details to check answer
    const { data: question, error: questionError } = await supabase
      .from('challenge_questions')
      .select('*')
      .eq('id', questionId)
      .single();

    if (questionError) throw questionError;

    const isCorrect = submissionText.trim().toLowerCase() === question.correct_answer?.trim().toLowerCase();
    const pointsEarned = isCorrect ? question.points : 0;

    // Insert or update submission
    const { data, error } = await supabase
      .from('challenge_submissions')
      .upsert({
        challenge_id: challengeId,
        participant_id: participant.id,
        question_id: questionId,
        submission_text: submissionText,
        is_correct: isCorrect,
        points_earned: pointsEarned,
      }, {
        onConflict: 'participant_id,question_id'
      })
      .select()
      .single();

    if (error) throw error;

    // Update participant score
    await this.updateParticipantScore(participant.id);

    return data;
  }

  // Update participant score
  static async updateParticipantScore(participantId) {
    // Calculate total score from submissions
    const { data: submissions, error: submissionsError } = await supabase
      .from('challenge_submissions')
      .select('points_earned')
      .eq('participant_id', participantId);

    if (submissionsError) throw submissionsError;

    const totalScore = submissions.reduce((sum, sub) => sum + sub.points_earned, 0);

    const { error } = await supabase
      .from('challenge_participants')
      .update({ score: totalScore })
      .eq('id', participantId);

    if (error) throw error;
  }

  // Get leaderboard
  static async getLeaderboard(period = 'all_time', limit = 50) {
    let query = supabase
      .from('leaderboards')
      .select(`
        *,
        user:user_profiles(username, full_name)
      `)
      .eq('period', period)
      .order('rank_position', { ascending: true })
      .limit(limit);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  // Update leaderboard for a user
  static async updateLeaderboard(userId, score, challengeId = null) {
    const periods = ['daily', 'weekly', 'monthly', 'all_time'];

    for (const period of periods) {
      const { error } = await supabase
        .from('leaderboards')
        .upsert({
          user_id: userId,
          challenge_id: challengeId,
          score: score,
          period: period,
        }, {
          onConflict: 'user_id,period'
        });

      if (error) throw error;
    }
  }

  // Real-time subscription for challenge updates
  static subscribeToChallenge(challengeId, callback) {
    return supabase
      .channel(`challenge-${challengeId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenge_participants',
          filter: `challenge_id=eq.${challengeId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenge_submissions',
          filter: `challenge_id=eq.${challengeId}`,
        },
        callback
      )
      .subscribe();
  }

  // Get user profile
  static async getUserProfile(userId = null) {
    const targetUserId = userId || (await supabase.auth.getUser()).data.user.id;

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', targetUserId)
      .single();

    if (error) throw error;
    return data;
  }

  // Update user profile
  static async updateUserProfile(profileData) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
