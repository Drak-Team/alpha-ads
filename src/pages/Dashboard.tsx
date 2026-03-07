import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { 
  LayoutDashboard, 
  Wallet, 
  PlayCircle, 
  Users, 
  Settings,
  ArrowUpRight,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const ADMIN_EMAIL = "Algoalgo371@gmail.com";

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }
      setUser(user);
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setProfile(profile);
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user || !profile) return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-primary p-6 text-white rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">خوش آمدید</p>
            <h1 className="text-xl font-bold">{profile.full_name || "User"}</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-white">
            <LogOut className="h-6 w-6" />
          </Button>
        </div>

        <Card className="bg-white/10 border-none text-white p-6 backdrop-blur-md">
          <p className="text-sm opacity-80 mb-1">کل بیلنس</p>
          <h2 className="text-3xl font-bold mb-4">Rs. {profile.balance?.toFixed(2) || "0.00"}</h2>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/withdraw")} className="flex-1 bg-white text-primary hover:bg-white/90">
              <Wallet className="mr-2 h-4 w-4" /> ودڈرال
            </Button>
            {user.email === ADMIN_EMAIL && (
              <Button onClick={() => navigate("/admin-panel")} className="flex-1 bg-yellow-500 text-white hover:bg-yellow-600">
                <Settings className="mr-2 h-4 w-4" /> ایڈمن پینل
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 mt-4">
        <Card onClick={() => navigate("/earn")} className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <PlayCircle />
          </div>
          <span className="font-medium text-sm">ایڈز دیکھیں</span>
        </Card>

        <Card onClick={() => navigate("/plans")} className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <ArrowUpRight />
          </div>
          <span className="font-medium text-sm">پلانز</span>
        </Card>

        <Card onClick={() => navigate("/referral")} className="p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
          <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <Users />
          </div>
          <span className="font-medium text-sm">دوستوں کو بلائیں</span>
        </Card>

        <Card className="p-4 flex flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <LayoutDashboard />
          </div>
          <span className="font-medium text-sm text-center">ڈیلی ٹاسک</span>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
             
