# إصلاح الـstrings في ملف formatter.ts
$formatterPath = "app/backend/clipboard/formatter.ts"
if (Test-Path $formatterPath) {
    $content = Get-Content $formatterPath -Raw
    
    # إصلاح السطر 167
    $content = $content -replace 'this\.llog\.debug\(Initialized syntax rules for  languages\);', 'this.llog.debug("Initialized syntax rules for languages");'
    
    # إصلاح السطر 400
    $content = $content -replace 'return  │ ;', 'return "";'
    
    # إصلاح السطر 424
    $content = $content -replace 'return \{\{:}};', 'return "";'
    
    Set-Content $formatterPath -Value $content -Encoding UTF8
    Write-Host "✅ تم إصلاح formatter.ts" -ForegroundColor Green
}

# إصلاح history-store.ts
$historyPath = "app/backend/clipboard/history-store.ts"
if (Test-Path $historyPath) {
    $content = Get-Content $historyPath -Raw
    
    # إصلاح السطر 214
    $content = $content -replace 'const backupPath = \.backup\.\.json;', 'const backupPath = ".backup.json";'
    
    Set-Content $historyPath -Value $content -Encoding UTF8
    Write-Host "✅ تم إصلاح history-store.ts" -ForegroundColor Green
}
