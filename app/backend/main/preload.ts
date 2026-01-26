import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (channel: string, ...args: any[]) =>
      ipcRenderer.invoke(channel, ...args),
    on: (channel: string, listener: (...args: any[]) => void) => {
      const subscription = (_event: any, ...args: any[]) => listener(...args);
      ipcRenderer.on(channel, subscription);
      return () => ipcRenderer.removeListener(channel, subscription);
    },
    off: (channel: string, listener: (...args: any[]) => void) =>
      ipcRenderer.removeListener(channel, listener),
    send: (channel: string, ...args: any[]) =>
      ipcRenderer.send(channel, ...args),
  },
  shell: {
    openExternal: (url: string) => ipcRenderer.invoke("open-external", url),
  },
});

contextBridge.exposeInMainWorld("knoux", {
  analyzeContent: (content: string, options?: any) =>
    ipcRenderer.invoke("analyze-content", content, options),
  classifyContent: (content: string) =>
    ipcRenderer.invoke("classify-content", content),
  enhanceContent: (content: string, options?: any) =>
    ipcRenderer.invoke("enhance-content", content, options),
  getSuggestions: (content: string, options?: any) =>
    ipcRenderer.invoke("get-suggestions", content, options),
  getSystemInfo: () => ipcRenderer.invoke("get-system-info"),
  getAIStatus: () => ipcRenderer.invoke("get-ai-status"),
});
