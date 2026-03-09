import React, { useState, useEffect } from 'react';
import { Smartphone, Globe, ArrowLeft, History, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('easypaisa');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({ min_withdraw: 0.50, withdraw_fees: 5 });

  useEffect(() => {
    fetchUserData();
    fetchSettings();
    fetchHistory();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('balance').eq('id', user.id).single();
      if (data) setBalance(data.balance);
    }
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('admin_settings').select('*').single();
    if (data) setSettings(data);
  };

  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { data } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    if (data) setHistory(data);
  };

  const handleWithdraw = async () => {
    const numAmount = parseFloat(amount);
    if (numAmount < settings.min_withdraw) {
      alert(`کم از کم ودڈرا $${settings.min_withdraw} ہے`);
      return;
    }
    if (numAmount > balance) {
      alert("آپ کے پاس اتنا بیلنس نہیں ہے");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('withdrawals').insert({
      user_id: user?.id,
      amount: numAmount,
      method: method,
      account_number: accountNumber,
      account_name: accountName,
      status: 'pending'
    });

    if (!error) {
      alert("درخواست موصول ہو گئی ہے اور پینڈنگ میں ہے ✅");
      setAmount('');
      setAccountNumber('');
      setAccountName('');
      fetchHistory();
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu">رقم نکلوائیں</h2>
        <div className="w-10"></div>
      </div>

      {/* بیلنس اور فیس کارڈ */}
      <div className="bg-white/5 p-6 rounded-[32px] mb-8 text-center border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-yellow-600/20 text-yellow-500 text-[8px] font-bold rounded-bl-xl">
          Fees: {settings.withdraw_fees}%
        </div>
        <p className="text-[10px] opacity-60">دستیاب بیلنس</p>
        <h3 className="text-4xl font-black text-yellow-500">${balance.toFixed(2)}</h3>
        <p className="text-[9px] mt-2 text-white/40 italic">کم از کم ودڈرا: ${settings.min_withdraw}</p>
      </div>

      {/* میتھڈ سلیکشن */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { id: 'easypaisa', label: 'EasyPaisa' },
          { id: 'jazzcash', label: 'JazzCash' },
          { id: 'usdt', label: 'Binance ID' }
        ].map((m) => (
          <button 
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`py-4 rounded-2xl border flex flex-col items-center transition-all ${method === m.id ? 'bg-yellow-600 border-yellow-500 shadow-lg scale-105' : 'bg-white/5 border-white/10 opacity-40'}`}
          >
            {m.id === 'usdt' ? <Globe size={18} /> : <Smartphone size={18} />}
            <span className="text-[9px] font-bold mt-2 uppercase">{m.label}</span>
          </button>
        ))}
      </div>

      {/* فارم */}
      <div className="space-y-4 bg-black/30 p-6 rounded-[40px] border border-white/5 shadow-2xl mb-10">
        <div>
          <label className="text-[10px] block mb-2 opacity-60 pr-2">رقم (ڈالر میں)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-left font-bold" 
          />
        </div>
        
        <div>
          <label className="text-[10px] block mb-2 opacity-60 pr-2">اکاؤنٹ ہولڈر کا نام</label>
          <input 
            type="text" 
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="نام لکھیں" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none font-urdu" 
          />
        </div>

        <div>
          <label className="text-[10px] block mb-2 opacity-60 pr-2">
            {method === 'usdt' ? 'Binance ID / Address' : `${method} نمبر`}
          </label>
          <input 
            type="text" 
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="نمبر یا آئی ڈی" 
            className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-left" 
          />
        </div>

        <button 
          onClick={handleWithdraw}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 py-5 rounded-3xl font-bold font-urdu text-lg shadow-xl active:scale-95 transition-all mt-4"
        >
          ودڈرا کی درخواست بھیجیں
        </button>
      </div>

      {/* ہسٹری سیکشن */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <History size={16} className="text-yellow-500" />
          <h4 className="font-bold text-sm font-urdu">پچھلی ٹرانزیکشنز</h4>
        </div>

        <div className="space-y-3">
          {history.length === 0 ? (
            <p className="text-center text-[10px] opacity-30 py-10">کوئی ریکارڈ موجود نہیں</p>
          ) : (
            history.map((item: any) => (
              <div key={item.id} className="bg-white/5 border border-white/5 p-4 rounded-3xl flex justify-between items-center">
                <div className="text-left">
                  <p className="font-bold text-sm">${item.amount.toFixed(2)}</p>
                  <p className="text-[8px] opacity-40 uppercase">{item.method}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center gap-1 justify-end text-[10px] font-bold ${item.status === 'pending' ? 'text-orange-400' : 'text-green-400'}`}>
                    <span>{item.status === 'pending' ? 'پینڈنگ' : 'مکمل'}</span>
                    {item.status === 'pending' ? <Clock size={10} /> : <CheckCircle2 size={10} />}
                  </div>
                  <p className="text-[8px] opacity-40 mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
      
