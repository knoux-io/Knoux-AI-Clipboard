// electron.js - Universal Electron Main Process
// Works with both React and Vite projects

const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Detect project structure
function detectProjectType() {
    const projectRoot = __dirname;

    // Check for React project
    if (fs.existsSync(path.join(projectRoot, 'package.json'))) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

            // Check for React scripts
            if (packageJson.scripts && packageJson.scripts.start &&
                (packageJson.scripts.start.includes('react-scripts') ||
                 packageJson.scripts.start.includes('craco'))) {
                return 'react';
            }

            // Check for Vite
            if (packageJson.devDependencies && packageJson.devDependencies.vite) {
                return 'vite';
            }
        } catch (error) {
            console.error('Error reading package.json:', error);
        }
    }

    // Check for app/main/main.ts (our TypeScript project)
    if (fs.existsSync(path.join(projectRoot, 'app', 'main', 'main.ts'))) {
        return 'typescript';
    }

    // Default to React if public/build exists
    if (fs.existsSync(path.join(projectRoot, 'build')) ||
        fs.existsSync(path.join(projectRoot, 'public'))) {
        return 'react';
    }

    return 'unknown';
}

function createWindow() {
    const projectType = detectProjectType();
    console.log('Detected project type:', projectType);

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'electron', 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        },
        backgroundColor: '#1a1a1a',
        frame: true
    });

    let startURL;
    // allow override from runner
    const devOverride = process.env.DEV_SERVER_URL;

    switch (projectType) {
        case 'react':
            // React app (localhost:3000 or build/index.html)
            if (process.env.NODE_ENV === 'development') {
                startURL = devOverride || 'http://localhost:3000';
            } else {
                startURL = `file://${path.join(__dirname, 'build', 'index.html')}`;
            }
            break;

        case 'vite':
        case 'typescript':
            // Vite/TypeScript app (localhost:5173)
            if (process.env.NODE_ENV === 'development') {
                startURL = devOverride || 'http://localhost:5173';
            } else {
                startURL = `file://${path.join(__dirname, 'dist', 'index.html')}`;
            }
            break;

        default:
            console.error('Unknown project type. Trying common URLs...');

            // Try common URLs
            const tryURLs = [
                'http://localhost:3000',
                'http://localhost:5173',
                `file://${path.join(__dirname, 'build', 'index.html')}`,
                `file://${path.join(__dirname, 'dist', 'index.html')}`
            ];

            startURL = tryURLs[0];
            console.log('Trying URL:', startURL);
    }

    console.log('Loading URL:', startURL);
    // If this is a dev URL (http(s) localhost), verify the server is reachable
    const isLocalHttp = (u) => typeof u === 'string' && (u.startsWith('http://localhost') || u.startsWith('http://127.0.0.1') || u.startsWith('https://localhost'));
    const loadWithFallback = async (url) => {
        try {
            if (isLocalHttp(url)) {
                const http = require('http');
                const parsed = new URL(url);
                await new Promise((resolve, reject) => {
                    const req = http.request({ method: 'GET', host: parsed.hostname, port: parsed.port || 80, path: '/', timeout: 2000 }, (res) => {
                        if (res.statusCode >= 200 && res.statusCode < 400) return resolve();
                        reject(new Error('Status ' + res.statusCode));
                    });
                    req.on('error', reject);
                    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
                    req.end();
                });
            }
            await mainWindow.loadURL(url);
        } catch (err) {
            console.error('Dev server unreachable, loading fallback page:', err && err.message);
            const fallback = `file://${path.join(__dirname, 'public', 'dev-unavailable.html')}`;
            try { await mainWindow.loadURL(fallback); } catch (e) { console.error('Failed loading fallback page', e); }
        }
    };

    loadWithFallback(startURL);

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if (process.env.NODE_ENV === 'development') {
            mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// App lifecycle
app.whenReady().then(createWindow);

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
