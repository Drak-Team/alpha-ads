import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { ShieldCheck, Users, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  // آپ کی مخصوص ایڈمن ای میل
  const adminEmail = "Algoalgo371@gmail.com"; 

  useEffect(() => {
    // یہاں ہم فرض کر رہے ہیں کہ یوزر لاگ ان ہے، اصل سسٹم میں یہ Supabase سے چیک ہوگا
    // فی الحال ہم اسے آپ کی ای میل کے لیے اوپن کر رہے ہیں
    const loggedInUser = localStorage.getItem("user_email"); 
    if (loggedInUser === adminEmail) {
       setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-10 text-center">
        <h1 className="text-6xl font-black text-red-600 mb-4">404</h1>
        <p className="text-xl font-bold text-gray-800 uppercase italic">Access Denied: Restricted Area</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 bg-gray-50 min-h-screen font-sans">
        <div className="flex items-center gap-2 mb-8 bg-[#004d26] p-4 rounded-2xl border-b-4 border-[#f1c40f]">
          <ShieldCheck className="w-8 h-8 text-[#f1c40f]" />
          <h2 className="text-xl font-black text-white uppercase italic">Dollar-Plus Master Control</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border-l-4 border-green-500 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase">Total Users</p>
            <h3 className="text-2xl font-black text-[#004d26]">248</h3>
          </div>
          <div className="bg-white p-4 rounded-2xl border-l-4 border-[#f1c40f] shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase">Pending Pay</p>
            <h3 className="text-2xl font-black text-[#004d26]">12</h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-md">
            <h4 className="font-bold text-[#004d26] mb-4 flex items-center gap-2 uppercase text-sm">
              <ArrowDownCircle className="w-4 h-4" /> Deposit Proofs
            </h4>
            <p className="text-gray-400 text-xs italic">User screenshots will appear here.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPanel;
