const { spawn } = require('child_process');
const path = require('path');

console.log('Launching Payslip Calculator...');
console.log('Current directory:', process.cwd());

// Change to the correct directory
const appDir = path.join(__dirname, 'PayslipCalculator-Package');
console.log('Application directory:', appDir);

// Run electron directly from the correct directory
const electron = spawn('npx', ['electron', '.'], {
  cwd: appDir,
  stdio: 'inherit'
});

electron.on('close', (code) => {
  console.log(`Electron process exited with code ${code}`);
});

electron.on('error', (error) => {
  console.error('Failed to start Electron:', error);
});