import React from 'react';
import Icon from '../../../components/AppIcon';

const LevelHeader = ({ currentLevel, totalLevels, levelProgress }) => {
  return (
    <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg border border-primary/30 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 md:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Trophy" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-foreground">
                Level {currentLevel}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                of {totalLevels} levels
              </p>
            </div>
          </div>

          <p className="text-sm md:text-base text-foreground mt-3 md:mt-4">
            Master PHP syntax through interactive coding challenges
          </p>
        </div>

        <div className="w-full lg:w-80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs md:text-sm text-muted-foreground">
              Level Progress
            </span>
            <span className="text-xs md:text-sm font-mono font-semibold text-primary">
              {levelProgress}%
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Complete all challenges to advance to Level {currentLevel + 1}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LevelHeader;