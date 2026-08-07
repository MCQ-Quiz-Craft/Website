import React, { useState } from 'react';
import { UploadCloud, Wand2, Loader2, Trash2 } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { PROMPT_TEMPLATE } from '../../constants/demoData';

export const ImageUploader = () => {
  const { apiKeys, startQuiz } = useQuiz();

  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('gpt-4o-mini');
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStatus, setProgressStatus] = useState('0%');
  const [statusMessage, setStatusMessage] = useState('Processing Image with AI...');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBase64Image(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedImage = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setBase64Image(null);
  };

  const processImageWithAI = async () => {
    if (!base64Image) {
      alert('Please upload an image of a question paper first.');
      return;
    }

    const apiKey = provider === 'openai' ? apiKeys.openai : apiKeys.gemini;
    if (!apiKey) {
      alert(`Please configure your ${provider.toUpperCase()} API key first by clicking the "API Keys" button in the top header.`);
      return;
    }

    setIsProcessing(true);
    setProgressStatus('25%');
    setStatusMessage(`Sending image to ${provider.toUpperCase()} Vision AI...`);

    try {
      let jsonResponse;
      if (provider === 'openai') {
        jsonResponse = await callOpenAiVision(apiKey, model, base64Image);
      } else {
        jsonResponse = await callGeminiVision(apiKey, base64Image);
      }

      setProgressStatus('75%');
      setStatusMessage('Validating and building quiz structure...');

      const cleanJson = jsonResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);

      if (!parsedData.questions || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
        throw new Error('AI returned JSON, but no valid question array was found.');
      }

      if (title.trim()) {
        parsedData.title = title.trim();
      }

      setProgressStatus('100%');
      setStatusMessage('Extraction complete!');

      setTimeout(() => {
        setIsProcessing(false);
        startQuiz(parsedData);
      }, 500);
    } catch (err) {
      alert('AI Processing Error: ' + err.message);
      setIsProcessing(false);
    }
  };

  const callOpenAiVision = async (key, modelVariant, image) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: modelVariant || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: PROMPT_TEMPLATE },
          {
            role: 'user',
            content: [
              { type: 'text', text: 'Extract all questions from this image.' },
              { type: 'image_url', image_url: { url: image } }
            ]
          }
        ],
        temperature: 0.2,
        max_tokens: 3000
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI API call failed.');
    }
    return data.choices[0].message.content;
  };

  const callGeminiVision = async (key, image) => {
    const pureBase64 = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: PROMPT_TEMPLATE + '\nExtract all questions from the attached image.' },
                { inline_data: { mime_type: mimeType, data: pureBase64 } }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API call failed.');
    }
    return data.candidates[0].content.parts[0].text;
  };

  return (
    <div class="p-4 sm:p-6 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Provider Selection */}
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">AI Engine Provider</label>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none shadow-sm"
          >
            <option value="openai">OpenAI (ChatGPT gpt-4o / gpt-4o-mini)</option>
            <option value="gemini">Google Gemini (gemini-1.5-flash)</option>
          </select>
        </div>

        {/* Model Variant */}
        <div>
          <label class="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">Model Variant</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            class="w-full bg-white dark:bg-neutral-900 border border-slate-300 dark:border-neutral-700 text-slate-900 dark:text-white rounded-lg px-3 py-2.5 text-xs focus:ring-2 focus:ring-slate-900 dark:focus:ring-white outline-none shadow-sm"
          >
            <option value="gpt-4o">gpt-4o (Best for complex images & diagrams)</option>
            <option value="gpt-4o-mini">gpt-4o-mini (Fast & economical)</option>
          </select>
        </div>

        {/* Test Title (Optional) */}
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
      </div>

      {/* Image Drag & Drop Zone */}
      <div
        class="border-2 border-dashed border-slate-300 dark:border-neutral-700 hover:border-slate-900 dark:hover:border-neutral-400 rounded-xl p-6 sm:p-10 text-center transition cursor-pointer bg-white/70 dark:bg-neutral-900/40 relative group shadow-sm"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        {!selectedFile ? (
          <div class="space-y-3 pointer-events-none">
            <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 mx-auto flex items-center justify-center transition border border-slate-200 dark:border-neutral-700 shadow-sm">
              <UploadCloud class="w-8 h-8" />
            </div>
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">Click or drag question paper image here</p>
              <p class="text-xs text-slate-500 dark:text-neutral-400 mt-1">Supports PNG, JPG, WEBP photos (Textbooks, Notes, Hindi/English MCQs)</p>
            </div>
          </div>
        ) : (
          <div class="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <img src={base64Image} alt="Preview" class="max-h-48 rounded-lg border border-slate-300 dark:border-neutral-700 shadow-md" />
            <div class="text-left space-y-2">
              <p class="text-xs font-mono font-semibold text-slate-900 dark:text-white truncate max-w-xs">{selectedFile.name}</p>
              <p class="text-xs text-slate-500 dark:text-neutral-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              <button
                type="button"
                onClick={removeSelectedImage}
                class="px-2.5 py-1 rounded bg-rose-100 hover:bg-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500/30 text-rose-800 dark:text-rose-300 text-xs border border-rose-200 dark:border-rose-500/30 transition flex items-center gap-1"
              >
                <Trash2 class="w-3.5 h-3.5" /> Change Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Process Button & Progress */}
      <div class="space-y-3">
        <button
          onClick={processImageWithAI}
          disabled={isProcessing}
          class="w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black shadow-lg transition transform active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Wand2 class="w-5 h-5" />
          <span>Extract Questions & Generate Test Series</span>
        </button>

        {isProcessing && (
          <div class="glass-card rounded-xl p-4 border border-slate-300 dark:border-neutral-700 space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="font-medium text-slate-800 dark:text-neutral-200 flex items-center gap-2">
                <Loader2 class="w-4 h-4 animate-spin" /> {statusMessage}
              </span>
              <span class="font-mono text-slate-500 dark:text-neutral-400">{progressStatus}</span>
            </div>
            <div class="w-full bg-slate-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden border border-slate-300 dark:border-neutral-700">
              <div class="bg-slate-900 dark:bg-white h-full transition-all duration-300" style={{ width: progressStatus }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
