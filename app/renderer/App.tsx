import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ClipboardCopy, Settings, Shield } from 'lucide-react';
import SplashScreen from './components/SplashScreen';
import Sidebar from './components/Sidebar';
import DigitalClock from './components/DigitalClock';
import DashboardPage from './pages/DashboardPage';
import ClipboardHistory from './views/ClipboardHistory';
import AIInsights from './views/AIInsights';
import SecurityCenter from './views/SecurityCenter';
import SmartActions from './views/SmartActions';
import VIP from './views/VIP';
import AboutKnoux from './components/AboutKnoux';
import SettingsPanel from './components/SettingsPanel';
import i18n from './utils/i18n';
import { SettingsProvider } from './contexts/SettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { initializeApp } from './services/initialization';
import BottomNav from './components/BottomNav';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.getCurrentLanguage());
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        console.log('🚀 Starting app initialization...');
        
        // Initialize app services
        const success = await initializeApp();
        if (success) {
          setAppReady(true);
          console.log('✅ App services initialized');
        }

        // Load settings from IPC
        try {
          if (window.electronAPI?.getSettings) {
            const settingsResult = await window.electronAPI.getSettings();
            if (settingsResult?.success) {
              const loadedSettings = settingsResult.data;
              setSettings(loadedSettings);
              
              // Apply language
              if (loadedSettings.language && loadedSettings.language !== i18n.getCurrentLanguage()) {
                i18n.setLanguage(loadedSettings.language);
                setCurrentLanguage(loadedSettings.language);
                console.log('✅ Language applied:', loadedSettings.language);
              }
              
              // Apply theme
              if (loadedSettings.theme) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(loadedSettings.theme);
                console.log('✅ Theme applied:', loadedSettings.theme);
              }
              
              console.log('✅ Settings loaded and applied');
            }
          } else if (window.electron?.ipcRenderer) {
            // Fallback to direct IPC
            const settingsResult = await window.electron.ipcRenderer.invoke('settings:get-all');
            if (settingsResult?.success) {
              const loadedSettings = settingsResult.data;
              setSettings(loadedSettings);
              
              if (loadedSettings.language) {
                i18n.setLanguage(loadedSettings.language);
                setCurrentLanguage(loadedSettings.language);
              }
              
              if (loadedSettings.theme) {
                document.documentElement.classList.remove('light', 'dark');
                document.documentElement.classList.add(loadedSettings.theme);
              }
            }
          }
        } catch (error) {
          console.warn('Could not load settings from IPC:', error);
        }

        // Show splash for minimum time
        setTimeout(() => {
          setShowSplash(false);
          console.log('✅ App initialization complete');
        }, 2500);
      } catch (error) {
        console.error('❌ App initialization error:', error);
        setTimeout(() => setShowSplash(false), 1000);
      }
    };

    init();

    // Listen for language changes
    const unsubscribe = i18n.onLanguageChange((language) => {
      setCurrentLanguage(language);
      console.log('🌐 Language changed to:', language);
    });

    return unsubscribe;
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const isFullPage = location.pathname === '/settings' || location.pathname === '/about';
  const isRTL = i18n.isRTL();

  if (isFullPage) {
    return (
      <Routes>
        <Route 
          path="/settings" 
          element={
            <SettingsPanel 
              onClose={() => navigate('/')} 
              initialSettings={settings}
            />
          } 
        />
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-knoux-background p-8">
              <div className="container mx-auto max-w-4xl">
                <button
                  onClick={() => navigate('/')}
                  className={`mb-6 px-4 py-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all ${
                    isRTL ? 'mr-auto' : 'ml-0'
                  }`}
                >
                  {isRTL ? '← العودة' : '← Back'}
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
    <div className={`min-h-screen bg-knoux-background text-white flex flex-col md:flex-row ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden mb-16 md:mb-0">
        <header className="relative bg-knoux-background-surface/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="p-3 bg-gradient-to-br from-knoux-primary to-knoux-secondary rounded-xl shadow-lg">
                  <ClipboardCopy className="w-6 h-6" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {i18n.t('app.name')}
                  </h1>
                  <p className="text-xs text-gray-400">{i18n.t('dashboard.officialTime')}</p>
                </div>
              </div>

              <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <DigitalClock />
                <button
                  onClick={() => navigate('/about')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                  title={i18n.t('navigation.about')}
                >
                  <Shield className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-500/20 rounded-lg transition-all"
                  title={i18n.t('navigation.settings')}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

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