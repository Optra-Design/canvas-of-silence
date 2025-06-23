
import React, { useState } from 'react';
import { MessageSquare, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderChatBubble = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed left-6 bottom-6 z-40">
      <div className="relative group">
        <Link
          to="/chat"
          className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Chat with Aniketh</p>
            <p className="text-xs opacity-80">Founder & Designer</p>
          </div>
          <MessageSquare className="w-5 h-5" />
        </Link>
        
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
        
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
      </div>
    </div>
  );
};

export default FounderChatBubble;
