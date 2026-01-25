# Knoux Clipboard AI - Run Script
Write-Host "🎯 تشغيل Knoux Clipboard AI..." -ForegroundColor Cyan

# 1. تنظيف
Write-Host "🧹 تنظيف..." -ForegroundColor Yellow
Remove-Item -Path "build", "dist" -Recurse -Force -ErrorAction SilentlyContinue

# 2. بناء React
Write-Host "🏗️ بناء React..." -ForegroundColor Blue
npm run build

# 3. بناء Electron
Write-Host "⚡ بناء Electron..." -ForegroundColor Magenta
npm run build:electron

# 4. التحقق
Write-Host "🔍 التحقق من الملفات..." -ForegroundColor Green
if (Test-Path "build\index.html") {
    Write-Host "✅ React build موجود" -ForegroundColor Green
} else {
    Write-Host "❌ React build مفقود" -ForegroundColor Red
}

if (Test-Path "dist\main\main.js") {
    Write-Host "✅ Electron build موجود" -ForegroundColor Green
} else {
    Write-Host "❌ Electron build مفقود" -ForegroundColor Red
}

# 5. تشغيل
Write-Host "🚀 تشغيل التطبيق..." -ForegroundColor Cyan
npm run electron
