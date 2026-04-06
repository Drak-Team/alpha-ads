import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutGrid, Sparkles, ClipboardList, Send, User } from 'lucide-react';
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

  const hiddenPaths = ['/auth', '/'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutGrid, label: 'HOME' },
    { path: '/plans', icon: Sparkles, label: 'INVEST' },
    { path: '/ads', icon: ClipboardList, label: 'EARN' },
    { path: '/refer', icon: Send, label: 'INVITE' },
    { path: '/profile', icon: User, label: 'PROFILE' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[50]">
      <nav className="bg-[#1a1035] border-t border-purple-500/20 px-2 py-2 pb-6">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-1 px-3 py-1 transition-all relative"
            >
              {isActive(item.path) && (
                <div className="absolute -top-2 w-8 h-1 bg-yellow-500 rounded-full" />
              )}
              <item.icon size={22} className={isActive(item.path) ? 'text-yellow-500' : 'text-gray-500'} />
              <span className={`text-[9px] font-bold ${isActive(item.path) ? 'text-yellow-500' : 'text-gray-500'}`}>{item.label}</span>
            </button>
          ))}
        </div>
        {isAdmin && (
          <button
            onClick={() => navigate('/admin-panel')}
            className="absolute -top-10 right-4 bg-red-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-full shadow-lg"
          >
            ADMIN
          </button>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
