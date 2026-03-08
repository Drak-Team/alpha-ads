import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";
import Navigation from "./components/Navigation";

const App = () => (
  <BrowserRouter>
    <div className="pb-20 bg-[#064e3b] min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    <Navigation /> {/* نیچے والے بٹن */}
  </BrowserRouter>
);

export default App;
