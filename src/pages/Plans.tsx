const Plans = () => {
  const plans = [
    { name: "Basic", price: 2, pkr: 600, daily: 0.20, limit: 1200 },
    { name: "Standard", price: 4, pkr: 1200, daily: 0.45, limit: 2400 },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.70, limit: 3600 },
    { name: "Gold", price: 10, pkr: 3000, daily: 1.20, limit: 6000 },
    { name: "Platinum", price: 20, pkr: 6000, daily: 2.50, limit: 12000 },
  ];

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-4 pb-24 font-sans">
      <h2 className="text-2xl font-bold text-center text-yellow-500 mb-2">انویسٹمنٹ پلانز</h2>
      <p className="text-center text-[10px] mb-6 opacity-70">1 Dollar = 300 PKR | 24h Earning Process</p>
      
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-lg font-bold text-white">{plan.name} Plan</h3>
              <p className="text-yellow-500 font-bold text-sm">${plan.price} ({plan.pkr} PKR)</p>
              <div className="mt-1 text-[10px] opacity-60">
                <p>روزانہ آمدنی: ${plan.daily}</p>
                <p>کل آمدنی کی حد: {plan.limit} PKR</p>
              </div>
            </div>
            <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded-xl font-bold text-xs transition-all">
              ایکٹیو کریں
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-black/40 p-5 rounded-2xl border border-yellow-500/30 text-center">
        <p className="text-sm font-bold text-yellow-500 underline mb-2 text-center">پیمنٹ کی تفصیلات</p>
        <p className="text-lg font-extrabold tracking-wider">03037264598</p>
        <p className="text-xs opacity-80 mt-1">Ahmad Nafees Anjum (Easypaisa/JazzCash)</p>
        <p className="text-[9px] mt-4 opacity-50 leading-relaxed text-center">
          پیمنٹ بھیجنے کے بعد اسکرین شاٹ اور ٹرانزیکشن آئی ڈی ٹیلی گرام پر بھیجیں یا ڈپازٹ سیکشن میں اپ لوڈ کریں۔
        </p>
      </div>
    </div>
  );
};

export default Plans;
