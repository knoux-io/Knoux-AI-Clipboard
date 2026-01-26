/**
 * Settings Panel - Main Component
 * Fully functional settings panel with real behavior
 */

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
} from 'lucide-react';
import { useSettingsContext } from '../contexts/SettingsContext';
import i18n from '../utils/i18n';
import settingsManager from '../../shared/settings-manager';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const settings = useSettingsContext();
  const [activeTab, setActiveTab] = useState<'general' | 'clipboard' | 'ai' | 'security'>('general');
  const [localSettings, setLocalSettings] = useState(settings.settings);

  useEffect(() => {
    setLocalSettings(settings.settings);
  }, [settings.settings]);

  const tabs = [
    { id: 'general', label: i18n.t('settings.general.title'), labelAr: 'عام', icon: <Globe className="w-4 h-4" /> },
    { id: 'clipboard', label: i18n.t('settings.clipboard.title'), labelAr: 'الحافظة', icon: <Clipboard className="w-4 h-4" /> },
    { id: 'ai', label: i18n.t('settings.ai.title'), labelAr: 'الذكاء الاصطناعي', icon: <Brain className="w-4 h-4" /> },
    { id: 'security', label: i18n.t('settings.security.title'), labelAr: 'الأمان', icon: <Shield className="w-4 h-4" /> },
  ];

  const handleSaveAll = async () => {
    await settings.saveSettings();
  };

  const handleSettingChange = <K extends keyof typeof localSettings>(
    key: K,
    value: typeof localSettings[K]
  ) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    settings.updateSetting(key, value);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {i18n.isRTL() ? 'الإعدادات العامة' : 'General Settings'}
            </h3>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Moon className="w-4 h-4" />
                {i18n.t('settings.general.theme')}
              </label>
              <select
                value={localSettings.theme || 'dark'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const theme = e.target.value as 'light' | 'dark';
                  handleSettingChange('theme', theme);
                  // Apply theme immediately
                  settingsManager.setSetting('theme', theme);
                }}
                title={i18n.t('settings.general.theme')}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="dark">{i18n.t('settings.general.themeDark')}</option>
                <option value="light">{i18n.t('settings.general.themeLight')}</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {i18n.t('settings.general.language')}
              </label>
              <select
                value={localSettings.language || 'ar'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const lang = e.target.value as 'ar' | 'en';
                  handleSettingChange('language', lang);
                  // Apply language immediately
                  i18n.setLanguage(lang);
                }}
                title={i18n.t('settings.general.language')}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="ar">{i18n.t('settings.general.languageAr')}</option>
                <option value="en">{i18n.t('settings.general.languageEn')}</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium text-white">{i18n.t('settings.general.notifications')}</div>
                  <div className="text-sm text-gray-400">{i18n.t('settings.general.notificationsEnabled')}</div>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', !localSettings.notifications)}
                title={localSettings.notifications ? (i18n.isRTL() ? 'تعطيل الإشعارات' : 'Disable notifications') : (i18n.isRTL() ? 'تفعيل الإشعارات' : 'Enable notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.notifications ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${localSettings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>
          </div>
        );

      case 'clipboard':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {i18n.isRTL() ? 'إعدادات الحافظة' : 'Clipboard Settings'}
            </h3>

            {/* Max History Size */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Database className="w-4 h-4" />
                {i18n.t('settings.clipboard.maxHistorySize')}
              </label>
              <input
                type="number"
                min="10"
                max="10000"
                value={localSettings.maxHistoryItems || 1000}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('maxHistoryItems', parseInt(e.target.value) || 1000)}
                title={i18n.t('settings.clipboard.maxHistorySize')}
                placeholder={i18n.isRTL() ? 'الحد الأقصى للعناصر' : 'Max items'}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                {i18n.isRTL() ? 'الحد الأقصى للعناصر في السجل' : 'Maximum items to keep in history'}
              </p>
            </div>

            {/* Auto Formatting */}
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clipboard className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium text-white">
                    {i18n.isRTL() ? 'التنسيق التلقائي' : 'Auto Formatting'}
                  </div>
                  <div className="text-sm text-gray-400">
                    {i18n.isRTL() ? 'تنسيق النص تلقائياً' : 'Automatically format text'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('autoFormatting', !(localSettings.autoFormatting ?? true))}
                title={localSettings.autoFormatting !== false ? (i18n.isRTL() ? 'تعطيل التنسيق التلقائي' : 'Disable auto formatting') : (i18n.isRTL() ? 'تفعيل التنسيق التلقائي' : 'Enable auto formatting')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.autoFormatting !== false ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${localSettings.autoFormatting !== false ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {i18n.isRTL() ? 'إعدادات الذكاء الاصطناعي' : 'AI Settings'}
            </h3>

            {/* Enable AI */}
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium text-white">{i18n.t('settings.ai.enableAI')}</div>
                  <div className="text-sm text-gray-400">
                    {i18n.isRTL() ? 'تفعيل جميع ميزات الذكاء الاصطناعي' : 'Enable all AI features'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('aiEnabled', !(localSettings.aiEnabled ?? true))}
                title={localSettings.aiEnabled !== false ? (i18n.isRTL() ? 'تعطيل الذكاء الاصطناعي' : 'Disable AI') : (i18n.isRTL() ? 'تفعيل الذكاء الاصطناعي' : 'Enable AI')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.aiEnabled !== false ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${localSettings.aiEnabled !== false ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>

            {/* AI Model */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {i18n.t('settings.ai.modelSelection')}
              </label>
              <select
                value={localSettings.defaultModel || 'standard'}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('defaultModel', e.target.value)}
                title={i18n.t('settings.ai.modelSelection')}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="lightweight">{i18n.isRTL() ? 'خفيف (سريع)' : 'Lightweight (Fast)'}</option>
                <option value="standard">{i18n.isRTL() ? 'معياري (متوازن)' : 'Standard (Balanced)'}</option>
                <option value="advanced">{i18n.isRTL() ? 'متقدم (دقيق)' : 'Advanced (Accurate)'}</option>
              </select>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {i18n.isRTL() ? 'إعدادات الأمان' : 'Security Settings'}
            </h3>

            {/* Encryption */}
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-medium text-white">{i18n.t('settings.security.encryptionOn')}</div>
                  <div className="text-sm text-gray-400">
                    {i18n.isRTL() ? 'تشفير البيانات الحساسة' : 'Encrypt sensitive data'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('encryptSensitive', !(localSettings.encryptSensitive ?? true))}
                title={localSettings.encryptSensitive !== false ? (i18n.isRTL() ? 'تعطيل التشفير' : 'Disable encryption') : (i18n.isRTL() ? 'تفعيل التشفير' : 'Enable encryption')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.encryptSensitive !== false ? 'bg-green-600' : 'bg-gray-600'
                  }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${localSettings.encryptSensitive !== false ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>

            {/* Clear on Lock */}
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-red-400" />
                <div>
                  <div className="font-medium text-white">{i18n.t('settings.security.clearOnLock')}</div>
                  <div className="text-sm text-gray-400">
                    {i18n.isRTL() ? 'مسح الحافظة عند القفل' : 'Clear clipboard on lock'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('clearClipboardOnExit', !localSettings.clearClipboardOnExit)}
                title={localSettings.clearClipboardOnExit ? (i18n.isRTL() ? 'تعطيل مسح عند القفل' : 'Disable clear on lock') : (i18n.isRTL() ? 'تفعيل مسح عند القفل' : 'Enable clear on lock')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${localSettings.clearClipboardOnExit ? 'bg-red-600' : 'bg-gray-600'
                  }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${localSettings.clearClipboardOnExit ? 'translate-x-6' : 'translate-x-1'
                  }`} />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Settings className="w-8 h-8 mr-3 text-purple-400" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveAll}
              disabled={settings.isSaving}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {settings.isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {settings.isSaving
                ? (i18n.isRTL() ? 'جاري الحفظ...' : 'Saving...')
                : (i18n.isRTL() ? 'حفظ' : 'Save')
              }
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-48">
            <div className="bg-black/40 rounded-lg p-4 border border-purple-500/20">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {tab.icon}
                      <span className="ml-3 font-medium">{i18n.isRTL() ? tab.labelAr : tab.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-black/40 rounded-lg p-6 border border-purple-500/20">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
