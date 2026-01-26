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

    // Initialize Database first - CRITICAL
    try {
      await databaseService.initialize?.();
      logger.info('✅ Database service initialized');
    } catch (error) {
      logger.error('❌ Database initialization failed:', error);
      // Continue without database for now
    }

    // Initialize Settings Service
    try {
      await settingsService.initialize?.();
      logger.info('✅ Settings service initialized');
    } catch (error) {
      logger.warn('⚠️ Settings service failed, using defaults');
    }
    
    // Initialize Language Service
    try {
      await languageService.initialize?.();
      logger.info('✅ Language service initialized');
    } catch (error) {
      logger.warn('⚠️ Language service failed, using defaults');
    }
    
    // Initialize Theme Service
    try {
      await themeService.initialize?.();
      logger.info('✅ Theme service initialized');
    } catch (error) {
      logger.warn('⚠️ Theme service failed, using defaults');
    }

    // Initialize Storage
    try {
      historyStore = new HistoryStore();
      await historyStore.initialize();
      logger.info('✅ History Store initialized');
    } catch (error) {
      logger.error('❌ History Store failed:', error);
      // Create fallback in-memory store
      historyStore = null;
    }

    // Initialize Security
    try {
      securityManager = new SecurityManager();
      await securityManager.initialize();
      logger.info('✅ Security Manager initialized');
    } catch (error) {
      logger.error('❌ Security Manager failed:', error);
      securityManager = null;
    }

    // Initialize AI Engine
    try {
      aiEngine = new AIEngine();
      await aiEngine.initialize();
      logger.info('✅ AI Engine initialized');
    } catch (error) {
      logger.error('❌ AI Engine failed:', error);
      aiEngine = null;
    }

    // Initialize Clipboard Watcher
    try {
      clipboardWatcher = new ClipboardWatcher();
      await clipboardWatcher.initialize();
      logger.info('✅ Clipboard Watcher initialized');
    } catch (error) {
      logger.error('❌ Clipboard Watcher failed:', error);
      clipboardWatcher = null;
    }

    // Apply system settings
    try {
      await settingsService.applySystemSettings?.();
      logger.info('✅ System settings applied');
    } catch (error) {
      logger.warn('⚠️ System settings application failed');
    }

    logger.info('✅ Backend services initialization completed (with fallbacks)');
  } catch (error) {
    logger.error('❌ Critical backend initialization failed:', error);
    // Don't throw - allow app to continue with limited functionality
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
