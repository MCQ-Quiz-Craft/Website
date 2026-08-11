import React from 'react';
import { Image, FileJson } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { ImageUploader } from './ImageUploader';
import { JsonImporter } from './JsonImporter';
import { SampleTests } from './SampleTests';

export const HomeView = () => {
  const { activeTab, setActiveTab } = useQuiz();

  return (
    <section class="space-y-8 transition-all duration-300">
      {/* Hero Section */}
      <div class="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <h2 class="text-3xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Convert Any <span class="text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-neutral-200 dark:to-neutral-400 underline decoration-slate-400 dark:no-underline">Question Paper Image</span> into a Real Test Series
        </h2>
        <p class="text-slate-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
          Upload photos of textbook pages, handwritten notes, or test papers. Use your ChatGPT / Gemini API keys directly, or copy our prompt structure to use with any free AI model!
        </p>
      </div>

      {/* Tab Switching Container */}
      <div class="max-w-4xl mx-auto glass-panel rounded-2xl p-2 sm:p-3 border border-slate-200 dark:border-neutral-800 shadow-sm">
        {/* Upload Question Image tab commented out for future use
        <div class="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-neutral-900 p-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('image')}
            class={`py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              activeTab === 'image'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-semibold shadow'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800/50'
            }`}
          >
            <Image class="w-4 h-4" />
            <span>Upload Question Image (Vision AI)</span>
          </button>
          <button
            onClick={() => setActiveTab('json')}
            class={`py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
              activeTab === 'json'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-semibold shadow'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-neutral-800/50'
            }`}
          >
            <FileJson class="w-4 h-4" />
            <span>Paste JSON / Text Series</span>
          </button>
        </div>
        */}

        {/* Tab Content */}
        {/* {activeTab === 'image' ? <ImageUploader /> : <JsonImporter />} */}
        <JsonImporter />
      </div>

      {/* Pre-loaded / Sample Cards */}
      <SampleTests />
    </section>
  );
};
