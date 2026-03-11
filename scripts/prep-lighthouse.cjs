const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const subDir = path.join(distDir, 'davydfontoura-dev');

if (fs.existsSync(distDir) && !fs.existsSync(subDir)) {
    console.log('Preparing dist folder for Lighthouse with subpath /davydfontoura-dev/...');
    
    // Create temp dir to avoid moving into itself
    const tempDir = path.join(__dirname, '../dist-temp');
    if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
    }
    
    fs.renameSync(distDir, tempDir);
    fs.mkdirSync(distDir);
    fs.renameSync(tempDir, subDir);
    
    console.log('Structure ready for Lighthouse.');
} else {
    console.log('Lighthouse folder structure already exists or dist not found.');
}
