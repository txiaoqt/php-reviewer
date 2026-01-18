import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SuccessIndicator = ({ accuracy = 100, timeSpent = 45 }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }}
      className="flex flex-col items-center justify-center py-8 md:py-12 lg:py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.4
        }}
        className="relative mb-6 md:mb-8 lg:mb-10"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-success/20 flex items-center justify-center">
          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-success/30 flex items-center justify-center">
            <Icon 
              name="CheckCircle2" 
              size={window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 64 : 48}
              color="var(--color-success)" 
            />
          </div>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute -top-2 -right-2 md:-top-3 md:-right-3 lg:-top-4 lg:-right-4 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-warning flex items-center justify-center"
        >
          <Icon name="Star" size={window.innerWidth >= 1024 ? 28 : window.innerWidth >= 768 ? 24 : 20} color="var(--color-warning-foreground)" />
        </motion.div>
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-success mb-3 md:mb-4 lg:mb-5 text-center"
      >
        Perfect Solution!
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 lg:mb-10 text-center max-w-md"
      >
        You've successfully completed this PHP challenge with excellent accuracy
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-md"
      >
        <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 md:p-5 lg:p-6 text-center w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Target" size={20} color="var(--color-success)" />
            <span className="caption text-muted-foreground">Accuracy</span>
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-success font-mono">
            {accuracy}%
          </div>
        </div>

        <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-lg border border-border p-4 md:p-5 lg:p-6 text-center w-full">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Clock" size={20} color="var(--color-primary)" />
            <span className="caption text-muted-foreground">Time Spent</span>
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-mono">
            {timeSpent}s
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessIndicator;