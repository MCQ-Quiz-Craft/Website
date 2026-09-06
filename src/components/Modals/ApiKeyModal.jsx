import React, { useState, useEffect } from 'react';
import { X, Key, Eye, EyeOff } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './ApiKeyModal.css';

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
    <div className="modal-overlay">
      <div className="api-modal-content">
        <button
          onClick={() => setIsApiKeyModalOpen(false)}
          className="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="modal-header">
          <div className="modal-icon-container amber">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="modal-title">AI API Keys Settings</h3>
            <p className="modal-subtitle">Keys are stored locally in your browser only.</p>
          </div>
        </div>

        <div className="api-form">
          {/* OpenAI Key */}
          <div className="form-group">
            <label className="form-label">OpenAI API Key (ChatGPT Vision)</label>
            <div className="input-container">
              <input
                type={showOpenai ? 'text' : 'password'}
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="api-input"
              />
              <button
                type="button"
                onClick={() => setShowOpenai(!showOpenai)}
                className="toggle-visibility-btn"
              >
                {showOpenai ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
              </button>
            </div>
          </div>

          {/* Gemini Key */}
          <div className="form-group">
            <label className="form-label">Google Gemini API Key</label>
            <div className="input-container">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="api-input"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="toggle-visibility-btn"
              >
                {showGemini ? <EyeOff className="icon-sm" /> : <Eye className="icon-sm" />}
              </button>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button
            onClick={() => setIsApiKeyModalOpen(false)}
            className="action-btn secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="action-btn primary"
          >
            Save Keys
          </button>
        </div>
      </div>
    </div>
  );
};
