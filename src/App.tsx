import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Plans from "./pages/Plans";
import Ads from "./pages/Ads";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat"; // یہ لائن شامل کی
import Refer from "./refer/Refer"; // یہ لائن شامل کی (آپ کے فولڈر کے مطابق)
import Navigation from "./components/Navigation";

const App = () => (
  <BrowserRouter>
    <div className="pb-24 bg-[#064e3b] min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} /> {/* چیٹ کا راستہ */}
        <Route path="/refer" element={<Refer />} /> {/* ریفر کا راستہ */}
      </Routes>
    </div>
    <Navigation /> {/* نیچے والے بٹن اب کام کریں گے */}
  </BrowserRouter>
);

export default App;
