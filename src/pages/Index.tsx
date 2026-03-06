import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { Gift, Banknote, ArrowDownToLine, UserX, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import LiveProofs from "@/components/LiveProofs";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import logo from "@/assets/logo.png";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as Easing },
});

const features = [
  { icon: Gift, title: "Free 1st Package", desc: "Registration ke baad pehla package bilkul muft hasil karein." },
  { icon: Banknote, title: "Daily Withdrawal", desc: "Apni kamayi rozana nikalwaein baghair kisi rukawat ke." },
  { icon: ArrowDownToLine, title: "Minimum Withdrawal 50 PKR", desc: "Sirf 50 rupay honay par bhi withdraw mumkin hai." },
  { icon: UserX, title: "No Team Required", desc: "Withdraw lene ke liye kisi team ya referral ki shart nahi hai." },
];

const trustLines = [
  "پاکستان کا سب سے بہترین اور آسان ارننگ پلیٹ فارم",
  "بغیر کسی ٹیم کے روزانہ ودڈرال کی سہولت",
];

const Index = () => (
  <div className="min-h-screen bg-background overflow-hidden">
    {/* Navbar */}
    <nav className="royal-header relative z-10 flex items-center justify-between px-5 md:px-12 py-3.5 shadow-lg">
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="Smart Ads Pakistan" className="w-9 h-9 rounded-lg" />
        <span className="text-lg font-bold font-heading gold-gradient-text">Smart Ads Pakistan</span>
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/auth" className="px-4 py-2 text-sm font-medium text-secondary-foreground/70 hover:text-secondary-foreground transition-colors">
          Login
        </Link>
        <Link to="/auth?mode=signup" className="btn-golden px-5 py-2 text-sm">
          Get Started
        </Link>
      </div>
    </nav>

    {/* Hero Carousel */}
    <motion.section {...fade(0)} className="px-4 md:px-12 pt-6 pb-2">
      <HeroSlider />
    </motion.section>

    {/* Welcome + CTA */}
    <section className="relative px-5 md:px-12 pt-10 pb-16">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div {...fade(0.1)}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
            <Sparkles className="w-4 h-4" /> 100 PKR Signup Bonus
          </span>
        </motion.div>

        <motion.h1 {...fade(0.2)} className="mt-7 text-3xl md:text-5xl font-black font-heading leading-tight">
          <span className="text-foreground">Welcome to</span>
          <br />
          <span className="gold-gradient-text">Alpha Ads & Earn</span>
        </motion.h1>

        <motion.p {...fade(0.3)} className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
          Pakistan's Premier Earning Platform. Watch ads, earn daily profits, and withdraw anytime — no team required.
        </motion.p>

        <motion.div {...fade(0.4)} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/auth?mode=signup"
            className="group flex items-center gap-2 btn-golden px-8 py-3.5 text-base pulse-gold"
          >
            Start Earning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://whatsapp.com/channel/0029VbC0B8W0lwgqZKuScy0T"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 green-gradient-bg text-secondary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" /> Join WhatsApp
          </a>
        </motion.div>

        {/* Mini Stats */}
        <motion.div {...fade(0.55)} className="mt-14 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { value: "5K+", label: "Active Users" },
            { value: "₨2M+", label: "Paid Out" },
            { value: "99%", label: "Uptime" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold font-heading gold-gradient-text">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Key Features Grid */}
    <section className="px-5 md:px-12 py-16 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold font-heading text-center mb-12"
        >
          Why Choose <span className="gold-gradient-text">Alpha Ads & Earn</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 card-hover border-accent/10 flex gap-4 items-start"
            >
              <div className="w-11 h-11 shrink-0 rounded-xl green-gradient-bg flex items-center justify-center">
                <f.icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Urdu Trust Badges */}
    <section className="px-5 md:px-12 py-14 border-t border-border/30">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold font-heading gold-gradient-text mb-8"
        >
          ہم پر اعتماد کریں
        </motion.h2>
        {trustLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card px-6 py-4 border-accent/10 shimmer"
          >
            <p className="text-base md:text-lg font-semibold text-foreground" dir="rtl">
              {line}
            </p>
          </motion.div>
        ))}
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
