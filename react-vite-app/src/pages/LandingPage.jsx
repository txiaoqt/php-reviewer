import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Play, Code2, Zap, Trophy, Users, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import Icon from '../components/AppIcon';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log('Get Started button clicked, navigating to /dashboard');
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Code2,
      title: 'Interactive Coding',
      description: 'Write, test, and debug code in real-time with instant feedback'
    },
    {
      icon: Zap,
      title: 'Learn by Doing',
      description: 'Master PHP concepts through hands-on challenges and exercises'
    },
    {
      icon: Trophy,
      title: 'Helpful Hints',
      description: 'Get guided assistance and explanations when you need them'
    },
    {
      icon: Code2,
      title: 'Bootstrap Preview',
      description: 'See your code come to life with live Bootstrap component previews'
    }
  ];

  return (
    <>
      <Helmet>
        <title>CodeFill - Learn PHP Through Interactive Challenges</title>
        <meta name="description" content="Master PHP programming with interactive coding challenges. Learn by doing with real-time feedback and progress tracking." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="text-primary" size={24} />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CodeFill
                </h1>
              </div>
              <Button
                variant="outline"
                onClick={handleGetStarted}
                className="hidden sm:flex"
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                  Learn PHP Through
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Interactive Challenges
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  i am just bored and too tired to review for the final test that is why i made this app. enjoy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
                >
                  <Play size={20} fill="currentColor" />
                  Get Started
                </button>
                <button
                  onClick={() => window.open('https://laravel.com/docs', '_blank')}
                  className="inline-flex items-center gap-2 px-8 py-4 text-lg border border-input hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors"
                >
                  <BookOpen size={20} />
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl opacity-5 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-primary to-accent rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose CodeFill?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                i am just bored and too tired to review for the final test that is why i made this app. enjoy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg border border-border p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-border p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Start Coding?
              </h2>
              
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="flex items-center gap-2 px-8 py-4 text-lg mx-auto"
              >
                <Play size={20} fill="currentColor" />
                Start Learning Now
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code2 className="text-primary" size={20} />
              </div>
              <span className="text-foreground font-semibold">CodeFill</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 CodeFill. Learn PHP through interactive coding challenges.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
