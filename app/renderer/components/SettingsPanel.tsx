import React, { useState, useEffect } from 'react';
import {
  Settings,
  Globe,
  Clipboard,
  Brain,
  Shield,
  ChevronRight,
  Save,
  RefreshCw,
  X,
  Moon,
  Bell,
  Lock,
  Database,
  Activity,
  Zap,
  Eye,
  Trash2,
  HardDrive,
  Palette,
  Layout,
  Plus
} from 'lucide-react';
import { useSettingsContext } from '../contexts/SettingsContext';
import { useTheme } from '../contexts/ThemeContext';
import i18n from '../utils/i18n';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const settings = useSettingsContext();
  const { theme, setTheme, availableThemes } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'clipboard' | 'ai' | 'security'>('general');
  const [localSettings, setLocalSettings] = useState(settings.settings);

  // Sync local state with context when context updates
  useEffect(() => {
    if (settings.settings) {
      setLocalSettings(settings.settings);
    }
  }, [settings.settings]);

  const tabs = [
    { id: 'general', label: i18n.t('settings.general.title'), labelAr: 'عام', icon: <Globe className="w-5 h-5" /> },
    { id: 'appearance', label: i18n.isRTL() ? 'المظهر' : 'Appearance', labelAr: 'المظهر', icon: <Palette className="w-5 h-5" /> },
    { id: 'clipboard', label: i18n.t('settings.clipboard.title'), labelAr: 'الحافظة', icon: <Clipboard className="w-5 h-5" /> },
    { id: 'ai', label: i18n.t('settings.ai.title'), labelAr: 'الذكاء الاصطناعي', icon: <Brain className="w-5 h-5" /> },
    { id: 'security', label: i18n.t('settings.security.title'), labelAr: 'الأمان', icon: <Shield className="w-5 h-5" /> },
  ];

  const handleSettingChange = <K extends keyof typeof localSettings>(
    key: K,
    value: any
  ) => {
    if (!localSettings) return;
    
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    settings.updateSetting(key, value);
    
    // Handle immediate side effects
    if (key === 'language') {
      i18n.setLanguage(value as 'ar' | 'en');
    }
  };

  if (!localSettings) {
    return (
      <div className="flex items-center justify-center h-full text-knoux-primary">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const renderToggle = (
    label: string,
    description: string,
    key: keyof typeof localSettings,
    icon: React.ReactNode
  ) => (
    <div className="flex items-center justify-between p-4 bg-knoux-background-surface/50 rounded-xl border border-white/5 hover:border-knoux-primary/30 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-knoux-primary/10 text-knoux-primary group-hover:bg-knoux-primary/20 transition-colors">
          {icon}
        </div>
        <div>
          <div className="font-medium text-white">{label}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      </div>
      <button
        onClick={() => handleSettingChange(key, !localSettings[key])}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-knoux-primary/50 ${
          localSettings[key] ? 'bg-knoux-primary' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-300 ${
            localSettings[key] 
              ? (i18n.isRTL() ? '-translate-x-6' : 'translate-x-6') 
              : (i18n.isRTL() ? '-translate-x-1' : 'translate-x-1')
          }`}
        />
      </button>
    </div>
  );

  const renderSelect = (
    label: string,
    key: keyof typeof localSettings,
    options: { value: string; label: string }[],
    icon: React.ReactNode
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="relative">
        <select
          value={String(localSettings[key])}
          onChange={(e) => handleSettingChange(key, e.target.value)}
          className="w-full px-4 py-3 bg-knoux-background-surface/50 text-white rounded-xl border border-white/10 focus:border-knoux-primary focus:ring-1 focus:ring-knoux-primary appearance-none transition-colors cursor-pointer hover:bg-knoux-background-surface/80"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-knoux-background-surface text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className={`absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 ${i18n.isRTL() ? 'left-4' : 'right-4'}`}>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-knoux-primary-light to-knoux-secondary-light mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-knoux-primary" />
              {i18n.isRTL() ? 'الإعدادات العامة' : 'General Settings'}
            </h3>

            <div className="grid gap-6">
              {renderSelect(
                i18n.t('settings.general.language') || (i18n.isRTL() ? 'اللغة' : 'Language'),
                'language',
                [
                  { value: 'ar', label: 'العربية' },
                  { value: 'en', label: 'English' }
                ],
                <Globe className="w-4 h-4 text-knoux-primary" />
              )}

              {renderToggle(
                i18n.isRTL() ? 'التشغيل مع النظام' : 'Start with System',
                i18n.isRTL() ? 'تشغيل التطبيق تلقائياً عند بدء تشغيل الجهاز' : 'Launch application automatically on system startup',
                'startWithSystem',
                <Zap className="w-5 h-5" />
              )}

              {renderToggle(
                i18n.isRTL() ? 'الإشعارات' : 'Notifications',
                i18n.isRTL() ? 'تفعيل إشعارات سطح المكتب' : 'Enable desktop notifications',
                'notifications',
                <Bell className="w-5 h-5" />
              )}
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-knoux-primary-light to-knoux-secondary-light mb-6 flex items-center gap-2">
              <Palette className="w-6 h-6 text-knoux-primary" />
              {i18n.isRTL() ? 'المظهر والسمات' : 'Appearance & Themes'}
            </h3>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                {i18n.isRTL() ? 'السمة الحالية' : 'Current Theme'}
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableThemes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`relative p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group overflow-hidden ${
                      theme === t.id
                        ? 'bg-knoux-primary/10 border-knoux-primary shadow-lg shadow-knoux-primary/10'
                        : 'bg-knoux-background-surface/50 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div 
                      className="w-12 h-12 rounded-lg shadow-inner border border-white/10 flex items-center justify-center text-xl"
                      style={{ backgroundColor: t.color }}
                    >
                      {theme === t.id && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                    </div>
                    <div className="text-left">
                      <div className={`font-medium ${theme === t.id ? 'text-knoux-primary' : 'text-white'}`}>
                        {t.label}
                      </div>
                      <div className="text-xs text-gray-400">
                        {theme === t.id ? (i18n.isRTL() ? 'نشط' : 'Active') : (i18n.isRTL() ? 'تطبيق' : 'Apply')}
                      </div>
                    </div>
                    {theme === t.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-knoux-primary rounded-full shadow-[0_0_10px_rgba(var(--knoux-primary),0.5)]" />
                    )}
                  </button>
                ))}

                {/* Custom Theme Builder Entry */}
                <button
                  className="relative p-4 rounded-xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 transition-all duration-300 flex items-center gap-4 group"
                  onClick={() => alert(i18n.isRTL() ? 'سيتم إطلاق منشئ السمات قريباً!' : 'Theme Builder coming soon!')}
                >
                  <div className="w-12 h-12 rounded-lg border-2 border-white/20 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-300 group-hover:text-white transition-colors">
                      {i18n.isRTL() ? 'تخصيص سمة' : 'Custom Theme'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {i18n.isRTL() ? 'أنشئ مظهرك الخاص' : 'Create your own look'}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

      case 'clipboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-knoux-primary-light to-knoux-secondary-light mb-6 flex items-center gap-2">
              <Clipboard className="w-6 h-6 text-knoux-primary" />
              {i18n.isRTL() ? 'إعدادات الحافظة' : 'Clipboard Settings'}
            </h3>

            <div className="grid gap-6">
              {renderToggle(
                i18n.isRTL() ? 'مراقبة الحافظة' : 'Clipboard Monitoring',
                i18n.isRTL() ? 'حفظ النصوص المنسوخة تلقائياً' : 'Automatically save copied text',
                'clipboardMonitoring',
                <Eye className="w-5 h-5" />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-knoux-accent" />
                  {i18n.isRTL() ? 'حد السجل' : 'History Limit'}
                </label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  value={localSettings.clipboardLimit || 100}
                  onChange={(e) => handleSettingChange('clipboardLimit', parseInt(e.target.value) || 100)}
                  className="w-full px-4 py-3 bg-knoux-background-surface/50 text-white rounded-xl border border-white/10 focus:border-knoux-primary focus:ring-1 focus:ring-knoux-primary"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {i18n.isRTL() ? 'عدد العناصر المحفوظة في السجل (10-1000)' : 'Number of items to keep in history (10-1000)'}
                </p>
              </div>

              {renderToggle(
                i18n.isRTL() ? 'التنظيف التلقائي' : 'Auto Cleanup',
                i18n.isRTL() ? 'حذف العناصر القديمة تلقائياً' : 'Automatically remove old items',
                'autoCleanup',
                <Trash2 className="w-5 h-5" />
              )}
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-knoux-primary-light to-knoux-secondary-light mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-knoux-primary" />
              {i18n.isRTL() ? 'إعدادات الذكاء الاصطناعي' : 'AI Settings'}
            </h3>

            <div className="grid gap-6">
              {renderToggle(
                i18n.isRTL() ? 'تفعيل الذكاء الاصطناعي' : 'Enable AI',
                i18n.isRTL() ? 'تمكين تحليل وتصنيف النصوص الذكي' : 'Enable smart text analysis and classification',
                'aiEnabled',
                <Activity className="w-5 h-5" />
              )}

              {localSettings.aiEnabled && (
                <>
                  {renderSelect(
                    i18n.isRTL() ? 'نموذج المعالجة' : 'Processing Model',
                    'aiModel',
                    [
                      { value: 'local', label: i18n.isRTL() ? 'محلي (أسرع / خصوصية أعلى)' : 'Local (Faster / More Privacy)' },
                      { value: 'cloud', label: i18n.isRTL() ? 'سحابي (أكثر دقة)' : 'Cloud (More Accurate)' }
                    ],
                    <HardDrive className="w-4 h-4 text-knoux-secondary" />
                  )}

                  {renderToggle(
                    i18n.isRTL() ? 'التلخيص التلقائي' : 'Auto Summarize',
                    i18n.isRTL() ? 'إنشاء ملخصات للنصوص الطويلة تلقائياً' : 'Automatically generate summaries for long text',
                    'autoSummarize',
                    <Clipboard className="w-5 h-5" />
                  )}
                </>
              )}
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-knoux-primary-light to-knoux-secondary-light mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-knoux-primary" />
              {i18n.isRTL() ? 'إعدادات الأمان' : 'Security Settings'}
            </h3>

            <div className="grid gap-6">
              {renderToggle(
                i18n.isRTL() ? 'تشفير البيانات' : 'Data Encryption',
                i18n.isRTL() ? 'تشفير جميع البيانات المحفوظة محلياً' : 'Encrypt all locally stored data',
                'encryption',
                <Lock className="w-5 h-5" />
              )}

              {renderToggle(
                i18n.isRTL() ? 'إخفاء البيانات' : 'Anonymize Data',
                i18n.isRTL() ? 'إزالة المعلومات الحساسة قبل المعالجة' : 'Remove sensitive info before processing',
                'anonymizeData',
                <Eye className="w-5 h-5" />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl h-[85vh] bg-knoux-background/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row"
        dir={i18n.isRTL() ? 'rtl' : 'ltr'}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 z-10 p-2 text-gray-400 hover:text-white bg-black/20 hover:bg-red-500/20 rounded-full transition-all duration-300 backdrop-blur-md border border-white/5 ltr:right-4 rtl:left-4"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-knoux-background-surface/50 border-b md:border-b-0 md:border-r border-white/5 p-6 flex flex-col">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-knoux-primary to-knoux-secondary flex items-center justify-center shadow-lg shadow-knoux-primary/20">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              {i18n.isRTL() ? 'الإعدادات' : 'Settings'}
            </h2>
          </div>
          
          <nav className="space-y-2 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  activeTab === tab.id
                    ? 'bg-knoux-primary text-white shadow-lg shadow-knoux-primary/25'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className={`transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {tab.icon}
                </div>
                <span className="font-medium">
                  {i18n.isRTL() ? tab.labelAr : tab.label}
                </span>
                {activeTab === tab.id && (
                  <ChevronRight className={`w-4 h-4 ml-auto opacity-50 ${i18n.isRTL() ? 'rotate-180' : ''}`} />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-gray-500 font-mono">Knoux v1.0.0</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-2xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
