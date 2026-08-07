import React from 'react';
import { Pause, Play, CheckCircle2 } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const QuizHeaderBar = () => {
  const {
    currentQuiz,
    timerSeconds,
    isTimerPaused,
    togglePauseTimer,
    setIsSubmitModalOpen
  } = useQuiz();

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div>
        <span class="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400">Active Test Series</span>
        <h2 class="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white truncate max-w-lg">
          {currentQuiz?.title || 'Question Paper Test Series'}
        </h2>
      </div>

      <div class="flex items-center space-x-3 sm:space-x-4">
        {/* Pause/Resume Timer Control */}
        <button
          onClick={togglePauseTimer}
          class={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 shadow-sm ${
            isTimerPaused
              ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
              : 'bg-slate-200 dark:bg-neutral-900 text-slate-800 dark:text-neutral-200 border-slate-300 dark:border-neutral-700 hover:bg-slate-300 dark:hover:bg-neutral-800'
          }`}
          title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
        >
          {isTimerPaused ? (
            <>
              <Play class="w-3.5 h-3.5 fill-current text-amber-600 dark:text-amber-400" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause class="w-3.5 h-3.5 text-slate-600 dark:text-neutral-400" />
              <span>Pause</span>
            </>
          )}
        </button>

        {/* Timer Display */}
        <div class="flex items-center gap-2 bg-slate-100 dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
          <div class={`w-2 h-2 rounded-full ${isTimerPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></div>
          <span class="font-mono text-sm font-bold text-slate-900 dark:text-white">
            {formatTimer(timerSeconds)}
          </span>
        </div>

        {/* Submit Test Button */}
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          class="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition flex items-center gap-1.5"
        >
          <CheckCircle2 class="w-4 h-4" />
          <span>Submit Test</span>
        </button>
      </div>
    </div>
  );
};
