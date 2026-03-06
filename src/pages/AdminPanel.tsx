import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Clock, Users, Wallet, DollarSign, Eye, Image as ImageIcon } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Tab = "deposits" | "withdrawals" | "users";

const AdminPanel = () => {
  const [tab, setTab] = useState<Tab>("deposits");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      if (tab === "users") fetchUsers();
      if (tab === "withdrawals") fetchWithdrawals();
    }
  }, [isAdmin, tab]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
    setIsAdmin(!!data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
  };

  const fetchWithdrawals = async () => {
    const { data } = await supabase.from("withdrawals").select("*").order("requested_at", { ascending: false });
    setWithdrawals(data || []);
  };

  const handleWithdrawalAction = async (id: string, action: "approved" | "rejected") => {
    const { error } = await supabase.from("withdrawals").update({ status: action, processed_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: action === "approved" ? "Approved ✓" : "Rejected ✗", description: `Withdrawal ${action}.` });
      fetchWithdrawals();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Shield className="w-16 h-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold font-heading text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You do not have admin privileges.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-heading gold-gradient-text">Admin Panel</h1>
          <p className="text-muted-foreground text-sm font-medium">Manage deposits, withdrawals & users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Users className="w-5 h-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Total Users</p><p className="text-lg font-bold gold-gradient-text">{users.length}</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Pending Withdrawals</p><p className="text-lg font-bold gold-gradient-text">{withdrawals.filter(w => w.status === "pending").length}</p></div>
        </div>
        <div className="glass-card p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-primary" /></div>
          <div><p className="text-xs text-muted-foreground font-medium">Total Payouts</p><p className="text-lg font-bold gold-gradient-text">₨ {withdrawals.filter(w => w.status === "approved").reduce((s, w) => s + w.payout, 0).toLocaleString()}</p></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["deposits", "withdrawals", "users"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t ? "gold-gradient-bg text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
        {tab === "deposits" && (
          <div className="p-8 text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 text-primary/40" />
            <p className="text-sm">Deposit screenshot approval coming soon.</p>
          </div>
        )}

        {tab === "withdrawals" && (
          <div className="overflow-x-auto">
            {withdrawals.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No withdrawal requests.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground font-semibold">Account</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Method</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Amount</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Fee</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Payout</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Status</th>
                    <th className="text-right p-4 text-muted-foreground font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-foreground">{w.account_number}</td>
                      <td className="p-4 text-muted-foreground capitalize">{w.method}</td>
                      <td className="p-4 text-foreground">₨ {w.amount.toLocaleString()}</td>
                      <td className="p-4 text-destructive font-semibold">-₨ {w.fee.toLocaleString()}</td>
                      <td className="p-4 font-semibold gold-gradient-text">₨ {w.payout.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          w.status === "pending" ? "bg-primary/10 text-primary" : w.status === "approved" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        }`}>
                          {w.status === "pending" ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                          {w.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {w.status === "pending" && (
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => handleWithdrawalAction(w.id, "approved")} className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => handleWithdrawalAction(w.id, "rejected")} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"><XCircle className="w-4 h-4" /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "users" && (
          <div className="overflow-x-auto">
            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No users found.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-muted-foreground font-semibold">Name</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Phone</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Balance</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Total Earned</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Referral Code</th>
                    <th className="text-left p-4 text-muted-foreground font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{u.display_name || "—"}</td>
                      <td className="p-4 text-muted-foreground">{u.phone || "—"}</td>
                      <td className="p-4 font-semibold gold-gradient-text">₨ {u.balance.toLocaleString()}</td>
                      <td className="p-4 text-foreground">₨ {u.total_earned.toLocaleString()}</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">{u.referral_code}</td>
                      <td className="p-4 text-muted-foreground text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminPanel;
