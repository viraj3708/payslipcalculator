const fs = require('fs');
const path = require('path');

console.log('Debugging Payslip Calculator Application...\n');

// Check if all required files exist
const requiredFiles = [
  'PayslipCalculator-Package/main.js',
  'PayslipCalculator-Package/package.json',
  'PayslipCalculator-Package/dist/index.html',
  'PayslipCalculator-Package/dist/assets/index-Cmwurvba.js',
  'PayslipCalculator-Package/dist/assets/index-pPbI_fzn.css'
];

console.log('Checking required files:');
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${file} - Found`);
  } else {
    console.log(`✗ ${file} - Missing`);
  }
});

console.log('\nChecking package.json configuration:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'package.json'), 'utf8'));
  console.log(`Name: ${packageJson.name}`);
  console.log(`Version: ${packageJson.version}`);
  console.log(`Main: ${packageJson.main}`);
  console.log(`Scripts: ${JSON.stringify(packageJson.scripts)}`);
} catch (error) {
  console.log(`✗ Error reading package.json: ${error.message}`);
}

console.log('\nChecking main.js configuration:');
try {
  const mainJs = fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'main.js'), 'utf8');
  if (mainJs.includes("win.loadFile(path.join(__dirname, 'dist', 'index.html'))")) {
    console.log('✓ main.js is configured to load built application');
  } else {
    console.log('✗ main.js is not configured correctly');
  }
} catch (error) {
  console.log(`✗ Error reading main.js: ${error.message}`);
}

console.log('\nChecking dist/index.html:');
try {
  const indexHtml = fs.readFileSync(path.join(__dirname, 'PayslipCalculator-Package', 'dist', 'index.html'), 'utf8');
  if (indexHtml.includes('./assets/')) {
    console.log('✓ dist/index.html uses relative paths');
  } else {
    console.log('✗ dist/index.html does not use relative paths');
  }
  
  // Check if the JavaScript file is referenced
  const jsMatch = indexHtml.match(/src="([^"]*index-[^"]*\.js)"/);
  if (jsMatch) {
    console.log(`✓ JavaScript file referenced: ${jsMatch[1]}`);
  } else {
    console.log('✗ JavaScript file not found in index.html');
  }
  
  // Check if the CSS file is referenced
  const cssMatch = indexHtml.match(/href="([^"]*index-[^"]*\.css)"/);
  if (cssMatch) {
    console.log(`✓ CSS file referenced: ${cssMatch[1]}`);
  } else {
    console.log('✗ CSS file not found in index.html');
  }
} catch (error) {
  console.log(`✗ Error reading dist/index.html: ${error.message}`);
}

console.log('\nDebugging complete.');