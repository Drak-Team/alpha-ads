import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Send, MessageCircle, Gift, Tv, PlayCircle, Share2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const pkrRate = 300;
  const [adsDone, setAdsDone] = useState(false);
  const [displayName, setDisplayName] = useState("Investor");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('balance, display_name').eq('id', user.id).maybeSingle();
      if (data) {
        setBalance(data.balance || 0);
        setDisplayName(data.display_name || "Investor");
      }
      // Check if today's ads are done
      const today = new Date().toISOString().split('T')[0];
      const { data: adData } = await supabase.from('ad_watches').select('all_completed').eq('user_id', user.id).eq('watched_date', today).maybeSingle();
      if (adData?.all_completed) setAdsDone(true);
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#042f24] text-white font-sans pb-24">
      {/* Top Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 bg-[#1a3a32] p-2 rounded-2xl border border-yellow-500/30">
          <div className="bg-yellow-500 text-[#042f24] font-black p-2 rounded-xl text-xs">GP</div>
          <span className="italic font-bold text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-3">
          <button className="relative p-2 bg-[#1a3a32] rounded-full border border-white/10">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => navigate('/profile')} className="p-2 bg-[#1a3a32] rounded-full border border-white/10">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="mx-4 p-8 bg-gradient-to-br from-[#0a4d3c] to-[#042f24] rounded-[40px] border border-white/10 shadow-2xl text-center relative overflow-hidden">
        <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-widest">Welcome, {displayName}</p>
        <p className="text-gray-500 text-[10px] mb-3">Total Balance</p>
        <h1 className="text-6xl font-black text-yellow-500 mb-2">${balance.toFixed(2)}</h1>
        <p className="text-sm text-green-400 font-medium">≈ PKR {(balance * pkrRate).toFixed(0)}</p>
        
        <div className="flex gap-4 mt-8">
          <button onClick={() => navigate('/deposit')} className="flex-1 bg-yellow-500 text-[#042f24] py-4 rounded-2xl font-black shadow-lg">DEPOSIT</button>
          <button onClick={() => navigate('/withdraw')} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold border border-white/10">WITHDRAW</button>
        </div>
      </div>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <button onClick={() => navigate('/refer')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-green-500/20 p-3 rounded-2xl text-green-500"><Send size={24} /></div>
          <span className="text-xs font-bold uppercase">Refer</span>
        </button>
        <button 
          onClick={() => window.open('https://t.me/mranjum143', '_blank')}
          className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl"
        >
          <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-500"><MessageCircle size={24} /></div>
          <span className="text-xs font-bold uppercase">Telegram</span>
        </button>
        <button onClick={() => navigate('/plans')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-yellow-500/20 p-3 rounded-2xl text-yellow-500"><Gift size={24} /></div>
          <span className="text-xs font-bold uppercase">Plans</span>
        </button>
        <button onClick={() => navigate('/chat')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-pink-500/20 p-3 rounded-2xl text-pink-500"><Tv size={24} /></div>
          <span className="text-xs font-bold uppercase">Support</span>
        </button>
      </div>

      {/* Daily Task Section */}
      <div className="mx-4 mt-2 p-6 bg-[#1a3a32] rounded-[35px] border border-white/5 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-2xl text-green-500">
            <PlayCircle size={28} />
          </div>
          <div className="text-right">
            <h3 className="font-black text-lg">DAILY TASK</h3>
            <p className="text-[10px] text-gray-400">Earn rewards daily</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/ads')}
          className={`px-6 py-2 rounded-xl font-bold text-xs ${adsDone ? 'bg-green-600/20 text-green-500' : 'bg-green-600 text-white shadow-lg shadow-green-900/20'}`}
        >
          {adsDone ? 'DONE' : 'WATCH'}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
