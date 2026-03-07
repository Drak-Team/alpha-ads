import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ShieldCheck, Zap, Timer, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Earn = () => {
  const { toast } = useToast();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startBot = () => {
    setIsRunning(true);
    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        toast({ title: "Arbitrage Complete!", description: "Daily profit has been added to your wallet." });
      }
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 text-center">
        <h2 className="text-2xl font-black text-[#004d26] mb-2 uppercase italic">AI Trading Room</h2>
        <p className="text-gray-500 text-sm mb-8">Run your activated bot to scan the market and claim profit.</p>

        {/* Bot Visualizer */}
        <div className="bg-[#002b1a] rounded-[40px] p-10 mb-8 border-4 border-[#f1c40f] shadow-2xl relative overflow-hidden">
          <motion.div 
            animate={isRunning ? { rotate: 360 } : {}} 
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-32 h-32 border-4 border-dashed border-[#f1c40f] rounded-full mx-auto flex items-center justify-center"
          >
            <Zap className={`w-12 h-12 ${isRunning ? "text-[#f1c40f]" : "text-gray-600"}`} />
          </motion.div>
          
          <div className="mt-6">
            <p className="text-[#f1c40f] font-black text-xl mb-2">
              {isRunning ? `SCANNING MARKET... ${progress}%` : "BOT STANDBY"}
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-[#f1c40f] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button 
          onClick={startBot}
          disabled={isRunning}
          className={`w-full py-5 rounded-3xl font-black uppercase tracking-widest transition-all ${
            isRunning ? "bg-gray-200 text-gray-400" : "bg-[#f1c40f] text-[#004d26] shadow-[0_6px_0_rgb(212,172,13)] hover:scale-[1.02] active:shadow-none active:translate-y-1"
          }`}
        >
          {isRunning ? "Trading in Progress..." : "Start Alpha Bot"}
        </button>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
            <ShieldCheck className="w-4 h-4 text-green-500" /> 100% Secure
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
            <Timer className="w-4 h-4 text-[#f1c40f]" /> 24h Cycle
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earn;
