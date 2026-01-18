import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-mono font-semibold text-foreground">
          Achievements
        </h2>
        <span className="text-sm md:text-base text-muted-foreground">
          {achievements?.filter((a) => a?.unlocked)?.length} / {achievements?.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative rounded-lg border p-3 md:p-4 text-center transition-all duration-300 ${
              achievement?.unlocked
                ? 'bg-card border-primary shadow-lg shadow-primary/20 hover:scale-105'
                : 'bg-muted border-border opacity-50'
            }`}
          >
            <div
              className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-2 md:mb-3 rounded-full flex items-center justify-center ${
                achievement?.unlocked
                  ? 'bg-primary/20' :'bg-muted-foreground/20'
              }`}
            >
              <Icon
                name={achievement?.icon}
                size={24}
                color={
                  achievement?.unlocked
                    ? 'var(--color-primary)'
                    : 'var(--color-muted-foreground)'
                }
              />
            </div>

            <h3
              className={`text-xs md:text-sm font-medium mb-1 ${
                achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {achievement?.name}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2">
              {achievement?.description}
            </p>

            {achievement?.unlocked && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
                <Icon name="Check" size={14} color="white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;