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
  clipboard: {
    read: async () => ipcRenderer.invoke('knoux.clipboard.read'),
    write: async (item) => ipcRenderer.invoke('knoux.clipboard.write', item),
    history: async () => ipcRenderer.invoke('knoux.clipboard.history'),
    normalize: async (content) => ipcRenderer.invoke('knoux.clipboard.normalize', content),
    format: async (content, format) => ipcRenderer.invoke('knoux.clipboard.format', { content, format }),
  },
  
  ai: {
    summarize: async (text) => ipcRenderer.invoke('knoux.ai.summarize', text),
    enhance: async (text, options) => ipcRenderer.invoke('knoux.ai.enhance', text, options),
    predict: async (context) => ipcRenderer.invoke('knoux.ai.predict', context),
  },
  
  storage: {
    get: async (key) => ipcRenderer.invoke('knoux.storage.get', key),
    set: async (key, value) => ipcRenderer.invoke('knoux.storage.set', key, value),
    export: async () => ipcRenderer.invoke('knoux.storage.export'),
  },
  
  system: {
    getInfo: async () => ipcRenderer.invoke('system:get-platform-info'),
    getVersion: async () => ipcRenderer.invoke('system:get-version'),
  }
});
