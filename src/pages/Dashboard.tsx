import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// --- Aapki Pasand ki hui 2 Professional Pics (Ads) ---
const promoImages = [
  "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/placeholder.svg", // Pic 1: Watch & Earn (Larki wali)
  "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/placeholder.svg"  // Pic 2: Dollar & Company Logo (Larka/Larki wali)
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  // Har 4 second baad automatic change hogi
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
      {/* 1. Gold Plus Header */}
      <div className="flex items-center justify-between bg-black/30 p-4 sticky top-0 z-30 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#064e3b] font-black shadow-lg">GP</div>
          <span className="font-black text-lg tracking-tighter italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 p-2 rounded-full border border-white/10"><Bell size={20} /></div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2 rounded-full border border-white/10"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* --- Advertising Slider (Aapki Pasand ki 2 Pics) --- */}
        <div className="bg-black/40 p-1 rounded-[32px] border border-yellow-500/30 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Ad"
            className="w-full h-full object-cover rounded-[28px] transition-all duration-1000"
          />
          {/* Company Branding Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[28px] flex flex-col justify-end p-5">
             <p className="text-yellow-500 font-black text-xs tracking-widest uppercase">Official Promotion</p>
             <p className="text-sm font-urdu font-bold leading-tight">Dunya ko dikha do - Gold Plus ke sath kamayein!</p>
          </div>

          <div className="absolute top-4 left-6 flex gap-1">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-6' : 'bg-white/20 w-1.5'}`} />
            ))}
          </div>
        </div>

        {/* 2. Dollar & Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-7 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
          <p className="text-[10px] opacity-60 mb-1 font-urdu">Total Balance (Kul Raqam)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full">+$0.21 today</span>
             <h2 className="text-4xl font-black text-yellow-500 tracking-tighter">${userData.balance.toFixed(2)}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-7">
            <button onClick={() => navigate('/plans')} className="bg-yellow-600 text-[#064e3b] py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black shadow-lg">
              Deposit
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/5">
              Withdraw
            </button>
          </div>
        </div>

        {/* 3. Adds Watch (Daily Task) */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold opacity-40 pr-2 uppercase font-urdu">Ads Watch Section</h3>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[32px] border border-white/5 flex justify-between items-center shadow-xl group cursor-pointer">
            <div className="bg-yellow-600 text-[#064e3b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Start</div>
            <div className="flex items-center gap-4 text-right">
               <div>
                 <p className="font-bold text-sm font-urdu">Daily Ads Dekhein</p>
                 <p className="text-[9px] opacity-40">Company Ads & Rewards</p>
               </div>
               <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500 border border-yellow-500/20"><PlayCircle size={22} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
