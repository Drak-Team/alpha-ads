import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Share2, Copy, Users, ArrowLeft, Gift, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Referral = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [counts, setCounts] = useState({ l1: 0, l2: 0, l3: 0 });
  const [referralEarnings, setReferralEarnings] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from('profiles').select('referral_code, referral_earnings').eq('id', user.id).maybeSingle();
      if (profile) {
        setReferralCode(profile.referral_code);
        setReferralEarnings(profile.referral_earnings || 0);
      }

      const { count: l1Count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', user.id);
      setCounts(prev => ({ ...prev, l1: l1Count || 0 }));
    };
    fetchData();
  }, []);

  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Gold Plus - آج ہی جوائن کریں!',
        text: 'Gold Plus پلیٹ فارم پر روزانہ کمائیں! میرا ریفرل لنک استعمال کریں اور بونس حاصل کریں۔',
        url: referralLink,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-4 pb-28 font-sans">
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#042f24]/80 backdrop-blur-md py-2 z-10">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-black text-yellow-500 uppercase tracking-wider">Referral</h2>
        <div className="w-10"></div>
      </div>

      {/* Earnings Card */}
      <div className="bg-gradient-to-br from-yellow-600/20 to-[#0a4d3c] border border-yellow-500/30 p-6 rounded-[35px] mb-6 text-center shadow-2xl">
        <Sparkles className="mx-auto text-yellow-500 mb-2" size={28} />
        <p className="text-[10px] text-yellow-500/70 uppercase tracking-widest font-bold mb-1">Referral Earnings</p>
        <h2 className="text-4xl font-black text-yellow-500">${referralEarnings.toFixed(2)}</h2>
        <p className="text-[10px] text-green-400 mt-1">≈ PKR {(referralEarnings * 300).toFixed(0)}</p>
      </div>

      {/* Invite Card */}
      <div className="bg-[#1a3a32] border border-white/10 p-6 rounded-[35px] mb-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <Gift className="text-yellow-500" size={22} />
          <p className="text-yellow-500 font-bold text-sm uppercase tracking-widest">Invite Friends</p>
        </div>
        
        <div className="bg-[#042f24] p-4 rounded-2xl border border-yellow-500/20 mb-4">
          <p className="text-[9px] text-yellow-500/50 mb-1 text-right font-urdu">آپ کا ریفرل کوڈ</p>
          <p className="text-center text-xl font-black text-yellow-500 tracking-[0.3em]">{referralCode}</p>
        </div>

        <div className="bg-[#042f24] p-3 rounded-2xl flex items-center gap-2 border border-white/5 mb-4">
          <button onClick={copyLink} className={`p-2.5 rounded-xl transition-all shrink-0 ${copied ? 'bg-green-500' : 'bg-yellow-500'}`}>
            {copied ? <span className="text-[10px] font-bold text-[#042f24]">✓</span> : <Copy size={16} className="text-[#042f24]" />}
          </button>
          <span className="text-[9px] truncate opacity-40 font-mono flex-1">{referralLink}</span>
        </div>

        <button 
          onClick={shareLink}
          className="w-full bg-yellow-500 text-[#042f24] py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
        >
          <Share2 size={18} />
          شیئر کریں
        </button>
      </div>

      {/* Levels */}
      <div className="space-y-3">
        {[
          { l: "Level 1", p: "15%", d: "Direct Referrals", urdu: "براہ راست ریفرلز", c: "from-yellow-500 to-orange-600", bg: "bg-yellow-500/10", border: "border-yellow-500/20", count: counts.l1 },
          { l: "Level 2", p: "7%", d: "Indirect Team", urdu: "ان ڈائریکٹ ٹیم", c: "from-blue-400 to-indigo-500", bg: "bg-blue-500/10", border: "border-blue-500/20", count: counts.l2 },
          { l: "Level 3", p: "2%", d: "Network Bonus", urdu: "نیٹ ورک بونس", c: "from-green-400 to-emerald-500", bg: "bg-green-500/10", border: "border-green-500/20", count: counts.l3 }
        ].map((item, i) => (
          <div key={i} className={`${item.bg} border ${item.border} p-5 rounded-[28px] flex justify-between items-center`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.c} flex items-center justify-center`}>
                <Users size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm">{item.l}</p>
                <p className={`text-2xl font-black bg-gradient-to-r ${item.c} bg-clip-text text-transparent`}>{item.p}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-40 font-urdu">{item.urdu}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <span className="text-lg font-black text-yellow-500">{item.count}</span>
                <span className="text-[9px] opacity-40">members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referral;
