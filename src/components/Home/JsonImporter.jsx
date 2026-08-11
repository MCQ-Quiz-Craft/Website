import React, { useState } from 'react';
import { Sparkles, Copy, PlayCircle, Trophy, BookOpen, Clock, ShieldAlert } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const JsonImporter = () => {
  const { startQuiz, setIsPromptModalOpen, showErrorModal } = useQuiz();
  const [title, setTitle] = useState('');
  const [jsonText, setJsonText] = useState('');
  const [testMode, setTestMode] = useState('real'); // 'real' | 'practice'
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);

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
    <div class="p-4 sm:p-6 space-y-6">
      <div class="bg-slate-100 dark:bg-neutral-900/80 rounded-xl p-4 border border-slate-200 dark:border-neutral-800 flex items-start justify-between gap-4">
        <div class="space-y-1">
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles class="w-4 h-4 text-amber-500" /> Free Keyless Mode Workflow
          </h4>
          <p class="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
            1. Copy our predefined AI prompt schema.<br />
            2. Paste your image & prompt into ChatGPT / Gemini / Claude web app.<br />
            3. Paste the generated JSON output below and click Generate!
          </p>
        </div>
        <button
          onClick={() => setIsPromptModalOpen(true)}
          class="shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-slate-800 dark:text-neutral-200 border border-slate-300 dark:border-neutral-700 transition flex items-center gap-1.5"
        >
          <Copy class="w-3.5 h-3.5" /> Copy Prompt Template
        </button>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Test Title (Optional)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Boolean Algebra & Logic Gates"
          class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none placeholder-slate-400 dark:placeholder-neutral-500 shadow-sm"
        />
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Paste Questions JSON or Text Payload</label>
        <textarea
          rows={7}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={`Paste your JSON output here... e.g.\n{\n  "title": "Boolean Algebra Quiz",\n  "questions": [\n    {\n      "id": 1,\n      "question": "निम्न में से NAND गेट का चयन कीजिए।",\n      "options": ["A", "B", "C", "D"],\n      "correctAnswer": 0,\n      "explanation": "NAND gate is created by adding NOT bubble to AND gate.",\n      "source": "Question Paper Page 1, Q215"\n    }\n  ]\n}`}
          class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-neutral-100 font-mono text-xs rounded-xl p-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none placeholder-slate-400 dark:placeholder-neutral-500 shadow-sm"
        />
      </div>

      {/* Test Environment Selection (Real Test vs Practice Test) */}
      <div class="space-y-3 bg-slate-50 dark:bg-neutral-900/40 p-4 rounded-xl border border-slate-200 dark:border-neutral-800">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200">
          Select Test Environment Mode
        </label>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Real Test Option */}
          <div
            onClick={() => setTestMode('real')}
            class={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              testMode === 'real'
                ? 'bg-rose-50/90 dark:bg-rose-950/30 border-rose-500 dark:border-rose-600 ring-2 ring-rose-500/20'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
            }`}
          >
            <div class={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              testMode === 'real' ? 'bg-rose-500 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'
            }`}>
              <Trophy class="w-4 h-4" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">Real Test Series</h5>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold">Strict</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                Strict exam conditions. Timer countdown is required, pause button disabled, auto-submits on time expiry.
              </p>
            </div>
          </div>

          {/* Practice Test Option */}
          <div
            onClick={() => setTestMode('practice')}
            class={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
              testMode === 'practice'
                ? 'bg-cyan-50/90 dark:bg-cyan-950/30 border-cyan-500 dark:border-cyan-600 ring-2 ring-cyan-500/20'
                : 'bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
            }`}
          >
            <div class={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              testMode === 'practice' ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-500'
            }`}>
              <BookOpen class="w-4 h-4" />
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h5 class="text-xs font-bold text-slate-900 dark:text-white">Practice / Mock Test</h5>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-semibold">Flexible</span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                Self-paced learning. Pause and resume timer anytime, optional time tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Real Test Duration Configuration */}
        {testMode === 'real' && (
          <div class="pt-2 space-y-2 border-t border-slate-200 dark:border-neutral-800/80 animate-in fade-in duration-150">
            <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Clock class="w-3.5 h-3.5 text-rose-500" /> Real Test Time Limit (Minutes)
            </label>
            <div class="flex flex-wrap items-center gap-2">
              {[10, 15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setTimeLimitMinutes(mins)}
                  class={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    Number(timeLimitMinutes) === mins
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border-slate-300 dark:border-neutral-700 hover:bg-slate-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  {mins} mins
                </button>
              ))}
              <div class="flex items-center gap-1.5">
                <span class="text-xs text-slate-400">Custom:</span>
                <input
                  type="number"
                  min={1}
                  max={300}
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(e.target.value)}
                  class="w-20 bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-2.5 py-1 text-xs outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                />
                <span class="text-xs text-slate-500 dark:text-neutral-400">mins</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={importJsonQuestions}
        class="w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg transition flex items-center justify-center gap-2"
      >
        <PlayCircle class="w-5 h-5" />
        <span>Parse JSON & Start Test Series</span>
      </button>
    </div>
  );
};
