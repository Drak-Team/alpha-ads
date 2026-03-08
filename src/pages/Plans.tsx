import React, { useState } from 'react';

const Plans = () => {
  const [copied, setCopied] = useState(false);

  const copyNumber = () => {
    navigator.clipboard.writeText("03037264598");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans">
      <h2 className="text-xl font-bold text-center text-yellow-500 mb-6">انویسٹمنٹ پلانز</h2>

      {/* پیمنٹ سیکشن */}
      <div className="bg-black/30 p-5 rounded-2xl border border-yellow-500/20 text-center mb-6">
        <p className="text-xs mb-2 opacity-70">ایزی پیسہ / جیز کیش پر رقم بھیجیں</p>
        <div className="flex items-center justify-center gap-3 bg-white/10 p-3 rounded-lg border border-white/10">
          <span className="text-lg font-bold">03037264598</span>
          <button onClick={copyNumber} className="bg-yellow-600 text-[10px] px-3 py-1 rounded-md">
            {copied ? "کاپی ہو گیا" : "کاپی کریں"}
          </button>
        </div>
        <p className="text-[10px] mt-2 opacity-60">نام: Ahmad Nafees Anjum</p>
      </div>

      {/* اسکرین شاٹ اپلوڈ */}
      <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
        <p className="text-sm font-bold mb-4 text-center">پیمنٹ کا ثبوت (اسکرین شاٹ) یہاں ڈالیں</p>
        <input type="file" className="text-[10px] w-full mb-4 bg-emerald-900/50 p-2 rounded-lg" accept="image/*" />
        <button className="w-full bg-green-600 py-3 rounded-xl font-bold shadow-lg text-sm">ڈپوزٹ کی درخواست بھیجیں</button>
      </div>

      <p className="text-[9px] mt-6 opacity-50 text-center italic">جیسے ہی آپ اسکرین شاٹ بھیجیں گے، ایڈمن اسے چیک کر کے آپ کا پلان ایکٹیو کر دے گا۔</p>
    </div>
  );
};

export default Plans;
