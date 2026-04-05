import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Send, MessageCircle, Gift, Tv, PlayCircle, Share2, X, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const pkrRate = 300;
  const [adsDone, setAdsDone] = useState(false);
  const [displayName, setDisplayName] = useState("Investor");
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('balance, display_name').eq('id', user.id).maybeSingle();
      if (data) {
        setBalance(data.balance || 0);
        setDisplayName(data.display_name || "Investor");
      }
      const today = new Date().toISOString().split('T')[0];
      const { data: adData } = await supabase.from('ad_watches').select('all_completed').eq('user_id', user.id).eq('watched_date', today).maybeSingle();
      if (adData?.all_completed) setAdsDone(true);

      // Fetch notifications from deposits, withdrawals, subscriptions
      const notifs: any[] = [];
      const { data: deps } = await supabase.from('deposits').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
      deps?.forEach(d => {
        const icon = d.status === 'approved' ? 'success' : d.status === 'rejected' ? 'error' : 'pending';
        notifs.push({
          id: d.id,
          type: 'deposit',
          icon,
          title: d.status === 'approved' ? 'ڈپازٹ منظور ہو گیا' : d.status === 'rejected' ? 'ڈپازٹ مسترد ہو گیا' : 'ڈپازٹ زیر غور ہے',
          detail: `PKR ${d.amount}`,
          time: d.created_at,
        });
      });
      const { data: wds } = await supabase.from('withdrawals').select('*').eq('user_id', user.id).order('requested_at', { ascending: false }).limit(10);
      wds?.forEach(w => {
        const icon = w.status === 'approved' ? 'success' : w.status === 'rejected' ? 'error' : 'pending';
        notifs.push({
          id: w.id,
          type: 'withdrawal',
          icon,
          title: w.status === 'approved' ? 'ودھرا منظور ہو گیا' : w.status === 'rejected' ? 'ودھرا مسترد ہو گیا' : 'ودھرا زیر غور ہے',
          detail: `PKR ${w.payout}`,
          time: w.requested_at,
        });
      });
      const { data: subs } = await supabase.from('subscriptions').select('*, plans(name)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5);
      subs?.forEach(s => {
        notifs.push({
          id: s.id,
          type: 'subscription',
          icon: s.is_active ? 'success' : 'pending',
          title: `${(s as any).plans?.name || 'Plan'} پیکج ایکٹیو ہے`,
          detail: s.is_active ? 'فعال' : 'غیر فعال',
          time: s.created_at,
        });
      });

      notifs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setNotifications(notifs);
      setUnreadCount(notifs.filter(n => n.icon === 'pending').length);
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#042f24] text-white font-sans pb-24">
      {/* Top Header */}
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 bg-[#1a3a32] p-2 rounded-2xl border border-yellow-500/30">
          <div className="bg-yellow-500 text-[#042f24] font-black p-2 rounded-xl text-xs">GP</div>
          <span className="italic font-bold text-yellow-500">GOLD PLUS</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowNotifications(true)} className="relative p-2 bg-[#1a3a32] rounded-full border border-white/10">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          <button onClick={() => navigate('/profile')} className="p-2 bg-[#1a3a32] rounded-full border border-white/10">
            <User size={20} />
          </button>
        </div>
      </div>

      {/* Hero Banners Slider */}
      <div className="mx-4 mb-4 relative overflow-hidden rounded-[28px] h-[150px] border border-yellow-500/20">
        {banners.map((banner, i) => (
          <img
            key={i}
            src={banner}
            alt={`Banner ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${currentBanner === i ? 'opacity-100' : 'opacity-0'}`}
            width={1200}
            height={512}
          />
        ))}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all ${currentBanner === i ? 'bg-yellow-500 w-6' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Balance Card */}
      <div className="mx-4 p-8 bg-gradient-to-br from-[#0a4d3c] to-[#042f24] rounded-[40px] border border-white/10 shadow-2xl text-center relative overflow-hidden">
        <p className="text-gray-400 text-xs font-bold mb-1 uppercase tracking-widest">Welcome, {displayName}</p>
        <p className="text-gray-500 text-[10px] mb-3">Total Balance</p>
        <h1 className="text-6xl font-black text-yellow-500 mb-2">${balance.toFixed(2)}</h1>
        <p className="text-sm text-green-400 font-medium">≈ PKR {(balance * pkrRate).toFixed(0)}</p>
        
        <div className="flex gap-4 mt-8">
          <button onClick={() => navigate('/deposit')} className="flex-1 bg-yellow-500 text-[#042f24] py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-transform">DEPOSIT</button>
          <button onClick={() => navigate('/withdraw')} className="flex-1 bg-white/5 py-4 rounded-2xl font-bold border border-white/10 active:scale-95 transition-transform">WITHDRAW</button>
        </div>
      </div>

      {/* Grid Buttons */}
      <div className="grid grid-cols-2 gap-4 p-4 mt-4">
        <button onClick={() => navigate('/refer')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl active:scale-95 transition-transform">
          <div className="bg-green-500/20 p-3 rounded-2xl text-green-500"><Send size={24} /></div>
          <span className="text-xs font-bold uppercase">Refer</span>
        </button>
        <button 
          onClick={() => window.open('https://t.me/mranjum143', '_blank')}
          className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl active:scale-95 transition-transform"
        >
          <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-500"><MessageCircle size={24} /></div>
          <span className="text-xs font-bold uppercase">Telegram</span>
        </button>
        <button onClick={() => navigate('/plans')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl active:scale-95 transition-transform">
          <div className="bg-yellow-500/20 p-3 rounded-2xl text-yellow-500"><Gift size={24} /></div>
          <span className="text-xs font-bold uppercase">Plans</span>
        </button>
        <button onClick={() => navigate('/chat')} className="bg-[#1a3a32] p-6 rounded-[30px] flex flex-col items-center gap-3 border border-white/5 shadow-xl active:scale-95 transition-transform">
          <div className="bg-pink-500/20 p-3 rounded-2xl text-pink-500"><Tv size={24} /></div>
          <span className="text-xs font-bold uppercase">Support</span>
        </button>
      </div>

      {/* Daily Task Section */}
      <div className="mx-4 mt-2 p-6 bg-[#1a3a32] rounded-[35px] border border-white/5 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/20 p-4 rounded-2xl text-green-500">
            <PlayCircle size={28} />
          </div>
          <div className="text-right">
            <h3 className="font-black text-lg">DAILY TASK</h3>
            <p className="text-[10px] text-gray-400">Earn rewards daily</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/ads')}
          className={`px-6 py-2 rounded-xl font-bold text-xs active:scale-95 transition-transform ${adsDone ? 'bg-green-600/20 text-green-500' : 'bg-green-600 text-white shadow-lg shadow-green-900/20'}`}
        >
          {adsDone ? 'DONE' : 'WATCH'}
        </button>
      </div>

      {/* Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <button onClick={() => setShowNotifications(false)} className="p-2"><X size={24} /></button>
            <h3 className="text-lg font-bold text-yellow-500">نوٹیفکیشنز</h3>
            <div className="w-10" />
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-center text-white/30 mt-20 font-urdu">کوئی نوٹیفکیشن نہیں</p>
            ) : (
              notifications.map((n) => (
                <div key={n.id} className="bg-[#1a3a32] p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${n.icon === 'success' ? 'bg-green-500/20 text-green-500' : n.icon === 'error' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {n.icon === 'success' ? <CheckCircle size={20} /> : n.icon === 'error' ? <AlertTriangle size={20} /> : <Clock size={20} />}
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-sm font-bold font-urdu">{n.title}</p>
                    <p className="text-[10px] text-yellow-500 font-bold">{n.detail}</p>
                    <p className="text-[9px] opacity-30 mt-1">{new Date(n.time).toLocaleDateString('ur-PK')}</p>
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
