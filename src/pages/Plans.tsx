import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Star, TrendingUp, Crown, Gem, Sparkles, X, Copy, Check } from 'lucide-react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dbPlans, setDbPlans] = useState<any[]>([]);

  const iconMap: Record<string, any> = { Star, TrendingUp, Gem, Crown, Sparkles };

  const plans = [
    { name: "Starter", price: 2, pkr: 600, daily: 0.15, totalReturn: 9, duration: 60, ads: 5, icon: "Star", featured: false },
    { name: "Growth", price: 10, pkr: 2800, daily: 0.50, totalReturn: 30, duration: 60, ads: 10, icon: "TrendingUp", featured: true },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.35, totalReturn: 21, duration: 60, ads: 8, icon: "Sparkles", featured: false },
    { name: "Gold", price: 25, pkr: 7000, daily: 1.25, totalReturn: 75, duration: 60, ads: 15, icon: "Gem", featured: false },
    { name: "Platinum", price: 50, pkr: 14000, daily: 2.50, totalReturn: 150, duration: 60, ads: 20, icon: "Crown", featured: false },
  ];

  const copyNumber = () => {
    navigator.clipboard.writeText("03037264598");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDeposit = async () => {
    if (!file) { alert("براہ کرم ادائیگی کا اسکرین شاٹ اپ لوڈ کریں"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");
      const fileName = `deposit-${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('deposits').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('deposits').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('deposits').insert([{
        user_id: user.id,
        amount: selectedPlan.pkr,
        transaction_id: `PLAN-${selectedPlan.name}-${Date.now()}`,
        screenshot_url: publicUrl,
        status: 'pending'
      }]);
      if (dbError) throw dbError;
      alert("درخواست موصول ہوگئی ہے! ایڈمن جلد تصدیق کرے گا۔ ✅");
      setSelectedPlan(null);
      setFile(null);
    } catch (error: any) {
      alert("خرابی: " + (error.message || "اپ لوڈ نہیں ہو سکا"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#2d1b69] to-[#1a1035] mx-4 mt-4 rounded-3xl p-5 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <span className="text-yellow-500 font-black text-lg italic">Gold Plus</span>
          <span className="text-gray-300 font-semibold">Plans</span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0d0a1a] font-black text-sm">U</div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h2 className="text-xl font-black">Investment Plans</h2>
        <p className="text-gray-500 text-xs">Choose a plan that fits your goals</p>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {plans.map((plan, index) => {
          const Icon = iconMap[plan.icon] || Star;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-b from-[#2d1b69] to-[#1a1035] rounded-3xl p-5 border ${plan.featured ? 'border-yellow-500/50' : 'border-purple-500/20'} shadow-xl`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#0d0a1a] text-[10px] font-black px-4 py-1 rounded-full uppercase">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.featured ? 'bg-yellow-500' : 'bg-purple-500/20'}`}>
                  <Icon size={24} className={plan.featured ? 'text-[#0d0a1a]' : 'text-yellow-500'} />
                </div>
                <div>
                  <h3 className="font-black text-lg">{plan.name}</h3>
                  <p className="text-yellow-500 font-black text-xl">${plan.price} <span className="text-gray-500 text-xs font-normal">/ Rs. {plan.pkr.toLocaleString()}</span></p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Daily</p>
                  <p className="text-green-400 font-black text-sm">${plan.daily.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-600">Rs. {(plan.daily * 280).toFixed(0)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Total</p>
                  <p className="text-green-400 font-black text-sm">${plan.totalReturn.toFixed(2)}</p>
                  <p className="text-[9px] text-gray-600">Rs. {(plan.totalReturn * 280).toFixed(0)}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase">Duration</p>
                  <p className="text-white font-black text-sm">{plan.duration} days</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-1.5 mb-4">
                {['Daily profit payout', '24/7 withdrawal', 'Referral bonus'].map(f => (
                  <p key={f} className="text-xs text-gray-400 flex items-center gap-2">
                    <span className="text-green-400">✓</span> {f}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3.5 rounded-2xl font-black text-sm active:scale-95 transition-transform ${
                  plan.featured
                    ? 'bg-yellow-500 text-[#0d0a1a] shadow-lg shadow-yellow-500/20'
                    : 'bg-yellow-500 text-[#0d0a1a]'
                }`}
              >
                Activate Plan
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-5 z-50 backdrop-blur-sm">
          <div className="bg-[#1a1035] border border-purple-500/30 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>
            <div className="text-center mb-5">
              <h3 className="text-xl font-black text-yellow-500">{selectedPlan.name} Plan</h3>
              <p className="text-xs text-gray-500 mt-1">رقم بھیجیں اور اسکرین شاٹ لگائیں</p>
            </div>
            <div className="bg-black/30 p-4 rounded-2xl text-center mb-4 border border-white/5">
              <p className="text-[10px] text-gray-500 mb-1">نمبر: 03037264598</p>
              <button onClick={copyNumber} className="bg-yellow-500/20 text-yellow-500 text-[10px] px-4 py-1 rounded-full border border-yellow-500/30 mb-2">
                {copied ? "Copied ✅" : "Copy Number"}
              </button>
              <p className="text-[10px] text-gray-500">Ahmad Nafees Anjum</p>
              <p className="text-yellow-500 font-black text-lg mt-2">PKR {selectedPlan.pkr.toLocaleString()}</p>
            </div>
            <div className="space-y-3">
              <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-4 text-center cursor-pointer">
                <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                <p className="text-[10px] text-gray-500">{file ? `✅ ${file.name}` : "اسکرین شاٹ یہاں اپ لوڈ کریں"}</p>
              </div>
              <button onClick={handleConfirmDeposit} disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-sm transition-all ${loading ? 'bg-gray-700 opacity-50' : 'bg-yellow-500 text-[#0d0a1a] shadow-lg'}`}>
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
