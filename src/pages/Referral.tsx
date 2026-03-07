import { motion } from "framer-motion";
import { Users, UserPlus, Trophy, Share2, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Referral = () => {
  const referralCode = "DP786123"; // This would be dynamic in a real app
  
  const levels = [
    { level: 1, commission: "20%", label: "Direct Referrals", color: "bg-[#f1c40f]" },
    { level: 2, commission: "12%", label: "Level 2 Network", color: "bg-[#d4ac0d]" },
    { level: 3, commission: "6%", label: "Level 3 Network", color: "bg-[#004d26] text-white" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-2xl font-black text-[#004d26] mb-2 uppercase italic">Affiliate Program</h2>
        <p className="text-gray-500 text-sm mb-6">Build your team and earn high commissions across 3 levels.</p>

        {/* Commission Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {levels.map((lvl) => (
            <div key={lvl.level} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 text-center">
              <div className={`w-full ${lvl.color} py-1 rounded-lg text-[10px] font-black mb-2 uppercase`}>
                Level {lvl.level}
              </div>
              <p className="text-xl font-black text-[#004d26]">{lvl.commission}</p>
              <p className="text-[8px] text-gray-400 font-bold uppercase">{lvl.label}</p>
            </div>
          ))}
        </div>

        {/* Share Section */}
        <div className="bg-[#004d26] rounded-3xl p-6 border-b-4 border-[#f1c40f] mb-8 shadow-xl">
          <div className="flex items-center gap-4 mb-4 text-[#f1c40f]">
            <Share2 className="w-6 h-6" />
            <h3 className="font-bold text-white uppercase tracking-wider">Your Referral Link</h3>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between">
            <code className="text-[#f1c40f] font-mono text-sm">{referralCode}</code>
            <button className="bg-[#f1c40f] text-[#004d26] px-4 py-2 rounded-xl text-xs font-black uppercase shadow-lg">
              Copy
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-black text-[#004d26] mb-4 uppercase flex items-center gap-2">
            <Users className="w-5 h-5" /> Team Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
              <span className="text-sm font-bold text-gray-500">Total Team Members</span>
              <span className="text-lg font-black text-[#004d26]">0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
              <span className="text-sm font-bold text-gray-500">Total Team Bonus</span>
              <span className="text-lg font-black text-[#004d26]">₨ 0.00</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Referral;
