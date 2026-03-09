import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Settings, Save, Percent, Wallet, ArrowDownCircle, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    referral_commission: 15, // فیصد میں
    min_withdraw: 500,       // روپے میں
    withdraw_fees: 5,        // فیصد میں
    ad_reward: 0.50          // ایک ایڈ کے پیسے
  });

  // پیج لوڈ ہوتے ہی ڈیٹا بیس سے سیٹنگز لانے کے لیے
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('admin_settings')
          .select('*')
          .eq('id', 1)
          .single();
        
        if (data) {
          setSettings({
            referral_commission: data.referral_commission,
            min_withdraw: data.min_withdraw,
            withdraw_fees: data.withdraw_fees,
            ad_reward: data.ad_reward
          });
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // سیٹنگز کو ڈیٹا بیس میں محفوظ کرنے کے لیے
  const handleSave = async () => {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({ 
        id: 1, 
        referral_commission: settings.referral_commission,
        min_withdraw: settings.min_withdraw,
        withdraw_fees: settings.withdraw_fees,
        ad_reward: settings.ad_reward,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      alert("ایرر: " + error.message);
    } else {
      alert("سیٹنگز کامیابی سے محفوظ ہو گئی ہیں! ✅");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20 text-yellow-500">
        <RefreshCw className="animate-spin mr-2" />
        <span className="font-urdu">لوڈنگ ہو رہی ہے...</span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black/20 rounded-[40px] border border-white/5 font-urdu text-right">
      <div className="flex items-center justify-end gap-3 mb-8">
        <h3 className="text-xl font-bold text-yellow-500">ایپ کنٹرول سیٹنگز</h3>
        <Settings className="text-yellow-500" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* ریفرل کمیشن */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2 text-right">ریفرل کمیشن (%)</label>
          <div className="flex items-center gap-3">
            <Percent size={16} className="text-purple-400" />
            <input 
              type="number" 
              value={settings.referral_commission}
              onChange={(e) => setSettings({...settings, referral_commission: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none text-white"
            />
          </div>
        </div>

        {/* کم از کم ودڈرا */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2 text-right">کم از کم ودڈرا (PKR)</label>
          <div className="flex items-center gap-3">
            <Wallet size={16} className="text-green-400" />
            <input 
              type="number" 
              value={settings.min_withdraw}
              onChange={(e) => setSettings({...settings, min_withdraw: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none text-white"
            />
          </div>
        </div>

        {/* ودڈرا فیس */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2 text-right">ودڈرا فیس (%)</label>
          <div className="flex items-center gap-3">
            <ArrowDownCircle size={16} className="text-red-400" />
            <input 
              type="number" 
              value={settings.withdraw_fees}
              onChange={(e) => setSettings({...settings, withdraw_fees: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none text-white"
            />
          </div>
        </div>

        {/* ایڈ ریوارڈ */}
        <div className="bg-white/5 p-4 rounded-2xl">
          <label className="text-[10px] opacity-50 block mb-2 text-right">ایک ایڈ کی قیمت (PKR)</label>
          <div className="flex items-center gap-3">
            <RefreshCw size={16} className="text-blue-400" />
            <input 
              type="number" 
              step="0.01"
              value={settings.ad_reward}
              onChange={(e) => setSettings({...settings, ad_reward: Number(e.target.value)})}
              className="bg-transparent border-b border-white/20 w-full text-left font-bold py-1 focus:outline-none text-white"
            />
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="bg-yellow-600 hover:bg-yellow-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all mt-4 text-white"
        >
          <Save size={18} /> سیٹنگز محفوظ کریں
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

const AdminWithdrawals = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from('withdrawals')
      .select('*, profiles(full_name)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('withdrawals')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      alert(`درخواست ${newStatus === 'completed' ? 'مکمل' : 'کینسل'} کر دی گئی ہے!`);
      fetchRequests(); // لسٹ اپ ڈیٹ کریں
    }
  };

  return (
    <div className="mt-10 p-6 bg-black/20 rounded-[40px] border border-white/5 font-urdu text-right">
      <h3 className="text-xl font-bold text-green-500 mb-6 flex items-center justify-end gap-2">
        ودڈرا کی درخواستیں <Clock size={20} />
      </h3>

      {requests.length === 0 ? (
        <p className="text-center opacity-30 py-10">فی الحال کوئی نئی درخواست نہیں ہے</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-yellow-600/20 text-yellow-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  {req.method}
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{req.account_name}</p>
                  <p className="text-[10px] opacity-50">{req.account_number}</p>
                </div>
              </div>

              <div className="flex justify-between items-center bg-black/20 p-3 rounded-2xl mb-4 text-left">
                <p className="text-xs opacity-50">رقم بھیجیں:</p>
                <p className="text-lg font-black text-green-400">PKR {req.amount * 280} <span className="text-[8px] text-white/30">($ {req.amount})</span></p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus(req.id, 'completed')}
                  className="flex-1 bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button 
                  onClick={() => updateStatus(req.id, 'rejected')}
                  className="flex-1 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminWithdrawals;
