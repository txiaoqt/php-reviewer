import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ProgressHeader from '../../components/navigation/ProgressHeader';
import LevelHeader from './components/LevelHeader';
import StatisticsPanel from './components/StatisticsPanel';
import AchievementBadges from './components/AchievementBadges';
import FilterControls from './components/FilterControls';
import ProgressMap from './components/ProgressMap';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const LevelProgressDashboard = () => {
  const navigate = useNavigate();

  const mockChallenges = [
    {
      id: 1,
      title: 'Variable Declaration',
      description: 'Learn how to declare and initialize variables in PHP using the $ symbol',
      difficulty: 'beginner',
      topic: 'Variables & Data Types',
      status: 'completed',
      accuracy: 95,
      timeSpent: '5 min'
    },
    {
      id: 2,
      title: 'String Concatenation',
      description: 'Master string concatenation using the dot operator and string interpolation',
      difficulty: 'beginner',
      topic: 'Variables & Data Types',
      status: 'completed',
      accuracy: 88,
      timeSpent: '7 min'
    },
    {
      id: 3,
      title: 'Array Basics',
      description: 'Create and manipulate indexed and associative arrays in PHP',
      difficulty: 'beginner',
      topic: 'Arrays',
      status: 'completed',
      accuracy: 92,
      timeSpent: '8 min'
    },
    {
      id: 4,
      title: 'Function Parameters',
      description: 'Define functions with parameters and return values',
      difficulty: 'intermediate',
      topic: 'Functions',
      status: 'current',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 5,
      title: 'Conditional Statements',
      description: 'Use if-else statements and switch cases for decision making',
      difficulty: 'intermediate',
      topic: 'Loops & Conditionals',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 6,
      title: 'For Loop Iteration',
      description: 'Iterate through arrays and ranges using for loops',
      difficulty: 'intermediate',
      topic: 'Loops & Conditionals',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 7,
      title: 'While Loop Control',
      description: 'Implement while loops with proper exit conditions',
      difficulty: 'intermediate',
      topic: 'Loops & Conditionals',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 8,
      title: 'Array Functions',
      description: 'Use built-in array functions like array_push, array_pop, and array_merge',
      difficulty: 'intermediate',
      topic: 'Arrays',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 9,
      title: 'Class Definition',
      description: 'Create classes with properties and methods',
      difficulty: 'advanced',
      topic: 'Object-Oriented Programming',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 10,
      title: 'Constructor Methods',
      description: 'Implement constructors to initialize object properties',
      difficulty: 'advanced',
      topic: 'Object-Oriented Programming',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 11,
      title: 'Inheritance Basics',
      description: 'Extend classes and override parent methods',
      difficulty: 'advanced',
      topic: 'Object-Oriented Programming',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 12,
      title: 'Database Connection',
      description: 'Connect to MySQL database using PDO',
      difficulty: 'advanced',
      topic: 'Database Operations',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 13,
      title: 'SELECT Queries',
      description: 'Retrieve data from database tables using SELECT statements',
      difficulty: 'advanced',
      topic: 'Database Operations',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 14,
      title: 'INSERT Operations',
      description: 'Add new records to database tables',
      difficulty: 'advanced',
      topic: 'Database Operations',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    },
    {
      id: 15,
      title: 'UPDATE & DELETE',
      description: 'Modify and remove records from database tables',
      difficulty: 'advanced',
      topic: 'Database Operations',
      status: 'locked',
      accuracy: 0,
      timeSpent: null
    }
  ];

  const mockStatistics = {
    completed: 3,
    total: 15,
    streak: 7,
    accuracy: 92,
    timeSpent: '2.5 hrs'
  };

  const mockAchievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Complete your first challenge',
      icon: 'Award',
      unlocked: true
    },
    {
      id: 2,
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: 'Flame',
      unlocked: true
    },
    {
      id: 3,
      name: 'Perfect Score',
      description: 'Achieve 100% accuracy on a challenge',
      icon: 'Star',
      unlocked: false
    },
    {
      id: 4,
      name: 'Speed Demon',
      description: 'Complete a challenge in under 3 minutes',
      icon: 'Zap',
      unlocked: false
    },
    {
      id: 5,
      name: 'Array Master',
      description: 'Complete all array challenges',
      icon: 'Grid',
      unlocked: false
    },
    {
      id: 6,
      name: 'Function Expert',
      description: 'Complete all function challenges',
      icon: 'Code2',
      unlocked: false
    },
    {
      id: 7,
      name: 'OOP Champion',
      description: 'Complete all OOP challenges',
      icon: 'Box',
      unlocked: false
    },
    {
      id: 8,
      name: 'Database Pro',
      description: 'Complete all database challenges',
      icon: 'Database',
      unlocked: false
    }
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentChallengeId, setCurrentChallengeId] = useState(4);

  const currentLevel = 1;
  const totalLevels = 10;
  const levelProgress = Math.round((mockStatistics?.completed / mockStatistics?.total) * 100);

  const filteredChallenges = useMemo(() => {
    return mockChallenges?.filter((challenge) => {
      const matchesDifficulty =
        selectedDifficulty === 'all' || challenge?.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopic === 'all' || challenge?.topic === selectedTopic;
      const matchesStatus = selectedStatus === 'all' || challenge?.status === selectedStatus;
      const matchesSearch =
        searchQuery === '' ||
        challenge?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        challenge?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

      return matchesDifficulty && matchesTopic && matchesStatus && matchesSearch;
    });
  }, [selectedDifficulty, selectedTopic, selectedStatus, searchQuery]);

  const handleChallengeSelect = (challenge) => {
    if (challenge?.status !== 'locked') {
      setCurrentChallengeId(challenge?.id);
      navigate('/code-challenge-editor', { state: { challenge } });
    }
  };

  const handleContinueLearning = () => {
    const nextChallenge = mockChallenges?.find((c) => c?.status === 'current');
    if (nextChallenge) {
      handleChallengeSelect(nextChallenge);
    }
  };

  const handleClearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedTopic('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  return (
    <>
      <Helmet>
        <title>Level Progress Dashboard - CodeFill</title>
        <meta
          name="description"
          content="Track your PHP learning progress, view completed challenges, and continue your coding journey"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <ProgressHeader
          currentLevel={currentLevel}
          totalLevels={totalLevels}
          currentChallenge={mockStatistics?.completed}
          totalChallenges={mockStatistics?.total}
          accuracy={mockStatistics?.accuracy}
          streak={mockStatistics?.streak}
        />

        <main className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            <LevelHeader
              currentLevel={currentLevel}
              totalLevels={totalLevels}
              levelProgress={levelProgress}
            />

            <StatisticsPanel statistics={mockStatistics} />

            <AchievementBadges achievements={mockAchievements} />

            <FilterControls
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              selectedTopic={selectedTopic}
              onTopicChange={setSelectedTopic}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="bg-card rounded-lg border border-border p-4 md:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg md:text-xl font-mono font-semibold text-foreground mb-1">
                    Your Learning Path
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {filteredChallenges?.length} challenge{filteredChallenges?.length !== 1 ? 's' : ''}{' '}
                    available
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {(selectedDifficulty !== 'all' ||
                    selectedTopic !== 'all' ||
                    selectedStatus !== 'all' ||
                    searchQuery !== '') && (
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                      <Icon name="X" size={16} />
                      Clear Filters
                    </Button>
                  )}

                  <Button
                    variant="default"
                    size="default"
                    onClick={handleContinueLearning}
                    iconName="PlayCircle"
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>

              {filteredChallenges?.length > 0 ? (
                <ProgressMap
                  challenges={filteredChallenges}
                  onChallengeSelect={handleChallengeSelect}
                  currentChallengeId={currentChallengeId}
                />
              ) : (
                <div className="text-center py-12 md:py-16">
                  <Icon
                    name="Search"
                    size={48}
                    color="var(--color-muted-foreground)"
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-lg md:text-xl font-mono font-semibold text-foreground mb-2">
                    No challenges found
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-6">
                    Try adjusting your filters to see more results
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LevelProgressDashboard;