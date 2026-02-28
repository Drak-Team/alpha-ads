import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Gift, Clock, Play, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [claimed, setClaimed] = useState(false);
  const { toast } = useToast();
  const adsWatched = 4;
  const adsRequired = 6;
  const canClaim = adsWatched >= adsRequired;
  const planDay = 5;
  const planDuration = 30;
  const planExpired = planDay > planDuration;

  const handleClaim = () => {
    if (planExpired) {
      toast({ title: "Plan Expired", description: "Your 30-day plan has ended. Please renew.", variant: "destructive" });
      return;
    }
    if (!canClaim) {
      toast({ title: "Watch Ads First", description: `Watch ${adsRequired - adsWatched} more ads before claiming.`, variant: "destructive" });
      return;
    }
    setClaimed(true);
    toast({ title: "Profit Claimed! 💰", description: "60 PKR has been added to your wallet." });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Welcome back, <span className="gold-gradient-text">Investor</span></h1>
        <p className="text-foreground/60 mt-1 font-medium">Here's your portfolio overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Balance" value="₨ 0" icon={Wallet} trend="" delay={0} />
        <StatsCard title="Active Plan" value="None" icon={Crown} subtitle="No active plan" delay={0.1} />
        <StatsCard title="Total Earned" value="₨ 0" icon={TrendingUp} trend="" delay={0.2} />
        <StatsCard title="Referral Bonus" value="₨ 0" icon={Gift} subtitle="0 referrals" delay={0.3} />
      </div>

      {/* Plan expiry warning */}
      {planDay >= 25 && !planExpired && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-4 mb-6 flex items-center gap-3 border-primary/30 border">
          <Calendar className="w-5 h-5 text-primary shrink-0" />
          <p className="text-sm text-foreground/70 font-medium">Your plan expires in <strong className="text-foreground">{planDuration - planDay} days</strong>. <Link to="/plans" className="text-primary hover:underline font-semibold">Renew now</Link></p>
        </motion.div>
      )}

      {/* Claim */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center animate-float"><Clock className="w-8 h-8 text-primary-foreground" /></div>
            <div>
              <h2 className="text-xl font-bold font-heading text-foreground">Daily Profit</h2>
              <p className="text-foreground/60 text-sm font-medium">
                {claimed ? "Come back tomorrow!" : canClaim ? "Your daily profit is ready to claim" : `Watch ${adsRequired - adsWatched} more ads to unlock`}
              </p>
              {!canClaim && !claimed && (
                <Link to="/earn" className="inline-flex items-center gap-1 text-xs text-primary mt-1 hover:underline font-semibold"><Play className="w-3 h-3" /> Go to Daily Claim</Link>
              )}
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-3xl font-bold font-heading gold-gradient-text mb-1">₨ 60</p>
            <p className="text-xs text-foreground/60 mb-3 font-semibold">Ads: {adsWatched}/{adsRequired}</p>
            <button onClick={handleClaim} disabled={claimed} className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${claimed ? "bg-secondary text-muted-foreground cursor-not-allowed" : canClaim ? "gold-gradient-bg text-primary-foreground gold-glow pulse-gold hover:opacity-90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
              {claimed ? "✓ Claimed Today" : canClaim ? "Claim Daily Profit" : "Ads Required"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Activity */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
        <h3 className="text-lg font-bold font-heading text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center py-6">No activity yet. Purchase a plan to start earning!</p>
        </div>
      </motion.div>
      <WhatsAppFloat />
    </DashboardLayout>
  );
};

export default Dashboard;
