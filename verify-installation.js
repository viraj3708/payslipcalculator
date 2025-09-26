const fs = require('fs');
const path = require('path');

console.log('Verifying Payslip Calculator Installation...\n');

// Check if all required files exist
const requiredFiles = [
  'PayslipCalculator-Setup/PayslipCalculator/main.js',
  'PayslipCalculator-Setup/PayslipCalculator/package.json',
  'PayslipCalculator-Setup/PayslipCalculator/dist/index.html',
  'PayslipCalculator-Setup/PayslipCalculator/dist/assets/index-Cmwurvba.js',
  'PayslipCalculator-Setup/PayslipCalculator/dist/assets/index-pPbI_fzn.css',
  'PayslipCalculator-Setup/install.bat',
  'PayslipCalculator-Setup/uninstall.bat'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file} - Found`);
  } else {
    console.log(`✗ ${file} - Missing`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✓ All required files are present');
  console.log('✓ Installation package is ready');
  console.log('\nTo install the application:');
  console.log('1. Navigate to the PayslipCalculator-Setup directory');
  console.log('2. Right-click on install.bat and select "Run as administrator"');
  console.log('3. Follow the installation prompts');
  console.log('\nTo run the application after installation:');
  console.log('- Double-click the "Payslip Calculator" shortcut on your desktop');
} else {
  console.log('✗ Some required files are missing');
  console.log('✗ Installation package is incomplete');
}

console.log('\n' + '='.repeat(50));