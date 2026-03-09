import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // URL سے ریفرل آئی ڈی حاصل کریں (مثال: ?ref=123)
  const referrerId = searchParams.get('ref');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. نیا اکاؤنٹ بنائیں
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    if (authData.user) {
      // 2. پروفائل ٹیبل میں ڈیٹا ڈالیں بشمول ریفرر آئی ڈی
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          referrer_id: referrerId || null // اگر لنک میں آئی ڈی ہے تو محفوظ کریں
        })
        .eq('id', authData.user.id);

      if (!profileError) {
        alert("اکاؤنٹ بن گیا ہے!");
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] flex items-center justify-center p-6">
      <form onSubmit={handleSignup} className="bg-white/10 p-8 rounded-[40px] w-full max-w-md border border-white/10 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6 font-urdu">نیا اکاؤنٹ بنائیں</h2>
        
        {referrerId && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-2xl mb-4 text-center">
            <p className="text-[10px] text-yellow-500 font-bold font-urdu">آپ ایک دوست کے ریفرل لنک سے جوائن کر رہے ہیں</p>
          </div>
        )}

        <input 
          type="text" placeholder="پورا نام" 
          className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-4 text-white text-right font-urdu"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input 
          type="email" placeholder="ای میل" 
          className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-4 text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" placeholder="پاس ورڈ" 
          className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-6 text-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-600/20">
          رجسٹر کریں
        </button>
      </form>
    </div>
  );
};

export default Signup;
