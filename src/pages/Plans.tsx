const Plans = () => {
  const plans = [
    { name: "Basic", price: 2, pkr: 600, daily: 0.20, limit: 4 },
    { name: "Standard", price: 4, pkr: 1200, daily: 0.45, limit: 8 },
    { name: "Silver", price: 6, pkr: 1800, daily: 0.70, limit: 12 },
    { name: "Gold", price: 10, pkr: 3000, daily: 1.20, limit: 20 },
    { name: "Platinum", price: 20, pkr: 6000, daily: 2.50, limit: 40 },
  ];

  return (
    <div className="min-h-screen bg-emerald-900 text-white p-4 pb-20">
      <h2 className="text-xl font-bold text-center text-yellow-500 mb-6">انویسٹمنٹ پلانز</h2>
      <p className="text-center text-xs mb-4 opacity-80">1 Dollar = 300 PKR (Deposit Rate)</p>
      
      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{plan.name} Plan</h3>
              <p className="text-xs opacity-70 text-yellow-500">قیمت: ${plan.price} ({plan.pkr} PKR)</p>
              <p className="text-xs">روزانہ آمدنی: ${plan.daily}</p>
              <p className="text-xs">کل حد: ${plan.limit} (Double Return)</p>
            </div>
            <button className="bg-yellow-600 px-4 py-2 rounded-lg font-bold text-sm">بائی کریں</button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-black/30 p-4 rounded-xl text-center">
        <p className="text-sm font-bold">پیمنٹ کا طریقہ</p>
        <p className="text-xs mt-2 text-yellow-500">Easypaisa / JazzCash: 03037264598</p>
        <p className="text-xs">نام: Ahmad Nafees Anjum</p>
        <p className="text-[10px] mt-2 opacity-60 italic">پیمنٹ بھیج کر اسکرین شاٹ ٹیلی گرام پر بھیجیں</p>
      </div>
    </div>
  );
};

export default Plans;
