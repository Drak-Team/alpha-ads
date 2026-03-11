import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, UserCircle, Wallet, Globe, MessageSquare, Gift, Tv, PlayCircle, Home, Video, Users, MessageCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1a1625] text-white font-sans pb-32">
      {/* ہیڈر - ڈیزائن کے مطابق */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[#1a1625]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <Wallet size={18} className="text-purple-400" />
          <span className="font-bold text-sm">Nisbat X</span>
        </div>
        <div className="flex gap-2">
          <Bell size={20} className="opacity-60" />
          <UserCircle size={20} className="opacity-60" />
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* بیلنس کارڈ */}
        <div className="bg-gradient-to-br from-[#2d2445] to-[#1c1829] p-6 rounded-[30px] border border-white/10">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs opacity-50 uppercase tracking-wider">Total Balance</p>
            <span className="text-green-400 text-[10px] font-bold">↗ +$0.21 today</span>
          </div>
          <h2 className="text-4xl font-black">$1.07</h2>
          <p className="text-[10px] opacity-30">≈ PKR 299.6</p>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button onClick={() => navigate('/plans')} className="bg-[#242d3c] py-3.5 rounded-2xl font-bold text-xs border border-white/5 flex items-center justify-center gap-2">
              <span className="bg-green-500/20 text-green-400 p-1 rounded-full text-[8px]">↓</span> DEPOSIT
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-[#3d2433] py-3.5 rounded-2xl font-bold text-xs border border-white/5 flex items-center justify-center gap-2">
              <span className="bg-red-500/20 text-red-400 p-1 rounded-full text-[8px]">↑</span> WITHDRAW
            </button>
          </div>
        </div>

        {/* کوئیک بٹنز - آپ کی فوٹو کے مطابق */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <Globe size={18} className="text-green-400" />
            <span className="text-[11px] font-bold">Follow Channel</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <MessageSquare size={18} className="text-purple-400" />
            <span className="text-[11px] font-bold">Contact WhatsApp</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <Gift size={18} className="text-yellow-400" />
            <span className="text-[11px] font-bold">Promo Codes</span>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
            <Tv size={18} className="text-pink-400" />
            <span className="text-[11px] font-bold">Entertainment</span>
          </div>
        </div>

        {/* ڈیلی ایڈز ٹاسک */}
        <div className="bg-white/5 p-5 rounded-[25px] border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PlayCircle size={22} className="text-green-400" />
            <div>
              <p className="font-bold text-xs uppercase tracking-tight">Daily Ads</p>
              <p className="text-[10px] opacity-40 italic">All ads watched! Come back tomorrow</p>
            </div>
          </div>
          <div className="bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg text-[10px] font-black border border-green-500/20">DONE</div>
        </div>
      </div>

      {/* باٹم نیویگیشن - 5 آئیکنز */}
      <div className="fixed bottom-6 left-4 right-4 bg-[#211d2e]/95 backdrop-blur-xl border border-white/10 p-4 flex justify-around items-center z-50 rounded-[25px] shadow-2xl">
        <Home size={20} className="text-purple-400" />
        <Video size={20} className="opacity-30" />
        <div className="bg-purple-600 p-3.5 rounded-full -mt-12 shadow-lg border-4 border-[#1a1625]">
           <Share2 size={22} />
        </div>
        <MessageCircle size={20} className="opacity-30" />
        <UserCircle size={20} className="opacity-30" />
      </div>
    </div>
  );
};

export default Dashboard;
