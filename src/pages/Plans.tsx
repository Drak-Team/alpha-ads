import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Star, TrendingUp, Crown, Gem, Sparkles, X, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeSubs, setActiveSubs] = useState<string[]>([]);
  const [dbPlans, setDbPlans] = useState<any[]>([]);

  const iconMap: Record<string, any> = { Star, TrendingUp, Gem, Crown, Sparkles };

  const planMeta: Record<string, { icon: string; featured: boolean; priceUsd: number; dailyUsd: number; totalUsd: number }> = {
    "Starter": { icon: "Star", featured: false, priceUsd: 2, dailyUsd: 0.15, totalUsd: 9 },
    "Growth": { icon: "TrendingUp", featured: true, priceUsd: 10, dailyUsd: 0.50, totalUsd: 30 },
    "Silver": { icon: "Sparkles", featured: false, priceUsd: 6, dailyUsd: 0.35, totalUsd: 21 },
    "Gold": { icon: "Gem", featured: false, priceUsd: 25, dailyUsd: 1.25, totalUsd: 75 },
    "Platinum": { icon: "Crown", featured: false, priceUsd: 50, dailyUsd: 2.50, totalUsd: 150 },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user.id).maybeSingle();
    if (profile) setBalance(profile.balance || 0);

    const { data: subs } = await supabase.from('subscriptions').select('plan_id, is_active, expires_at').eq('user_id', user.id).eq('is_active', true);
    if (subs) setActiveSubs(subs.map(s => s.plan_id));

    const { data: plans } = await supabase.from('plans').select('*');
    if (plans) setDbPlans(plans);
  };

  const handleActivate = async (dbPlan: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast({ title: "خرابی", description: "پہلے لاگ ان کریں", variant: "destructive" }); return; }

    const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user.id).maybeSingle();
    const freshBalance = profile?.balance || 0;
    setBalance(freshBalance);

    if (freshBalance < dbPlan.price) {
      toast({ title: "بیلنس کم ہے! ❌", description: `آپ کا بیلنس PKR ${freshBalance} ہے۔ پہلے ڈپازٹ کریں۔`, variant: "destructive" });
      return;
    }
    setSelectedPlan(dbPlan);
  };

  const confirmActivation = async () => {
    if (!selectedPlan) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");

      const { data: freshProfile } = await supabase.from('profiles').select('balance').eq('id', user.id).maybeSingle();
      const freshBalance = freshProfile?.balance || 0;

      if (freshBalance < selectedPlan.price) {
        toast({ title: "بیلنس کم ہے! ❌", description: `آپ کا بیلنس PKR ${freshBalance} ہے۔`, variant: "destructive" });
        setSelectedPlan(null);
        setLoading(false);
        return;
      }

      // Check if already subscribed
      const { data: existingSub } = await supabase.from('subscriptions')
        .select('id').eq('user_id', user.id).eq('plan_id', selectedPlan.id).eq('is_active', true).maybeSingle();
      if (existingSub) {
        toast({ title: "پہلے سے ایکٹیو ✅", description: "یہ پیکج پہلے سے ایکٹیو ہے!" });
        setSelectedPlan(null);
        setLoading(false);
        return;
      }

      // Deduct balance
      const newBalance = freshBalance - selectedPlan.price;
      const { error: balErr } = await supabase.from('profiles')
        .update({ balance: newBalance })
        .eq('id', user.id);
      if (balErr) throw balErr;

      // Create subscription
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + selectedPlan.duration_days);
      
      const { error: subErr } = await supabase.from('subscriptions').insert([{
        user_id: user.id,
        plan_id: selectedPlan.id,
        started_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        is_active: true,
      }]);
      if (subErr) throw subErr;

      // Log transaction
      await supabase.from('transactions').insert([{
        user_id: user.id,
        type: 'plan_purchase',
        amount: selectedPlan.price,
        description: `${selectedPlan.name} Plan activated - PKR ${selectedPlan.price}`,
      }]);

      toast({ title: `${selectedPlan.name} ایکٹیو ✅`, description: `PKR ${selectedPlan.price} بیلنس سے کٹوتی ہوئی۔` });
      setSelectedPlan(null);
      navigate('/dashboard');
    } catch (error: any) {
      toast({ title: "خرابی ❌", description: error.message || "ایکٹیویشن ناکام", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      <div className="bg-gradient-to-b from-[#2d1b69] to-[#1a1035] mx-4 mt-4 rounded-3xl p-5 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-black text-lg italic">Gold Plus</span>
          <span className="text-gray-300 font-semibold">Plans</span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0d0a1a] font-black text-sm">U</div>
        </div>
        <div className="mt-3 bg-black/30 rounded-2xl p-3 text-center border border-white/5">
          <p className="text-[10px] text-gray-500">Your Balance</p>
          <p className="text-yellow-500 font-black text-2xl">PKR {balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-xl font-black">Investment Plans</h2>
        <p className="text-gray-500 text-xs">بیلنس سے پیکج ایکٹیو کریں — خودکار کٹوتی</p>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {dbPlans.map((plan, index) => {
          const meta = planMeta[plan.name] || { icon: "Star", featured: false, priceUsd: 0, dailyUsd: 0, totalUsd: 0 };
          const Icon = iconMap[meta.icon] || Star;
          const isActive = activeSubs.includes(plan.id);
          return (
            <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-b from-[#2d1b69] to-[#1a1035] rounded-3xl p-5 border ${isActive ? 'border-green-500/50' : meta.featured ? 'border-yellow-500/50' : 'border-purple-500/20'} shadow-xl`}>
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase flex items-center gap-1">
                  <CheckCircle size={12} /> Active
                </div>
              )}
              {!isActive && meta.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#0d0a1a] text-[10px] font-black px-4 py-1 rounded-full uppercase">Most Popular</div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? 'bg-green-500' : meta.featured ? 'bg-yellow-500' : 'bg-purple-500/20'}`}>
                  <Icon size={24} className={isActive || meta.featured ? 'text-[#0d0a1a]' : 'text-yellow-500'} />
                </div>
                <div>
                  <h3 className="font-black text-lg">{plan.name}</h3>
                  <p className="text-yellow-500 font-black text-xl">${meta.priceUsd} <span className="text-gray-500 text-xs font-normal">/ Rs. {plan.price.toLocaleString()}</span></p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Daily</p>
                  <p className="text-green-400 font-black text-sm">${meta.dailyUsd.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-600">Rs. {plan.daily_earning}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Total</p>
                  <p className="text-green-400 font-black text-sm">${meta.totalUsd.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-600">Rs. {(plan.daily_earning * plan.duration_days).toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Duration</p>
                  <p className="text-white font-black text-sm">{plan.duration_days} days</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-4">
                {['Daily profit payout', '24/7 withdrawal', 'Referral bonus'].map(f => (
                  <p key={f} className="text-xs text-gray-400 flex items-center gap-2"><span className="text-green-400">✓</span> {f}</p>
                ))}
              </div>
              <button onClick={() => isActive ? null : handleActivate(plan)} disabled={isActive}
                className={`w-full py-3.5 rounded-2xl font-black text-sm active:scale-95 transition-transform ${
                  isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                    : balance >= plan.price ? 'bg-yellow-500 text-[#0d0a1a] shadow-lg shadow-yellow-500/20'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                {isActive ? '✅ Active' : balance >= plan.price ? 'Activate Plan' : `Deposit Required (PKR ${plan.price})`}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-5 z-50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a1035] border border-purple-500/30 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="text-center mb-5">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Crown size={32} className="text-[#0d0a1a]" />
              </div>
              <h3 className="text-xl font-black text-yellow-500">{selectedPlan.name} Plan</h3>
              <p className="text-xs text-gray-500 mt-1">پیکج ایکٹیو کرنے کی تصدیق</p>
            </div>
            <div className="bg-black/30 p-4 rounded-2xl mb-4 border border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">پیکج قیمت</span>
                <span className="text-yellow-500 font-black">PKR {selectedPlan.pkr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">آپ کا بیلنس</span>
                <span className="text-green-400 font-black">PKR {balance.toLocaleString()}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm">
                <span className="text-gray-500">باقی بیلنس</span>
                <span className="text-white font-black">PKR {(balance - selectedPlan.pkr).toLocaleString()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={confirmActivation} disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${loading ? 'bg-gray-700 opacity-50' : 'bg-yellow-500 text-[#0d0a1a] shadow-lg shadow-yellow-500/20 active:scale-95'}`}>
                {loading ? "Processing..." : "✅ تصدیق کریں — ایکٹیو کریں"}
              </button>
              <button onClick={() => setSelectedPlan(null)} className="w-full py-3 rounded-2xl text-sm text-gray-500 bg-white/5 border border-white/5">منسوخ کریں</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Plans;
