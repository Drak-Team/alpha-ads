import React from 'react';
import { MessageSquare, Users, MessageCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 pb-28 font-sans text-right">
      <div className="flex items-center justify-between mb-10">
        <button onClick={() => navigate(-1)} className="bg-white/5 p-2 rounded-full"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold font-urdu text-purple-400">چیٹ اور سپورٹ</h2>
        <div className="w-10"></div>
      </div>

      <div className="space-y-6">
        {/* آفیشل واٹس ایپ کارڈ */}
        <a href="https://wa.me/923037264598" target="_blank" rel="noreferrer" 
           className="bg-gradient-to-br from-green-600/20 to-green-900/40 border border-green-500/20 p-6 rounded-[35px] block shadow-2xl active:scale-95 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg shadow-green-600/20"><MessageCircle size={24} /></div>
            <div className="text-right">
              <h3 className="font-bold text-lg font-urdu">ایڈمن واٹس ایپ</h3>
              <p className="text-[10px] opacity-60">کسی بھی مسئلے کے لیے رابطہ کریں</p>
            </div>
          </div>
          <div className="w-full bg-green-600 py-3 rounded-2xl text-center font-bold text-sm">میسج کریں (Chat Now)</div>
        </a>

        {/* کمیونٹی گروپ کارڈ */}
        <a href="#" className="bg-gradient-to-br from-purple-600/20 to-purple-900/40 border border-purple-500/20 p-6 rounded-[35px] block shadow-2xl active:scale-95 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-600 p-3 rounded-2xl shadow-lg shadow-purple-600/20"><Users size={24} /></div>
            <div className="text-right">
              <h3 className="font-bold text-lg font-urdu">ممبرز گروپ</h3>
              <p className="text-[10px] opacity-60">ٹیم کے ساتھ جڑے رہیں</p>
            </div>
          </div>
          <div className="w-full bg-purple-600 py-3 rounded-2xl text-center font-bold text-sm">گروپ جوائن کریں</div>
        </a>

        {/* سیکیورٹی الرٹ */}
        <div className="bg-white/5 p-5 rounded-[30px] border border-white/5 flex items-start gap-3">
          <ShieldCheck size={20} className="text-yellow-500 shrink-0" />
          <p className="text-[10px] font-urdu opacity-50 leading-relaxed">
            محفوظ رہیں! کمپنی کا کوئی بھی نمائندہ آپ سے آپ کا پاس ورڈ یا پن نہیں مانگے گا۔ اپنی معلومات کسی کو نہ دیں۔
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
      
