@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

REM Meu Diário - Create Desktop Shortcut (Batch Version)
REM This script creates a Windows shortcut to launch the app

cd /d "%~dp0"

REM Get paths
set "desktopPath=%USERPROFILE%\Desktop"
set "shortcutPath=%desktopPath%\Meu Diário.lnk"
set "appPath=%cd%"
set "vbsLaunch=%appPath%\launch.vbs"
set "iconFile=%appPath%\assets\icon.ico"

echo.
echo ╔════════════════════════════════════╗
echo ║ Meu Diário - Criador de Atalho     ║
echo ╚════════════════════════════════════╝
echo.

REM Check if already exists
if exist "%shortcutPath%" (
    echo ℹ️ Atalho já existe na Área de Trabalho!
    echo Caminho: %shortcutPath%
    echo.
    set /p deleteChoice="Deseja criar um novo? (S/N): "
    if /i not "!deleteChoice!"=="S" (
        echo Cancelado.
        goto :end
    )
    del "%shortcutPath%"
    echo ✓ Atalho antigo removido
)

echo.
echo Criando atalho...
echo Origem: %batchFile%
echo Destino: %shortcutPath%
echo.

REM Create VBScript to make the shortcut
set "vbsFile=%temp%\create_shortcut.vbs"

(
    echo Set oWS = WScript.CreateObject("WScript.Shell"^)
    echo sLinkFile = "%shortcutPath%"
    echo Set oLink = oWS.CreateShortcut(sLinkFile^)
    echo oLink.TargetPath = "wscript.exe"
    echo oLink.Arguments = """%vbsLaunch%"""
    echo oLink.WorkingDirectory = "%appPath%"
    echo oLink.Description = "Aplicativo de Diário - Meu Diário"
    echo oLink.IconLocation = "%iconFile%"
    echo oLink.WindowStyle = 0
    echo oLink.Save
) > "%vbsFile%"

REM Run the VBScript
cscript.exe "%vbsFile%" //Nologo

REM Clean up
del "%vbsFile%"

echo.
echo ✓ Atalho criado com sucesso!
echo.
echo A Área de Trabalho agora tem um atalho para "Meu Diário"
echo Clique duplo nele para iniciar o app!
echo.

:end
timeout /t 3 /nobreak
