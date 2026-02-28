import { motion } from "framer-motion";
import { Copy, Users, Gift, Share2, Link as LinkIcon } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const referrals = [
  { name: "Ali K.", date: "Jan 15, 2026", bonus: "₨ 100", status: "Credited" },
  { name: "Sara M.", date: "Jan 20, 2026", bonus: "₨ 350", status: "Credited" },
  { name: "Ahmed R.", date: "Feb 01, 2026", bonus: "₨ 0", status: "Pending Deposit" },
];

const Referral = () => {
  const { toast } = useToast();
  const code = "SAP-INV-X7K9";
  const referralLink = `${window.location.origin}/auth?mode=signup&ref=${code}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Link Copied!", description: "Share this link with friends to earn 10% bonus." });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code Copied!", description: "Referral code copied to clipboard." });
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Referral Program</h1>
          <p className="text-foreground/60 mt-1 font-medium">Earn 10% of every friend's first deposit</p>
        </div>

        {/* Referral Link */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-6 text-center">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto mb-4 animate-float">
            <Share2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-bold font-heading text-foreground mb-4">Your Referral Link</h2>
          
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl border border-border mb-3">
            <LinkIcon className="w-4 h-4 text-foreground/50 shrink-0" />
            <span className="text-xs text-foreground/60 truncate flex-1 text-left font-mono">{referralLink}</span>
            <button onClick={copyLink} className="shrink-0 px-3 py-1.5 gold-gradient-bg text-primary-foreground text-xs font-semibold rounded-lg hover:opacity-90 transition-all">
              Copy
            </button>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary rounded-xl border border-border">
            <span className="text-sm text-foreground/60 font-medium">Code:</span>
            <span className="text-lg font-mono font-bold gold-gradient-text tracking-wider">{code}</span>
            <button onClick={copyCode} className="text-foreground/50 hover:text-primary transition-colors">
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-heading gold-gradient-text">3</p>
            <p className="text-xs text-foreground/60 font-medium">Total Referrals</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 text-center">
            <Gift className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold font-heading gold-gradient-text">₨ 450</p>
            <p className="text-xs text-foreground/60 font-medium">Total Earned</p>
          </motion.div>
        </div>

        {/* Referral List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-lg font-bold font-heading text-foreground mb-4">Your Referrals</h3>
          <div className="space-y-3">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-foreground/50">{r.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-success">{r.bonus}</p>
                  <p className="text-xs text-foreground/50">{r.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Referral;
