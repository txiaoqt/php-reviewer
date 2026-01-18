import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ statistics }) => {
  const stats = [
    {
      id: 1,
      label: 'Challenges Completed',
      value: statistics?.completed,
      total: statistics?.total,
      icon: 'CheckCircle2',
      color: 'var(--color-success)',
      bgColor: 'bg-success/20'
    },
    {
      id: 2,
      label: 'Current Streak',
      value: `${statistics?.streak} days`,
      icon: 'Flame',
      color: 'var(--color-warning)',
      bgColor: 'bg-amber-500/20'
    },
    {
      id: 3,
      label: 'Average Accuracy',
      value: `${statistics?.accuracy}%`,
      icon: 'Target',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/20'
    },
    {
      id: 4,
      label: 'Time Spent Coding',
      value: statistics?.timeSpent,
      icon: 'Clock',
      color: 'var(--color-accent)',
      bgColor: 'bg-emerald-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card rounded-lg border border-border p-4 md:p-5 lg:p-6 hover:border-primary/50 transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}
            >
              <Icon name={stat?.icon} size={20} color={stat?.color} />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs md:text-sm text-muted-foreground">
              {stat?.label}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl md:text-3xl font-mono font-bold text-foreground">
                {stat?.value}
              </p>
              {stat?.total && (
                <span className="text-base md:text-lg text-muted-foreground">
                  / {stat?.total}
                </span>
              )}
            </div>
          </div>

          {stat?.total && (
            <div className="mt-3">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${(stat?.value / stat?.total) * 100}%`
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatisticsPanel;