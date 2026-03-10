import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, ArrowDownCircle, ArrowUpCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- آپ کی پسندیدہ 2 تصاویر (اب یہ ہر حال میں شو ہوں گی) ---
  const promoImages = [
    "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?q=80&w=800&auto=format&fit=crop", // Pic 1: Investment & Rewards Style
    "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop"  // Pic 2: Fast Cash & Growth Style
  ];

  // خودکار سلائیڈر لاجک
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32 text-right">
      {/* 1. پروفیشنل گولڈ پلس ہیڈر */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-40 bg-[#022c22]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-xl text-[#022c22] font-black shadow-[0_0_15px_rgba(202,138,4,0.3)]">GP</div>
          <span className="font-black text-xl italic text-yellow-500 tracking-tighter">GOLD PLUS</span>
        </div>
        <div className="flex gap-2.5">
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner"><Bell size={20} /></div>
          <div className="bg-white/5 p-2.5 rounded-full border border-white/10 shadow-inner"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-7">
        {/* --- مین ایڈورٹائزنگ فریم (بغیر کسی غلطی کے) --- */}
        <div className="bg-black/40 rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl group">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Promo"
            className="w-full h-full object-cover transition-all duration-1000 scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/800x450/065f46/FFFFFF?text=Gold+Plus+Official+Ad";
            }}
          />
          {/* کمپنی برانڈنگ اوورلے */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent p-6 flex flex-col justify-end">
             <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] text-black font-black shadow-lg">GP</div>
                <p className="text-yellow-500 font-black text-[10px] tracking-widest uppercase italic">Verified Platform</p>
             </div>
             <h3 className="text-lg font-urdu font-bold leading-tight">گولڈ پلس: اشتہارات دیکھیں اور انعامات پائیں!</h3>
             <p className="text-[9px] opacity-70 font-urdu mt-1">پاکستان کا سب سے تیز ترین ڈپازٹ اور ودڈرا سسٹم</p>
          </div>
          
          {/* سلائیڈر انڈیکیٹرز */}
          <div className="absolute top-5 left-6 flex gap-1.5">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1 rounded-full transition-all duration-500 ${currentImageIndex === index ? 'bg-yellow-500 w-7' : 'bg-white/20 w-2'}`} />
            ))}
          </div>
        </div>

        {/* 2. ڈالر بیلنس کارڈ (آپ کے ڈیزائن جیسا) */}
        <div className="bg-gradient-to-br from-[#064e3b] to-[#022c22] p-8 rounded-[45px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <div className="flex justify-between items-start mb-2">
             <div className="bg-green-500/20 text-green-400 text-[9px] px-2.5 py-1 rounded-full font-bold border border-green-400/10">+$0.21 Today</div>
             <p className="text-[10px] opacity-50 font-urdu">کل رقم (Total Balance)</p>
          </div>
          <div className="flex items-baseline justify-end gap-1">
             <span className="text-xl font-bold text-yellow-500/50 mb-1">$</span>
             <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all">DEPOSIT</button>
            <button className="bg-white/5 py-4 rounded-2xl font-bold text-xs border border-white/10 active:scale-95 transition-all">WITHDRAW</button>
          </div>
        </div>

        {/* 3. واچ ایڈز سیکشن (ہائی لائٹڈ) */}
        <div className="space-y-4">
          <p className="text-[10px] font-bold opacity-30 pr-3 uppercase tracking-[0.2em] text-right">Main Tasks</p>
          <div onClick={() => navigate('/ads')} className="bg-white/5 p-5 rounded-[35px] border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all cursor-pointer shadow-xl group">
            <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black shadow-lg">START</div>
            <div className="flex items-center gap-4">
               <div className="text-right font-urdu">
                 <p className="font-bold text-sm group-hover:text-yellow-500 transition-colors">روزانہ اشتہارات دیکھیں</p>
                 <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
               </div>
               <div className="bg-yellow-600/20 p-4 rounded-[24px] text-yellow-500 border border-yellow-500/20 shadow-inner group-hover:scale-110 transition-transform"><PlayCircle size={24} /></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. باٹم نیویگیشن (پریمیم لک) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22]/95 backdrop-blur-xl border-t border-white/5 p-5 flex justify-around items-center z-50 rounded-t-[35px]">
        <Home className="text-yellow-500" size={24} />
        <Video className="text-white/30" size={24} />
        <div className="bg-yellow-600 p-4 rounded-full -mt-16 shadow-[0_15px_35px_rgba(202,138,4,0.4)] border-4 border-[#022c22] active:scale-90 transition-all cursor-pointer">
          <Share2 size={24} className="text-[#022c22]" />
        </div>
        <MessageCircle className="text-white/30" size={24} />
        <UserCircle className="text-white/30" size={24} />
      </div>
    </div>
  );
};

export default Dashboard;
          
