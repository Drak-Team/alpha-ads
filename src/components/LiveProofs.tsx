import { motion } from "framer-motion";
import { CheckCircle, Clock } from "lucide-react";

const proofs = [
  { phone: "0303****598", amount: 1350, method: "JazzCash", time: "2 min ago" },
  { phone: "0321****245", amount: 720, method: "EasyPaisa", time: "15 min ago" },
  { phone: "0312****887", amount: 2700, method: "JazzCash", time: "1 hour ago" },
  { phone: "0345****112", amount: 450, method: "Bank", time: "3 hours ago" },
  { phone: "0300****776", amount: 900, method: "EasyPaisa", time: "5 hours ago" },
];

const LiveProofs = () => (
  <section className="px-6 md:px-12 py-20 border-t border-border/30 bg-card/50">
    <div className="max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl font-bold font-heading text-center mb-4"
      >
        Live <span className="gold-gradient-text">Withdrawal Proofs</span>
      </motion.h2>
      <p className="text-center text-muted-foreground text-sm mb-10">
        Real payouts to real users — updated in real-time
      </p>

      <div className="space-y-3">
        {proofs.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{p.phone}</p>
                <p className="text-xs text-muted-foreground">{p.method}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold gold-gradient-text">₨ {p.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                <Clock className="w-3 h-3" /> {p.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default LiveProofs;
