import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HintDrawer = ({ 
  isOpen = false,
  onClose = () => {},
  hints = [],
  onRevealHint = () => {}
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-[#1e1e1e] border-l border-[#333] shadow-2xl z-[100] transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#333]">
          <div className="flex items-center gap-2">
            <Icon name="Lightbulb" size={20} color="#F59E0B" />
            <h3 className="font-mono font-semibold text-lg text-slate-200">Hints</h3>
          </div>
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-[#333] hover:bg-[#444] text-white transition-colors duration-200 border border-[#555]"
              aria-label="Close hints"
              title="Close hints"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Hints Content */}
        <div className="p-4 md:p-6 space-y-4 overflow-y-auto h-[calc(100%-80px)]">
          {hints?.map((hint, index) => (
            <div 
              key={hint?.id}
              className="bg-[#2d2d2d] rounded-lg p-4 border border-[#333]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="HelpCircle" size={16} color="#F59E0B" />
                  <span className="text-sm text-[#F59E0B] font-medium">{hint?.label || `Level ${hint?.level}`}</span>
                </div>
                {!hint?.revealed && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRevealHint(hint?.id)}
                  >
                    Reveal
                  </Button>
                )}
              </div>

              {hint?.revealed ? (
                <>
                  <p className="text-slate-300 mb-4 text-sm md:text-base">{hint?.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {hint?.scrambledWords?.map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="inline-flex items-center px-3 py-1.5 bg-[#1e1e1e] rounded border border-[#0EA5E9] text-[#0EA5E9] font-mono text-xs md:text-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-slate-500 italic text-sm">Click reveal to see this hint</p>
              )}
            </div>
          ))}

          {hints?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Lightbulb" size={48} color="#64748B" className="mx-auto mb-4" />
              <p className="text-slate-400">No hints available for this challenge</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HintDrawer;
