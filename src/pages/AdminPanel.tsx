import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Eye, Loader2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('deposits');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const table = activeTab === 'deposits' ? 'deposits' : 'withdrawals';
    const { data: result, error } = await supabase
      .from(table)
      .select('*, profiles(full_name, phone_number, balance)')
      .order('created_at', { ascending: false });

    if (!error) setData(result);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleAction = async (id, status, type) => {
    const table = type === 'deposit' ? 'deposits' : 'withdrawals';
    const { error } = await supabase.from(table).update({ status }).eq('id', id);
    if (!error) {
      alert("درخواست اپڈیٹ ہو گئی ہے!");
      fetchData();
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-[#064e3b] text-white"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500 font-urdu">ایڈمن کنٹرول</h2>

      {/* ٹیب سوئچر */}
      <div className="flex gap-2 mb-8 bg-black/20 p-1 rounded-2xl">
        <button 
          onClick={() => setActiveTab('withdrawals')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs font-urdu transition-all ${activeTab === 'withdrawals' ? 'bg-yellow-600 shadow-lg' : 'opacity-50'}`}
        >
          ودڈرا ریکویسٹ
        </button>
        <button 
          onClick={() => setActiveTab('deposits')}
          className={`flex-1 py-3 rounded-xl font-bold text-xs font-urdu transition-all ${activeTab === 'deposits' ? 'bg-yellow-600 shadow-lg' : 'opacity-50'}`}
        >
          ڈپوزٹ ریکویسٹ
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-black/30 border border-white/10 p-5 rounded-[30px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
               <span className={`text-[9px] px-3 py-1 rounded-full font-bold ${item.status === 'pending' ? 'bg-yellow-600/20 text-yellow-500' : 'bg-green-600/20 text-green-500'}`}>
                {item.status === 'pending' ? 'پینڈنگ' : 'مکمل'}
              </span>
              <div className="text-right">
                <p className="font-bold text-sm">{item.profiles?.full_name || 'نامعلوم یوزر'}</p>
                <p className="text-[10px] opacity-50">{item.profiles?.phone_number}</p>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl mb-4 text-center">
              <p className="text-[10px] opacity-50 mb-1">{activeTab === 'deposits' ? 'ڈپوزٹ رقم' : 'ودڈرا رقم'}</p>
              <h4 className="text-xl font-black text-yellow-500">
                {activeTab === 'deposits' ? `PKR ${item.amount_pkr}` : `$${item.amount_usd}`}
              </h4>
              {activeTab === 'withdrawals' && (
                <p className="text-[10px] mt-2 text-blue-400 font-bold uppercase">{item.method}: {item.account_details}</p>
              )}
            </div>

            {item.status === 'pending' && (
              <div className="flex gap-2">
                <button 
                  onClick={() => handleAction(item.id, 'approved', activeTab === 'deposits' ? 'deposit' : 'withdraw')}
                  className="flex-1 bg-green-600 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold"
                >
                  <CheckCircle size={14} /> اپروو کریں
                </button>
                <button 
                  onClick={() => handleAction(item.id, 'rejected', activeTab === 'deposits' ? 'deposit' : 'withdraw')}
                  className="flex-1 bg-red-600/20 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold border border-red-500/20"
                >
                  <XCircle size={14} /> رد کریں
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel
