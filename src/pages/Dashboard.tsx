import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Send, MessageCircle, Gift, Tv, PlayCircle, Share2, Home, MessageSquare, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  // بیلنس اب $0.00 سے شروع ہوگا
  const [balance, setBalance] = useState(0.00);
  const pkrRate = 300;
  
  // ایڈز کی صورتحال (پہلے سے Done نہیں ہوگا)
  const [adsDone, setAdsDone] = useState(false);

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
        <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest">Total Balance (Kul Raqam)</p>
        <h1 className="text-6xl font-black text-yellow-500 mb-2">${balance.toFixed(2)}</h1>
        <p className="text-sm text-green-400 font-medium">≈ PKR {(balance * pkrRate).toFixed(1)} Today</p>
        
        <div className="flex gap-4 mt-8">
          <button className="flex-1 bg-yellow-500 text-[#042f24] py-4 rounded-2xl font-black shadow-lg">DEPOSIT</button>
          <button className="flex-1 bg-white/5 py-4 rounded-2xl font-bold border border-white/10">WITHDRAW</button>
        </div>
      </div>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <button className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-green-500/20 p-3 rounded-2xl text-green-500"><Send size={24} /></div>
          <span className="text-xs font-bold uppercase">Channel</span>
        </button>
        {/* واٹس ایپ کی جگہ ٹیلی گرام */}
        <button 
          onClick={() => window.location.href = 'https://t.me/mranjum143'}
          className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl"
        >
          <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-500"><MessageCircle size={24} /></div>
          <span className="text-xs font-bold uppercase">Telegram</span>
        </button>
        <button className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-yellow-500/20 p-3 rounded-2xl text-yellow-500"><Gift size={24} /></div>
          <span className="text-xs font-bold uppercase">Promos</span>
        </button>
        <button className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl">
          <div className="bg-pink-500/20 p-3 rounded-2xl text-pink-500"><Tv size={24} /></div>
          <span className="text-xs font-bold uppercase">Movies</span>
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

      {/* Bottom Navigation (لائن ہٹا دی گئی ہے) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#042f24]/90 backdrop-blur-xl p-4 flex justify-around items-center">
        <button className="text-yellow-500"><Home size={24} /><p className="text-[10px] mt-1 font-bold">HOME</p></button>
        <button onClick={() => navigate('/ads')} className="text-gray-500"><PlayCircle size={24} /><p className="text-[10px] mt-1">WATCH</p></button>
        
        {/* Share Center Button */}
        <div className="relative -top-8">
          <button className="bg-gradient-to-tr from-purple-600 to-blue-500 p-5 rounded-full shadow-2xl border-4 border-[#042f24] transform transition-transform active:scale-90">
            <Share2 size={28} />
          </button>
        </div>

        <button className="text-gray-500"><MessageSquare size={24} /><p className="text-[10px] mt-1">CHAT</p></button>
        <button onClick={() => navigate('/profile')} className="text-gray-500"><UserCircle size={24} /><p className="text-[10px] mt-1">PROFILE</p></button>
      </div>
    </div>
  );
};

export default Dashboard;
