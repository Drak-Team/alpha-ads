import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // اگر پہلے سے لاگ ان ہے تو ڈیش بورڈ بھیج دو
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
  }, [navigate]);

  const handleAuth = async (type: "login" | "signup") => {
    setLoading(true);
    const { data, error } = type === "login" 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      if (type === "signup") {
        toast({ title: "کامیابی", description: "اپنا ای میل ان باکس چیک کریں!" });
      } else {
        navigate("/dashboard");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary">لاگ ان / سائن اپ</h1>
        <Input 
          type="email" 
          placeholder="ای میل درج کریں" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="پاس ورڈ" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <div className="flex gap-2">
          <Button onClick={() => handleAuth("login")} className="flex-1" disabled={loading}>
            {loading ? "انتظار کریں..." : "لاگ ان"}
          </Button>
          <Button onClick={() => handleAuth("signup")} variant="outline" className="flex-1" disabled={loading}>
            سائن اپ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
          
