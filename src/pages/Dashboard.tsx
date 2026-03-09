import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// --- فائنل پروموشنل تصاویر (آپ کے آئیڈیا کے مطابق) ---
const promoImages = [
  "https://img.freepik.com/free-photo/pretty-girl-showing-mobile-phone_1187-2513.jpg?t=st=1717616035~exp=1717619635~hmac=808620b72a44f2e9649535f2998f5a56654b037340e4f26b5278c7a6e1233&w=1000", // لڑکی موبائل دکھاتے ہوئے (گھر بیٹھے کمائیں)
  "https://img.freepik.com/free-vector/cash-withdrawal-concept-illustration_114360-5221.jpg?t=st=1717616147~exp=1717619747~hmac=a4c7e6c986d341b31230a10c7102e3b7b257121287c2b5340a6e3427909&w=1000", // کیش ودڈرا گرافک (تیز ترین ودڈرا)
  "https://img.freepik.com/free-vector/team-achieving-goal-together-business-concept-flat-design_114360-15545.jpg?t=st=1717616223~exp=1717619823~hmac=d24b20a775b5a76e7368b6934c9c72e252873734e3e3b0934c11b0e0735&w=1000"  // ٹیم ورک گرافک (ٹیم بونس)
];

// ان تصاویر کے اوپر دکھانے والے پیغامات (اردو میں)
const promoTexts = [
  "گھر بیٹھے ڈالرز کمائیں، آج ہی Gold Plus جوائن کریں!",
  "ایزی پیسہ اور جاز کیش میں تیز ترین ودڈرا، براہ راست آپ کے اکاؤنٹ میں!",
  "اپنی ٹیم بنائیں اور پریمیم بونس کے ساتھ اپنی آمدنی بڑھائیں!"
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const isPackageActive = true; 

  // خودکار تصویر بدلنے کی لاجک (ہر 5 سیکنڈ بعد)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % promoImages.length);
    }, 5000); 
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
      {/* 1. ٹاپ ہیڈر */}
      <div className="flex items-center justify-between bg-black/30 p-4 sticky top-0 z-20 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#064e3b] font-black shadow-xl">GP</div>
          <span className="font-black text-xl tracking-tighter italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-white/5 p-2.5 rounded-full relative border border-white/10"><Bell size={20} /></div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2.5 rounded-full border border-white/10"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-7">
        {/* --- فائنل "آلا" پروموشنل سلائیڈر --- */}
        <div className="bg-white/5 p-1 rounded-[40px] border border-white/10 relative overflow-hidden aspect-[16/10] shadow-2xl transition-all hover:border-yellow-500/30">
          <img 
            src={promoImages[currentImageIndex]} 
            alt="Promotion"
            className="w-full h-full object-cover rounded-[36px] transition-all duration-1000 ease-in-out"
          />
          {/* تصویر کے اوپر ٹیکسٹ اوورلے (Promotion Text) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-[36px] flex flex-col justify-end p-6 text-right">
             <h3 className="text-yellow-500 font-black text-2xl italic uppercase tracking-tighter mb-1.5">Gold Plus</h3>
             <p className="text-[11px] font-urdu opacity-100 text-white font-medium leading-relaxed bg-black/30 p-2 rounded-lg">{promoTexts[currentImageIndex]}</p>
          </div>
          
          {/* نیویگیشن بارز */}
          <div className="absolute top-4 right-6 flex gap-1.5">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-8' : 'bg-white/20 w-3'}`} />
            ))}
          </div>
        </div>

        {/* بیلنس کارڈ (باقی کوڈ وہی رہے گا...) */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-8 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] opacity-60 mb-1 font-urdu">کل رقم (Total Balance)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full">+$0.21 today</span>
             <h2 className="text-4xl font-black text-yellow-500 tracking-tight">${userData.balance.toFixed(2)}</h2>
          </div>
          <p className="text-[10px] opacity-40 text-right mt-1 font-mono">≈ PKR {(userData.balance * 280).toFixed(1)}</p>
          
          <div className="grid grid-cols-2 gap-3.5 mt-7">
            <button onClick={() => navigate('/plans')} className="bg-white/10 hover:bg-yellow-600 hover:text-[#064e3b] py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5 shadow-lg">
              <ArrowDownCircle size={16} /> Deposit
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 hover:bg-red-600 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5 shadow-lg">
              <ArrowUpCircle size={16} /> Withdraw
            </button>
          </div>
        </div>

        {/* کوئیک لنکس (Social) */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => window.open('https://wa.me/923037264598', '_blank')} className="bg-white/5 py-5 rounded-[30px] flex items-center justify-center gap-2.5 text-[11px] border border-white/5 font-urdu hover:bg-white/10 shadow-lg">
            <MessageCircle size={18} className="text-green-400" /> کسٹمر سپورٹ
          </button>
          <button onClick={() => window.open('http://googleusercontent.com/youtube.com/3', '_blank')} className="bg-white/5 py-5 rounded-[30px] flex items-center justify-center gap-2.5 text-[11px] border border-white/5 font-urdu hover:bg-white/10 shadow-lg">
            <Youtube size={18} className="text-red-500" /> انٹرٹینمنٹ
          </button>
        </div>

        {/* ڈیلی ٹاسک */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-60 pr-2 font-urdu">آپ کے ٹاسک (Daily Tasks)</h3>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[32px] border border-white/5 flex justify-between items-center shadow-xl hover:scale-[1.01] transition-transform">
            <div className="bg-yellow-600 text-[#064e3b] px-5 py-2 rounded-full text-[10px] font-black uppercase">Start</div>
            <div className="flex items-center gap-4 text-right">
               <div>
                 <p className="font-bold text-sm font-urdu">روزانہ اشتہارات</p>
                 <p className="text-[9px] opacity-40 text-left">ایڈز دیکھیں اور ڈالر کمائیں</p>
               </div>
               <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500 border border-yellow-500/20"><PlayCircle size={22} /></div>
            </div>
          </div>
        </div>

        {/* سٹیٹس گریڈ */}
        <div className="grid grid-cols-2 gap-4 text-right">
          <div className="bg-black/20 p-6 rounded-[35px] border border-white/5 shadow-xl">
            <TrendingUp size={22} className="text-yellow-500 mb-3 mr-auto" />
            <p className="text-[10px] opacity-40 font-urdu">ٹیم سائز</p>
            <p className="font-black text-2xl tracking-tight">${userData.team_size}</p>
          </div>
          <div className="bg-black/20 p-6 rounded-[35px] border border-white/5 shadow-xl">
            <Award size={22} className="text-blue-400 mb-3 mr-auto" />
            <p className="text-[10px] opacity-40 font-urdu">ٹوٹل ارننگ</p>
            <p className="font-black text-2xl tracking-tight">${userData.total_earned.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
          
