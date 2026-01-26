// preload.js - Optional secure preload script for Electron
// This file runs in a sandboxed context with access to both Node.js and DOM

const { contextBridge, ipcRenderer } = require('electron');

// Optional: Expose safe APIs to renderer if needed
// contextBridge.exposeInMainWorld('knoux', {
//   invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
//   send: (channel, ...args) => ipcRenderer.send(channel, ...args),
//   on: (channel, listener) => ipcRenderer.on(channel, listener)
// });

console.log('✓ Preload script loaded');
