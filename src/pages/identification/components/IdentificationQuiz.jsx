import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../../../context/ProgressContext';
import { getQuestionsForChapter } from '../../../data/identificationQuestions';
import ProgressHeader from '../../../components/navigation/ProgressHeader';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const IdentificationQuiz = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'recognition'; // Default to recognition mode

  const { recordAnswer, getModuleProgress } = useProgress();
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWordBank, setShowWordBank] = useState(false);
  const [selectedBlankIndex, setSelectedBlankIndex] = useState(null);

  // Get questions for this chapter
  const chapterQuestions = useMemo(() => {
    return getQuestionsForChapter(chapterId);
  }, [chapterId]);

  // Create a combined word bank with all correct answers plus additional distractors
  const wordBank = useMemo(() => {
    const correctAnswers = chapterQuestions.map(q => q.correctAnswer);
    // Add some related distractors to confuse users
    const distractors = [
      'Evolution', 'Innovation', 'Algorithm', 'Framework', 'Prototype',
      'Iteration', 'Debugging', 'Optimization', 'Refactoring', 'Integration',
      'Deployment', 'Configuration', 'Architecture', 'Interface', 'Protocol'
    ];
    return [...correctAnswers, ...distractors];
  }, [chapterQuestions]);

  const handleBlankClick = (questionIndex) => {
    if (mode === 'recognition') {
      setSelectedBlankIndex(questionIndex);
      setShowWordBank(true);
    }
    // In recall mode, blanks are not clickable - handled by input fields
  };

  const handleWordSelect = (word) => {
    if (selectedBlankIndex !== null) {
      setUserAnswers(prev => ({
        ...prev,
        [selectedBlankIndex]: word
      }));
    }
    setShowWordBank(false);
    setSelectedBlankIndex(null);
  };

  const handleRecallInput = (questionIndex, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleSubmit = () => {
    // Check if all questions have answers
    const allAnswered = chapterQuestions.every((_, index) => userAnswers[index]);

    if (!allAnswered) {
      alert('Please fill in all blanks before submitting.');
      return;
    }

    // Check if all answers are correct
    const allCorrect = chapterQuestions.every((question, index) =>
      userAnswers[index]?.toLowerCase() === question.correctAnswer.toLowerCase()
    );

    setIsCorrect(allCorrect);
    setShowFeedback(true);

    // Record the answer in session stats (simplified - just record completion)
    recordAnswer('identification-terms', allCorrect);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setShowFeedback(false);
    setSelectedBlankIndex(null);
  };

  const handleComplete = () => {
    navigate('/identification/chapters');
  };

  if (!chapterQuestions.length) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Chapter not found</h2>
          <p className="text-slate-400 mb-6">The requested chapter doesn't exist or has no questions.</p>
          <Button onClick={() => navigate('/identification/chapters')}>
            Back to Chapters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      {/* Header */}
      <ProgressHeader
        isMinimal={true}
        currentLevel={1}
        totalLevels={1}
        currentChallenge={Object.keys(userAnswers).length}
        totalChallenges={chapterQuestions.length}
        accuracy={0}
        streak={0}
      />

      {/* Main Content */}
      <main className="pt-20 pb-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Question Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Brain" size={28} color="#0EA5E9" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                Software Engineering Fundamentals
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              {mode === 'recognition'
                ? 'Fill in all 23 blanks by selecting terms from the word bank'
                : 'Fill in all 23 blanks by typing the correct terms manually'
              }
            </p>
          </div>

          {/* Questions List */}
          <div className="bg-slate-800 rounded-lg p-4 md:p-6 mb-6 border border-slate-700">
            <div className="space-y-4">
              {chapterQuestions.map((question, index) => (
                <div key={question.id} className="flex flex-row items-start gap-3">
                  {mode === 'recognition' ? (
                    // Recognition Mode: Clickable button
                    <button
                      onClick={() => handleBlankClick(index)}
                      disabled={showFeedback}
                      className="w-36 shrink-0 px-2 py-2 bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 rounded-lg text-slate-200 text-sm font-mono transition-all hover:border-blue-500 hover:bg-blue-500/10 text-center flex items-center justify-center min-h-[44px]"
                    >
                      {userAnswers[index] || <span className="opacity-50">[Select]</span>}
                    </button>
                  ) : (
                    // Recall Mode: Input field
                    <input
                      type="text"
                      value={userAnswers[index] || ''}
                      onChange={(e) => handleRecallInput(index, e.target.value)}
                      disabled={showFeedback}
                      className="w-36 shrink-0 px-2 py-2 bg-slate-700 border-2 border-slate-600 rounded-lg text-slate-200 text-sm font-mono text-center focus:border-blue-500 focus:outline-none min-h-[44px]"
                      placeholder="Type term"
                    />
                  )}

                  <span className="text-slate-200 text-sm sm:text-lg leading-relaxed pt-1.5">
                    {question.context}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Word Bank - Only show in recognition mode */}
          {mode === 'recognition' && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Available Terms</h3>
              <div className="flex flex-wrap gap-2">
                {wordBank.map((word, index) => {
                  const isUsed = Object.values(userAnswers).includes(word);
                  return (
                    <button
                      key={index}
                      onClick={() => !isUsed && handleWordSelect(word)}
                      className={`px-3 py-2 rounded border transition-colors ${
                        isUsed
                          ? 'bg-green-600 border-green-600 text-white cursor-not-allowed'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600 hover:border-slate-500'
                      }`}
                      disabled={isUsed || showFeedback}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
              <p className="text-sm text-slate-400 mt-4">
                💡 Tip: Some words are distractors to test your knowledge!
              </p>
            </div>
          )}

          {/* Recall Mode Instructions */}
          {mode === 'recall' && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Recall Mode</h3>
                <p className="text-sm text-slate-400">
                  Type the correct terms in each blank. This tests your ability to remember the definitions without hints.
                </p>
              </div>
            </div>
          )}

          {/* Feedback */}
          {showFeedback && (
            <div className={`rounded-lg p-6 mb-6 border ${
              isCorrect
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  name={isCorrect ? "CheckCircle" : "XCircle"}
                  size={20}
                  color={isCorrect ? "#10B981" : "#EF4444"}
                />
                <h3 className="text-lg font-semibold">
                  {isCorrect ? 'Perfect! All answers correct!' : 'Some answers are incorrect'}
                </h3>
              </div>
              {!isCorrect && (
                <div className="mb-4">
                  <p className="text-sm mb-2">Incorrect answers:</p>
                  <ul className="text-sm space-y-1">
                    {chapterQuestions.map((question, index) => {
                      const userAnswer = userAnswers[index];
                      const isWrong = userAnswer && userAnswer.toLowerCase() !== question.correctAnswer.toLowerCase();
                      if (isWrong) {
                        return (
                          <li key={index} className="text-red-300">
                            • "{userAnswer}" should be "{question.correctAnswer}"
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleComplete}
                  className="bg-[#0EA5E9] hover:bg-[#0284c7]"
                >
                  Complete Chapter
                </Button>
                {!isCorrect && (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Try Again
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          {!showFeedback && Object.keys(userAnswers).length === chapterQuestions.length && (
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="bg-[#0EA5E9] hover:bg-[#0284c7] px-8 py-3 text-lg"
              >
                Check All Answers
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Word Bank Modal */}
      {showWordBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Select a Term</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4 overflow-y-auto max-h-[60vh]">
              {wordBank.map((word, index) => {
                const isUsed = Object.values(userAnswers).includes(word);
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleWordSelect(word);
                    }}
                    className={`p-2 rounded border transition-colors text-center text-sm font-medium h-auto min-h-[50px] flex items-center justify-center whitespace-normal break-words ${
                      isUsed
                        ? 'bg-green-600 border-green-600 text-white cursor-not-allowed'
                        : 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600 hover:border-slate-500'
                    }`}
                    disabled={isUsed}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <Button
                onClick={() => setShowWordBank(false)}
                variant="ghost"
                className="text-slate-400 hover:text-slate-300"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentificationQuiz;
