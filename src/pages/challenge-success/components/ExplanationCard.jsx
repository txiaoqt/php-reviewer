import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ExplanationCard = ({ 
  title = "Understanding PHP Variables",
  explanation = "In PHP, variables are declared using the $ symbol followed by the variable name. Variable names are case-sensitive and must start with a letter or underscore. The echo statement is used to output data to the screen.",
  codeExample = `<?php
// Declaring a variable
$name = "John Doe";

// Outputting the variable
echo $name;

// Result: John Doe
?>`,
  keyPoints = [
    "Variables in PHP start with the $ symbol",
    "Variable names are case-sensitive",
    "Use echo to output variable values",
    "Strings can be enclosed in single or double quotes"
  ]
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.8
      }}
      className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8"
    >
      <div className="bg-card/80 backdrop-blur-md rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 md:p-5 lg:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name="BookOpen" size={window.innerWidth >= 1024 ? 28 : window.innerWidth >= 768 ? 24 : 20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                {title}
              </h2>
              <p className="caption text-muted-foreground mt-1">
                Key concepts from this challenge
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 lg:space-y-10">
          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-3 md:mb-4 lg:mb-5 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
              Explanation
            </h3>
            <p className="text-sm md:text-base lg:text-lg text-foreground leading-relaxed">
              {explanation}
            </p>
          </div>

          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-3 md:mb-4 lg:mb-5 flex items-center gap-2">
              <Icon name="Code2" size={20} color="var(--color-accent)" />
              Code Example
            </h3>
            <div className="bg-background rounded-lg border border-border overflow-hidden">
              <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                </div>
                <span className="caption text-muted-foreground ml-2">example.php</span>
              </div>
              <pre className="p-4 md:p-5 lg:p-6 overflow-x-auto scrollbar-custom">
                <code className="text-xs md:text-sm lg:text-base text-foreground font-mono leading-relaxed">
                  {codeExample}
                </code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-3 md:mb-4 lg:mb-5 flex items-center gap-2">
              <Icon name="CheckCircle2" size={20} color="var(--color-success)" />
              Key Points to Remember
            </h3>
            <div className="space-y-3">
              {keyPoints?.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + (index * 0.1) }}
                  className="flex items-start gap-3 bg-muted/50 rounded-lg p-3 md:p-4 lg:p-5 border border-border"
                >
                  <div className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                  </div>
                  <p className="text-sm md:text-base lg:text-lg text-foreground flex-1">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExplanationCard;