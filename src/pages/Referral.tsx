import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Share2, Copy, Users, Gift, MessageCircle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Referral = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [teamCount, setTeamCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from('profiles').select('referral_code, referral_earnings').eq('id', user.id).maybeSingle();
      if (profile) {
        setReferralCode(profile.referral_code);
        setReferralEarnings(profile.referral_earnings || 0);
      }
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', user.id);
      setTeamCount(count || 0);
    };
    fetchData();
  }, []);

  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;

  const previewMessage = `🌟 Join Gold Plus — Lifetime Earning Platform!\n\n✅ Lifetime project — earn daily profits!\n💰 Minimum Deposit: $2 (Rs. 600)\n💸 Minimum Withdrawal: $1 (Rs. 300)\n🚀 Without referral withdrawal system!\n📊 3-Level Referral Commission (up to 15%)\n⚡ Fast withdrawals within 12 hours\n🔒 100% Secure & Trusted\n\n👉 Join now & start earning!\n${referralLink}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setMsgCopied(true);
    setTimeout(() => setMsgCopied(false), 2000);
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({ title: 'Gold Plus', text: previewMessage, url: referralLink });
    } else copyLink();
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(previewMessage)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#2d1b69] to-[#1a1035] mx-4 mt-4 rounded-3xl p-6 border border-purple-500/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Crown className="text-[#0d0a1a]" size={24} />
          </div>
          <span className="text-gray-300 font-semibold">Invite & Earn</span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0d0a1a] font-black text-sm">U</div>
        </div>

        {/* Invite Card */}
        <div className="text-center mt-4">
          <Share2 className="mx-auto text-yellow-500 mb-2" size={28} />
          <h2 className="text-xl font-black">Invite & Earn</h2>
          <p className="text-gray-400 text-xs mt-1">Share your link and earn commissions on every investment</p>
        </div>

        {/* Referral Link */}
        <div className="bg-black/30 rounded-2xl p-3 mt-4 border border-purple-500/20 overflow-hidden">
          <p className="text-[10px] text-center truncate text-yellow-500/80 font-mono">{referralLink}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <button onClick={copyLink} className="bg-yellow-500 text-[#0d0a1a] py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
            <Copy size={14} /> {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={shareLink} className="bg-white/10 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 active:scale-95 transition-transform">
            <Share2 size={14} /> Share
          </button>
          <button onClick={shareWhatsApp} className="bg-green-500 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform">
            <MessageCircle size={14} /> WhatsApp
          </button>
        </div>
      </div>

      {/* Preview Message */}
      <div className="px-4 mt-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 px-2">Preview Message</p>
        <div className="bg-[#1a1035] rounded-3xl border border-purple-500/10 p-5">
          <p className="text-sm whitespace-pre-line leading-relaxed text-gray-300">{previewMessage}</p>
        </div>
        <button onClick={copyMessage} className="w-full flex items-center justify-center gap-2 mt-3 py-3 bg-white/5 rounded-2xl border border-white/5 text-sm text-gray-400">
          <Copy size={14} /> {msgCopied ? 'Copied! ✅' : 'Copy Message with Referral Link'}
        </button>
      </div>

      {/* Key Highlights */}
      <div className="px-4 mt-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 px-2">Key Highlights</p>
        <div className="space-y-2">
          {[
            { l: "Level 1 — 15%", d: "Direct Referrals", c: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { l: "Level 2 — 7%", d: "Indirect Team", c: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { l: "Level 3 — 2%", d: "Network Bonus", c: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} border ${item.border} p-4 rounded-2xl flex justify-between items-center`}>
              <div className="flex items-center gap-3">
                <Users size={18} className={item.c} />
                <span className={`font-bold text-sm ${item.c}`}>{item.l}</span>
              </div>
              <span className="text-gray-500 text-xs">{item.d}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-yellow-500">{teamCount}</p>
            <p className="text-[10px] text-gray-500">Total Team</p>
          </div>
          <div className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-4 text-center">
            <p className="text-2xl font-black text-green-400">PKR {referralEarnings}</p>
            <p className="text-[10px] text-gray-500">Referral Earnings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
