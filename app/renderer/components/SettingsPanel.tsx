/**
 * Settings Panel - Main Component
 * Orchestrates all settings components
 */

import React, { useState } from 'react';
import GeneralSettings from './settings/GeneralSettings';
import ClipboardSettings from './settings/ClipboardSettings';
import AISettings from './settings/AISettings';
import SecuritySettings from './settings/SecuritySettings';
import UISettings from './settings/UISettings';
import {
  Settings,
  Globe,
  Clipboard,
  Brain,
  Shield,
  Monitor,
  ChevronRight,
  Save,
  RefreshCw
} from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'clipboard' | 'ai' | 'security' | 'ui'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe className="w-4 h-4" /> },
    { id: 'clipboard', label: 'Clipboard', icon: <Clipboard className="w-4 h-4" /> },
    { id: 'ai', label: 'AI', icon: <Brain className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'ui', label: 'UI', icon: <Monitor className="w-4 h-4" /> }
  ];

  const handleSaveAll = async () => {
    setIsSaving(true);
    // Save logic here
    setTimeout(() => setIsSaving(false), 1000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings onSave={handleSaveAll} />;
      case 'clipboard':
        return <ClipboardSettings />;
      case 'ai':
        return <AISettings />;
      case 'security':
        return <SecuritySettings />;
      case 'ui':
        return <UISettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="w-8 h-8 mr-3" />
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your Knoux Clipboard AI experience
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save All'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
