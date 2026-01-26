import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ClipboardCopy, Settings, Shield } from "lucide-react";
import SplashScreen from "./components/SplashScreen";
import Sidebar from "./components/Sidebar";
import DigitalClock from "./components/DigitalClock";
import DashboardPage from "./pages/DashboardPage";
import ClipboardHistory from "./views/ClipboardHistory";
import AIInsights from "./views/AIInsights";
import SecurityCenter from "./views/SecurityCenter";
import SmartActions from "./views/SmartActions";
import VIP from "./views/VIP";
import AboutKnoux from "./components/AboutKnoux";
import SettingsPanel from "./components/SettingsPanel";
import i18n from "./utils/i18n";
import { SettingsProvider } from "./contexts/SettingsContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import BottomNav from "./components/BottomNav";

// Main App Layout Component
function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize i18n
    const storedLang = localStorage.getItem("knoux_language") as
      | "ar"
      | "en"
      | null;
    if (storedLang) {
      i18n.setLanguage(storedLang);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Don't show sidebar/layout for settings and about pages
  const isFullPage =
    location.pathname === "/settings" || location.pathname === "/about";

  if (isFullPage) {
    return (
      <Routes>
        <Route
          path="/settings"
          element={<SettingsPanel onClose={() => navigate("/")} />}
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-knoux-background p-8">
              <div className="container mx-auto max-w-4xl">
                <button
                  onClick={() => navigate("/")}
                  className="mb-6 px-4 py-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  {i18n.isRTL() ? "← العودة" : "← Back"}
                </button>
                <AboutKnoux />
              </div>
            </div>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-knoux-background text-white flex flex-col md:flex-row">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden mb-16 md:mb-0">
        {/* Header with Digital Clock */}
        <header className="relative bg-knoux-background-surface/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-knoux-primary to-knoux-secondary rounded-xl shadow-lg">
                  <ClipboardCopy className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {i18n.t("app.name")}
                  </h1>
                  <p className="text-xs text-gray-400">
                    {i18n.t("dashboard.officialTime")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <DigitalClock />
                <button
                  onClick={() => navigate("/about")}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                  title={i18n.t("sidebar.about")}
                >
                  <Shield className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                  title={i18n.t("sidebar.settings")}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/clipboard" element={<ClipboardHistory />} />
            <Route path="/ai" element={<AIInsights />} />
            <Route path="/smart-actions" element={<SmartActions />} />
            <Route path="/vip" element={<VIP />} />
            <Route path="/analytics" element={<DashboardPage />} />
            <Route path="/security" element={<SecurityCenter />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Root App Component
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SettingsProvider initialSettings={null}>
          <AppLayout />
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
