@echo off
cd /d "%~dp0"
set TECHKIT_ELEVATED=1
python main.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] La aplicacion cerro con codigo %ERRORLEVEL%
    pause
)
