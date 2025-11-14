#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function copyDirectory(src, dest, extensionName) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  // Files and folders to skip
  const skipItems = [
    'node_modules',
    'dist',
    'build',
    '.git',
    '.cache',
    '.parcel-cache',
    'coverage',
    '.nyc_output',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.DS_Store',
    'Thumbs.db',
    '*.log',
    '.env.local',
    '.env.*.local'
  ];

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip unnecessary files and folders
    if (skipItems.includes(entry.name) || 
        entry.name.endsWith('.log') ||
        entry.name.endsWith('.crx') ||
        entry.name.endsWith('.pem')) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, extensionName);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Replace "Extension Bro" with the new extension name
      content = content.replace(/Extension Bro/g, extensionName);
      
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

async function main() {
  console.log('🚀 Chrome Extension Template Generator\n');

  const extensionName = await question('Enter your extension name: ');
  
  if (!extensionName || extensionName.trim() === '') {
    console.log('❌ Extension name cannot be empty!');
    rl.close();
    return;
  }

  const folderName = await question(`Enter folder name (default: ${extensionName.toLowerCase().replace(/\s+/g, '-')}): `);
  const targetFolder = folderName.trim() || extensionName.toLowerCase().replace(/\s+/g, '-');

  if (fs.existsSync(targetFolder)) {
    console.log(`❌ Folder "${targetFolder}" already exists!`);
    rl.close();
    return;
  }

  console.log(`\n📁 Creating extension in "${targetFolder}"...`);

  const templatePath = path.join(__dirname, 'Skeleton Crew');
  
  if (!fs.existsSync(templatePath)) {
    console.log('❌ Template folder "Skeleton Crew" not found!');
    rl.close();
    return;
  }

  // Copy template files
  copyDirectory(templatePath, targetFolder, extensionName);

  console.log('✅ Files copied successfully!');

  // Ask if user wants to install dependencies
  const installDeps = await question('\nInstall dependencies? (y/n): ');
  
  if (installDeps.toLowerCase() === 'y' || installDeps.toLowerCase() === 'yes') {
    console.log('\n📦 Installing dependencies...');
    try {
      execSync('npm install', { cwd: targetFolder, stdio: 'inherit' });
      console.log('✅ Dependencies installed!');
    } catch (error) {
      console.log('⚠️  Failed to install dependencies. You can run "npm install" manually.');
    }
  }

  console.log(`\n🎉 Extension "${extensionName}" created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`  cd ${targetFolder}`);
  if (installDeps.toLowerCase() !== 'y' && installDeps.toLowerCase() !== 'yes') {
    console.log(`  npm install`);
  }
  console.log(`  npm run dev`);
  console.log(`\nHappy coding! 🚀\n`);

  rl.close();
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  rl.close();
  process.exit(1);
});
