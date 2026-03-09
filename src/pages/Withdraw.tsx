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
      if (data) setBalance(data.balance || 0);
    }
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('admin_settings').select('*').eq('id', 1).single();
    if (data) setSettings(data);
  };

  const fetchHistory = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setHistory(data);
  };

  const handleWithdraw = async () => {
    if (!amount || !accountNumber || !accountName) {
      alert("براہ کرم تمام خانے پُر کریں");
      return;
    }

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
    
    // 1. ودڈرا ٹیبل میں انٹری کریں
    const { error } = await supabase.from('withdrawals').insert({
      user_id: user?.id,
      amount: numAmount,
      method: method,
      account_number: accountNumber,
      account_name: accountName,
      status: 'pending'
    });

    if (!error) {
      // 2. یوزر کے بیلنس سے رقم کاٹیں
      await supabase.from('profiles').update({ 
        balance: balance - numAmount 
      }).eq('id', user?.id);

      alert("درخواست موصول ہو گئی ہے اور پینڈنگ میں ہے ✅");
      setAmount('');
      setAccountNumber('');
      setAccountName('');
      fetchUserData();
      fetchHistory();
    } else {
      alert("کچھ غلطی ہوئی ہے: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu italic">GOLD PLUS</h2>
        <div className="w-10"></div>
      </div>

      <div className="bg-white/5 p-6 rounded-[32px] mb-8 text-center border border-white/10 relative">
        <div className="absolute top-0 left-0 p-2 bg-yellow-600/20 text-yellow-500 text-[8px] font-bold rounded-br-xl">
          Fees: {settings.withdraw_fees}%
        </div>
        <p className="text-[10px] opacity-60">دستیاب بیلنس</p>
        <h3 className="text-4xl font-black text-yellow-500">${balance.toFixed(2)}</h3>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[{ id: 'easypaisa', l: 'EasyPaisa' }, { id: 'jazzcash', l: 'JazzCash' }, { id: 'usdt', l: 'Binance' }].map((m) => (
          <button key={m.id} onClick={() => setMethod(m.id)} className={`py-4 rounded-2xl border flex flex-col items-center transition-all ${method === m.id ? 'bg-yellow-600 border-yellow-500' : 'bg-white/5 border-white/10 opacity-40'}`}>
            {m.id === 'usdt' ? <Globe size={18} /> : <Smartphone size={18} />}
            <span className="text-[8px] font-bold mt-2 uppercase">{m.l}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4 bg-black/30 p-6 rounded-[40px] border border-white/5 mb-10">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="رقم (ڈالر میں)" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-left" />
        <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="اکاؤنٹ ہولڈر کا نام" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-right font-urdu" />
        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="نمبر یا آئی ڈی" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-left" />
        <button onClick={handleWithdraw} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 py-5 rounded-3xl font-bold font-urdu text-lg shadow-xl active:scale-95 transition-all text-[#064e3b]">درخواست بھیجیں</button>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-sm font-urdu mb-4 text-center">ودڈرا ہسٹری</h4>
        {history.length === 0 ? <p className="text-center text-[10px] opacity-30 py-5">کوئی ریکارڈ نہیں</p> : 
          history.map((item: any) => (
            <div key={item.id} className="bg-white/5 border border-white/5 p-4 rounded-3xl flex justify-between items-center mb-3">
              <div className="text-left">
                <p className="font-bold text-sm">${item.amount.toFixed(2)}</p>
                <p className="text-[8px] opacity-40 uppercase">{item.method}</p>
              </div>
              <div className="text-right">
                <p className={`text-[10px] font-bold ${item.status === 'pending' ? 'text-orange-400' : 'text-green-400'}`}>
                  {item.status === 'pending' ? 'پینڈنگ' : 'مکمل'}
                </p>
                <p className="text-[8px] opacity-40">{new Date(item.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Withdraw;
      
