import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, Share2, TrendingUp, Award 
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const isPackageActive = false; // پیکیج سٹیٹس

  return (
    <div className="min-h-screen bg-[#064e3b] text-white font-sans overflow-y-auto pb-24">
      {/* 1. ٹاپ ہیڈر (Company Name & Notifications) */}
      <div className="flex items-center justify-between bg-black/20 p-4 sticky top-0 z-10 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-white font-bold shadow-lg">DP</div>
          <span className="font-bold text-lg tracking-tight">Dollar Plus Ads</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 p-2 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="bg-white/5 p-2 rounded-full">
            <Users size={20} onClick={() => navigate('/profile')} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 2. مین بیلنس کارڈ (تصویر والا ڈیزائن) */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-6 rounded-[35px] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <p className="text-xs opacity-60 mb-1 font-urdu text-right">کل رقم (Total Balance)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-xs text-green-400 font-bold">+$0.00 today</span>
             <h2 className="text-4xl font-black">$0.00</h2>
          </div>
          <p className="text-[10px] opacity-40 text-right mt-1">≈ PKR 0.0</p>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigate('/plans')} className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5">
              <ArrowDownCircle size={16} className="text-green-400" /> Deposit
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5">
              <ArrowUpCircle size={16} className="text-red-400" /> Withdraw
            </button>
          </div>
        </div>

        {/* 3. ریفرل اور سٹیٹس کارڈز (Grid) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-3xl border border-white/5">
            <TrendingUp size={20} className="text-purple-400 mb-2" />
            <p className="text-[10px] opacity-60">Total Earned</p>
            <p className="font-bold text-lg">$0.00</p>
          </div>
          <div className="bg-black/20 p-4 rounded-3xl border border-white/5">
            <Users size={20} className="text-blue-400 mb-2" />
            <p className="text-[10px] opacity-60">Team Size</p>
            <p className="font-bold text-lg">0</p>
          </div>
        </div>

        {/* 4. کوئیک لنکس (Social & Support) */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white/5 py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] border border-white/5 font-urdu hover:bg-white/10">
            <Users size={16} className="text-blue-400" /> فالو چینل
          </button>
          <button className="bg-white/5 py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] border border-white/5 font-urdu hover:bg-white/10">
            <MessageCircle size={16} className="text-green-400" /> کسٹمر سپورٹ
          </button>
        </div>

        {/* 5. ڈیلی ایڈز سیکشن (صرف پیکج ایکٹو ہونے پر) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-60 pr-2 font-urdu text-right">آپ کے کام (Daily Tasks)</h3>
          <div 
            onClick={() => isPackageActive ? navigate('/ads') : alert('پہلے پیکج ایکٹو کریں')}
            className={`p-5 rounded-3xl border border-white/5 flex justify-between items-center transition-all ${isPackageActive ? 'bg-white/10 border-yellow-500/30' : 'bg-black/30 opacity-60 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-xl ${isPackageActive ? 'bg-yellow-600' : 'bg-white/10'}`}>
                 {isPackageActive ? <PlayCircle size={20} /> : <Lock size={20} />}
               </div>
               <div className="text-left">
                 <p className="font-bold text-sm font-urdu">روزانہ کے اشتہارات</p>
                 <p className="text-[9px] opacity-50">{isPackageActive ? 'کلک کریں اور کمائیں' : 'پہلے پلان خریدیں'}</p>
               </div>
            </div>
            <span className="text-[10px] font-bold uppercase">{isPackageActive ? 'Watch' : 'Locked'}</span>
          </div>

          {/* 6. ارننگ پیکج بٹن (سکول کرنے پر نیچے) */}
          <div 
            onClick={() => navigate('/plans')}
            className="bg-gradient-to-r from-yellow-600/20 to-emerald-900/40 p-5 rounded-3xl border border-yellow-500/20 flex justify-between items-center cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3">
               <div className="bg-yellow-600 p-2 rounded-xl text-white shadow-lg"><Gift size={20} /></div>
               <div className="text-left">
                 <p className="font-bold text-sm text-yellow-500 font-urdu">ارننگ پیکجز</p>
                 <p className="text-[9px] opacity-70">پلان ایکٹیو کریں اور کمانا شروع کریں</p>
               </div>
            </div>
            <button className="bg-yellow-600 px-4 py-2 rounded-xl text-[10px] font-bold shadow-lg">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
