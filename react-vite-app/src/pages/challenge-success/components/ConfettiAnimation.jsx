import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const ConfettiAnimation = ({ isActive = true }) => {
  const confettiColors = [
    'var(--color-primary)',
    'var(--color-accent)',
    'var(--color-warning)',
    'var(--color-success)',
    'var(--color-error)'
  ];

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: confettiColors?.[Math.floor(Math.random() * confettiColors?.length)],
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    rotation: Math.random() * 360,
    size: 8 + Math.random() * 8
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {isActive && confettiPieces?.map((piece) => (
        <motion.div
          key={piece?.id}
          className="absolute"
          style={{
            left: `${piece?.x}%`,
            top: '-20px',
            width: `${piece?.size}px`,
            height: `${piece?.size}px`,
            backgroundColor: piece?.color,
            borderRadius: piece?.size % 2 === 0 ? '50%' : '2px'
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [1, 1, 0],
            rotate: piece?.rotation
          }}
          transition={{
            duration: piece?.duration,
            delay: piece?.delay,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation;