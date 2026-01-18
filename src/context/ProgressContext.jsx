import React, { createContext, useContext, useState, useEffect } from 'react';
import { modules as initialModules } from '../data/modules';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  // Load progress from LocalStorage or default to initialModules
  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('codefill_progress');
    // Force reload new modules if the structure has changed (check if we have exactly 2 modules now)
    if (saved) {
      const parsed = JSON.parse(saved);
      // If we have more than 2 modules or the second module isn't "identification-terms", reload from file
      if (parsed.length !== 2 || parsed[1]?.id !== 'identification-terms') {
        console.log('Module structure changed, reloading from file');
        return initialModules;
      }
      return parsed;
    }
    return initialModules;
  });

  // Track current question index for each module
  const [currentQuestions, setCurrentQuestions] = useState(() => {
    const saved = localStorage.getItem('codefill_current_questions');
    return saved ? JSON.parse(saved) : {};
  });

  // Track session stats for each module
  const [sessionStats, setSessionStats] = useState(() => {
    const saved = localStorage.getItem('codefill_session_stats');
    return saved ? JSON.parse(saved) : {};
  });



  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('codefill_progress', JSON.stringify(modules));
  }, [modules]);

  // Save current questions to LocalStorage
  useEffect(() => {
    localStorage.setItem('codefill_current_questions', JSON.stringify(currentQuestions));
  }, [currentQuestions]);

  // Save session stats to LocalStorage
  useEffect(() => {
    localStorage.setItem('codefill_session_stats', JSON.stringify(sessionStats));
  }, [sessionStats]);



  // Function to unlock the next module
  const markModuleCompleted = (completedModuleId) => {
    setModules(prevModules => {
      const currentIndex = prevModules.findIndex(m => m.id === completedModuleId);

      // If there is a next module, unlock it
      if (currentIndex !== -1 && currentIndex + 1 < prevModules.length) {
        const newModules = [...prevModules];

        // 1. Mark current as completed
        newModules[currentIndex].completedLevels = newModules[currentIndex].totalLevels;

        // 2. Unlock next one
        newModules[currentIndex + 1].isLocked = false;

        return newModules;
      }
      return prevModules;
    });
  };

  // Calculate Global Stats for the Dashboard
  const getGlobalStats = () => {
    const unlocked = modules.filter(m => !m.isLocked).length;
    const completed = modules.filter(m => m.completedLevels === m.totalLevels).length;
    const totalXP = completed * 500; // Arbitrary 500XP per module
    return { unlocked, completed, totalXP };
  };

  // Get current question index for a module
  const getCurrentQuestionIndex = (moduleId) => {
    return currentQuestions[moduleId] || 0;
  };

  // Set current question index for a module
  const setCurrentQuestionIndex = (moduleId, questionIndex) => {
    setCurrentQuestions(prev => ({
      ...prev,
      [moduleId]: questionIndex
    }));
  };

  // Start a session for a module
  const startModuleSession = (moduleId) => {
    setSessionStats(prev => ({
      ...prev,
      [moduleId]: {
        startTime: Date.now(),
        correctAnswers: 0,
        totalAttempts: 0,
        questionsAnswered: 0
      }
    }));
  };

  // Track an answer for a module session
  const recordAnswer = (moduleId, isCorrect) => {
    setSessionStats(prev => {
      const current = prev[moduleId] || { correctAnswers: 0, totalAttempts: 0, questionsAnswered: 0 };
      return {
        ...prev,
        [moduleId]: {
          ...current,
          correctAnswers: current.correctAnswers + (isCorrect ? 1 : 0),
          totalAttempts: current.totalAttempts + 1,
          questionsAnswered: current.questionsAnswered + 1
        }
      };
    });
  };

  // Get session stats for a module
  const getModuleSessionStats = (moduleId) => {
    const stats = sessionStats[moduleId];
    if (!stats) return null;

    const timeSpent = Math.floor((Date.now() - stats.startTime) / 1000 / 60); // minutes
    const accuracy = stats.totalAttempts > 0 ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100) : 0;
    const challenges = stats.questionsAnswered;

    return {
      accuracy,
      timeSpent,
      challenges
    };
  };



  return (
    <ProgressContext.Provider value={{
      modules,
      markModuleCompleted,
      getGlobalStats,
      getCurrentQuestionIndex,
      setCurrentQuestionIndex,
      startModuleSession,
      recordAnswer,
      getModuleSessionStats
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
