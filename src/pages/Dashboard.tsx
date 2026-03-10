import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // آپ کی وہ 3 تصویریں جو آپ نے بھیجی تھیں
  const promoImages = [
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/attached_assets/1773103206937.jpg", 
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/attached_assets/1773103213797.jpg",
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/attached_assets/1773103192611.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32">
      {/* ہیڈر - بیل اور یوزر آئیکن کے ساتھ */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-[#022c22]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-lg text-black font-black">GP</div>
          <span className="font-black text-lg italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-3">
          <Bell size={22} className="text-white/80" />
          <Users size={22} className="text-white/80" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* سلائیڈر - 3 تصاویر */}
        <div className="rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            className="w-full h-full object-cover transition-opacity duration-1000"
            alt="Promotion"
          />
        </div>

        {/* بیلنس کارڈ - Deposit/Withdraw بٹن کے ساتھ */}
        <div className="bg-[#064e3b] p-8 rounded-[45px] shadow-2xl border border-white/5 relative">
          <div className="flex justify-between items-start">
            <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full">+$0.21 today</div>
            <p className="text-[10px] opacity-40 font-urdu text-right">کل رقم (Total Balance)</p>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* اب یہ بٹن آپ کو صحیح صفحات پر لے جائیں گے */}
            <button onClick={() => navigate('/plans')} className="bg-yellow-600 text-black py-4 rounded-2xl font-black text-sm">DEPOSIT</button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/5 py-4 rounded-2xl font-bold text-sm border border-white/10">WITHDRAW</button>
          </div>
        </div>

        {/* واچ ایڈز سیکشن */}
        <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[35px] border border-white/5 flex justify-between items-center cursor-pointer">
          <div className="bg-yellow-600 text-black px-6 py-2 rounded-full text-[11px] font-black uppercase">Start</div>
          <div className="flex items-center gap-4 text-right font-urdu">
            <div>
              <p className="font-bold text-sm">روزانہ اشتہارات دیکھیں</p>
              <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
            </div>
            <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* باٹم نیویگیشن - تمام 5 آئیکنز واپس */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22]/95 border-t border-white/5 p-4 flex justify-around items-center z-50">
        <div className="flex flex-col items-center gap-1 text-yellow-500 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Home size={22} /> <span className="text-[8px]">HOME</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer" onClick={() => navigate('/ads')}>
          <Video size={22} /> <span className="text-[8px]">WATCH</span>
        </div>
        <div className="bg-yellow-600 p-4 rounded-full -mt-14 shadow-xl border-4 border-[#022c22] cursor-pointer">
          <Share2 size={24} className="text-black" />
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer" onClick={() => navigate('/chat')}>
          <MessageCircle size={22} /> <span className="text-[8px]">CHAT</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-40 cursor-pointer" onClick={() => navigate('/profile')}>
          <UserCircle size={22} /> <span className="text-[8px]">PROFILE</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
          
