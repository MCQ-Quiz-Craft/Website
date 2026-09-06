import React from 'react';
import { BookOpen } from 'lucide-react';
import './SolutionCard.css';

export const SolutionCard = ({ question, index, userAnswer }) => {
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === question.correctAnswer;

  let statusBadge = (
    <span className="solution-status-badge unanswered">
      Unanswered
    </span>
  );

  if (isAnswered) {
    statusBadge = isCorrect ? (
      <span className="solution-status-badge correct">
        Correct +1.0
      </span>
    ) : (
      <span className="solution-status-badge incorrect">
        Incorrect -0.25
      </span>
    );
  }

  return (
    <div className="glass-card solution-card-container">
      {/* Header */}
      <div className="solution-card-header">
        <div className="solution-card-meta">
          <span className="solution-number">
            Q{index + 1}.
          </span>
          {question.source && (
            <span className="solution-source-badge">
              <BookOpen className="icon-source" />
              <span>{question.source}</span>
            </span>
          )}
        </div>
        {statusBadge}
      </div>

      {/* Question & Diagram */}
      <div className="solution-content">
        <h4 className="solution-question-text">
          {question.question}
        </h4>
        {question.diagramSvg && (
          <div
            className="solution-diagram"
            dangerouslySetInnerHTML={{ __html: question.diagramSvg }}
          />
        )}
      </div>

      {/* Options Breakdown */}
      <div className="solution-options-grid">
        {question.options.map((optText, optIdx) => {
          const isOfficialCorrect = optIdx === question.correctAnswer;
          const isUserChoice = optIdx === userAnswer;
          const label = String.fromCharCode(65 + optIdx);

          let optStyle = 'default';

          if (isOfficialCorrect) {
            optStyle = 'correct';
          } else if (isUserChoice && !isCorrect) {
            optStyle = 'incorrect';
          }

          return (
            <div
              key={optIdx}
              className={`solution-option-item ${optStyle}`}
            >
              <div className="solution-option-left">
                <span className="solution-option-label">{label}.</span>
                <span>{optText}</span>
              </div>
              {isOfficialCorrect && (
                <span className="solution-option-status correct">
                  ✓ Correct Answer
                </span>
              )}
              {isUserChoice && !isOfficialCorrect && (
                <span className="solution-option-status incorrect">
                  ✗ Your Answer
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Detailed Explanation */}
      {question.explanation && (
        <div className="solution-explanation">
          <span className="explanation-title">
            💡 Step-by-Step Explanation:
          </span>
          <p className="explanation-text">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
