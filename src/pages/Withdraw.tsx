  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ٹائم چیک کرنے کا لاجک (9 AM to 5 PM)
    const now = new Date();
    const currentHour = now.getHours(); // 24 گھنٹے والا فارمیٹ

    if (currentHour < 9 || currentHour >= 17) {
      toast({
        title: "Closed!",
        description: "Withdrawals are only open from 9:00 AM to 5:00 PM.",
        variant: "destructive",
      });
      return;
    }

    if (Number(amount) < 5) {
      toast({
        title: "Minimum Amount",
        description: "Minimum withdrawal is $5",
        variant: "destructive",
      });
      return;
    }
    // باقی کوڈ...
  };
