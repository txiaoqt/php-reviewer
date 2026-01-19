import React, { useState } from 'react';
import { X, Plus, Minus, Clock, Users, Target } from 'lucide-react';
import { ChallengesService } from '../services/challengesService';
import Button from './ui/Button';
import Input from './ui/Input';

const CreateChallengeModal = ({ isOpen, onClose, onChallengeCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    challengeType: 'coding',
    difficulty: 'medium',
    maxParticipants: 10,
    timeLimitMinutes: 30,
    startsAt: '',
    endsAt: '',
  });

  const [questions, setQuestions] = useState([
    {
      text: '',
      correctAnswer: '',
      points: 10,
      timeLimitSeconds: 300,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      text: '',
      correctAnswer: '',
      points: 10,
      timeLimitSeconds: 300,
    }]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error('Challenge title is required');
      }
      if (!formData.description.trim()) {
        throw new Error('Challenge description is required');
      }
      if (questions.some(q => !q.text.trim() || !q.correctAnswer.trim())) {
        throw new Error('All questions must have text and correct answers');
      }

      // Create challenge
      const challenge = await ChallengesService.createChallenge({
        ...formData,
        startsAt: formData.startsAt ? new Date(formData.startsAt).toISOString() : null,
        endsAt: formData.endsAt ? new Date(formData.endsAt).toISOString() : null,
      });

      // Add questions
      await ChallengesService.addQuestionsToChallenge(challenge.id, questions);

      onChallengeCreated?.(challenge);
      onClose();

      // Reset form
      setFormData({
        title: '',
        description: '',
        challengeType: 'coding',
        difficulty: 'medium',
        maxParticipants: 10,
        timeLimitMinutes: 30,
        startsAt: '',
        endsAt: '',
      });
      setQuestions([{
        text: '',
        correctAnswer: '',
        points: 10,
        timeLimitSeconds: 300,
      }]);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Create New Challenge</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Challenge Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Challenge Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter challenge title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your challenge"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Target className="inline w-4 h-4 mr-1" />
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Max Participants
                  </label>
                  <Input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                    min={2}
                    max={50}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Time Limit (minutes)
                  </label>
                  <Input
                    type="number"
                    value={formData.timeLimitMinutes}
                    onChange={(e) => handleInputChange('timeLimitMinutes', parseInt(e.target.value))}
                    min={5}
                    max={180}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Challenge Type
                  </label>
                  <select
                    value={formData.challengeType}
                    onChange={(e) => handleInputChange('challengeType', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="coding">Coding Challenge</option>
                    <option value="quiz">Quiz</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date/Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.startsAt}
                    onChange={(e) => handleInputChange('startsAt', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date/Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={formData.endsAt}
                    onChange={(e) => handleInputChange('endsAt', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-foreground">Questions</h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addQuestion}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Question
                </Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {questions.map((question, index) => (
                  <div key={index} className="border border-border rounded-md p-4 bg-card/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">
                        Question {index + 1}
                      </span>
                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeQuestion(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Question Text *
                        </label>
                        <textarea
                          value={question.text}
                          onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                          placeholder="Enter your question"
                          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          rows={2}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">
                          Correct Answer *
                        </label>
                        <Input
                          type="text"
                          value={question.correctAnswer}
                          onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                          placeholder="Enter the correct answer"
                          className="text-sm"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">
                            Points
                          </label>
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => handleQuestionChange(index, 'points', parseInt(e.target.value))}
                            min={1}
                            max={100}
                            className="text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-foreground mb-1">
                            Time Limit (seconds)
                          </label>
                          <Input
                            type="number"
                            value={question.timeLimitSeconds}
                            onChange={(e) => handleQuestionChange(index, 'timeLimitSeconds', parseInt(e.target.value))}
                            min={30}
                            max={1800}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating Challenge...' : 'Create Challenge'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChallengeModal;
