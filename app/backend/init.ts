import { ClipboardWatcher } from './clipboard/watcher';
import { HistoryStore } from './clipboard/history-store';
import { AIEngine } from './ai/ai-engine';
import { SecurityManager } from './security/security-manager';
import { logger } from '../shared/logger';
import { databaseService } from './services/databaseService';
import { settingsService } from './services/settingsService';
import { languageService } from './services/languageService';
import { themeService } from './services/themeService';

let clipboardWatcher: ClipboardWatcher | null = null;
let historyStore: HistoryStore | null = null;
let aiEngine: AIEngine | null = null;
let securityManager: SecurityManager | null = null;

export async function initBackendServices(): Promise<void> {
  try {
    logger.info('🔧 Initializing backend services...');

    // Initialize Database first
    logger.info('📊 Database service ready');

    // Initialize Settings Service
    logger.info('⚙️ Settings service ready');
    
    // Initialize Language Service
    logger.info('🌐 Language service ready');
    
    // Initialize Theme Service
    logger.info('🎨 Theme service ready');

    // Initialize Storage
    historyStore = new HistoryStore();
    await historyStore.initialize();
    logger.info('✅ History Store initialized');

    // Initialize Security
    securityManager = new SecurityManager();
    await securityManager.initialize();
    logger.info('✅ Security Manager initialized');

    // Initialize AI Engine
    aiEngine = new AIEngine();
    await aiEngine.initialize();
    logger.info('✅ AI Engine initialized');

    // Initialize Clipboard Watcher
    clipboardWatcher = new ClipboardWatcher();
    await clipboardWatcher.initialize();
    logger.info('✅ Clipboard Watcher initialized');

    // Apply system settings
    settingsService.applySystemSettings();
    logger.info('✅ System settings applied');

    logger.info('✅ All backend services initialized successfully');
  } catch (error) {
    logger.error('❌ Backend initialization failed:', error);
    throw error;
  }
}

export function getClipboardWatcher(): ClipboardWatcher {
  if (!clipboardWatcher) throw new Error('ClipboardWatcher not initialized');
  return clipboardWatcher;
}

export function getHistoryStore(): HistoryStore {
  if (!historyStore) throw new Error('HistoryStore not initialized');
  return historyStore;
}

export function getAIEngine(): AIEngine {
  if (!aiEngine) throw new Error('AIEngine not initialized');
  return aiEngine;
}

export function getSecurityManager(): SecurityManager {
  if (!securityManager) throw new Error('SecurityManager not initialized');
  return securityManager;
}

export function getSettingsService() {
  return settingsService;
}

export function getLanguageService() {
  return languageService;
}

export function getThemeService() {
  return themeService;
}

export function getDatabaseService() {
  return databaseService;
}

export function cleanupServices(): void {
  logger.info('🧹 Cleaning up backend services...');
  if (clipboardWatcher) {
    clipboardWatcher.stop();
  }
  logger.info('✅ Cleanup completed');
}
