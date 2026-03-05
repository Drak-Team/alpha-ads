import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Clock, Play, Calendar, Eye, Users, Sparkles, ArrowUpRight, ArrowDownLeft, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";

type Transaction = {
  id: string;
  date: string;
  time: string;
  type: "ad_earning" | "referral" | "spin" | "staking" | "withdrawal" | "deposit" | "bonus";
  description: string;
  amount: number;
  wallet: "ads" | "network" | "vault";
  status: "success" | "pending";
};

const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-03-05", time: "09:12", type: "bonus", description: "Signup Bonus", amount: 11, wallet: "ads", status: "success" },
];

const walletConfig = {
  ads: { label: "Ads Wallet", icon: Eye, colorClass: "from-[hsl(150_40%_22%)] to-[hsl(150_35%_30%)]", textClass: "text-[hsl(150_40%_22%)]", bgClass: "bg-[hsl(150_40%_22%/0.1)]" },
  network: { label: "Network Wallet", icon: Users, colorClass: "from-[hsl(43_96%_50%)] to-[hsl(35_95%_40%)]", textClass: "text-primary", bgClass: "bg-primary/10" },
  vault: { label: "Alpha Vault", icon: Sparkles, colorClass: "from-[hsl(43_90%_65%)] to-[hsl(43_96%_50%)]", textClass: "text-[hsl(43_90%_55%)]", bgClass: "bg-[hsl(43_90%_65%/0.1)]" },
};

const typeLabels: Record<Transaction["type"], string> = {
  ad_earning: "Ad Earning",
  referral: "Referral Bonus",
  spin: "Spin & Win",
  staking: "Staking Profit",
  withdrawal: "Withdrawal",
  deposit: "Deposit",
  bonus: "Bonus",
};

const Dashboard = () => {
  const [claimed, setClaimed] = useState(false);
  const [activeWalletFilter, setActiveWalletFilter] = useState<"all" | "ads" | "network" | "vault">("all");
  const { toast } = useToast();

  const adsWatched = 0;
  const adsRequired = 6;
  const canClaim = adsWatched >= adsRequired;
  const activePlan = "";
  const planDay = 0;
  const planDuration = 20;
  const planExpired = activePlan ? planDay > planDuration : false;
  const dailyProfit = activePlan && canClaim ? 25 : 0;

  // Wallet balances
  const adsBalance = 11;
  const networkBalance = 0;
  const vaultBalance = 0;
  const totalBalance = adsBalance + networkBalance + vaultBalance;

  const filteredTransactions = activeWalletFilter === "all"
    ? mockTransactions
    : mockTransactions.filter((t) => t.wallet === activeWalletFilter);

  const handleClaim = () => {
    if (planExpired) {
      toast({ title: "Plan Expired", description: "Your plan has ended. Please renew.", variant: "destructive" });
      return;
    }
    if (!activePlan) {
      toast({ title: "No Active Plan", description: "Purchase a plan first to start earning.", variant: "destructive" });
      return;
    }
    if (!canClaim) {
      toast({ title: "Watch ALL Ads First", description: `You must watch ALL ${adsRequired} ads to earn. ${adsWatched}/${adsRequired} completed.`, variant: "destructive" });
      return;
    }
    setClaimed(true);
    toast({ title: "Profit Claimed! 💰", description: `${dailyProfit} PKR added to Ads Wallet.` });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Welcome back, <span className="gold-gradient-text">Earner</span></h1>
        <p className="text-muted-foreground mt-1 font-medium">Here's your wallet overview</p>
      </div>

      {/* Triple Wallet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(Object.entries(walletConfig) as [keyof typeof walletConfig, typeof walletConfig.ads][]).map(([key, config], i) => {
          const balance = key === "ads" ? adsBalance : key === "network" ? networkBalance : vaultBalance;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden rounded-2xl p-6 text-secondary-foreground shadow-lg cursor-pointer card-hover"
              onClick={() => setActiveWalletFilter(activeWalletFilter === key ? "all" : key)}
              style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${config.colorClass}`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary-foreground/10 flex items-center justify-center">
                    <config.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  {activeWalletFilter === key && (
                    <span className="text-xs bg-secondary-foreground/20 px-2 py-1 rounded-full font-medium">Active Filter</span>
                  )}
                </div>
                <p className="text-sm text-secondary-foreground/70 font-medium">{config.label}</p>
                <p className="text-2xl font-bold font-heading mt-1">₨ {balance.toLocaleString()}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total Balance + Plan Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 shimmer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Total Balance</p>
              <p className="text-2xl font-bold mt-1 font-heading gold-gradient-text">₨ {totalBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 shimmer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Active Plan</p>
              <p className="text-2xl font-bold mt-1 font-heading gold-gradient-text">{activePlan || "None"}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {activePlan ? `Day ${planDay}/${planDuration}` : "No active plan"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Crown className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6 shimmer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Total Earned</p>
              <p className="text-2xl font-bold mt-1 font-heading gold-gradient-text">₨ {totalBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-6 shimmer">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold">Referral Bonus</p>
              <p className="text-2xl font-bold mt-1 font-heading gold-gradient-text">₨ 0</p>
              <p className="text-xs text-muted-foreground mt-1">0 referrals</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Plan expiry warning */}
      {activePlan && planDay >= (planDuration - 5) && !planExpired && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6 flex items-center gap-3 border-primary/30 border">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground font-medium">Your plan expires in <strong className="text-foreground">{planDuration - planDay} days</strong>. <Link to="/plans" className="text-primary hover:underline font-semibold">Renew now</Link></p>
        </motion.div>
      )}

      {/* Claim */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center animate-float"><Clock className="w-8 h-8 text-primary-foreground" /></div>
            <div>
              <h2 className="text-xl font-bold font-heading text-foreground">Daily Profit</h2>
              <p className="text-muted-foreground text-sm font-medium">
                {!activePlan ? "Purchase a plan to start earning" : claimed ? "Come back tomorrow!" : canClaim ? "Your daily profit is ready to claim" : `Watch ALL ${adsRequired} ads to unlock (${adsWatched}/${adsRequired})`}
              </p>
              {!canClaim && !claimed && (
                <Link to="/earn" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline font-semibold"><Play className="w-3 h-3" /> Go to Daily Claim</Link>
              )}
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-3xl font-bold font-heading gold-gradient-text mb-1">₨ {dailyProfit}</p>
            <p className="text-xs text-muted-foreground mb-3 font-semibold">Ads: {adsWatched}/{adsRequired}</p>
            <button onClick={handleClaim} disabled={claimed} className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${claimed ? "bg-muted text-muted-foreground cursor-not-allowed" : canClaim ? "gold-gradient-bg text-primary-foreground gold-glow pulse-gold hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
              {claimed ? "✓ Claimed Today" : canClaim ? "Claim Daily Profit" : "Ads Required"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
          <h3 className="text-lg font-bold font-heading text-foreground">Transaction History</h3>
          <div className="flex gap-2 flex-wrap">
            {(["all", "ads", "network", "vault"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveWalletFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeWalletFilter === filter
                    ? "gold-gradient-bg text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === "all" ? "All" : walletConfig[filter].label}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Date</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Time</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Type</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Wallet</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-semibold">Amount</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  const wConfig = walletConfig[tx.wallet];
                  return (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 text-foreground">{tx.date}</td>
                      <td className="py-3 px-2 text-muted-foreground">{tx.time}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {isPositive ? (
                            <ArrowDownLeft className="w-4 h-4 text-success" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-destructive" />
                          )}
                          <span className="text-foreground">{typeLabels[tx.type]}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${wConfig.bgClass} ${wConfig.textClass}`}>
                          <wConfig.icon className="w-3 h-3" />
                          {wConfig.label.split(" ")[0]}
                        </span>
                      </td>
                      <td className={`py-3 px-2 text-right font-bold ${isPositive ? "text-success" : "text-destructive"}`}>
                        {isPositive ? "+" : ""}₨ {Math.abs(tx.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          tx.status === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                        }`}>
                          {tx.status === "success" ? "Success" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      <WhatsAppFloat />
    </DashboardLayout>
  );
};

export default Dashboard;
