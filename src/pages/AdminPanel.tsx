import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Settings, Save, Percent, Wallet, ArrowDownCircle } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    referral_commission: 15, // فیصد میں
    min_withdraw: 500,       // روپے میں
    withdraw_fees: 5,        // فیصد میں
    ad_reward: 0.50          // ایک ایڈ کے پیسے
  });

  const handleSave = async () => {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ id: 1, ...settings });
    
    if (!error) alert("سیٹنگز محفوظ ہو گئی ہیں!");
  };

  return (
    <div className="p-6 bg-black/20 rounded-[40px] border border-white/5 font-urdu text-right">
      <div className="flex items-center justify-end gap-3 mb-8">
        <h3 className="text-xl font-bold text-yellow-500">ایپ کنٹرول سیٹنگز</h3>
        <Settings className="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ریفرل کمیشن */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2">ریفرل کمیشن (%)</label>
          <div className="flex items-center gap-3">
            <Percent size={16} className="text-purple-400" />
            <input 
              type="number" 
              value={settings.referral_commission}
              onChange={(e) => setSettings({...settings, referral_commission: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none"
            />
          </div>
        </div>

        {/* کم از کم ودڈرا */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2">کم از کم ودڈرا (PKR)</label>
          <div className="flex items-center gap-3">
            <Wallet size={16} className="text-green-400" />
            <input 
              type="number" 
              value={settings.min_withdraw}
              onChange={(e) => setSettings({...settings, min_withdraw: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none"
            />
          </div>
        </div>

        {/* ودڈرا فیس */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2">ودڈرا فیس (%)</label>
          <div className="flex items-center gap-3">
            <ArrowDownCircle size={16} className="text-red-400" />
            <input 
              type="number" 
              value={settings.withdraw_fees}
              onChange={(e) => setSettings({...settings, withdraw_fees: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="bg-yellow-600 hover:bg-yellow-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all mt-4"
        >
          <Save size={18} /> سیٹنگز سیو کریں
        </button>
      </div>
    </div>
  );
};
