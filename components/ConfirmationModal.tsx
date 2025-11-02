import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
        <p className="text-xl text-qrios-dark mb-8">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-qrios-danger text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-opacity-90 transition-colors"
          >
            Ja
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-qrios-dark font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-300 transition-colors"
          >
            Annuleren
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;