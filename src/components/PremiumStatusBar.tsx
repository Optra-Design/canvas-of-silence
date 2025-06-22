
import React, { useState, useEffect } from 'react';
import { Sparkles, Clock } from 'lucide-react';

const PremiumStatusBar = () => {
  const [currentQuote, setCurrentQuote] = useState("Excellence is never an accident");

  const quotes = [
    "Excellence is never an accident",
    "Design is intelligence made visible",
    "Simplicity is the ultimate sophistication",
    "Good design is good business",
    "Design creates culture. Culture shapes values",
    "The details are not details. They make the design",
    "Design is thinking made visual",
    "Form follows function",
    "Less is more"
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 12000);
    
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 glass p-3 rounded-xl max-w-xs opacity-90">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
        <div className="text-sm">
          <div className="font-semibold text-white">Optra Design</div>
          <div className="text-xs text-white/70 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Premium Studio
          </div>
        </div>
      </div>
      
      <div className="text-xs text-white/80 italic border-l-2 border-gradient-to-b from-orange-500 to-pink-500 pl-2">
        "{currentQuote}"
      </div>
    </div>
  );
};

export default PremiumStatusBar;
