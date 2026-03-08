import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans">
      {/* یوزر پروفائل ہیڈر */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-lg">
          A
        </div>
        <h2 className="text-xl font-bold">Ahmad Nafees Anjum</h2>
        <p className="text-[10px] opacity-60">ID: 03037264598</p>
      </div>

      {/* بیلنس اور ودڈرا کارڈ */}
      <div className="space-y-4">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 flex justify-between items-center shadow-md">
          <span className="text-sm">ٹوٹل بیلنس</span>
          <span className="text-yellow-500 font-extrabold text-lg">$0.00</span>
        </div>
        
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-md">
          <button className="w-full bg-yellow-600 hover:bg-yellow-500 py-4 rounded-xl font-bold text-sm mb-3 transition-colors">
            رقم نکلوائیں (Withdraw)
          </button>
          <div className="flex justify-between text-[9px] opacity-70 px-1">
            <span>کم سے کم ودڈرا: 50 PKR</span>
            <span>ریٹ: 1$ = 280 PKR</span>
          </div>
        </div>

        {/* لاگ آؤٹ بٹن */}
        <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl font-bold text-xs mt-12 transition-all">
          لاگ آؤٹ کریں
        </button>
      </div>

      <div className="mt-12 text-center">
        <p className="text-[9px] opacity-30 italic">Powered by Dollar Plus Ads & Earn</p>
      </div>
    </div>
  );
};

export default Profile;
