const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev =
  process.env.NODE_ENV === "development" || process.argv.includes("--dev");

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    show: false,
    icon: path.join(__dirname, "assets", "icons", "icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Register minimal IPC handler
  ipcMain.handle("get-system-info", async () => {
    return {
      success: true,
      data: {
        platform: process.platform,
        arch: process.arch,
        version: app.getVersion(),
        electronVersion: process.versions.electron,
      },
    };
  });

  // Register priority IPC handlers
  const { registerClipboardIPC } = require("./app/backend/ipc/clipboard-ipc");
  const { registerAIIPC } = require("./app/backend/ipc/ai-ipc");
  const { registerStorageIPC } = require("./app/backend/ipc/storage-ipc");

  // Register mock handlers as fallback (for compatibility)
  registerClipboardIPC();
  registerAIIPC();
  registerStorageIPC();

  // Initialize backend services and IPC handlers
  try {
    if (isDev) {
      // Development: Load from TypeScript source
      require("ts-node").register({
        transpileOnly: true,
        compilerOptions: { module: "commonjs" },
      });

      // Initialize backend services first
      const { initBackendServices } = require("./app/backend/init.ts");
      await initBackendServices();
      console.log("✅ Backend services initialized");

      // Then initialize enhanced IPC handlers
      const {
        initializeEnhancedHandlers,
      } = require("./app/backend/ipc/enhanced-handlers.ts");
      initializeEnhancedHandlers();
      console.log("✅ Enhanced IPC handlers initialized (dev mode)");

      // Initialize real handlers for knoux API
      const {
        initializeRealServices,
        registerAllRealHandlers,
      } = require("./app/backend/ipc/real-handlers.ts");
      await initializeRealServices();
      registerAllRealHandlers();
      console.log("✅ Real IPC handlers initialized (dev mode)");
    } else {
      // Production: Load from compiled build
      const initPath = path.join(
        __dirname,
        "build",
        "app",
        "backend",
        "init.js",
      );
      const handlersPath = path.join(
        __dirname,
        "build",
        "app",
        "backend",
        "ipc",
        "enhanced-handlers.js",
      );
      const realHandlersPath = path.join(
        __dirname,
        "build",
        "app",
        "backend",
        "ipc",
        "real-handlers.js",
      );

      if (fs.existsSync(initPath) && fs.existsSync(handlersPath)) {
        const { initBackendServices } = require(initPath);
        await initBackendServices();

        const { initializeEnhancedHandlers } = require(handlersPath);
        initializeEnhancedHandlers();
        console.log("✅ Enhanced handlers initialized (production)");

        if (fs.existsSync(realHandlersPath)) {
          const { initializeRealServices, registerAllRealHandlers } = require(
            realHandlersPath,
          );
          await initializeRealServices();
          registerAllRealHandlers();
          console.log("✅ Real handlers initialized (production)");
        }
      } else {
        console.warn("⚠️ Compiled backend files not found");
      }
    }
  } catch (error) {
    console.error("❌ Failed to initialize backend:", error);
  }

  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "dist", "index.html")}`;

  mainWindow.loadURL(startUrl).catch((err) => {
    console.error("Failed to load URL:", err);
    mainWindow.loadFile(path.join(__dirname, "public", "dev-unavailable.html"));
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow().catch(console.error);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
