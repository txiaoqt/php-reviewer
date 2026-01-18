import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressMap = ({ challenges, onChallengeSelect, currentChallengeId }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
      case 'intermediate':
        return 'bg-amber-500/20 border-amber-500 text-amber-400';
      case 'advanced':
        return 'bg-red-500/20 border-red-500 text-red-400';
      default:
        return 'bg-slate-500/20 border-slate-500 text-slate-400';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'CircleDot';
      case 'intermediate':
        return 'Circle';
      case 'advanced':
        return 'Hexagon';
      default:
        return 'Circle';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle2', color: 'var(--color-success)' };
      case 'current':
        return { name: 'PlayCircle', color: 'var(--color-primary)' };
      case 'locked':
        return { name: 'Lock', color: 'var(--color-muted-foreground)' };
      default:
        return { name: 'Circle', color: 'var(--color-muted-foreground)' };
    }
  };

  return (
    <div className="space-y-3">
      {challenges?.map((challenge, index) => {
        const statusIcon = getStatusIcon(challenge?.status);
        const isClickable = challenge?.status !== 'locked';
        const isActive = currentChallengeId === challenge?.id;

        return (
          <div
            key={challenge?.id}
            className={`relative bg-card rounded-lg border transition-all duration-300 ${
              isActive
                ? 'border-primary shadow-lg shadow-primary/20'
                : challenge?.status === 'completed' ?'border-success/50' :'border-border'
            } ${
              isClickable
                ? 'cursor-pointer hover:border-primary/50 hover:shadow-md'
                : 'opacity-60 cursor-not-allowed'
            }`}
            onClick={() => isClickable && onChallengeSelect(challenge)}
          >
            <div className="p-4 md:p-5 lg:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                      challenge?.status === 'completed'
                        ? 'bg-success/20'
                        : challenge?.status === 'current' ?'bg-primary/20' :'bg-muted'
                    }`}
                  >
                    <Icon
                      name={statusIcon?.name}
                      size={20}
                      color={statusIcon?.color}
                    />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono font-semibold text-base md:text-lg text-foreground mb-1 truncate">
                        {challenge?.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground line-clamp-2">
                        {challenge?.description}
                      </p>
                    </div>
                    {isClickable && (
                      <Icon
                        name="ChevronRight"
                        size={20}
                        color="var(--color-muted-foreground)"
                        className="flex-shrink-0"
                      />
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3">
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs md:text-sm font-medium ${getDifficultyColor(
                        challenge?.difficulty
                      )}`}
                    >
                      <Icon
                        name={getDifficultyIcon(challenge?.difficulty)}
                        size={14}
                      />
                      <span className="capitalize">{challenge?.difficulty}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs md:text-sm text-foreground">
                      <Icon
                        name="BookOpen"
                        size={14}
                        color="var(--color-primary)"
                      />
                      <span>{challenge?.topic}</span>
                    </div>

                    {challenge?.status === 'completed' && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/20 text-xs md:text-sm text-success">
                        <Icon name="Star" size={14} />
                        <span>{challenge?.accuracy}%</span>
                      </div>
                    )}

                    {challenge?.timeSpent && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs md:text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>{challenge?.timeSpent}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {index < challenges?.length - 1 && (
              <div className="absolute left-8 md:left-10 -bottom-3 w-0.5 h-3 bg-border" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressMap;