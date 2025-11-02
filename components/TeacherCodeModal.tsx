

import React, { useState, useEffect } from 'react';

interface TeacherCodeModalProps {
  isOpen: boolean;
  onConfirm: (code: string) => boolean;
  onCancel: () => void;
}

const TeacherCodeModal: React.FC<TeacherCodeModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    const isCorrect = onConfirm(code);
    if (!isCorrect) {
      setError('Incorrecte code. Probeer opnieuw.');
      setCode('');
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirmClick();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-qrios-dark mb-4">Niveau overslaan</h2>
        <p className="text-gray-600 mb-6">Deze actie is enkel voor leerkrachten met code.</p>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError('');
            }}
            className={`w-full px-4 py-3 bg-white text-qrios-dark border ${error ? 'border-qrios-danger' : 'border-gray-300'} rounded-lg focus:ring-2 ${error ? 'focus:ring-qrios-danger' : 'focus:ring-qrios-secondary'} focus:border-transparent transition-shadow`}
            placeholder="Voer code in..."
            autoFocus
          />
          {error && <p className="text-qrios-danger text-sm text-left">{error}</p>}
          
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-qrios-primary text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-opacity-90 transition-colors"
            >
              OK
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-qrios-dark font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors"
            >
              Annuleren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCodeModal;