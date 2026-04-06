import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Image, ArrowLeft, Shield, Search, Plus, Minus, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<'deposits' | 'withdrawals' | 'users'>('deposits');
  const [searchQuery, setSearchQuery] = useState('');
  const [adjustingUser, setAdjustingUser] = useState<string | null>(null);
  const [adjustAmount, setAdjustAmount] = useState('');

  useEffect(() => { checkAdminAndFetch(); }, []);

  const checkAdminAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/auth'); return; }
    const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' });
    if (!data) { navigate('/dashboard'); return; }
    setIsAdmin(true);
    fetchAll();
  };

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: wData }, { data: dData }, { data: uData }, { data: sData }] = await Promise.all([
      supabase.from('withdrawals').select('*').eq('status', 'pending').order('requested_at', { ascending: false }),
      supabase.from('deposits').select('*').eq('status', 'pending').order('created_at', { ascending: false }),
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*, plans(name, price, daily_earning)').order('created_at', { ascending: false }),
    ]);
    if (wData) setWithdrawals(wData);
    if (dData) setDeposits(dData);
    if (uData) setUsers(uData);
    if (sData) setSubscriptions(sData);
    setLoading(false);
  };

  const handleWithdrawalAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase.from('withdrawals').update({ status: newStatus }).eq('id', id);
    if (!error) { alert(newStatus === 'approved' ? 'منظور ہو گئی' : 'مسترد ہو گئی'); fetchAll(); }
  };

  const handleDepositAction = async (id: string, newStatus: 'approved' | 'rejected') => {
    const { error } = await supabase.from('deposits').update({ status: newStatus }).eq('id', id);
    if (!error) { alert(newStatus === 'approved' ? 'منظور ہو گئی — بیلنس خودکار اپڈیٹ ہو گیا' : 'مسترد ہو گئی'); fetchAll(); }
  };

  const handleBalanceAdjust = async (userId: string, type: 'add' | 'subtract') => {
    const amount = parseInt(adjustAmount);
    if (!amount || amount <= 0) return;
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const newBalance = type === 'add' ? user.balance + amount : Math.max(0, user.balance - amount);
    const { error } = await supabase.from('profiles').update({ balance: newBalance }).eq('id', userId);
    if (!error) { setAdjustingUser(null); setAdjustAmount(''); fetchAll(); }
  };

  const getUserSubs = (userId: string) => subscriptions.filter(s => s.user_id === userId);

  const filteredUsers = users.filter(u => {
    const q = searchQuery.toLowerCase();
    return !q || (u.display_name || '').toLowerCase().includes(q) || (u.phone || '').includes(q) || (u.referral_code || '').toLowerCase().includes(q);
  });

  if (!isAdmin) return <div className="min-h-screen bg-[#042f24] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#042f24] text-white p-4 pb-28">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/dashboard')} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <div className="flex items-center gap-2">
          <Shield className="text-yellow-500" size={20} />
          <h2 className="text-xl font-black text-yellow-500">ADMIN PANEL</h2>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(['deposits', 'withdrawals', 'users'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 rounded-2xl font-bold text-xs whitespace-nowrap px-3 ${tab === t ? 'bg-yellow-500 text-[#042f24]' : 'bg-white/5'}`}>
            {t === 'deposits' ? `Deposits (${deposits.length})` : t === 'withdrawals' ? `Withdrawals (${withdrawals.length})` : `Users (${users.length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center opacity-50 py-10">لوڈنگ...</p>
        ) : tab === 'users' ? (
          <>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
              <input type="text" placeholder="نام، فون یا کوڈ سے تلاش کریں..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm placeholder:opacity-40 focus:outline-none focus:border-yellow-500/50" />
            </div>

            {filteredUsers.length === 0 ? (
              <p className="text-center opacity-30 py-10">کوئی یوزر نہیں ملا</p>
            ) : (
              filteredUsers.map(u => {
                const userSubs = getUserSubs(u.id);
                return (
                  <div key={u.id} className="bg-[#1a3a32] border border-white/10 rounded-2xl p-4">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{u.display_name || 'Investor'}</p>
                        <p className="text-[10px] opacity-40 truncate">{u.phone || 'N/A'}</p>
                        <p className="text-[9px] text-yellow-500/60 font-mono">{u.referral_code}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-green-400 font-black text-sm">₨{u.balance}</p>
                        <p className="text-yellow-400 font-bold text-[10px]">Earned: ₨{u.total_earned}</p>
                        <p className="text-[9px] opacity-40">Ref: ₨{u.referral_earnings}</p>
                      </div>
                      <button onClick={() => setAdjustingUser(adjustingUser === u.id ? null : u.id)}
                        className="bg-yellow-500/20 text-yellow-500 p-2 rounded-xl text-[10px] font-bold ml-1">₨±</button>
                    </div>

                    {/* Subscriptions */}
                    {userSubs.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                        <p className="text-[10px] font-bold text-yellow-500 flex items-center gap-1"><Package size={12} /> Active Plans</p>
                        {userSubs.map(s => (
                          <div key={s.id} className={`flex justify-between items-center text-[11px] p-2 rounded-xl ${s.is_active ? 'bg-green-500/10 border border-green-500/20' : 'bg-white/5 border border-white/5'}`}>
                            <span className="font-bold">{(s as any).plans?.name || 'Plan'}</span>
                            <span className="text-[10px] opacity-60">₨{(s as any).plans?.price} | ₨{(s as any).plans?.daily_earning}/day</span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {s.is_active ? 'Active' : 'Expired'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {adjustingUser === u.id && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <input type="number" placeholder="رقم درج کریں" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)}
                          className="w-full bg-black/30 border border-white/10 rounded-xl py-2 px-3 text-sm mb-2 focus:outline-none focus:border-yellow-500/50" />
                        <div className="grid grid-cols-2 gap-2">
                          <button onClick={() => handleBalanceAdjust(u.id, 'add')} className="bg-green-600 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-transform">
                            <Plus size={14} /> Add
                          </button>
                          <button onClick={() => handleBalanceAdjust(u.id, 'subtract')} className="bg-red-600/20 text-red-400 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-red-500/20 active:scale-95 transition-transform">
                            <Minus size={14} /> Subtract
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        ) : tab === 'deposits' ? (
          deposits.length === 0 ? <p className="text-center opacity-30 py-10">کوئی نئی درخواست نہیں</p> : (
            deposits.map((dep) => (
              <div key={dep.id} className="bg-[#1a3a32] border border-white/10 p-5 rounded-3xl">
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
                  <button onClick={() => handleDepositAction(dep.id, 'approved')} className="bg-green-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button onClick={() => handleDepositAction(dep.id, 'rejected')} className="bg-red-600/20 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border border-red-500/20 active:scale-95 transition-transform">
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          withdrawals.length === 0 ? <p className="text-center opacity-30 py-10">کوئی نئی درخواست نہیں</p> : (
            withdrawals.map((req) => (
              <div key={req.id} className="bg-[#1a3a32] border border-white/10 p-5 rounded-3xl">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-yellow-600 text-[#064e3b] px-3 py-1 rounded-full text-[10px] font-black uppercase">{req.method}</span>
                  <span className="font-bold font-mono">{req.account_number}</span>
                </div>
                <div className="bg-black/40 p-3 rounded-2xl mb-3 text-center border border-white/5">
                  <p className="text-2xl font-black text-green-400">PKR {req.payout}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => handleWithdrawalAction(req.id, 'approved')} className="bg-green-600 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
                    <CheckCircle size={18} /> Approve
                  </button>
                  <button onClick={() => handleWithdrawalAction(req.id, 'rejected')} className="bg-red-600/20 text-red-500 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 border border-red-500/20 active:scale-95 transition-transform">
                    <XCircle size={18} /> Reject
                  </button>
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
