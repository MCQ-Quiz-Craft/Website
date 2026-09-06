import React, { useState } from 'react';
import { AlertTriangle, X, Copy, Check, FileText } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './ErrorAlertModal.css';

export const ErrorAlertModal = () => {
  const { errorModal, closeErrorModal } = useQuiz();
  const [copiedError, setCopiedError] = useState(false);

  if (!errorModal.isOpen) return null;

  const copyErrorToClipboard = () => {
    navigator.clipboard.writeText(`${errorModal.title}\n${errorModal.message}`).then(() => {
      setCopiedError(true);
      setTimeout(() => setCopiedError(false), 2000);
    });
  };

  return (
    <div className="error-modal-overlay">
      <div className="error-modal-content">
        {/* Top Accent Line */}
        <div className="error-accent-line" />

        {/* Close Button */}
        <button
          onClick={closeErrorModal}
          className="error-close-btn"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="error-header">
          <div className="error-icon-container">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="error-title">
              {errorModal.title || 'Parsing Error'}
            </h3>
            <p className="error-subtitle">
              An issue occurred while parsing the JSON payload or AI response.
            </p>
          </div>
        </div>

        {/* Error Detail Box */}
        <div className="error-detail-box">
          <div className="error-detail-header">
            <span className="error-detail-title">
              <FileText className="w-3.5 h-3.5" /> Error Details
            </span>
            <button
              onClick={copyErrorToClipboard}
              className="error-copy-btn"
            >
              {copiedError ? (
                <>
                  <Check className="w-3 h-3 error-copy-icon copied" /> Copied Error
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 error-copy-icon" /> Copy Error
                </>
              )}
            </button>
          </div>
          <p className="error-message">
            {errorModal.message}
          </p>
        </div>

        {/* Footer Dismiss */}
        <div className="error-footer">
          <button
            onClick={closeErrorModal}
            className="error-dismiss-btn"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
