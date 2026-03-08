import React, { useState } from 'react';

const Plans = () => {
  const [copied, setCopied] = useState(false);

  // تمام پیکجز کی لسٹ
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

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans">
      <h2 className="text-2xl font-bold text-center text-yellow-500 mb-6">انویسٹمنٹ پلانز</h2>
      
      {/* 1. تمام پیکجز کی نمائش */}
      <div className="space-y-4 mb-10">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-lg font-bold text-white">{plan.name} Plan</h3>
              <p className="text-yellow-500 font-bold text-sm">${plan.price} ({plan.pkr} PKR)</p>
              <div className="mt-1 text-[9px] opacity-60">
                <p>روزانہ آمدنی: ${plan.daily}</p>
                <p>کل آمدنی کی حد: {plan.limit} PKR</p>
              </div>
            </div>
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold text-[10px] transition-all">
              ایکٹیو کریں
            </button>
          </div>
        ))}
      </div>

      {/* 2. پیمنٹ کا طریقہ (کاپی بٹن کے ساتھ) */}
      <div className="bg-black/40 p-5 rounded-2xl border border-yellow-500/30 text-center mb-6 shadow-xl">
        <p className="text-xs mb-3 opacity-80">ایزی پیسہ / جیز کیش پر رقم بھیجیں</p>
        <div className="flex items-center justify-center gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
          <span className="text-lg font-extrabold tracking-wider">03037264598</span>
          <button 
            onClick={copyNumber} 
            className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all ${copied ? 'bg-green-600' : 'bg-yellow-600'}`}
          >
            {copied ? "کاپی ہو گیا" : "کاپی کریں"}
          </button>
        </div>
        <p className="text-[10px] mt-2 opacity-50">نام: Ahmad Nafees Anjum</p>
      </div>

      {/* 3. اسکرین شاٹ اپ لوڈ سیکشن */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
        <p className="text-sm font-bold mb-4 text-center">پیمنٹ کا ثبوت (اسکرین شاٹ) اپ لوڈ کریں</p>
        <div className="bg-emerald-900/30 p-4 rounded-xl border border-dashed border-white/20 text-center">
          <input type="file" className="text-[10px] w-full mb-4" accept="image/*" />
          <button className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold text-sm shadow-lg transition-all">
            ڈپوزٹ کی درخواست بھیجیں
          </button>
        </div>
      </div>

      <p className="text-[9px] mt-6 opacity-40 text-center italic leading-relaxed">
        نوٹ: رقم بھیجنے کے بعد اسکرین شاٹ اپ لوڈ کریں۔ ایڈمن 1 سے 2 گھنٹے میں آپ کا پلان ایکٹیو کر دے گا۔
      </p>
    </div>
  );
};

export default Plans;
