@echo off
title Payslip Calculator Uninstaller
echo Payslip Calculator Uninstaller
echo ============================

:: Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo This uninstaller requires administrator privileges.
    echo Please run this uninstaller as Administrator.
    echo.
    pause
    exit /b
)

echo Removing application files...
if exist "C:\Program Files\PayslipCalculator" rmdir /s /q "C:\Program Files\PayslipCalculator"

echo Removing shortcut...
set "shortcut=%USERPROFILE%\Desktop\Payslip Calculator.lnk"
if exist "%shortcut%" del "%shortcut%"

echo Uninstallation complete!
echo Payslip Calculator has been removed from your system.
echo.
pause