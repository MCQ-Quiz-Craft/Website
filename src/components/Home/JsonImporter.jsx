import React, { useState } from 'react';
import { Sparkles, Copy, Check, Eye, PlayCircle, Trophy, BookOpen, Clock, ShieldAlert } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROMPT_TEMPLATE } from '../../constants/demoData';
import './JsonImporter.css';

export const JsonImporter = () => {
  const { startQuiz, setIsPromptModalOpen, showErrorModal } = useQuiz();
  const [title, setTitle] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [testMode, setTestMode] = useState('real'); // 'real' | 'practice'
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleCopyPrompt = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROMPT_TEMPLATE);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = PROMPT_TEMPLATE;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error('Failed to copy prompt template:', err);
    }
  };

  const importJsonQuestions = () => {
    const rawText = jsonText.trim();
    if (!rawText) {
      showErrorModal(
        'Empty Payload',
        'Please paste your JSON or question paper text payload before clicking Generate.'
      );
      return;
    }

    try {
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid JSON schema: structure must contain a "questions" array.');
      }
      if (parsed.questions.length === 0) {
        throw new Error('The "questions" array is empty. Please provide at least one valid question object.');
      }

      if (title.trim()) {
        parsed.title = title.trim();
      }

      startQuiz(parsed, {
        testMode,
        timeLimitMinutes: Math.max(1, Number(timeLimitMinutes) || 15)
      });
    } catch (e) {
      showErrorModal(
        'JSON Parsing Error',
        `Failed to parse payload: ${e.message}\n\nPlease check your JSON format and ensure it contains valid syntax with a "questions" array.`
      );
    }
  };

  return (
    <div className="importer-wrapper">
      {/* Integrated Header */}
      <div className="importer-header">
        <div className="importer-title-container">
          <div className="importer-title-row">
            <div className="pulse-dot" />
            <h3 className="importer-title">
              Generate Your Test Series
            </h3>
            <span className="keyless-badge">
              Keyless Free Mode
            </span>
          </div>
          <p className="importer-subtitle">
            1-Click Prompt Schema: Paste with question photo into ChatGPT / Gemini, then paste JSON below!
          </p>
        </div>

        <div className="importer-actions">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className={`copy-btn ${copiedPrompt ? 'copied' : 'default'}`}
            title="Copy prompt template to clipboard"
          >
            {copiedPrompt ? (
              <>
                <Check className="icon-emerald icon-sm" />
                <span>Copied Schema!</span>
              </>
            ) : (
              <>
                <Copy className="icon-sm" />
                <span>Copy Prompt Schema</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsPromptModalOpen(true)}
            className="schema-btn"
            title="View Full Prompt Schema"
          >
            <Eye className="icon-sm" />
          </button>
        </div>
      </div>

      {/* Form Content Body */}
      <div className="importer-body">
        <div className="form-group">
          <label className="form-label">Test Title (Optional)</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Boolean Algebra & Logic Gates"
            className="form-input"
          />
        </div>

        <div className="form-group flex-1">
          <label className="form-label">Paste Questions JSON or Text Payload</label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={`Paste your JSON output here... e.g.\n{\n  "title": "Boolean Algebra Quiz",\n  "questions": [\n    {\n      "id": 1,\n      "question": "निम्न में से NAND गेट का चयन कीजिए।",\n      "options": ["A", "B", "C", "D"],\n      "correctAnswer": 0,\n      "explanation": "NAND gate is created by adding NOT bubble to AND gate."\n    }\n  ]\n}`}
            className="form-textarea"
          />
        </div>

        {/* Test Environment Selection */}
        <div className="mode-selection-container">
          <label className="mode-label">
            Select Test Environment Mode
          </label>
          
          <div className="mode-grid">
            {/* Real Test Option */}
            <div
              onClick={() => setTestMode('real')}
              className={`mode-card ${testMode === 'real' ? 'active-real' : 'default'}`}
            >
              <div className={`mode-icon ${testMode === 'real' ? 'active-real' : 'default'}`}>
                <Trophy className="icon-sm" />
              </div>
              <div className="mode-content">
                <div className="mode-title-row">
                  <h5 className="mode-title">Real Test Series</h5>
                  <span className="mode-badge real">Strict</span>
                </div>
                <p className="mode-desc">
                  Countdown timer, pause disabled, auto-submit.
                </p>
              </div>
            </div>

            {/* Practice Test Option */}
            <div
              onClick={() => setTestMode('practice')}
              className={`mode-card ${testMode === 'practice' ? 'active-practice' : 'default'}`}
            >
              <div className={`mode-icon ${testMode === 'practice' ? 'active-practice' : 'default'}`}>
                <BookOpen className="icon-sm" />
              </div>
              <div className="mode-content">
                <div className="mode-title-row">
                  <h5 className="mode-title">Practice Mock Test</h5>
                  <span className="mode-badge practice">Flexible</span>
                </div>
                <p className="mode-desc">
                  Self-paced learning, pause and resume anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Real Test Duration Configuration */}
          {testMode === 'real' && (
            <div className="time-config-container">
              <div className="time-config-header">
                <label className="time-config-label">
                  <Clock className="icon-sm icon-rose" /> Real Test Time Limit (Minutes)
                </label>
                <div className="time-custom">
                  <span className="time-custom-label">Custom:</span>
                  <input
                    type="number"
                    min={1}
                    max={300}
                    value={timeLimitMinutes}
                    onChange={(e) => setTimeLimitMinutes(e.target.value)}
                    className="time-input"
                  />
                  <span className="time-custom-unit">mins</span>
                </div>
              </div>
              <div className="time-presets">
                {[10, 15, 30, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimitMinutes(mins)}
                    className={`time-preset-btn ${Number(timeLimitMinutes) === mins ? 'active' : 'default'}`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={importJsonQuestions}
          className="submit-btn"
        >
          <PlayCircle className="icon-sm" />
          <span>Parse JSON & Start Test Series</span>
        </button>
      </div>
    </div>
  );
};
