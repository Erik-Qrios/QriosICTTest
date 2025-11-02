import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center animate-fade-in-up flex flex-col items-center justify-center flex-grow">
      <h1 className="text-4xl md:text-5xl font-bold text-qrios-dark mb-4">Welkom bij de IT-Vaardigheidstest</h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
        Deze test is ontworpen om uw huidige computervaardigheden in kaart te brengen. Dit helpt ons om u de best mogelijke begeleiding te geven. De resultaten vormen een beginsituatie, zodat we later uw vooruitgang kunnen meten.
      </p>
      <button 
        onClick={onStart} 
        className="bg-qrios-primary hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-qrios-secondary"
      >
        Start de test
      </button>
    </div>
  );
};

export default WelcomeScreen;