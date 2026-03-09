import React, { useState } from 'react';
import { Share2, Copy, Users, ArrowLeft, Award, Zap, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralLink = `https://dollarplus-ads.vercel.app/signup?ref=AHMAD99`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 pb-24 font-sans text-right">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-purple-400">ریفرلز اور ٹیم</h2>
        <div className="w-10"></div>
      </div>

      {/* ریفرل لنک کارڈ */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-[35px] mb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs opacity-50">71 members</span>
          <div className="flex items-center gap-2">
            <p className="font-bold font-urdu text-sm">آپ کا ریفرل لنک</p>
            <Users size={18} className="text-purple-500" />
          </div>
        </div>
        <div className="bg-black/40 p-4 rounded-2xl flex justify-between items-center border border-white/5">
           <button onClick={copyLink} className={`p-2 rounded-xl ${copied ? 'bg-green-500' : 'bg-purple-600'}`}>
            {copied ? <span className="text-[10px]">Copied!</span> : <Copy size={18} />}
          </button>
          <span className="text-[10px] truncate opacity-60 font-mono ml-2">{referralLink}</span>
        </div>
      </div>

      {/* لیول وائز کمیشن اور ٹیم */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold opacity-40 pr-2 font-urdu">ٹیم لیولز اور کمیشن</h3>
        
        {[
          { l: "Level 1", p: "15%", d: "براہ راست ممبرز", c: "text-yellow-500", count: "45" },
          { l: "Level 2", p: "7%", d: "ٹیم کے ممبرز", c: "text-blue-400", count: "20" },
          { l: "Level 3", p: "2%", d: "نیٹ ورک بونس", c: "text-green-400", count: "6" }
        ].map((level, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-[30px] flex justify-between items-center">
            <div className="text-left">
              <span className={`text-xl font-black ${level.c}`}>{level.p}</span>
              <p className="text-[8px] opacity-40 uppercase">Commission</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{level.l}</p>
              <p className="text-[9px] opacity-50 font-urdu">{level.d}</p>
              <p className="text-[10px] font-bold text-purple-400 mt-1">{level.count} ممبرز</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invite;
