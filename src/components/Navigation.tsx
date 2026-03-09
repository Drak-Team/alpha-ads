import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, MessageSquare, User, PlusCircle } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <PlayCircle size={22} />, label: 'Ads', path: '/ads' },
    // Darmiyan wala bada Invite button (Empty space placeholder for layout)
    { isCenter: true }, 
    { icon: <MessageSquare size={22} />, label: 'Chat', path: '/chat' },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Center Invite Button (Ubhra hua design) */}
      <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-60">
        <button 
          onClick={() => navigate('/invite')}
          className="bg-gradient-to-tr from-yellow-600 to-yellow-400 p-4 rounded-full shadow-[0_8px_20px_rgba(202,138,4,0.4)] border-4 border-[#064e3b] active:scale-90 transition-transform"
        >
          <Share2 size={28} className="text-white" />
        </button>
        <p className="text-[10px] font-bold text-yellow-500 text-center mt-1 font-urdu uppercase tracking-tighter">Invite</p>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#043327]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          {navItems.map((item, index) => (
            item.isCenter ? (
              <div key="center" className="w-16"></div> // Center space for the floating button
            ) : (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  location.pathname === item.path ? 'text-yellow-500 scale-110' : 'text-white/30 hover:text-white/60'
                }`}
              >
                {item.icon}
                <span className="text-[8px] font-bold uppercase tracking-tight">{item.label}</span>
              </button>
            )
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
