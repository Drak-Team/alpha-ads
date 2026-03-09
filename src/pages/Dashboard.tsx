import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// یہ ہیں وہ پروفیشنل تصاویر جو آپ کی ایپ کو آؤٹ کلاس بنائیں گی
const promoImages = [
  "https://images.unsplash.com/photo-1621504450181-5d356f63d3ee?q=80&w=1000&auto=format&fit=crop", // ڈالر اور کرپٹو گرافک (پیسہ کمانے کی وائب)
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop", // پروفیشنل لڑکی (ٹرسٹ اور سپورٹ کے لیے)
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop"  // پیمنٹ کارڈ اور فون (تیز ودڈرا کے لیے)
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const isPackageActive = true; 

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
      <div className="flex items-center justify-between bg-black/20 p-4 sticky top-0 z-10 backdrop-blur-md border-b border-white/5">
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
        {/* --- پروموشنل سلائیڈر --- */}
        <div className="bg-black/20 p-1 rounded-[35px] border border-white/5 relative overflow-hidden aspect-[16/9] shadow-2xl">
          <img 
            src={promoImages[currentImageIndex]} 
            alt="Promotion"
            className="w-full h-full object-cover rounded-[30px] transition-all duration-1000"
          />
          {/* تصویر کے اوپر ٹیکسٹ اوورلے (Promotion Text) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[30px] flex flex-col justify-end p-6 text-right">
             <h3 className="text-yellow-500 font-black text-xl italic uppercase">Gold Plus</h3>
             <p className="text-[10px] font-urdu opacity-90">گھر بیٹھے ڈالرز کمائیں اور فوراً ودڈرا کریں!</p>
          </div>
          
          <div className="absolute bottom-4 left-6 flex gap-1.5">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-6' : 'bg-white/20 w-1.5'}`} />
            ))}
          </div>
        </div>

        {/* بیلنس کارڈ */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-7 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
          <p className="text-[10px] opacity-60 mb-1 font-urdu">کل رقم (Total Balance)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full">+$0.21 today</span>
             <h2 className="text-4xl font-black text-yellow-500">${userData.balance.toFixed(2)}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigate('/plans')} className="bg-white/10 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/5">Deposit</button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold border border-white/5">Withdraw</button>
          </div>
        </div>

        {/* ٹاسک سیکشن */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-60 pr-2 font-urdu">ڈیلی ٹاسک</h3>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[32px] border border-white/5 flex justify-between items-center shadow-lg">
            <div className="bg-yellow-600 text-[#064e3b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase">Start</div>
            <div className="flex items-center gap-4 text-right">
               <div>
                 <p className="font-bold text-sm font-urdu">روزانہ اشتہارات</p>
                 <p className="text-[9px] opacity-40">ایڈز دیکھیں اور ڈالر کمائیں</p>
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
