import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Withdrawal Page</h1>
      <p>Withdrawals are open from 9:00 AM to 5:00 PM.</p>
    </div>
  );
};

export default Withdraw; // یہ لائن سب سے ضروری ہے
