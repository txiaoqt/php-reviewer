import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Lock, Play, Trophy, Target, Star } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const LearningDashboard = () => {
  const navigate = useNavigate();
  const { modules, getGlobalStats } = useProgress();

  const handleModuleClick = (module) => {
    if (!module.isLocked) {
      if (module.path) {
        navigate(module.path);
      } else {
        navigate(`/code-challenge-editor/${module.id}`);
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const { unlocked: unlockedModules, completed: completedModules, totalXP } = getGlobalStats();
  const totalModules = modules.length;

  return (
    <>
      <Helmet>
        <title>Learning Dashboard - CodeFill</title>
        <meta name="description" content="Choose your learning path and track your PHP programming progress." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToHome}
                  className="flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Back to Home
                </Button>
                <div className="h-6 w-px bg-border"></div>
                <h1 className="text-xl font-bold text-foreground">Learning Dashboard</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="py-8 bg-card/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="text-primary" size={20} />
                  <span className="text-sm text-muted-foreground">Modules Unlocked</span>
                </div>
                <div className="text-2xl font-bold text-primary">{unlockedModules}/{totalModules}</div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Trophy className="text-success" size={20} />
                  <span className="text-sm text-muted-foreground">Modules Completed</span>
                </div>
                <div className="text-2xl font-bold text-success">{completedModules}/{totalModules}</div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="text-warning" size={20} />
                  <span className="text-sm text-muted-foreground">Total Challenges</span>
                </div>
                <div className="text-2xl font-bold text-warning">
                  {modules.reduce((acc, m) => acc + m.completedLevels, 0)}/{modules.reduce((acc, m) => acc + m.totalLevels, 0)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Learning Path
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select a module to start learning. Complete modules to unlock new challenges and advance your PHP skills.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`relative bg-card rounded-lg border border-border p-6 transition-all duration-300 hover:shadow-lg ${
                    module.isLocked
                      ? 'opacity-60 cursor-not-allowed'
                      : 'cursor-pointer hover:scale-105 hover:border-primary/50'
                  }`}
                  onClick={() => handleModuleClick(module)}
                >
                  {/* Lock overlay for locked modules */}
                  {module.isLocked && (
                    <div className="absolute inset-0 bg-card/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                      <div className="text-center">
                        <Lock className="text-muted-foreground mx-auto mb-2" size={32} />
                        <p className="text-sm text-muted-foreground">Complete previous modules to unlock</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${module.color} bg-opacity-10`}>
                      <Icon name={module.icon} size={24} />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      module.level === 'Beginner' ? 'bg-green-500/10 text-green-600' :
                      module.level === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-600' :
                      module.level === 'Advanced' ? 'bg-red-500/10 text-red-600' :
                      'bg-purple-500/10 text-purple-600'
                    }`}>
                      {module.level}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Target size={14} />
                        <span>{module.completedLevels}/{module.totalLevels} completed</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary">
                        <Play size={14} />
                        <span>Start</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(module.completedLevels / module.totalLevels) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-card/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Continue Learning?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Jump back into your current module or explore different learning paths.
              Your progress is automatically saved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBackToHome}
                className="flex items-center gap-2"
              >
                <Icon name="Home" size={20} />
                Back to Home
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LearningDashboard;
