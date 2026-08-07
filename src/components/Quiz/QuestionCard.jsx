import React from 'react';
import { Bookmark, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const QuestionCard = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    selectOption,
    clearResponse,
    markedForReview,
    toggleMarkForReview,
    navigateQuestion
  } = useQuiz();

  if (!currentQuiz || !currentQuiz.questions[currentQuestionIndex]) return null;

  const currentQ = currentQuiz.questions[currentQuestionIndex];
  const isMarked = !!markedForReview[currentQuestionIndex];
  const selectedOpt = userAnswers[currentQuestionIndex];

  return (
    <div class="glass-panel rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 space-y-6 shadow-sm">
      {/* Question Header & Review Toggle */}
      <div class="flex items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-neutral-800">
        <div class="flex items-center gap-3 flex-wrap">
          <span class="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-200 dark:bg-neutral-900 text-slate-800 dark:text-neutral-200 border border-slate-300 dark:border-neutral-700">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </span>
          {currentQ.source && (
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
              <BookOpen class="w-3 h-3 text-cyan-600 dark:text-neutral-400" />
              <span>Source: {currentQ.source}</span>
            </span>
          )}
        </div>
        <button
          onClick={toggleMarkForReview}
          class={`px-3 py-1 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 ${
            isMarked
              ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-500/40'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700'
          }`}
        >
          <Bookmark class="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
          <span>{isMarked ? 'Marked for Review ✓' : 'Mark for Review'}</span>
        </button>
      </div>

      {/* Question Text & Diagram */}
      <div class="space-y-4">
        <h3 class="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h3>
        {currentQ.diagramSvg && (
          <div
            class="p-4 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 max-w-md mx-auto flex items-center justify-center text-slate-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: currentQ.diagramSvg }}
          />
        )}
      </div>

      {/* MCQ Options */}
      <div class="space-y-3 my-4">
        {currentQ.options.map((optText, optIdx) => {
          const isSelected = selectedOpt === optIdx;
          const label = String.fromCharCode(65 + optIdx); // 'A', 'B', 'C', 'D'

          return (
            <div
              key={optIdx}
              onClick={() => selectOption(optIdx)}
              class={`p-3.5 sm:p-4 rounded-xl border transition cursor-pointer flex items-center gap-3.5 group ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-md'
                  : 'bg-white dark:bg-neutral-900/90 text-slate-800 dark:text-neutral-200 border-slate-200 dark:border-neutral-800 hover:border-slate-400 dark:hover:border-neutral-700'
              }`}
            >
              <div
                class={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center border shrink-0 transition ${
                  isSelected
                    ? 'bg-white text-slate-900 dark:bg-black dark:text-white border-white dark:border-black'
                    : 'bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700'
                }`}
              >
                {label}
              </div>
              <span class="text-sm font-medium leading-normal">{optText}</span>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div class="pt-6 border-t border-slate-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center space-x-2">
          <button
            onClick={clearResponse}
            class="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-200 hover:bg-slate-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700 transition"
          >
            Clear Response
          </button>
        </div>
        <div class="flex items-center space-x-3">
          <button
            onClick={() => navigateQuestion(-1)}
            disabled={currentQuestionIndex === 0}
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-white border border-slate-300 dark:border-neutral-700 transition flex items-center gap-1 disabled:opacity-40"
          >
            <ChevronLeft class="w-4 h-4" /> Previous
          </button>
          <button
            onClick={() => navigateQuestion(1)}
            class="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-md transition flex items-center gap-1"
          >
            <span>Save & Next</span>
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
