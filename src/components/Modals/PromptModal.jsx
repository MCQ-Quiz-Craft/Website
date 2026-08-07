import React, { useState } from 'react';
import { X, Code, Copy, Check } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROMPT_TEMPLATE } from '../../constants/demoData';

export const PromptModal = () => {
  const { isPromptModalOpen, setIsPromptModalOpen } = useQuiz();
  const [copied, setCopied] = useState(false);

  if (!isPromptModalOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PROMPT_TEMPLATE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div class="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 space-y-5 relative shadow-2xl">
        <button
          onClick={() => setIsPromptModalOpen(false)}
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Code class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">AI Image-to-JSON Prompt Template</h3>
            <p class="text-xs text-slate-500 dark:text-neutral-400">Copy this prompt and attach your image in ChatGPT / Gemini / Claude.</p>
          </div>
        </div>

        <div class="relative">
          <textarea
            readOnly
            rows={10}
            value={PROMPT_TEMPLATE}
            class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-neutral-100 font-mono text-xs rounded-xl p-3 focus:outline-none select-all"
          />
          <button
            onClick={copyToClipboard}
            class="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow transition flex items-center gap-1.5"
          >
            {copied ? <Check class="w-3.5 h-3.5 text-emerald-400" /> : <Copy class="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>

        <div class="text-xs text-slate-600 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 p-3 rounded-lg border border-slate-200 dark:border-neutral-800">
          <strong class="text-slate-900 dark:text-white">How it works:</strong> Paste this exact prompt along with your image into any AI chat interface. When the AI responds with JSON code, copy the JSON block and paste it in the "Paste JSON / Text Series" tab!
        </div>
      </div>
    </div>
  );
};
