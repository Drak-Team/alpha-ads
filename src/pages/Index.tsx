import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Crown, Users, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

const features = [
  { icon: Crown, title: "VIP Plans", desc: "Earn daily returns with premium investment tiers" },
  { icon: Shield, title: "Secure Platform", desc: "Your investments are protected with top-level security" },
  { icon: Users, title: "Referral Rewards", desc: "Earn 10% commission from every friend's first deposit" },
  { icon: Sparkles, title: "Daily Profits", desc: "Claim your earnings every day with one click" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-border/30">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-heading gold-gradient-text">VIP Invest</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth?mode=signup"
            className="px-5 py-2.5 text-sm font-semibold gold-gradient-bg text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-12 pt-20 pb-32">
        {/* BG effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-40 right-0 w-[300px] h-[300px] rounded-full bg-primary/3 blur-[80px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              50 PKR Signup Bonus
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black font-heading leading-tight"
          >
            <span className="text-foreground">Invest Smart,</span>
            <br />
            <span className="gold-gradient-text">Earn Daily</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Join Pakistan's premier VIP investment platform. Choose a plan, claim daily profits, and grow your wealth effortlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/auth?mode=signup"
              className="group flex items-center gap-2 px-8 py-4 gold-gradient-bg text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all gold-glow pulse-gold"
            >
              Start Investing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/plans"
              className="flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-semibold rounded-2xl hover:bg-secondary/80 transition-all"
            >
              View Plans
              <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "5K+", label: "Active Users" },
              { value: "₨2M+", label: "Paid Out" },
              { value: "99%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold font-heading gold-gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 py-20 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          >
            Why Choose <span className="gold-gradient-text">VIP Invest</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-8 border-t border-border/30 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 VIP Invest. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
