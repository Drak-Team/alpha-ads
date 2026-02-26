import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("jazzcash");
  const [account, setAccount] = useState("");
  const { toast } = useToast();
  const balance = 1250;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (num < 500) {
      toast({ title: "Minimum 500 PKR", description: "You need at least 500 PKR to withdraw.", variant: "destructive" });
      return;
    }
    if (num > balance) {
      toast({ title: "Insufficient Balance", description: "You don't have enough balance.", variant: "destructive" });
      return;
    }
    toast({ title: "Withdrawal Requested! ✓", description: "Admin will process your request within 24 hours." });
    setAmount("");
    setAccount("");
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Withdraw Funds</h1>
          <p className="text-muted-foreground mt-1">Request a payout to your account</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold font-heading gold-gradient-text">₨ {balance.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <AlertCircle className="w-4 h-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">Minimum withdrawal: 500 PKR. Processed within 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Amount (PKR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min={500}
                required
                className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Payment Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="jazzcash">JazzCash</option>
                <option value="easypaisa">EasyPaisa</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground font-medium block mb-2">Account Number</label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Enter account number"
                required
                className="w-full px-4 py-3.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 gold-gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all gold-glow"
            >
              Submit Withdrawal Request
            </button>
          </form>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
