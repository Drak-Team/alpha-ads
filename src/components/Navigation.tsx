import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, MessageSquare, User } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50]">
      {/* سینٹر والا ابھرا ہوا بٹن */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2">
        <button 
          onClick={() => navigate('/refer')}
          className="bg-purple-600 p-4 rounded-full shadow-lg border-4 border-[#064e3b] active:scale-90 transition-all"
        >
          <Share2 size={24} className="text-white" />
        </button>
      </div>

      <nav className="bg-[#111827] border-t border-white/5 px-4 py-3 pb-8">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button onClick={() => navigate('/')} className={`flex flex-col items-center ${isActive('/') ? 'text-purple-400' : 'text-gray-500'}`}>
            <Home size={22} /><span className="text-[8px] font-bold mt-1">HOME</span>
          </button>
          
          <button onClick={() => navigate('/ads')} className={`flex flex-col items-center ${isActive('/ads') ? 'text-purple-400' : 'text-gray-500'}`}>
            <PlayCircle size={22} /><span className="text-[8px] font-bold mt-1">WATCH</span>
          </button>

          <div className="w-16"></div>

          <button onClick={() => navigate('/chat')} className={`flex flex-col items-center ${isActive('/chat') ? 'text-purple-400' : 'text-gray-500'}`}>
            <div className="relative">
              <MessageSquare size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-[#111827]"></span>
            </div>
            <span className="text-[8px] font-bold mt-1">CHAT</span>
          </button>

          <button onClick={() => navigate('/profile')} className={`flex flex-col items-center ${isActive('/profile') ? 'text-purple-400' : 'text-gray-500'}`}>
            <User size={22} /><span className="text-[8px] font-bold mt-1">PROFILE</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
