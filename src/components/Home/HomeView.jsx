import React from 'react';
import { Sparkles, Zap, CheckCircle2 } from 'lucide-react';
import { JsonImporter } from './JsonImporter';
import { SampleTests } from './SampleTests';

export const HomeView = () => {
  return (
    <section class="transition-all duration-300">
      {/* 2-Column Split: Static Marketing & Sample Tests on Left, Interactive Form on Right */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Static Information, Value Proposition, Workflow & Sample Tests */}
        <div class="lg:col-span-6 flex flex-col justify-between h-full space-y-3.5">
          <div class="space-y-3.5">
            {/* Eyebrow Pill */}
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 dark:bg-white/10 text-brand-700 dark:text-neutral-200 border border-brand-500/20 dark:border-white/15 backdrop-blur-sm shadow-xs">
              <Sparkles class="w-3.5 h-3.5 text-amber-500" />
              <span>AI-Powered Exam Engine • 100% Free & Open</span>
            </div>

            {/* Headline & Subtitle */}
            <div class="space-y-1.5">
              <h2 class="text-2xl sm:text-3xl lg:text-[30px] font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Convert Any{' '}
                <span class="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-200 dark:to-neutral-400 underline decoration-slate-400 dark:no-underline">
                  Question Paper Image
                </span>{' '}
                into a Real Test Series
              </h2>

              {/* Description / Static Data */}
              <p class="text-slate-600 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed">
                Upload photos of textbook pages, handwritten notes, or test papers. Use your ChatGPT / Gemini API keys directly, or copy our prompt structure to use with any free AI model!
              </p>
            </div>

            {/* 3-Step Visual Workflow Guide */}
            <div class="bg-slate-100/90 dark:bg-neutral-900/60 rounded-xl p-3 border border-slate-200 dark:border-neutral-800 space-y-2 shadow-xs">
              <div class="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Zap class="w-3 h-3 text-amber-500" /> 3-Step Instant Setup
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div class="p-2 rounded-lg bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-0.5">
                  <span class="text-[9px] font-mono font-bold text-slate-400 dark:text-neutral-500">STEP 01</span>
                  <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">Snap / Note Photo</p>
                  <p class="text-[10px] text-slate-500 dark:text-neutral-400 leading-snug">Textbook or paper</p>
                </div>
                <div class="p-2 rounded-lg bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-0.5">
                  <span class="text-[9px] font-mono font-bold text-slate-400 dark:text-neutral-500">STEP 02</span>
                  <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">AI Schema Prompt</p>
                  <p class="text-[10px] text-slate-500 dark:text-neutral-400 leading-snug">ChatGPT / Gemini</p>
                </div>
                <div class="p-2 rounded-lg bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 space-y-0.5">
                  <span class="text-[9px] font-mono font-bold text-slate-400 dark:text-neutral-500">STEP 03</span>
                  <p class="text-xs font-semibold text-slate-900 dark:text-white truncate">Live Test Series</p>
                  <p class="text-[10px] text-slate-500 dark:text-neutral-400 leading-snug">Instant timed exam</p>
                </div>
              </div>
            </div>

            {/* Feature Badges & Value Checklist */}
            <div class="space-y-1.5 text-xs text-slate-600 dark:text-neutral-300">
              <div class="flex items-start gap-2">
                <CheckCircle2 class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong class="text-slate-900 dark:text-white font-semibold">Real Test & Practice Modes:</strong> Strict exam timer with auto-submit, or self-paced review.</span>
              </div>
              <div class="flex items-start gap-2">
                <CheckCircle2 class="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span><strong class="text-slate-900 dark:text-white font-semibold">Hindi & English Bilingual Ready:</strong> Handles Devanagari script, math formulas, and logic diagrams.</span>
              </div>
              <div class="flex items-start gap-2">
                <CheckCircle2 class="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                <span><strong class="text-slate-900 dark:text-white font-semibold">Instant Scoring & Explanations:</strong> Detailed step-by-step solutions for each question.</span>
              </div>
            </div>
          </div>

          {/* Sample & Saved Test Series Cards (Anchored at the bottom) */}
          <div class="pt-2 mt-auto">
            <SampleTests />
          </div>
        </div>

        {/* Right Column: Interactive Form (JsonImporter) */}
        <div class="lg:col-span-6 flex flex-col h-full">
          <div class="glass-panel rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-xl overflow-hidden flex flex-col h-full">
            {/* Importer Form with Integrated Header */}
            <JsonImporter />
          </div>
        </div>
      </div>
    </section>
  );
};
