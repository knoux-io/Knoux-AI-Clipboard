// run-knoux.js - Simple Electron launcher for Knoux Clipboard AI
console.log('🚀 بدء تشغيل Knoux Clipboard AI...');

const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
    console.log('✅ Electron جاهز للتشغيل');
    
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'public', 'favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });
    
    // استخدام البورت الصحيح 3000
    win.loadURL('http://localhost:3000');
    
    win.once('ready-to-show', () => {
        win.show();
        win.webContents.openDevTools();
        console.log('🎯 التطبيق يعمل على: http://localhost:3000');
    });
    
    win.on('closed', () => {
        console.log('📴 نافذة التطبيق أُغلقت');
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

console.log('⚡ Electron script loaded successfully');
