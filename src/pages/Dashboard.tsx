import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Clock, Play, Calendar, ArrowUpRight, ArrowDownLeft, DollarSign, Users, PiggyBank, ArrowDownToLine, Robot } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import HeroSlider from "@/components/HeroSlider";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [claimed, setClaimed] = useState(false);

  // Constants based on your requirements
  const signupBonus = Number(import.meta.env.VITE_SIGNUP_BONUS) || 100;
  const depositRate = Number(import.meta.env.VITE_DEPOSIT_RATE) || 300;
  const withdrawRate = Number(import.meta.env.VITE_WITHDRAW_RATE) || 280;

  // Values (In a real app, these come from Supabase/Backend)
  const totalBalance = signupBonus; // Default starting with 100 PKR
  const todayEarning = 0;
  const totalDeposit = 0;
  const totalWithdrawal = 0;
  const activeInvestment = 0;
  const myTeam = 0;

  const stats = [
    { label: "Total Balance", value: `₨ ${totalBalance}`, icon: Wallet, color: "text-[#004d26]" },
    { label: "Today's Earning", value: `₨ ${todayEarning}`, icon: TrendingUp, color: "text-[#004d26]" },
    { label: "Total Deposit", value: `₨ ${totalDeposit}`, icon: ArrowDownToLine, color: "text-[#004d26]" },
    { label: "Total Withdrawal", value: `₨ ${totalWithdrawal}`, icon: ArrowUpRight, color: "text-[#004d26]" },
    { label: "Active Plans", value: activeInvestment > 0 ? "1 Active" : "No Plan", icon: PiggyBank, color: "text-[#004d26]" },
    { label: "My Team", value: myTeam.toString(), icon: Users, color: "text-[#004d26]" },
  ];

  return (
    <DashboardLayout>
      {/* Top Slider */}
      <div className="mb-6 rounded-2xl overflow-hidden shadow-lg border-2 border-[#f1c40f]">
        <HeroSlider compact />
      </div>

      {/* Royal Green & Gold Stats Grid (2 columns as requested) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-4 rounded-xl border-l-4 border-[#f1c40f] shadow-[0_4px_10px_rgba(0,0,0,0.08)] flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-full bg-[#004d26]/10 flex items-center justify-center mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-md font-extrabold text-[#004d26] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Currency Rate Info Bar */}
      <div className="bg-[#004d26] text-[#f1c40f] p-2 rounded-lg text-center text-xs font-bold mb-6 border border-[#f1c40f]">
        Deposit: $1 = {depositRate} PKR | Withdraw: $1 = {withdrawRate} PKR
      </div>

      {/* Daily Bot Action Area */}
      <motion.div 
        className="bg-gradient-to-r from-[#004d26] to-[#002b1a] p-6 rounded-2xl shadow-xl border border-[#f1c40f] mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f1c40f] flex items-center justify-center shadow-[0_0_15px_rgba(241,196,15,0.5)]">
              <Robot className="w-7 h-7 text-[#004d26]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Alpha Bot V2</h2>
              <p className="text-[#f1c40f] text-xs">Ready for daily arbitrage</p>
            </div>
          </div>
          <button className="bg-[#f1c40f] text-[#004d26] px-5 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform shadow-md">
            Claim Profit
          </button>
        </div>
      </motion.div>

      {/* Navigation Shortcut Button */}
      <Link to="/plans" className="block w-full">
        <button className="w-full py-4 rounded-xl font-black text-center uppercase tracking-widest text-[#004d26] bg-[#f1c40f] shadow-[0_4px_0_rgb(212,172,13)] active:shadow-none active:translate-y-1 transition-all">
          Invest in Premium Bots
        </button>
      </Link>
    </DashboardLayout>
  );
};

export default Dashboard;
        
