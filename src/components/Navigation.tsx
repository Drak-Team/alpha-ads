import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, MessageSquare, User } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* 1. درمیان والا ابھرا ہوا ریفر بٹن (بالکل تصویر جیسا) */}
      <div className="absolute left-1/2 -top-8 -translate-x-1/2 flex flex-col items-center">
        <button 
          onClick={() => navigate('/refer')}
          className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-4 rounded-full shadow-[0_0_25px_rgba(147,51,234,0.6)] border-[5px] border-[#064e3b] active:scale-90 transition-all z-50"
        >
          <Share2 size={26} className="text-white" />
        </button>
        <span className={`text-[9px] font-bold mt-1 uppercase tracking-tighter ${location.pathname === '/refer' ? 'text-purple-400' : 'text-white/40'}`}>
          Invite
        </span>
      </div>

      {/* 2. مین نیویگیشن پٹی */}
      <nav className="bg-[#111827]/95 backdrop-blur-2xl border-t border-white/5 px-6 py-3 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          
          {/* HOME بٹن */}
          <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/' ? 'text-purple-400 scale-110' : 'text-white/30'}`}>
            <Home size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </button>
          
          {/* WATCH (Ads) بٹن */}
          <button onClick={() => navigate('/ads')} className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/ads' ? 'text-purple-400 scale-110' : 'text-white/30'}`}>
            <PlayCircle size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest">Watch</span>
          </button>

          {/* ریفر بٹن کے لیے جگہ */}
          <div className="w-16"></div>

          {/* CHAT بٹن (نوٹیفکیشن ڈاٹ کے ساتھ) */}
          <button onClick={() => navigate('/chat')} className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/chat' ? 'text-purple-400 scale-110' : 'text-white/30'}`}>
            <div className="relative">
              <MessageSquare size={22} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-[8px] w-4 h-4 flex items-center justify-center rounded-full text-white border-2 border-[#111827] font-bold">1</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
          </button>

          {/* PROFILE بٹن */}
          <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/profile' ? 'text-purple-400 scale-110' : 'text-white/30'}`}>
            <User size={22} />
            <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navigation;
