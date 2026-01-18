import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({
  selectedDifficulty,
  onDifficultyChange,
  selectedTopic,
  onTopicChange,
  selectedStatus,
  onStatusChange,
  searchQuery,
  onSearchChange
}) => {
  const difficultyOptions = [
    { value: 'all', label: 'All Difficulties' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'Variables & Data Types', label: 'Variables & Data Types' },
    { value: 'Functions', label: 'Functions' },
    { value: 'Arrays', label: 'Arrays' },
    { value: 'Loops & Conditionals', label: 'Loops & Conditionals' },
    { value: 'Object-Oriented Programming', label: 'Object-Oriented Programming' },
    { value: 'Database Operations', label: 'Database Operations' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'current', label: 'In Progress' },
    { value: 'locked', label: 'Locked' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-mono font-semibold text-foreground mb-4">
        Filter Challenges
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
        />

        <Select
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={onDifficultyChange}
          placeholder="Select difficulty"
        />

        <Select
          options={topicOptions}
          value={selectedTopic}
          onChange={onTopicChange}
          placeholder="Select topic"
        />

        <Select
          options={statusOptions}
          value={selectedStatus}
          onChange={onStatusChange}
          placeholder="Select status"
        />
      </div>
    </div>
  );
};

export default FilterControls;