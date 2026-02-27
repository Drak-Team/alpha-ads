import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Crown, Users, ArrowRight, Sparkles, ChevronRight, MessageCircle } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import LiveProofs from "@/components/LiveProofs";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const features = [
  { icon: Crown, title: "VIP Plans", desc: "Earn up to ₨350/day with premium investment tiers" },
  { icon: Shield, title: "Secure Platform", desc: "Advanced security with XSS/SQL injection protection" },
  { icon: Users, title: "Referral Rewards", desc: "Earn 10% commission from every friend's first deposit" },
  { icon: Sparkles, title: "Daily Profits", desc: "Watch ads, claim earnings — 30-day plan cycles" },
];

const Index = () => (
  <div className="min-h-screen bg-background overflow-hidden">
    {/* Navbar */}
    <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b border-border/30">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold font-heading gold-gradient-text">Pakistan VIP</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/auth" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
        <Link to="/auth?mode=signup" className="px-5 py-2.5 text-sm font-semibold gold-gradient-bg text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">Get Started</Link>
      </div>
    </nav>

    {/* Hero Slider */}
    <section className="px-6 md:px-12 pt-8 pb-4">
      <HeroSlider />
    </section>

    {/* Welcome + CTA */}
    <section className="relative px-6 md:px-12 pt-8 pb-20">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" /> 50 PKR Signup Bonus
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-4xl md:text-6xl font-black font-heading leading-tight">
          <span className="text-foreground">Welcome to</span><br />
          <span className="gold-gradient-text">Pakistan VIP</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Pakistan's premier investment platform. Choose a plan, watch ads daily, and earn consistent profits for 30 days.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/auth?mode=signup" className="group flex items-center gap-2 px-8 py-4 gold-gradient-bg text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-all gold-glow pulse-gold">
            Start Investing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="https://chat.whatsapp.com/your-channel-link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-4 bg-[hsl(142_71%_45%)] text-[hsl(0_0%_100%)] font-semibold rounded-2xl hover:opacity-90 transition-all">
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
          Why Choose <span className="gold-gradient-text">Pakistan VIP</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-8 card-hover">
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

    {/* Live Proofs */}
    <LiveProofs />

    {/* Footer */}
    <footer className="px-6 md:px-12 py-8 border-t border-border/30 text-center">
      <p className="text-sm text-muted-foreground">© 2026 Pakistan VIP. All rights reserved.</p>
    </footer>

    <WhatsAppFloat />
  </div>
);

export default Index;
