import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, Send, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount || !accountNumber || !accountName) {
      alert("براہ کرم تمام معلومات درست طریقے سے پر کریں!");
      return;
    }

    if (Number(amount) < 1) { // آپ اپنی کم از کم حد یہاں سیٹ کر سکتے ہیں
      alert("کم از کم ودھرا $1 ہونا چاہیے");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");

      // سپا بیس میں ودھرا ریکوسٹ بھیجنا
      const { error } = await supabase
        .from('withdrawals') // اس نام کی ٹیبل سپا بیس میں ہونی چاہیے
        .insert({
          user_id: user.id,
          amount: Number(amount),
          method: method,
          account_number: accountNumber,
          account_name: accountName,
          status: 'pending'
        });

      if (error) throw error;

      alert("آپ کی ودھرا ریکوسٹ موصول ہو گئی ہے! 12 سے 24 گھنٹے میں رقم منتقل کر دی جائے گی۔");
      navigate('/dashboard');
    } catch (error) {
      alert("کچھ غلط ہو گیا، دوبارہ کوشش کریں!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-6 font-sans">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-6">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-black text-yellow-500 mb-6 text-center">WITHDRAW CASH</h2>

      {/* Payment Method Selector */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setMethod('easypaisa')} 
          className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${method === 'easypaisa' ? 'bg-green-600 border-yellow-500 shadow-lg scale-105' : 'bg-[#1a3a32] border-white/10 opacity-60'}`}
        >
          EasyPaisa
        </button>
        <button 
          onClick={() => setMethod('jazzcash')} 
          className={`flex-1 p-4 rounded-2xl border-2 transition-all font-bold ${method === 'jazzcash' ? 'bg-orange-600 border-yellow-500 shadow-lg scale-105' : 'bg-[#1a3a32] border-white/10 opacity-60'}`}
        >
          JazzCash
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4 bg-[#1a3a32] p-6 rounded-[35px] border border-white/10 shadow-2xl">
        <div>
          <label className="text-[10px] text-yellow-500 font-bold uppercase ml-2">Account Name</label>
          <input 
            type="text" 
            placeholder="نام لکھیں"
            className="w-full bg-[#042f24] border border-white/10 p-4 rounded-2xl focus:border-yellow-500 outline-none text-right font-urdu"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] text-yellow-500 font-bold uppercase ml-2">{method} Number</label>
          <input 
            type="number" 
            placeholder="اکاؤنٹ نمبر لکھیں"
            className="w-full bg-[#042f24] border border-white/10 p-4 rounded-2xl focus:border-yellow-500 outline-none"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>

        <div>
          <label className="text-[10px] text-yellow-500 font-bold uppercase ml-2">Amount ($)</label>
          <input 
            type="number" 
            placeholder="رقم (ڈالر میں) لکھیں"
            className="w-full bg-[#042f24] border border-white/10 p-4 rounded-2xl focus:border-yellow-500 outline-none"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <p className="text-[10px] text-green-400 mt-2 font-urdu text-right">موجودہ ریٹ: $1 = 300 PKR</p>
        </div>

        <button 
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full bg-yellow-500 text-[#042f24] font-black py-4 rounded-2xl mt-4 shadow-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : "CONFIRM WITHDRAW"}
        </button>
      </div>

      <div className="mt-8 flex gap-3 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
        <AlertCircle className="text-blue-500 shrink-0" size={20} />
        <p className="text-[10px] text-blue-500/80 font-urdu leading-relaxed">
          ودھرا کی رقم آپ کے دیے گئے اکاؤنٹ میں 24 گھنٹوں کے اندر منتقل کر دی جائے گی۔ براہ کرم معلومات دوبارہ چیک کر لیں۔
        </p>
      </div>
    </div>
  );
};

export default Withdraw;
