import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Star, ShieldCheck, Gem, Crown, Sparkles, X, Copy } from 'lucide-react';

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    { name: "Basic", price: 2, pkr: 600, daily: 0.20, icon: <Star className="text-yellow-400" />, emoji: "⭐", color: "from-yellow-500/10" },
    { name: "Standard", price: 4, pkr: 1200, daily: 0.45, icon: <ShieldCheck className="text-blue-400" />, emoji: "🛡️", color: "from-blue-500/10" },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.70, icon: <Sparkles className="text-gray-300" />, emoji: "🥈", color: "from-gray-300/10" },
    { name: "Gold", price: 10, pkr: 3000, daily: 1.20, icon: <Gem className="text-yellow-500 animate-pulse" />, emoji: "✨", color: "from-yellow-600/20" },
    { name: "Platinum", price: 20, pkr: 6000, daily: 2.50, icon: <Crown className="text-orange-400" />, emoji: "👑", color: "from-orange-500/20" },
  ];

  const handleConfirmDeposit = async () => {
    if (!file) {
      alert("براہ کرم اسکرین شاٹ اپ لوڈ کریں");
      return;
    }

    setLoading(true);
    try {
      const fileName = `dep-${Date.now()}.${file.name.split('.').pop()}`;

      // بالٹی کا نام 'deposits' رکھا گیا ہے
      const { error: uploadError } = await supabase.storage
        .from('deposits') 
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('deposits')
        .insert({
          plan_name: selectedPlan.name,
          amount_pkr: selectedPlan.pkr,
          screenshot_url: fileName,
          status: 'pending'
        });

      if (dbError) throw dbError;

      alert("کامیابی! آپ کی درخواست موصول ہوگئی ہے۔ ✅");
      setSelectedPlan(null);
    } catch (error: any) {
      alert("خرابی: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 text-right">
       {/* ڈیزائن وہی رہے گا جو آپ کے پاس پہلے تھا */}
       {/* یہاں پلانز دکھانے کا کوڈ آئے گا */}
       {/* ... بقیہ کوڈ وہی ہے جو ہم نے پہلے ڈسکس کیا ... */}
    </div>
  );
};

export default Plans;
