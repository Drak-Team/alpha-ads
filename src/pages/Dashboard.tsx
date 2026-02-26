import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Gift, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [claimed, setClaimed] = useState(false);
  const { toast } = useToast();

  const handleClaim = () => {
    setClaimed(true);
    toast({
      title: "Profit Claimed! 💰",
      description: "120 PKR has been added to your wallet.",
    });
  };

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">
          Welcome back, <span className="gold-gradient-text">Investor</span>
        </h1>
        <p className="text-muted-foreground mt-1">Here's your portfolio overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Balance" value="₨ 1,250" icon={Wallet} trend="+120 today" delay={0} />
        <StatsCard title="Active Plan" value="Silver VIP" icon={Crown} subtitle="Day 5 of 30" delay={0.1} />
        <StatsCard title="Total Earned" value="₨ 600" icon={TrendingUp} trend="+8.5% this week" delay={0.2} />
        <StatsCard title="Referral Bonus" value="₨ 350" icon={Gift} subtitle="3 referrals" delay={0.3} />
      </div>

      {/* Claim Daily Profit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center animate-float">
              <Clock className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-foreground">Daily Profit</h2>
              <p className="text-muted-foreground text-sm">
                {claimed ? "Come back tomorrow for your next reward!" : "Your daily profit is ready to claim"}
              </p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-3xl font-bold font-heading gold-gradient-text mb-3">₨ 120</p>
            <button
              onClick={handleClaim}
              disabled={claimed}
              className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                claimed
                  ? "bg-secondary text-muted-foreground cursor-not-allowed"
                  : "gold-gradient-bg text-primary-foreground gold-glow pulse-gold hover:opacity-90"
              }`}
            >
              {claimed ? "✓ Claimed Today" : "Claim Daily Profit"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-bold font-heading text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: "Daily Profit Claimed", amount: "+₨ 120", time: "Today", type: "earn" },
            { action: "Silver VIP Plan Activated", amount: "-₨ 1,200", time: "5 days ago", type: "spend" },
            { action: "Referral Bonus", amount: "+₨ 120", time: "1 week ago", type: "earn" },
            { action: "Signup Bonus", amount: "+₨ 50", time: "2 weeks ago", type: "earn" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              <span className={`text-sm font-bold ${item.type === "earn" ? "text-success" : "text-destructive"}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
