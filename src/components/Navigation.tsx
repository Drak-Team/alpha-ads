import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, MessageSquare, User } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* درمیان والا بڑا فلوٹنگ بٹن */}
      <div className="absolute left-1/2 -top-7 -translate-x-1/2">
        <button 
          onClick={() => navigate('/invite')}
          className="bg-gradient-to-tr from-purple-600 to-blue-500 p-4 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.5)] border-4 border-[#064e3b] active:scale-90 transition-all"
        >
          <Share2 size={28} className="text-white" />
        </button>
      </div>

      <nav className="bg-[#1a1a2e]/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 pb-6">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-purple-400' : 'text-white/30'}`}>
            <Home size={22} /><span className="text-[8px] font-bold">HOME</span>
          </button>
          
          <button onClick={() => navigate('/ads')} className={`flex flex-col items-center gap-1 ${location.pathname === '/ads' ? 'text-purple-400' : 'text-white/30'}`}>
            <PlayCircle size={22} /><span className="text-[8px] font-bold">WATCH</span>
          </button>

          {/* بٹن کے لیے جگہ چھوڑنے کے لیے خالی ڈیویژن */}
          <div className="w-12"></div>

          <button onClick={() => navigate('/chat')} className={`flex flex-col items-center gap-1 ${location.pathname === '/chat' ? 'text-purple-400' : 'text-white/30'}`}>
            <MessageSquare size={22} /><span className="text-[8px] font-bold">CHAT</span>
          </button>

          <button onClick={() => navigate('/profile')} className={`flex flex-col items-center gap-1 ${location.pathname === '/profile' ? 'text-purple-400' : 'text-white/30'}`}>
            <User size={22} /><span className="text-[8px] font-bold">PROFILE</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
