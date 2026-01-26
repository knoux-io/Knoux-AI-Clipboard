/**
 * Settings Panel - Main Component
 */

import React, { useState } from 'react';
import {
  Settings,
  Globe,
  Clipboard,
  ChevronRight,
  Save,
  RefreshCw,
  X
} from 'lucide-react';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'clipboard'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
    { id: 'clipboard', label: 'Clipboard', icon: <Clipboard className="w-4 h-4" /> }
  ];

  const handleSaveAll = async () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600">
                <option>Dark Mode</option>
                <option>Light Mode</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600">
                <option>English</option>
                <option>العربية</option>
              </select>
            </div>
          </div>
        );
      case 'clipboard':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Clipboard Settings</h3>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Auto-sync interval (seconds)</label>
              <input type="number" defaultValue="5" className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600" />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm font-medium text-gray-300">Save history on exit</span>
              </label>
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
              disabled={isSaving}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
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
                      <span className="ml-3 font-medium">{tab.label}</span>
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
