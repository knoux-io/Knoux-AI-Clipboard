param(
  [string]$ProjectRoot = "F:\Knoux-Clipboard-AI"
)

function Get-RelImport([string]$fromDir, [string]$toFile) {
  $from = (New-Object System.Uri((Join-Path $fromDir "")))
  $to   = (New-Object System.Uri($toFile))
  $rel  = $from.MakeRelativeUri($to).ToString()
  # normalize
  $rel  = $rel -replace '/', '\'
  $rel  = $rel -replace '\\+', '\'
  $rel  = $rel -replace '\\', '/'
  $rel  = $rel -replace '\.tsx?$', ''
  if (-not $rel.StartsWith('.')) { $rel = "./" + $rel }
  return $rel
}

Push-Location $ProjectRoot

$sharedLoggerTarget = Join-Path $ProjectRoot "app\shared\localized-logger.ts"
$created = @()
$modified = @()
$backups = @()

if (-not (Test-Path $sharedLoggerTarget)) {
  Write-Host "localized-logger.ts not found at $sharedLoggerTarget. Create it first (or run the i18n script)." -ForegroundColor Yellow
  Pop-Location
  exit 1
}

$ts = (Get-Date).ToString('yyyyMMddHHmmss')

# collect files (exclude node_modules and app/shared)
$files = Get-ChildItem -Path $ProjectRoot -Include *.ts,*.tsx -Recurse -File |
         Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\app\\shared\\' }

foreach ($f in $files) {
  $path = $f.FullName
  try {
    $orig = Get-Content -Raw -Path $path -Encoding utf8
  } catch {
    Write-Host "Failed to read $path - skipping" -ForegroundColor Yellow
    continue
  }

  $lines = $orig -split "`n"
  $changed = $false

  # 1) Replace lines that import shared/logger with import { llog } from 'relative'
  $fileDir = Split-Path -Path $path -Parent
  $rel = Get-RelImport $fileDir $sharedLoggerTarget
  for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "shared[\\/\\\\]logger") {
      $lines[$i] = "import { llog } from '$rel';"
      $changed = $true
    }
  }

  $patched = ($lines -join "`n")

  # 2) Replace logger. -> llog. (simple identifier replacement)
  if ($patched -match '\blogger\.') {
    $patched = [regex]::Replace($patched, '\blogger\.', 'llog.')
    $changed = $true
  }

  if ($changed -and ($patched -ne $orig)) {
    $bak = "$path.bak.$ts"
    try {
      Copy-Item -Path $path -Destination $bak -Force
      $backups += $bak
      Set-Content -Path $path -Value $patched -Encoding utf8
      $modified += $path
      Write-Host "Patched: $path (backup -> $bak)"
    } catch {
      Write-Host ("Failed to patch {0}:" -f $path) -ForegroundColor Red
        Write-Host $_ -ForegroundColor Red
    }
  }
}

# Commit & push if changed
if ($modified.Count -gt 0) {
  & git add -- $modified
  $msg = "chore(i18n): replace shared logger imports and logger. -> llog across project"
  & git commit -m $msg
  $hash = (& git rev-parse --short HEAD).Trim()
  & git push -u origin HEAD
  Write-Host "Committed and pushed: $hash"
} else {
  Write-Host "No files modified."
}

# Write report (clear, explicit loops to avoid parser problems)
$reportTs = (Get-Date).ToString('yyyyMMddHHmmss')
$reportPath = Join-Path $ProjectRoot ("i18n-patch-report-$reportTs.md")
$reportLines = @()
$reportLines += "# i18n patch final report - $reportTs"
$reportLines += ""
$reportLines += "## Modified files"
if ($modified.Count -eq 0) {
  $reportLines += "- (none)"
} else {
  foreach ($m in $modified) { $reportLines += "- `$m`" }
}
$reportLines += ""
$reportLines += "## Backups"
if ($backups.Count -eq 0) {
  $reportLines += "- (none)"
} else {
  foreach ($b in $backups) { $reportLines += "- `$b`" }
}
$reportLines += ""
$reportLines += "## Notes"
$reportLines += "- Branch: $(git rev-parse --abbrev-ref HEAD)"
$reportLines | Out-File -FilePath $reportPath -Encoding utf8
Write-Host "Report written to: $reportPath"

Pop-Location
Write-Host "Done."

