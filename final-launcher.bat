@echo off
title Payslip Calculator - Final Launcher
echo Payslip Calculator - Final Launcher
echo =================================

echo Stopping any existing Node processes...
taskkill /f /im node.exe >nul 2>&1

echo Installing Electron globally...
npm install -g electron@25.0.0

echo Changing to application directory...
cd /d "c:\Users\ADMIN\Desktop\PAYSLIP CALCULATOR\PayslipCalculator-Package"

echo Current directory: %CD%

echo Installing local dependencies...
npm install

echo Starting Payslip Calculator...
electron .

echo.
echo If the application didn't start, please check:
echo 1. That all files are in the correct locations
echo 2. That Node.js is properly installed
echo 3. That you have the necessary permissions
echo.
pause