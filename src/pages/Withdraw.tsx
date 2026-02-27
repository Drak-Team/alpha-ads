import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, AlertCircle, Percent } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";
import { isValidPhone, sanitize, isValidAmount } from "@/lib/validation";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("jazzcash");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const { toast } = useToast();
  const balance = 1250;

  const num = Number(amount) || 0;
  const fee = Math.round(num * 0.1);
  const payout = num - fee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <p className="text-muted-foreground mt-1">Request a payout to your account</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Wallet className="w-6 h-6 text-primary" /></div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold font-heading gold-gradient-text">₨ {balance.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <AlertCircle className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">Minimum withdrawal: <strong>300 PKR</strong>. A <strong>10% service fee</strong> applies.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Amount (PKR)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" min={300} required className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            {num >= 300 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-secondary/50 rounded-xl p-4 space-y-2 border border-border/50">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Amount</span><span className="text-foreground">₨ {num.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground flex items-center gap-1"><Percent className="w-3 h-3" /> Service Fee (10%)</span><span className="text-destructive">- ₨ {fee.toLocaleString()}</span></div>
                <div className="border-t border-border/50 pt-2 flex justify-between text-sm font-bold"><span className="text-foreground">You Receive</span><span className="gold-gradient-text">₨ {payout.toLocaleString()}</span></div>
              </motion.div>
            )}

            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Payment Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option value="jazzcash">JazzCash</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Account Number</label>
              <input type="text" value={account} onChange={(e) => { setAccount(e.target.value.replace(/[^0-9]/g, "").slice(0, 11)); setAccountError(""); }} placeholder="03XXXXXXXXX" required className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              {accountError && <p className="text-xs text-destructive mt-1">{accountError}</p>}
            </div>

            <button type="submit" className="w-full py-3.5 gold-gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all gold-glow">Submit Withdrawal Request</button>
          </form>
        </motion.div>
      </div>
      <WhatsAppFloat />
    </DashboardLayout>
  );
};

export default Withdraw;
