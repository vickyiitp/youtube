import React, { useState, useEffect } from 'react';
import { CompassIcon } from './icons/CompassIcon';

const loadingMessages = [
  "Fetching top YouTube videos...",
  "Analyzing Google search queries...",
  "Identifying underserved niches...",
  "Sending data to AI strategist...",
  "Cross-referencing audience questions...",
  "Generating creative angles...",
  "Compiling strategic insights...",
];

const LoadingAnimator: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
        <CompassIcon className="w-16 h-16 text-cyan-400 animate-spin" style={{animationDuration: '3s'}}/>
        <h2 className="text-2xl font-bold mt-6 text-slate-200">AI is thinking...</h2>
        <p className="text-slate-400 mt-2 text-lg transition-opacity duration-500">
            {loadingMessages[messageIndex]}
        </p>
    </div>
  );
};

export default LoadingAnimator;