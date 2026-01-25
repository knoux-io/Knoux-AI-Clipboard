// electron-corrected.js - الإصدار المصحح
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    console.log('🚀 إنشاء نافذة Knoux Clipboard AI...');
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'public', 'favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false,
        backgroundColor: '#0f0f23'
    });

    // React يعمل على المنفذ 3001
    const devURL = 'http://localhost:3001';
    console.log(`🌐 محاولة الاتصال بـ: ${devURL}`);
    
    mainWindow.loadURL(devURL);

    mainWindow.once('ready-to-show', () => {
        console.log('✅ النافذة جاهزة للعرض');
        mainWindow.show();
        mainWindow.webContents.openDevTools(); // افتح DevTools تلقائياً
    });

    mainWindow.on('closed', () => {
        console.log('❌ النافذة أغلقت');
        mainWindow = null;
    });

    // التعامل مع الروابط الخارجية
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        console.log(`🔗 رابط خارجي: ${url}`);
        if (url.startsWith('http')) {
            require('electron').shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });
}

// دورة حياة التطبيق
app.whenReady().then(() => {
    console.log('🎯 Electron جاهز للتشغيل');
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    console.log('👋 جميع النوافذ أغلقت');
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// منع نسخ متعددة
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    console.log('⚠️ نسخة أخرى تعمل بالفعل');
    app.quit();
}
