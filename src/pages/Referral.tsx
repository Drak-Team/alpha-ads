import React, { useState } from 'react';
import { 
  Share2, Copy, Users, Gift, ArrowLeft, 
  ChevronRight, Award, Coins, Zap 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralCode = "DP-AHMAD99"; // یہ بعد میں یوزر آئی ڈی سے بدلے گا
  const referralLink = `https://dollarplus-ads.vercel.app/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levels = [
    { level: "Level 1", reward: "15%", icon: <Zap className="text-yellow-500" />, desc: "براہ راست ممبرز" },
    { level: "Level 2", reward: "7%", icon: <Award className="text-blue-400" />, desc: "ٹیم کے ممبرز" },
    { level: "Level 3", reward: "2%", icon: <Coins className="text-green-400" />, desc: "نیٹ ورک بونس" },
  ];

  return (
    <div className="min-h-screen bg-[#064e3b] text-white font-sans overflow-y-auto pb-24 text-right">
      {/* ہیڈر */}
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#064e3b]/80 backdrop-blur-md z-10">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-yellow-500">ٹیم اور ریفرل</h2>
        <div className="w-10"></div>
      </div>

      <div className="px-6 space-y-6">
        {/* ریفرل لنک کارڈ (آؤٹ کلاس ڈیزائن) */}
        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <Gift size={40} className="mb-4 opacity-30" />
          <h3 className="text-2xl font-black mb-2 font-urdu">ٹیم بنائیں، زیادہ کمائیں!</h3>
          <p className="text-[10px] opacity-80 mb-6 font-urdu">اپنا یونیک ریفرل لنک دوستوں کے ساتھ شیئر کریں اور 3 لیولز تک بونس حاصل کریں۔</p>
          
          <div className="bg-black/20 p-4 rounded-2xl flex items-center justify-between border border-white/10 backdrop-blur-sm">
            <button 
              onClick={copyToClipboard}
              className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-500' : 'bg-white/10'}`}
            >
              {copied ? <span className="text-[10px] font-bold">Copied!</span> : <Copy size={18} />}
            </button>
            <span className="text-[10px] font-mono opacity-80 truncate ml-2">{referralLink}</span>
          </div>
        </div>

        {/* 3 لیول ریوارڈ سسٹم */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold opacity-40 uppercase tracking-widest pr-2 font-urdu">کمیشن لیولز (Commission)</h3>
          <div className="grid gap-3">
            {levels.map((l, i) => (
              <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-[30px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black text-yellow-500">{l.reward}</span>
                  <ChevronRight size={14} className="opacity-20" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-sm">{l.level}</p>
                    <p className="text-[9px] opacity-50 font-urdu">{l.desc}</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl">{l.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ٹیم سٹیٹس */}
        <div className="bg-black/20 rounded-[35px] p-6 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <span className="bg-green-600/20 text-green-500 px-3 py-1 rounded-full text-[10px] font-bold">Active Team</span>
            <div className="flex items-center gap-2 text-right">
              <p className="font-bold text-sm font-urdu">ٹیم کی تفصیلات</p>
              <Users size={18} className="text-yellow-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'کل ممبرز', value: '0' },
              { label: 'ایکٹیو ممبرز', value: '0' },
              { label: 'ٹیم آمدنی', value: '$0.00' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 bg-white/5 rounded-2xl">
                <p className="text-[14px] font-black text-white">{stat.value}</p>
                <p className="text-[8px] opacity-40 font-urdu mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
