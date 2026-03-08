import { Home, Gem, PlayCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = navigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "ہوم", path: "/dashboard" },
    { icon: Gem, label: "پلانز", path: "/plans" },
    { icon: PlayCircle, label: "ایڈز", path: "/ads" },
    { icon: User, label: "پروفائل", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-emerald-950 border-t border-white/10 flex justify-around p-3 z-50">
      {menuItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 ${
            location.pathname === item.path ? "text-yellow-500" : "text-white/60"
          }`}
        >
          <item.icon size={20} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;
