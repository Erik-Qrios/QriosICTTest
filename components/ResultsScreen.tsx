
import React, { useState } from 'react';
import { Attempt } from '../types';
import { PASSING_SCORE, QUESTIONS_PER_QUIZ } from '../constants';
import Report from './Report';

interface ResultsScreenProps {
  attempt: Attempt;
  history: Attempt[];
  onNext: () => void;
}

const CheckIcon = () => (
    <div className="w-20 h-20 rounded-full bg-qrios-success bg-opacity-10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-qrios-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    </div>
);

const XCircleIcon = () => (
     <div className="w-20 h-20 rounded-full bg-qrios-danger bg-opacity-10 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-qrios-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ attempt, history, onNext }) => {
  const [showReport, setShowReport] = useState(false);
  const { passed, score, attemptNumber, level, timeUp } = attempt;
  
  const attemptsForThisLevel = history.filter(h => h.level === level);

  const getNextButtonText = () => {
    if (passed) {
      return level < 3 ? 'Volgend Niveau' : 'Test Afronden';
    }
    return attemptNumber < 2 ? 'Tweede Poging' : 'Test Beëindigen';
  };
  
  if (showReport) {
    return (
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
        <h2 className="text-3xl font-bold text-qrios-dark mb-6">Antwoorden Niveau {level}</h2>
        {attemptsForThisLevel.map((att, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Poging {att.attemptNumber}</h3>
            <Report attempt={att} />
          </div>
        ))}
        <button 
          onClick={() => setShowReport(false)}
          className="w-full mt-4 bg-qrios-primary text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-opacity-90 transition-colors"
        >
          Terug naar Resultaten
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
        <div className="flex justify-center mb-4">
            {passed ? <CheckIcon/> : <XCircleIcon />}
        </div>
      <h2 className="text-3xl font-bold mb-2">{passed ? 'Gefeliciteerd!' : 'Helaas...'}</h2>
      {timeUp && !passed ? (
        <p className="text-gray-600 text-lg mb-4">
          Helaas, je hebt de {QUESTIONS_PER_QUIZ} vragen niet kunnen beantwoorden in 3 minuten. Je bent daarom niet geslaagd voor niveau {level}.
        </p>
      ) : (
        <p className="text-gray-600 text-lg mb-4">
          {passed ? `Je bent geslaagd voor niveau ${level}!` : `Je bent niet geslaagd voor niveau ${level}.`}
        </p>
      )}

      <div className="bg-qrios-light rounded-lg p-4 my-6 border">
        <p className="text-lg font-medium text-gray-700">Jouw score:</p>
        <p className={`text-5xl font-bold my-2 ${passed ? 'text-qrios-success' : 'text-qrios-danger'}`}>{score}<span className="text-3xl text-gray-500">/{QUESTIONS_PER_QUIZ}</span></p>
      </div>
      {!passed && !timeUp && <p className="text-gray-600 text-md mb-6">Je hebt een score van {PASSING_SCORE} of hoger nodig om te slagen.</p>}
      {!passed && attemptNumber < 2 && <p className="text-qrios-success font-semibold text-md mb-6">Je krijgt een tweede poging!</p>}
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button 
          onClick={() => setShowReport(true)}
          className="flex-1 bg-gray-200 text-qrios-dark font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors"
        >
          Antwoorden
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-qrios-primary text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-opacity-90 transition-colors"
        >
          {getNextButtonText()}
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;