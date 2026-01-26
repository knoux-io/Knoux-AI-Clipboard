@echo off
echo Starting KNOUX Clipboard AI Development...
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install --no-warnings
)

REM Install react-scripts if missing
echo Checking for react-scripts...
npm list react-scripts >nul 2>&1
if errorlevel 1 (
    echo Installing react-scripts...
    call npm install react-scripts --no-warnings
)

echo Starting development runner (Vite + Electron)...
start "Dev Runner" cmd /c "npm run dev"

echo Development runner started in a new window. The dev runner launches both the renderer (Vite) and Electron automatically.
echo If you prefer to start the renderer and Electron separately, run `npm run start:renderer` then `npm start`.
echo.
pause
