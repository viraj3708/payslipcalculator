@echo off
title Payslip Calculator Installer
echo Payslip Calculator Installer
echo ==========================

:: Check for administrator privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo This installer requires administrator privileges.
    echo Please run this installer as Administrator.
    echo.
    pause
    exit /b
)

echo Creating installation directory...
if not exist "C:\Program Files\PayslipCalculator" mkdir "C:\Program Files\PayslipCalculator"

echo Copying application files...
xcopy "%~dp0PayslipCalculator" "C:\Program Files\PayslipCalculator" /E /I /H /Y

echo Creating shortcut...
echo Set oWS = WScript.CreateObject("WScript.Shell") > CreateShortcut.vbs
echo sLinkFile = oWS.SpecialFolders("Desktop") ^& "\Payslip Calculator.lnk" >> CreateShortcut.vbs
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> CreateShortcut.vbs
echo oLink.TargetPath = "C:\Program Files\PayslipCalculator\run-app.bat" >> CreateShortcut.vbs
echo oLink.Save >> CreateShortcut.vbs
cscript CreateShortcut.vbs
del CreateShortcut.vbs

echo Installation complete!
echo You can now run Payslip Calculator from your desktop shortcut.
echo.
pause