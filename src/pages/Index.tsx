import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Crown, Users, ArrowRight, Sparkles, MessageCircle, Zap, TrendingUp } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import LiveProofs from "@/components/LiveProofs";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import logo from "@/assets/logo.png";

const features = [
  { icon: Crown, title: "VIP Plans", desc: "Earn up to ₨50/day with our premium VIP-2 plan" },
  { icon: Shield, title: "Secure Platform", desc: "Advanced security with encrypted transactions" },
  { icon: Users, title: "Referral Rewards", desc: "Earn bonuses from every friend's deposit" },
  { icon: Zap, title: "Spin & Win", desc: "Daily free spin + paid spins with big rewards" },
  { icon: TrendingUp, title: "Alpha Staking", desc: "Stake your earnings for guaranteed profits" },
  { icon: Sparkles, title: "Daily Profits", desc: "Watch 6 ads daily and claim your income" },
];

const Index = () => (
  <div className="min-h-screen bg-background overflow-hidden">
    {/* Navbar */}
    <nav className="royal-header relative z-10 flex items-center justify-between px-6 md:px-12 py-4 shadow-lg">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="Alpha Ads & Earn" className="w-10 h-10 rounded-xl" />
        <span className="text-xl font-bold font-heading gold-gradient-text">Alpha Ads & Earn</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/auth" className="px-5 py-2.5 text-sm font-medium text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">Login</Link>
        <Link to="/auth?mode=signup" className="px-5 py-2.5 text-sm font-semibold gold-gradient-bg text-primary-foreground rounded-xl hover:opacity-90 transition-opacity shadow-md">Get Started</Link>
      </div>
    </nav>

    {/* Hero Slider */}
    <section className="px-6 md:px-12 pt-8 pb-4">
      <HeroSlider />
    </section>

    {/* Welcome + CTA */}
    <section className="relative px-6 md:px-12 pt-8 pb-20">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> 11 PKR Signup Bonus
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl font-black font-heading leading-tight">
          <span className="text-foreground">Welcome to</span><br />
          <span className="gold-gradient-text">Alpha Ads & Earn</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Pakistan's premier earning platform. Watch ads, spin & win, stake your earnings, and earn daily profits.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth?mode=signup" className="group flex items-center gap-2 px-8 py-4 gold-gradient-bg text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all gold-glow pulse-gold">
            Start Earning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://whatsapp.com/channel/0029VbC0B8W0lwgqZKuScy0T" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 green-gradient-bg text-secondary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all">
            <MessageCircle className="w-5 h-5" /> Join WhatsApp
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[{ value: "5K+", label: "Active Users" }, { value: "₨2M+", label: "Paid Out" }, { value: "99%", label: "Uptime" }].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold font-heading gold-gradient-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="px-6 md:px-12 py-20 border-t border-border/30">
      <div className="max-w-5xl mx-auto">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold font-heading text-center mb-16">
          Why Choose <span className="gold-gradient-text">Alpha Ads & Earn</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8 card-hover border-accent/10">
              <div className="w-12 h-12 rounded-xl green-gradient-bg flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-bold font-heading text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Live Proofs */}
    <LiveProofs />

    {/* Footer */}
    <footer className="royal-footer px-6 md:px-12 py-8 text-center">
      <p className="text-sm text-secondary-foreground/60">© 2026 Alpha Ads & Earn. All rights reserved.</p>
    </footer>

    <WhatsAppFloat />
  </div>
);

export default Index;
