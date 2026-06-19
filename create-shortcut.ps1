# Meu Diário - Create Desktop Shortcut
# This script creates a desktop shortcut to launch the app

$appPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$desktopPath = [System.Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktopPath 'Meu Diario.lnk'
$vbsFile = Join-Path $appPath 'launch.vbs'
$iconPath = Join-Path $appPath 'assets\icon.ico'

Write-Host "Creating desktop shortcut..."
Write-Host "Source: $batchFile"
Write-Host "Target: $shortcutPath"

if (Test-Path $shortcutPath) {
    Remove-Item $shortcutPath -Force
    Write-Host "Removed existing shortcut."
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = (Get-Command wscript.exe).Source
$shortcut.Arguments = "`"$vbsFile`""
$shortcut.WorkingDirectory = $appPath
$shortcut.Description = "Meu Diario"
$shortcut.IconLocation = $iconPath
$shortcut.WindowStyle = 0
$shortcut.Save()

Write-Host "Shortcut created successfully at: $shortcutPath"
Write-Host "If the icon still shows old cache, refresh the desktop or restart Explorer."
