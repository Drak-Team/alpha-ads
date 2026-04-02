import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Upload, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Deposit = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  
  const myNumber = "03037264598"; 

  const copyNumber = () => {
    navigator.clipboard.writeText(myNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    if (!file) {
      alert("براہ کرم ادائیگی کا اسکرین شاٹ اپ لوڈ کریں!");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("براہ کرم رقم درج کریں!");
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('deposits')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('deposits').getPublicUrl(fileName);
      
      const { error: dbError } = await supabase
        .from('deposits')
        .insert([{
          user_id: user.id,
          amount: Number(amount),
          transaction_id: transactionId || null,
          screenshot_url: publicUrl,
          status: 'pending'
        }]);

      if (dbError) throw dbError;

      alert("درخواست موصول ہو گئی ہے! 24 گھنٹے میں تصدیق کر دی جائے گی۔");
      navigate('/dashboard');
    } catch (error: any) {
      alert("کچھ غلط ہو گیا: " + (error.message || "دوبارہ کوشش کریں"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-6 font-sans">
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-6">
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-2xl font-black text-yellow-500 mb-6 text-center">DEPOSIT CASH</h2>

      <div className="bg-[#1a3a32] p-6 rounded-[35px] border border-white/10 mb-6 shadow-2xl">
        <p className="text-gray-400 text-xs mb-4 text-center font-urdu">نیچے دیے گئے نمبر پر رقم بھیج کر اسکرین شاٹ اپ لوڈ کریں</p>
        
        <div className="bg-[#042f24] p-4 rounded-2xl flex justify-between items-center border border-yellow-500/20">
          <div>
            <p className="text-[10px] text-yellow-500 font-bold">EasyPaisa / JazzCash</p>
            <p className="text-lg font-mono font-bold tracking-widest">{myNumber}</p>
            <p className="text-[10px] opacity-50">Ahmad Nafees Anjum</p>
          </div>
          <button onClick={copyNumber} className="bg-yellow-500 text-[#042f24] p-3 rounded-xl">
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <div className="bg-[#1a3a32] p-8 rounded-[35px] border border-white/10">
        {/* Amount Input */}
        <div className="mb-4">
          <label className="text-[10px] text-yellow-500 font-bold mb-2 block">رقم (PKR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="مثلاً 1000"
            className="w-full bg-[#042f24] border border-white/10 p-4 rounded-2xl text-white text-right focus:outline-none focus:border-yellow-500/50"
          />
        </div>

        {/* Transaction ID Input */}
        <div className="mb-4">
          <label className="text-[10px] text-yellow-500 font-bold mb-2 block">ٹرانزیکشن آئی ڈی (اختیاری)</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="TRX-123456"
            className="w-full bg-[#042f24] border border-white/10 p-4 rounded-2xl text-white text-left font-mono focus:outline-none focus:border-yellow-500/50"
          />
        </div>

        {/* Screenshot Upload */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-[25px] p-10 cursor-pointer hover:border-yellow-500/50 transition-all">
          <Upload className="text-yellow-500 mb-2" size={32} />
          <span className="text-xs font-urdu">{file ? file.name : "اسکرین شاٹ یہاں اپ لوڈ کریں"}</span>
          <input type="file" className="hidden" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>

        <button 
          onClick={handleDeposit}
          disabled={loading}
          className="w-full bg-yellow-500 text-[#042f24] font-black py-4 rounded-2xl mt-8 shadow-xl active:scale-95 transition-transform disabled:opacity-50"
        >
          {loading ? "PROCESSING..." : "SUBMIT DEPOSIT"}
        </button>
      </div>
      
      <div className="mt-8 flex gap-3 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
        <AlertCircle className="text-yellow-500 shrink-0" size={20} />
        <p className="text-[10px] text-yellow-500/80 font-urdu leading-relaxed">
          غلط یا جعلی اسکرین شاٹ اپ لوڈ کرنے پر آپ کا اکاؤنٹ مستقل طور پر بلاک کر دیا جائے گا۔
        </p>
      </div>
    </div>
  );
};

export default Deposit;
