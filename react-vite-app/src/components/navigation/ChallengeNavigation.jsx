import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';

const ChallengeNavigation = ({
  challenges = [],
  currentChallengeId = null,
  onChallengeSelect = () => {}
}) => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'variables', label: 'Variables & Data Types' },
    { value: 'functions', label: 'Functions' },
    { value: 'arrays', label: 'Arrays' },
    { value: 'loops', label: 'Loops & Conditionals' },
    { value: 'oop', label: 'Object-Oriented Programming' },
    { value: 'database', label: 'Database Operations' }
  ];

  const mockChallenges = challenges?.length > 0 ? challenges : [
    {
      id: 1,
      title: 'Variable Declaration',
      difficulty: 'beginner',
      topic: 'variables',
      completed: true,
      accuracy: 95
    },
    {
      id: 2,
      title: 'String Concatenation',
      difficulty: 'beginner',
      topic: 'variables',
      completed: true,
      accuracy: 88
    },
    {
      id: 3,
      title: 'Array Manipulation',
      difficulty: 'intermediate',
      topic: 'arrays',
      completed: false,
      accuracy: 0
    },
    {
      id: 4,
      title: 'Function Parameters',
      difficulty: 'intermediate',
      topic: 'functions',
      completed: false,
      accuracy: 0
    },
    {
      id: 5,
      title: 'Class Constructor',
      difficulty: 'advanced',
      topic: 'oop',
      completed: false,
      accuracy: 0
    }
  ];

  const filteredChallenges = mockChallenges?.filter(challenge => {
    const matchesDifficulty = selectedDifficulty === 'all' || challenge?.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'all' || challenge?.topic === selectedTopic;
    const matchesSearch = challenge?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  const handleChallengeClick = (challenge) => {
    onChallengeSelect(challenge);
    navigate('/code-challenge-editor', { state: { challenge } });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-success';
      case 'intermediate':
        return 'text-warning';
      case 'advanced':
        return 'text-error';
      default:
        return 'text-muted-foreground';
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

  return (
    <div className="challenge-navigation">
      <div className="mb-6">
        <h3 className="font-mono font-semibold text-xl text-foreground mb-2">
          Choose Challenge
        </h3>
        <p className="caption text-muted-foreground">
          Select a coding challenge to practice and improve your PHP skills
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        <Select
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={setSelectedDifficulty}
          placeholder="Filter by difficulty"
        />
        <Select
          options={topicOptions}
          value={selectedTopic}
          onChange={setSelectedTopic}
          placeholder="Filter by topic"
        />
      </div>
      <div className="space-y-3">
        {filteredChallenges?.map((challenge) => (
          <div
            key={challenge?.id}
            className={`challenge-card ${challenge?.completed ? 'challenge-card-completed' : ''} ${
              currentChallengeId === challenge?.id ? 'glow-primary-intense' : ''
            }`}
            onClick={() => handleChallengeClick(challenge)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon 
                    name={getDifficultyIcon(challenge?.difficulty)} 
                    size={16} 
                    className={getDifficultyColor(challenge?.difficulty)}
                  />
                  <span className={`caption font-medium ${getDifficultyColor(challenge?.difficulty)}`}>
                    {challenge?.difficulty?.charAt(0)?.toUpperCase() + challenge?.difficulty?.slice(1)}
                  </span>
                  {challenge?.completed && (
                    <div className="flex items-center gap-1 ml-auto">
                      <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                      <span className="caption text-success font-medium">
                        {challenge?.accuracy}%
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="font-mono font-medium text-foreground mb-1">
                  {challenge?.title}
                </h4>
                <p className="caption text-muted-foreground">
                  {topicOptions?.find(t => t?.value === challenge?.topic)?.label || challenge?.topic}
                </p>
              </div>
              <Icon 
                name="ChevronRight" 
                size={20} 
                color="var(--color-muted-foreground)" 
              />
            </div>
          </div>
        ))}
      </div>
      {filteredChallenges?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-muted-foreground">No challenges found matching your filters</p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setSelectedDifficulty('all');
              setSelectedTopic('all');
              setSearchQuery('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeNavigation;