import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const Ads = () => {
  const navigate = useNavigate();
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeAdIndex, setActiveAdIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completedAds, setCompletedAds] = useState<number[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // آپ کے فراہم کردہ 6 لنکس
  const adLinks = [
    "https://www.effectivegatecpm.com/zgqrwada?key=9398177c3e5719a4d92526978565df4f",
    "https://www.effectivegatecpm.com/i2kk2sh9p?key=0453abf78838a9e889f8225e5e719943",
    "https://www.effectivegatecpm.com/w9gj2bm4a?key=3dee557eefdf22584fec7a09910e43bf",
    "https://www.effectivegatecpm.com/e1v0euzy?key=a4bc97d2a3a2976a1cd6f5a566c17fa6",
    "https://www.effectivegatecpm.com/r8r8rcj6?key=9d844f87c9ad3fc866a5aeb97591b05d",
    "https://www.effectivegatecpm.com/wssfc48uq4?key=9211d49ffb62d81b1dacdf5fbe341eff"
  ];

  useEffect(() => {
    const checkPackage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('deposits')
          .select('status')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .maybeSingle();
        
        if (data) setHasActivePackage(true);
      }
      setLoading(false);
    };
    checkPackage();
  }, []);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (activeAdIndex !== null) {
        setCompletedAds([...completedAds, activeAdIndex]);
      }
      setActiveAdIndex(null);
      alert("ایڈ مکمل ہو گیا! آپ کے اکاؤنٹ میں رقم جمع کر دی گئی ہے۔");
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, activeAdIndex, completedAds]);

  if (loading) return <div className="min-h-screen bg-[#064e3b] flex items-center justify-center text-white font-urdu">چیک کیا جا رہا ہے...</div>;

  if (!hasActivePackage) {
    return (
      <div className="min-h-screen bg-[#064e3b] text-white p-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <div className="bg-orange-500/20 p-5 rounded-full inline-block mb-6 text-orange-500 animate-pulse">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-black mb-4 font-urdu text-yellow-500">ارننگ شروع کریں! 🚀</h2>
          <p className="text-sm opacity-80 mb-8 font-urdu leading-relaxed">
            اشتہارات دیکھ کر پیسے کمانے کے لیے اپنا پسندیدہ <span className="text-yellow-500 font-bold">پیکج ایکٹو</span> کریں۔ روزانہ 6 ایڈز دیکھیں اور فوراً ودھرا لیں۔
          </p>
          <button 
            onClick={() => navigate('/plans')}
            className="w-full bg-yellow-600 hover:bg-yellow-700 py-4 rounded-2xl font-bold font-urdu shadow-lg transition-transform active:scale-95"
          >
            پلانز دیکھیں اور ارننگ شروع کریں
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-yellow-500">روزانہ کے ٹاسک ({completedAds.length}/6)</h2>
        <div className="w-10"></div>
      </div>

      <div className="grid gap-4">
        {adLinks.map((link, index) => {
          const isCompleted = completedAds.includes(index);
          const isLocked = index > completedAds.length;

          return (
            <div key={index} className={`p-5 rounded-[30px] border flex justify-between items-center transition-all ${isCompleted ? 'bg-green-600/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
              {isCompleted ? (
                <CheckCircle2 className="text-green-500" />
              ) : isLocked ? (
                <Lock size={18} className="text-gray-500" />
              ) : (
                <button 
                  onClick={() => { setActiveAdIndex(index); setTimeLeft(30); setIsTimerRunning(true); }} 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-xl text-xs font-bold shadow-md"
                >
                  Watch
                </button>
              )}
              <div className="text-right">
                <p className={`font-bold text-sm ${isLocked ? 'text-gray-500' : 'text-white'}`}>ایڈ نمبر {index + 1}</p>
                {isLocked && <p className="text-[10px] text-gray-500 font-urdu">پہلے پچھلا ایڈ دیکھیں</p>}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* فل سکرین ایڈ اور ٹائمر */}
      {activeAdIndex !== null && (
        <div className="fixed inset-0 bg-black z-[999] flex flex-col">
           <div className="bg-red-600 text-white p-4 flex justify-between items-center font-bold">
              <span className="font-urdu">ایڈ چل رہا ہے...</span>
              <span className="text-2xl font-black">{timeLeft}s</span>
           </div>
           <iframe 
             src={adLinks[activeAdIndex]} 
             className="flex-1 w-full border-none pointer-events-none" 
             title="Advertisement"
           />
           <div className="p-4 bg-black text-center text-xs text-gray-500 font-urdu">
             پیسے کمانے کے لیے 30 سیکنڈ مکمل ہونے کا انتظار کریں
           </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
