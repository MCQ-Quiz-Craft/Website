import React, { useState } from 'react';
import { X, Code, Copy, Check } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROMPT_TEMPLATE } from '../../constants/demoData';
import './PromptModal.css';

export const PromptModal = () => {
  const { isPromptModalOpen, setIsPromptModalOpen } = useQuiz();
  const [copied, setCopied] = useState(false);

  if (!isPromptModalOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PROMPT_TEMPLATE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={() => setIsPromptModalOpen(false)}
          className="modal-close-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="modal-header">
          <div className="modal-icon-container">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="modal-title">AI Image-to-JSON Prompt Template</h3>
            <p className="modal-subtitle">Copy this prompt and attach your image in ChatGPT / Gemini / Claude.</p>
          </div>
        </div>

        <div className="modal-body">
          <textarea
            readOnly
            rows={10}
            value={PROMPT_TEMPLATE}
            className="modal-textarea"
          />
          <button
            onClick={copyToClipboard}
            className="modal-copy-btn"
          >
            {copied ? <Check className="modal-copy-icon copied" /> : <Copy className="modal-copy-icon" />}
            <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>

        <div className="modal-footer">
          <strong className="modal-footer-highlight">How it works:</strong> Paste this exact prompt along with your image into any AI chat interface. When the AI responds with JSON code, copy the JSON block and paste it in the "Paste JSON / Text Series" tab!
        </div>
      </div>
    </div>
  );
};
