import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, TrendingUp, ShieldCheck, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#002b1a] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block bg-[#f1c40f] text-[#004d26] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6"
        >
          Official V2 Launch
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-black mb-6 gold-gradient-text italic"
        >
          DOLLAR-PLUS
        </motion.h1>
        
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Next-generation AI Trading Bots. Earn passive income with the most secure arbitrage platform in Pakistan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
            <button className="w-full sm:w-auto bg-[#f1c40f] text-[#004d26] px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_5px_15px_rgba(241,196,15,0.4)] hover:scale-105 transition-all">
              Start Earning Now
            </button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
          <div className="w-14 h-14 bg-[#f1c40f] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="text-[#004d26] w-8 h-8" />
          </div>
          <h3 className="text-[#f1c40f] font-bold text-xl mb-3">Daily Profits</h3>
          <p className="text-gray-400 text-sm">Get consistent returns from our high-frequency trading bots.</p>
        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
          <div className="w-14 h-14 bg-[#f1c40f] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="text-[#004d26] w-8 h-8" />
          </div>
          <h3 className="text-[#f1c40f] font-bold text-xl mb-3">3-Level Rewards</h3>
          <p className="text-gray-400 text-sm">Earn 20%, 12%, and 6% commission by building your team.</p>
        </div>

        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
          <div className="w-14 h-14 bg-[#f1c40f] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-[#004d26] w-8 h-8" />
          </div>
          <h3 className="text-[#f1c40f] font-bold text-xl mb-3">Secure Withdraw</h3>
          <p className="text-gray-400 text-sm">Fast payments directly to your EasyPaisa or JazzCash.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
            
