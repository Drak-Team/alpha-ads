import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Upload } from 'lucide-react';

const Deposit = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'easypaisa' | 'jazzcash'>('easypaisa');
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const numbers = {
    easypaisa: "03001234567", // اپنا ایزی پیسہ نمبر
    jazzcash: "03127654321"    // اپنا جیز کیش نمبر
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(numbers[method]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-6 font-sans">
      <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full mb-4"><ArrowLeft /></button>
      <h2 className="text-2xl font-black text-yellow-500 mb-6 text-center">DEPOSIT CASH</h2>

      {/* پیمنٹ میتھڈ سلیکشن */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setMethod('easypaisa')} className={`flex-1 p-4 rounded-2xl border ${method === 'easypaisa' ? 'bg-green-600 border-yellow-500' : 'bg-[#1a3a32] border-white/10'}`}>
          EasyPaisa
        </button>
        <button onClick={() => setMethod('jazzcash')} className={`flex-1 p-4 rounded-2xl border ${method === 'jazzcash' ? 'bg-orange-600 border-yellow-500' : 'bg-[#1a3a32] border-white/10'}`}>
          JazzCash
        </button>
      </div>

      <div className="bg-[#1a3a32] p-6 rounded-[30px] border border-white/10 mb-6">
        <p className="text-[10px] text-yellow-500 font-bold mb-2 uppercase">{method} Number</p>
        <div className="flex justify-between items-center bg-[#042f24] p-4 rounded-2xl">
          <p className="text-xl font-mono font-bold">{numbers[method]}</p>
          <button onClick={copyNumber} className="bg-yellow-500 text-[#042f24] p-2 rounded-lg">
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        </div>
      </div>

      {/* تصویر اپ لوڈ کرنے کی جگہ */}
      <div className="bg-[#1a3a32] p-6 rounded-[30px] border border-white/10">
        <label className="flex flex-col items-center p-6 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer">
          <Upload className="text-yellow-500 mb-2" />
          <span className="text-xs">{file ? file.name : "Upload Screenshot"}</span>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
        <button className="w-full bg-yellow-500 text-[#042f24] font-black py-4 rounded-2xl mt-6">SUBMIT PAYMENT</button>
      </div>
    </div>
  );
};

export default Deposit;
