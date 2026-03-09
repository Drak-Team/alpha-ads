import React, { useState } from 'react';
import { 
  User, ShieldCheck, Wallet, Users, Settings, 
  LogOut, ChevronRight, Star, History, Bell,
  MessageSquare, Trash2, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleDeactivate = () => {
    const confirm = window.confirm("کیا آپ واقعی اپنا اکاؤنٹ ڈی ایکٹیویٹ کرنا چاہتے ہیں؟ اس کے بعد آپ لاگ ان نہیں کر سکیں گے۔");
    if (confirm) {
      alert("آپ کی درخواست ایڈمن کو بھیج دی گئی ہے۔");
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white font-sans overflow-y-auto pb-24 text-right">
      {/* 1. ہیڈر سیکشن */}
      <div className="bg-gradient-to-b from-black/40 to-transparent p-8 text-center relative">
        <div className="w-24 h-24 bg-gradient-to-tr from-yellow-600 to-yellow-400 rounded-full mx-auto mb-4 p-1 shadow-2xl">
          <div className="w-full h-full bg-emerald-900 rounded-full flex items-center justify-center text-4xl font-black border-2 border-white/10">A</div>
        </div>
        <h2 className="text-2xl font-black tracking-tight">احمد نفیس انجم</h2>
        <p className="text-xs opacity-50 mt-1 font-mono">ID: DP-982345</p>
      </div>

      <div className="px-6 space-y-4">
        {/* 2. تجاویز اور اکاؤنٹ آپشنز */}
        <div className="bg-white/5 rounded-[32px] border border-white/5 overflow-hidden">
          {/* تجاویز (Suggestions) */}
          <button 
            onClick={() => setShowSuggestion(true)}
            className="w-full p-5 flex items-center justify-between border-b border-white/5 hover:bg-white/5 transition-all"
          >
            <ChevronRight size={16} className="opacity-20" />
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold font-urdu">تجاویز بھیجیں (Suggestions)</span>
              <div className="bg-blue-600/20 p-2 rounded-xl text-blue-400"><MessageSquare size={18} /></div>
            </div>
          </button>

          {/* اکاؤنٹ ڈی ایکٹیویٹ (Deactivation) */}
          <button 
            onClick={handleDeactivate}
            className="w-full p-5 flex items-center justify-between hover:bg-red-600/10 transition-all text-red-400"
          >
            <ChevronRight size={16} className="opacity-20" />
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold font-urdu">اکاؤنٹ ختم کریں</span>
              <div className="bg-red-600/20 p-2 rounded-xl"><Trash2 size={18} /></div>
            </div>
          </button>
        </div>

        {/* 3. لاگ آؤٹ بٹن */}
        <button className="w-full bg-red-600/10 text-red-500 p-5 rounded-[28px] border border-red-500/10 flex items-center justify-between mt-6">
          <LogOut size={20} />
          <span className="font-bold font-urdu">لاگ آؤٹ کریں</span>
        </button>
      </div>

      {/* تجاویز پاپ اپ ونڈو */}
      {showSuggestion && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-6 z-[60] backdrop-blur-sm">
          <div className="bg-emerald-900 border border-white/10 w-full max-w-sm rounded-[40px] p-8 relative shadow-2xl">
            <button onClick={() => setShowSuggestion(false)} className="absolute top-6 left-6 opacity-40 hover:opacity-100"><X /></button>
            <h3 className="text-xl font-bold text-center mb-6 font-urdu">اپنی رائے دیں</h3>
            <textarea 
              placeholder="اپنی تجویز یہاں لکھیں..." 
              className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-right text-sm h-32 outline-none focus:border-yellow-500 transition-all"
            ></textarea>
            <button 
              onClick={() => { alert("شکریہ! آپ کی تجویز موصول ہوگئی۔"); setShowSuggestion(false); }}
              className="w-full bg-yellow-600 py-4 rounded-2xl font-bold mt-4 shadow-lg"
            >
              ارسال کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
