import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, AlertCircle, Percent, Clock, ShieldAlert, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";
import { isValidPhone, sanitize, isValidAmount } from "@/lib/validation";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("jazzcash");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [showFreePlanPopup, setShowFreePlanPopup] = useState(false);
  const { toast } = useToast();
  const balance = 0;
  const currentPlan = "Free"; // mock — would come from user state
  const activatedReferrals = 2; // mock
  const queuePosition = 3; // mock
  const estimatedTime = 30 + (queuePosition - 1) * 20; // 30 min + 20 per position

  const num = Number(amount) || 0;
  const fee = Math.round(num * 0.1);
  const payout = num - fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Free plan restriction check
    if (currentPlan === "Free" && activatedReferrals < 5) {
      setShowFreePlanPopup(true);
      return;
    }

    if (!isValidAmount(num, 300, balance)) {
      toast({ title: num < 300 ? "Minimum 300 PKR" : "Insufficient Balance", description: num < 300 ? "You need at least 300 PKR to withdraw." : "You don't have enough balance.", variant: "destructive" });
      return;
    }
    if (!isValidPhone(account)) {
      setAccountError("Enter a valid Pakistani number (03XXXXXXXXX)");
      return;
    }
    setAccountError("");
    toast({ title: "Withdrawal Requested! ✓", description: `₨ ${payout.toLocaleString()} will be sent after admin approval (₨ ${fee} service fee deducted).` });
    setAmount(""); setAccount("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Withdraw Funds</h1>
          <p className="text-foreground/60 mt-1 font-medium">Request a payout to your account</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Wallet className="w-6 h-6 text-primary" /></div>
            <div>
              <p className="text-sm text-foreground/70 font-semibold">Available Balance</p>
              <p className="text-2xl font-bold font-heading gold-gradient-text">₨ {balance.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Queue estimate */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-4 mb-6 flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Queue Position: #{queuePosition}</p>
            <p className="text-xs text-foreground/60">Estimated processing time: <strong className="text-primary">~{estimatedTime} minutes</strong></p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <AlertCircle className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-foreground/60 font-medium">Minimum withdrawal: <strong className="text-foreground">300 PKR</strong>. A <strong className="text-foreground">10% service fee</strong> applies.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-foreground/70 font-semibold block mb-2">Amount (PKR)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" min={300} required className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            {num >= 300 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex justify-between text-sm"><span className="text-foreground/60 font-medium">Amount</span><span className="text-foreground font-semibold">₨ {num.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-foreground/60 font-medium flex items-center gap-1"><Percent className="w-3 h-3" /> Service Fee (10%)</span><span className="text-destructive font-semibold">- ₨ {fee.toLocaleString()}</span></div>
                <div className="border-t border-border/50 pt-2 flex justify-between text-sm font-bold"><span className="text-foreground">You Receive</span><span className="gold-gradient-text">₨ {payout.toLocaleString()}</span></div>
              </motion.div>
            )}

            <div>
              <label className="text-sm text-foreground/70 font-semibold block mb-2">Payment Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="jazzcash">JazzCash</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-foreground/70 font-semibold block mb-2">Account Number</label>
              <input type="text" value={account} onChange={(e) => { setAccount(e.target.value.replace(/[^0-9]/g, "").slice(0, 11)); setAccountError(""); }} placeholder="03XXXXXXXXX" required className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              {accountError && <p className="text-xs text-destructive mt-1">{accountError}</p>}
            </div>

            <button type="submit" className="w-full py-3.5 gold-gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all gold-glow">Submit Withdrawal Request</button>
          </form>
        </motion.div>
      </div>

      {/* Free Plan Popup */}
      {showFreePlanPopup && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setShowFreePlanPopup(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-8 w-full max-w-md text-center" onClick={(e) => e.stopPropagation()}>
            <ShieldAlert className="w-14 h-14 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold font-heading gold-gradient-text mb-3">Withdrawal Locked</h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6">
              To unlock withdrawals, you must either <strong className="text-foreground">upgrade to a VIP Plan</strong> (Silver, Gold, or VIP) <strong className="text-foreground">OR</strong> invite <strong className="text-foreground">5 friends</strong> who activate any plan.
            </p>
            <div className="flex items-center justify-center gap-2 mb-6 text-sm text-foreground/60">
              <Users className="w-4 h-4 text-primary" />
              Your activated referrals: <strong className="text-foreground">{activatedReferrals}/5</strong>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowFreePlanPopup(false)} className="flex-1 py-3 rounded-xl bg-secondary text-foreground font-medium text-sm hover:bg-secondary/80 transition-all">Close</button>
              <a href="/plans" className="flex-1 py-3 rounded-xl gold-gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all gold-glow text-center">Upgrade Plan</a>
            </div>
          </motion.div>
        </motion.div>
      )}

      <WhatsAppFloat />
    </DashboardLayout>
  );
};

export default Withdraw;
