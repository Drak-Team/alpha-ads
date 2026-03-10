import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- آپ کی بھیجی ہوئی تصاویر کے اصلی لنکس ---
  // (اگر یہ تصاویر ابھی شو نہ ہوں تو پریشان نہ ہوں، کوڈ میں 'key' لگی ہے، وہ جیسے ہی لوڈ ہوں گی نظر آ جائیں گی)
  const promoImages = [
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/attached_assets/1773103206937.jpg", // لڑکی Claim Rs 1,000 والی
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/attached_assets/1773103192611.jpg" // گولڈ پلس پریمیم والی
  ];

  // ہر 4 سیکنڈ بعد تصویر تبدیل ہوگی
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32">
      {/* 1. پریمیم ہیڈر - اب بیل اور یوزر آئیکن واضح نظر آئیں گے */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-[#022c22]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-lg text-[#022c22] font-black shadow-lg">GP</div>
          <span className="font-black text-lg italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner">
            <Bell size={20} className="text-white/80" />
          </div>
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner">
            <Users size={20} className="text-white/80" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-7">
        {/* --- 2. تصاویر کا سلائیڈر (یہ اب خالی نہیں رہے گا) --- */}
        <div className="bg-black/40 rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex} // یہ 'key' تصویر کو لوڈ کرنے میں مدد دیتی ہے
            src={promoImages[currentImageIndex]} 
            alt="Promotion"
            className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
            onError={(e) => {
              // اگر لنک لوڈ نہ ہو تو یہ بیک اپ تصویر دکھائے گا
              e.currentTarget.src = "https://via.placeholder.com/800x450/065f46/FFFFFF?text=Gold+Plus+Official+Ad";
            }}
          />
          {/* اوورلے گرافکس */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
             <p className="text-yellow-500 font-black text-xs uppercase tracking-widest mb-1">Official Ad</p>
             <p className="text-sm font-urdu font-bold leading-tight">گولڈ پلس کے ساتھ گھر بیٹھے کمائیں!</p>
          </div>
        </div>

        {/* 3. ڈالر بیلنس کارڈ (بٹنز کے ساتھ) */}
        <div className="bg-gradient-to-br from-[#064e3b] to-[#022c22] p-8 rounded-[45px] shadow-2xl border border-white/5 relative group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] opacity-60 mb-2 font-urdu text-right">کل رقم (Kul Raqam)</p>
          <div className="flex items-center justify-between">
             <div className="bg-green-500/20 text-green-400 text-[9px] px-2.5 py-1 rounded-full font-bold border border-green-400/20">+$0.21 today</div>
             <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* یہ بٹنز کام کر رہے ہیں (Navigate کریں گے) */}
            <button onClick={() => navigate('/plans')} className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-yellow-500 transition-all active:scale-95 uppercase">
              Deposit
            </button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/5 py-4 rounded-2xl font-bold text-sm border border-white/10 hover:bg-white/10 transition-all active:scale-95 uppercase">
              Withdraw
            </button>
          </div>
        </div>

        {/* 4. ڈیلی ٹاسک کارڈ (ہائی لائٹڈ) */}
        <div className="bg-white/5 p-6 rounded-[35px] border border-white/5 flex justify-between items-center group cursor-pointer" onClick={() => navigate('/ads')}>
          <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black uppercase shadow-lg">START</div>
          <div className="flex items-center gap-4 text-right">
             <div>
               <p className="font-bold text-sm font-urdu">روزانہ اشتہارات دیکھیں</p>
               <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
             </div>
             <div className="bg-yellow-600/20 p-4 rounded-2xl text-yellow-500 border border-yellow-500/20 group-hover:scale-110 transition-transform"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* 5. پریمیم باٹم نیویگیشن (تمام 5 بٹنز کے ساتھ) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22]/95 border-t border-white/5 p-5 flex justify-around items-center z-50 rounded-t-[35px] backdrop-blur-md shadow-inner">
        <div className="flex flex-col items-center gap-1 text-yellow-500 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <Home size={22} /> <span className="text-[8px]">HOME</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-30 cursor-pointer" onClick={() => navigate('/ads')}>
          <Video size={22} /> <span className="text-[8px]">WATCH</span>
        </div>
        <div className="bg-yellow-600 p-4 rounded-full -mt-16 shadow-[0_15px_40px_rgba(202,138,4,0.4)] border-4 border-[#022c22] active:scale-90 transition-transform cursor-pointer" onClick={() => navigate('/invite')}>
          <Share2 size={24} className="text-black" />
        </div>
        <div className="flex flex-col items-center gap-1 opacity-30 cursor-pointer" onClick={() => navigate('/chat')}>
          <MessageCircle size={22} /> <span className="text-[8px]">CHAT</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-30 cursor-pointer" onClick={() => navigate('/profile')}>
          <UserCircle size={22} /> <span className="text-[8px]">PROFILE</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
                                                                                                                                                        
