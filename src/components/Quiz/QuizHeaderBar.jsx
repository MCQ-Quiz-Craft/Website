import React from 'react';
import { Pause, Play, CheckCircle2, Trophy, BookOpen, Clock } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const QuizHeaderBar = () => {
  const {
    currentQuiz,
    timerSeconds,
    isTimerPaused,
    togglePauseTimer,
    setIsSubmitModalOpen,
    testMode,
    timeLimitMinutes
  } = useQuiz();

  const isRealTest = testMode === 'real';
  const totalSecondsLimit = (timeLimitMinutes || 15) * 60;
  const remainingSeconds = Math.max(0, totalSecondsLimit - timerSeconds);
  const isUrgent = isRealTest && remainingSeconds <= 300; // < 5 mins left

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 shadow-sm">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-neutral-400">Active Test Series</span>
          {isRealTest ? (
            <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50">
              <Trophy class="w-3 h-3 text-rose-500" /> Real Test Series (No Pause)
            </span>
          ) : (
            <span class="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/50">
              <BookOpen class="w-3 h-3 text-cyan-500" /> Practice Mode
            </span>
          )}
        </div>
        <h2 class="text-lg sm:text-xl font-heading font-bold text-slate-900 dark:text-white truncate max-w-lg">
          {currentQuiz?.title || 'Question Paper Test Series'}
        </h2>
      </div>

      <div class="flex items-center space-x-3 sm:space-x-4">
        {/* Pause/Resume Control (Only enabled in Practice Mode) */}
        {!isRealTest ? (
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
        ) : (
          <div
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-neutral-900/60 text-slate-400 dark:text-neutral-500 border border-slate-200 dark:border-neutral-800 cursor-not-allowed flex items-center gap-1.5"
            title="Pause feature is disabled in Real Test Mode"
          >
            <Pause class="w-3.5 h-3.5 opacity-50" />
            <span class="line-through">Pause Disabled</span>
          </div>
        )}

        {/* Timer Display */}
        <div class={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition ${
          isUrgent
            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 animate-pulse'
            : 'bg-slate-100 dark:bg-neutral-900 border-slate-200 dark:border-neutral-800'
        }`}>
          <div class={`w-2 h-2 rounded-full ${
            isUrgent ? 'bg-rose-500' : isTimerPaused ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
          }`}></div>
          <span class={`font-mono text-sm font-bold ${
            isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
          }`}>
            {isRealTest ? formatTimer(remainingSeconds) : formatTimer(timerSeconds)}
          </span>
          {isRealTest && <span class="text-[10px] text-slate-400 font-mono">left</span>}
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
