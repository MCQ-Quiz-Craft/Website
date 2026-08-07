import React from 'react';
import { useQuiz } from '../../context/QuizContext';

export const QuestionPalette = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    markedForReview,
    visitedQuestions,
    jumpToQuestion
  } = useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div class="space-y-6">
      <div class="glass-panel rounded-2xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4 shadow-sm">
        <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-neutral-400 flex items-center justify-between">
          <span>Question Palette</span>
          <span class="font-mono text-slate-500 dark:text-neutral-400 text-[11px]">
            {answeredCount}/{totalQuestions} Answered
          </span>
        </h4>

        {/* Question Grid */}
        <div class="grid grid-cols-5 gap-2 max-h-[320px] overflow-y-auto pr-1">
          {currentQuiz.questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = userAnswers[idx] !== undefined;
            const isMarked = !!markedForReview[idx];
            const isVisited = !!visitedQuestions[idx];

            let btnClass = 'bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700'; // Default Not Visited

            if (isAnswered) {
              btnClass = 'bg-emerald-600 text-white border-emerald-500 font-bold';
            } else if (isMarked) {
              btnClass = 'bg-purple-600 text-white border-purple-500 font-bold';
            } else if (isVisited) {
              btnClass = 'bg-rose-600 text-white border-rose-500 font-bold';
            }

            if (isCurrent) {
              btnClass += ' ring-2 ring-slate-900 dark:ring-white ring-offset-2 dark:ring-offset-black scale-105 shadow-md';
            }

            return (
              <button
                key={idx}
                onClick={() => jumpToQuestion(idx)}
                class={`h-10 rounded-lg text-xs font-mono transition flex items-center justify-center border ${btnClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Status Legend */}
        <div class="pt-4 border-t border-slate-200 dark:border-neutral-800 space-y-2 text-[11px]">
          <div class="grid grid-cols-2 gap-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-md bg-emerald-600 border border-emerald-400 shrink-0"></span>
              <span class="text-slate-700 dark:text-neutral-300">Answered</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-md bg-rose-600 border border-rose-400 shrink-0"></span>
              <span class="text-slate-700 dark:text-neutral-300">Unanswered</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-md bg-purple-600 border border-purple-400 shrink-0"></span>
              <span class="text-slate-700 dark:text-neutral-300">Marked Review</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-md bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 shrink-0"></span>
              <span class="text-slate-500 dark:text-neutral-400">Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
