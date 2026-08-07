import React, { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const ApiKeyModal = () => {
  const { isApiKeyModalOpen, setIsApiKeyModalOpen, apiKeys, saveApiKeys } = useQuiz();

  const [openaiKey, setOpenaiKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showOpenai, setShowOpenai] = useState(false);
  const [showGemini, setShowGemini] = useState(false);

  useEffect(() => {
    if (isApiKeyModalOpen) {
      setOpenaiKey(apiKeys.openai || '');
      setGeminiKey(apiKeys.gemini || '');
    }
  }, [isApiKeyModalOpen, apiKeys]);

  if (!isApiKeyModalOpen) return null;

  const handleSave = () => {
    saveApiKeys({
      openai: openaiKey.trim(),
      gemini: geminiKey.trim()
    });
  };

  return (
    <div class="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-lg rounded-2xl p-6 border border-slate-200 dark:border-neutral-800 space-y-6 relative shadow-2xl">
        <button
          onClick={() => setIsApiKeyModalOpen(false)}
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
        >
          <X class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 dark:text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Key class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">AI API Keys Settings</h3>
            <p class="text-xs text-slate-500 dark:text-neutral-400">Keys are stored locally in your browser only.</p>
          </div>
        </div>

        <div class="space-y-4 text-xs">
          {/* OpenAI Key */}
          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700 dark:text-neutral-300">OpenAI API Key (ChatGPT Vision)</label>
            <div class="relative">
              <input
                type={showOpenai ? 'text' : 'password'}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 font-mono outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowOpenai(!showOpenai)}
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showOpenai ? <EyeOff class="w-4 h-4" /> : <Eye class="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Gemini Key */}
          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700 dark:text-neutral-300">Google Gemini API Key</label>
            <div class="relative">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 font-mono outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                class="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showGemini ? <EyeOff class="w-4 h-4" /> : <Eye class="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={() => setIsApiKeyModalOpen(false)}
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            class="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg transition"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};
