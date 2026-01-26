// preload.js - Optional secure preload script for Electron
// This file runs in a sandboxed context with access to both Node.js and DOM

const { contextBridge, ipcRenderer } = require('electron');
const { shell } = require('electron');

// Optional: Expose safe APIs to renderer if needed
// contextBridge.exposeInMainWorld('knoux', {
//   invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
//   send: (channel, ...args) => ipcRenderer.send(channel, ...args),
//   on: (channel, listener) => ipcRenderer.on(channel, listener)
// });

// Expose the API shape expected by app/renderer hooks (window.electron.*)
contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
        sendSync: (channel, ...args) => ipcRenderer.sendSync(channel, ...args),
        on: (channel, callback) => {
            ipcRenderer.on(channel, (event, ...ipcArgs) => callback(...ipcArgs));
        },
        removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
    },
    shell: {
        openExternal: (url) => shell.openExternal(url)
    }
});

console.log('✓ Preload script loaded');
