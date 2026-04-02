import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Share2, Copy, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Referral = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [counts, setCounts] = useState({ l1: 0, l2: 0, l3: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from('profiles').select('referral_code').eq('id', user.id).maybeSingle();
      if (profile) setReferralCode(profile.referral_code);

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

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 pb-28 font-sans text-right">
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0f0c29]/80 backdrop-blur-md py-2 z-10">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-purple-400">ٹیم اور ریفرلز</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a4e] border border-white/10 p-7 rounded-[40px] mb-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6 text-purple-400 font-bold uppercase text-[10px] tracking-widest">
          <span>Invite Friends</span>
          <Users size={20} />
        </div>
        <div className="bg-black/40 p-4 rounded-2xl flex justify-between items-center border border-white/5">
           <button onClick={copyLink} className={`p-2.5 rounded-xl transition-all ${copied ? 'bg-green-500' : 'bg-purple-600'}`}>
            {copied ? <span className="text-[10px] font-bold">Copied!</span> : <Copy size={18} />}
          </button>
          <span className="text-[10px] truncate opacity-50 font-mono ml-3">{referralLink}</span>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { l: "Level 1", p: "15%", d: "Direct Referrals", c: "from-yellow-500 to-orange-600", count: counts.l1 },
          { l: "Level 2", p: "7%", d: "Indirect Team", c: "from-blue-500 to-indigo-600", count: counts.l2 },
          { l: "Level 3", p: "2%", d: "Network Bonus", c: "from-green-500 to-emerald-600", count: counts.l3 }
        ].map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-[32px] flex justify-between items-center">
            <div className="text-left">
              <span className={`text-2xl font-black bg-gradient-to-r ${item.c} bg-clip-text text-transparent`}>{item.p}</span>
              <p className="text-[8px] opacity-30 font-bold uppercase mt-1">Commission</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm text-white/90">{item.l}</p>
              <p className="text-[9px] opacity-40 font-urdu mb-1">{item.d}</p>
              <div className="flex items-center gap-1 justify-end text-purple-400">
                <span className="text-[11px] font-bold">{item.count}</span>
                <Users size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Referral;
