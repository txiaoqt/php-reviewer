import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Trophy, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ChallengeSuccess = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Helmet>
        <title>Module Completed - CodeFill</title>
        <meta name="description" content="Congratulations! You've successfully completed this learning module." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Success Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-success/10">
          <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
            <div className="relative">
              {/* Success Icon */}
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full bg-success/20 flex items-center justify-center">
                <Trophy className="text-success" size={64} />
              </div>

              {/* Success Message */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Module Completed!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Congratulations! You've successfully completed all challenges in this learning module.
                Your progress has been saved and new content has been unlocked.
              </p>


            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl opacity-5">
            <div className="w-full h-full bg-gradient-to-r from-success to-primary rounded-full blur-3xl"></div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              What would you like to do next?
            </h2>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleGoToDashboard}
                className="flex items-center justify-center gap-3 py-4 px-8"
              >
                <ArrowLeft size={20} />
                Go Back to Dashboard
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Code2" size={20} />
              </div>
              <span className="text-foreground font-semibold">CodeFill</span>
            </div>
            <p className="text-muted-foreground">
              Keep learning and building your coding skills!
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ChallengeSuccess;
