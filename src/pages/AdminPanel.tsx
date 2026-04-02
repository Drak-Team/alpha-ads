import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock, User, Wallet } from 'lucide-react';

const AdminPanel = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('status', 'pending')
      .order('requested_at', { ascending: false });
    
    if (data) setRequests(data);
    setLoading(false);
  };

  const handleAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('withdrawals')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      alert(`درخواست ${newStatus === 'approved' ? 'منظور' : 'مسترد'} کر دی گئی ہے!`);
      fetchRequests();
    }
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-6 pb-28">
      <h2 className="text-2xl font-black text-yellow-500 mb-6 text-center">ADMIN PANEL</h2>
      
      <div className="p-6 bg-black/40 rounded-[40px] border border-white/10 font-urdu text-right">
        <div className="flex items-center justify-end gap-3 mb-6">
          <h3 className="text-xl font-bold text-yellow-500">ودڈرا کی درخواستیں</h3>
          <Clock className="text-yellow-500" />
        </div>

        {loading ? (
          <p className="text-center opacity-50 py-10">لوڈنگ ہو رہی ہے...</p>
        ) : requests.length === 0 ? (
          <p className="text-center opacity-30 py-10">کوئی نئی درخواست موجود نہیں ہے</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req: any) => (
              <div key={req.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-yellow-600 text-[#064e3b] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    {req.method}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{req.account_number}</span>
                    <User size={14} className="text-yellow-500" />
                  </div>
                </div>

                <div className="bg-black/40 p-4 rounded-2xl mb-4 text-center border border-white/5">
                  <p className="text-[10px] opacity-40 mb-1">اکاؤنٹ نمبر</p>
                  <p className="font-mono text-lg text-yellow-500 tracking-wider font-bold">{req.account_number}</p>
                  <div className="h-[1px] bg-white/5 my-2"></div>
                  <p className="text-[10px] opacity-40 mb-1">قابلِ ادائیگی رقم</p>
                  <p className="text-2xl font-black text-green-400">PKR {req.payout}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAction(req.id, 'approved')}
                    className="bg-green-600 hover:bg-green-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-red-500/20"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
