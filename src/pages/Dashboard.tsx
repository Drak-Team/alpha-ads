import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, ArrowDownCircle, ArrowUpCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // یہ لائن بٹنز کو چلانے کے لیے ضروری ہے
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const promoImages = [
    "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32 text-right">
      {/* ہیڈر */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-[#022c22]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#022c22] font-black shadow-lg">GP</div>
          <span className="font-black text-xl italic text-yellow-500 tracking-tighter">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10"><Bell size={20} /></div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2.5 rounded-full border border-white/10 cursor-pointer"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-7">
        {/* ایڈورٹائزنگ فریم */}
        <div className="bg-black/40 rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Promo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent p-6 flex flex-col justify-end">
             <h3 className="text-lg font-urdu font-bold leading-tight">گولڈ پلس: اشتہارات دیکھیں اور انعامات پائیں!</h3>
          </div>
        </div>

        {/* بیلنس کارڈ (بٹنز کے ساتھ) */}
        <div className="bg-gradient-to-br from-[#064e3b] to-[#022c22] p-8 rounded-[45px] shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
             <div className="bg-green-500/20 text-green-400 text-[9px] px-2.5 py-1 rounded-full font-bold border border-green-400/10">+$0.21 Today</div>
             <p className="text-[10px] opacity-50 font-urdu">کل رقم (Total Balance)</p>
          </div>
          <div className="flex items-baseline justify-end gap-1">
             <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* اب یہ بٹن کام کریں گے */}
            <button 
              onClick={() => navigate('/plans')} 
              className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              DEPOSIT
            </button>
            <button 
              onClick={() => navigate('/withdraw')} 
              className="bg-white/5 py-4 rounded-2xl font-bold text-xs border border-white/10 active:scale-95 transition-all cursor-pointer"
            >
              WITHDRAW
            </button>
          </div>
        </div>

        {/* ڈیلی ایڈز ٹاسک */}
        <div 
          onClick={() => navigate('/ads')} 
          className="bg-white/5 p-5 rounded-[35px] border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all cursor-pointer shadow-xl"
        >
          <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black shadow-lg">START</div>
          <div className="flex items-center gap-4">
             <div className="text-right font-urdu">
               <p className="font-bold text-sm">روزانہ اشتہارات دیکھیں</p>
               <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
             </div>
             <div className="bg-yellow-600/20 p-4 rounded-[24px] text-yellow-500"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* باٹم نیویگیشن */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22]/95 backdrop-blur-xl border-t border-white/5 p-5 flex justify-around items-center z-50 rounded-t-[35px]">
        <Home onClick={() => navigate('/dashboard')} className="text-yellow-500 cursor-pointer" size={24} />
        <Video onClick={() => navigate('/ads')} className="text-white/30 cursor-pointer" size={24} />
        <div onClick={() => navigate('/invite')} className="bg-yellow-600 p-4 rounded-full -mt-16 shadow-lg border-4 border-[#022c22] active:scale-90 cursor-pointer">
          <Share2 size={24} className="text-[#022c22]" />
        </div>
        <MessageCircle onClick={() => navigate('/chat')} className="text-white/30 cursor-pointer" size={24} />
        <UserCircle onClick={() => navigate('/profile')} className="text-white/30 cursor-pointer" size={24} />
      </div>
    </div>
  );
};

export default Dashboard;
