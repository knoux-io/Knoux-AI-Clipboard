/**
 * Enhanced IPC Handlers - Knoux Clipboard AI
 * Connected to real services with database persistence
 */

import { ipcMain, IpcMainInvokeEvent } from 'electron';
import { settingsService } from '../services/settingsService';
import { languageService } from '../services/languageService';
import { themeService } from '../services/themeService';
import { databaseService } from '../services/databaseService';

let clipboardMonitoringEnabled = true;

// Settings IPC Handlers
export function registerSettingsHandlers() {
  ipcMain.handle('settings:get-all', async () => {
    try {
      const settings = settingsService.getAllSettings();
      return { success: true, data: settings };
    } catch (error) {
      console.error('❌ Error getting settings:', error);
      return { success: false, error: 'Failed to load settings' };
    }
  });

  ipcMain.handle('settings:get', async (event, key: string) => {
    try {
      const value = settingsService.getSetting(key as any);
      return { success: true, data: value };
    } catch (error) {
      console.error('❌ Error getting setting:', error);
      return { success: false, error: 'Failed to load setting' };
    }
  });

  ipcMain.handle('settings:update', async (event, updates) => {
    try {
      settingsService.updateSettings(updates);
      return { success: true, data: settingsService.getAllSettings() };
    } catch (error) {
      console.error('❌ Error updating settings:', error);
      return { success: false, error: 'Failed to update settings' };
    }
  });

  ipcMain.handle('settings:set', async (event, key: string, value: any) => {
    try {
      settingsService.setSetting(key as any, value);
      return { success: true, data: settingsService.getAllSettings() };
    } catch (error) {
      console.error('❌ Error setting setting:', error);
      return { success: false, error: 'Failed to save setting' };
    }
  });

  ipcMain.handle('settings:reset', async () => {
    try {
      settingsService.resetSettings();
      return { success: true, data: settingsService.getAllSettings() };
    } catch (error) {
      console.error('❌ Error resetting settings:', error);
      return { success: false, error: 'Failed to reset settings' };
    }
  });

  ipcMain.handle('settings:export', async () => {
    try {
      const exportData = settingsService.exportSettings();
      return { success: true, data: exportData };
    } catch (error) {
      console.error('❌ Error exporting settings:', error);
      return { success: false, error: 'Failed to export settings' };
    }
  });

  ipcMain.handle('settings:import', async (event, settingsJson: string) => {
    try {
      const success = settingsService.importSettings(settingsJson);
      return { success, data: success };
    } catch (error) {
      console.error('❌ Error importing settings:', error);
      return { success: false, error: 'Failed to import settings' };
    }
  });
}

// Language IPC Handlers
export function registerLanguageHandlers() {
  ipcMain.handle('language:get', async () => {
    try {
      const language = languageService.getCurrentLanguage();
      return { success: true, data: language };
    } catch (error) {
      console.error('❌ Error getting language:', error);
      return { success: false, error: 'Failed to get language' };
    }
  });

  ipcMain.handle('language:set', async (event, language: 'en' | 'ar') => {
    try {
      languageService.setLanguage(language);
      return { success: true, data: language };
    } catch (error) {
      console.error('❌ Error setting language:', error);
      return { success: false, error: 'Failed to set language' };
    }
  });

  ipcMain.handle('language:translate', async (event, key: string) => {
    try {
      const translation = languageService.translate(key);
      return { success: true, data: translation };
    } catch (error) {
      console.error('❌ Error translating:', error);
      return { success: false, data: key };
    }
  });

  ipcMain.on('language:translate', (event, key: string) => {
    try {
      event.returnValue = languageService.translate(key);
    } catch (error) {
      console.error('❌ Error translating (sync):', error);
      event.returnValue = key;
    }
  });

  ipcMain.handle('language:is-rtl', async () => {
    try {
      const isRTL = languageService.isRTL();
      return { success: true, data: isRTL };
    } catch (error) {
      console.error('❌ Error checking RTL:', error);
      return { success: false, data: false };
    }
  });

  ipcMain.handle('language:get-all-translations', async (event, lang?: 'en' | 'ar') => {
    try {
      const translations = languageService.getAllTranslations(lang);
      return { success: true, data: translations };
    } catch (error) {
      console.error('❌ Error getting translations:', error);
      return { success: false, error: 'Failed to get translations' };
    }
  });

  ipcMain.on('language:get-all-translations', (event, lang?: 'en' | 'ar') => {
    try {
      event.returnValue = languageService.getAllTranslations(lang);
    } catch (error) {
      console.error('❌ Error getting translations (sync):', error);
      event.returnValue = {};
    }
  });
}

// Theme IPC Handlers
export function registerThemeHandlers() {
  ipcMain.handle('theme:get', async () => {
    try {
      const theme = themeService.getTheme();
      return { success: true, data: theme };
    } catch (error) {
      console.error('❌ Error getting theme:', error);
      return { success: false, error: 'Failed to get theme' };
    }
  });

  ipcMain.handle('theme:set-mode', async (event, mode: 'light' | 'dark') => {
    try {
      themeService.setTheme(mode);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error setting theme mode:', error);
      return { success: false, error: 'Failed to set theme mode' };
    }
  });

  ipcMain.handle('theme:toggle', async () => {
    try {
      themeService.toggleTheme();
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error toggling theme:', error);
      return { success: false, error: 'Failed to toggle theme' };
    }
  });

  ipcMain.handle('theme:set-glass-intensity', async (event, intensity: 'normal' | 'high' | 'ultra') => {
    try {
      themeService.setGlassIntensity(intensity);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error setting glass intensity:', error);
      return { success: false, error: 'Failed to set glass intensity' };
    }
  });

  ipcMain.handle('theme:set-accent-color', async (event, color: string) => {
    try {
      themeService.setAccentColor(color);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error setting accent color:', error);
      return { success: false, error: 'Failed to set accent color' };
    }
  });

  ipcMain.handle('theme:set-animations', async (event, enabled: boolean) => {
    try {
      themeService.setAnimations(enabled);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error setting animations:', error);
      return { success: false, error: 'Failed to set animations' };
    }
  });

  ipcMain.handle('theme:set-transparency', async (event, value: number) => {
    try {
      themeService.setTransparency(value);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error setting transparency:', error);
      return { success: false, error: 'Failed to set transparency' };
    }
  });

  ipcMain.handle('theme:get-css', async () => {
    try {
      const css = themeService.getGlassmorphicCSS();
      return { success: true, data: css };
    } catch (error) {
      console.error('❌ Error getting theme CSS:', error);
      return { success: false, error: 'Failed to get theme CSS' };
    }
  });

  ipcMain.on('theme:get-css', (event) => {
    try {
      event.returnValue = themeService.getGlassmorphicCSS();
    } catch (error) {
      console.error('❌ Error getting theme CSS (sync):', error);
      event.returnValue = '';
    }
  });

  ipcMain.handle('theme:apply-preset', async (event, preset: 'glass-dark' | 'glass-light' | 'minimal' | 'cyberpunk') => {
    try {
      themeService.applyPreset(preset);
      return { success: true, data: themeService.getTheme() };
    } catch (error) {
      console.error('❌ Error applying preset:', error);
      return { success: false, error: 'Failed to apply preset' };
    }
  });
}

// Clipboard Monitor IPC Handlers
export function registerClipboardMonitorHandlers() {
  ipcMain.handle('clipboard-monitor:status', async () => {
    return {
      success: true,
      data: {
        enabled: clipboardMonitoringEnabled,
      },
    };
  });

  ipcMain.handle('clipboard-monitor:start', async () => {
    clipboardMonitoringEnabled = true;
    return { success: true, data: true };
  });

  ipcMain.handle('clipboard-monitor:stop', async () => {
    clipboardMonitoringEnabled = false;
    return { success: true, data: true };
  });
}

// Database IPC Handlers
export function registerDatabaseHandlers() {
  // Clipboard Items
  ipcMain.handle('clipboard:save-item', async (event, item) => {
    try {
      const id = await databaseService.saveClipboardItem(item);
      return { success: true, data: id };
    } catch (error) {
      console.error('❌ Error saving clipboard item:', error);
      return { success: false, error: 'Failed to save clipboard item' };
    }
  });

  ipcMain.handle('clipboard:add', async (event, item) => {
    try {
      const id = await databaseService.saveClipboardItem(item);
      return { success: true, data: id };
    } catch (error) {
      console.error('❌ Error adding clipboard item:', error);
      return { success: false, error: 'Failed to add clipboard item' };
    }
  });

  ipcMain.handle('clipboard:get-items', async (event, limit = 100, offset = 0) => {
    try {
      const items = await databaseService.getClipboardItems(limit, offset);
      return { success: true, data: items };
    } catch (error) {
      console.error('❌ Error getting clipboard items:', error);
      return { success: false, error: 'Failed to get clipboard items' };
    }
  });

  ipcMain.handle('clipboard:get-recent', async (event, limit = 100) => {
    try {
      const items = await databaseService.getClipboardItems(limit, 0);
      return { success: true, data: items };
    } catch (error) {
      console.error('❌ Error getting recent clipboard items:', error);
      return { success: false, error: 'Failed to get recent clipboard items' };
    }
  });

  ipcMain.handle('clipboard:search-items', async (event, query: string, limit = 50) => {
    try {
      const items = await databaseService.searchClipboardItems(query, limit);
      return { success: true, data: items };
    } catch (error) {
      console.error('❌ Error searching clipboard items:', error);
      return { success: false, error: 'Failed to search clipboard items' };
    }
  });

  ipcMain.handle('clipboard:search', async (event, query: string, limit = 50) => {
    try {
      const items = await databaseService.searchClipboardItems(query, limit);
      return { success: true, data: items };
    } catch (error) {
      console.error('❌ Error searching clipboard items:', error);
      return { success: false, error: 'Failed to search clipboard items' };
    }
  });

  ipcMain.handle('clipboard:get-favorites', async () => {
    try {
      const items = await databaseService.getFavoriteClipboardItems();
      return { success: true, data: items };
    } catch (error) {
      console.error('❌ Error getting favorite items:', error);
      return { success: false, error: 'Failed to get favorite items' };
    }
  });

  ipcMain.handle('clipboard:toggle-favorite', async (event, id: number) => {
    try {
      const changed = await databaseService.toggleFavorite(id);
      if (!changed) {
        return { success: false, error: 'Failed to toggle favorite' };
      }
      const item = await databaseService.getClipboardItemById(id);
      return { success: true, data: Boolean(item?.isFavorite) };
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      return { success: false, error: 'Failed to toggle favorite' };
    }
  });

  ipcMain.handle('clipboard:toggle-favorite-status', async (event, id: number) => {
    try {
      const changed = await databaseService.toggleFavorite(id);
      if (!changed) {
        return { success: false, error: 'Failed to toggle favorite' };
      }
      const item = await databaseService.getClipboardItemById(id);
      return { success: true, data: Boolean(item?.isFavorite) };
    } catch (error) {
      console.error('❌ Error toggling favorite:', error);
      return { success: false, error: 'Failed to toggle favorite' };
    }
  });

  ipcMain.handle('clipboard:delete-item', async (event, id: number) => {
    try {
      const success = await databaseService.deleteClipboardItem(id);
      return { success: true, data: success };
    } catch (error) {
      console.error('❌ Error deleting clipboard item:', error);
      return { success: false, error: 'Failed to delete clipboard item' };
    }
  });

  ipcMain.handle('clipboard:delete', async (event, id: number) => {
    try {
      const success = await databaseService.deleteClipboardItem(id);
      return { success: true, data: success };
    } catch (error) {
      console.error('❌ Error deleting clipboard item:', error);
      return { success: false, error: 'Failed to delete clipboard item' };
    }
  });

  ipcMain.handle('clipboard:clear-all', async () => {
    try {
      await databaseService.clearClipboardHistory();
      return { success: true };
    } catch (error) {
      console.error('❌ Error clearing clipboard history:', error);
      return { success: false, error: 'Failed to clear clipboard history' };
    }
  });

  // Chat History
  ipcMain.handle('ai:save-message', async (event, message) => {
    try {
      const id = await databaseService.saveChatMessage(message);
      return { success: true, data: id };
    } catch (error) {
      console.error('❌ Error saving chat message:', error);
      return { success: false, error: 'Failed to save chat message' };
    }
  });

  ipcMain.handle('ai:get-chat-history', async (event, limit = 100, sessionId?: string) => {
    try {
      const messages = await databaseService.getChatHistory(limit, sessionId);
      return { success: true, data: messages };
    } catch (error) {
      console.error('❌ Error getting chat history:', error);
      return { success: false, error: 'Failed to get chat history' };
    }
  });

  ipcMain.handle('ai:clear-chat-history', async () => {
    try {
      await databaseService.clearChatHistory();
      return { success: true };
    } catch (error) {
      console.error('❌ Error clearing chat history:', error);
      return { success: false, error: 'Failed to clear chat history' };
    }
  });

  // VIP Status
  ipcMain.handle('vip:get-status', async () => {
    try {
      const status = await databaseService.getVIPStatus();
      return { success: true, data: status };
    } catch (error) {
      console.error('❌ Error getting VIP status:', error);
      return { success: false, error: 'Failed to get VIP status' };
    }
  });

  ipcMain.handle('vip:set-status', async (event, isVIP: boolean, expiryDate?: number) => {
    try {
      await databaseService.setVIPStatus(isVIP, expiryDate);
      return { success: true };
    } catch (error) {
      console.error('❌ Error setting VIP status:', error);
      return { success: false, error: 'Failed to set VIP status' };
    }
  });

  // Statistics
  ipcMain.handle('system:get-statistics', async () => {
    try {
      const stats = await databaseService.getStatistics();
      return { success: true, data: stats };
    } catch (error) {
      console.error('❌ Error getting statistics:', error);
      return { success: false, error: 'Failed to get statistics' };
    }
  });

  ipcMain.handle('clipboard:get-stats', async () => {
    try {
      const raw = await databaseService.getStatistics();
      const total = Number(raw?.total_clipboard_items ?? 0);
      const favorites = Number(raw?.favorite_items ?? 0);
      const byType = {
        text: Number(raw?.text_items ?? 0),
        image: Number(raw?.image_items ?? 0),
        file: Number(raw?.file_items ?? 0),
      };
      return { success: true, data: { total, favorites, byType } };
    } catch (error) {
      console.error('❌ Error getting clipboard stats:', error);
      return { success: false, error: 'Failed to get clipboard stats' };
    }
  });

  // Settings Storage
  ipcMain.handle('storage:get-setting', async (event, key: string) => {
    try {
      const value = await databaseService.getSetting(key);
      return { success: true, data: value };
    } catch (error) {
      console.error('❌ Error getting stored setting:', error);
      return { success: false, error: 'Failed to get stored setting' };
    }
  });

  ipcMain.handle('storage:set-setting', async (event, key: string, value: string) => {
    try {
      await databaseService.setSetting(key, value);
      return { success: true };
    } catch (error) {
      console.error('❌ Error setting stored setting:', error);
      return { success: false, error: 'Failed to set stored setting' };
    }
  });
}

// System IPC Handlers
export function registerSystemHandlers() {
  ipcMain.handle('system:get-memory-usage', async () => {
    try {
      const usage = process.memoryUsage();
      return {
        success: true,
        data: {
          heapUsed: usage.heapUsed / 1024 / 1024, // MB
          heapTotal: usage.heapTotal / 1024 / 1024, // MB
          external: usage.external / 1024 / 1024, // MB
          rss: usage.rss / 1024 / 1024 // MB
        }
      };
    } catch (error) {
      console.error('❌ Error getting memory usage:', error);
      return { success: false, error: 'Failed to get memory usage' };
    }
  });

  ipcMain.handle('system:get-platform-info', async () => {
    try {
      return {
        success: true,
        data: {
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version,
          electronVersion: process.versions.electron,
          chromeVersion: process.versions.chrome
        }
      };
    } catch (error) {
      console.error('❌ Error getting platform info:', error);
      return { success: false, error: 'Failed to get platform info' };
    }
  });
}

// Initialize all handlers
export function initializeEnhancedHandlers() {
  registerSettingsHandlers();
  registerLanguageHandlers();
  registerThemeHandlers();
  registerDatabaseHandlers();
  registerSystemHandlers();
  registerClipboardMonitorHandlers();

  console.log('✅ Enhanced IPC handlers initialized');
}
