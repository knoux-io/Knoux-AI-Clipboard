// main.js - Electron Main Process for Knoux Clipboard AI
// Stable and secure configuration for Electron 25.x

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development';

// Fix ffmpeg.dll loading path
const appPath = app.getAppPath();
const ffmpegPaths = [
  path.join(appPath, 'ffmpeg.dll'),
  path.join(appPath, '..', 'ffmpeg.dll'),
  path.join(__dirname, 'ffmpeg.dll'),
  path.join(__dirname, 'dist', 'ffmpeg.dll'),
];

// Load ffmpeg.dll from available location
for (const ffmpegPath of ffmpegPaths) {
  if (fs.existsSync(ffmpegPath)) {
    process.env.FFMPEG_PATH = ffmpegPath;
    console.log('✅ FFmpeg DLL found at:', ffmpegPath);
    break;
  }
}

let mainWindow;

// Create application window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    icon: path.join(__dirname, 'public', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      sandbox: true
    }
  });

  // Load the app
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'dist', 'index.html')}`;

  mainWindow.loadURL(startUrl).catch(err => {
    console.error('Failed to load URL:', err);
    showErrorPage();
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Show error fallback page
function showErrorPage() {
  if (!mainWindow) return;

  const errorHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Knoux - Error</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          background: #0f0f23;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 100px auto;
          text-align: center;
        }
        h1 { color: #8a2be2; margin-bottom: 20px; }
        p { line-height: 1.6; margin: 10px 0; }
        code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>⚠️ Application Error</h1>
        <p>Failed to load the application.</p>
        <p>Please ensure:</p>
        <ul style="text-align: left; display: inline-block;">
          <li>dist/index.html exists</li>
          <li>All dependencies are installed</li>
          <li>Build completed successfully</li>
        </ul>
        <p style="margin-top: 30px; font-size: 12px; opacity: 0.7;">
          Knoux Clipboard AI v1.0.0
        </p>
      </div>
    </body>
    </html>
  `;

  mainWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(errorHTML)}`);
}

// App Events
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
