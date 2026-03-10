import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// --- آپ کی بھیجی ہوئی ڈیزائن وائب والی تصاویر ---
const promoImages = [
  "https://images.unsplash.com/photo-1611974717537-48358ad772bc?q=80&w=1000&auto=format&fit=crop", // ڈیزائن 1: واچ اینڈ ارن (سنہری وائب)
  "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=1000&auto=format&fit=crop", // ڈیزائن 2: انویسٹمنٹ (ڈالرز وائب)
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop"  // ڈیزائن 3: فاسٹ ودڈرا (جاز کیش/ایزی پیسہ وائب)
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const isPackageActive = true; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
    }, 4500); 
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
      {/* 1. پروفیشنل ہیڈر */}
      <div className="flex items-center justify-between bg-black/40 p-4 sticky top-0 z-30 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-yellow-700 to-yellow-500 p-2 rounded-xl text-[#064e3b] font-black shadow-[0_0_15px_rgba(234,179,8,0.4)]">GP</div>
          <span className="font-black text-lg tracking-tighter italic text-yellow-500 drop-shadow-md">GOLD PLUS</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner"><Bell size={18} /></div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner"><Users size={18} /></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* --- فائنل ایڈورٹائزنگ سلائیڈر (Compact & Graphic Design) --- */}
        <div className="bg-black/40 p-1 rounded-[32px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <img 
            src={promoImages[currentImageIndex]} 
            alt="Promotion"
            className="w-full h-full object-cover rounded-[28px] transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          {/* اوورلے گرافکس (لوگو اور ٹیکسٹ) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[28px] flex flex-col justify-end p-5">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] text-black font-bold shadow-lg">GP</div>
                <span className="text-yellow-500 font-black text-xs italic">GOLD PLUS OFFICIAL</span>
             </div>
             <p className="text-sm font-urdu font-bold leading-tight">بہترین سرمایہ کاری کا موقع! ابھی شامل ہوں</p>
             <p className="text-[9px] opacity-60 font-urdu mt-0.5">تیز ترین ڈپازٹ اور ودڈرا - جاز کیش اور ایزی پیسہ</p>
          </div>

          {/* نیویگیشن ڈاٹس */}
          <div className="absolute top-4 left-6 flex gap-1">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-6' : 'bg-white/20 w-2'}`} />
            ))}
          </div>
        </div>

        {/* 2. مین بیلنس کارڈ (Premium Look) */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-8 rounded-[45px] shadow-2xl border border-white/10 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all"></div>
          <p className="text-[10px] opacity-60 mb-1 font-urdu">ٹوٹل بیلنس (Available Balance)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[9px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20">LIVE UPDATE</span>
             <h2 className="text-4xl font-black text-yellow-500 tracking-tighter">${userData.balance.toFixed(2)}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3.5 mt-8">
            <button onClick={() => navigate('/plans')} className="bg-yellow-600/90 text-[#064e3b] py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black shadow-lg hover:bg-yellow-500 transition-all active:scale-95">
              <ArrowDownCircle size={16} /> DEPOSIT
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/5 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/10 hover:bg-white/10 transition-all active:scale-95">
              <ArrowUpCircle size={16} /> WITHDRAW
            </button>
          </div>
        </div>

        {/* 3. ڈیلی ٹاسک کارڈ (Attractive) */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold opacity-40 pr-3 uppercase tracking-widest font-urdu text-right">آپ کے کام (Daily Tasks)</h3>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[35px] border border-white/5 flex justify-between items-center shadow-xl hover:bg-white/[0.07] transition-all cursor-pointer group">
            <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-[10px] font-black tracking-tighter">ACTIVE NOW</div>
            <div className="flex items-center gap-4 text-right">
               <div>
                 <p className="font-bold text-sm font-urdu group-hover:text-yellow-500 transition-colors">ڈیلی ایڈز دیکھیں</p>
                 <p className="text-[9px] opacity-40 text-left">Watch Ads & Earn $</p>
               </div>
               <div className="bg-yellow-600/20 p-3.5 rounded-2xl text-yellow-500 border border-yellow-500/20 shadow-inner group-hover:scale-110 transition-transform"><PlayCircle size={24} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
