# QuizCraft AI 🎯 — AI-Powered Interactive Test Series Generator

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green.svg?logo=openai)](https://openai.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-Vision_AI-orange.svg?logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Convert any question paper photo, textbook page, or handwritten note into an interactive online exam simulator with real-time scoring, question source tracking, and detailed AI explanations.**

---

## 🌟 Key Features

### 📷 1. Direct Vision AI Extraction
- **Multi-Model Support**: Integrated directly with **OpenAI (GPT-4o / GPT-4o-mini)** and **Google Gemini (gemini-1.5-flash)** Vision APIs.
- **Multilingual OCR**: Supports textbook pages, exam question papers, and handwritten notes in English, Hindi, and regional languages.

### 🏷️ 2. Question Source Metadata Tracking
- Automatically scans image headers, footers, page numbers, chapter titles, and question IDs.
- Displays metadata badges (`Source: Page 1, Q215` / `SSC JE 2021`) on both active exam cards and detailed solution reports.

### ⚡ 3. Dual Processing Mode (Direct API vs Free Keyless Mode)
- **Direct API Mode**: Enter your OpenAI or Gemini API key for 1-click automated image-to-test extraction.
- **Free Keyless Mode**: Copy our standardized AI Prompt Template, paste your image into ChatGPT / Gemini / Claude web app for free, and import the generated JSON payload!

### ⏱️ 4. Full-Featured Exam Simulator
- **Timer Control**: Real-time timer with a **Pause / Resume** feature and blur overlay maintaining test integrity.
- **Question Navigation Palette**: 5-column grid highlighting *Answered*, *Unanswered*, *Marked for Review*, and *Not Visited* questions.
- **Interactive SVG Diagrams**: Native rendering of electronic circuits, logic gates, and geometry figures.

### 📊 5. Comprehensive Score Analytics & Solution Review
- **Instant Diagnostic Report**: Percentage accuracy badge, total score ring, time spent, and breakdown of correct vs incorrect answers.
- **Step-by-Step AI Solutions**: Detailed explanations for every question, indicating official correct options and your selected choices.

### 🌗 6. Dual Theme Support
- **Monochromatic Dark Theme**: Pure black (`#000000`) high-contrast dark mode.
- **Crisp Light Theme**: Polished `#f8fafc` canvas with clear typography and soft borders.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18 (Functional Components, Hooks, Context API) |
| **Build Tool & HMR** | Vite 5 |
| **Styling** | Vanilla CSS + Tailwind CSS v3 (Custom Dark/Light tokens) |
| **Iconography** | Lucide React |
| **AI Integration** | OpenAI Chat Completions API & Google Gemini Vision API |

---

## 📁 Project Architecture

```text
ai-test-series-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx                 # Sticky Navbar & Action controls
│   │   ├── Home/
│   │   │   ├── HomeView.jsx           # Creation hub container
│   │   │   ├── ImageUploader.jsx      # Vision AI processing form & dropzone
│   │   │   ├── JsonImporter.jsx       # Keyless JSON paste editor
│   │   │   └── SampleTests.jsx        # Pre-loaded demo test paper
│   │   ├── Quiz/
│   │   │   ├── QuizView.jsx           # Active exam simulator view
│   │   │   ├── QuizHeaderBar.jsx      # Title, timer & pause control
│   │   │   ├── QuestionCard.jsx       # Question text, options & source badge
│   │   │   ├── QuestionPalette.jsx    # 5-column navigation grid & legend
│   │   │   └── PausedOverlay.jsx      # Backdrop blur pause overlay
│   │   ├── Result/
│   │   │   ├── ResultView.jsx         # Performance summary & score dashboard
│   │   │   └── SolutionCard.jsx       # Detailed answer review cards
│   │   └── Modals/
│   │       ├── ApiKeyModal.jsx        # OpenAI & Gemini API key configuration
│   │       ├── PromptModal.jsx        # AI prompt template copy viewer
│   │       └── SubmitConfirmModal.jsx # Test submit confirmation dialog
│   ├── constants/
│   │   └── demoData.js                # Pre-loaded 21-MCQ test & system prompt
│   ├── context/
│   │   ├── ThemeContext.jsx           # Light/Dark mode state management
│   │   └── QuizContext.jsx            # Global quiz engine & timer state
│   ├── App.jsx                        # Main layout container
│   ├── index.css                      # Tailwind directives & CSS variables
│   └── main.jsx                       # React DOM root entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:MCQ-Quiz-Craft/Website.git
   cd Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build locally**:
   ```bash
   npm run preview
   ```

---

## 💡 How It Works

### Workflow 1: Direct Vision AI
1. Click **API Keys** in the header and enter your OpenAI or Google Gemini API key (stored securely in `localStorage`).
2. Upload any question paper photo or textbook page image.
3. (Optional) Provide a custom test title.
4. Click **Extract Questions & Generate Test Series**.
5. The Vision AI model parses all questions, options, answers, explanations, and source page numbers to launch your test!

### Workflow 2: Free Keyless Mode
1. Click **AI Prompt Schema** in the header and copy the system prompt.
2. Open ChatGPT, Gemini, or Claude in your browser, upload your image, and paste the prompt.
3. Copy the returned JSON payload.
4. Go to **Paste JSON / Text Series** tab, paste the payload, and click **Parse JSON & Start Test Series**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
