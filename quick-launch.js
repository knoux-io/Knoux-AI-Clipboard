// quick-launch.js - تشغيل سريع لـ Knoux
const { exec } = require('child_process');
const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('🚀 Knoux Quick Launcher');

// بدء React إذا لم يكن يعمل
exec('netstat -ano | findstr :3000', (error, stdout) => {
    if (!stdout) {
        console.log('🔄 بدء React development server...');
        exec('start cmd /k "npx react-scripts start"', { cwd: __dirname });
    } else {
        console.log('✅ React server is already running');
    }
    
    // انتظر قليلاً ثم شغل Electron
    setTimeout(createWindow, 3000);
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'public/favicon.ico'),
        webPreferences: {
            nodeIntegration: true
        }
    });
    
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    
    console.log('🎯 Knoux Clipboard AI is running!');
}

app.whenReady().then(createWindow);
