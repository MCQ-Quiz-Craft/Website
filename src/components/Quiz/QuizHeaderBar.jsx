import React from 'react';
import { Pause, Play, CheckCircle2, Trophy, BookOpen, Clock } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './QuizHeaderBar.css';

export const QuizHeaderBar = () => {
  const {
    currentQuiz,
    timerSeconds,
    isTimerPaused,
    togglePauseTimer,
    setIsSubmitModalOpen,
    testMode,
    timeLimitMinutes
  } = useQuiz();

  const isRealTest = testMode === 'real';
  const totalSecondsLimit = (timeLimitMinutes || 15) * 60;
  const remainingSeconds = Math.max(0, totalSecondsLimit - timerSeconds);
  const isUrgent = isRealTest && remainingSeconds <= 300; // < 5 mins left

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel quiz-header-container">
      <div className="quiz-header-info">
        <div className="quiz-header-meta">
          <span className="test-series-label">Active Test Series</span>
          {isRealTest ? (
            <span className="mode-indicator real">
              <Trophy className="icon-source" /> Real Test Series (No Pause)
            </span>
          ) : (
            <span className="mode-indicator practice">
              <BookOpen className="icon-source" /> Practice Mode
            </span>
          )}
        </div>
        <h2 className="quiz-header-title">
          {currentQuiz?.title || 'Question Paper Test Series'}
        </h2>
      </div>

      <div className="quiz-header-actions">
        {/* Pause/Resume Control (Only enabled in Practice Mode) */}
        {!isRealTest ? (
          <button
            onClick={togglePauseTimer}
            className={`pause-btn ${isTimerPaused ? 'paused' : 'playing'}`}
            title={isTimerPaused ? 'Resume Timer' : 'Pause Timer'}
          >
            {isTimerPaused ? (
              <>
                <Play className="icon-chevron" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <Pause className="icon-chevron" />
                <span>Pause</span>
              </>
            )}
          </button>
        ) : (
          <div
            className="pause-disabled"
            title="Pause feature is disabled in Real Test Mode"
          >
            <Pause className="icon-chevron opacity-50" />
            <span className="pause-disabled-text">Pause Disabled</span>
          </div>
        )}

        {/* Timer Display */}
        <div className={`timer-display ${isUrgent ? 'urgent' : 'normal'}`}>
          <div className={`timer-dot ${
            isUrgent ? 'urgent' : isTimerPaused ? 'paused' : 'running'
          }`}></div>
          <span className={`timer-time ${isUrgent ? 'urgent' : 'normal'}`}>
            {isRealTest ? formatTimer(remainingSeconds) : formatTimer(timerSeconds)}
          </span>
          {isRealTest && <span className="timer-suffix">left</span>}
        </div>

        {/* Submit Test Button */}
        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="submit-test-btn"
        >
          <CheckCircle2 className="icon-chevron" />
          <span>Submit Test</span>
        </button>
      </div>
    </div>
  );
};
