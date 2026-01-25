@echo off
echo =========================================
echo ?? Knoux Clipboard AI - Safe Launcher
echo =========================================
echo.

REM ???? ?? ??????
cd /d "%~dp0"

echo [1/3] Checking Node.js...
node --version

echo [2/3] Launching Electron...
echo.

REM ?????? node ?????? electron ??????
node -e "const { app, BrowserWindow } = require('electron'); app.whenReady().then(() => { const win = new BrowserWindow({ width: 1200, height: 800, webPreferences: { nodeIntegration: true } }); win.loadURL('http://localhost:3001'); win.webContents.openDevTools(); });"

echo.
echo ? Application closed
pause
