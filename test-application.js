const fs = require('fs');
const path = require('path');

console.log('Testing Payslip Calculator Application...\n');

// Check if all required files exist
const requiredFiles = [
  'main.js',
  'package.json',
  'dist/index.html',
  'dist/assets/index-Cmwurvba.js',
  'dist/assets/index-pPbI_fzn.css'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, 'PayslipCalculator-Package', file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file} - Found`);
  } else {
    console.log(`✗ ${file} - Missing`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(50));

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'package.json'), 'utf8'));
if (packageJson.scripts && packageJson.scripts.start === 'electron .') {
  console.log('✓ package.json has correct start script');
} else {
  console.log('✗ package.json start script is incorrect');
  allFilesExist = false;
}

// Check main.js configuration
const mainJs = fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'main.js'), 'utf8');
if (mainJs.includes("win.loadFile(path.join(__dirname, 'dist', 'index.html'))")) {
  console.log('✓ main.js is configured to load built application');
} else {
  console.log('✗ main.js is not configured correctly');
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✓ All tests passed');
  console.log('✓ Application should run correctly');
  console.log('\nTo run the application:');
  console.log('1. Navigate to the PayslipCalculator-Package directory');
  console.log('2. Run "npm start" or "npx electron ."');
} else {
  console.log('✗ Some tests failed');
  console.log('✗ Application may not run correctly');
}

console.log('\n' + '='.repeat(50));