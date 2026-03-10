import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// --- Aapki Advertising Photos ke Links ---
const promoImages = [
  "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop", // Watch & Earn Style
  "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000&auto=format&fit=crop", // Fast Withdraw Style
  "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=1000&auto=format&fit=crop"  // Team Work Style
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const isPackageActive = true; 

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) setUserData({
          balance: data.balance || 0,
          team_size: data.team_size || 0,
          total_earned: data.total_earned || 0
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#064e3b] text-white font-sans overflow-y-auto pb-24 text-right">
      {/* 1. Header */}
      <div className="flex items-center justify-between bg-black/20 p-4 sticky top-0 z-20 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#064e3b] font-black shadow-lg">GP</div>
          <span className="font-black text-lg tracking-tighter italic">GOLD PLUS</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 p-2 rounded-full border border-white/10"><Bell size={20} /></div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2 rounded-full border border-white/10"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* --- Advertising Slider (Pehle Wala Compact Size) --- */}
        <div className="bg-black/20 p-1 rounded-[32px] border border-white/5 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            src={promoImages[currentImageIndex]} 
            alt="Promotion"
            className="w-full h-full object-cover rounded-[28px] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-[28px]"></div>
          
          {/* Promotion Text on Image */}
          <div className="absolute bottom-4 right-6 text-right">
            <p className="text-yellow-500 font-black text-lg italic tracking-tighter">GOLD PLUS AD</p>
            <p className="text-[10px] font-urdu opacity-90">Behtareen sarmaya kari ka mauqa!</p>
          </div>

          <div className="absolute bottom-4 left-6 flex gap-1">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-5' : 'bg-white/20 w-1.5'}`} />
            ))}
          </div>
        </div>

        {/* 2. Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-7 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
          <p className="text-[10px] opacity-60 mb-1 font-urdu">Total Balance</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full">+$0.21 today</span>
             <h2 className="text-4xl font-black text-yellow-500 tracking-tight">${userData.balance.toFixed(2)}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigate('/plans')} className="bg-white/10 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/5">Deposit</button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/5">Withdraw</button>
          </div>
        </div>

        {/* 3. Social Links */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => window.open('https://wa.me/923037264598', '_blank')} className="bg-white/5 py-4 rounded-3xl flex items-center justify-center gap-2 text-[11px] border border-white/5 font-urdu">
            <MessageCircle size={16} className="text-green-400" /> Support
          </button>
          <button onClick={() => window.open('https://youtube.com', '_blank')} className="bg-white/5 py-4 rounded-3xl flex items-center justify-center gap-2 text-[11px] border border-white/5 font-urdu">
            <Youtube size={16} className="text-red-500" /> Entertainment
          </button>
        </div>

        {/* 4. Daily Task */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-60 pr-2 font-urdu">Daily Tasks</h3>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[32px] border border-white/5 flex justify-between items-center shadow-xl">
            <div className="bg-yellow-600 text-[#064e3b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Start</div>
            <div className="flex items-center gap-4 text-right">
               <div>
                 <p className="font-bold text-sm font-urdu">Daily Ads</p>
                 <p className="text-[9px] opacity-40">Ads dekhein aur kamayein</p>
               </div>
               <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500"><PlayCircle size={22} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
