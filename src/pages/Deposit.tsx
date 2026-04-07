import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Upload, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

const Deposit = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const myNumber = "03037264598";
  const binanceId = "319230893";

  const copyToClipboard = (text: string, field = 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDeposit = async () => {
    if (!file) { alert("براہ کرم اسکرین شاٹ اپ لوڈ کریں!"); return; }
    if (!amount || Number(amount) <= 0) { alert("براہ کرم رقم درج کریں!"); return; }
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("لاگ ان ہونا ضروری ہے");
      const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('deposits').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('deposits').getPublicUrl(fileName);
      const { error: dbError } = await supabase.from('deposits').insert([{
        user_id: user.id, amount: Number(amount), transaction_id: transactionId || null,
        screenshot_url: publicUrl, status: 'pending'
      }]);
      if (dbError) throw dbError;
      alert("درخواست موصول ہو گئی! 24 گھنٹے میں تصدیق ہو جائے گی۔ ✅");
      navigate('/dashboard');
    } catch (error: any) {
      alert("خرابی: " + (error.message || "دوبارہ کوشش کریں"));
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white p-5 pb-28">
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-4"><ArrowLeft size={22} /></button>
      <h2 className="text-2xl font-black text-yellow-500 mb-5 text-center">DEPOSIT</h2>

      <div className="bg-[#1a1035] p-5 rounded-3xl border border-purple-500/20 mb-5">
        <p className="text-gray-500 text-xs mb-3 text-center">نیچے دیے گئے نمبر پر رقم بھیجیں</p>
        <div className="bg-black/30 p-4 rounded-2xl flex justify-between items-center border border-purple-500/10 mb-3">
          <div>
            <p className="text-[10px] text-yellow-500 font-bold">EasyPaisa / JazzCash</p>
            <p className="text-lg font-mono font-bold tracking-widest">{myNumber}</p>
            <p className="text-[10px] text-gray-600">Ahmad Nafees Anjum</p>
          </div>
          <button onClick={() => copyToClipboard(myNumber)} className="bg-yellow-500 text-[#0d0a1a] p-3 rounded-xl">
            {copiedField === 'phone' ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <div className="bg-black/30 p-4 rounded-2xl flex justify-between items-center border border-yellow-500/10">
          <div>
            <p className="text-[10px] text-yellow-500 font-bold">Binance ID (USDT)</p>
            <p className="text-lg font-mono font-bold tracking-widest">{binanceId}</p>
            <p className="text-[10px] text-gray-600">Crypto Deposit</p>
          </div>
          <button onClick={() => copyToClipboard(binanceId, 'binance')} className="bg-yellow-500 text-[#0d0a1a] p-3 rounded-xl">
            {copiedField === 'binance' ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      <div className="bg-[#1a1035] p-6 rounded-3xl border border-purple-500/20">
        <div className="mb-4">
          <label className="text-[10px] text-yellow-500 font-bold mb-2 block">Amount (PKR)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="مثلاً 1000"
            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-yellow-500/50" />
        </div>
        <div className="mb-4">
          <label className="text-[10px] text-yellow-500 font-bold mb-2 block">Transaction ID (Optional)</label>
          <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="TRX-123456"
            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl font-mono focus:outline-none focus:border-yellow-500/50" />
        </div>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500/20 rounded-2xl p-8 cursor-pointer hover:border-yellow-500/50 transition-all">
          <Upload className="text-yellow-500 mb-2" size={28} />
          <span className="text-xs text-gray-500">{file ? `✅ ${file.name}` : "Screenshot upload کریں"}</span>
          <input type="file" className="hidden" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
        </label>
        <button onClick={handleDeposit} disabled={loading}
          className="w-full bg-yellow-500 text-[#0d0a1a] font-black py-4 rounded-2xl mt-6 shadow-lg active:scale-95 transition-transform disabled:opacity-50">
          {loading ? "Processing..." : "SUBMIT DEPOSIT"}
        </button>
      </div>

      <div className="mt-6 flex gap-3 p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
        <AlertCircle className="text-yellow-500 shrink-0" size={18} />
        <p className="text-[10px] text-yellow-500/80 leading-relaxed">غلط اسکرین شاٹ اپ لوڈ کرنے پر اکاؤنٹ بلاک ہو جائے گا۔</p>
      </div>
    </div>
  );
};

export default Deposit;
