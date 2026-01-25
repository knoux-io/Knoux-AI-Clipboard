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

echo Starting React dev server...
start "React Server" cmd /c "npm start"

REM Wait using ping instead of timeout
echo Waiting for React to start...
ping -n 10 127.0.0.1 >nul

echo Starting Electron...
electron .

echo.
echo Development environment started!
echo React: http://localhost:3000
echo Electron: Running
pause
