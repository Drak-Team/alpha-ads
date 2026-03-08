import React from 'react';
import { User, LogOut, Settings, ShieldCheck } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-white/10 shadow-2xl text-4xl font-bold text-white">
          A
        </div>
        <h2 className="text-xl font-bold">احمد نفیس انجم</h2>
        <p className="text-xs opacity-50">03037264598</p>
      </div>

      <div className="space-y-3">
        <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between border border-white/5">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="text-sm font-urdu">اکاؤنٹ سٹیٹس: ایکٹیو</span>
        </div>
        <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between border border-white/5">
          <Settings size={18} className="opacity-50" />
          <span className="text-sm font-urdu">سیٹنگز</span>
        </div>
        <button className="w-full bg-red-600/20 text-red-500 p-4 rounded-2xl flex items-center justify-between border border-red-500/10 mt-6">
          <LogOut size={18} />
          <span className="text-sm font-bold font-urdu">لاگ آؤٹ کریں</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
