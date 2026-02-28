import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Mail, Lock, User, Users, ArrowRight, Eye, EyeOff, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sanitize, isValidEmail, isStrongPassword, isValidPhone, checkRateLimit } from "@/lib/validation";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import logo from "@/assets/logo.png";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const [isSignup, setIsSignup] = useState(searchParams.get("mode") === "signup" || !!refCode);
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referral, setReferral] = useState(refCode);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (isSignup && !name.trim()) e.name = "Name is required";
    if (!isValidEmail(email)) e.email = "Invalid email address";
    if (isSignup && !isStrongPassword(password)) e.password = "Min 8 chars, 1 uppercase, 1 number";
    if (!isSignup && !password) e.password = "Password is required";
    if (isSignup && phone && !isValidPhone(phone)) e.phone = "Invalid Pakistani number (03XXXXXXXXX)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit("auth", 5, 60000)) {
      toast({ title: "Too Many Attempts", description: "Please wait 1 minute before trying again.", variant: "destructive" });
      return;
    }
    if (!validate()) return;

    toast({
      title: isSignup ? "Account Created! 🎉" : "Welcome Back!",
      description: isSignup ? "You've received 50 PKR signup bonus!" : "Redirecting to your dashboard...",
    });
    setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
  };

  const inputCls = "w-full pl-12 pr-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />
         <div className="relative text-center px-12">
           <img src={logo} alt="Smart Ads Pakistan" className="w-20 h-20 rounded-2xl mx-auto mb-8 animate-float" />
           <h2 className="text-4xl font-black font-heading gold-gradient-text">Smart Ads Pakistan</h2>
           <p className="mt-4 text-muted-foreground max-w-sm mx-auto">Premium investment platform. Invest smart, earn daily.</p>
         </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
           <div className="lg:hidden flex items-center gap-3 mb-10">
             <img src={logo} alt="Smart Ads Pakistan" className="w-10 h-10 rounded-xl" />
             <span className="text-xl font-bold font-heading gold-gradient-text">Smart Ads Pakistan</span>
           </div>

          <h1 className="text-3xl font-bold font-heading text-foreground">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-muted-foreground mt-2">{isSignup ? "Get 50 PKR bonus on signup!" : "Login to your dashboard"}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            {isSignup && (
              <div>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(sanitize(e.target.value))} className={inputCls} />
                </div>
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 255))} className={inputCls} />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            {isSignup && (
              <div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input type="tel" placeholder="Phone Number (03XXXXXXXXX)" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 11))} className={inputCls} />
                </div>
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
            )}

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-12 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            {isSignup && (
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Referral Code (optional)" value={referral} onChange={(e) => setReferral(sanitize(e.target.value))} className={inputCls} />
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 gold-gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all gold-glow">
              {isSignup ? "Create Account" : "Login"} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => { setIsSignup(!isSignup); setErrors({}); }} className="text-primary font-semibold hover:underline">
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </motion.div>
      </div>
      <WhatsAppFloat />
    </div>
  );
};

export default Auth;
