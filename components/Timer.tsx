
import React, { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeUp]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercentage = (timeLeft / duration) * 100;

  const getBarColor = () => {
    if (progressPercentage > 50) return 'bg-qrios-success';
    if (progressPercentage > 20) return 'bg-yellow-400';
    return 'bg-qrios-danger';
  };

  return (
    <div className="w-full my-4">
        <div className="flex justify-between items-center mb-1 text-sm font-medium text-gray-700">
            <span>Tijd over</span>
            <span className="font-mono">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
                className={`h-4 rounded-full transition-all duration-500 ease-linear ${getBarColor()}`}
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    </div>
  );
};

export default Timer;