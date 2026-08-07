import React from 'react';
import { BrainCircuit, Sun, Moon, Code, Key, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const {
    navigateTo,
    loadDemoTest,
    setIsApiKeyModalOpen,
    setIsPromptModalOpen,
    apiKeys
  } = useQuiz();

  const hasApiKeys = apiKeys.openai || apiKeys.gemini;

  return (
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 dark:border-neutral-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div class="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
          <div class="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg transition">
            <BrainCircuit class="w-6 h-6" />
          </div>
          <div>
            <h1 class="font-heading font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              QuizCraft <span class="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-mono font-medium border border-slate-300 dark:border-neutral-700">AI v2.0</span>
            </h1>
            <p class="text-xs text-slate-500 dark:text-neutral-400 hidden sm:block">Turn Images & Notes into Live Interactive Test Series</p>
          </div>
        </div>

        {/* Action Controls */}
        <div class="flex items-center space-x-2 sm:space-x-3">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-100 border border-slate-300 dark:border-neutral-700 transition flex items-center gap-1.5 shadow-sm"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun class="w-4 h-4 text-amber-400" />
            ) : (
              <Moon class="w-4 h-4 text-amber-500" />
            )}
            <span class="font-medium hidden sm:inline">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* AI Prompt Schema Modal Trigger */}
          <button
            onClick={() => setIsPromptModalOpen(true)}
            class="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-800 transition flex items-center gap-1.5"
          >
            <Code class="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span class="hidden md:inline">AI Prompt Schema</span>
          </button>

          {/* API Keys Modal Trigger */}
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            class="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-800 transition flex items-center gap-1.5"
          >
            <Key class={`w-4 h-4 ${hasApiKeys ? 'text-emerald-500' : 'text-amber-500'}`} />
            <span>{hasApiKeys ? 'API Configured ✓' : 'API Keys'}</span>
          </button>

          {/* Demo Test Button */}
          <button
            onClick={loadDemoTest}
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black transition shadow-md flex items-center gap-1.5"
          >
            <Play class="w-4 h-4 fill-current" />
            <span>Demo Test</span>
          </button>
        </div>
      </div>
    </header>
  );
};
