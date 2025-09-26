@echo off
title Payslip Calculator Launcher
echo Payslip Calculator Launcher
echo ==========================

echo Current directory: %CD%

REM Change to the application directory
cd /d "c:\Users\ADMIN\Desktop\PAYSLIP CALCULATOR\PayslipCalculator-Package"

echo Application directory: %CD%

REM Run the application
echo Starting Payslip Calculator...
electron .

pause