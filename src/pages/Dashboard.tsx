import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, Crown, Clock, Play, Calendar, ArrowUpRight, ArrowDownLeft, DollarSign, Users, PiggyBank, ArrowDownToLine, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-4 pb-24 space-y-6 animate-in fade-in duration-500">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#004d26] uppercase italic leading-none">Dollar Plus</h1>
            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Premium Arbitrage Trading</p>
          </div>
          <div className="w-10 h-10 bg-[#004d26] rounded-full flex items-center justify-center border-2 border-[#f1c40f]">
            <Users className="text-[#f1c40f] w-5 h-5" />
          </div>
        </div>

        {/* Main Wallet Card */}
        <div className="bg-[#004d26] p-6 rounded-[32px] text-white shadow-2xl relative overflow-hidden border-b-8 border-[#f1c40f]">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[#f1c40f] rounded-full flex items-center justify-center">
                <Wallet className="text-[#004d26] w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter text-white/70">Main Trading Wallet</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black italic tracking-tighter">100.00</span>
              <span className="text-[#f1c40f] font-black text-sm italic uppercase">PKR</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/deposit" className="bg-white p-4 rounded-3xl border-2 border-[#004d26] flex items-center gap-3 shadow-sm active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <ArrowDownToLine className="text-[#004d26] w-6 h-6" />
            </div>
            <span className="font-black text-[#004d26] text-xs uppercase tracking-tighter">Deposit</span>
          </Link>
          <Link to="/withdraw" className="bg-white p-4 rounded-3xl border-2 border-red-200 flex items-center gap-3 shadow-sm active:scale-95 transition-transform">
            <div className="w-10 h-10 bg-red-100 rounded-2xl flex items-center justify-center">
              <ArrowUpRight className="text-red-600 w-6 h-6" />
            </div>
            <span className="font-black text-red-600 text-xs uppercase tracking-tighter">Withdraw</span>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <Bot className="text-[#004d26] w-5 h-5 mb-2" />
            <p className="text-[9px] font-black text-gray-400 uppercase">Active Bots</p>
            <h4 className="text-lg font-black text-[#004d26]">01</h4>
          </div>
          <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
            <TrendingUp className="text-[#004d26] w-5 h-5 mb-2" />
            <p className="text-[9px] font-black text-gray-400 uppercase">Daily Yield</p>
            <h4 className="text-lg font-black text-[#004d26]">0.33$</h4>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
