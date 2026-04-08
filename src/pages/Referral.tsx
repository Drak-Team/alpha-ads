import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Share2, Copy, Users, Gift, MessageCircle, Crown, Trophy, Star, Award, Gem, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RANKS = [
  { level: 1, required: 10, reward: 2, rewardPkr: 560, title: "Bronze", icon: Star, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  { level: 2, required: 20, reward: 10, rewardPkr: 2800, title: "Silver", icon: Award, color: "text-gray-300", bg: "bg-gray-500/10", border: "border-gray-500/20" },
  { level: 3, required: 50, reward: 25, rewardPkr: 7000, title: "Gold", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { level: 4, required: 100, reward: 50, rewardPkr: 14000, title: "Platinum", icon: Gem, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { level: 5, required: 200, reward: 100, rewardPkr: 28000, title: "Diamond", icon: Crown, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
];

const Referral = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [activeTeam, setActiveTeam] = useState(0);
  const [claimedRanks, setClaimedRanks] = useState<number[]>([]);
  const [claimingRank, setClaimingRank] = useState<number | null>(null);
  const [tab, setTab] = useState<'invite' | 'ranks'>('invite');

  useEffect(() => {
    fetchData();
  }, []);

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

    // Count active team members (those with active subscriptions)
    const { data: referredProfiles } = await supabase.from('profiles').select('id').eq('referred_by', user.id);
    if (referredProfiles && referredProfiles.length > 0) {
      const ids = referredProfiles.map(p => p.id);
      const { count: activeCount } = await supabase.from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .in('user_id', ids)
        .eq('is_active', true);
      setActiveTeam(activeCount || 0);
    }

    // Check claimed ranks
    const { data: rewards } = await supabase.from('rank_rewards').select('rank_level').eq('user_id', user.id);
    if (rewards) setClaimedRanks(rewards.map(r => r.rank_level));
  };

  const claimRank = async (rank: typeof RANKS[0]) => {
    setClaimingRank(rank.level);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ضروری ہے");

      // Insert rank reward
      const { error: rrErr } = await supabase.from('rank_rewards').insert([{
        user_id: user.id,
        rank_level: rank.level,
        reward_amount: rank.rewardPkr,
        claimed: true,
        claimed_at: new Date().toISOString(),
      }]);
      if (rrErr) throw rrErr;

      // Add to balance
      const { data: profile } = await supabase.from('profiles').select('balance, referral_earnings').eq('id', user.id).single();
      await supabase.from('profiles').update({
        balance: (profile?.balance || 0) + rank.rewardPkr,
        referral_earnings: (profile?.referral_earnings || 0) + rank.rewardPkr,
      }).eq('id', user.id);

      // Log transaction
      await supabase.from('transactions').insert([{
        user_id: user.id,
        type: 'rank_reward',
        amount: rank.rewardPkr,
        description: `${rank.title} Rank Reward - $${rank.reward} (PKR ${rank.rewardPkr})`,
      }]);

      alert(`🎉 ${rank.title} رینک ریوارڈ حاصل! PKR ${rank.rewardPkr} بیلنس میں شامل ہوا!`);
      fetchData();
    } catch (err: any) {
      alert("خرابی: " + (err.message || "ریوارڈ حاصل نہیں ہو سکا"));
    } finally {
      setClaimingRank(null);
    }
  };

  const referralLink = `${window.location.origin}/auth?ref=${referralCode}`;

  const previewMessage = `🌟 Join Gold Plus — Lifetime Earning Platform!\n\n✅ Lifetime project — earn daily profits!\n💰 Minimum Deposit: $2 (Rs. 600)\n💸 Minimum Withdrawal: $1 (Rs. 300)\n🚀 Without referral withdrawal system!\n📊 3-Level Referral Commission (up to 15%)\n⚡ Fast withdrawals within 12 hours\n🔒 100% Secure & Trusted\n\n👉 Join now & start earning!\n${referralLink}`;

  const copyLink = () => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const copyMessage = () => { navigator.clipboard.writeText(previewMessage); setMsgCopied(true); setTimeout(() => setMsgCopied(false), 2000); };
  const shareLink = () => { if (navigator.share) { navigator.share({ title: 'Gold Plus', text: previewMessage, url: referralLink }); } else copyLink(); };
  const shareWhatsApp = () => { window.open(`https://wa.me/?text=${encodeURIComponent(previewMessage)}`, '_blank'); };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#2d1b69] to-[#1a1035] mx-4 mt-4 rounded-3xl p-6 border border-purple-500/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Crown className="text-[#0d0a1a]" size={24} />
          </div>
          <span className="text-gray-300 font-semibold">Referral Center</span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0d0a1a] font-black text-sm">U</div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-2">
          <button onClick={() => setTab('invite')} className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all ${tab === 'invite' ? 'bg-yellow-500 text-[#0d0a1a]' : 'bg-white/5 text-gray-400'}`}>
            <Share2 size={14} className="inline mr-1" /> Invite & Earn
          </button>
          <button onClick={() => setTab('ranks')} className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all ${tab === 'ranks' ? 'bg-yellow-500 text-[#0d0a1a]' : 'bg-white/5 text-gray-400'}`}>
            <Trophy size={14} className="inline mr-1" /> Rank Road
          </button>
        </div>
      </div>

      {tab === 'invite' ? (
        <>
          {/* Invite Tab Content */}
          <div className="px-4 mt-4">
            <div className="text-center">
              <Share2 className="mx-auto text-yellow-500 mb-2" size={28} />
              <h2 className="text-xl font-black">Invite & Earn</h2>
              <p className="text-gray-400 text-xs mt-1">Share your link and earn commissions</p>
            </div>

            <div className="bg-black/30 rounded-2xl p-3 mt-4 border border-purple-500/20 overflow-hidden">
              <p className="text-[10px] text-center truncate text-yellow-500/80 font-mono">{referralLink}</p>
            </div>

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

          {/* Levels & Stats */}
          <div className="px-4 mt-6">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 px-2">Commission Levels</p>
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

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-yellow-500">{teamCount}</p>
                <p className="text-[10px] text-gray-500">Total Team</p>
              </div>
              <div className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-green-400">{activeTeam}</p>
                <p className="text-[10px] text-gray-500">Active Members</p>
              </div>
              <div className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-4 text-center">
                <p className="text-xl font-black text-green-400">PKR {referralEarnings}</p>
                <p className="text-[10px] text-gray-500">Earnings</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Rank Road Tab */
        <div className="px-4 mt-4">
          <div className="text-center mb-4">
            <Trophy className="mx-auto text-yellow-500 mb-2" size={32} />
            <h2 className="text-xl font-black">Rank Road</h2>
            <p className="text-gray-500 text-xs">ایکٹیو ممبرز بنائیں اور ریوارڈ حاصل کریں</p>
            <div className="mt-2 bg-black/30 rounded-2xl p-3 border border-white/5">
              <p className="text-[10px] text-gray-500">آپ کے ایکٹیو ممبرز</p>
              <p className="text-yellow-500 font-black text-2xl">{activeTeam}</p>
            </div>
          </div>

          <div className="space-y-3">
            {RANKS.map((rank, i) => {
              const Icon = rank.icon;
              const isUnlocked = activeTeam >= rank.required;
              const isClaimed = claimedRanks.includes(rank.level);
              const progress = Math.min((activeTeam / rank.required) * 100, 100);

              return (
                <motion.div key={rank.level} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className={`${rank.bg} border ${rank.border} rounded-2xl p-4 ${!isUnlocked ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isUnlocked ? 'bg-yellow-500' : 'bg-white/10'}`}>
                      <Icon size={20} className={isUnlocked ? 'text-[#0d0a1a]' : 'text-gray-500'} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-black text-sm ${rank.color}`}>{rank.title} Rank</h3>
                      <p className="text-[10px] text-gray-500">{rank.required} ایکٹیو ممبرز</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow-500 font-black text-sm">${rank.reward}</p>
                      <p className="text-[9px] text-gray-600">PKR {rank.rewardPkr.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/5 rounded-full h-2 mb-3">
                    <div className={`h-2 rounded-full transition-all duration-500 ${isUnlocked ? 'bg-green-500' : 'bg-yellow-500/50'}`}
                      style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-[9px] text-gray-600">{activeTeam}/{rank.required} members</p>
                    {isClaimed ? (
                      <span className="text-[10px] text-green-400 font-bold flex items-center gap-1">✅ Claimed</span>
                    ) : isUnlocked ? (
                      <button onClick={() => claimRank(rank)} disabled={claimingRank === rank.level}
                        className="bg-yellow-500 text-[#0d0a1a] text-[10px] font-black px-4 py-1.5 rounded-full active:scale-95 transition-transform">
                        {claimingRank === rank.level ? '...' : '🎁 Claim Reward'}
                      </button>
                    ) : (
                      <span className="text-[10px] text-gray-600">🔒 Locked</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Weekly Salary Info */}
          <div className="mt-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Zap size={20} className="text-yellow-500" />
              <h3 className="font-black text-sm text-yellow-500">Weekly Salary</h3>
            </div>
            <p className="text-xs text-gray-400">$100 (PKR 28,000) ڈپازٹ کرنے پر ہفتہ وار $5 (PKR 1,400) سیلری ملے گی۔</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Referral;
