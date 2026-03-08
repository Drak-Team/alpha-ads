      {/* ٹرانزیکشن ہسٹری سیکشن */}
      <div className="mt-10 space-y-4">
        <h3 className="text-sm font-bold pr-2 font-urdu">تاریخچہ (History)</h3>
        
        {/* مثال کے طور پر ایک ہسٹری آئٹم */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center shadow-md">
          <div className="text-right">
            <p className="text-[11px] font-bold text-yellow-500">ودڈرا کی درخواست</p>
            <p className="text-[9px] opacity-40 mt-1">09 March 2026 | 12:26 AM</p>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">$10.00</p>
            <span className="text-[8px] bg-yellow-600/20 text-yellow-500 px-2 py-0.5 rounded-full">پینڈنگ</span>
          </div>
        </div>

        {/* کامیاب ٹرانزیکشن کی مثال */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center shadow-md">
          <div className="text-right">
            <p className="text-[11px] font-bold text-green-500">کامیاب ودڈرا</p>
            <p className="text-[9px] opacity-40 mt-1">08 March 2026 | 10:15 PM</p>
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">$5.50</p>
            <span className="text-[8px] bg-green-600/20 text-green-500 px-2 py-0.5 rounded-full">کامیاب</span>
          </div>
        </div>
      </div>
