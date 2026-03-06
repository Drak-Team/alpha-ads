import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Crown, Wallet, Users, LogOut, Shield, Play, Home, Zap, UserCircle } from "lucide-react";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import logo from "@/assets/logo.png";

const sidebarItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/plans", label: "Plans", icon: Crown },
  { path: "/earn", label: "Watch & Earn", icon: Play },
  { path: "/withdraw", label: "Withdraw", icon: Wallet },
  { path: "/referral", label: "Referral", icon: Users },
];

const bottomNavItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/earn", label: "Active", icon: Zap },
  { path: "/referral", label: "Affiliate", icon: Users },
  { path: "/plans", label: "Plan", icon: Crown },
  { path: "/withdraw", label: "Profile", icon: UserCircle },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border green-gradient-bg">
        <div className="p-6 border-b border-secondary-foreground/10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Alpha Ads & Earn" className="w-10 h-10 rounded-xl" />
            <span className="text-lg font-bold font-heading gold-gradient-text">Alpha Ads</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "gold-gradient-bg text-primary-foreground shadow-lg gold-glow"
                    : "text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-secondary-foreground/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-secondary-foreground/10 space-y-1">
          <Link
            to="/admin-panel"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              location.pathname === "/admin-panel"
                ? "gold-gradient-bg text-primary-foreground shadow-lg gold-glow"
                : "text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-secondary-foreground/5"
            }`}
          >
            <Shield className="w-5 h-5" />
            Admin Panel
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-secondary-foreground/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 green-gradient-bg border-t border-secondary-foreground/10">
        <nav className="flex justify-around p-2">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl text-xs transition-all ${
                  isActive ? "text-primary" : "text-secondary-foreground/60"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="truncate max-w-[48px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 md:p-8 max-w-6xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
      <WhatsAppFloat />
    </div>
  );
};

export default DashboardLayout;
