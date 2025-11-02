
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StudentInfo, Attempt, Question, UserAnswer } from './types';
import { QUESTION_BANK, QUESTIONS_PER_QUIZ, PASSING_SCORE } from './constants';
import WelcomeScreen from './components/WelcomeScreen';
import InfoScreen from './components/InfoScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import EndScreen from './components/EndScreen';
import Header from './components/Header';
import ConfirmationModal from './components/ConfirmationModal';
import TeacherCodeModal from './components/TeacherCodeModal';

const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <footer className="w-full text-center text-white text-lg p-4 mt-auto bg-qrios-primary">
      {time.toLocaleDateString('nl-BE')} - {time.toLocaleTimeString('nl-BE')}
    </footer>
  );
};


function App() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testEndTime, setTestEndTime] = useState<Date | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentAttemptNumber, setCurrentAttemptNumber] = useState(1);
  const [history, setHistory] = useState<Attempt[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSkipLevelModalOpen, setIsSkipLevelModalOpen] = useState(false);
  
  const handleStart = () => {
    setGameState('info');
  };

  const handleResetRequest = () => {
    setIsResetModalOpen(true);
  };
  
  const confirmReset = () => {
    setGameState('welcome');
    setStudentInfo(null);
    setTestStartTime(null);
    setTestEndTime(null);
    setCurrentLevel(1);
    setCurrentAttemptNumber(1);
    setHistory([]);
    setCurrentQuestions([]);
    setIsResetModalOpen(false);
  };
  
  const cancelReset = () => {
    setIsResetModalOpen(false);
  };

  const handleSkipLevel = () => {
    const skippedAttempt: Attempt = {
      level: currentLevel,
      attemptNumber: currentAttemptNumber,
      startTime: new Date(),
      endTime: new Date(),
      score: 0,
      answers: {},
      questions: currentQuestions,
      passed: true, // Treat skip as a pass
      durationInSeconds: 0,
      skipped: true,
    };
    
    setHistory(prev => [...prev, skippedAttempt]);

    if (currentLevel < 3) {
      startQuiz(currentLevel + 1, 1);
    } else {
      setTestEndTime(new Date());
      setGameState('end');
    }
  };

  const handleSkipLevelRequest = () => {
    setIsSkipLevelModalOpen(true);
  };

  const handleConfirmSkip = (code: string): boolean => {
    if (code === 'Qrios') {
      handleSkipLevel();
      setIsSkipLevelModalOpen(false);
      return true;
    }
    return false;
  };

  const handleCancelSkip = () => {
    setIsSkipLevelModalOpen(false);
  };

  const handleInfoSubmit = (info: StudentInfo) => {
    setStudentInfo(info);
    setTestStartTime(new Date());
    startQuiz(1, 1);
  };
  
  const startQuiz = (level: number, attempt: number) => {
    const questions = QUESTION_BANK.filter(q => q.level === level)
      .sort(() => 0.5 - Math.random())
      .slice((attempt - 1) * QUESTIONS_PER_QUIZ, attempt * QUESTIONS_PER_QUIZ);
    
    setCurrentQuestions(questions);
    setCurrentLevel(level);
    setCurrentAttemptNumber(attempt);
    setGameState('quiz');
  };

  const handleQuizEnd = (answers: { [questionId: string]: UserAnswer }, durationInSeconds: number, timeUp: boolean) => {
    let score = 0;
    currentQuestions.forEach(q => {
      const userAnswer = answers[q.id];
      if (userAnswer === q.correctAnswer) {
        score++;
      }
    });

    const passed = score >= PASSING_SCORE && !timeUp;

    const newAttempt: Attempt = {
      level: currentLevel,
      attemptNumber: currentAttemptNumber,
      startTime: new Date(Date.now() - durationInSeconds * 1000),
      endTime: new Date(),
      score,
      answers,
      questions: currentQuestions,
      passed,
      durationInSeconds,
      timeUp
    };

    setHistory(prev => [...prev, newAttempt]);
    setGameState('results');
  };

  const handleNextStep = () => {
    const lastAttempt = history[history.length - 1];
    if (lastAttempt.passed) {
      if (lastAttempt.level < 3) {
        // Passed, move to next level
        startQuiz(lastAttempt.level + 1, 1);
      } else {
        // Passed final level, end test
        setTestEndTime(new Date());
        setGameState('end');
      }
    } else { // Failed
      if (lastAttempt.attemptNumber < 2) {
        // Failed, give second attempt
        startQuiz(lastAttempt.level, 2);
      } else {
        // Failed second attempt, end test
        setTestEndTime(new Date());
        setGameState('end');
      }
    }
  };


  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return <WelcomeScreen onStart={handleStart} />;
      case 'info':
        return <InfoScreen onSubmit={handleInfoSubmit} />;
      case 'quiz':
        return <QuizScreen 
                  key={`${currentLevel}-${currentAttemptNumber}`}
                  questions={currentQuestions} 
                  level={currentLevel} 
                  onQuizEnd={handleQuizEnd} 
                />;
      case 'results':
        return <ResultsScreen 
                  attempt={history[history.length - 1]} 
                  history={history}
                  onNext={handleNextStep}
                />;
      case 'end':
        const lastPassedLevel = history.filter(h => h.passed).sort((a,b) => b.level - a.level)[0]?.level || 0;
        return <EndScreen 
                  achievedLevel={lastPassedLevel}
                  history={history}
                  studentInfo={studentInfo!}
                  testStartTime={testStartTime!}
                  testEndTime={testEndTime!}
                />;
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-qrios-light min-h-screen flex flex-col items-center text-qrios-dark font-sans">
       <Header />
       {gameState !== 'welcome' && (
        <div className="w-full flex justify-center items-center gap-4 p-4 bg-qrios-light border-b border-gray-200">
          <button
            onClick={handleResetRequest}
            className="bg-white border border-gray-300 text-qrios-dark hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
          >
            Home
          </button>
          {gameState === 'quiz' && (
            <button
              onClick={handleSkipLevelRequest}
              className="bg-qrios-secondary text-white hover:bg-opacity-90 font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-sm"
            >
              Niveau overslaan
            </button>
          )}
        </div>
       )}
       <main className="w-full max-w-5xl mx-auto flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8">
        {renderContent()}
       </main>
      <Footer />
      <ConfirmationModal
        isOpen={isResetModalOpen}
        onConfirm={confirmReset}
        onCancel={cancelReset}
        message="Ben je zeker dat je de test wil verlaten?"
      />
      <TeacherCodeModal
        isOpen={isSkipLevelModalOpen}
        onConfirm={handleConfirmSkip}
        onCancel={handleCancelSkip}
      />
    </div>
  );
}

export default App;