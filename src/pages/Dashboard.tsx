import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Send, MessageCircle, Gift, PlayCircle, X, CheckCircle, Clock, AlertTriangle, Crown } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [displayName, setDisplayName] = useState("Investor");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [adsDone, setAdsDone] = useState(false);

  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => setCurrentBanner((p) => (p + 1) % banners.length), 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (profile) {
        setBalance(profile.balance || 0);
        setTotalEarned(profile.total_earned || 0);
        setDisplayName(profile.display_name || "Investor");
      }

      const { data: deps } = await supabase.from('deposits').select('amount, status, created_at, id').eq('user_id', user.id).order('created_at', { ascending: false });
      const approvedDeps = deps?.filter(d => d.status === 'approved') || [];
      setTotalDeposit(approvedDeps.reduce((s, d) => s + d.amount, 0));

      const { data: wds } = await supabase.from('withdrawals').select('payout, status, requested_at, id, method, account_number').eq('user_id', user.id).order('requested_at', { ascending: false });
      const approvedWds = wds?.filter(w => w.status === 'approved') || [];
      setTotalWithdraw(approvedWds.reduce((s, w) => s + w.payout, 0));

      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', user.id);
      setTeamCount(count || 0);

      const today = new Date().toISOString().split('T')[0];
      const { data: adData } = await supabase.from('ad_watches').select('all_completed').eq('user_id', user.id).eq('watched_date', today).maybeSingle();
      if (adData?.all_completed) setAdsDone(true);

      // Notifications
      const notifs: any[] = [];
      deps?.forEach(d => {
        notifs.push({
          id: d.id, type: 'deposit',
          icon: d.status === 'approved' ? 'success' : d.status === 'rejected' ? 'error' : 'pending',
          title: d.status === 'approved' ? 'Deposit Approved ✅' : d.status === 'rejected' ? 'Deposit Rejected ❌' : 'Deposit Pending ⏳',
          detail: `PKR ${d.amount}`, time: d.created_at,
        });
      });
      wds?.forEach(w => {
        notifs.push({
          id: w.id, type: 'withdrawal',
          icon: w.status === 'approved' ? 'success' : w.status === 'rejected' ? 'error' : 'pending',
          title: w.status === 'approved' ? 'Withdrawal Approved ✅' : w.status === 'rejected' ? 'Withdrawal Rejected ❌' : 'Withdrawal Pending ⏳',
          detail: `PKR ${w.payout}`, time: w.requested_at,
        });
      });
      notifs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => n.icon === 'pending').length);
    };
    fetchAll();
  }, []);

  const stats = [
    { label: 'Total Balance', value: `PKR ${balance}`, color: 'text-green-400' },
    { label: "Today's Earning", value: `PKR 0`, color: 'text-yellow-500' },
    { label: 'Total Deposit', value: `PKR ${totalDeposit}`, color: 'text-blue-400' },
    { label: 'Total Withdraw', value: `PKR ${totalWithdraw}`, color: 'text-red-400' },
    { label: 'Active Investment', value: `PKR ${totalDeposit}`, color: 'text-purple-400' },
    { label: 'My Team', value: `${teamCount}`, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      {/* Top Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Crown className="text-[#0d0a1a]" size={20} />
          </div>
          <span className="italic font-black text-yellow-500 text-lg">GOLD PLUS</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowNotifications(true)} className="relative p-2 bg-[#1a1035] rounded-full border border-purple-500/20">
            <Bell size={20} className="text-gray-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          <button onClick={() => navigate('/profile')} className="p-2 bg-[#1a1035] rounded-full border border-purple-500/20">
            <User size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mx-4 mb-4 relative overflow-hidden rounded-3xl h-[140px] border border-purple-500/20">
        {banners.map((banner, i) => (
          <img key={i} src={banner} alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${currentBanner === i ? 'opacity-100' : 'opacity-0'}`} />
        ))}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentBanner === i ? 'bg-yellow-500 w-6' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Welcome & Balance */}
      <div className="mx-4 text-center mb-4">
        <p className="text-gray-500 text-xs">Welcome, {displayName}</p>
        <h1 className="text-4xl font-black text-yellow-500 mt-1">PKR {balance}</h1>
      </div>

      {/* Deposit / Withdraw */}
      <div className="mx-4 flex gap-3 mb-4">
        <button onClick={() => navigate('/deposit')} className="flex-1 bg-yellow-500 text-[#0d0a1a] py-3.5 rounded-2xl font-black active:scale-95 transition-transform shadow-lg shadow-yellow-500/20">DEPOSIT</button>
        <button onClick={() => navigate('/withdraw')} className="flex-1 bg-[#1a1035] py-3.5 rounded-2xl font-bold border border-purple-500/20 active:scale-95 transition-transform">WITHDRAW</button>
      </div>

      {/* Stats Grid */}
      <div className="mx-4 grid grid-cols-3 gap-2 mb-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#1a1035] border border-purple-500/10 rounded-2xl p-3 text-center">
            <p className={`font-black text-sm ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mx-4 grid grid-cols-4 gap-2 mb-4">
        {[
          { icon: Send, label: 'Refer', path: '/refer', color: 'text-green-500', bg: 'bg-green-500/10' },
          { icon: MessageCircle, label: 'Telegram', path: 'https://t.me/mranjum143', color: 'text-purple-400', bg: 'bg-purple-500/10', external: true },
          { icon: Gift, label: 'Plans', path: '/plans', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { icon: PlayCircle, label: adsDone ? 'Done ✓' : 'Earn', path: '/ads', color: 'text-pink-400', bg: 'bg-pink-500/10' },
        ].map((item, i) => (
          <button key={i} onClick={() => item.external ? window.open(item.path, '_blank') : navigate(item.path)}
            className="bg-[#1a1035] p-4 rounded-2xl flex flex-col items-center gap-2 border border-purple-500/10 active:scale-95 transition-transform">
            <div className={`${item.bg} p-2.5 rounded-xl`}><item.icon size={20} className={item.color} /></div>
            <span className="text-[9px] font-bold text-gray-400">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
            <button onClick={() => setShowNotifications(false)} className="p-2"><X size={24} /></button>
            <h3 className="text-lg font-bold text-yellow-500">Notifications</h3>
            <div className="w-10" />
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-center text-white/30 mt-20">No notifications yet</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="bg-[#1a1035] p-4 rounded-2xl border border-purple-500/10 flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${n.icon === 'success' ? 'bg-green-500/20 text-green-500' : n.icon === 'error' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {n.icon === 'success' ? <CheckCircle size={20} /> : n.icon === 'error' ? <AlertTriangle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{n.title}</p>
                    <p className="text-[10px] text-yellow-500 font-bold">{n.detail}</p>
                    <p className="text-[9px] text-gray-600 mt-1">{new Date(n.time).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
