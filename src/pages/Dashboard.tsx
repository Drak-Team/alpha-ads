import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, MessageCircle, Lock, PlayCircle, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const isPackageActive = false; // یہ بعد میں ڈیٹا بیس سے جڑے گا

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans text-right">
      {/* 1. کمپنی نیم اور نوٹیفکیشن */}
      <div className="flex items-center justify-between bg-black/20 p-4 rounded-3xl mb-6 border border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-white font-bold">D+</div>
          <span className="font-bold text-lg">Dollar Plus Ads</span>
        </div>
        <div className="bg-white/5 p-2 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* 2. بیلنس کارڈ */}
      <div className="bg-gradient-to-br from-emerald-800 to-[#064e3b] p-8 rounded-[40px] mb-6 shadow-2xl border border-white/10 relative overflow-hidden text-center">
        <p className="text-sm opacity-60 mb-1">ٹوٹل بیلنس</p>
        <h2 className="text-4xl font-extrabold mb-1">$52.53</h2>
        <p className="text-xs opacity-50">≈ PKR 14,708.4</p>
      </div>

      {/* 3. ڈپازٹ اور ودڈرا بٹن */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => navigate('/plans')} className="bg-emerald-900/50 border border-white/10 p-4 rounded-3xl flex items-center justify-center gap-2 font-bold text-white shadow-lg">
          <ArrowDownCircle size={18} className="text-yellow-500" /> ڈپازٹ
        </button>
        <button onClick={() => navigate('/profile')} className="bg-emerald-900/50 border border-white/10 p-4 rounded-3xl flex items-center justify-center gap-2 font-bold text-white shadow-lg">
          <ArrowUpCircle size={18} className="text-red-400" /> ودڈرا
        </button>
      </div>

      {/* 4. چینل اور کسٹمر سپورٹ */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-white/5 p-4 rounded-3xl flex items-center justify-center gap-2 text-xs border border-white/5">
          <Users size={16} className="text-blue-400" /> فالو چینل
        </button>
        <button className="bg-white/5 p-4 rounded-3xl flex items-center justify-center gap-2 text-xs border border-white/5">
          <MessageCircle size={16} className="text-green-400" /> کسٹمر سپورٹ
        </button>
      </div>

      {/* 5. ڈیلی ایڈز (صرف ایکٹو پیکج پر) */}
      <div className="space-y-4">
        <div 
          onClick={() => isPackageActive ? navigate('/ads') : alert('پہلے پیکج ایکٹو کریں')}
          className={`p-5 rounded-3xl border border-white/5 flex justify-between items-center ${isPackageActive ? 'bg-white/10' : 'bg-black/20 opacity-60 cursor-not-allowed'}`}
        >
          <div className="flex items-center gap-3">
             {isPackageActive ? <PlayCircle size={24} className="text-yellow-500" /> : <Lock size={24} />}
             <div className="text-left">
               <p className="font-bold">روزانہ کے اشتہارات</p>
               <p className="text-[10px]">{isPackageActive ? 'ایڈز دیکھنے کے لیے کلک کریں' : 'ایڈز لاک ہیں'}</p>
             </div>
          </div>
          <button className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-bold">
            {isPackageActive ? 'کھولیں' : 'لاک'}
          </button>
        </div>

        {/* 6. ارننگ پیکج بٹن */}
        <div 
          onClick={() => navigate('/plans')}
          className="bg-yellow-600/20 p-5 rounded-3xl border border-yellow-500/20 flex justify-between items-center cursor-pointer hover:bg-yellow-600/30 transition-all"
        >
          <div className="flex items-center gap-3 text-left">
             <div className="bg-yellow-600 p-2 rounded-xl text-white"><Wallet size={20} /></div>
             <div>
               <p className="font-bold text-yellow-500">ارننگ پیکجز</p>
               <p className="text-[10px] opacity-70">تمام پلانز دیکھنے کے لیے کلک کریں</p>
             </div>
          </div>
          <button className="bg-yellow-600 px-5 py-2 rounded-xl text-[10px] font-bold shadow-lg">پلان دیکھیں</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
