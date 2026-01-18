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

  const { recordAnswer, getModuleProgress } = useProgress();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showWordBank, setShowWordBank] = useState(false);

  // Get questions for this chapter
  const chapterQuestions = useMemo(() => {
    return getQuestionsForChapter(chapterId);
  }, [chapterId]);

  const currentQuestion = chapterQuestions[currentQuestionIndex];

  // Initialize user answers when question changes
  useEffect(() => {
    if (currentQuestion) {
      setUserAnswers({});
      setShowFeedback(false);
    }
  }, [currentQuestion]);

  const handleWordSelect = (word) => {
    setUserAnswers({ answer: word });
    setShowWordBank(false);
  };

  const handleSubmit = () => {
    if (!currentQuestion || !userAnswers.answer) return;

    const correct = userAnswers.answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    // Record the answer in session stats
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
    setUserAnswers({});
    setShowFeedback(false);
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
                Software Engineering Fundamentals
              </h1>
            </div>
            <p className="text-lg text-slate-400">
              Question {currentQuestionIndex + 1} of {chapterQuestions.length}
            </p>
          </div>

          {/* Context Text */}
          <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
            <div className="text-lg leading-relaxed text-slate-200 mb-6">
              {currentQuestion.context}
            </div>

            {/* Answer Blank Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowWordBank(true)}
                className="px-6 py-4 bg-slate-700 hover:bg-slate-600 border-2 border-slate-600 rounded-lg text-slate-200 text-xl font-mono transition-all hover:border-blue-500 hover:bg-blue-500/10"
                disabled={showFeedback}
              >
                {userAnswers.answer || '[ Tap to Select Term ]'}
              </button>
            </div>
          </div>

          {/* Word Bank Display */}
          {currentQuestion.wordBank && (
            <div className="bg-slate-800 rounded-lg p-6 mb-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Available Terms</h3>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.wordBank.map((word, index) => {
                  const isUsed = userAnswers.answer === word;
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
              <div className="text-sm text-slate-400 mb-4">
                <strong>Correct Answer:</strong> {currentQuestion.correctAnswer}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleNext}
                  className={isCorrect ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 hover:bg-slate-700'}
                >
                  {currentQuestionIndex < chapterQuestions.length - 1 ? 'Next Question' : 'Complete Chapter'}
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
          {!showFeedback && userAnswers.answer && (
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

      {/* Word Bank Modal */}
      {showWordBank && currentQuestion.wordBank && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full border border-slate-700">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Select the Correct Term</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {currentQuestion.wordBank.map((word, index) => {
                const isUsed = userAnswers.answer === word;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleWordSelect(word);
                      setShowWordBank(false);
                    }}
                    className={`p-3 rounded border transition-colors text-center ${
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
