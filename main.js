// main.js - Electron main process for Knoux Clipboard AI
console.log('🎯 Knoux Clipboard AI - الإصدار الكامل');

const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const url = require('url');

// المتغيرات
let mainWindow = null;
let tray = null;
const isDev = process.env.NODE_ENV === 'development';

// إنشاء النافذة الرئيسية
function createWindow() {
    console.log('🪟 إنشاء نافذة التطبيق...');
    
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        icon: path.join(__dirname, 'public', 'favicon.ico'),
        backgroundColor: '#0f0f23',
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            webSecurity: false
        },
        frame: true,
        titleBarStyle: 'default'
    });
    
    // حمّل التطبيق
    const startUrl = isDev 
        ? 'http://localhost:3000'
        : url.format({
            pathname: path.join(__dirname, 'build', 'index.html'),
            protocol: 'file:',
            slashes: true
        });
    
    console.log('📡 جارٍ تحميل:', startUrl);
    mainWindow.loadURL(startUrl).catch(err => {
        console.error('❌ فشل التحميل:', err.message);
        showFallbackPage();
    });
    
    // الأحداث
    mainWindow.once('ready-to-show', () => {
        console.log('✅ النافذة جاهزة للعرض');
        mainWindow.show();
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
        updateTrayMenu();
    });
    
    mainWindow.on('closed', () => {
        console.log('📴 النافذة أغلقت');
        mainWindow = null;
    });
    
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('🎉 التطبيق تم تحميله بنجاح');
        // حقن معلومات Knoux
        injectKnouxInfo();
    });
}

// حقن معلومات Knoux في الصفحة
function injectKnouxInfo() {
    if (mainWindow) {
        mainWindow.webContents.executeJavaScript(`
            if (typeof window !== 'undefined') {
                window.knouxInfo = {
                    appName: 'Knoux Clipboard AI',
                    version: '1.0.0',
                    developer: 'Eng / Sadek Elgazar 👑',
                    contact: {
                        phone: '0503281920',
                        whatsapp: '+971503281920',
                        email: 'knouxguard@gmail.com'
                    },
                    social: {
                        facebook: 'https://www.facebook.com/share/1bXebP7S7D/',
                        pinterest: 'https://www.pinterest.com/knoux7',
                        tiktok: 'https://www.tiktok.com/@knoux_7',
                        snapchat: 'https://www.snapchat.com/add/knooux7'
                    }
                };
                console.log('📋 Knoux Info injected:', window.knouxInfo);
                
                // أضف زر "عن Knoux" إذا لم يكن موجوداً
                if (!document.getElementById('knoux-about-btn')) {
                    const btn = document.createElement('button');
                    btn.id = 'knoux-about-btn';
                    btn.innerHTML = 'عن Knoux 📋';
                    btn.style.cssText = \`
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        padding: 10px 20px;
                        background: linear-gradient(45deg, #8a2be2, #4a00e0);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        z-index: 1000;
                        font-weight: bold;
                    \`;
                    btn.onclick = () => {
                        window.open('http://localhost:3000/about-knoux.html', '_blank');
                    };
                    document.body.appendChild(btn);
                }
            }
        `);
    }
}

// صفحة احتياطية
function showFallbackPage() {
    if (!mainWindow) return;
    
    const fallbackHTML = \`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>Knoux Clipboard AI</title>
            <style>
                :root {
                    --primary: #0f0f23;
                    --secondary: #1a1a2e;
                    --accent: #8a2be2;
                    --text: #ffffff;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                body {
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: var(--text);
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                }
                
                .app-container {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 800px;
                    width: 100%;
                    border: 2px solid var(--accent);
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                    text-align: center;
                }
                
                .logo {
                    font-size: 5em;
                    margin-bottom: 20px;
                    color: var(--accent);
                    animation: float 3s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                h1 {
                    font-size: 3em;
                    margin-bottom: 10px;
                    background: linear-gradient(45deg, #8a2be2, #00d4ff);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                
                .tagline {
                    font-size: 1.2em;
                    color: #a78bfa;
                    margin-bottom: 30px;
                }
                
                .features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin: 30px 0;
                }
                
                .feature {
                    background: rgba(255, 255, 255, 0.05);
                    padding: 20px;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .feature-icon {
                    font-size: 2.5em;
                    margin-bottom: 10px;
                }
                
                .contact-section {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 15px;
                    margin-top: 20px;
                }
                
                .contact-card {
                    background: rgba(138, 43, 226, 0.1);
                    padding: 15px;
                    border-radius: 12px;
                    text-decoration: none;
                    color: white;
                    border: 1px solid rgba(138, 43, 226, 0.3);
                    transition: all 0.3s;
                }
                
                .contact-card:hover {
                    background: rgba(138, 43, 226, 0.2);
                    transform: translateY(-3px);
                }
                
                .developer-card {
                    background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(74, 0, 224, 0.1));
                    padding: 25px;
                    border-radius: 16px;
                    margin: 30px 0;
                    border: 2px solid var(--accent);
                }
                
                .footer {
                    margin-top: 30px;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9em;
                }
                
                @media (max-width: 768px) {
                    .app-container {
                        padding: 20px;
                    }
                    
                    h1 {
                        font-size: 2em;
                    }
                    
                    .logo {
                        font-size: 4em;
                    }
                    
                    .features {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <body>
            <div class="app-container">
                <div class="logo">📋</div>
                <h1>Knoux Clipboard AI</h1>
                <p class="tagline">مدير الحافظة الذكي مع تحليل الذكاء الاصطناعي</p>
                
                <div class="features">
                    <div class="feature">
                        <div class="feature-icon">🤖</div>
                        <h3>ذكاء اصطناعي</h3>
                        <p>تحليل وتلخيص المحتوى</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">🔒</div>
                        <h3>أمان متقدم</h3>
                        <p>تشفير البيانات الحساسة</p>
                    </div>
                    <div class="feature">
                        <div class="feature-icon">⚡</div>
                        <h3>أداء سريع</h3>
                        <p>معالجة فورية</p>
                    </div>
                </div>
                
                <div class="developer-card">
                    <h3>👑 المطور</h3>
                    <p style="font-size: 1.3em; margin: 10px 0;"><strong>Eng / Sadek Elgazar</strong></p>
                    <p>المطور الأوحد والمؤسس لتطبيقات Knoux</p>
                </div>
                
                <div class="contact-section">
                    <h3>📞 للدعم والمساعدة</h3>
                    <div class="contact-grid">
                        <a href="tel:0503281920" class="contact-card">
                            <div>📞 اتصال مباشر</div>
                        </a>
                        <a href="https://wa.me/971503281920" target="_blank" class="contact-card">
                            <div>💬 WhatsApp</div>
                        </a>
                        <a href="mailto:knouxguard@gmail.com" class="contact-card">
                            <div>📧 Email</div>
                        </a>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Knoux — نبني التقنية بثقة، ونصنع التجربة باحتراف.</p>
                </div>
            </div>
            
            <script>
                // إضافة تأثيرات تفاعلية
                document.querySelectorAll('.contact-card').forEach(card => {
                    card.addEventListener('click', function(e) {
                        // تأثير النقر
                        const ripple = document.createElement('span');
                        const rect = this.getBoundingClientRect();
                        const size = Math.max(rect.width, rect.height);
                        const x = e.clientX - rect.left - size / 2;
                        const y = e.clientY - rect.top - size / 2;
                        
                        ripple.style.cssText = \`
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(138, 43, 226, 0.3);
                            transform: scale(0);
                            animation: ripple 0.6s linear;
                            width: \${size}px;
                            height: \${size}px;
                            top: \${y}px;
                            left: \${x}px;
                            pointer-events: none;
                        \`;
                        
                        this.appendChild(ripple);
                        setTimeout(() => ripple.remove(), 600);
                    });
                });
                
                // إضافة أنيميشن النبضة
                const style = document.createElement('style');
                style.textContent = \`
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                \`;
                document.head.appendChild(style);
            </script>
        </body>
        </html>
    \`;
    
    mainWindow.loadURL(\`data:text/html;charset=utf-8,\${encodeURIComponent(fallbackHTML)}\`);
    mainWindow.show();
}

// إنشاء قائمة النظام (Tray)
function createTray() {
    try {
        const iconPath = path.join(__dirname, 'public', 'favicon.ico');
        const icon = nativeImage.createFromPath(iconPath);
        
        tray = new Tray(icon.resize({ width: 16, height: 16 }));
        
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'فتح Knoux Clipboard AI',
                click: () => {
                    if (mainWindow) {
                        mainWindow.show();
                        mainWindow.focus();
                    }
                }
            },
            {
                label: 'عن Knoux',
                click: () => {
                    if (mainWindow) {
                        mainWindow.loadURL('http://localhost:3000/about-knoux.html');
                        mainWindow.show();
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'الاتصال بالدعم',
                submenu: [
                    {
                        label: '📞 0503281920',
                        click: () => require('electron').shell.openExternal('tel:0503281920')
                    },
                    {
                        label: '💬 WhatsApp',
                        click: () => require('electron').shell.openExternal('https://wa.me/971503281920')
                    },
                    {
                        label: '📧 knouxguard@gmail.com',
                        click: () => require('electron').shell.openExternal('mailto:knouxguard@gmail.com')
                    }
                ]
            },
            { type: 'separator' },
            {
                label: 'خروج',
                click: () => app.quit()
            }
        ]);
        
        tray.setToolTip('Knoux Clipboard AI\nاضغط لفتح/إخفاء التطبيق');
        tray.setContextMenu(contextMenu);
        
        tray.on('click', () => {
            if (mainWindow) {
                if (mainWindow.isVisible()) {
                    mainWindow.hide();
                } else {
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        });
        
        console.log('📌 Tray icon created');
    } catch (error) {
        console.log('⚠️ Could not create tray:', error.message);
    }
}

function updateTrayMenu() {
    if (tray) {
        tray.setToolTip(\`Knoux Clipboard AI v1.0.0\nالمطور: Eng / Sadek Elgazar\`);
    }
}

// القائمة الرئيسية للتطبيق
function createAppMenu() {
    const template = [
        {
            label: 'ملف',
            submenu: [
                {
                    label: 'عن Knoux',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.loadURL('http://localhost:3000/about-knoux.html');
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'خروج',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => app.quit()
                }
            ]
        },
        {
            label: 'عرض',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'المساعدة',
            submenu: [
                {
                    label: 'الدعم الفني',
                    click: () => {
                        require('electron').shell.openExternal('tel:0503281920');
                    }
                },
                {
                    label: 'مركز المساعدة',
                    click: () => {
                        require('electron').shell.openExternal('mailto:knouxguard@gmail.com');
                    }
                }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// أحداث التطبيق
app.whenReady().then(() => {
    console.log('✅ Electron جاهز - بدء تشغيل Knoux...');
    createWindow();
    createTray();
    createAppMenu();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    console.log('📴 جميع النوافذ أغلقت');
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    console.log('👋 إغلاق تطبيق Knoux...');
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// منع عدة نسخ
const gotSingleInstanceLock = app.requestSingleInstanceLock();

if (!gotSingleInstanceLock) {
    console.log('⚠️ تطبيق Knoux يعمل بالفعل، إغلاق النسخة الجديدة');
    app.quit();
} else {
    app.on('second-instance', () => {
        console.log('🔄 محاولة فتح نسخة أخرى - إظهار النافذة الحالية');
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

console.log('⚡ Knoux Clipboard AI main process initialized');
