import React from 'react';
import { Users, Clock, Target, Trophy, Crown } from 'lucide-react';
import { ChallengesService } from '../services/challengesService';
import Button from './ui/Button';

const ChallengeCard = ({ challenge, onJoinChallenge, currentUserId }) => {
  const isCreator = challenge.creator_id === currentUserId;
  const isParticipant = challenge.challenge_participants?.some(p => p.user_id === currentUserId);
  const participantCount = challenge.challenge_participants?.length || 0;

  const handleJoinChallenge = async () => {
    try {
      await ChallengesService.joinChallenge(challenge.id);
      onJoinChallenge?.(challenge.id);
    } catch (error) {
      console.error('Error joining challenge:', error);
      // You might want to show an error toast here
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeLimit = (minutes) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {challenge.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {challenge.description}
          </p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{participantCount}/{challenge.max_participants}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{formatTimeLimit(challenge.time_limit_minutes)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Target size={16} />
          <span>{challenge.challenge_type}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          by {challenge.creator?.username || 'Anonymous'}
          {isCreator && <Crown size={14} className="inline ml-1 text-yellow-500" />}
        </div>

        {!isCreator && !isParticipant && participantCount < challenge.max_participants && (
          <Button
            size="sm"
            onClick={handleJoinChallenge}
            className="flex items-center gap-2"
          >
            <Trophy size={16} />
            Join Challenge
          </Button>
        )}

        {isParticipant && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex items-center gap-2"
          >
            <Trophy size={16} />
            Joined
          </Button>
        )}

        {participantCount >= challenge.max_participants && !isParticipant && (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex items-center gap-2"
          >
            Full
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
