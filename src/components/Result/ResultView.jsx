import React from 'react';
import { Award, HelpCircle, CheckCircle, XCircle, Clock, FileText, RotateCcw, Plus } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { SolutionCard } from './SolutionCard';

export const ResultView = () => {
  const { currentQuiz, userAnswers, timerSeconds, startQuiz, navigateTo } = useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  let correctCount = 0;
  let incorrectCount = 0;

  currentQuiz.questions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    if (userChoice !== undefined) {
      if (userChoice === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <section class="space-y-8 transition-all duration-300">
      {/* Summary Banner */}
      <div class="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-neutral-800 relative overflow-hidden shadow-sm">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div class="space-y-3 lg:col-span-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-semibold">
              <Award class="w-4 h-4" /> Test Completed Successfully
            </div>
            <h2 class="text-2xl sm:text-4xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight">
              Performance & Diagnostic Summary
            </h2>
            <p class="text-slate-600 dark:text-neutral-400 text-xs sm:text-sm">
              Detailed score report, question accuracy analysis, and AI step-by-step explanations.
            </p>
          </div>

          {/* Score Card Ring */}
          <div class="glass-card rounded-2xl p-6 border border-slate-300 dark:border-neutral-700 text-center space-y-2 flex flex-col items-center justify-center glow-effect shadow-md">
            <div class="text-xs uppercase font-bold tracking-widest text-slate-500 dark:text-neutral-400">Your Score</div>
            <div class="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white font-mono">
              {correctCount} / {totalQuestions}
            </div>
            <div class="inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-mono bg-slate-200 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-300 dark:border-neutral-700">
              {percentage}% Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 space-y-1 shadow-sm">
          <div class="text-xs text-slate-500 dark:text-neutral-400 font-medium flex items-center justify-between">
            <span>Total Questions</span>
            <HelpCircle class="w-4 h-4 text-slate-400" />
          </div>
          <div class="text-2xl font-bold font-mono text-slate-900 dark:text-white">{totalQuestions}</div>
        </div>

        <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 space-y-1 shadow-sm">
          <div class="text-xs text-slate-500 dark:text-neutral-400 font-medium flex items-center justify-between">
            <span>Correct Answers</span>
            <CheckCircle class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div class="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{correctCount}</div>
        </div>

        <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 space-y-1 shadow-sm">
          <div class="text-xs text-slate-500 dark:text-neutral-400 font-medium flex items-center justify-between">
            <span>Incorrect Answers</span>
            <XCircle class="w-4 h-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div class="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">{incorrectCount}</div>
        </div>

        <div class="glass-panel rounded-2xl p-4 border border-slate-200 dark:border-neutral-800 space-y-1 shadow-sm">
          <div class="text-xs text-slate-500 dark:text-neutral-400 font-medium flex items-center justify-between">
            <span>Time Spent</span>
            <Clock class="w-4 h-4 text-amber-500" />
          </div>
          <div class="text-2xl font-bold font-mono text-slate-900 dark:text-white">{formatTimer(timerSeconds)}</div>
        </div>
      </div>

      {/* Solutions & Detailed Explanations Section */}
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <FileText class="w-5 h-5 text-slate-700 dark:text-neutral-300" /> Detailed Solutions & Explanations
          </h3>
          <div class="flex items-center space-x-2">
            <button
              onClick={() => startQuiz(currentQuiz)}
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-white border border-slate-300 dark:border-neutral-700 transition flex items-center gap-1"
            >
              <RotateCcw class="w-3.5 h-3.5" /> Re-take Test
            </button>
            <button
              onClick={() => navigateTo('home')}
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black transition flex items-center gap-1"
            >
              <Plus class="w-3.5 h-3.5" /> Create New Test
            </button>
          </div>
        </div>

        {/* Solution Items List */}
        <div class="space-y-4">
          {currentQuiz.questions.map((q, idx) => (
            <SolutionCard
              key={idx}
              index={idx}
              question={q}
              userAnswer={userAnswers[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
