
import React from 'react';
import { Attempt } from '../types';

interface ReportProps {
  attempt: Attempt;
}

const CorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-qrios-success mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const IncorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-qrios-danger mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);


const Report: React.FC<ReportProps> = ({ attempt }) => {
  return (
    <div className="space-y-6">
      {attempt.questions.map((q, index) => {
        const userAnswer = attempt.answers[q.id];
        const isCorrect = userAnswer === q.correctAnswer;

        const displayUserAnswer = userAnswer === null ? 'Geen antwoord' : String(userAnswer);
        const displayCorrectAnswer = String(q.correctAnswer);

        return (
          <div key={q.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <p 
              className="font-semibold text-qrios-dark mb-3"
              dangerouslySetInnerHTML={{ __html: `Vraag ${index + 1}: ${q.questionText}` }}
            />
            <div className="flex items-start">
              {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
              <div className="flex-grow text-sm">
                <p>Jouw antwoord: <span className={`font-medium ${isCorrect ? 'text-qrios-success' : 'text-qrios-danger'}`}>{displayUserAnswer}</span></p>
                {!isCorrect && <p>Correct antwoord: <span className="font-medium text-qrios-success">{displayCorrectAnswer}</span></p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Report;