import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
          A
        </div>
        <h2 className="text-xl font-bold">Ahmad Nafees Anjum</h2>
        <p className="text-xs opacity-60">03037264598</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between">
          <span>ٹوٹل کمائی</span>
          <span className="text-yellow-500 font-bold">$0.00</span>
        </div>
        
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <button className="w-full bg-yellow-600 py-3 rounded-xl font-bold text-sm mb-2">رقم نکلوائیں (Withdraw)</button>
          <div className="flex justify-between text-[10px] opacity-60 px-2">
            <span>کم سے کم: 50 PKR</span>
            <span>ریٹ: 1$ = 280 PKR</span>
          </div>
        </div>

        <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-3 rounded-xl font-bold text-sm mt-10">
          لاگ آؤٹ
        </button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-[10px] opacity-40">Dollar Plus Ads & Earn v1.0</p>
      </div>
    </div>
  );
};

export default Profile;
