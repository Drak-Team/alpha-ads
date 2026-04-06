import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || !accountNumber) { alert("تمام معلومات درست طریقے سے پر کریں!"); return; }
    if (Number(amount) < 300) { alert("کم از کم ودھرا PKR 300 ہونا چاہیے"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");
      const { error } = await supabase.from('withdrawals').insert({
        user_id: user.id, amount: Number(amount), method, account_number: accountNumber,
        fee: 0, payout: Number(amount), status: 'pending'
      });
      if (error) throw error;
      alert("ودھرا ریکوسٹ موصول! 12-24 گھنٹے میں رقم منتقل ہو جائے گی۔ ✅");
      navigate('/dashboard');
    } catch (error: any) {
      alert("خرابی: " + (error.message || "دوبارہ کوشش کریں"));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white p-5 pb-28">
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-4"><ArrowLeft size={22} /></button>
      <h2 className="text-2xl font-black text-yellow-500 mb-5 text-center">WITHDRAW</h2>

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
        </div>
        <button onClick={handleWithdraw} disabled={loading}
          className="w-full bg-yellow-500 text-[#0d0a1a] font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform disabled:opacity-50">
          {loading ? "Processing..." : "CONFIRM WITHDRAW"}
        </button>
      </div>

      <div className="mt-6 flex gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
        <AlertCircle className="text-blue-400 shrink-0" size={18} />
        <p className="text-[10px] text-blue-400/80 leading-relaxed">رقم 24 گھنٹوں کے اندر منتقل کر دی جائے گی۔</p>
      </div>
    </div>
  );
};

export default Withdraw;
