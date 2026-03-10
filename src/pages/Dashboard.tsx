import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, ArrowDownCircle, ArrowUpCircle, Home, Video, ChatBubbleLeft, UserCircle
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// --- لنکس کو اپ ڈیٹ کر دیا گیا ہے تاکہ یہ ہر حال میں شو ہوں ---
const promoImages = [
  "https://images.unsplash.com/photo-1611974717537-48358ad772bc?auto=format&fit=crop&q=80&w=800", // ایڈ 1
  "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800"  // ایڈ 2
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ balance: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // خودکار تصویر بدلنے کا ٹائمر
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-24 RTL text-right">
      {/* 1. ہیڈر (آپ کے ڈیزائن کے مطابق) */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-30 bg-[#022c22]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-lg text-[#022c22] font-bold">GP</div>
          <span className="font-black text-lg italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/10 p-2 rounded-full"><Bell size={20} /></div>
          <div className="bg-white/10 p-2 rounded-full"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* --- ایڈورٹائزنگ فریم (جو اب شو ہوگا) --- */}
        <div className="bg-white/5 rounded-[30px] border border-white/10 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Ad"
            className="w-full h-full object-cover transition-opacity duration-1000"
            onError={(e) => {
              // اگر تصویر لوڈ نہ ہو تو یہ بیک اپ رنگ دکھائے گا
              e.currentTarget.src = "https://via.placeholder.com/800x450/065f46/FFFFFF?text=Gold+Plus+Ads+Loading...";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
             <p className="text-yellow-500 font-bold text-xs uppercase tracking-widest">Official Promotion</p>
             <p className="text-sm font-urdu leading-tight">دنیا کو دکھا دو - گولڈ پلس کے ساتھ کمائیں!</p>
          </div>
        </div>

        {/* 2. بیلنس کارڈ (آپ کے سکرین شاٹ جیسا) */}
        <div className="bg-[#064e3b] p-8 rounded-[40px] shadow-2xl border border-white/5 relative overflow-hidden">
          <p className="text-[10px] opacity-60 mb-2 font-urdu text-left">Total Balance (Kul Raqam)</p>
          <div className="flex items-center justify-between">
             <div className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full font-bold">+$0.21 today</div>
             <h2 className="text-5xl font-black text-yellow-500">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-sm shadow-lg">Deposit</button>
            <button className="bg-white/5 py-4 rounded-2xl font-bold text-sm border border-white/10">Withdraw</button>
          </div>
        </div>

        {/* 3. واچ ایڈز سیکشن */}
        <div className="bg-white/5 p-6 rounded-[35px] border border-white/5 flex justify-between items-center group">
          <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black">START</div>
          <div className="flex items-center gap-4">
             <div className="text-right">
               <p className="font-bold text-sm font-urdu">روزانہ اشتہارات</p>
               <p className="text-[10px] opacity-40">Watch Ads & Earn Rewards</p>
             </div>
             <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* 4. باٹم نیویگیشن (سکرین شاٹ کے مطابق) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22] border-t border-white/5 p-4 flex justify-around items-center z-50">
        <Home className="text-yellow-500" size={24} />
        <Video className="text-white/40" size={24} />
        <div className="bg-yellow-600 p-3 rounded-full -mt-12 shadow-2xl border-4 border-[#022c22]"><Users size={24} className="text-[#022c22]" /></div>
        <MessageCircle className="text-white/40" size={24} />
        <UserCircle className="text-white/40" size={24} />
      </div>
    </div>
  );
};

export default Dashboard;
