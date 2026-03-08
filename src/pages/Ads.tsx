import React from 'react';
import { PlayCircle, Lock } from 'lucide-react';

const Ads = () => {
  const isPackageActive = false; // یہ بعد میں ڈیٹا بیس سے جڑے گا

  return (
    <div className="min-h-screen bg-[#064e3b] text-white p-6 pb-24 font-sans text-right">
      <h2 className="text-2xl font-bold mb-8 text-center text-yellow-500 font-urdu">روزانہ کے اشتہارات</h2>
      
      {!isPackageActive ? (
        <div className="bg-black/20 border border-white/5 p-10 rounded-[40px] text-center">
          <Lock size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-urdu text-sm opacity-60">اشتہارات دیکھنے کے لیے پہلے کوئی پلان ایکٹیو کریں</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((ad) => (
            <div key={ad} className="bg-white/5 p-5 rounded-3xl border border-white/5 flex justify-between items-center">
               <PlayCircle className="text-yellow-500" />
               <span className="font-urdu text-sm">ایڈ نمبر {ad} دیکھیں</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ads;
