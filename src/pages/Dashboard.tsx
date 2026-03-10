import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // آپ کی بھیجی ہوئی 3 اصلی تصاویر کے لنکس
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
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32 text-right">
      {/* 1. ہیڈر (آئیکنز کے ساتھ جو غائب ہو گئے تھے) */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-[#022c22]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#022c22] font-black shadow-lg">GP</div>
          <span className="font-black text-xl italic text-yellow-500 tracking-tighter">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          {/* یہ وہ دو آئیکنز ہیں جو واپس آ گئے ہیں */}
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner cursor-pointer hover:bg-white/10">
            <Bell size={20} />
          </div>
          <div onClick={() => navigate('/profile')} className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner cursor-pointer hover:bg-white/10">
            <UserCircle size={20} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-7">
        {/* 2. مین ایڈورٹائزنگ سلائیڈر (صرف یہ 3 تصاویر شو ہوں گی) */}
        <div className="bg-black/40 rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Promo"
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent p-6 flex flex-col justify-end">
             <h3 className="text-lg font-urdu font-bold leading-tight">گولڈ پلس: اشتہارات دیکھیں اور انعامات پائیں!</h3>
          </div>
          
          {/* سلائیڈر ڈاٹس */}
          <div className="absolute top-5 left-6 flex gap-1.5">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1 rounded-full transition-all duration-500 ${currentImageIndex === index ? 'bg-yellow-500 w-7' : 'bg-white/20 w-2'}`} />
            ))}
          </div>
        </div>

        {/* 3. ڈالر بیلنس کارڈ (بٹنز کے ساتھ) */}
        <div className="bg-[#064e3b] p-8 rounded-[45px] shadow-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start mb-2">
             <div className="bg-green-500/20 text-green-400 text-[9px] px-2.5 py-1 rounded-full font-bold">+$0.21 Today</div>
             <p className="text-[10px] opacity-50 font-urdu">کل رقم (Total Balance)</p>
          </div>
          <div className="flex items-baseline justify-end gap-1">
             <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button onClick={() => navigate('/plans')} className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all">DEPOSIT</button>
            <button onClick={() => navigate('/withdraw')} className="bg-white/5 py-4 rounded-2xl font-bold text-xs border border-white/10 active:scale-95 transition-all">WITHDRAW</button>
          </div>
        </div>

        {/* 4. واچ ایڈز ٹاسک */}
        <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[35px] border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-all">
          <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black shadow-lg">START</div>
          <div className="flex items-center gap-4">
             <div className="text-right font-urdu">
               <p className="font-bold text-sm">روزانہ اشتہارات دیکھیں</p>
               <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
             </div>
             <div className="bg-yellow-600/20 p-4 rounded-[24px] text-yellow-500 border border-yellow-500/20"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* 5. باٹم نیویگیشن (5 بٹنز کے ساتھ) */}
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
    
