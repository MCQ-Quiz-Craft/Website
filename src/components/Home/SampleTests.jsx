import React from 'react';
import { History, Clock, ArrowRight } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const SampleTests = () => {
  const { loadDemoTest } = useQuiz();

  return (
    <div class="max-w-4xl mx-auto space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-2">
          <History class="w-4 h-4 text-slate-700 dark:text-neutral-300" /> Sample & Saved Test Series
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pre-loaded attached image test */}
        <div
          onClick={loadDemoTest}
          class="glass-card rounded-xl p-4 border border-slate-300 dark:border-neutral-700 hover:border-slate-900 dark:hover:border-white transition cursor-pointer group flex flex-col justify-between space-y-3 shadow-sm"
        >
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">Ready Demo</span>
              <span class="text-xs text-slate-500 dark:text-neutral-400 font-mono">21 MCQs</span>
            </div>
            <h4 class="font-heading font-bold text-slate-900 dark:text-white text-base group-hover:text-slate-700 dark:group-hover:text-neutral-200 transition">
              बुलियन बीजगणित व लॉजिक गेट्स (Boolean Algebra & Logic Gates)
            </h4>
            <p class="text-xs text-slate-600 dark:text-neutral-400 line-clamp-2">
              Complete question set extracted directly from your attached textbook page (Q215 to Q235) with logic gates, full adder ICs, Boolean expressions, and explanations.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span class="flex items-center gap-1"><Clock class="w-3.5 h-3.5 text-slate-400" /> 20 mins</span>
            <span class="text-slate-900 dark:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Start Test <ArrowRight class="w-4 h-4" /></span>
          </div>
        </div>

        {/* Custom dynamic slot */}
        <div class="glass-card rounded-xl p-4 border border-slate-300 dark:border-neutral-800 flex flex-col justify-between space-y-3 opacity-90 shadow-sm">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">Custom OCR</span>
              <span class="text-xs text-slate-500 dark:text-neutral-400 font-mono">AI Generator</span>
            </div>
            <h4 class="font-heading font-bold text-slate-900 dark:text-white text-base">
              Your Uploaded Test Papers
            </h4>
            <p class="text-xs text-slate-600 dark:text-neutral-400">
              Any image you upload or JSON you import will automatically populate into your personal interactive test platform.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Instant Scoring & Solutions</span>
            <span class="text-slate-500 dark:text-neutral-400">Upload Image Above</span>
          </div>
        </div>
      </div>
    </div>
  );
};
