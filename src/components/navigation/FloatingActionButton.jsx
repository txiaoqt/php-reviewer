import React from 'react';

import Button from '../ui/Button';

const FloatingActionButton = ({
  variant = 'bottom-right',
  action = 'run',
  onClick = () => {},
  disabled = false,
  loading = false
}) => {
  const getActionConfig = () => {
    switch (action) {
      case 'run':
        return {
          icon: 'Play',
          label: 'Run Code',
          variant: 'default',
          size: 'lg'
        };
      case 'continue':
        return {
          icon: 'ArrowRight',
          label: 'Continue Learning',
          variant: 'default',
          size: 'xl'
        };
      case 'hint':
        return {
          icon: 'Lightbulb',
          label: 'Get Hint',
          variant: 'secondary',
          size: 'default'
        };
      case 'submit':
        return {
          icon: 'Check',
          label: 'Submit Solution',
          variant: 'success',
          size: 'lg'
        };
      default:
        return {
          icon: 'Play',
          label: 'Action',
          variant: 'default',
          size: 'default'
        };
    }
  };

  const config = getActionConfig();
  const positionClass = variant === 'center' ?'floating-action-center' :'floating-action-bottom-right';

  return (
    <div className={`floating-action ${positionClass}`}>
      <Button
        variant={config?.variant}
        size={config?.size}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        iconName={config?.icon}
        iconPosition="left"
        className="shadow-glow-lg"
      >
        {config?.label}
      </Button>
    </div>
  );
};

export default FloatingActionButton;