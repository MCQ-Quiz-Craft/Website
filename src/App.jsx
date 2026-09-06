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
import './App.css';

export const App = () => {
  const { currentView } = useQuiz();

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Container */}
      <main className="main-container">
        {currentView === 'home' && <HomeView />}
        {currentView === 'quiz' && <QuizView />}
        {currentView === 'result' && <ResultView />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p className="footer-text">© 2026 QuizCraft AI - Interactive Test Series Generator. Built with React & Vision AI.</p>
          <div className="footer-links">
            <span className="footer-link">Privacy</span>
            <span className="footer-link">Terms</span>
            <span className="footer-link">API Docs</span>
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
