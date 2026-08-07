import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const SubmitConfirmModal = () => {
  const {
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    currentQuiz,
    userAnswers,
    markedForReview,
    finalizeTestSubmission
  } = useQuiz();

  if (!isSubmitModalOpen || !currentQuiz) return null;

  const total = currentQuiz.questions.length;
  const answered = Object.keys(userAnswers).length;
  const marked = Object.values(markedForReview).filter(Boolean).length;
  const unanswered = total - answered;

  return (
    <div class="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 space-y-5 text-center relative shadow-2xl">
        <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 mx-auto flex items-center justify-center border border-emerald-300 dark:border-emerald-500/30">
          <HelpCircle class="w-8 h-8" />
        </div>

        <div class="space-y-1">
          <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Submit Your Test?</h3>
          <p class="text-xs text-slate-500 dark:text-neutral-400">Are you sure you want to finish and generate your score report?</p>
        </div>

        <div class="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-neutral-900 p-3 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs">
          <div>
            <div class="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-base">{answered}</div>
            <div class="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Answered</div>
          </div>
          <div>
            <div class="font-mono font-bold text-rose-600 dark:text-rose-400 text-base">{unanswered}</div>
            <div class="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Unanswered</div>
          </div>
          <div>
            <div class="font-mono font-bold text-purple-600 dark:text-purple-400 text-base">{marked}</div>
            <div class="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-semibold">Review</div>
          </div>
        </div>

        <div class="flex items-center justify-center space-x-3 pt-2">
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            class="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700 transition"
          >
            Continue Test
          </button>
          <button
            onClick={finalizeTestSubmission}
            class="px-6 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition"
          >
            Yes, Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};
