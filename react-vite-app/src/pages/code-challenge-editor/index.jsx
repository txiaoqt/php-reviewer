import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questions } from '../../data/questions';
import { useProgress } from '../../context/ProgressContext';
import ProgressHeader from '../../components/navigation/ProgressHeader';
import FloatingActionButton from '../../components/navigation/FloatingActionButton';
import CodeEditorWindow from './components/CodeEditorWindow';
import CodePreviewPane from './components/CodePreviewPane';
import HintDrawer from './components/HintDrawer';
import ConfettiAnimation from './components/ConfettiAnimation';
import ExplanationCard from './components/ExplanationCard';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CodeChallengeEditor = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { modules, markModuleCompleted, getCurrentQuestionIndex, setCurrentQuestionIndex, startModuleSession, recordAnswer, getModuleSessionStats } = useProgress();

  // Get all questions for this module (15 total) - memoized to prevent unnecessary recalculations
  const allModuleQuestions = useMemo(() => {
    return questions.filter(q => q.moduleId === moduleId);
  }, [moduleId]);

  // Randomly select 10 questions from the 15 available - memoized to prevent infinite loops
  const moduleQuestions = useMemo(() => {
    const sessionKey = `selected_questions_${moduleId}`;

    // For retakes of completed modules, clear saved selection to get fresh questions
    const currentModule = modules.find(m => m.id === moduleId);
    const isCompleted = currentModule && currentModule.completedLevels === currentModule.totalLevels;

    if (isCompleted) {
      // Clear saved selection for retakes
      localStorage.removeItem(sessionKey);
    }

    // Check if we already have selected questions for this session
    const savedSelection = localStorage.getItem(sessionKey);
    if (savedSelection) {
      const selectedIds = JSON.parse(savedSelection);
      return allModuleQuestions.filter(q => selectedIds.includes(q.id));
    }

    // Randomly select 10 questions from the 15 available
    const shuffled = [...allModuleQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    // Save the selection for this session
    const selectedIds = selectedQuestions.map(q => q.id);
    localStorage.setItem(sessionKey, JSON.stringify(selectedIds));

    return selectedQuestions;
  }, [moduleId, modules, allModuleQuestions]);

  // Safety check: If module not found or no questions
  if (moduleQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-slate-200 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Module not found</h2>
          <p className="text-slate-400 mb-6">The requested learning module doesn't exist or has no questions.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Memoize the initial question index to prevent recalculation on every render
  const initialQuestionIndex = useMemo(() => {
    // For retakes of completed modules, start from 0
    const savedIndex = getCurrentQuestionIndex(moduleId);
    const currentModule = modules.find(m => m.id === moduleId);
    const isCompleted = currentModule && currentModule.completedLevels === currentModule.totalLevels;

    // If module is completed and we're retaking, start from 0
    return isCompleted ? 0 : savedIndex;
  }, [moduleId, modules]);

  const [currentQuestionIndex, setCurrentQuestionIndexLocal] = useState(initialQuestionIndex);
  const [isHintDrawerOpen, setIsHintDrawerOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Memoize currentQuestion to prevent unnecessary re-renders
  const currentQuestion = useMemo(() => {
    return moduleQuestions[currentQuestionIndex];
  }, [moduleQuestions, currentQuestionIndex]);

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
    input3: ""
  });

  // Start module session when component mounts
  useEffect(() => {
    startModuleSession(moduleId);
  }, [moduleId]); // Remove startModuleSession from dependencies to prevent infinite loop

  // Dynamic hints based on current question - memoized to prevent infinite loops
  const hints = useMemo(() => {
    const questionHints = currentQuestion?.hints || [];
    return questionHints.map((hint, index) => ({
      id: index + 1,
      level: index + 1,
      label: hint.includes('First input:') ? '1st Input' :
             hint.includes('Second input:') ? '2nd Input' :
             hint.includes('Third input:') ? '3rd Input' :
             hint.includes('Fourth input:') ? '4th Input' :
             hint.includes('Fifth input:') ? '5th Input' :
             hint.includes('Sixth input:') ? '6th Input' :
             hint.includes('Button classes:') ? 'Button Classes' :
             hint.includes('Menu element:') ? 'Menu Element' :
             hint.includes('Closing tag:') ? 'Closing Tag' :
             `Hint ${index + 1}`, // fallback
      text: hint,
      scrambledWords: [], // Bootstrap hints don't need scrambled words
      revealed: false
    }));
  }, [currentQuestion?.id]); // Only depend on question ID, not the whole object

  const [revealedHints, setRevealedHints] = useState([]);

  // Memoize code lines and line numbers to prevent unnecessary recalculations
  const codeLines = useMemo(() => currentQuestion?.codeLines || [], [currentQuestion]);
  const lineNumbers = useMemo(() => Array.from({ length: codeLines.length }, (_, i) => i + 1), [codeLines]);

  const handleInputChange = (inputId, value) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
  };

  const handleRevealHint = (hintId) => {
    setRevealedHints(prev => [...prev, hintId]);
  };

  const getHintsWithRevealStatus = () => {
    return hints?.map(hint => ({
      ...hint,
      revealed: revealedHints?.includes(hint?.id)
    }));
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setShowErrorAlert(false); // Hide any previous error alert

    setTimeout(() => {
      // Only check inputs that are defined in correctAnswers
      const input1Match = currentQuestion?.correctAnswers?.input1
        ? inputs?.input1?.trim() === currentQuestion?.correctAnswers?.input1
        : true; // If input1 not required, consider it matched

      const input2Match = currentQuestion?.correctAnswers?.input2
        ? inputs?.input2?.trim() === currentQuestion?.correctAnswers?.input2
        : true; // If input2 not required, consider it matched

      const input3Match = currentQuestion?.correctAnswers?.input3
        ? inputs?.input3?.trim() === currentQuestion?.correctAnswers?.input3
        : true; // If input3 not required, consider it matched

      const isCorrect = input1Match && input2Match && input3Match;

      // Record the answer in session stats
      recordAnswer(moduleId, isCorrect);

      setIsRunning(false);

      if (isCorrect) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowExplanation(true);
        }, 1000);
      } else {
        setIsShaking(true);
        setShowErrorAlert(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 500);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 4000); // Hide error alert after 4 seconds
      }
    }, 1500);
  };

  const handleContinue = () => {
    // Check if there are more questions in this module
    if (currentQuestionIndex < moduleQuestions.length - 1) {
      // Move to next question
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndexLocal(nextIndex);
      setCurrentQuestionIndex(moduleId, nextIndex); // Save to context
      setShowExplanation(false);
      setShowConfetti(false);
      setInputs({ input1: "", input2: "", input3: "" });
      setRevealedHints([]); // Reset revealed hints for new question
    } else {
      // This was the last question - mark module as completed and go to success
      markModuleCompleted(moduleId);
      // Use window.location.href for reliable navigation
      window.location.href = `/challenge-success?moduleId=${moduleId}`;
    }
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }
      .animate-shake {
        animation: shake 0.5s;
      }
    `;
    document.head?.appendChild(style);
    return () => document.head?.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      {/* Error Alert */}
      {showErrorAlert && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-red-500/90 text-white px-4 py-3 rounded-lg shadow-lg border border-red-400">
          <div className="flex items-center gap-2">
            <Icon name="AlertCircle" size={20} color="#fff" />
            <span className="font-medium">Incorrect answer, please use the hints if needed</span>
          </div>
        </div>
      )}

      {/* Header */}
      <ProgressHeader
        isMinimal={true}
        currentLevel={1}
        totalLevels={10}
        currentChallenge={1}
        totalChallenges={15}
        accuracy={85}
        streak={7}
      />
      {/* Main Content */}
      <main className="pt-20 pb-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Challenge Info */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Code2" size={20} color="#0EA5E9" />
              <span className="text-sm md:text-base text-[#0EA5E9] font-medium">Level 1 - Challenge 1</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-mono font-bold text-slate-100 mb-2">
              {currentQuestion?.title}
            </h1>
            <p className="text-sm md:text-base text-slate-400">{currentQuestion?.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Code Editor */}
            <CodeEditorWindow
              fileName={currentQuestion?.fileName || "challenge.php"}
              lineNumbers={lineNumbers}
              codeLines={codeLines}
              inputs={inputs}
              onInputChange={handleInputChange}
              isShaking={isShaking}
            />

            {/* Live Preview Pane */}
            <CodePreviewPane
              currentQuestion={currentQuestion}
              inputs={inputs}
            />
          </div>

          {/* Hint Button - Desktop */}
          <div className="hidden lg:block mt-6">
            <Button
              variant="outline"
              onClick={() => setIsHintDrawerOpen(true)}
              iconName="Lightbulb"
              iconPosition="left"
            >
              Need a Hint?
            </Button>
          </div>

          {/* Hint Button - Mobile */}
          <div className="lg:hidden fixed bottom-24 left-4 z-30">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsHintDrawerOpen(true)}
              iconName="Lightbulb"
              iconPosition="left"
            >
              Hints
            </Button>
          </div>
        </div>
      </main>
      {/* Floating Run Button */}
      <FloatingActionButton
        variant="bottom-right"
        action="run"
        onClick={handleRunCode}
        loading={isRunning}
      />
      {/* Hint Drawer */}
      <HintDrawer
        isOpen={isHintDrawerOpen}
        onClose={() => setIsHintDrawerOpen(false)}
        hints={getHintsWithRevealStatus()}
        onRevealHint={handleRevealHint}
      />
      {/* Confetti Animation */}
      <ConfettiAnimation
        isActive={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />
      {/* Explanation Card */}
      <ExplanationCard
        isVisible={showExplanation}
        title={currentQuestion?.title || "Challenge Complete"}
        explanation={currentQuestion?.explanation || "Great job completing this challenge!"}
        codeExample={currentQuestion?.codeExample || ""}
        buttonText={currentQuestionIndex < moduleQuestions.length - 1 ? "Continue to Next Challenge" : "Finish Module"}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default CodeChallengeEditor;
