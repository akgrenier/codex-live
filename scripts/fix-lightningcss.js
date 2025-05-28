const fs = require('fs');
const path = require('path');

// Path to our stub file
const stubFilePath = path.join(__dirname, '..', 'stubs', 'lightningcss.js');
// Target path where lightningcss expects its native module
const targetPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'lightningcss',
  'node',
  'index.js'
);
const dirName = path.dirname(targetPath);

if (!fs.existsSync(dirName)) {
  fs.mkdirSync(dirName, { recursive: true });
  console.log('Created directory:', dirName);
}

// Read the content of the stub file
const stubContent = fs.readFileSync(stubFilePath, 'utf-8');

// Write the stub content to the target path
fs.writeFileSync(targetPath, stubContent);
console.log('Patched lightningcss stub at', targetPath);
