import React, { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';
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
      if (!user) { setLoading(false); return; }

      // Check for active subscription
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (sub) {
        setHasActivePackage(true);
      } else {
        // Fallback: check approved deposit
        const { data: dep } = await supabase
          .from('deposits')
          .select('id')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .maybeSingle();
        if (dep) setHasActivePackage(true);
      }

      // Load today's progress
      const today = new Date().toISOString().split('T')[0];
      const { data: adData } = await supabase
        .from('ad_watches')
        .select('ads_completed, all_completed')
        .eq('user_id', user.id)
        .eq('watched_date', today)
        .maybeSingle();

      if (adData) {
        const done = Array.from({ length: adData.ads_completed }, (_, i) => i);
        setCompletedAds(done);
      }

      setLoading(false);
    };
    checkPackage();
  }, []);

  useEffect(() => {
    let timer: any;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if (activeAdIndex !== null) {
        const newCompleted = [...completedAds, activeAdIndex];
        setCompletedAds(newCompleted);
        saveProgress(newCompleted.length);
      }
      setActiveAdIndex(null);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const saveProgress = async (count: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    const allDone = count >= 6;

    const { data: existing } = await supabase
      .from('ad_watches')
      .select('id')
      .eq('user_id', user.id)
      .eq('watched_date', today)
      .maybeSingle();

    if (existing) {
      await supabase.from('ad_watches').update({ ads_completed: count, all_completed: allDone }).eq('id', existing.id);
    } else {
      await supabase.from('ad_watches').insert({ user_id: user.id, watched_date: today, ads_completed: count, all_completed: allDone });
    }
  };

  if (loading) return <div className="min-h-screen bg-[#042f24] flex items-center justify-center text-white font-urdu">چیک کیا جا رہا ہے...</div>;

  if (!hasActivePackage) {
    return (
      <div className="min-h-screen bg-[#042f24] text-white p-6 flex flex-col items-center justify-center text-center pb-28">
        <div className="bg-[#1a3a32] p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <div className="bg-orange-500/20 p-5 rounded-full inline-block mb-6 text-orange-500 animate-pulse">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-black mb-4 font-urdu text-yellow-500">ارننگ شروع کریں! 🚀</h2>
          <p className="text-sm opacity-80 mb-8 font-urdu leading-relaxed">
            اشتہارات دیکھ کر پیسے کمانے کے لیے اپنا پسندیدہ <span className="text-yellow-500 font-bold">پیکج ایکٹو</span> کریں۔
          </p>
          <button 
            onClick={() => navigate('/plans')}
            className="w-full bg-yellow-500 text-[#042f24] py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-transform"
          >
            پلانز دیکھیں
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-4 pb-28">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/dashboard')} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black text-yellow-500">DAILY ADS ({completedAds.length}/6)</h2>
        <div className="w-10"></div>
      </div>

      <div className="grid gap-3">
        {adLinks.map((link, index) => {
          const isCompleted = completedAds.includes(index);
          const isLocked = index > completedAds.length;

          return (
            <div key={index} className={`p-4 rounded-[24px] border flex justify-between items-center transition-all ${isCompleted ? 'bg-green-600/10 border-green-500/30' : isLocked ? 'bg-white/3 border-white/5 opacity-40' : 'bg-[#1a3a32] border-yellow-500/20'}`}>
              <div className="text-right flex-1">
                <p className={`font-bold text-sm ${isLocked ? 'text-gray-500' : 'text-white'}`}>ایڈ نمبر {index + 1}</p>
                {isCompleted && <p className="text-[10px] text-green-500 font-urdu">مکمل ✓</p>}
                {isLocked && <p className="text-[10px] text-gray-500 font-urdu">پہلے پچھلا ایڈ دیکھیں</p>}
              </div>
              {isCompleted ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : isLocked ? (
                <Lock size={20} className="text-gray-600" />
              ) : (
                <button 
                  onClick={() => { setActiveAdIndex(index); setTimeLeft(30); setIsTimerRunning(true); }} 
                  className="bg-yellow-500 text-[#042f24] px-6 py-2 rounded-xl text-xs font-black shadow-md active:scale-95 transition-transform"
                >
                  WATCH
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      {activeAdIndex !== null && (
        <div className="fixed inset-0 bg-black z-[999] flex flex-col">
          <div className="bg-yellow-500 text-[#042f24] p-4 flex justify-between items-center font-bold">
            <span className="font-urdu">ایڈ چل رہا ہے...</span>
            <span className="text-2xl font-black">{timeLeft}s</span>
          </div>
          <iframe 
            src={adLinks[activeAdIndex]} 
            className="flex-1 w-full border-none" 
            title="Advertisement"
          />
          <div className="p-4 bg-[#042f24] text-center text-xs text-yellow-500/60 font-urdu">
            پیسے کمانے کے لیے {timeLeft} سیکنڈ مکمل ہونے کا انتظار کریں
          </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
