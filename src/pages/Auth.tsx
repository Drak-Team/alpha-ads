import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Lock, User, UserPlus } from "lucide-react";

const Auth = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // موبائل نمبر کو ای میل کی شکل میں تبدیل کرنا تاکہ سسٹم قبول کرے
    const fakeEmail = `${phone}@alpha.com`;

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password: password,
      });
      if (error) {
        toast({ title: "غلطی", description: "نمبر یا پاس ورڈ غلط ہے", variant: "destructive" });
      } else {
        navigate("/dashboard");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: fakeEmail,
        password: password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
            referral_by: referral
          }
        }
      });
      if (error) {
        toast({ title: "غلطی", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "کامیابی", description: "آپ کا اکاؤنٹ بن گیا ہے! اب لاگ ان کریں۔" });
        setIsLogin(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#004d40] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#fbbf24] p-6 text-center">
          <h1 className="text-2xl font-bold text-[#004d40]">ALPHA ADS & EARN</h1>
          <p className="text-sm font-medium opacity-80">پاکستان کا اپنا ارننگ پلیٹ فارم</p>
        </div>
        
        <form onSubmit={handleAuth} className="p-8 space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="پورا نام" 
                className="pl-10" 
                required 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="موبائل نمبر (03xxxxxxxxx)" 
              type="tel"
              className="pl-10" 
              required 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="پاس ورڈ" 
              type="password"
              className="pl-10" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="relative">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="ریفرل کوڈ (آپشنل)" 
                className="pl-10" 
                value={referral} 
                onChange={(e) => setReferral(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-[#004d40] font-bold py-6 rounded-xl" disabled={loading}>
            {loading ? "انتظار کریں..." : (isLogin ? "لاگ ان کریں" : "اکاؤنٹ بنائیں")}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? "اکاؤنٹ نہیں ہے؟ " : "پہلے سے اکاؤنٹ ہے؟ "}
            <span 
              className="text-[#004d40] font-bold cursor-pointer underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "سائن اپ کریں" : "لاگ ان کریں"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
