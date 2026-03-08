import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

const ADMIN_NAME = "Ahmad Nafees Anjum";
const ADMIN_PHONE = "03037264598";
const TELEGRAM_ID = "@mranjum143";
const MIN_WITHDRAW_PKR = 50;
const DEPOSIT_RATE = 300;
const WITHDRAW_RATE = 280;

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // یوزر ڈیٹا لوڈ کرنا
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">لوڈنگ ہو رہی ہے...</div>;

  return (
    <div className="min-h-screen bg-emerald-900 text-white p-4">
      {/* ہیڈر */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-500">Dollar Plus Ads & Earn</h1>
        <p className="text-sm opacity-80">خوش آمدید، {profile?.full_name || 'یوزر'}</p>
      </div>

      {/* 6 ارننگ کارڈز (ڈبے) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">ٹوٹل بیلنس</p>
          <h2 className="text-xl font-bold">${profile?.balance || '0.00'}</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">آج کی ارننگ</p>
          <h2 className="text-xl font-bold">$0.20</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">کل ڈپازٹ</p>
          <h2 className="text-xl font-bold">${profile?.total_deposit || '0.00'}</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">پینڈنگ ودڈرا</p>
          <h2 className="text-xl font-bold">$0.00</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">کامیاب ودڈرا</p>
          <h2 className="text-xl font-bold">$0.00</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
          <p className="text-xs opacity-70">ایکٹیو پلان</p>
          <h2 className="text-xl font-bold">Basic ($2)</h2>
        </div>
      </div>

      {/* اردو پیغام اور سپورٹ */}
      <div className="bg-yellow-600 p-4 rounded-xl text-center mb-6">
        <p className="font-bold">پاکستان کا اپنا ارننگ پلیٹ فارم</p>
        <p className="text-xs mt-1">کم سے کم ودڈرا 50 روپے ہے</p>
        <a href={`https://t.me/${TELEGRAM_ID.replace('@','')}`} className="inline-block mt-3 bg-blue-500 px-4 py-2 rounded-lg text-sm font-bold">ٹیلی گرام سپورٹ</a>
      </div>

      {/* ایڈز بٹن */}
      <button className="w-full bg-white text-emerald-900 font-bold py-4 rounded-xl shadow-lg hover:bg-yellow-500 transition-all">
        آج کے 6 اشتہارات دیکھیں
      </button>

      <div className="text-center mt-6 text-xs opacity-60">
        ایڈز کی آمدنی 24 گھنٹے بعد آپ کے والٹ میں جمع ہوگی
      </div>
    </div>
  );
};

export default Dashboard;
