import React from 'react';
import { BrainCircuit, Sun, Moon, Code, Key, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useQuiz } from '../context/QuizContext';
import './Header.css';

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
    <header className="header-wrapper">
      <div className="header-container">
        {/* Logo & Title */}
        <div className="header-logo-container" onClick={() => navigateTo('home')}>
          <div className="header-logo-icon">
            <BrainCircuit />
          </div>
          <div>
            <h1 className="header-logo-title">
              QuizCraft <span className="header-logo-badge">AI v2.0</span>
            </h1>
            <p className="header-logo-subtitle">Turn Images & Notes into Live Interactive Test Series</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="header-controls">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="header-btn header-btn-theme"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun className="icon-sun" />
            ) : (
              <Moon className="icon-moon" />
            )}
            <span className="header-btn-theme-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          {/* AI Prompt Schema Modal Trigger */}
          <button
            onClick={() => setIsPromptModalOpen(true)}
            className="header-btn header-btn-secondary"
          >
            <Code className="icon-schema" />
            <span className="header-btn-schema-text">AI Prompt Schema</span>
          </button>

          {/* API Keys Modal Trigger */}
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="header-btn header-btn-secondary"
          >
            <Key className={hasApiKeys ? 'icon-api-configured' : 'icon-api-missing'} />
            <span>{hasApiKeys ? 'API Configured ✓' : 'API Keys'}</span>
          </button>

          {/* Demo Test Button */}
          <button
            onClick={loadDemoTest}
            className="header-btn header-btn-primary"
          >
            <Play className="icon-fill-current" />
            <span>Demo Test</span>
          </button>
        </div>
      </div>
    </header>
  );
};
