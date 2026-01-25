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
            nodeIntegration: true,
            contextIsolation: false
        },
        backgroundColor: '#1a1a1a',
        frame: true
    });

    let startURL;
    
    switch (projectType) {
        case 'react':
            // React app (localhost:3000 or build/index.html)
            if (process.env.NODE_ENV === 'development') {
                startURL = 'http://localhost:3000';
            } else {
                startURL = `file://${path.join(__dirname, 'build', 'index.html')}`;
            }
            break;
            
        case 'vite':
        case 'typescript':
            // Vite/TypeScript app (localhost:5173)
            if (process.env.NODE_ENV === 'development') {
                startURL = 'http://localhost:5173';
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
    mainWindow.loadURL(startURL);

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
