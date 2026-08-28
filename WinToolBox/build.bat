@echo off
echo Compilando TechKit...
cd /d "%~dp0"
python -m PyInstaller TechKit.spec --clean
if %ERRORLEVEL% EQU 0 (
    echo.
    echo BUILD EXITOSO - TechKit.exe generado en dist\
    echo.
    explorer dist
) else (
    echo.
    echo ERROR en el build - revisa los mensajes de arriba
    pause
)
