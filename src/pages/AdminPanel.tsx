import React, { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Eye, Loader2 } from 'lucide-react';

const AdminPanel = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    const { data, error } = await supabase
      .from('deposits')
      .select('*, profiles(id, balance)')
      .order('created_at', { ascending: false });

    if (!error) setDeposits(data);
    setLoading(false);
  };

  useEffect(() => { fetchDeposits(); }, []);

  const handleApprove = async (deposit) => {
    try {
      // 1. ڈپازٹ کو اپروو کرنا
      const { error: updateError } = await supabase
        .from('deposits')
        .update({ status: 'approved' })
        .eq('id', deposit.id);

      if (updateError) throw updateError;

      // 2. یوزر کے بیلنس میں ڈالر جمع کرنا
      // یہاں ہم PKR کو ڈالر میں بدل رہے ہیں (600 PKR = $2)
      const dollarAmount = deposit.amount_pkr / 300; 
      const newBalance = (deposit.profiles?.balance || 0) + dollarAmount;

      const { error: balanceError } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('id', deposit.user_id);

      if (balanceError) throw balanceError;

      alert(`پلان منظور! یوزر کے اکاؤنٹ میں $${dollarAmount} جمع کر دیے گئے ہیں۔`);
      fetchDeposits();
    } catch (error) {
      alert("خطا: " + error.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-[#064e3b] text-white"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-500 font-urdu">ایڈمن کنٹرول پینل</h2>
      <div className="space-y-4">
        {deposits.map((dep) => (
          <div key={dep.id} className="bg-black/30 border border-white/10 p-5 rounded-[32px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${dep.status === 'pending' ? 'bg-yellow-600/20 text-yellow-500' : 'bg-green-600/20 text-green-500'}`}>
                {dep.status === 'pending' ? 'پینڈنگ' : 'منظور شدہ'}
              </span>
              <div className="text-right">
                <p className="font-bold text-sm">پلان: {dep.plan_name}</p>
                <p className="text-[10px] opacity-50">{new Date(dep.created_at).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-sm font-bold text-yellow-500 mb-4">رقم: {dep.amount_pkr} PKR</p>
            <div className="flex gap-2">
              {dep.status === 'pending' && (
                <button onClick={() => handleApprove(dep)} className="flex-1 bg-green-600 py-2 rounded-xl flex items-center justify-center gap-1 text-[10px] font-bold">
                  <CheckCircle size={14} /> اپروو اور بیلنس بھیجیں
                </button>
              )}
              <a href={supabase.storage.from('screenshots').getPublicUrl(dep.screenshot_url).data.publicUrl} target="_blank" rel="noreferrer" className="bg-white/10 p-2 rounded-xl flex items-center justify-center">
                <Eye size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
