import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-20"> {/* مینیو کے لیے جگہ چھوڑنا */}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Navigation /> {/* یہ وہ مینیو ہے جو ہر پیج پر نظر آئے گا */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
