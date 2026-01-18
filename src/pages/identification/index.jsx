import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import ProgressHeader from '../../components/navigation/ProgressHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Chapter configuration with the specific hierarchy
const chapters = [
  { id: 'chapter-1', title: 'Chapter 1', description: 'This is the chapter 1 based on the google classroom', isLocked: false },
  { id: 'chapter-1-2', title: 'Chapter 1-2', description: 'This is the chapter 1-2 based on the google classroom', isLocked: true },
  { id: 'chapter-2', title: 'Chapter 2', description: 'This is the chapter 2 based on the google classroom', isLocked: false },
  { id: 'chapter-3', title: 'Chapter 3', description: 'This is the chapter 3 based on the google classroom', isLocked: false },
  { id: 'chapter-3-2', title: 'Chapter 3-2', description: 'This is the chapter 3-2 based on the google classroom', isLocked: false },
  { id: 'chapter-4', title: 'Chapter 4', description: 'This is the chapter 4 based on the google classroom', isLocked: false },
  { id: 'chapter-5-1', title: 'Chapter 5-1', description: 'This is the chapter 5-1 based on the google classroom', isLocked: false },
  { id: 'chapter-5-2', title: 'Chapter 5-2', description: 'This is the chapter 5-2 based on the google classroom', isLocked: false },
  { id: 'chapter-6-1', title: 'Chapter 6-1', description: 'This is the chapter 6-1 based on the google classroom', isLocked: false },
  { id: 'chapter-6-2', title: 'Chapter 6-2', description: 'This is the chapter 6-2 based on the google classroom', isLocked: false },
  { id: 'chapter-7', title: 'Chapter 7', description: 'This is the chapter 7 based on the google classroom', isLocked: false }
];

const IdentificationChapters = () => {
  const navigate = useNavigate();
  const { getModuleProgress } = useProgress();
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showModeModal, setShowModeModal] = useState(false);

  // Get progress for the identification module
  const identificationProgress = getModuleProgress('identification-terms') || {};

  // Update chapter locking logic based on progress
  const getUpdatedChapters = () => {
    return chapters.map(chapter => {
      if (chapter.id === 'chapter-1-2') {
        // Chapter 1-2 is locked until Chapter 1 is completed
        const chapter1Completed = identificationProgress['chapter-1']?.completedLevels === identificationProgress['chapter-1']?.totalLevels;
        return { ...chapter, isLocked: !chapter1Completed };
      }
      return chapter;
    });
  };

  const updatedChapters = getUpdatedChapters();

  const handleChapterClick = (chapter) => {
    if (chapter.isLocked) return;

    setSelectedChapter(chapter);
    setShowModeModal(true);
  };

  const handleModeSelect = (mode) => {
    if (!selectedChapter) return;

    // Navigate to the quiz with the selected mode
    navigate(`/identification/quiz/${selectedChapter.id}?mode=${mode}`);
    setShowModeModal(false);
    setSelectedChapter(null);
  };

  const closeModal = () => {
    setShowModeModal(false);
    setSelectedChapter(null);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      {/* Header */}
      <ProgressHeader
        isMinimal={true}
        currentLevel={1}
        totalLevels={11}
        currentChallenge={1}
        totalChallenges={11}
        accuracy={0}
        streak={0}
      />

      {/* Main Content */}
      <main className="pt-20 pb-32 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
              Identification
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mt-1 leading-tight">
              Technological Terms
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              Choose a chapter to begin learning
            </p>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updatedChapters.map((chapter, index) => {
              const chapterProgress = identificationProgress[chapter.id] || {};
              const isCompleted = chapterProgress.completedLevels === chapterProgress.totalLevels;

              return (
                <div
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter)}
                  className={`
                    relative p-6 rounded-lg border transition-all duration-200 cursor-pointer
                    ${chapter.isLocked
                      ? 'bg-slate-800/50 border-slate-700 opacity-60 cursor-not-allowed'
                      : 'bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-800/80'
                    }
                  `}
                >
                  {/* Lock Icon for locked chapters */}
                  {chapter.isLocked && (
                    <div className="absolute top-4 right-4">
                      <Icon name="Lock" size={20} color="#64748b" />
                    </div>
                  )}

                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} color="#fff" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                      ${chapter.isLocked
                        ? 'bg-slate-700'
                        : isCompleted
                          ? 'bg-green-500'
                          : 'bg-[#0EA5E9]'
                      }
                    `}>
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        text-xl font-semibold
                        ${chapter.isLocked ? 'text-slate-500' : 'text-slate-100'}
                      `}>
                        {chapter.title}
                      </h3>

                      {/* Progress Indicator */}
                      {!chapter.isLocked && chapterProgress.totalLevels > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                            <span>Progress</span>
                            <span>{chapterProgress.completedLevels}/{chapterProgress.totalLevels}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-[#0EA5E9] h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${(chapterProgress.completedLevels / chapterProgress.totalLevels) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Mode Selection Modal */}
      {showModeModal && selectedChapter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0d1117] w-full max-w-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">

            {/* Header Section */}
            <div className="p-6 text-center border-b border-slate-800 bg-slate-800/50">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Brain" size={24} className="text-blue-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-1">
                Choose Learning Mode
              </h2>
              <p className="text-slate-400 text-sm">
                {selectedChapter.title}: {selectedChapter.description}
              </p>
            </div>

            {/* Selection Cards */}
            <div className="p-6 space-y-4">

              {/* Option 1: Recognition */}
              <button
                onClick={() => handleModeSelect('recognition')}
                className="w-full group relative flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Icon name="Eye" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                    Recognition Mode
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select answers from a word bank. Best for guided learning.
                  </p>
                </div>
              </button>

              {/* Option 2: Recall */}
              <button
                onClick={() => handleModeSelect('recall')}
                className="w-full group relative flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500 hover:bg-purple-500/5 transition-all text-left"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  <Icon name="Keyboard" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 group-hover:text-purple-400 transition-colors">
                    Recall Mode
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Type answers manually. Hardcore learning for mastery.
                  </p>
                </div>
              </button>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 text-center">
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentificationChapters;
