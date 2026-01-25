// Global TypeScript declarations for Electron
interface Window {
  knoux: {
    // App lifecycle
    isAppReady: () => boolean;
    onAppReady: (callback: () => void) => void;
    quitApp: () => Promise<{ success: boolean }>;
    
    // Settings
    getSettings: () => Promise<{
      success: boolean;
      data?: any;
      error?: string;
    }>;
    saveSettings: (settings: any) => Promise<{
      success: boolean;
      error?: string;
    }>;
    
    // Clipboard
    getClipboardHistory: () => Promise<{
      success: boolean;
      data?: any[];
      error?: string;
    }>;
    copyToClipboard: (content: string) => Promise<{
      success: boolean;
      error?: string;
    }>;
    
    // AI operations
    processWithAI: (options: any) => Promise<{
      success: boolean;
      data?: any;
      error?: string;
    }>;
  };
}

// Add Node.js process types
declare namespace NodeJS {
  interface Process {
    versions: {
      electron: string;
      chrome: string;
      node: string;
    };
  }
}
