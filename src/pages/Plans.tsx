import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, CheckCircle, Calendar, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import PlanCard from "@/components/PlanCard";
import { useToast } from "@/hooks/use-toast";

const plans = [
  { name: "Free Plan", price: 0, dailyReturn: 10, totalReturn: 300, duration: 30, adsRequired: 10, icon: "star" as const },
  { name: "Silver", price: 1000, dailyReturn: 60, totalReturn: 1800, duration: 30, adsRequired: 6, icon: "trending" as const },
  { name: "Gold", price: 3500, dailyReturn: 180, totalReturn: 5400, duration: 30, adsRequired: 4, icon: "crown" as const, featured: true },
  { name: "VIP", price: 6000, dailyReturn: 350, totalReturn: 10500, duration: 30, adsRequired: 2, icon: "zap" as const },
];

const Plans = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleBuy = (name: string, price: number) => {
    if (price === 0) {
      toast({ title: "Free Plan Activated! 🎉", description: "Watch 10 ads daily to earn 10 PKR. Go to the Daily Claim page." });
      return;
    }
    setSelectedPlan(name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid File", description: "Please upload an image file.", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "Maximum file size is 5MB.", variant: "destructive" });
        return;
      }
      setScreenshot(file);
    }
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshot) {
      toast({ title: "Screenshot Required", description: "Please upload your payment screenshot.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Deposit Submitted! ✓", description: `Your ${selectedPlan} plan deposit is pending admin approval.` });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-heading text-foreground"><span className="gold-gradient-text">Investment Plans</span></h1>
        <p className="text-muted-foreground mt-2">Choose a plan, watch ads daily, and earn profits for 30 days</p>
      </div>

      {/* 30-day expiry notice */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto mb-6 flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <Calendar className="w-5 h-5 text-primary shrink-0" />
        <p className="text-sm text-muted-foreground">All plans run for <strong className="text-foreground">30 days</strong>. After expiry, earnings stop until you renew.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} {...plan} delay={i * 0.1} onBuy={() => handleBuy(plan.name, plan.price)} />
        ))}
      </div>

      {/* Deposit Modal */}
      {selectedPlan && !submitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setSelectedPlan(null)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold font-heading gold-gradient-text mb-2">Deposit for {selectedPlan}</h2>
            <p className="text-sm text-muted-foreground mb-6">Send payment to the account below and upload screenshot for admin approval.</p>
            <div className="bg-secondary rounded-xl p-4 mb-4 space-y-2">
              <p className="text-xs text-muted-foreground">Payment Account</p>
              <p className="text-foreground font-mono font-bold">JazzCash: 03037264598</p>
              <p className="text-foreground font-mono font-bold">EasyPaisa: 03037264598</p>
              <p className="text-xs text-muted-foreground mt-2">Amount: <span className="text-primary font-bold">₨ {plans.find(p => p.name === selectedPlan)?.price.toLocaleString()}</span></p>
            </div>
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
              <p className="text-xs text-muted-foreground">Plan activates only after admin approves your deposit.</p>
            </div>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground font-medium block mb-2">Payment Screenshot</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors bg-secondary/50">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  {screenshot ? (
                    <div className="flex items-center gap-2 text-success"><ImageIcon className="w-5 h-5" /><span className="text-sm font-medium">{screenshot.name}</span></div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground"><Upload className="w-6 h-6" /><span className="text-xs">Tap to upload screenshot</span></div>
                  )}
                </label>
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedPlan(null)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl gold-gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all gold-glow">Submit Deposit</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {submitted && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto mt-8 glass-card p-8 text-center">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
          <h3 className="text-lg font-bold font-heading text-foreground">Deposit Pending Approval</h3>
          <p className="text-sm text-muted-foreground mt-2">Your {selectedPlan} plan will activate once admin approves your deposit. Plan runs for 30 days from activation.</p>
          <button onClick={() => { setSubmitted(false); setSelectedPlan(null); setScreenshot(null); }} className="mt-4 px-6 py-2 bg-secondary text-foreground rounded-xl text-sm hover:bg-secondary/80 transition-all">Back to Plans</button>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Plans;
