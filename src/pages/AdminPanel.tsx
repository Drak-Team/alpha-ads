import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock, User, Image } from 'lucide-react';

const AdminPanel = () => {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'withdrawals' | 'deposits'>('deposits');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: wData }, { data: dData }] = await Promise.all([
      supabase.from('withdrawals').select('*').eq('status', 'pending').order('requested_at', { ascending: false }),
      supabase.from('deposits').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
    ]);
    if (wData) setWithdrawals(wData);
    if (dData) setDeposits(dData);
    setLoading(false);
  };

  const handleWithdrawalAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase.from('withdrawals').update({ status: newStatus }).eq('id', id);
    if (!error) { alert(`${newStatus === 'approved' ? 'منظور' : 'مسترد'} ہو گئی`); fetchAll(); }
  };

  const handleDepositAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase.from('deposits').update({ status: newStatus }).eq('id', id);
    if (!error) { alert(`${newStatus === 'approved' ? 'منظور' : 'مسترد'} ہو گئی`); fetchAll(); }
  };

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-6 pb-28">
      <h2 className="text-2xl font-black text-yellow-500 mb-6 text-center">ADMIN PANEL</h2>
      
      <div className="flex gap-3 mb-6">
        <button onClick={() => setTab('deposits')} className={`flex-1 py-3 rounded-2xl font-bold text-sm ${tab === 'deposits' ? 'bg-yellow-500 text-[#042f24]' : 'bg-white/5'}`}>
          Deposits ({deposits.length})
        </button>
        <button onClick={() => setTab('withdrawals')} className={`flex-1 py-3 rounded-2xl font-bold text-sm ${tab === 'withdrawals' ? 'bg-yellow-500 text-[#042f24]' : 'bg-white/5'}`}>
          Withdrawals ({withdrawals.length})
        </button>
      </div>

      <div className="p-4 bg-black/40 rounded-[40px] border border-white/10 font-urdu text-right">
        {loading ? (
          <p className="text-center opacity-50 py-10">لوڈنگ...</p>
        ) : tab === 'deposits' ? (
          deposits.length === 0 ? <p className="text-center opacity-30 py-10">کوئی نئی درخواست نہیں</p> : (
            <div className="space-y-4">
              {deposits.map((dep) => (
                <div key={dep.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-yellow-500 font-bold text-lg">PKR {dep.amount}</span>
                    <span className="text-[10px] opacity-40">{dep.transaction_id || 'N/A'}</span>
                  </div>
                  {dep.screenshot_url && (
                    <a href={dep.screenshot_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 text-xs mb-3">
                      <Image size={14} /> اسکرین شاٹ دیکھیں
                    </a>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleDepositAction(dep.id, 'approved')} className="bg-green-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
                      <CheckCircle size={18} /> Approve
                    </button>
                    <button onClick={() => handleDepositAction(dep.id, 'rejected')} className="bg-red-600/20 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border border-red-500/20">
                      <XCircle size={18} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          withdrawals.length === 0 ? <p className="text-center opacity-30 py-10">کوئی نئی درخواست نہیں</p> : (
            <div className="space-y-4">
              {withdrawals.map((req) => (
                <div key={req.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-yellow-600 text-[#064e3b] px-3 py-1 rounded-full text-[10px] font-black uppercase">{req.method}</span>
                    <span className="font-bold">{req.account_number}</span>
                  </div>
                  <div className="bg-black/40 p-3 rounded-2xl mb-3 text-center border border-white/5">
                    <p className="text-2xl font-black text-green-400">PKR {req.payout}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => handleWithdrawalAction(req.id, 'approved')} className="bg-green-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
                      <CheckCircle size={18} /> Approve
                    </button>
                    <button onClick={() => handleWithdrawalAction(req.id, 'rejected')} className="bg-red-600/20 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border border-red-500/20">
                      <XCircle size={18} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
