import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, UserCircle, Wallet, Globe, MessageSquare, Gift, Tv, PlayCircle, Home, Video, Users, Share2, MessageCircle, ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#002b1b] text-white font-sans pb-32">
      {/* گولڈ پلس ہیڈر */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-[#002b1b]/95 backdrop-blur-md border-b border-yellow-500/10">
        <div className="flex items-center gap-3 bg-white/5 p-2 pr-4 rounded-2xl border border-yellow-500/20 shadow-lg">
          <div className="bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-xl shadow-inner text-black">
            <span className="font-bold text-xs">GP</span>
          </div>
          <span className="font-black text-sm tracking-tighter italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 relative shadow-sm">
            <Bell size={20} className="text-white/80" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#002b1b]"></span>
          </div>
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-sm">
            <UserCircle size={20} className="text-white/80" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* بیلنس کارڈ - گولڈ اور گرین تھیم */}
        <div className="bg-gradient-to-br from-[#0a4d34] to-[#002b1b] p-7 rounded-[40px] border border-yellow-500/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-all"></div>
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] opacity-50 uppercase font-bold tracking-widest text-yellow-200">Total Balance (Kul Raqam)</p>
            <div className="bg-green-500/20 text-green-400 text-[9px] px-2.5 py-1 rounded-full font-black border border-green-500/20">
              ↗ +$0.21 TODAY
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-black tracking-tighter text-yellow-500 drop-shadow-md">$1.07</h2>
            <p className="text-[10px] opacity-30 font-medium">≈ PKR 299.6</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button onClick={() => navigate('/plans')} className="bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-3xl font-black text-[11px] flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
              DEPOSIT
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/5 hover:bg-white/10 text-white py-4 rounded-3xl font-black text-[11px] flex items-center justify-center gap-2 border border-white/10 shadow-lg active:scale-95 transition-all">
              WITHDRAW
            </button>
          </div>
        </div>

        {/* کوئیک ایکشنز گرڈ */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1e2a2c] p-4 rounded-[28px] border border-white/5 flex items-center gap-3 shadow-md active:scale-95 transition-all cursor-pointer">
            <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400 shadow-inner"><Globe size={18}/></div>
            <span className="text-[10px] font-black uppercase tracking-tight">Channel</span>
          </div>
          <div className="bg-[#261e38] p-4 rounded-[28px] border border-white/5 flex items-center gap-3 shadow-md active:scale-95 transition-all cursor-pointer">
            <div className="bg-purple-500/20 p-2.5 rounded-xl text-purple-400 shadow-inner"><MessageSquare size={18}/></div>
            <span className="text-[10px] font-black uppercase tracking-tight">WhatsApp</span>
          </div>
          <div className="bg-[#312a1e] p-4 rounded-[28px] border border-white/5 flex items-center gap-3 shadow-md active:scale-95 transition-all cursor-pointer">
            <div className="bg-yellow-500/20 p-2.5 rounded-xl text-yellow-400 shadow-inner"><Gift size={18}/></div>
            <span className="text-[10px] font-black uppercase tracking-tight">Promos</span>
          </div>
          <div className="bg-[#311e28] p-4 rounded-[28px] border border-white/5 flex items-center gap-3 shadow-md active:scale-95 transition-all cursor-pointer">
            <div className="bg-pink-500/20 p-2.5 rounded-xl text-pink-400 shadow-inner"><Tv size={18}/></div>
            <span className="text-[10px] font-black uppercase tracking-tight">Movies</span>
          </div>
        </div>

        {/* واچ ایڈز سیکشن */}
        <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[30px] border border-white/5 flex items-center justify-between shadow-lg group cursor-pointer active:scale-98 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/20 p-3.5 rounded-full text-green-400 border border-green-500/10 shadow-inner group-hover:scale-110 transition-transform">
              <PlayCircle size={22} />
            </div>
            <div>
              <p className="font-black text-[11px] uppercase tracking-wider text-white/90">Daily Ads</p>
              <p className="text-[9px] opacity-40 font-medium">Earn rewards daily</p>
            </div>
          </div>
          <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl text-[9px] font-black border border-green-500/30 shadow-sm">
            DONE
          </div>
        </div>
      </div>

      {/* باٹم نیویگیشن */}
      <div className="fixed bottom-6 left-5 right-5 bg-[#001f14]/95 backdrop-blur-2xl border border-white/10 p-3 flex justify-around items-center z-50 rounded-[32px] shadow-2xl">
        <div className="bg-yellow-500/20 p-3 rounded-2xl text-yellow-500 flex flex-col items-center gap-1 shadow-inner min-w-[65px] border border-yellow-500/20">
          <Home size={20} /> <span className="text-[9px] font-black uppercase">Home</span>
        </div>
        <div className="opacity-30 flex flex-col items-center gap-1" onClick={() => navigate('/ads')}>
          <Video size={20} /> <span className="text-[9px] font-bold">Watch</span>
        </div>
        <div className="opacity-30 flex flex-col items-center gap-1" onClick={() => navigate('/invite')}>
          <Users size={20} /> <span className="text-[9px] font-bold">Invite</span>
        </div>
        <div className="opacity-30 flex flex-col items-center gap-1" onClick={() => navigate('/profile')}>
          <UserCircle size={20} /> <span className="text-[9px] font-bold">Me</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
