import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './SubmitConfirmModal.css';

export const SubmitConfirmModal = () => {
  const {
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    currentQuiz,
    userAnswers,
    markedForReview,
    finalizeTestSubmission
  } = useQuiz();

  if (!isSubmitModalOpen || !currentQuiz) return null;

  const total = currentQuiz.questions.length;
  const answered = Object.keys(userAnswers).length;
  const marked = Object.values(markedForReview).filter(Boolean).length;
  const unanswered = total - answered;

  return (
    <div className="modal-overlay">
      <div className="submit-modal-content">
        <div className="submit-modal-icon-container">
          <HelpCircle className="submit-modal-icon" />
        </div>

        <div className="submit-modal-text-group">
          <h3 className="submit-modal-title">Submit Your Test?</h3>
          <p className="submit-modal-subtitle">Are you sure you want to finish and generate your score report?</p>
        </div>

        <div className="submit-modal-stats">
          <div className="stat-item">
            <div className="stat-value answered">{answered}</div>
            <div className="stat-label">Answered</div>
          </div>
          <div className="stat-item">
            <div className="stat-value unanswered">{unanswered}</div>
            <div className="stat-label">Unanswered</div>
          </div>
          <div className="stat-item">
            <div className="stat-value marked">{marked}</div>
            <div className="stat-label">Review</div>
          </div>
        </div>

        <div className="submit-modal-actions">
          <button
            onClick={() => setIsSubmitModalOpen(false)}
            className="action-btn secondary"
          >
            Continue Test
          </button>
          <button
            onClick={finalizeTestSubmission}
            className="action-btn submit"
          >
            Yes, Submit Now
          </button>
        </div>
      </div>
    </div>
  );
};
