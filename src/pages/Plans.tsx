import { motion } from "framer-motion";
import { Bot, Zap, ShieldCheck, Target, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Plans = () => {
  // Your Rates from .env
  const depositRate = Number(import.meta.env.VITE_DEPOSIT_RATE) || 300;

  const plans = [
    {
      id: 1,
      name: "STARTER BOT V1",
      priceUSD: 2,
      dailyProfitUSD: 0.20,
      duration: 30,
      icon: Zap,
      color: "from-[#f1c40f] to-[#d4ac0d]",
    },
    // Future plans can be added here
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-2xl font-black text-[#004d26] mb-2 uppercase italic">Trading Bots</h2>
        <p className="text-gray-500 text-sm mb-6">Select a professional bot to start earning daily.</p>

        <div className="grid gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#f1c40f]"
            >
              <div className={`bg-gradient-to-r ${plan.color} p-4 flex justify-between items-center`}>
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6 text-[#004d26]" />
                  <span className="font-black text-[#004d26]">{plan.name}</span>
                </div>
                <div className="bg-[#004d26] text-white px-3 py-1 rounded-full text-xs font-bold">
                  ACTIVE 30 DAYS
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Daily Profit</p>
                    <p className="text-lg font-black text-[#004d26]">${plan.dailyProfitUSD} <span className="text-xs">({plan.dailyProfitUSD * depositRate} PKR)</span></p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Price</p>
                    <p className="text-lg font-black text-[#004d26]">${plan.priceUSD} <span className="text-xs">({plan.priceUSD * depositRate} PKR)</span></p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    Secure Arbitrage Trading
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Target className="w-4 h-4 text-green-600" />
                    Total Return: {((plan.dailyProfitUSD * plan.duration) / plan.priceUSD) * 100}%
                  </div>
                </div>

                <button className="w-full bg-[#f1c40f] hover:bg-[#d4ac0d] text-[#004d26] py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_4px_0_rgb(212,172,13)] active:shadow-none active:translate-y-1 transition-all">
                  Activate Bot Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Plans;
