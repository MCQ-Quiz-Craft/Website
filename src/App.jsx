import React from 'react';
import { useQuiz } from './context/QuizContext';
import { Header } from './components/Header';
import { HomeView } from './components/Home/HomeView';
import { QuizView } from './components/Quiz/QuizView';
import { ResultView } from './components/Result/ResultView';
import { ApiKeyModal } from './components/Modals/ApiKeyModal';
import { PromptModal } from './components/Modals/PromptModal';
import { SubmitConfirmModal } from './components/Modals/SubmitConfirmModal';
import { ErrorAlertModal } from './components/Modals/ErrorAlertModal';

export const App = () => {
  const { currentView } = useQuiz();

  return (
    <div class="min-h-screen flex flex-col relative selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && <HomeView />}
        {currentView === 'quiz' && <QuizView />}
        {currentView === 'result' && <ResultView />}
      </main>

      {/* Footer */}
      <footer class="w-full border-t border-slate-200 dark:border-neutral-800/80 py-6 text-center text-xs text-slate-500 dark:text-neutral-400">
        <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 QuizCraft AI - Interactive Test Series Generator. Built with React & Vision AI.</p>
          <div class="flex items-center space-x-4">
            <span class="hover:text-slate-900 dark:hover:text-white transition cursor-pointer">Privacy</span>
            <span class="hover:text-slate-900 dark:hover:text-white transition cursor-pointer">Terms</span>
            <span class="hover:text-slate-900 dark:hover:text-white transition cursor-pointer">API Docs</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApiKeyModal />
      <PromptModal />
      <SubmitConfirmModal />
      <ErrorAlertModal />
    </div>
  );
};

export default App;
