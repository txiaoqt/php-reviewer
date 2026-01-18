import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const ProgressHeader = ({ 
  isMinimal = false,
  currentLevel = 1,
  totalLevels = 10,
  currentChallenge = 1,
  totalChallenges = 15,
  accuracy = 85,
  streak = 7
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const progressPercentage = (currentChallenge / totalChallenges) * 100;
  const isEditorPage = location?.pathname === '/code-challenge-editor';

  useEffect(() => {
    setIsExpanded(false);
  }, [location?.pathname]);

  const handleLogoClick = () => {
    // Force navigation to landing page
    window.location.href = '/';
  };

  const handleProgressClick = () => {
    if (isEditorPage) {
      setIsExpanded(!isExpanded);
    }
  };

  if (isMinimal) {
    return (
      <header className="progress-header-minimal">
        <div className="progress-header-content">
          <div 
            className="progress-header-logo cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="progress-header-logo-icon">
              <Icon name="Code2" size={20} color="var(--color-primary-foreground)" />
            </div>
            <span className="font-mono font-semibold text-lg text-foreground">CodeFill</span>
          </div>

          <div className="flex items-center gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <span className="caption text-muted-foreground">Level {currentLevel}</span>
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pb-4 border-t border-border pt-4 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <span className="caption text-muted-foreground mb-1">Progress</span>
                <span className="font-mono font-semibold text-foreground">
                  {currentChallenge}/{totalChallenges}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="caption text-muted-foreground mb-1">Accuracy</span>
                <span className="font-mono font-semibold text-success">{accuracy}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="caption text-muted-foreground mb-1">Streak</span>
                <div className="flex items-center gap-1">
                  <Icon name="Flame" size={16} color="var(--color-warning)" />
                  <span className="font-mono font-semibold text-warning">{streak}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="progress-header">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="progress-header-logo cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="progress-header-logo-icon">
              <Icon name="Code2" size={24} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-xl text-foreground">CodeFill</span>
              <span className="caption text-muted-foreground">Master PHP Through Practice</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="caption text-muted-foreground">Level {currentLevel} of {totalLevels}</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <span className="caption text-foreground font-medium">
                    {currentChallenge}/{totalChallenges}
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-border" />

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Icon name="Target" size={18} color="var(--color-success)" />
                  <span className="caption text-success font-medium">{accuracy}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon name="Flame" size={18} color="var(--color-warning)" />
                  <span className="caption text-warning font-medium">{streak} days</span>
                </div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/level-progress-dashboard')}
            >
              <Icon name="LayoutDashboard" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProgressHeader;
