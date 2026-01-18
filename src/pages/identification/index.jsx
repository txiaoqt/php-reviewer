import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';
import ProgressHeader from '../../components/navigation/ProgressHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Chapter configuration with the specific hierarchy
const chapters = [
  { id: 'chapter-1', title: 'Chapter 1', description: 'Software Engineering Fundamentals', isLocked: false },
  { id: 'chapter-1-2', title: 'Chapter 1-2', description: 'Advanced SE Concepts', isLocked: true },
  { id: 'chapter-2', title: 'Chapter 2', description: 'Software Development Life Cycle', isLocked: false },
  { id: 'chapter-3', title: 'Chapter 3', description: 'Requirements Engineering', isLocked: false },
  { id: 'chapter-4', title: 'Chapter 4', description: 'Software Design', isLocked: false },
  { id: 'chapter-5', title: 'Chapter 5', description: 'Software Testing', isLocked: false },
  { id: 'chapter-6', title: 'Chapter 6', description: 'Software Maintenance', isLocked: false },
  { id: 'chapter-7', title: 'Chapter 7', description: 'Software Quality Assurance', isLocked: false },
  { id: 'chapter-8', title: 'Chapter 8', description: 'Project Management', isLocked: false },
  { id: 'chapter-9', title: 'Chapter 9', description: 'Risk Management', isLocked: false },
  { id: 'chapter-10', title: 'Chapter 10', description: 'Configuration Management', isLocked: false }
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
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Brain" size={28} color="#0EA5E9" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                Identification - Technological Terms
              </h1>
            </div>
            <p className="text-lg text-slate-400 max-w-3xl">
              Master key technological concepts through interactive identification exercises.
              Choose a chapter below to begin learning.
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
                        text-xl font-semibold mb-2
                        ${chapter.isLocked ? 'text-slate-500' : 'text-slate-100'}
                      `}>
                        {chapter.title}
                      </h3>
                      <p className={`
                        text-sm leading-relaxed
                        ${chapter.isLocked ? 'text-slate-500' : 'text-slate-400'}
                      `}>
                        {chapter.description}
                      </p>

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full border border-slate-700">
            <div className="text-center mb-6">
              <Icon name="Brain" size={48} color="#0EA5E9" className="mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-100 mb-2">
                {selectedChapter.title}
              </h2>
              <p className="text-slate-400">
                Choose your learning mode for this chapter
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => handleModeSelect('recall')}
                className="w-full bg-[#0EA5E9] hover:bg-[#0284c7] text-white py-4 text-lg font-semibold"
                iconName="Type"
                iconPosition="left"
              >
                <div className="text-left">
                  <div className="font-bold">Recall Mode</div>
                  <div className="text-sm opacity-90">Type answers manually - Hardcore learning</div>
                </div>
              </Button>

              <Button
                onClick={() => handleModeSelect('recognition')}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 text-lg font-semibold"
                iconName="MousePointer"
                iconPosition="left"
              >
                <div className="text-left">
                  <div className="font-bold">Recognition Mode</div>
                  <div className="text-sm opacity-90">Select from word bank - Guided learning</div>
                </div>
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={closeModal}
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

export default IdentificationChapters;
