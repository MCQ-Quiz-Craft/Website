import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import './QuestionPalette.css';

export const QuestionPalette = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    markedForReview,
    visitedQuestions,
    jumpToQuestion
  } = useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="palette-container">
      <div className="glass-panel palette-panel">
        <h4 className="palette-header">
          <span>Question Palette</span>
          <span className="palette-stats">
            {answeredCount}/{totalQuestions} Answered
          </span>
        </h4>

        {/* Question Grid */}
        <div className="palette-grid">
          {currentQuiz.questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isAnswered = userAnswers[idx] !== undefined;
            const isMarked = !!markedForReview[idx];
            const isVisited = !!visitedQuestions[idx];

            let btnClass = 'default';

            if (isAnswered) {
              btnClass = 'answered';
            } else if (isMarked) {
              btnClass = 'marked';
            } else if (isVisited) {
              btnClass = 'visited';
            }

            if (isCurrent) {
              btnClass += ' current';
            }

            return (
              <button
                key={idx}
                onClick={() => jumpToQuestion(idx)}
                className={`palette-btn ${btnClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Status Legend */}
        <div className="palette-legend">
          <div className="legend-grid">
            <div className="legend-item">
              <span className="legend-color answered"></span>
              <span className="legend-text">Answered</span>
            </div>
            <div className="legend-item">
              <span className="legend-color unanswered"></span>
              <span className="legend-text">Unanswered</span>
            </div>
            <div className="legend-item">
              <span className="legend-color marked"></span>
              <span className="legend-text">Marked Review</span>
            </div>
            <div className="legend-item">
              <span className="legend-color default"></span>
              <span className="legend-text muted">Not Visited</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
