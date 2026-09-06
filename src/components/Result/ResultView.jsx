import React from 'react';
import { Award, HelpCircle, CheckCircle, XCircle, Clock, FileText, RotateCcw, Plus } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { SolutionCard } from './SolutionCard';
import './ResultView.css';

export const ResultView = () => {
  const { currentQuiz, userAnswers, timerSeconds, startQuiz, navigateTo } = useQuiz();

  if (!currentQuiz) return null;

  const totalQuestions = currentQuiz.questions.length;
  let correctCount = 0;
  let incorrectCount = 0;

  currentQuiz.questions.forEach((q, idx) => {
    const userChoice = userAnswers[idx];
    if (userChoice !== undefined) {
      if (userChoice === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <section className="result-section">
      {/* Summary Banner */}
      <div className="glass-panel summary-banner">
        <div className="summary-grid">
          <div className="summary-content">
            <div className="status-badge">
              <Award className="icon-status" /> Test Completed Successfully
            </div>
            <h2 className="summary-title">
              Performance & Diagnostic Summary
            </h2>
            <p className="summary-desc">
              Detailed score report, question accuracy analysis, and AI step-by-step explanations.
            </p>
          </div>

          {/* Score Card Ring */}
          <div className="glass-card score-card glow-effect">
            <div className="score-label">Your Score</div>
            <div className="score-value">
              {correctCount} / {totalQuestions}
            </div>
            <div className="accuracy-badge">
              {percentage}% Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="metrics-grid">
        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Total Questions</span>
            <HelpCircle className="icon-base metric-icon-help" />
          </div>
          <div className="metric-value default">{totalQuestions}</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Correct Answers</span>
            <CheckCircle className="icon-base metric-icon-correct" />
          </div>
          <div className="metric-value correct">{correctCount}</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Incorrect Answers</span>
            <XCircle className="icon-base metric-icon-incorrect" />
          </div>
          <div className="metric-value incorrect">{incorrectCount}</div>
        </div>

        <div className="glass-panel metric-card">
          <div className="metric-header">
            <span>Time Spent</span>
            <Clock className="icon-base metric-icon-time" />
          </div>
          <div className="metric-value default">{formatTimer(timerSeconds)}</div>
        </div>
      </div>

      {/* Solutions & Detailed Explanations Section */}
      <div className="solutions-section">
        <div className="solutions-header-row">
          <h3 className="solutions-title">
            <FileText className="solutions-title-icon" /> Detailed Solutions & Explanations
          </h3>
          <div className="solutions-actions">
            <button
              onClick={() => startQuiz(currentQuiz)}
              className="action-btn secondary"
            >
              <RotateCcw className="icon-sm" /> Re-take Test
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="action-btn primary"
            >
              <Plus className="icon-sm" /> Create New Test
            </button>
          </div>
        </div>

        {/* Solution Items List */}
        <div className="solutions-list">
          {currentQuiz.questions.map((q, idx) => (
            <SolutionCard
              key={idx}
              index={idx}
              question={q}
              userAnswer={userAnswers[idx]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
