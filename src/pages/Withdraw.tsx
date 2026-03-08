import React, { useState } from 'react';
import { Smartphone, Globe, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState('easypaisa');

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu">رقم نکلوائیں</h2>
        <div className="w-10"></div>
      </div>

      {/* بیلنس کارڈ */}
      <div className="bg-white/5 p-6 rounded-[32px] mb-8 text-center border border-white/10">
        <p className="text-[10px] opacity-60">دستیاب بیلنس</p>
        <h3 className="text-3xl font-bold text-yellow-500">$0.00</h3>
      </div>

      {/* میتھڈ سلیکشن */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {['easypaisa', 'jazzcash', 'usdt'].map((m) => (
          <button 
            key={m}
            onClick={() => setMethod(m)}
            className={`py-3 rounded-2xl border text-[10px] font-bold uppercase ${method === m ? 'bg-yellow-600 border-yellow-500' : 'bg-white/5 border-white/10 opacity-50'}`}
          >
            {m === 'usdt' ? <Globe size={16} className="mx-auto mb-1"/> : <Smartphone size={16} className="mx-auto mb-1"/>}
            {m}
          </button>
        ))}
      </div>

      {/* ان پٹ فارم */}
      <div className="space-y-4 bg-black/20 p-6 rounded-[32px] border border-white/5">
        <div>
          <label className="text-[10px] block mb-2 opacity-60">رقم (ڈالر میں)</label>
          <input type="number" placeholder="0.00" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none" />
        </div>
        
        <div>
          <label className="text-[10px] block mb-2 opacity-60">
            {method === 'usdt' ? 'USDT Address' : `${method} اکاؤنٹ نمبر`}
          </label>
          <input type="text" placeholder="نمبر یا ایڈریس لکھیں" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none text-left" />
        </div>

        <button className="w-full bg-green-600 py-4 rounded-2xl font-bold font-urdu shadow-lg">ودڈرا کی درخواست بھیجیں</button>
      </div>
    </div>
  );
};

export default Withdraw;
