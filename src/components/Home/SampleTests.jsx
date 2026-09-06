import React from 'react';
import { History, Clock, ArrowRight, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const SampleTests = () => {
  const { loadDemoTest } = useQuiz();

  return (
    <div class="w-full space-y-2.5">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 flex items-center gap-1.5">
          <History class="w-3.5 h-3.5 text-slate-800 dark:text-neutral-200" /> Sample & Pre-Loaded Test Series
        </h3>
        <span class="text-[10px] text-slate-400 dark:text-neutral-500 font-mono">1-Click Launch</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Pre-loaded attached image test */}
        <div
          onClick={loadDemoTest}
          class="glass-card rounded-xl p-3 border border-slate-300 dark:border-neutral-700 hover:border-slate-900 dark:hover:border-white transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-2 shadow-sm hover:shadow-md"
        >
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1">
                <Sparkles class="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                Ready Demo
              </span>
              <span class="text-[11px] text-slate-600 dark:text-neutral-300 font-mono font-medium">21 MCQs</span>
            </div>
            <h4 class="font-heading font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-slate-700 dark:group-hover:text-neutral-200 transition">
              बुलियन बीजगणित व लॉजिक गेट्स
            </h4>
            <p class="text-[11px] text-slate-600 dark:text-neutral-400 leading-snug line-clamp-2">
              Extracted directly from textbook exam pages with NAND/NOR gates, full adder ICs, Boolean expressions, and complete step-by-step Hindi explanations.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
            <span class="flex items-center gap-1 font-medium text-slate-600 dark:text-neutral-300">
              <Clock class="w-3 h-3 text-slate-400" /> 20 mins
            </span>
            <span class="text-slate-900 dark:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform text-xs">
              Start Test <ArrowRight class="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Custom / Uploaded card */}
        <div class="glass-card rounded-xl p-3 border border-slate-200 dark:border-neutral-800 flex flex-col justify-between space-y-2 opacity-90 shadow-sm">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30 flex items-center gap-1">
                <FileSpreadsheet class="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                Custom OCR
              </span>
              <span class="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">Unlimited</span>
            </div>
            <h4 class="font-heading font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              Your Uploaded Papers
            </h4>
            <p class="text-[11px] text-slate-600 dark:text-neutral-400 leading-snug line-clamp-2">
              Any question paper or notes you import on the right automatically populates into your interactive exam interface with full scoring.
            </p>
          </div>
          <div class="pt-2 border-t border-slate-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
            <span>Instant timer & grading</span>
            <span class="text-slate-700 dark:text-neutral-300 font-medium">Form on right →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
