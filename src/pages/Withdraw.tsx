import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Wallet, AlertCircle, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const Withdraw = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  
  // Withdrawal Rate as per your instruction
  const withdrawRate = Number(import.meta.env.VITE_WITHDRAW_RATE) || 280;
  const userBalance = 100; // This will be dynamic from your DB

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) < 5) {
      toast({
        title: "Minimum Amount",
        description: "Minimum withdrawal is $5",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Request Sent!",
      description: "Your withdrawal request is pending admin approval.",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-2xl font-black text-[#004d26] mb-2 uppercase italic">Withdraw Funds</h2>
        <p className="text-gray-500 text-sm mb-6">Convert your dollar earnings into PKR instantly.</p>

        {/* Balance Card */}
        <div className="bg-[#004d26] rounded-3xl p-6 border-b-4 border-[#f1c40f] mb-8 shadow-xl text-center">
          <p className="text-[#f1c40f] text-xs font-bold uppercase tracking-widest mb-1">Available Balance</p>
          <h3 className="text-3xl font-black text-white">₨ {userBalance}</h3>
          <p className="text-white/60 text-[10px] mt-2 italic">Withdrawal Rate: $1 = {withdrawRate} PKR</p>
        </div>

        {/* Withdrawal Form */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <form onSubmit={handleWithdraw} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-[#004d26] uppercase mb-2">Amount in USD ($)</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 focus:border-[#f1c40f] outline-none font-bold transition-all"
                  placeholder="0.00"
                />
                <Wallet className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              </div>
              {amount && (
                <p className="text-[10px] font-bold text-green-600 mt-2 ml-2">
                  You will receive: ₨ {Number(amount) * withdrawRate}
                </p>
              )}
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-medium">
                Withdrawals are processed within 24 hours. Please ensure your EasyPaisa/JazzCash details are correct in your profile.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f1c40f] text-[#004d26] py-4 rounded-2xl font-black uppercase tracking-widest shadow-[0_4px_0_rgb(212,172,13)] active:shadow-none active:translate-y-1 transition-all"
            >
              Withdraw Now
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
