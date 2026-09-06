import React, { useState } from 'react';
import { AlertTriangle, X, Copy, Check, FileText } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const ErrorAlertModal = () => {
  const { errorModal, closeErrorModal } = useQuiz();
  const [copiedError, setCopiedError] = useState(false);

  if (!errorModal.isOpen) return null;

  const copyErrorToClipboard = () => {
    navigator.clipboard.writeText(`${errorModal.title}\n${errorModal.message}`).then(() => {
      setCopiedError(true);
      setTimeout(() => setCopiedError(false), 2000);
    });
  };

  return (
    <div class="fixed inset-0 z-50 bg-slate-900/70 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div class="glass-panel w-full max-w-xl rounded-2xl p-6 border border-rose-200 dark:border-rose-900/60 space-y-5 relative shadow-2xl bg-white/95 dark:bg-neutral-900/95 overflow-hidden">
        {/* Top Accent Line */}
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600" />

        {/* Close Button */}
        <button
          onClick={closeErrorModal}
          class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition"
          aria-label="Close"
        >
          <X class="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div class="flex items-start gap-4 pr-6">
          <div class="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-500/30 shrink-0 shadow-sm">
            <AlertTriangle class="w-6 h-6" />
          </div>
          <div>
            <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">
              {errorModal.title || 'Parsing Error'}
            </h3>
            <p class="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              An issue occurred while parsing the JSON payload or AI response.
            </p>
          </div>
        </div>

        {/* Error Detail Box */}
        <div class="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <FileText class="w-3.5 h-3.5" /> Error Details
            </span>
            <button
              onClick={copyErrorToClipboard}
              class="text-xs text-rose-700 dark:text-rose-300 hover:underline flex items-center gap-1 font-medium"
            >
              {copiedError ? (
                <>
                  <Check class="w-3 h-3 text-emerald-500" /> Copied Error
                </>
              ) : (
                <>
                  <Copy class="w-3 h-3" /> Copy Error
                </>
              )}
            </button>
          </div>
          <p class="text-xs font-mono text-rose-900 dark:text-rose-200 break-words whitespace-pre-wrap leading-relaxed">
            {errorModal.message}
          </p>
        </div>

        {/* Footer Dismiss */}
        <div class="pt-3 border-t border-slate-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={closeErrorModal}
            class="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
