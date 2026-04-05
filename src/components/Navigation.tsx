import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PlayCircle, Share2, Crown, User } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
      if (data) setIsAdmin(true);
    };
    checkAdmin();
  }, []);

  const hiddenPaths = ['/auth'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'HOME' },
    { path: '/ads', icon: PlayCircle, label: 'WATCH' },
    { path: '/refer', icon: Share2, label: 'REFER', isCenter: true },
    { path: '/plans', icon: Crown, label: 'PLANS' },
    { path: '/profile', icon: User, label: 'PROFILE' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50]">
      <nav className="bg-[#0a1f18] border-t border-yellow-500/10 px-2 py-2 pb-6">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                item.isCenter 
                  ? 'bg-yellow-500 text-[#042f24] -mt-6 p-3 rounded-full shadow-lg shadow-yellow-500/30 border-4 border-[#0a1f18]' 
                  : isActive(item.path) 
                    ? 'text-yellow-500' 
                    : 'text-gray-500'
              }`}
            >
              <item.icon size={item.isCenter ? 24 : 20} />
              {!item.isCenter && <span className="text-[8px] font-bold">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
