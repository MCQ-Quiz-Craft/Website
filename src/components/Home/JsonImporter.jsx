import React, { useState } from 'react';
import { Sparkles, Copy, PlayCircle } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';

export const JsonImporter = () => {
  const { startQuiz, setIsPromptModalOpen } = useQuiz();
  const [title, setTitle] = useState('');
  const [jsonText, setJsonText] = useState('');

  const importJsonQuestions = () => {
    const rawText = jsonText.trim();
    if (!rawText) {
      alert('Please paste your JSON or text question payload first.');
      return;
    }

    try {
      const cleanJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('JSON structure must contain a "questions" array.');
      }

      if (title.trim()) {
        parsed.title = title.trim();
      }

      startQuiz(parsed);
    } catch (e) {
      alert('Invalid JSON syntax: ' + e.message + '\nMake sure you copied the full JSON block!');
    }
  };

  return (
    <div class="p-4 sm:p-6 space-y-5">
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
          rows={8}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder={`Paste your JSON output here... e.g.\n{\n  "title": "Boolean Algebra Quiz",\n  "questions": [\n    {\n      "id": 1,\n      "question": "निम्न में से NAND गेट का चयन कीजिए।",\n      "options": ["A", "B", "C", "D"],\n      "correctAnswer": 0,\n      "explanation": "NAND gate is created by adding NOT bubble to AND gate.",\n      "source": "Question Paper Page 1, Q215"\n    }\n  ]\n}`}
          class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-neutral-100 font-mono text-xs rounded-xl p-3 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none placeholder-slate-400 dark:placeholder-neutral-500 shadow-sm"
        />
      </div>

      <button
        onClick={importJsonQuestions}
        class="w-full py-3 px-6 rounded-xl font-heading font-semibold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg transition flex items-center justify-center gap-2"
      >
        <PlayCircle class="w-5 h-5" />
        <span>Parse JSON & Start Test Series</span>
      </button>
    </div>
  );
};
