-- Create challenges table
CREATE TABLE challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_type VARCHAR(50) NOT NULL DEFAULT 'coding', -- coding, quiz, etc.
  difficulty VARCHAR(20) NOT NULL DEFAULT 'medium', -- easy, medium, hard
  max_participants INTEGER DEFAULT 10,
  time_limit_minutes INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  starts_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE
);

-- Create challenge_participants table
CREATE TABLE challenge_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'joined', -- joined, started, completed, forfeited
  score INTEGER DEFAULT 0,
  time_taken_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(challenge_id, user_id)
);

-- Create challenge_questions table (for coding challenges)
CREATE TABLE challenge_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL DEFAULT 'coding', -- coding, multiple_choice, etc.
  correct_answer TEXT,
  options JSONB, -- for multiple choice questions
  points INTEGER DEFAULT 10,
  time_limit_seconds INTEGER,
  order_position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create challenge_submissions table
CREATE TABLE challenge_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  participant_id UUID NOT NULL REFERENCES challenge_participants(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES challenge_questions(id) ON DELETE CASCADE,
  submission_text TEXT,
  is_correct BOOLEAN DEFAULT false,
  points_earned INTEGER DEFAULT 0,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(participant_id, question_id)
);

-- Create user_profiles table (extends auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  total_score INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  challenges_won INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboards table
CREATE TABLE leaderboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE SET NULL,
  score INTEGER NOT NULL,
  rank_position INTEGER,
  period VARCHAR(20) NOT NULL DEFAULT 'all_time', -- daily, weekly, monthly, all_time
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;

-- RLS Policies for challenges
CREATE POLICY "Anyone can view active challenges" ON challenges
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can create challenges" ON challenges
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Creators can update their challenges" ON challenges
  FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for challenge_participants
CREATE POLICY "Users can view participants in their challenges" ON challenge_participants
  FOR SELECT USING (
    auth.uid() IN (
      SELECT creator_id FROM challenges WHERE id = challenge_participants.challenge_id
      UNION
      SELECT user_id FROM challenge_participants cp WHERE cp.challenge_id = challenge_participants.challenge_id
    )
  );

CREATE POLICY "Users can join challenges" ON challenge_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" ON challenge_participants
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for challenge_questions
CREATE POLICY "Participants can view questions in their challenges" ON challenge_questions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT cp.user_id FROM challenge_participants cp WHERE cp.challenge_id = challenge_questions.challenge_id
    )
  );

CREATE POLICY "Creators can manage questions" ON challenge_questions
  FOR ALL USING (
    auth.uid() IN (
      SELECT creator_id FROM challenges WHERE id = challenge_id
    )
  );

-- RLS Policies for challenge_submissions
CREATE POLICY "Users can view submissions in their challenges" ON challenge_submissions
  FOR SELECT USING (
    auth.uid() IN (
      SELECT cp.user_id FROM challenge_participants cp WHERE cp.challenge_id = challenge_submissions.challenge_id
    )
  );

CREATE POLICY "Users can submit their own answers" ON challenge_submissions
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT cp.user_id FROM challenge_participants cp WHERE cp.id = participant_id
    )
  );

CREATE POLICY "Users can update their own submissions" ON challenge_submissions
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT cp.user_id FROM challenge_participants cp WHERE cp.id = participant_id
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view all profiles" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for leaderboards
CREATE POLICY "Anyone can view leaderboards" ON leaderboards
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_challenges_creator ON challenges(creator_id);
CREATE INDEX idx_challenges_active ON challenges(is_active);
CREATE INDEX idx_challenge_participants_challenge ON challenge_participants(challenge_id);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id);
CREATE INDEX idx_challenge_questions_challenge ON challenge_questions(challenge_id);
CREATE INDEX idx_challenge_submissions_participant ON challenge_submissions(participant_id);
CREATE INDEX idx_challenge_submissions_question ON challenge_submissions(question_id);
CREATE INDEX idx_user_profiles_username ON user_profiles(username);
CREATE INDEX idx_leaderboards_user ON leaderboards(user_id);
CREATE INDEX idx_leaderboards_period ON leaderboards(period);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, username, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION create_user_profile();

-- Function to update leaderboard ranks
CREATE OR REPLACE FUNCTION update_leaderboard_ranks()
RETURNS TRIGGER AS $$
BEGIN
  -- Update ranks for the affected period
  WITH ranked_scores AS (
    SELECT
      id,
      ROW_NUMBER() OVER (ORDER BY score DESC, created_at ASC) as new_rank
    FROM leaderboards
    WHERE period = COALESCE(NEW.period, OLD.period)
  )
  UPDATE leaderboards
  SET rank_position = ranked_scores.new_rank
  FROM ranked_scores
  WHERE leaderboards.id = ranked_scores.id;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ranks when scores change
CREATE TRIGGER update_ranks_on_score_change
  AFTER INSERT OR UPDATE OF score ON leaderboards
  FOR EACH ROW EXECUTE FUNCTION update_leaderboard_ranks();
