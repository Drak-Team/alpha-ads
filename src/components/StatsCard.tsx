import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  trend?: string;
  delay?: number;
}

const StatsCard = ({ title, value, icon: Icon, subtitle, trend, delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 card-hover shimmer"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-foreground/70 font-semibold">{title}</p>
          <p className="text-2xl font-bold mt-1 font-heading gold-gradient-text">{value}</p>
          {subtitle && <p className="text-xs text-foreground/60 mt-1 font-medium">{subtitle}</p>}
          {trend && (
            <p className="text-xs text-success mt-1 font-semibold">
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
