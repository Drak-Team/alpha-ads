import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { img: hero1, title: "Alpha Ads & Earn — Your Daily Income", sub: "Watch ads, earn profits. Pakistan's premier earning platform." },
  { img: hero2, title: "Watch Your Wealth Grow", sub: "Up to ₨50/day with our premium VIP-2 plan." },
  { img: hero3, title: "Exclusive VIP Membership", sub: "Join thousands of successful earners today." },
  { img: hero4, title: "Build Your Network", sub: "Refer friends and earn referral bonuses instantly." },
];

interface HeroSliderProps {
  compact?: boolean;
}

const HeroSlider = ({ compact = false }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${compact ? "aspect-[16/5]" : "aspect-[16/7] md:aspect-[16/6]"}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img src={slides[current].img} alt={slides[current].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(150_35%_12%)] via-[hsl(150_35%_12%/0.6)] to-transparent" />
          <div className={`absolute left-6 right-6 ${compact ? "bottom-4 md:bottom-6 md:left-8" : "bottom-8 left-8 right-8 md:bottom-12 md:left-12"}`}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`font-black font-heading gold-gradient-text max-w-xl ${compact ? "text-lg md:text-2xl" : "text-2xl md:text-4xl"}`}
            >
              {slides[current].title}
            </motion.h2>
            {!compact && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-secondary-foreground/80 mt-2 max-w-md"
              >
                {slides[current].sub}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "gold-gradient-bg w-5" : "bg-secondary-foreground/40"}`} />
        ))}
      </div>

      {!compact && (
        <>
          <button onClick={() => setCurrent((p) => (p - 1 + slides.length) % slides.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary/60 backdrop-blur-sm flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrent((p) => (p + 1) % slides.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-secondary/60 backdrop-blur-sm flex items-center justify-center text-secondary-foreground hover:bg-secondary/80 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
