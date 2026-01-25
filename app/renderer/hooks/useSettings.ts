/**
 * Settings Management Hook
 * Manages application settings with persistence, validation, and synchronization
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { logger } from '../../shared/logger';
import type { UserPreferences, SettingsValidation } from '../../shared/types';
import { UITheme, LanguageCode } from '../../shared/enums';

interface UseSettingsOptions {
  autoSave?: boolean;
  saveDebounceMs?: number;
  validateOnChange?: boolean;
}

interface UseSettingsReturn {
  // State
  settings: UserPreferences;
  originalSettings: UserPreferences;
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  validationErrors: Record<string, string>;
  saveError: string | null;
  
  // Actions
  updateSetting: <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => void;
  updateSettings: (updates: Partial<UserPreferences>) => void;
  saveSettings: () => Promise<boolean>;
  resetSettings: () => Promise<boolean>;
  resetToDefaults: () => void;
  discardChanges: () => void;
  
  // Categories
  getCategorySettings: (category: string) => Partial<UserPreferences>;
  updateCategorySettings: (category: string, updates: Partial<UserPreferences>) => void;
  
  // Validation
  validateSetting: <K extends keyof UserPreferences>(
    key: K, 
    value: UserPreferences[K]
  ) => string | null;
  validateAll: () => boolean;
  
  // Import/Export
  exportSettings: (format: 'json' | 'yaml') => string;
  importSettings: (data: string, format: 'json' | 'yaml') => Promise<boolean>;
  
  // Utilities
  resetSection: (section: keyof UserPreferences) => void;
  getSettingDescription: (key: keyof UserPreferences) => string;
}

export const useSettings = (initialSettings?: UserPreferences, options: UseSettingsOptions = {}): UseSettingsReturn => {
  const {
    autoSave = false,
    saveDebounceMs = 1000,
    validateOnChange = true
  } = options;

  const logger = logger.child({ module: 'useSettings' });
  
  // State
  const [settings, setSettings] = useState<UserPreferences>(initialSettings || getDefaultSettings());
  const [originalSettings, setOriginalSettings] = useState<UserPreferences>({ ...settings });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [saveError, setSaveError] = useState<string | null>(null);
  
  // Refs
  const saveTimerRef = useRef<NodeJS.Timeout>();
  const lastSaveRef = useRef<number>(0);

  // Load settings on mount
  useEffect(() => {
    if (!initialSettings) {
      loadSettings();
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    if (autoSave && isDirty && !Object.keys(validationErrors).length) {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
      
      saveTimerRef.current = setTimeout(() => {
        saveSettings();
      }, saveDebounceMs);
    }
    
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [settings, autoSave, isDirty, saveDebounceMs]);

  // Load settings from Electron
  const loadSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      setSaveError(null);
      
      const response = await window.knoux.getSettings();
      
      if (response.success && response.data) {
        const loadedSettings = response.data;
        
        // Validate loaded settings
        const validated = validateAndFixSettings(loadedSettings);
        
        setSettings(validated);
        setOriginalSettings({ ...validated });
        setIsDirty(false);
        setValidationErrors({});
        
        logger.info('Settings loaded successfully');
      } else {
        throw new Error(response.error || 'Failed to load settings');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Load failed';
      logger.error('Failed to load settings:', error);
      setSaveError(message);
      
      // Use defaults
      const defaults = getDefaultSettings();
      setSettings(defaults);
      setOriginalSettings({ ...defaults });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get default settings
  const getDefaultSettings = useCallback((): UserPreferences => {
    return {
      // General
      language: 'en',
      theme: 'dark',
      fontSize: 14,
      animations: true,
      tooltips: true,
      notifications: true,
      
      // Clipboard
      autoStart: true,
      pollInterval: 500,
      maxHistoryItems: 1000,
      captureImages: false,
      captureHtml: true,
      captureRtf: true,
      autoClearSensitive: true,
      autoClearMinutes: 5,
      
      // AI
      aiEnabled: true,
      defaultModel: 'llama-2-7b-chat',
      autoEnhance: false,
      autoSummarize: false,
      autoClassify: true,
      confidenceThreshold: 0.7,
      useCloudModels: false,
      
      // Security
      encryptSensitive: true,
      requirePassword: false,
      autoLockMinutes: 30,
      clearClipboardOnExit: false,
      anonymizeData: true,
      
      // Performance
      cacheEnabled: true,
      cacheSizeMB: 100,
      workerCount: 4,
      compressionLevel: 6,
      
      // UI
      showLineNumbers: true,
      wordWrap: true,
      tabSize: 2,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      sidebarPosition: 'left',
      defaultView: 'list'
    };
  }, []);

  // Validate and fix settings
  const validateAndFixSettings = useCallback((settings: UserPreferences): UserPreferences => {
    const fixed = { ...settings };
    
    // Validate ranges
    if (fixed.fontSize < 8 || fixed.fontSize > 24) {
      fixed.fontSize = 14;
    }
    
    if (fixed.pollInterval < 100 || fixed.pollInterval > 5000) {
      fixed.pollInterval = 500;
    }
    
    if (fixed.maxHistoryItems < 10 || fixed.maxHistoryItems > 10000) {
      fixed.maxHistoryItems = 1000;
    }
    
    if (fixed.confidenceThreshold < 0.1 || fixed.confidenceThreshold > 1) {
      fixed.confidenceThreshold = 0.7;
    }
    
    if (fixed.autoClearMinutes < 1 || fixed.autoClearMinutes > 1440) {
      fixed.autoClearMinutes = 5;
    }
    
    if (fixed.autoLockMinutes < 1 || fixed.autoLockMinutes > 1440) {
      fixed.autoLockMinutes = 30;
    }
    
    if (fixed.cacheSizeMB < 10 || fixed.cacheSizeMB > 1000) {
      fixed.cacheSizeMB = 100;
    }
    
    if (fixed.workerCount < 1 || fixed.workerCount > 16) {
      fixed.workerCount = 4;
    }
    
    if (fixed.compressionLevel < 0 || fixed.compressionLevel > 9) {
      fixed.compressionLevel = 6;
    }
    
    if (fixed.tabSize < 1 || fixed.tabSize > 8) {
      fixed.tabSize = 2;
    }
    
    return fixed;
  }, []);

  // Validate single setting
  const validateSetting = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ): string | null => {
    const validations: SettingsValidation = {
      fontSize: (v: number) => v >= 8 && v <= 24 ? null : 'Font size must be between 8 and 24',
      pollInterval: (v: number) => v >= 100 && v <= 5000 ? null : 'Poll interval must be between 100 and 5000 ms',
      maxHistoryItems: (v: number) => v >= 10 && v <= 10000 ? null : 'Max items must be between 10 and 10000',
      confidenceThreshold: (v: number) => v >= 0.1 && v <= 1 ? null : 'Confidence must be between 0.1 and 1',
      autoClearMinutes: (v: number) => v >= 1 && v <= 1440 ? null : 'Auto-clear must be between 1 and 1440 minutes',
      autoLockMinutes: (v: number) => v >= 1 && v <= 1440 ? null : 'Auto-lock must be between 1 and 1440 minutes',
      cacheSizeMB: (v: number) => v >= 10 && v <= 1000 ? null : 'Cache size must be between 10 and 1000 MB',
      workerCount: (v: number) => v >= 1 && v <= 16 ? null : 'Worker count must be between 1 and 16',
      compressionLevel: (v: number) => v >= 0 && v <= 9 ? null : 'Compression level must be between 0 and 9',
      tabSize: (v: number) => v >= 1 && v <= 8 ? null : 'Tab size must be between 1 and 8',
    };
    
    const validator = validations[key as keyof SettingsValidation];
    if (validator) {
      return validator(value as any);
    }
    
    return null;
  }, []);

  // Validate all settings
  const validateAll = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    
    Object.entries(settings).forEach(([key, value]) => {
      const error = validateSetting(key as keyof UserPreferences, value);
      if (error) {
        errors[key] = error;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [settings, validateSetting]);

  // Update single setting
  const updateSetting = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // Validate if enabled
      if (validateOnChange) {
        const error = validateSetting(key, value);
        setValidationErrors(prevErrors => {
          if (error) {
            return { ...prevErrors, [key]: error };
          } else {
            const newErrors = { ...prevErrors };
            delete newErrors[key];
            return newErrors;
          }
        });
      }
      
      // Check if dirty
      const isChanged = JSON.stringify(newSettings[key]) !== JSON.stringify(originalSettings[key]);
      setIsDirty(prev => prev || isChanged);
      
      return newSettings;
    });
  }, [originalSettings, validateOnChange, validateSetting]);

  // Update multiple settings
  const updateSettings = useCallback((updates: Partial<UserPreferences>) => {
    setSettings(prev => {
      const newSettings = { ...prev, ...updates };
      
      // Validate if enabled
      if (validateOnChange) {
        const errors: Record<string, string> = {};
        Object.entries(updates).forEach(([key, value]) => {
          const error = validateSetting(key as keyof UserPreferences, value);
          if (error) {
            errors[key] = error;
          }
        });
        
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          ...errors
        }));
      }
      
      // Check if dirty
      const isChanged = Object.keys(updates).some(key => 
        JSON.stringify(newSettings[key as keyof UserPreferences]) !== 
        JSON.stringify(originalSettings[key as keyof UserPreferences])
      );
      setIsDirty(prev => prev || isChanged);
      
      return newSettings;
    });
  }, [originalSettings, validateOnChange, validateSetting]);

  // Save settings to Electron
  const saveSettings = useCallback(async (): Promise<boolean> => {
    if (Object.keys(validationErrors).length > 0) {
      setSaveError('Please fix validation errors before saving');
      return false;
    }
    
    // Rate limiting
    const now = Date.now();
    if (now - lastSaveRef.current < 1000) {
      logger.warn('Save rate limited');
      return false;
    }
    
    try {
      setIsSaving(true);
      setSaveError(null);
      
      const response = await window.knoux.saveSettings(settings);
      
      if (response.success) {
        setOriginalSettings({ ...settings });
        setIsDirty(false);
        lastSaveRef.current = now;
        
        logger.info('Settings saved successfully');
        return true;
      } else {
        throw new Error(response.error || 'Save failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Save failed';
      logger.error('Failed to save settings:', error);
      setSaveError(message);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [settings, validationErrors]);

  // Reset settings to last saved
  const resetSettings = useCallback(async (): Promise<boolean> => {
    try {
      const response = await window.knoux.resetSettings();
      
      if (response.success) {
        await loadSettings();
        logger.info('Settings reset to saved values');
        return true;
      } else {
        throw new Error(response.error || 'Reset failed');
      }
    } catch (error) {
      logger.error('Failed to reset settings:', error);
      return false;
    }
  }, [loadSettings]);

  // Reset to default settings
  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultSettings();
    setSettings(defaults);
    setValidationErrors({});
    setIsDirty(true);
    logger.info('Settings reset to defaults');
  }, [getDefaultSettings]);

  // Discard unsaved changes
  const discardChanges = useCallback(() => {
    setSettings({ ...originalSettings });
    setValidationErrors({});
    setIsDirty(false);
    logger.info('Changes discarded');
  }, [originalSettings]);

  // Get settings by category
  const getCategorySettings = useCallback((category: string): Partial<UserPreferences> => {
    const categories: Record<string, (keyof UserPreferences)[]> = {
      general: ['language', 'theme', 'fontSize', 'animations', 'tooltips', 'notifications'],
      clipboard: ['autoStart', 'pollInterval', 'maxHistoryItems', 'captureImages', 'captureHtml', 
                 'captureRtf', 'autoClearSensitive', 'autoClearMinutes'],
      ai: ['aiEnabled', 'defaultModel', 'autoEnhance', 'autoSummarize', 'autoClassify', 
           'confidenceThreshold', 'useCloudModels'],
      security: ['encryptSensitive', 'requirePassword', 'autoLockMinutes', 
                'clearClipboardOnExit', 'anonymizeData'],
      performance: ['cacheEnabled', 'cacheSizeMB', 'workerCount', 'compressionLevel'],
      ui: ['showLineNumbers', 'wordWrap', 'tabSize', 'fontFamily', 'sidebarPosition', 'defaultView']
    };
    
    const categoryKeys = categories[category] || [];
    const result: Partial<UserPreferences> = {};
    
    categoryKeys.forEach(key => {
      result[key] = settings[key];
    });
    
    return result;
  }, [settings]);

  // Update settings by category
  const updateCategorySettings = useCallback((category: string, updates: Partial<UserPreferences>) => {
    updateSettings(updates);
  }, [updateSettings]);

  // Reset specific section
  const resetSection = useCallback((section: keyof UserPreferences) => {
    const defaults = getDefaultSettings();
    updateSetting(section, defaults[section]);
  }, [getDefaultSettings, updateSetting]);

  // Get setting description
  const getSettingDescription = useCallback((key: keyof UserPreferences): string => {
    const descriptions: Record<keyof UserPreferences, string> = {
      language: 'Application interface language',
      theme: 'Color theme (dark/light)',
      fontSize: 'Base font size in pixels',
      animations: 'Enable/disable UI animations',
      tooltips: 'Show tooltips on hover',
      notifications: 'Show desktop notifications',
      autoStart: 'Start application with system login',
      pollInterval: 'How often to check clipboard (ms)',
      maxHistoryItems: 'Maximum number of items to keep',
      captureImages: 'Capture images from clipboard',
      captureHtml: 'Capture HTML formatted content',
      captureRtf: 'Capture RTF formatted content',
      autoClearSensitive: 'Automatically clear sensitive data',
      autoClearMinutes: 'Minutes before auto-clearing sensitive data',
      aiEnabled: 'Enable AI features',
      defaultModel: 'Default AI model to use',
      autoEnhance: 'Automatically enhance clipboard content',
      autoSummarize: 'Automatically summarize long text',
      autoClassify: 'Automatically classify content type',
      confidenceThreshold: 'Minimum confidence for AI operations',
      useCloudModels: 'Use cloud-based AI models (requires internet)',
      encryptSensitive: 'Encrypt sensitive data at rest',
      requirePassword: 'Require password to access application',
      autoLockMinutes: 'Minutes of inactivity before auto-lock',
      clearClipboardOnExit: 'Clear clipboard when exiting',
      anonymizeData: 'Anonymize data for analytics',
      cacheEnabled: 'Enable caching for performance',
      cacheSizeMB: 'Maximum cache size in megabytes',
      workerCount: 'Number of background workers',
      compressionLevel: 'Compression level for stored data',
      showLineNumbers: 'Show line numbers in text views',
      wordWrap: 'Enable word wrapping',
      tabSize: 'Number of spaces per tab',
      fontFamily: 'Font family for text display',
      sidebarPosition: 'Sidebar position (left/right)',
      defaultView: 'Default view when opening application'
    };
    
    return descriptions[key] || 'No description available';
  }, []);

  // Export settings
  const exportSettings = useCallback((format: 'json' | 'yaml'): string => {
    const exportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      settings,
      metadata: {
        application: 'Knoux Clipboard AI',
        exportFormat: format
      }
    };
    
    if (format === 'json') {
      return JSON.stringify(exportData, null, 2);
    } else {
      // Simple YAML conversion
      return `version: 1.0
exportedAt: ${exportData.exportedAt}
settings:
${Object.entries(settings).map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`).join('\n')}
metadata:
  application: Knoux Clipboard AI
  exportFormat: ${format}`;
    }
  }, [settings]);

  // Import settings
  const importSettings = useCallback(async (data: string, format: 'json' | 'yaml'): Promise<boolean> => {
    try {
      let imported: any;
      
      if (format === 'json') {
        imported = JSON.parse(data);
      } else {
        // Simple YAML parsing (for demo)
        const lines = data.split('\n');
        imported = {};
        lines.forEach(line => {
          if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) {
              imported[key] = JSON.parse(value);
            }
          }
        });
      }
      
      if (imported.settings) {
        updateSettings(imported.settings);
        logger.info('Settings imported successfully');
        return true;
      } else {
        throw new Error('Invalid settings format');
      }
    } catch (error) {
      logger.error('Failed to import settings:', error);
      return false;
    }
  }, [updateSettings]);

  return {
    // State
    settings,
    originalSettings,
    isLoading,
    isSaving,
    isDirty,
    validationErrors,
    saveError,
    
    // Actions
    updateSetting,
    updateSettings,
    saveSettings,
    resetSettings,
    resetToDefaults,
    discardChanges,
    
    // Categories
    getCategorySettings,
    updateCategorySettings,
    
    // Validation
    validateSetting,
    validateAll,
    
    // Import/Export
    exportSettings,
    importSettings,
    
    // Utilities
    resetSection,
    getSettingDescription,
  };
};

export default useSettings;
