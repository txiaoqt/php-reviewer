import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ConfettiAnimation = ({ isActive = false, onComplete = () => {} }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isActive) {
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        rotation: Math.random() * 360,
        color: ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']?.[Math.floor(Math.random() * 5)],
        size: Math.random() * 10 + 5
      }));
      setConfetti(pieces);

      setTimeout(() => {
        setConfetti([]);
        onComplete();
      }, 3000);
    }
  }, [isActive, onComplete]);

  if (!isActive || confetti?.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {confetti?.map((piece) => (
        <motion.div
          key={piece?.id}
          initial={{ 
            x: piece?.x, 
            y: piece?.y, 
            rotate: piece?.rotation,
            opacity: 1 
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: piece?.rotation + 720,
            opacity: 0
          }}
          transition={{ 
            duration: 2 + Math.random(),
            ease: "easeIn"
          }}
          style={{
            position: 'absolute',
            width: piece?.size,
            height: piece?.size,
            backgroundColor: piece?.color,
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;