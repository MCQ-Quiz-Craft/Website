import React from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { JsonImporter } from './JsonImporter';
import { SampleTests } from './SampleTests';
import './HomeView.css';

export const HomeView = () => {
  return (
    <section className="home-view-section">
      {/* 2-Column Split: Static Marketing & Sample Tests on Left, Interactive Form on Right */}
      <div className="home-view-grid">
        {/* Left Column: Static Information, Value Proposition, Workflow & Sample Tests */}
        <div className="home-view-left">
          <div className="home-view-content">
            {/* Headline & Subtitle */}
            <div className="home-view-header">
              <h2 className="home-view-title">
                Convert Any{' '}
                <span className="home-view-highlight">
                  Question Paper Image
                </span>{' '}
                into a Real Test Series
              </h2>

              {/* Description / Static Data */}
              <p className="home-view-desc">
                Upload photos of textbook pages, handwritten notes, or test papers. Use your ChatGPT / Gemini API keys directly, or copy our prompt structure to use with any free AI model!
              </p>
            </div>

            {/* 3-Step Visual Workflow Guide */}
            <div className="home-workflow">
              <div className="workflow-header">
                <Zap className="icon-zap" /> 3-Step Instant Setup
              </div>
              <div className="workflow-grid">
                <div className="workflow-step">
                  <span className="workflow-step-num">STEP 01</span>
                  <p className="workflow-step-title">Snap / Note Photo</p>
                  <p className="workflow-step-desc">Textbook or paper</p>
                </div>
                <div className="workflow-step">
                  <span className="workflow-step-num">STEP 02</span>
                  <p className="workflow-step-title">AI Schema Prompt</p>
                  <p className="workflow-step-desc">ChatGPT / Gemini</p>
                </div>
                <div className="workflow-step">
                  <span className="workflow-step-num">STEP 03</span>
                  <p className="workflow-step-title">Live Test Series</p>
                  <p className="workflow-step-desc">Instant timed exam</p>
                </div>
              </div>
            </div>

            {/* Feature Badges & Value Checklist */}
            <div className="home-features">
              <div className="feature-item">
                <CheckCircle2 className="icon-check-emerald" />
                <span><strong className="feature-strong">Real Test & Practice Modes:</strong> Strict exam timer with auto-submit, or self-paced review.</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 className="icon-check-cyan" />
                <span><strong className="feature-strong">Hindi & English Bilingual Ready:</strong> Handles Devanagari script, math formulas, and logic diagrams.</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 className="icon-check-brand" />
                <span><strong className="feature-strong">Instant Scoring & Explanations:</strong> Detailed step-by-step solutions for each question.</span>
              </div>
            </div>
          </div>

          {/* Sample & Saved Test Series Cards (Anchored at the bottom) */}
          <div className="home-view-bottom">
            <SampleTests />
          </div>
        </div>

        {/* Right Column: Interactive Form (JsonImporter) */}
        <div className="home-view-right">
          <div className="glass-panel importer-container">
            {/* Importer Form with Integrated Header */}
            <JsonImporter />
          </div>
        </div>
      </div>
    </section>
  );
};
