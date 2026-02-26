import { motion } from "framer-motion";
import { Crown, TrendingUp, Zap } from "lucide-react";

interface PlanCardProps {
  name: string;
  price: number;
  dailyReturn: number;
  totalReturn: number;
  duration: number;
  icon: "crown" | "trending" | "zap";
  featured?: boolean;
  delay?: number;
  onBuy: () => void;
}

const icons = { crown: Crown, trending: TrendingUp, zap: Zap };

const PlanCard = ({ name, price, dailyReturn, totalReturn, duration, icon, featured, delay = 0, onBuy }: PlanCardProps) => {
  const Icon = icons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`relative glass-card p-8 card-hover ${
        featured ? "border-primary/50 gold-glow" : ""
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient-bg text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}

      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
        featured ? "gold-gradient-bg" : "bg-primary/10"
      }`}>
        <Icon className={`w-8 h-8 ${featured ? "text-primary-foreground" : "text-primary"}`} />
      </div>

      <h3 className="text-xl font-bold font-heading text-foreground">{name}</h3>
      <div className="mt-4">
        <span className="text-4xl font-bold font-heading gold-gradient-text">
          {price.toLocaleString()}
        </span>
        <span className="text-muted-foreground text-sm ml-1">PKR</span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Daily Return</span>
          <span className="text-success font-semibold">{dailyReturn} PKR</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="text-foreground font-medium">{duration} Days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Return</span>
          <span className="text-primary font-bold">{totalReturn.toLocaleString()} PKR</span>
        </div>
      </div>

      <button
        onClick={onBuy}
        className={`w-full mt-8 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          featured
            ? "gold-gradient-bg text-primary-foreground gold-glow hover:opacity-90"
            : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        Buy Plan
      </button>
    </motion.div>
  );
};

export default PlanCard;
