import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Clock, Users, Wallet, TrendingUp, Image as ImageIcon, DollarSign, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PHONE = "03037264598";

type Tab = "deposits" | "withdrawals" | "users";

const deposits = [
  { id: 1, user: "Ali Khan", amount: 3500, plan: "Gold", date: "Feb 24", status: "pending", screenshot: "payment_ss_1.jpg" },
  { id: 2, user: "Sara Malik", amount: 1000, plan: "Silver", date: "Feb 23", status: "approved", screenshot: "payment_ss_2.jpg" },
  { id: 3, user: "Ahmed Raza", amount: 6000, plan: "VIP", date: "Feb 22", status: "pending", screenshot: "payment_ss_3.jpg" },
];

const withdrawals = [
  { id: 1, user: "Ali Khan", amount: 1500, fee: 150, payout: 1350, method: "JazzCash", account: "0300*****12", date: "Feb 25", status: "pending" },
  { id: 2, user: "Fatima N.", amount: 800, fee: 80, payout: 720, method: "EasyPaisa", account: "0321*****45", date: "Feb 24", status: "approved" },
];

const users = [
  { id: 1, name: "Ali Khan", email: "ali@email.com", plan: "Gold", balance: 2450, joined: "Jan 10", referrals: 3 },
  { id: 2, name: "Sara Malik", email: "sara@email.com", plan: "Silver", balance: 890, joined: "Jan 15", referrals: 1 },
  { id: 3, name: "Ahmed Raza", email: "ahmed@email.com", plan: "VIP", balance: 5200, joined: "Feb 01", referrals: 7 },
  { id: 4, name: "Fatima N.", email: "fatima@email.com", plan: "Free", balance: 120, joined: "Feb 10", referrals: 0 },
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
          <p className="text-foreground/60 text-sm font-medium">Authorized: {ADMIN_PHONE} • Manage deposits, withdrawals & users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Total Users" value="156" icon={Users} delay={0} />
        <StatsCard title="Total Revenue" value="₨ 485K" icon={DollarSign} delay={0.05} />
        <StatsCard title="Pending Deposits" value="3" icon={TrendingUp} delay={0.1} />
        <StatsCard title="Pending Payouts" value="2" icon={Wallet} delay={0.15} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["deposits", "withdrawals", "users"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t
                ? "gold-gradient-bg text-primary-foreground"
                : "bg-secondary text-foreground/60 hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
        {tab === "deposits" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/70 font-semibold">User</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Plan</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Amount</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Screenshot</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Status</th>
                  <th className="text-right p-4 text-foreground/70 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{d.user}</td>
                    <td className="p-4 text-foreground/70">{d.plan}</td>
                    <td className="p-4 font-semibold gold-gradient-text">₨ {d.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <button className="flex items-center gap-1 text-xs text-primary hover:underline font-semibold">
                        <ImageIcon className="w-3 h-3" /> View
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
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
                  <th className="text-left p-4 text-foreground/70 font-semibold">User</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Amount</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Fee (10%)</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Payout</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Method</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Status</th>
                  <th className="text-right p-4 text-foreground/70 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((w) => (
                  <tr key={w.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{w.user}</td>
                    <td className="p-4 text-foreground">₨ {w.amount.toLocaleString()}</td>
                    <td className="p-4 text-destructive font-semibold">- ₨ {w.fee.toLocaleString()}</td>
                    <td className="p-4 font-semibold gold-gradient-text">₨ {w.payout.toLocaleString()}</td>
                    <td className="p-4 text-foreground/70">{w.method}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
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
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-foreground/70 font-semibold">Name</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Email</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Plan</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Balance</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Referrals</th>
                  <th className="text-left p-4 text-foreground/70 font-semibold">Joined</th>
                  <th className="text-right p-4 text-foreground/70 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-semibold text-foreground">{u.name}</td>
                    <td className="p-4 text-foreground/70">{u.email}</td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        u.plan === "VIP" ? "gold-gradient-bg text-primary-foreground" :
                        u.plan === "Gold" ? "bg-primary/10 text-primary" :
                        u.plan === "Silver" ? "bg-accent/10 text-accent" :
                        "bg-secondary text-foreground/60"
                      }`}>{u.plan}</span>
                    </td>
                    <td className="p-4 font-semibold gold-gradient-text">₨ {u.balance.toLocaleString()}</td>
                    <td className="p-4 text-foreground/70">{u.referrals}</td>
                    <td className="p-4 text-foreground/70">{u.joined}</td>
                    <td className="p-4 text-right">
                      <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground/60 hover:text-foreground transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Admin;
