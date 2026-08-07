import React from 'react';
import { QuizHeaderBar } from './QuizHeaderBar';
import { QuestionCard } from './QuestionCard';
import { QuestionPalette } from './QuestionPalette';
import { PausedOverlay } from './PausedOverlay';

export const QuizView = () => {
  return (
    <section class="space-y-6 relative transition-all duration-300">
      <QuizHeaderBar />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        <PausedOverlay />
        <div class="lg:col-span-2 space-y-6">
          <QuestionCard />
        </div>
        <QuestionPalette />
      </div>
    </section>
  );
};
