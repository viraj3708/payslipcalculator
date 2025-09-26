@echo off
echo Creating Payslip Calculator Setup Package...

REM Create the setup directory
if exist "PayslipCalculator-Setup" rmdir /s /q "PayslipCalculator-Setup"
mkdir "PayslipCalculator-Setup"

REM Copy the packaged application
xcopy "PayslipCalculator-Package" "PayslipCalculator-Setup\PayslipCalculator" /E /I /H /Y

REM Copy the installation scripts
copy "install.bat" "PayslipCalculator-Setup\install.bat"
copy "uninstall.bat" "PayslipCalculator-Setup\uninstall.bat"

REM Create a shortcut script
echo @echo off > "PayslipCalculator-Setup\PayslipCalculator\run-app.bat"
echo cd /d "%%~dp0" >> "PayslipCalculator-Setup\PayslipCalculator\run-app.bat"
echo npm start >> "PayslipCalculator-Setup\PayslipCalculator\run-app.bat"

echo Setup package created successfully!
echo.
echo To install:
echo 1. Run install.bat as Administrator
echo 2. The application will be installed to Program Files
echo 3. A desktop shortcut will be created
echo.
echo To uninstall:
echo 1. Run uninstall.bat as Administrator