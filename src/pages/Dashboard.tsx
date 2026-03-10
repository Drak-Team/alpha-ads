import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Users, MessageCircle, PlayCircle, ArrowDownCircle, ArrowUpCircle, Home, Video, UserCircle, Share2
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- آپ کی وہ 2 تصاویر جو آپ کو پسند آئی تھیں ---
  const promoImages = [
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/placeholder.svg", // Pic 1: Claim Rs 1,000 (لڑکی والی)
    "https://0688634c-1a2f-43f3-9c32-d3ec4b7228a2.lovableproject.com/placeholder.svg"  // Pic 2: Fast Deposit/Withdraw (لڑکا/لڑکی والی)
  ];

  // ہر 4 سیکنڈ بعد تصویر تبدیل ہوگی
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#022c22] text-white font-sans pb-32 RTL text-right">
      {/* ہیڈر */}
      <div className="flex items-center justify-between p-4 sticky top-0 z-30 bg-[#022c22]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-600 p-2 rounded-lg text-[#022c22] font-black">GP</div>
          <span className="font-black text-lg italic text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-2">
          <div className="bg-white/10 p-2 rounded-full border border-white/10"><Bell size={20} /></div>
          <div className="bg-white/10 p-2 rounded-full border border-white/10"><Users size={20} /></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* --- ایڈورٹائزنگ سلائیڈر (اب دونوں تصاویر شو ہوں گی) --- */}
        <div className="bg-black/40 rounded-[35px] border border-yellow-500/20 relative overflow-hidden aspect-video shadow-2xl">
          <img 
            key={currentImageIndex}
            src={promoImages[currentImageIndex]} 
            alt="Gold Plus Official Ad"
            className="w-full h-full object-cover transition-all duration-1000 animate-fade-in"
          />
          {/* برانڈنگ اوورلے */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-[8px] text-black font-bold">GP</div>
                <span className="text-yellow-500 font-black text-[10px] tracking-widest uppercase">Official Ad</span>
             </div>
             <p className="text-sm font-urdu font-bold">گولڈ پلس کے ساتھ اپنی آمدنی بڑھائیں!</p>
          </div>
          
          {/* نیویگیشن ڈاٹس */}
          <div className="absolute top-4 left-6 flex gap-1.5">
            {promoImages.map((_, index) => (
              <div key={index} className={`h-1.5 rounded-full transition-all ${currentImageIndex === index ? 'bg-yellow-500 w-6' : 'bg-white/30 w-1.5'}`} />
            ))}
          </div>
        </div>

        {/* بیلنس کارڈ */}
        <div className="bg-[#064e3b] p-8 rounded-[45px] shadow-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] opacity-60 mb-2 font-urdu text-left">Total Balance (Kul Raqam)</p>
          <div className="flex items-center justify-between">
             <div className="bg-green-500/20 text-green-400 text-[9px] px-2 py-1 rounded-full font-bold border border-green-400/20">+$0.21 today</div>
             <h2 className="text-5xl font-black text-yellow-500 tracking-tighter">$0.00</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button className="bg-yellow-600 text-[#022c22] py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform uppercase">Deposit</button>
            <button className="bg-white/5 py-4 rounded-2xl font-bold text-sm border border-white/10 active:scale-95 transition-transform uppercase">Withdraw</button>
          </div>
        </div>

        {/* ڈیلی ایڈز ٹاسک */}
        <div className="bg-white/5 p-6 rounded-[35px] border border-white/5 flex justify-between items-center hover:bg-white/10 transition-all cursor-pointer">
          <div className="bg-yellow-600 text-[#022c22] px-5 py-2 rounded-full text-[11px] font-black uppercase">Start</div>
          <div className="flex items-center gap-4">
             <div className="text-right">
               <p className="font-bold text-sm font-urdu">روزانہ اشتہارات</p>
               <p className="text-[10px] opacity-40">Ads Watch & Rewards</p>
             </div>
             <div className="bg-yellow-600/20 p-3 rounded-2xl text-yellow-500"><PlayCircle size={24} /></div>
          </div>
        </div>
      </div>

      {/* باٹم مینو */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#022c22]/95 backdrop-blur-md border-t border-white/5 p-4 flex justify-around items-center z-50">
        <Home className="text-yellow-500" size={24} />
        <Video className="text-white/40" size={24} />
        <div className="bg-yellow-600 p-4 rounded-full -mt-14 shadow-[0_10px_30px_rgba(202,138,4,0.4)] border-4 border-[#022c22] active:scale-90 transition-transform">
          <Share2 size={24} className="text-[#022c22]" />
        </div>
        <MessageCircle className="text-white/40" size={24} />
        <UserCircle className="text-white/40" size={24} />
      </div>
    </div>
  );
};

export default Dashboard;
