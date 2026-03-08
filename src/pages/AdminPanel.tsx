import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, User, DollarSign, Clock } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('deposits');

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-500 font-urdu">ایڈمن کنٹرول پینل</h2>

      {/* ٹیبز (ڈپوزٹ / ودڈرا) */}
      <div className="flex gap-2 mb-8">
        <button 
          onClick={() => setActiveTab('withdrawals')}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'withdrawals' ? 'bg-yellow-600 shadow-lg' : 'bg-white/5 opacity-50'}`}
        >
          ودڈرا ریکویسٹ
        </button>
        <button 
          onClick={() => setActiveTab('deposits')}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all ${activeTab === 'deposits' ? 'bg-yellow-600 shadow-lg' : 'bg-white/5 opacity-50'}`}
        >
          ڈپوزٹ ریکویسٹ
        </button>
      </div>

      {/* لسٹ ایریا */}
      <div className="space-y-4">
        {activeTab === 'deposits' ? (
          // ڈپازٹ کی مثال
          <div className="bg-black/30 border border-white/10 p-5 rounded-[32px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-yellow-600/20 text-yellow-500 px-3 py-1 rounded-full">پینڈنگ</span>
              <div className="text-right">
                <p className="font-bold text-sm">03037264598</p>
                <p className="text-[10px] opacity-50">پلان: Gold ($10)</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-green-600 py-2 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold"><CheckCircle size={14} /> اپروو کریں</button>
              <button className="flex-1 bg-red-600 py-2 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold"><XCircle size={14} /> رد کریں</button>
              <button className="bg-white/10 p-2 rounded-xl flex items-center justify-center text-white"><Eye size={16} /></button>
            </div>
          </div>
        ) : (
          // ودڈرا کی مثال
          <div className="bg-black/30 border border-white/10 p-5 rounded-[32px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full font-bold">EasyPaisa</span>
              <div className="text-right">
                <p className="font-bold text-sm">Ahmad Nafees</p>
                <p className="text-[10px] opacity-50">رقم: $20.00 (5600 PKR)</p>
              </div>
            </div>
            <p className="text-[10px] mb-4 text-left opacity-70">نمبر: 03037264598</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 py-2 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold"><CheckCircle size={14} /> ادائیگی کر دی</button>
              <button className="flex-1 bg-red-600 py-2 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold"><XCircle size={14} /> کینسل کریں</button>
            </div>
          </div>
        )}
      </div>

      <p className="text-[9px] mt-10 text-center opacity-40 italic">ایڈمن پینل صرف آپ کے استعمال کے لیے ہے۔</p>
    </div>
  );
};

export default AdminPanel;
