
import React, { useState, useEffect, useCallback } from 'react';
import { Question, UserAnswer } from '../types';
import { QUIZ_DURATION_SECONDS } from '../constants';
import Timer from './Timer';

interface QuizScreenProps {
  questions: Question[];
  level: number;
  onQuizEnd: (answers: { [questionId: string]: UserAnswer }, durationInSeconds: number, timeUp: boolean) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, level, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: UserAnswer }>({});

  const handleTimeUp = useCallback(() => {
    const startTime = Date.now() / 1000 - QUIZ_DURATION_SECONDS;
    const endTime = Date.now() / 1000;
    onQuizEnd(answers, Math.round(endTime - startTime), true);
  }, [answers, onQuizEnd]);
  
  useEffect(() => {
    const initialAnswers: { [questionId:string]: UserAnswer } = {};
    questions.forEach(q => {
      initialAnswers[q.id] = null;
    });
    setAnswers(initialAnswers);
  }, [questions]);

  const handleAnswerChange = (questionId: string, answer: UserAnswer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    const duration = QUIZ_DURATION_SECONDS - (Math.floor(Date.now() / 1000 - quizStartTime.current / 1000));
    onQuizEnd(answers, QUIZ_DURATION_SECONDS - duration, false);
  };
  
  const quizStartTime = React.useRef(Date.now());

  const currentQuestion = questions[currentQuestionIndex];

  const renderQuestion = (q: Question) => {
    const userAnswer = answers[q.id];

    return (
      <div className="space-y-3">
        {q.options?.map(option => (
          <label key={option} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-qrios-secondary transition-all has-[:checked]:bg-qrios-secondary has-[:checked]:bg-opacity-20 has-[:checked]:border-qrios-primary">
            <input 
              type="radio" 
              name={q.id} 
              value={option}
              checked={userAnswer === option}
              onChange={() => handleAnswerChange(q.id, option)}
              className="w-5 h-5 text-qrios-primary focus:ring-qrios-secondary"
            />
            <span className="ml-4 text-lg text-qrios-dark">{option}</span>
          </label>
        ))}
      </div>
    );
  };

  if (!currentQuestion) return <div>Laden...</div>;

  return (
    <div className="w-full max-w-3xl bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-qrios-dark">Niveau {level}</h2>
        <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">Vraag {currentQuestionIndex + 1} / {questions.length}</span>
      </div>
      
      <Timer duration={QUIZ_DURATION_SECONDS} onTimeUp={handleTimeUp} />

      <div className="bg-qrios-light p-6 rounded-lg my-4 flex-grow min-h-[250px] flex flex-col justify-center border">
        <p 
          className="text-xl sm:text-2xl text-qrios-dark mb-6 font-medium"
          dangerouslySetInnerHTML={{ __html: currentQuestion.questionText as string }}
        />
        {renderQuestion(currentQuestion)}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Vorige</button>
        {currentQuestionIndex < questions.length - 1 ? (
          <button onClick={handleNext} className="px-8 py-3 bg-qrios-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md transform hover:scale-105">Volgende</button>
        ) : (
          <button onClick={handleSubmit} className="px-8 py-3 bg-qrios-success text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors shadow-md transform hover:scale-105">Bevraging Indienen</button>
        )}
      </div>
    </div>
  );
};

export default QuizScreen;