import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const Ads = () => {
  const navigate = useNavigate();
  const [hasActivePackage, setHasActivePackage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeAd, setActiveAd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completedAds, setCompletedAds] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 1. چیک کریں کہ کیا یوزر کا پیکیج ایکٹیو ہے
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

  // ٹائمر اور دیگر فنکشنز (وہی رہیں گے)
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setCompletedAds([...completedAds, activeAd]);
      setActiveAd(null);
      alert("ایڈ مکمل ہو گیا!");
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  if (loading) return <div className="min-h-screen bg-[#064e3b] flex items-center justify-center text-white font-urdu">چیک کیا جا رہا ہے...</div>;

  // اگر پیکیج ایکٹیو نہیں ہے تو یہ سکرین دکھائیں
  if (!hasActivePackage) {
    return (
      <div className="min-h-screen bg-[#064e3b] text-white p-6 flex flex-col items-center justify-center text-center font-sans">
        <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <div className="bg-red-500/20 p-5 rounded-full inline-block mb-6 text-red-500">
            <Lock size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-4 font-urdu text-yellow-500">پلان ایکٹیو نہیں ہے!</h2>
          <p className="text-sm opacity-60 mb-8 font-urdu leading-relaxed">
            اشتہارات دیکھنے اور پیسے کمانے کے لیے پہلے کوئی بھی پلان ایکٹیو کرنا ضروری ہے۔
          </p>
          <button 
            onClick={() => navigate('/plans')}
            className="w-full bg-yellow-600 py-4 rounded-2xl font-bold font-urdu shadow-lg"
          >
            پلانز دیکھیں
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      {/* باقی وہی ایڈز والا ڈیزائن جو پہلے دیا تھا */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-yellow-500">روزانہ کے ٹاسک</h2>
        <div className="w-10"></div>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className={`p-5 rounded-[30px] border flex justify-between items-center ${completedAds.includes(num) ? 'bg-green-600/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
            {completedAds.includes(num) ? <CheckCircle2 className="text-green-500" /> : (
              <button onClick={() => { setActiveAd(num); setTimeLeft(30); setIsTimerRunning(true); }} className="bg-yellow-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold">Watch</button>
            )}
            <p className="font-bold text-sm">ایڈ نمبر {num}</p>
          </div>
        ))}
      </div>
      
      {/* ٹائمر پاپ اپ */}
      {activeAd && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center">
           <div className="text-6xl font-black text-yellow-500 mb-4">{timeLeft}s</div>
           <p className="font-urdu">اشتہار چل رہا ہے، پیج بند نہ کریں</p>
        </div>
      )}
    </div>
  );
};

export default Ads;
