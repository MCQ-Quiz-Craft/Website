import React from 'react';
import { QuizHeaderBar } from './QuizHeaderBar';
import { QuestionCard } from './QuestionCard';
import { QuestionPalette } from './QuestionPalette';
import { PausedOverlay } from './PausedOverlay';
import './QuizView.css';

export const QuizView = () => {
  return (
    <section className="quiz-section">
      <QuizHeaderBar />

      <div className="quiz-grid">
        <PausedOverlay />
        <div className="quiz-main-column">
          <QuestionCard />
        </div>
        <QuestionPalette />
      </div>
    </section>
  );
};
