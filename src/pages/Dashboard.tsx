import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wallet, ArrowDownCircle, ArrowUpCircle, Bell, Users, 
  MessageCircle, Lock, PlayCircle, Gift, TrendingUp, Youtube, CheckCircle2, Award 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0, team_size: 0, total_earned: 0 });
  const isPackageActive = true; 

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
    <div className="min-h-screen bg-[#064e3b] text-white font-sans overflow-y-auto pb-24">
      {/* 1. ٹاپ ہیڈر */}
      <div className="flex items-center justify-between bg-black/20 p-4 sticky top-0 z-10 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#064e3b] font-black shadow-lg">GP</div>
          <span className="font-black text-lg tracking-tighter italic">GOLD PLUS</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/5 p-2 rounded-full relative border border-white/10">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2 rounded-full border border-white/10">
            <Users size={20} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 2. مین بیلنس کارڈ */}
        <div className="bg-gradient-to-br from-emerald-800 to-green-950 p-7 rounded-[40px] shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] opacity-60 mb-1 font-urdu text-right">کل رقم (Total Balance)</p>
          <div className="flex items-baseline justify-end gap-2">
             <span className="text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded-full">+$0.21 today</span>
             <h2 className="text-4xl font-black text-yellow-500">${userData.balance.toFixed(2)}</h2>
          </div>
          <p className="text-[10px] opacity-40 text-right mt-1 font-mono">≈ PKR {(userData.balance * 280).toFixed(1)}</p>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigate('/plans')} className="bg-white/10 hover:bg-yellow-600 hover:text-[#064e3b] py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5">
              <ArrowDownCircle size={16} /> Deposit
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/10 hover:bg-red-600 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all border border-white/5">
              <ArrowUpCircle size={16} /> Withdraw
            </button>
          </div>
        </div>

        {/* 3. کوئیک لنکس */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => window.open('https://wa.me/923037264598', '_blank')} className="bg-white/5 py-4 rounded-3xl flex items-center justify-center gap-2 text-[11px] border border-white/5 font-urdu hover:bg-white/10">
            <MessageCircle size={16} className="text-green-400" /> کسٹمر سپورٹ
          </button>
          <button onClick={() => window.open('https://youtube.com/@DailyCashAlerts', '_blank')} className="bg-white/5 py-4 rounded-3xl flex items-center justify-center gap-2 text-[11px] border border-white/5 font-urdu hover:bg-white/10">
            <Youtube size={16} className="text-red-500" /> انٹرٹینمنٹ
          </button>
        </div>

        {/* 4. ڈیلی ٹاسک سیکشن */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-60 pr-2 font-urdu text-right">آپ کے ٹاسک (Daily Tasks)</h3>
          
          <div 
            onClick={() => isPackageActive ? navigate('/ads') : alert('پہلے پیکج ایکٹو کریں')}
            className={`p-5 rounded-[32px] border border-white/5 flex justify-between items-center transition-all ${isPackageActive ? 'bg-white/5 border-yellow-500/20 shadow-lg' : 'bg-black/30 opacity-60'}`}
          >
            <div className="flex items-center gap-4">
               <div className={`p-3 rounded-2xl ${isPackageActive ? 'bg-yellow-600/20 text-yellow-500' : 'bg-white/5'}`}>
                 {isPackageActive ? <PlayCircle size={22} /> : <Lock size={22} />}
               </div>
               <div className="text-left">
                 <p className="font-bold text-sm font-urdu">روزانہ اشتہارات</p>
                 <p className="text-[9px] opacity-40">ایڈز دیکھیں اور ڈالر کمائیں</p>
               </div>
            </div>
            {isPackageActive ? (
              <div className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 size={12} /> Done
              </div>
            ) : (
              <span className="text-[10px] font-bold opacity-40">Locked</span>
            )}
          </div>
        </div>

        {/* 5. سٹیٹس گریڈ */}
        <div className="grid grid-cols-2 gap-4 text-right">
          <div className="bg-black/20 p-5 rounded-[35px] border border-white/5">
            <TrendingUp size={20} className="text-yellow-500 mb-2 mr-auto" />
            <p className="text-[10px] opacity-40 font-urdu">ٹیم سائز</p>
            <p className="font-black text-xl">{userData.team_size}</p>
          </div>
          <div className="bg-black/20 p-5 rounded-[35px] border border-white/5">
            <Award size={20} className="text-blue-400 mb-2 mr-auto" />
            <p className="text-[10px] opacity-40 font-urdu">ٹوٹل ارننگ</p>
            <p className="font-black text-xl">${userData.total_earned.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
