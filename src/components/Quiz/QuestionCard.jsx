import React from 'react';
import { Bookmark, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './QuestionCard.css';

export const QuestionCard = () => {
  const {
    currentQuiz,
    currentQuestionIndex,
    userAnswers,
    selectOption,
    clearResponse,
    markedForReview,
    toggleMarkForReview,
    navigateQuestion
  } = useQuiz();

  if (!currentQuiz || !currentQuiz.questions[currentQuestionIndex]) return null;

  const currentQ = currentQuiz.questions[currentQuestionIndex];
  const isMarked = !!markedForReview[currentQuestionIndex];
  const selectedOpt = userAnswers[currentQuestionIndex];

  return (
    <div className="glass-panel question-card-container">
      {/* Question Header & Review Toggle */}
      <div className="question-card-header">
        <div className="question-card-meta">
          <span className="question-number-badge">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </span>
          {currentQ.source && (
            <span className="question-source-badge">
              <BookOpen className="icon-source" />
              <span>Source: {currentQ.source}</span>
            </span>
          )}
        </div>
        <button
          onClick={toggleMarkForReview}
          className={`review-toggle-btn ${isMarked ? 'marked' : 'unmarked'}`}
        >
          <Bookmark className="icon-review" />
          <span>{isMarked ? 'Marked for Review ✓' : 'Mark for Review'}</span>
        </button>
      </div>

      {/* Question Text & Diagram */}
      <div className="question-content">
        <h3 className="question-text">
          {currentQ.question}
        </h3>
        {currentQ.diagramSvg && (
          <div
            className="question-diagram"
            dangerouslySetInnerHTML={{ __html: currentQ.diagramSvg }}
          />
        )}
      </div>

      {/* MCQ Options */}
      <div className="options-list">
        {currentQ.options.map((optText, optIdx) => {
          const isSelected = selectedOpt === optIdx;
          const label = String.fromCharCode(65 + optIdx); // 'A', 'B', 'C', 'D'

          return (
            <div
              key={optIdx}
              onClick={() => selectOption(optIdx)}
              className={`option-item ${isSelected ? 'selected' : 'unselected'}`}
            >
              <div
                className={`option-label-badge ${isSelected ? 'selected' : 'unselected'}`}
              >
                {label}
              </div>
              <span className="option-text">{optText}</span>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="question-card-footer">
        <div className="footer-actions-left">
          <button
            onClick={clearResponse}
            className="clear-btn"
          >
            Clear Response
          </button>
        </div>
        <div className="footer-actions-right">
          <button
            onClick={() => navigateQuestion(-1)}
            disabled={currentQuestionIndex === 0}
            className="nav-btn prev"
          >
            <ChevronLeft className="icon-chevron" /> Previous
          </button>
          <button
            onClick={() => navigateQuestion(1)}
            className="nav-btn next"
          >
            <span>Save & Next</span>
            <ChevronRight className="icon-chevron" />
          </button>
        </div>
      </div>
    </div>
  );
};
