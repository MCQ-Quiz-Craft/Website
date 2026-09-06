import React, { useState } from 'react';
import { Sparkles, Copy, Check, Eye, PlayCircle, Trophy, BookOpen, Clock, ShieldAlert } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROMPT_TEMPLATE } from '../../constants/demoData';

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
    <div class="flex flex-col">
      {/* Integrated Header: "Generate Your Test Series" + "Free Keyless Mode: 1-Click Prompt Schema" + Copy button */}
      <div class="px-4 py-3 border-b border-slate-200 dark:border-neutral-800/80 bg-slate-100/90 dark:bg-neutral-900/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div class="space-y-0.5 min-w-0">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h3 class="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Generate Your Test Series
            </h3>
            <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 font-medium">
              Keyless Free Mode
            </span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-neutral-400 leading-tight">
            1-Click Prompt Schema: Paste with question photo into ChatGPT / Gemini, then paste JSON below!
          </p>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleCopyPrompt}
            class={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 shadow-xs ${
              copiedPrompt
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-white hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 border-slate-300 dark:border-neutral-700'
            }`}
            title="Copy prompt template to clipboard"
          >
            {copiedPrompt ? (
              <>
                <Check class="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied Schema!</span>
              </>
            ) : (
              <>
                <Copy class="w-3.5 h-3.5" />
                <span>Copy Prompt Schema</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsPromptModalOpen(true)}
            class="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white bg-white hover:bg-slate-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-slate-300 dark:border-neutral-700 transition"
            title="View Full Prompt Schema"
          >
            <Eye class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Form Content Body */}
      <div class="p-3.5 sm:p-4 space-y-3">

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Test Title (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Boolean Algebra & Logic Gates"
          class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none placeholder-slate-400 dark:placeholder-neutral-500 shadow-xs"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Paste Questions JSON or Text Payload</label>
        <textarea
          rows={4}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={`Paste your JSON output here... e.g.\n{\n  "title": "Boolean Algebra Quiz",\n  "questions": [\n    {\n      "id": 1,\n      "question": "निम्न में से NAND गेट का चयन कीजिए।",\n      "options": ["A", "B", "C", "D"],\n      "correctAnswer": 0,\n      "explanation": "NAND gate is created by adding NOT bubble to AND gate."\n    }\n  ]\n}`}
          class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-neutral-100 font-mono text-xs rounded-lg p-2.5 focus:ring-1 focus:ring-slate-900 dark:focus:ring-white outline-none placeholder-slate-400 dark:placeholder-neutral-500 shadow-xs min-h-[95px]"
        />
      </div>

      {/* Test Environment Selection (Real Test vs Practice Test) */}
      <div class="space-y-2 bg-slate-50 dark:bg-neutral-900/40 p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800">
        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300">
          Select Test Environment Mode
        </label>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Real Test Option */}
          <div
            onClick={() => setTestMode('real')}
            class={`p-2.5 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${
              testMode === 'real'
                ? 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-500 dark:border-rose-600 ring-1 ring-rose-500/20'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
            }`}
          >
            <div class={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
              testMode === 'real' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'
            }`}>
              <Trophy class="w-4 h-4" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">Real Test Series</h5>
                <span class="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold">Strict</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                Countdown timer, pause disabled, auto-submit.
              </p>
            </div>
          </div>

          {/* Practice Test Option */}
          <div
            onClick={() => setTestMode('practice')}
            class={`p-2.5 rounded-lg border cursor-pointer transition flex items-center gap-2.5 ${
              testMode === 'practice'
                ? 'bg-cyan-50/90 dark:bg-cyan-950/30 border-cyan-500 dark:border-cyan-600 ring-1 ring-cyan-500/20'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
            }`}
          >
            <div class={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
              testMode === 'practice' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'
            }`}>
              <BookOpen class="w-4 h-4" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">Practice Mock Test</h5>
                <span class="text-[9px] px-1.5 py-0.2 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-semibold">Flexible</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 truncate">
                Self-paced learning, pause and resume anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Real Test Duration Configuration */}
        {testMode === 'real' && (
          <div class="pt-2 space-y-1.5 border-t border-slate-200 dark:border-neutral-800/80 animate-in fade-in duration-150">
            <div class="flex items-center justify-between">
              <label class="text-[11px] font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1">
                <Clock class="w-3.5 h-3.5 text-rose-500" /> Real Test Time Limit (Minutes)
              </label>
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] text-slate-400">Custom:</span>
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(e.target.value)}
                  class="w-16 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded px-2 py-0.5 text-xs outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                />
                <span class="text-[11px] text-slate-500 dark:text-neutral-400">mins</span>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              {[10, 15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimeLimitMinutes(mins)}
                  class={`px-3 py-1 rounded-md text-xs font-semibold border transition ${
                    Number(timeLimitMinutes) === mins
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800'
                  }`}
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
        class="w-full py-3 px-5 rounded-xl font-heading font-semibold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-md transition flex items-center justify-center gap-2"
      >
        <PlayCircle class="w-4 h-4" />
        <span>Parse JSON & Start Test Series</span>
      </button>
      </div>
    </div>
  );
};
