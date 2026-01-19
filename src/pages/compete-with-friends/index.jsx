import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Plus, LogIn, UserPlus, Crown, Clock, Target } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ChallengesService } from '../../services/challengesService';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AuthModal from '../../components/AuthModal';
import CreateChallengeModal from '../../components/CreateChallengeModal';
import ChallengeCard from '../../components/ChallengeCard';

const CompeteWithFriends = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [challengesLoading, setChallengesLoading] = useState(false);

  useEffect(() => {
    checkUser();
    if (user) {
      fetchActiveChallenges();
    }
  }, [user]);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveChallenges = async () => {
    try {
      setChallengesLoading(true);
      const challenges = await ChallengesService.getActiveChallenges();
      setActiveChallenges(challenges || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setActiveChallenges([]);
    } finally {
      setChallengesLoading(false);
    }
  };

  const handleCreateChallenge = () => {
    setShowCreateModal(true);
  };

  const handleChallengeCreated = (challenge) => {
    setShowCreateModal(false);
    fetchActiveChallenges(); // Refresh the list
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Compete with Friends - CodeFill</title>
        <meta name="description" content="Challenge your friends in real-time coding competitions." />
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
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-border"></div>
                <h1 className="text-xl font-bold text-foreground">Compete with Friends</h1>
              </div>
              {!user && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center gap-2"
                  >
                    <LogIn size={16} />
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className="flex items-center gap-2"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </Button>
                </div>
              )}
              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {!user ? (
            // Not authenticated view
            <div className="text-center py-16">
              <Users className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Join the Competition
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Sign in to create challenges, compete with friends, and climb the leaderboards in real-time coding competitions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2"
                >
                  <LogIn size={20} />
                  Sign In to Compete
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2"
                >
                  <UserPlus size={20} />
                  Create Account
                </Button>
              </div>
            </div>
          ) : (
            // Authenticated view
            <div className="space-y-8">
              {/* Create Challenge Section */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">Create a Challenge</h3>
                  <Button
                    onClick={handleCreateChallenge}
                    className="flex items-center gap-2"
                  >
                    <Plus size={20} />
                    New Challenge
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Start a new coding challenge and invite your friends to compete in real-time.
                </p>
              </div>

              {/* Active Challenges */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Active Challenges</h3>
                {activeChallenges.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No active challenges. Create one to get started!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeChallenges.map((challenge) => (
                      <ChallengeCard
                        key={challenge.id}
                        challenge={challenge}
                        currentUserId={user?.id}
                        onJoinChallenge={() => fetchActiveChallenges()}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Leaderboard Preview */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Global Leaderboard</h3>
                <div className="text-center py-8">
                  <Trophy className="mx-auto h-16 w-16 text-warning mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Leaderboards will be available once you start competing!
                  </p>
                  <Button variant="outline">
                    View Full Leaderboard
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={(user) => {
            setUser(user);
            setShowAuthModal(false);
          }}
        />

        {/* Create Challenge Modal */}
        <CreateChallengeModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onChallengeCreated={handleChallengeCreated}
        />
      </div>
    </>
  );
};

export default CompeteWithFriends;
