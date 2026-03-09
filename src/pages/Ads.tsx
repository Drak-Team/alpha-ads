import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Ads = () => {
  const navigate = useNavigate();
  const [activeAd, setActiveAd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completedAds, setCompletedAds] = useState([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // 1. اشتہارات کی لسٹ (1 سے 6)
  const adsList = [1, 2, 3, 4, 5, 6];

  // 2. ٹائمر کا فنکشن
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      handleAdComplete();
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const startAd = (adNum) => {
    if (completedAds.includes(adNum)) return;
    setActiveAd(adNum);
    setTimeLeft(30);
    setIsTimerRunning(true);
  };

  const handleAdComplete = () => {
    setIsTimerRunning(false);
    setCompletedAds([...completedAds, activeAd]);
    setActiveAd(null);
    alert(`ایڈ نمبر ${activeAd} مکمل ہو گیا!`);
    
    if (completedAds.length + 1 === 6) {
      alert("مبارک ہو! آپ نے آج کے تمام اشتہارات دیکھ لیے ہیں۔ رقم آپ کے بیلنس میں شامل کر دی گئی ہے۔ اب آپ 24 گھنٹے بعد اگلے اشتہارات دیکھ سکیں گے۔");
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-yellow-500">روزانہ کے ٹاسک</h2>
        <div className="w-10"></div>
      </div>

      {/* ٹائمر ڈسپلے (جب ایڈ چل رہا ہو) */}
      {activeAd && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-6">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-yellow-500" 
                strokeDasharray={440} strokeDashoffset={440 - (440 * (30 - timeLeft)) / 30} />
            </svg>
            <span className="absolute text-4xl font-black">{timeLeft}s</span>
          </div>
          <p className="mt-8 text-lg font-urdu">اشتہار چل رہا ہے، براہ کرم انتظار کریں...</p>
          <p className="text-xs opacity-50 mt-2 text-red-400">بند کرنے کی صورت میں رقم شامل نہیں ہوگی</p>
        </div>
      )}

      {/* ایڈز کی لسٹ */}
      <div className="grid gap-4">
        {adsList.map((num) => (
          <div key={num} className={`p-5 rounded-[30px] border flex justify-between items-center transition-all ${completedAds.includes(num) ? 'bg-green-600/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
            {completedAds.includes(num) ? (
              <CheckCircle2 className="text-green-500" />
            ) : (
              <button 
                onClick={() => startAd(num)}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-lg flex items-center gap-1"
              >
                Watch <PlayCircle size={14} />
              </button>
            )}
            <div className="text-right">
              <p className="font-bold text-sm">ایڈ نمبر {num}</p>
              <p className="text-[9px] opacity-50">وقت: 30 سیکنڈ</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-600/10 border border-yellow-500/20 p-4 rounded-2xl flex items-center justify-end gap-3">
        <p className="text-[10px] font-urdu opacity-80 leading-tight">تمام 6 اشتہارات دیکھنے کے بعد رقم آپ کے اکاؤنٹ میں جمع ہو جائے گی۔</p>
        <AlertCircle size={20} className="text-yellow-500 shrink-0" />
      </div>
    </div>
  );
};

export default Ads
