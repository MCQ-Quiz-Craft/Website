import React from 'react';
import { BookOpen } from 'lucide-react';

export const SolutionCard = ({ question, index, userAnswer }) => {
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === question.correctAnswer;

  let statusBadge = (
    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700">
      Unanswered
    </span>
  );

  if (isAnswered) {
    statusBadge = isCorrect ? (
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
        Correct +1.0
      </span>
    ) : (
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30">
        Incorrect -0.25
      </span>
    );
  }

  return (
    <div class="glass-card rounded-2xl p-5 border border-slate-200 dark:border-neutral-800 space-y-4 shadow-sm">
      {/* Header */}
      <div class="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-neutral-800 pb-3">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-xs font-mono font-bold text-slate-800 dark:text-neutral-200">
            Q{index + 1}.
          </span>
          {question.source && (
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
              <BookOpen class="w-3 h-3 text-cyan-600 dark:text-neutral-400" />
              <span>{question.source}</span>
            </span>
          )}
        </div>
        {statusBadge}
      </div>

      {/* Question & Diagram */}
      <div class="space-y-2">
        <h4 class="text-sm font-medium text-slate-900 dark:text-white leading-relaxed">
          {question.question}
        </h4>
        {question.diagramSvg && (
          <div
            class="p-3 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 max-w-xs mx-auto text-slate-900 dark:text-white"
            dangerouslySetInnerHTML={{ __html: question.diagramSvg }}
          />
        )}
      </div>

      {/* Options Breakdown */}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {question.options.map((optText, optIdx) => {
          const isOfficialCorrect = optIdx === question.correctAnswer;
          const isUserChoice = optIdx === userAnswer;
          const label = String.fromCharCode(65 + optIdx);

          let optStyle = 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200';

          if (isOfficialCorrect) {
            optStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
          } else if (isUserChoice && !isCorrect) {
            optStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500 text-rose-900 dark:text-rose-200';
          }

          return (
            <div
              key={optIdx}
              class={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${optStyle}`}
            >
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold">{label}.</span>
                <span>{optText}</span>
              </div>
              {isOfficialCorrect && (
                <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                  ✓ Correct Answer
                </span>
              )}
              {isUserChoice && !isOfficialCorrect && (
                <span class="text-[10px] font-bold text-rose-700 dark:text-rose-300 shrink-0">
                  ✗ Your Answer
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Explanation */}
      {question.explanation && (
        <div class="bg-slate-100 dark:bg-neutral-900/80 p-3 rounded-xl border border-slate-200 dark:border-neutral-800 space-y-1 text-xs">
          <span class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] block">
            💡 Step-by-Step Explanation:
          </span>
          <p class="text-slate-700 dark:text-neutral-300 leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
