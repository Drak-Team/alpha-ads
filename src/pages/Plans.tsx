import DashboardLayout from "@/components/DashboardLayout";
import PlanCard from "@/components/PlanCard";
import { useToast } from "@/hooks/use-toast";

const plans = [
  { name: "Silver VIP", price: 1200, dailyReturn: 60, totalReturn: 1800, duration: 30, icon: "trending" as const },
  { name: "Gold VIP", price: 3500, dailyReturn: 175, totalReturn: 5250, duration: 30, icon: "crown" as const, featured: true },
  { name: "Platinum VIP", price: 6000, dailyReturn: 320, totalReturn: 9600, duration: 30, icon: "zap" as const },
];

const Plans = () => {
  const { toast } = useToast();

  const handleBuy = (name: string) => {
    toast({
      title: "Plan Selected!",
      description: `Submit a deposit request for ${name}. Admin will approve it shortly.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-heading text-foreground">
          <span className="gold-gradient-text">VIP Plans</span>
        </h1>
        <p className="text-muted-foreground mt-2">Choose a plan and start earning daily profits</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} {...plan} delay={i * 0.15} onBuy={() => handleBuy(plan.name)} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Plans;
