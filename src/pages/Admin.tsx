import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Clock, Users, Wallet, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

type Tab = "deposits" | "withdrawals" | "users";

const deposits = [
  { id: 1, user: "Ali Khan", amount: 3500, plan: "Gold VIP", date: "Feb 24", status: "pending" },
  { id: 2, user: "Sara Malik", amount: 1200, plan: "Silver VIP", date: "Feb 23", status: "approved" },
  { id: 3, user: "Ahmed Raza", amount: 6000, plan: "Platinum VIP", date: "Feb 22", status: "pending" },
];

const withdrawals = [
  { id: 1, user: "Ali Khan", amount: 1500, method: "JazzCash", account: "0300*****12", date: "Feb 25", status: "pending" },
  { id: 2, user: "Fatima N.", amount: 800, method: "EasyPaisa", account: "0321*****45", date: "Feb 24", status: "approved" },
];

const Admin = () => {
  const [tab, setTab] = useState<Tab>("deposits");
  const { toast } = useToast();

  const handleAction = (type: string, id: number, action: "approve" | "reject") => {
    toast({
      title: action === "approve" ? "Approved ✓" : "Rejected ✗",
      description: `${type} #${id} has been ${action}d.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Admin Panel</h1>
          <p className="text-muted-foreground text-sm">Manage deposits, withdrawals & users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard title="Total Users" value="156" icon={Users} delay={0} />
        <StatsCard title="Pending Deposits" value="3" icon={TrendingUp} delay={0.1} />
        <StatsCard title="Pending Withdrawals" value="2" icon={Wallet} delay={0.2} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["deposits", "withdrawals", "users"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
              tab === t
                ? "gold-gradient-bg text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        {tab === "deposits" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Plan</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{d.user}</td>
                    <td className="p-4 text-muted-foreground">{d.plan}</td>
                    <td className="p-4 font-semibold gold-gradient-text">₨ {d.amount.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{d.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        d.status === "pending" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                      }`}>
                        {d.status === "pending" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {d.status === "pending" && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => handleAction("Deposit", d.id, "approve")} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleAction("Deposit", d.id, "reject")} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "withdrawals" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">User</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Method</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Account</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-medium text-foreground">{w.user}</td>
                    <td className="p-4 font-semibold gold-gradient-text">₨ {w.amount.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">{w.method}</td>
                    <td className="p-4 text-muted-foreground">{w.account}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        w.status === "pending" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"
                      }`}>
                        {w.status === "pending" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        {w.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {w.status === "pending" && (
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => handleAction("Withdrawal", w.id, "approve")} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleAction("Withdrawal", w.id, "reject")} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "users" && (
          <div className="p-8 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">User management coming soon. Connect Lovable Cloud to enable full user data.</p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Admin;
