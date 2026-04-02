import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from 'react-router-dom';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const referralCode = searchParams.get('ref');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: fullName,
              referred_by: referralCode || undefined,
            },
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        alert("اکاؤنٹ بن گیا! براہ کرم اپنا ای میل چیک کریں۔");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-[40px] w-full max-w-md border border-white/10 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-white text-center mb-2 font-urdu">
          {isLogin ? "لاگ ان کریں" : "نیا اکاؤنٹ بنائیں"}
        </h2>
        <p className="text-center text-white/50 text-xs mb-6">Gold Plus Platform</p>

        {!isLogin && referralCode && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-2xl mb-4 text-center">
            <p className="text-[10px] text-yellow-500 font-bold font-urdu">ریفرل کوڈ: {referralCode}</p>
          </div>
        )}

        {!isLogin && (
          <input 
            type="text" placeholder="پورا نام" value={fullName}
            className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-4 text-white text-right font-urdu placeholder:text-white/30"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}
        <input 
          type="email" placeholder="ای میل" value={email}
          className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-4 text-white placeholder:text-white/30"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" placeholder="پاس ورڈ" value={password}
          className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl mb-6 text-white placeholder:text-white/30"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg disabled:opacity-50"
        >
          {loading ? "انتظار..." : isLogin ? "لاگ ان" : "رجسٹر کریں"}
        </button>

        <button 
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-white/50 text-sm mt-4 py-2"
        >
          {isLogin ? "نیا اکاؤنٹ بنائیں؟" : "پہلے سے اکاؤنٹ ہے؟ لاگ ان کریں"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
