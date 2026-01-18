import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressIndicators = ({ 
  currentChallenge = 3,
  totalChallenges = 15,
  currentLevel = 1,
  hintsUsed = 1,
  streak = 7
}) => {
  const progressPercentage = (currentChallenge / totalChallenges) * 100;
  const completedChallenges = Array.from({ length: currentChallenge }, (_, i) => i);
  const remainingChallenges = Array.from({ length: totalChallenges - currentChallenge }, (_, i) => i);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mt-8 md:mt-10 lg:mt-12"
    >
      <div className="bg-card/80 backdrop-blur-md rounded-xl border border-border p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-4 md:mb-5 lg:mb-6">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
            Your Progress
          </h3>
          <div className="flex items-center gap-2 bg-primary/20 rounded-full px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5">
            <Icon name="Award" size={18} color="var(--color-primary)" />
            <span className="caption font-semibold text-primary">Level {currentLevel}</span>
          </div>
        </div>

        <div className="space-y-6 md:space-y-7 lg:space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Challenge Progress
              </span>
              <span className="text-sm md:text-base lg:text-lg font-mono font-semibold text-foreground">
                {currentChallenge}/{totalChallenges}
              </span>
            </div>
            <div className="h-3 md:h-4 lg:h-5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 1.3 }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
            
            <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 mt-4 md:mt-5 lg:mt-6 flex-wrap">
              {completedChallenges?.map((_, index) => (
                <motion.div
                  key={`completed-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 + (index * 0.05) }}
                  className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-success flex items-center justify-center"
                >
                  <Icon name="Check" size={14} color="var(--color-success-foreground)" />
                </motion.div>
              ))}
              {remainingChallenges?.map((_, index) => (
                <div
                  key={`remaining-${index}`}
                  className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-muted border border-border"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            <div className="bg-muted/50 rounded-lg p-4 md:p-5 lg:p-6 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
                <span className="caption text-muted-foreground">Hints Used</span>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-warning font-mono">
                {hintsUsed}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 md:p-5 lg:p-6 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon name="Flame" size={20} color="var(--color-error)" />
                <span className="caption text-muted-foreground">Day Streak</span>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-error font-mono">
                {streak}
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 md:p-5 lg:p-6 border border-border text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Icon name="Trophy" size={20} color="var(--color-accent)" />
                <span className="caption text-muted-foreground">Completed</span>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent font-mono">
                {currentChallenge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressIndicators;