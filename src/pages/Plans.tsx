import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    { name: "Basic", price: 2, pkr: 600, daily: 0.20, limit: 1200 },
    { name: "Standard", price: 4, pkr: 1200, daily: 0.45, limit: 2400 },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.70, limit: 3600 },
    { name: "Gold", price: 10, pkr: 3000, daily: 1.20, limit: 6000 },
    { name: "Platinum", price: 20, pkr: 6000, daily: 2.50, limit: 12000 },
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
      // 1. اسکرین شاٹ کو سپا بیس اسٹوریج میں اپ لوڈ کرنا
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `screenshots/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. ڈپازٹ کی تفصیلات ڈیٹا بیس میں محفوظ کرنا
      const { error: dbError } = await supabase
        .from('deposits')
        .insert({
          plan_name: selectedPlan.name,
          amount_pkr: selectedPlan.pkr,
          screenshot_url: fileName,
          status: 'pending'
        });

      if (dbError) throw dbError;

      alert("آپ کی درخواست موصول ہوگئی ہے! ایڈمن جلد تصدیق کرے گا۔");
      setSelectedPlan(null);
      setFile(null);

    } catch (error) {
      alert("خرابی: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans text-right">
      <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6 font-urdu">انویسٹمنٹ پلانز</h2>
      
      {/* تمام پلانز کی لسٹ */}
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-lg font-bold text-white">{plan.name} Plan</h3>
              <p className="text-yellow-500 font-bold text-sm">${plan.price} ({plan.pkr} PKR)</p>
              <div className="mt-1 text-[9px] opacity-60">
                <p>روزانہ آمدنی: ${plan.daily}</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedPlan(plan)}
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl font-bold text-[10px]"
            >
              ایکٹیو کریں
            </button>
          </div>
        ))}
      </div>

      {/* پیمنٹ پاپ اپ ونڈو */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-5 z-50 overflow-y-auto">
          <div className="bg-emerald-900 border border-yellow-500/30 w-full max-w-sm rounded-3xl p-6 relative shadow-2xl my-auto">
            <button onClick={() => setSelectedPlan(null)} className="absolute top-4 left-4 text-xl opacity-50">✕</button>

            <h3 className="text-xl font-bold text-center text-yellow-500 mb-2 font-urdu">{selectedPlan.name} پلان</h3>
            <p className="text-center text-xs opacity-80 mb-6">آپ کو <span className="font-bold text-white text-sm">{selectedPlan.pkr} PKR</span> بھیجنے ہوں گے۔</p>

            {/* ایزی پیسہ جاز کیش نمبر */}
            <div className="bg-black/30 p-4 rounded-2xl text-center mb-6">
              <p className="text-[10px] mb-2 opacity-60">ایزی پیسہ / جیز کیش</p>
              <div className="flex items-center justify-center gap-2">
                <button onClick={copyNumber} className="bg-yellow-600 text-[10px] px-3 py-1 rounded-lg">
                  {copied ? "کاپی ہوا" : "کاپی کریں"}
                </button>
                <span className="text-lg font-bold">03037264598</span>
              </div>
              <p className="text-[10px] mt-2 opacity-60 font-urdu">نام: Ahmad Nafees Anjum</p>
            </div>

            {/* اپ لوڈ سیکشن */}
            <div className="space-y-4">
              <p className="text-[10px] text-center opacity-80 font-urdu">پیمنٹ کا اسکرین شاٹ یہاں لگائیں:</p>
              <input 
                type="file" 
                onChange={(e) => setFile(e.target.files[0])}
                className="text-[10px] w-full bg-black/20 p-2 rounded-lg border border-white/10" 
                accept="image/*" 
              />
              <button 
                onClick={handleConfirmDeposit}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-bold text-md shadow-lg transition-all ${loading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
              >
                {loading ? "انتظار کریں..." : "ڈپوزٹ کنفرم کریں"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
