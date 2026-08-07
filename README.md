# QuizCraft AI - Image & Text Test Series Generator

A powerful web application that turns photos of question paper pages, textbook pages, handwritten notes, or raw JSON text into interactive online test series with live scoring, detailed solutions, and performance diagnostic analytics.

## 🌟 Key Features

1. **Direct Vision AI Image Extraction (ChatGPT & Gemini)**
   - Upload any image of a question paper (Hindi/English MCQs, textbook photos, handwritten notes).
   - Enter your **OpenAI API Key** (`gpt-4o` / `gpt-4o-mini`) or **Google Gemini Key** (`gemini-1.5-flash`).
   - The AI automatically detects questions, option choices (A, B, C, D), correct answers, diagrams, and generates step-by-step explanations.

2. **Keyless AI Prompt & JSON Import Mode (Free Workflow)**
   - Don't want to use an API Key? Click **"AI Prompt Schema"** to copy our predefined rigid JSON extraction prompt.
   - Paste your question paper photo into ChatGPT / Gemini / Claude web chat along with the prompt.
   - Copy the resulting JSON payload, paste it into the **"Paste JSON / Text Series"** tab, and generate the test series instantly!

3. **Interactive Test Series (Exam Simulator)**
   - Live exam interface with Question Navigation Palette (Answered 🟩, Unanswered 🟥, Marked for Review 🟪, Not Visited ⬜).
   - Live elapsed timer and question progress tracking.
   - Option selection with clear feedback and response clearing.

4. **Performance & Solution Analytics**
   - Instant scorecard showing Total Marks, Accuracy Percentage, Correct/Incorrect breakdown, and Time Spent.
   - Question-by-question review highlighting your selected option (Green for correct, Red for wrong) alongside the official correct answer and AI step-by-step reasoning.

5. **Pre-loaded Demo Test**
   - Includes 21 pre-extracted questions directly from the user's attached book image (*Boolean Algebra & Logic Gates* in Hindi/English with circuit diagrams for NAND, NOR, OR, AND, and Full Adder ICs).

## 🚀 How to Run

Simply open [index.html](file:///Users/sudhanshukumar/.gemini/antigravity-ide/scratch/ai-test-series-generator/index.html) in any modern web browser or serve it using any web server.
# Website
