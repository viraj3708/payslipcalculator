const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building and packaging Payslip Calculator...');

try {
  // Build the application
  console.log('Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Create packaging directory
  const packageDir = path.join(__dirname, 'PayslipCalculator-Package');
  if (fs.existsSync(packageDir)) {
    fs.rmSync(packageDir, { recursive: true });
  }
  fs.mkdirSync(packageDir);
  
  // Copy necessary files
  const filesToCopy = [
    'dist',
    'main.js',
    'package.json'
  ];
  
  filesToCopy.forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(packageDir, file);
    if (fs.existsSync(src)) {
      if (fs.lstatSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
      } else {
        fs.copyFileSync(src, dest);
      }
    }
  });
  
  console.log('Application packaged successfully in PayslipCalculator-Package directory');
  console.log('To run the application, navigate to the package directory and run: npm run electron');
  
} catch (error) {
  console.error('Error packaging application:', error.message);
  process.exit(1);
}