import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Clock, Play, Calendar, ArrowUpRight, ArrowDownLeft, DollarSign, Users, PiggyBank, ArrowDownToLine } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import HeroSlider from "@/components/HeroSlider";
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

const mockTransactions: Transaction[] = [];

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
  const { toast } = useToast();

  const adsWatched = 0;
  const adsRequired = 6;
  const canClaim = adsWatched >= adsRequired;
  const activePlan = "";
  const planDay = 0;
  const planDuration = 20;
  const planExpired = activePlan ? planDay > planDuration : false;
  const dailyProfit = activePlan && canClaim ? 25 : 0;

  // All balances reset to 0
  const totalBalance = 0;
  const todayEarning = 0;
  const totalDeposit = 0;
  const totalWithdrawal = 0;
  const activeInvestment = 0;
  const myTeam = 0;

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
    toast({ title: "Profit Claimed! 💰", description: `${dailyProfit} PKR added to your wallet.` });
  };

  const stats = [
    { label: "Total Balance", value: `₨ ${totalBalance.toLocaleString()}`, icon: Wallet, color: "text-primary" },
    { label: "Today's Earning", value: `₨ ${todayEarning.toLocaleString()}`, icon: TrendingUp, color: "text-success" },
    { label: "Total Deposit", value: `₨ ${totalDeposit.toLocaleString()}`, icon: ArrowDownToLine, color: "text-primary" },
    { label: "Total Withdrawal", value: `₨ ${totalWithdrawal.toLocaleString()}`, icon: ArrowUpRight, color: "text-destructive" },
    { label: "Active Investment", value: `₨ ${activeInvestment.toLocaleString()}`, icon: PiggyBank, color: "text-accent-foreground" },
    { label: "My Team", value: myTeam.toString(), icon: Users, color: "text-primary" },
  ];

  return (
    <DashboardLayout>
      {/* Compact Hero Slider */}
      <div className="mb-6">
        <HeroSlider compact />
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-3 flex flex-col items-center text-center card-hover"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-xs text-muted-foreground font-medium leading-tight">{stat.label}</p>
            <p className="text-sm font-bold font-heading gold-gradient-text mt-0.5">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Plan expiry warning */}
      {activePlan && planDay >= (planDuration - 5) && !planExpired && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6 flex items-center gap-3 border-primary/30 border">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-muted-foreground font-medium">Your plan expires in <strong className="text-foreground">{planDuration - planDay} days</strong>. <Link to="/plans" className="text-primary hover:underline font-semibold">Renew now</Link></p>
        </motion.div>
      )}

      {/* Claim */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center animate-float"><Clock className="w-6 h-6 text-primary-foreground" /></div>
            <div>
              <h2 className="text-lg font-bold font-heading text-foreground">Daily Profit</h2>
              <p className="text-muted-foreground text-xs font-medium">
                {!activePlan ? "Purchase a plan to start earning" : claimed ? "Come back tomorrow!" : canClaim ? "Ready to claim" : `Watch ALL ${adsRequired} ads (${adsWatched}/${adsRequired})`}
              </p>
              {!canClaim && !claimed && (
                <Link to="/earn" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline font-semibold"><Play className="w-3 h-3" /> Go to Daily Claim</Link>
              )}
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-2xl font-bold font-heading gold-gradient-text mb-1">₨ {dailyProfit}</p>
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Ads: {adsWatched}/{adsRequired}</p>
            <button onClick={handleClaim} disabled={claimed} className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${claimed ? "bg-muted text-muted-foreground cursor-not-allowed" : canClaim ? "gold-gradient-bg text-primary-foreground gold-glow pulse-gold hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
              {claimed ? "✓ Claimed Today" : canClaim ? "Claim Daily Profit" : "Ads Required"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="text-lg font-bold font-heading text-foreground mb-4">Transaction History</h3>
        {mockTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Date</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-semibold">Type</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-semibold">Amount</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 text-foreground">{tx.date}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          {isPositive ? <ArrowDownLeft className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-destructive" />}
                          <span className="text-foreground">{typeLabels[tx.type]}</span>
                        </div>
                      </td>
                      <td className={`py-3 px-2 text-right font-bold ${isPositive ? "text-success" : "text-destructive"}`}>
                        {isPositive ? "+" : ""}₨ {Math.abs(tx.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${tx.status === "success" ? "bg-success/10 text-success" : "bg-primary/10 text-primary"}`}>
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
    </DashboardLayout>
  );
};

export default Dashboard;
