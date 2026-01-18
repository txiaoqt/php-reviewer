import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExplanationCard = ({
  isVisible = false,
  title = "",
  explanation = "",
  codeExample = "",
  onContinue = () => {},
  buttonText = "Continue to Next Challenge"
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-[#1e1e1e] border-t border-[#333] shadow-2xl max-h-[70vh] overflow-y-auto"
    >
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center">
            <Icon name="CheckCircle2" size={24} color="#10B981" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-xl md:text-2xl text-[#10B981]">Correct!</h3>
            <p className="text-sm md:text-base text-slate-400">Great job on solving this challenge</p>
          </div>
        </div>

        {/* Explanation */}
        <div className="bg-[#2d2d2d] rounded-lg p-4 md:p-6 mb-4 md:mb-6 border border-[#333]">
          <h4 className="font-mono font-semibold text-lg text-slate-200 mb-3">{title}</h4>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">{explanation}</p>
          
          {codeExample && (
            <div className="bg-[#1e1e1e] rounded border border-[#333] p-4 overflow-x-auto">
              <pre className="font-mono text-xs md:text-sm text-slate-300">
                {codeExample}
              </pre>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={onContinue}
            iconName="ArrowRight"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplanationCard;
