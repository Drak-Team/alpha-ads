import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, ArrowDownCircle, ArrowUpCircle, Check, X, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const AdminPanel = () => {
  // Mock data for Admin to manage
  const [deposits, setDeposits] = useState([
    { id: 1, user: "User_01", amount: "600 PKR ($2)", status: "Pending", proof: "screenshot.jpg" }
  ]);

  const [withdraws, setWithdraws] = useState([
    { id: 101, user: "User_05", amount: "1400 PKR ($5)", status: "Pending", method: "EasyPaisa" }
  ]);

  return (
    <DashboardLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-8 h-8 text-[#004d26]" />
          <h2 className="text-2xl font-black text-[#004d26] uppercase italic">Dollar-Plus Admin</h2>
        </div>

        {/* Deposit Management */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-8 border-t-4 border-[#f1c40f]">
          <h3 className="font-bold text-[#004d26] mb-4 flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5" /> Pending Deposits
          </h3>
          <div className="space-y-4">
            {deposits.map((dep) => (
              <div key={dep.id} className="border border-gray-100 rounded-2xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">{dep.user}</span>
                  <span className="text-[#004d26] font-black">{dep.amount}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" /> View Proof
                  </button>
                  <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                    <X className="w-3 h-3" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Management */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-t-4 border-[#004d26]">
          <h3 className="font-bold text-[#004d26] mb-4 flex items-center gap-2">
            <ArrowUpCircle className="w-5 h-5" /> Withdrawal Requests
          </h3>
          {withdraws.map((wit) => (
            <div key={wit.id} className="border border-gray-100 rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">{wit.user} ({wit.method})</p>
                <p className="text-xs text-gray-500">{wit.amount}</p>
              </div>
              <button className="bg-[#004d26] text-[#f1c40f] px-4 py-2 rounded-xl text-xs font-black shadow-md">
                PAY NOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
