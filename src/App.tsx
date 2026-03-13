import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat"; 
import Referral from "./pages/Referral";
import Withdraw from "./pages/Withdraw";
import Deposit from "./pages/Deposit"; // یہاں ڈپازٹ کو شامل کیا ہے
import Navigation from "./components/Navigation";

const App = () => (
  <BrowserRouter>
    <div className="pb-28 bg-[#064e3b] min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/refer" element={<Referral />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/deposit" element={<Deposit />} /> {/* ڈپازٹ کا راستہ یہاں سیٹ کر دیا ہے */}
      </Routes>
    </div>
    <Navigation />
  </BrowserRouter>
);

export default App;
