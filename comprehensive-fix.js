const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

console.log('Payslip Calculator - Comprehensive Fix');
console.log('====================================');

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Function to check if a directory exists
function dirExists(dirPath) {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
}

// Check required files and directories
console.log('Checking required files and directories...');

const requiredPaths = [
  'PayslipCalculator-Package',
  'PayslipCalculator-Package/package.json',
  'PayslipCalculator-Package/main.js',
  'PayslipCalculator-Package/dist',
  'PayslipCalculator-Package/dist/index.html',
  'PayslipCalculator-Package/dist/assets'
];

let allExist = true;
requiredPaths.forEach(p => {
  const fullPath = path.join(__dirname, p);
  if (fileExists(fullPath) || dirExists(fullPath)) {
    console.log(`✓ ${p} - Found`);
  } else {
    console.log(`✗ ${p} - Missing`);
    allExist = false;
  }
});

if (!allExist) {
  console.log('ERROR: Some required files are missing!');
  process.exit(1);
}

// Check package.json configuration
console.log('\nChecking package.json configuration...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'package.json'), 'utf8'));
  if (packageJson.scripts && packageJson.scripts.start === 'electron .') {
    console.log('✓ package.json has correct start script');
  } else {
    console.log('✗ package.json start script is incorrect');
    console.log('  Fixing package.json...');
    
    // Fix package.json
    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts.start = 'electron .';
    packageJson.scripts.electron = 'electron .';
    
    fs.writeFileSync(
      path.join(__dirname, 'PayslipCalculator-Package', 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    console.log('✓ package.json fixed');
  }
} catch (error) {
  console.log(`✗ Error reading package.json: ${error.message}`);
  process.exit(1);
}

// Check main.js configuration
console.log('\nChecking main.js configuration...');
try {
  const mainJs = fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'main.js'), 'utf8');
  if (mainJs.includes("win.loadFile(path.join(__dirname, 'dist', 'index.html'))")) {
    console.log('✓ main.js is configured correctly');
  } else {
    console.log('✗ main.js configuration is incorrect');
    console.log('  This needs to be fixed manually');
  }
} catch (error) {
  console.log(`✗ Error reading main.js: ${error.message}`);
  process.exit(1);
}

// Check if Electron is installed globally
console.log('\nChecking if Electron is installed globally...');
try {
  execSync('npm list -g electron', { stdio: 'pipe' });
  console.log('✓ Electron is installed globally');
} catch (error) {
  console.log('✗ Electron is not installed globally');
  console.log('  Installing Electron globally...');
  try {
    execSync('npm install -g electron@25.0.0', { stdio: 'inherit' });
    console.log('✓ Electron installed globally');
  } catch (installError) {
    console.log(`✗ Failed to install Electron globally: ${installError.message}`);
  }
}

// Install local dependencies
console.log('\nInstalling local dependencies...');
try {
  process.chdir(path.join(__dirname, 'PayslipCalculator-Package'));
  console.log(`Changed to directory: ${process.cwd()}`);
  
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Local dependencies installed');
} catch (error) {
  console.log(`✗ Error installing local dependencies: ${error.message}`);
}

console.log('\nFix process completed!');
console.log('\nTo run the application:');
console.log('1. Navigate to the PayslipCalculator-Package directory');
console.log('2. Run: electron .');
console.log('\nOr use the provided batch files:');
console.log('- double-click final-launcher.bat');
console.log('- double-click simple-launcher.bat');