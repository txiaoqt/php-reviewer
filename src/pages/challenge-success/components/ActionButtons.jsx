import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  onNextChallenge = () => {},
  onReviewCode = () => {},
  showReviewButton = true
}) => {
  const navigate = useNavigate();

  const handleNextChallenge = () => {
    onNextChallenge();
    navigate('/code-challenge-editor');
  };

  const handleReviewCode = () => {
    onReviewCode();
    navigate('/code-challenge-editor', { state: { reviewMode: true } });
  };

  const handleViewProgress = () => {
    navigate('/level-progress-dashboard');
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 mt-8 md:mt-10 lg:mt-12 mb-8 md:mb-10 lg:mb-12"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 lg:gap-6">
        <Button
          variant="default"
          size="lg"
          onClick={handleNextChallenge}
          iconName="ArrowRight"
          iconPosition="right"
          className="w-full sm:w-auto min-w-[200px]"
        >
          Next Challenge
        </Button>

        {showReviewButton && (
          <Button
            variant="outline"
            size="lg"
            onClick={handleReviewCode}
            iconName="Code2"
            iconPosition="left"
            className="w-full sm:w-auto min-w-[200px]"
          >
            Review Code
          </Button>
        )}

        <Button
          variant="ghost"
          size="lg"
          onClick={handleViewProgress}
          iconName="LayoutDashboard"
          iconPosition="left"
          className="w-full sm:w-auto min-w-[200px]"
        >
          View Progress
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="text-center mt-6 md:mt-7 lg:mt-8"
      >
        <p className="caption text-muted-foreground">
          Keep up the great work! You're making excellent progress in mastering PHP.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ActionButtons;