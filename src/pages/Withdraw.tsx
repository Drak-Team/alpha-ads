import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profile } = await supabase.from('profiles').select('balance').eq('id', user.id).maybeSingle();
      if (profile) setBalance(profile.balance || 0);
    };
    fetchBalance();
  }, []);

  const handleWithdraw = async () => {
    if (!amount || !accountNumber) { alert("تمام معلومات درست طریقے سے پر کریں!"); return; }
    const numAmount = Number(amount);
    if (numAmount < 300) { alert("کم از کم رقم PKR 300 ہونی چاہیے"); return; }
    if (numAmount > balance) { alert(`بیلنس کم ہے! آپ کا بیلنس PKR ${balance} ہے۔`); return; }
    
    const fee = Math.round(numAmount * 0.10);
    const payout = numAmount - fee;
    
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");

      // Deduct balance immediately
      const { error: balErr } = await supabase.from('profiles')
        .update({ balance: balance - numAmount })
        .eq('id', user.id);
      if (balErr) throw balErr;

      const { error } = await supabase.from('withdrawals').insert({
        user_id: user.id, amount: numAmount, method, account_number: accountNumber,
        fee, payout, status: 'pending'
      });
      if (error) throw error;

      // Log transaction
      await supabase.from('transactions').insert({
        user_id: user.id, type: 'withdrawal', amount: numAmount,
        description: `Withdrawal request - PKR ${payout} (Fee: PKR ${fee}) via ${method}`
      });

      alert(`ودھرا ریکوسٹ موصول!\nرقم: PKR ${numAmount}\nفیس (10%): PKR ${fee}\nآپ کو ملے گا: PKR ${payout}\n12-24 گھنٹے میں منتقل ہو جائے گی۔ ✅`);
      navigate('/dashboard');
    } catch (error: any) {
      alert("خرابی: " + (error.message || "دوبارہ کوشش کریں"));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white p-5 pb-28">
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-4"><ArrowLeft size={22} /></button>
      <h2 className="text-2xl font-black text-yellow-500 mb-5 text-center">WITHDRAW</h2>

      {/* Balance Card */}
      <div className="bg-[#1a1035] p-4 rounded-2xl border border-purple-500/20 mb-5 text-center">
        <p className="text-[10px] text-gray-500">Available Balance</p>
        <p className="text-2xl font-black text-green-400">PKR {balance.toLocaleString()}</p>
      </div>

      <div className="flex gap-3 mb-5">
        <button onClick={() => setMethod('easypaisa')}
          className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all ${method === 'easypaisa' ? 'bg-green-600 border-yellow-500 scale-105' : 'bg-[#1a1035] border-purple-500/20 opacity-60'}`}>
          EasyPaisa
        </button>
        <button onClick={() => setMethod('jazzcash')}
          className={`flex-1 p-4 rounded-2xl border-2 font-bold transition-all ${method === 'jazzcash' ? 'bg-orange-600 border-yellow-500 scale-105' : 'bg-[#1a1035] border-purple-500/20 opacity-60'}`}>
          JazzCash
        </button>
      </div>

      <div className="bg-[#1a1035] p-6 rounded-3xl border border-purple-500/20 space-y-4">
        <div>
          <label className="text-[10px] text-yellow-500 font-bold uppercase mb-2 block">{method} Number</label>
          <input type="tel" placeholder="اکاؤنٹ نمبر" value={accountNumber} onChange={e => setAccountNumber(e.target.value)}
            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-yellow-500/50" />
        </div>
        <div>
          <label className="text-[10px] text-yellow-500 font-bold uppercase mb-2 block">Amount (PKR)</label>
          <input type="number" placeholder="رقم (PKR)" value={amount} onChange={e => setAmount(e.target.value)}
            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-yellow-500/50" />
          {amount && Number(amount) > 0 && (
            <div className="mt-2 bg-black/20 rounded-xl p-3 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">فیس (10%)</span>
                <span className="text-red-400">- PKR {Math.round(Number(amount) * 0.10)}</span>
              </div>
              <div className="flex justify-between text-[11px] border-t border-white/5 pt-1">
                <span className="text-gray-500">آپ کو ملے گا</span>
                <span className="text-green-400 font-bold">PKR {Number(amount) - Math.round(Number(amount) * 0.10)}</span>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleWithdraw} disabled={loading}
          className="w-full bg-yellow-500 text-[#0d0a1a] font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform disabled:opacity-50">
          {loading ? "Processing..." : "CONFIRM WITHDRAW"}
        </button>
      </div>

      <div className="mt-6 flex gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
        <AlertCircle className="text-blue-400 shrink-0" size={18} />
        <p className="text-[10px] text-blue-400/80 leading-relaxed">رقم 24 گھنٹوں کے اندر منتقل کر دی جائے گی۔ 10% سروس فیس لاگو ہوگی۔</p>
      </div>
    </div>
  );
};

export default Withdraw;
