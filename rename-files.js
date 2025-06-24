const fs = require('fs');
const path = require('path');

function renameFiles(directory) {
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      renameFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      const newPath = fullPath.replace('.tsx', '.jsx');
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${fullPath} -> ${newPath}`);
    }
  });
}

renameFiles('src');