import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Star, ShieldCheck, Gem, Crown, Sparkles, X, Copy, Check } from 'lucide-react';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    { name: "Basic", price: 2, pkr: 600, daily: 0.20, icon: <Star className="text-yellow-400" />, emoji: "⭐", color: "from-yellow-500/10" },
    { name: "Standard", price: 4, pkr: 1200, daily: 0.45, icon: <ShieldCheck className="text-blue-400" />, emoji: "🛡️", color: "from-blue-500/10" },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.70, icon: <Sparkles className="text-gray-300" />, emoji: "🥈", color: "from-gray-300/10" },
    { name: "Gold", price: 10, pkr: 3000, daily: 1.20, icon: <Gem className="text-yellow-500 animate-pulse" />, emoji: "✨", color: "from-yellow-600/20" },
    { name: "Platinum", price: 20, pkr: 6000, daily: 2.50, icon: <Crown className="text-orange-400" />, emoji: "👑", color: "from-orange-500/20" },
  ];

  const copyNumber = () => {
    navigator.clipboard.writeText("03037264598");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmDeposit = async () => {
    if (!file) {
      alert("براہ کرم ادائیگی کا اسکرین شاٹ اپ لوڈ کریں");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('deposits')
        .insert({
          user_id: user?.id,
          plan_name: selectedPlan.name,
          amount_pkr: selectedPlan.pkr,
          screenshot_url: fileName,
          status: 'pending'
        });

      if (dbError) throw dbError;

      alert("درخواست موصول ہوگئی ہے! ایڈمن جلد تصدیق کرے گا۔ ✅");
      setSelectedPlan(null);
      setFile(null);

    } catch (error: any) {
      alert("خرابی: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans text-right">
      <div className="text-center mb-8 pt-4">
        <h2 className="text-3xl font-black text-yellow-500 italic">GOLD PLUS</h2>
        <p className="text-[10px] font-urdu opacity-60">بہترین انویسٹمنٹ، بہترین منافع</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative overflow-hidden bg-gradient-to-l ${plan.color} to-white/5 border border-white/10 p-5 rounded-[32px] flex justify-between items-center shadow-xl`}>
            <div className="absolute -right-2 -top-2 text-6xl opacity-5 rotate-12">{plan.emoji}</div>
            <div className="z-10 text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <h3 className="text-lg font-black">{plan.name} Plan</h3>
                {plan.icon}
              </div>
              <p className="text-yellow-500 font-black text-lg">${plan.price} <span className="text-[10px] opacity-60">({plan.pkr} PKR)</span></p>
              <p className="text-[10px] opacity-70 font-urdu mt-1">روزانہ آمدنی: ${plan.daily}</p>
            </div>
            <button onClick={() => setSelectedPlan(plan)} className="z-10 bg-yellow-600 text-[#064e3b] px-5 py-2 rounded-xl font-black text-[10px] shadow-lg">ایکٹیو کریں</button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-5 z-50 backdrop-blur-sm">
          <div className="bg-[#064e3b] border-2 border-yellow-500/50 w-full max-w-sm rounded-[40px] p-8 relative shadow-2xl">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-6 left-6 opacity-40"><X size={24}/></button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-yellow-500 font-urdu">{selectedPlan.name} پلان</h3>
              <p className="text-xs opacity-60 mt-1">رقم بھیجیں اور اسکرین شاٹ لگائیں</p>
            </div>
            <div className="bg-black/30 p-5 rounded-3xl text-center mb-6 border border-white/5 font-urdu">
              <p className="text-[10px] mb-2 opacity-50">نمبر: 03037264598</p>
              <button onClick={copyNumber} className="bg-yellow-600/20 text-yellow-500 text-[10px] px-4 py-1 rounded-full border border-yellow-500/30 mb-2">
                {copied ? "کاپی ہوا" : "نمبر کاپی کریں"}
              </button>
              <p className="text-[11px] opacity-70">نام: Ahmad Nafees Anjum</p>
            </div>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-[10px] mb-4" accept="image/*" />
            <button onClick={handleConfirmDeposit} disabled={loading} className={`w-full py-4 rounded-2xl font-black text-lg ${loading ? 'bg-gray-700' : 'bg-green-600'}`}>
              {loading ? "انتظار کریں..." : "کنفرم کریں"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
