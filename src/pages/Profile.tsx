import React, { useState, useEffect } from 'react';
import { Users, Award, FileText, TrendingUp, Edit3, Lock, Headphones, LogOut, ChevronRight, Copy, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("...");
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email || "");
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      if (data) {
        setDisplayName(data.display_name || "Investor");
        setReferralCode(data.referral_code || "");
        setBalance(data.balance || 0);
        setTotalEarned(data.total_earned || 0);
        setNewName(data.display_name || "");
      }
      const { count } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('referred_by', user.id);
      setTeamCount(count || 0);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('profiles').update({ display_name: newName.trim() }).eq('id', user.id);
    setDisplayName(newName.trim());
    setShowEdit(false);
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) { alert("پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) alert(error.message);
    else { alert("پاس ورڈ تبدیل ہو گیا ✅"); setShowPassword(false); setNewPassword(""); }
  };

  const menuItems = [
    { icon: Users, label: 'My Team', action: () => navigate('/refer') },
    { icon: Award, label: 'Ranks & Rewards', action: () => {} },
    { icon: FileText, label: 'Deposit History', action: () => navigate('/deposit') },
    { icon: TrendingUp, label: 'Transactions', action: () => {} },
    { icon: Edit3, label: 'Edit Profile', action: () => setShowEdit(true) },
    { icon: Lock, label: 'Change Password', action: () => setShowPassword(true) },
    { icon: Headphones, label: 'Support', action: () => navigate('/chat') },
  ];

  return (
    <div className="min-h-screen bg-[#0d0a1a] text-white pb-28">
      {/* Header Card */}
      <div className="bg-gradient-to-b from-[#2d1b69] to-[#1a1035] mx-4 mt-4 rounded-3xl p-6 border border-purple-500/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="text-yellow-500 font-black text-lg italic">Gold Plus</span>
          <span className="text-gray-400 text-sm">Profile</span>
          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-[#0d0a1a] font-black text-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Crown className="text-[#0d0a1a]" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black">{displayName}</h2>
            <p className="text-gray-400 text-xs flex items-center gap-1">✉ {email}</p>
            <button onClick={copyCode} className="flex items-center gap-1 mt-1 bg-white/10 px-3 py-0.5 rounded-full">
              <span className="text-yellow-500 text-[10px] font-mono font-bold"># {referralCode}</span>
              <Copy size={10} className={copied ? 'text-green-400' : 'text-gray-400'} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
            <p className="text-[10px] text-gray-400">$</p>
            <p className="text-green-400 font-black text-sm">${balance.toFixed(2)}</p>
            <p className="text-[9px] text-gray-500 uppercase">Invested</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
            <p className="text-[10px] text-gray-400">$</p>
            <p className="text-green-400 font-black text-sm">${totalEarned.toFixed(2)}</p>
            <p className="text-[9px] text-gray-500 uppercase">Earned</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 text-center border border-white/5">
            <p className="text-[10px] text-gray-400">👥</p>
            <p className="text-white font-black text-sm">{teamCount}</p>
            <p className="text-[9px] text-gray-500 uppercase">Team</p>
          </div>
        </div>
      </div>

      {/* Account Menu */}
      <div className="px-4 mt-6">
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 px-2">Account</p>
        <div className="bg-[#1a1035] rounded-3xl border border-purple-500/10 overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/10 p-2.5 rounded-xl">
                  <item.icon size={18} className="text-yellow-500" />
                </div>
                <span className="text-sm font-semibold">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 p-4 rounded-2xl border border-red-500/10 font-bold">
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#1a1035] border border-purple-500/20 w-full max-w-sm rounded-3xl p-6">
            <h3 className="text-lg font-bold text-center mb-4 text-yellow-500">Edit Profile</h3>
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="نام لکھیں"
              className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl mb-4 focus:outline-none focus:border-yellow-500/50" />
            <button onClick={handleUpdateName} className="w-full bg-yellow-500 text-[#0d0a1a] py-3 rounded-2xl font-black">Save</button>
            <button onClick={() => setShowEdit(false)} className="w-full text-gray-500 text-sm mt-2 py-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPassword && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-[#1a1035] border border-purple-500/20 w-full max-w-sm rounded-3xl p-6">
            <h3 className="text-lg font-bold text-center mb-4 text-yellow-500">Change Password</h3>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="نیا پاس ورڈ لکھیں"
              className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl mb-4 focus:outline-none focus:border-yellow-500/50" />
            <button onClick={handleChangePassword} className="w-full bg-yellow-500 text-[#0d0a1a] py-3 rounded-2xl font-black">Update</button>
            <button onClick={() => setShowPassword(false)} className="w-full text-gray-500 text-sm mt-2 py-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
