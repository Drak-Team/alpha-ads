import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Crown } from 'lucide-react';

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
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            data: { display_name: fullName, referred_by: referralCode || undefined },
            emailRedirectTo: window.location.origin,
          }
        });
        if (error) throw error;
        alert("اکاؤنٹ بن گیا! ای میل چیک کریں۔ ✅");
      }
    } catch (error: any) { alert(error.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0d0a1a] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-[#1a1035] p-8 rounded-3xl w-full max-w-md border border-purple-500/20 shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
            <Crown className="text-[#0d0a1a]" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white text-center mb-1">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-center text-yellow-500 text-xs mb-6 font-bold">Gold Plus Platform</p>

        {!isLogin && referralCode && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-2xl mb-4 text-center">
            <p className="text-[10px] text-yellow-500 font-bold">Referral: {referralCode}</p>
          </div>
        )}

        {!isLogin && (
          <input type="text" placeholder="Full Name" value={fullName}
            className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl mb-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50"
            onChange={e => setFullName(e.target.value)} required />
        )}
        <input type="email" placeholder="Email" value={email}
          className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl mb-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50"
          onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          className="w-full bg-black/30 border border-white/10 p-4 rounded-2xl mb-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-yellow-500/50"
          onChange={e => setPassword(e.target.value)} required />

        <button type="submit" disabled={loading}
          className="w-full bg-yellow-500 text-[#0d0a1a] font-black py-4 rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-95 transition-transform disabled:opacity-50">
          {loading ? "Please wait..." : isLogin ? "Log In" : "Register"}
        </button>

        <button type="button" onClick={() => setIsLogin(!isLogin)}
          className="w-full text-center text-gray-500 text-sm mt-4 py-2">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Log In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
