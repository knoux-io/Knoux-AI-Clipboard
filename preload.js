const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) => {
      const validChannels = [
        'settings-changed',
        'language-changed', 
        'theme-changed',
        'clipboard-updated',
        'ai-response'
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once: (channel, func) => {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
    removeListener: (channel, func) => {
      ipcRenderer.removeListener(channel, func);
    },
  },
});

// Also expose a simpler API for common operations
contextBridge.exposeInMainWorld('electronAPI', {
  // Settings
  getSettings: () => ipcRenderer.invoke('settings:get-all'),
  updateSettings: (settings) => ipcRenderer.invoke('settings:update', settings),
  
  // Language
  getLanguage: () => ipcRenderer.invoke('language:get'),
  setLanguage: (lang) => ipcRenderer.invoke('language:set', lang),
  
  // Theme
  getTheme: () => ipcRenderer.invoke('theme:get'),
  setTheme: (theme) => ipcRenderer.invoke('theme:set-mode', theme),
  
  // Clipboard
  getClipboardItems: (limit, offset) => ipcRenderer.invoke('clipboard:get-items', limit, offset),
  searchClipboard: (query) => ipcRenderer.invoke('clipboard:search', query),
  
  // System
  getSystemInfo: () => ipcRenderer.invoke('system:get-platform-info'),
});

// Expose unified knoux API for modern components
contextBridge.exposeInMainWorld('knoux', {
  // Services Management
  services: {
    list: async () => ipcRenderer.invoke('knoux.services.list'),
    status: async () => ipcRenderer.invoke('knoux.services.status'),
    get: async (name) => ipcRenderer.invoke('knoux.services.get', name),
  },
  
  // Clipboard Operations
  clipboard: {
    read: async () => ipcRenderer.invoke('knoux.clipboard.read'),
    write: async (item) => ipcRenderer.invoke('knoux.clipboard.write', item),
    history: async () => ipcRenderer.invoke('knoux.clipboard.history'),
    normalize: async (content) => ipcRenderer.invoke('knoux.clipboard.normalize', content),
    format: async (content, format) => ipcRenderer.invoke('knoux.clipboard.format', { content, format }),
  },
  
  // AI Operations
  ai: {
    chat: async (request) => ipcRenderer.invoke('knoux.ai.chat', request),
    process: async (request) => ipcRenderer.invoke('knoux.ai.process', request),
    summarize: async (text) => ipcRenderer.invoke('knoux.ai.summarize', text),
    enhance: async (text, options) => ipcRenderer.invoke('knoux.ai.enhance', text, options),
    predict: async (context) => ipcRenderer.invoke('knoux.ai.predict', context),
  },
  
  // Creative Engine
  creative: {
    generate: async (request) => ipcRenderer.invoke('knoux.creative.generate', request),
  },
  
  // Universal Translator
  translator: {
    translate: async (request) => ipcRenderer.invoke('knoux.translator.translate', request),
  },
  
  // Pattern Recognition
  patterns: {
    analyze: async (data) => ipcRenderer.invoke('knoux.patterns.analyze', data),
  },
  
  // Security Operations
  security: {
    encrypt: async (data) => ipcRenderer.invoke('knoux.security.encrypt', data),
    decrypt: async (data) => ipcRenderer.invoke('knoux.security.decrypt', data),
  },
  
  // Storage Operations
  storage: {
    get: async (key) => ipcRenderer.invoke('knoux.storage.get', key),
    set: async (key, value) => ipcRenderer.invoke('knoux.storage.set', key, value),
    delete: async (key) => ipcRenderer.invoke('knoux.storage.delete', key),
    clear: async () => ipcRenderer.invoke('knoux.storage.clear'),
    export: async () => ipcRenderer.invoke('knoux.storage.export'),
    import: async (data) => ipcRenderer.invoke('knoux.storage.import', data),
    stats: async () => ipcRenderer.invoke('knoux.storage.stats'),
  },
  
  // Settings Management
  settings: {
    getAll: async () => ipcRenderer.invoke('knoux.settings.get-all'),
    update: async (settings) => ipcRenderer.invoke('knoux.settings.update', settings),
  },
  
  // Language Management
  language: {
    get: async () => ipcRenderer.invoke('knoux.language.get'),
    set: async (language) => ipcRenderer.invoke('knoux.language.set', language),
  },
  
  // Theme Management
  theme: {
    get: async () => ipcRenderer.invoke('knoux.theme.get'),
    set: async (theme) => ipcRenderer.invoke('knoux.theme.set', theme),
  },
  
  // System Information
  system: {
    info: async () => ipcRenderer.invoke('knoux.system.info'),
    getVersion: async () => ipcRenderer.invoke('system:get-version'),
  }
});
