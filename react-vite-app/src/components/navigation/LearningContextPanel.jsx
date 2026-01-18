import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from '../ui/Button';

const LearningContextPanel = ({
  isOpen = false,
  onClose = () => {},
  position = 'right',
  content = 'hints'
}) => {
  const [activeTab, setActiveTab] = useState(content);

  const positionClass = position === 'bottom' ?'learning-context-panel-bottom' :'learning-context-panel-right';

  const mockHints = [
    {
      id: 1,
      level: 1,
      text: 'Start by declaring a variable using the $ symbol',
      scrambledWords: ['$variable', 'echo', 'string'],
      revealed: false
    },
    {
      id: 2,
      level: 2,
      text: 'Use the echo statement to output your variable',
      scrambledWords: ['echo', '$variable', ';'],
      revealed: false
    },
    {
      id: 3,
      level: 3,
      text: 'Remember to end your statement with a semicolon',
      scrambledWords: [';', 'statement', 'end'],
      revealed: false
    }
  ];

  const mockExplanations = [
    {
      id: 1,
      title: 'PHP Variables',
      content: 'Variables in PHP start with the $ symbol followed by the variable name. Variable names are case-sensitive.',
      codeExample: '$name = "John";\n$age = 25;'
    },
    {
      id: 2,
      title: 'Echo Statement',
      content: 'The echo statement is used to output data to the screen. You can output strings, variables, and expressions.',
      codeExample: 'echo "Hello World";\necho $name;'
    }
  ];

  const mockProgress = {
    totalChallenges: 15,
    completed: 8,
    accuracy: 85,
    streak: 7,
    achievements: [
      { id: 1, name: 'First Steps', icon: 'Award', unlocked: true },
      { id: 2, name: 'Week Warrior', icon: 'Flame', unlocked: true },
      { id: 3, name: 'Perfect Score', icon: 'Star', unlocked: false }
    ]
  };

  const [hints, setHints] = useState(mockHints);

  const revealHint = (hintId) => {
    setHints(hints?.map(hint => 
      hint?.id === hintId ? { ...hint, revealed: true } : hint
    ));
  };

  const renderHints = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono font-semibold text-lg text-foreground">Hints</h3>
        <span className="caption text-muted-foreground">
          {hints?.filter(h => h?.revealed)?.length}/{hints?.length} revealed
        </span>
      </div>

      {hints?.map((hint) => (
        <div key={hint?.id} className="bg-muted rounded-md p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
              <span className="caption text-warning font-medium">Level {hint?.level}</span>
            </div>
            {!hint?.revealed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => revealHint(hint?.id)}
              >
                Reveal
              </Button>
            )}
          </div>

          {hint?.revealed ? (
            <>
              <p className="text-foreground mb-3">{hint?.text}</p>
              <div className="flex flex-wrap gap-2">
                {hint?.scrambledWords?.map((word, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-card rounded border border-primary text-primary font-code text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground italic">Click reveal to see this hint</p>
          )}
        </div>
      ))}
    </div>
  );

  const renderExplanations = () => (
    <div className="space-y-4">
      <h3 className="font-mono font-semibold text-lg text-foreground mb-4">Explanations</h3>

      {mockExplanations?.map((explanation) => (
        <div key={explanation?.id} className="bg-muted rounded-md p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="BookOpen" size={18} color="var(--color-primary)" />
            <h4 className="font-mono font-medium text-foreground">{explanation?.title}</h4>
          </div>
          <p className="text-foreground mb-3">{explanation?.content}</p>
          <div className="bg-card rounded border border-border p-3">
            <pre className="font-code text-sm text-foreground overflow-x-auto">
              {explanation?.codeExample}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <h3 className="font-mono font-semibold text-lg text-foreground mb-4">Your Progress</h3>

      <div className="bg-muted rounded-md p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="caption text-muted-foreground">Challenges Completed</span>
          <span className="font-mono font-semibold text-foreground">
            {mockProgress?.completed}/{mockProgress?.totalChallenges}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-bar-fill"
            style={{ width: `${(mockProgress?.completed / mockProgress?.totalChallenges) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-muted rounded-md p-4 border border-border text-center">
          <Icon name="Target" size={24} color="var(--color-success)" className="mx-auto mb-2" />
          <div className="font-mono font-bold text-2xl text-success mb-1">
            {mockProgress?.accuracy}%
          </div>
          <span className="caption text-muted-foreground">Accuracy</span>
        </div>

        <div className="bg-muted rounded-md p-4 border border-border text-center">
          <Icon name="Flame" size={24} color="var(--color-warning)" className="mx-auto mb-2" />
          <div className="font-mono font-bold text-2xl text-warning mb-1">
            {mockProgress?.streak}
          </div>
          <span className="caption text-muted-foreground">Day Streak</span>
        </div>
      </div>

      <div>
        <h4 className="font-mono font-medium text-foreground mb-3">Achievements</h4>
        <div className="space-y-2">
          {mockProgress?.achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`flex items-center gap-3 p-3 rounded-md border ${
                achievement?.unlocked
                  ? 'bg-card border-success' :'bg-muted border-border opacity-50'
              }`}
            >
              <Icon
                name={achievement?.icon}
                size={20}
                color={achievement?.unlocked ? 'var(--color-success)' : 'var(--color-muted-foreground)'}
              />
              <span className={`font-medium ${
                achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.name}
              </span>
              {achievement?.unlocked && (
                <Icon name="Check" size={16} color="var(--color-success)" className="ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background z-[250]"
          onClick={onClose}
        />
      )}

      <div className={`learning-context-panel ${positionClass} ${isOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'hints' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('hints')}
            >
              Hints
            </Button>
            <Button
              variant={activeTab === 'explanations' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('explanations')}
            >
              Explanations
            </Button>
            <Button
              variant={activeTab === 'progress' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto scrollbar-custom" style={{ maxHeight: 'calc(100% - 64px)' }}>
          {activeTab === 'hints' && renderHints()}
          {activeTab === 'explanations' && renderExplanations()}
          {activeTab === 'progress' && renderProgress()}
        </div>
      </div>
    </>
  );
};

export default LearningContextPanel;