import React from 'react';
import { PauseCircle, Play } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const PausedOverlay = () => {
  const { isTimerPaused, togglePauseTimer, testMode } = useQuiz();

  if (!isTimerPaused || testMode === 'real') return null;

  return (
    <div class="absolute inset-0 z-30 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div class="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-500/30 animate-pulse">
        <PauseCircle class="w-10 h-10" />
      </div>
      <div class="space-y-1">
        <h3 class="text-xl font-heading font-bold text-slate-900 dark:text-white">Test Paused</h3>
        <p class="text-xs text-slate-600 dark:text-neutral-300 max-w-xs">
          Your timer is paused and question content is hidden to maintain test integrity.
        </p>
      </div>
      <button
        onClick={togglePauseTimer}
        class="px-6 py-2.5 rounded-xl font-heading font-semibold text-xs bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg transition flex items-center gap-2"
      >
        <Play class="w-4 h-4 fill-current" />
        <span>Resume Test Now</span>
      </button>
    </div>
  );
};
