import React from 'react';
import { History, Clock, ArrowRight, Sparkles, FileSpreadsheet } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import './SampleTests.css';

export const SampleTests = () => {
  const { loadDemoTest } = useQuiz();

  return (
    <div className="samples-wrapper">
      <div className="samples-header-row">
        <h3 className="samples-header-title">
          <History className="samples-header-icon" /> Sample & Pre-Loaded Test Series
        </h3>
        <span className="samples-header-subtitle">1-Click Launch</span>
      </div>

      <div className="samples-grid">
        {/* Pre-loaded attached image test */}
        <div
          onClick={loadDemoTest}
          className="glass-card sample-card interactive"
        >
          <div className="sample-card-content">
            <div className="sample-card-header">
              <span className="sample-badge emerald">
                <Sparkles className="sample-badge-icon emerald" />
                Ready Demo
              </span>
              <span className="sample-meta primary">21 MCQs</span>
            </div>
            <h4 className="sample-title">
              बुलियन बीजगणित व लॉजिक गेट्स
            </h4>
            <p className="sample-desc">
              Extracted directly from textbook exam pages with NAND/NOR gates, full adder ICs, Boolean expressions, and complete step-by-step Hindi explanations.
            </p>
          </div>
          <div className="sample-footer">
            <span className="sample-time">
              <Clock className="icon-clock" /> 20 mins
            </span>
            <span className="sample-action">
              Start Test <ArrowRight className="sample-action-icon" />
            </span>
          </div>
        </div>

        {/* Custom / Uploaded card */}
        <div className="glass-card sample-card static">
          <div className="sample-card-content">
            <div className="sample-card-header">
              <span className="sample-badge cyan">
                <FileSpreadsheet className="sample-badge-icon cyan" />
                Custom OCR
              </span>
              <span className="sample-meta secondary">Unlimited</span>
            </div>
            <h4 className="sample-title">
              Your Uploaded Papers
            </h4>
            <p className="sample-desc">
              Any question paper or notes you import on the right automatically populates into your interactive exam interface with full scoring.
            </p>
          </div>
          <div className="sample-footer">
            <span>Instant timer & grading</span>
            <span className="sample-action-static">Form on right →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
