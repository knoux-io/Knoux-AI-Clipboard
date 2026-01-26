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
