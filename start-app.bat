@echo off
setlocal enabledelayedexpansion

REM Meu Diário - Desktop App Launcher
REM This script starts the Electron app from the built distribution

cd /d "%~dp0"

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Start Electron with the production build (hidden window)
echo Iniciando Meu Diário...
start "" /B npx electron .

REM Exit without waiting
exit /b 0
