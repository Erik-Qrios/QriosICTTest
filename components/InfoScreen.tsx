import React, { useState } from 'react';
import { StudentInfo, Campuses } from '../types';

interface InfoScreenProps {
  onSubmit: (info: StudentInfo) => void;
}

const InfoScreen: React.FC<InfoScreenProps> = ({ onSubmit }) => {
  const [info, setInfo] = useState<StudentInfo>({ campus: '', firstName: '', lastName: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(info);
    }
  };

  const isFormValid = info.campus !== '' && info.firstName.trim() !== '' && info.lastName.trim() !== '';

  return (
    <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-qrios-dark mb-4">Gegevens Cursist</h2>
      <p className="text-center text-gray-600 mb-8">Vul alstublieft uw gegevens in om te beginnen.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="campus" className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
          <select 
            id="campus" 
            name="campus" 
            value={info.campus} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow"
          >
            <option value="" disabled>Kies een campus...</option>
            {Campuses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">Voornaam</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={info.firstName} 
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow" 
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Naam</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={info.lastName} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-white text-qrios-dark border border-gray-300 rounded-lg focus:ring-2 focus:ring-qrios-secondary focus:border-qrios-secondary transition-shadow"
          />
        </div>
        <button 
          type="submit" 
          disabled={!isFormValid} 
          className="w-full bg-qrios-primary text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-opacity-90 transition-all disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transform hover:scale-105"
        >
          Start Bevraging
        </button>
      </form>
    </div>
  );
};

export default InfoScreen;