import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { DEMO_TEST_DATA } from '../constants/demoData';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'quiz' | 'result'
  const [activeTab, setActiveTab] = useState('json'); // 'image' | 'json'

  const [apiKeys, setApiKeysState] = useState({
    openai: localStorage.getItem('qc_openai_key') || '',
    gemini: localStorage.getItem('qc_gemini_key') || ''
  });

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState({ 0: true });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Test Mode & Timer Config
  const [testMode, setTestMode] = useState('practice'); // 'real' | 'practice'
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef(null);

  // Modals state
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    rawPayload: ''
  });

  const showErrorModal = (title, message, rawPayload = '') => {
    setErrorModal({
      isOpen: true,
      title,
      message,
      rawPayload
    });
  };

  const closeErrorModal = () => {
    setErrorModal({
      isOpen: false,
      title: '',
      message: '',
      rawPayload: ''
    });
  };

  const finalizeTestSubmission = () => {
    setIsSubmitModalOpen(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Timer interval handling
  useEffect(() => {
    if (currentView === 'quiz' && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          const nextSec = prev + 1;
          if (testMode === 'real' && timeLimitMinutes > 0 && nextSec >= timeLimitMinutes * 60) {
            clearInterval(timerRef.current);
            setTimeout(() => {
              finalizeTestSubmission();
            }, 0);
          }
          return nextSec;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentView, isTimerPaused, testMode, timeLimitMinutes]);

  const saveApiKeys = (keys) => {
    setApiKeysState(keys);
    localStorage.setItem('qc_openai_key', keys.openai || '');
    localStorage.setItem('qc_gemini_key', keys.gemini || '');
    setIsApiKeyModalOpen(false);
  };

  const startQuiz = (quizObj, options = {}) => {
    setCurrentQuiz(quizObj);
    setUserAnswers({});
    setMarkedForReview({});
    setVisitedQuestions({ 0: true });
    setCurrentQuestionIndex(0);
    setTimerSeconds(0);
    setIsTimerPaused(false);
    setTestMode(options.testMode || 'practice');
    setTimeLimitMinutes(options.timeLimitMinutes || 15);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadDemoTest = () => {
    startQuiz(DEMO_TEST_DATA, { testMode: 'real', timeLimitMinutes: 15 });
  };

  const selectOption = (optIdx) => {
    if (isTimerPaused) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optIdx
    }));
  };

  const clearResponse = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionIndex];
      return copy;
    });
  };

  const toggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestionIndex]: !prev[currentQuestionIndex]
    }));
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => ({ ...prev, [index]: true }));
  };

  const navigateQuestion = (delta) => {
    const newIdx = currentQuestionIndex + delta;
    if (!currentQuiz) return;
    if (newIdx >= 0 && newIdx < currentQuiz.questions.length) {
      jumpToQuestion(newIdx);
    } else if (newIdx === currentQuiz.questions.length) {
      setIsSubmitModalOpen(true);
    }
  };

  const togglePauseTimer = () => {
    if (testMode === 'real') return; // Cannot pause in Real Test Mode
    setIsTimerPaused((prev) => !prev);
  };

  const navigateTo = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <QuizContext.Provider
      value={{
        currentView,
        navigateTo,
        activeTab,
        setActiveTab,
        apiKeys,
        saveApiKeys,
        currentQuiz,
        startQuiz,
        loadDemoTest,
        userAnswers,
        selectOption,
        clearResponse,
        markedForReview,
        toggleMarkForReview,
        visitedQuestions,
        currentQuestionIndex,
        jumpToQuestion,
        navigateQuestion,
        timerSeconds,
        isTimerPaused,
        togglePauseTimer,
        finalizeTestSubmission,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        isPromptModalOpen,
        setIsPromptModalOpen,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
        errorModal,
        showErrorModal,
        closeErrorModal,
        testMode,
        timeLimitMinutes
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
