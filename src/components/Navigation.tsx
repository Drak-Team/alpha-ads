import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, MessageSquare, User } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* سینٹر والا ابھرا ہوا ریفر بٹن */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex flex-col items-center">
        <button 
          onClick={() => navigate('/refer')}
          className="bg-gradient-to-tr from-purple-600 to-blue-500 p-4 rounded-full shadow-[0_0_30px_rgba(147,51,234,0.6)] border-4 border-[#064e3b] active:scale-90 transition-all z-50"
        >
          <Share2 size={28} className="text-white" />
        </button>
        <span className="text-[9px] font-bold text-purple-400 mt-1 uppercase font-urdu">ریفر</span>
      </div>

      <nav className="bg-[#1a1a2e]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-3 pb-8">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-purple-400' : 'text-white/30'}`}>
            <Home size={22} /><span className="text-[8px] font-black">HOME</span>
          </button>
          
          <button onClick={() => navigate('/ads')} className={`flex flex-col items-center gap-1 ${location.pathname === '/ads' ? 'text-purple-400' : 'text-white/30'}`}>
            <PlayCircle size={22} /><span className="text-[8px] font-black">WATCH</span>
          </button>

          <div className="w-16"></div> {/* خالی جگہ */}

          <button onClick={() => navigate('/chat')} className={`flex flex-col items-center gap-1 ${location.pathname === '/chat' ? 'text-purple-400' : 'text-white/30'}`}>
            <div className="relative">
              <MessageSquare size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full text-white border border-[#1a1a2e]">1</span>
            </div>
            <span className="text-[8px] font-black">CHAT</span>
          </button>

          <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-purple-400' : 'text-white/30'}`}>
            <User size={22} /><span className="text-[8px] font-black">PROFILE</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
