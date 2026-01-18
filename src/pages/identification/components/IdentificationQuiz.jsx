import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [usedWords, setUsedWords] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWordBank, setShowWordBank] = useState(false);
  const [selectedBlank, setSelectedBlank] = useState(null);

  // Get questions for this chapter
  const chapterQuestions = useMemo(() => {
    return getQuestionsForChapter(chapterId);
  }, [chapterId]);

  const currentQuestion = chapterQuestions[currentQuestionIndex];

  // Initialize user answers when question changes
  useEffect(() => {
    if (currentQuestion) {
      const initialAnswers = {};
      currentQuestion.blanks.forEach(blank => {
        initialAnswers[blank.id] = '';
      });
      setUserAnswers(initialAnswers);
      setUsedWords([]);
      setShowFeedback(false);
      setSelectedBlank(null);
    }
  }, [currentQuestion]);

  // Calculate available words for word bank
  const availableWords = useMemo(() => {
    if (!currentQuestion) return [];

    const allCorrectAnswers = currentQuestion.blanks.map(blank => blank.correctAnswer);
    return allCorrectAnswers.filter(word => !usedWords.includes(word));
  }, [currentQuestion, usedWords]);

  // Parse context text and replace [1], [2], etc. with blanks
  const renderContextText = () => {
    if (!currentQuestion) return null;

    const parts = currentQuestion.context.split(/(\[\d+\])/);

    return parts.map((part, index) => {
      const blankMatch = part.match(/\[(\d+)\]/);
      if (blankMatch) {
        const blankNumber = parseInt(blankMatch[1]);
        const blank = currentQuestion.blanks.find(b => b.id === `blank-${blankNumber}`);
        const userAnswer = userAnswers[blank?.id] || '';
        const isSelected = selectedBlank === blank?.id;

        return (
          <span
            key={index}
            className={`
              inline-block mx-1 px-2 py-1 rounded border-2 cursor-pointer transition-all
              ${isSelected
                ? 'border-blue-500 bg-blue-500/10'
                : userAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }
            `}
            onClick={() => handleBlankClick(blank?.id)}
          >
            {userAnswer || `[${blankNumber}]`}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleBlankClick = (blankId) => {
    if (mode === 'recognition') {
      setSelectedBlank(blankId);
      setShowWordBank(true);
    }
    // In recall mode, blanks are not clickable - users type directly
  };

  const handleWordSelect = (word) => {
    if (!selectedBlank) return;

    // Update the answer for this blank
    setUserAnswers(prev => ({
      ...prev,
      [selectedBlank]: word
    }));

    // Add word to used words
    setUsedWords(prev => [...prev, word]);

    // Close word bank
    setShowWordBank(false);
    setSelectedBlank(null);
  };

  const handleRecallInput = (blankId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    // Check if all blanks are filled
    const allFilled = currentQuestion.blanks.every(blank => userAnswers[blank.id]?.trim());

    if (!allFilled) {
      alert('Please fill in all blanks before submitting.');
      return;
    }

    // Validate answers
    const correct = currentQuestion.blanks.every(blank =>
      userAnswers[blank.id]?.trim().toLowerCase() === blank.correctAnswer.toLowerCase()
    );

    setIsCorrect(correct);
    setShowFeedback(true);

    // Record the answer in progress context
    recordAnswer('identification-terms', correct);
  };

  const handleNext = () => {
    if (currentQuestionIndex < chapterQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Chapter completed - go back to chapters page
      navigate('/identification/chapters');
    }
  };

  const handleRetry = () => {
    // Reset answers and used words
    const resetAnswers = {};
    currentQuestion.blanks.forEach(blank => {
      resetAnswers[blank.id] = '';
    });
    setUserAnswers(resetAnswers);
    setUsedWords([]);
    setShowFeedback(false);
    setSelectedBlank(null);
  };

  if (!currentQuestion) {
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
        currentLevel={currentQuestionIndex + 1}
        totalLevels={chapterQuestions.length}
        currentChallenge={1}
        totalChallenges={1}
        accuracy={0}
        streak={0}
      />

      {/* Main Content */}
      <main className="pt-20 pb-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Brain" size={28} color="#0EA5E9" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                {currentQuestion.title}
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Question {currentQuestionIndex + 1} of {chapterQuestions.length}
            </p>
          </div>

          {/* Context Text */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
            <div className="text-lg leading-relaxed text-slate-200">
              {mode === 'recall' ? (
                // Recall mode: Render text with input fields
                currentQuestion.context.split(/(\[\d+\])/).map((part, index) => {
                  const blankMatch = part.match(/\[(\d+)\]/);
                  if (blankMatch) {
                    const blankNumber = parseInt(blankMatch[1]);
                    const blank = currentQuestion.blanks.find(b => b.id === `blank-${blankNumber}`);

                    return (
                      <input
                        key={index}
                        type="text"
                        value={userAnswers[blank?.id] || ''}
                        onChange={(e) => handleRecallInput(blank?.id, e.target.value)}
                        className="inline-block mx-1 px-2 py-1 w-32 bg-slate-700 border border-slate-600 rounded text-slate-200 text-center focus:border-blue-500 focus:outline-none"
                        placeholder={`[${blankNumber}]`}
                      />
                    );
                  }
                  return <span key={index}>{part}</span>;
                })
              ) : (
                // Recognition mode: Render text with clickable blanks
                renderContextText()
              )}
            </div>
          </div>

          {/* Word Bank (Recognition Mode Only) */}
          {mode === 'recognition' && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Available Words</h3>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, index) => (
                  <button
                    key={index}
                    onClick={() => handleWordSelect(word)}
                    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded border border-slate-600 transition-colors"
                    disabled={!selectedBlank}
                  >
                    {word}
                  </button>
                ))}
                {availableWords.length === 0 && (
                  <p className="text-slate-500 italic">All words have been used</p>
                )}
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
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
              </div>
              <p className="text-sm mb-4">{currentQuestion.explanation}</p>

              <div className="flex gap-4">
                <Button
                  onClick={handleNext}
                  className={isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 hover:bg-slate-700'}
                >
                  {currentQuestionIndex < chapterQuestions.length - 1 ? 'Next Question' : 'Finish Chapter'}
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
          {!showFeedback && (
            <div className="flex justify-center">
              <Button
                onClick={handleSubmit}
                className="bg-[#0EA5E9] hover:bg-[#0284c7] px-8 py-3 text-lg"
              >
                Submit Answer
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Word Bank Modal (Recognition Mode) */}
      {showWordBank && mode === 'recognition' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Select a word</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {availableWords.map((word, index) => (
                <button
                  key={index}
                  onClick={() => handleWordSelect(word)}
                  className="p-3 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded border border-slate-600 transition-colors text-center"
                >
                  {word}
                </button>
              ))}
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
