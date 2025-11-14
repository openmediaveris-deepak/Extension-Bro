# Generate Bro - Chrome Extension Template Generator

Quickly create new Chrome extensions from the "Skeleton Crew" template.

## Usage

### Option 1: Using Node.js (Cross-platform)

```bash
node generate-bro.js
```

### Option 2: Using Batch Script (Windows)

```bash
generate-bro.bat
```

### Option 3: Make it globally available

```bash
npm link
generate-bro
```

## What it does

1. Prompts you for your extension name
2. Prompts you for the folder name (optional)
3. Copies all template files from "Skeleton Crew"
4. Replaces "Extension Bro" with your extension name throughout all files
5. Optionally installs dependencies
6. Skips unnecessary files and folders:
   - Build artifacts: node_modules, dist, build, .cache
   - Lock files: package-lock.json, yarn.lock, pnpm-lock.yaml
   - Git: .git folder
   - Logs: *.log files
   - OS files: .DS_Store, Thumbs.db
   - Extension builds: *.crx, *.pem

## Example

```
🚀 Chrome Extension Template Generator

Enter your extension name: My Awesome Extension
Enter folder name (default: my-awesome-extension): 

📁 Creating extension in "my-awesome-extension"...
✅ Files copied successfully!

Install dependencies? (y/n): y

📦 Installing dependencies...
✅ Dependencies installed!

🎉 Extension "My Awesome Extension" created successfully!

Next steps:
  cd my-awesome-extension
  npm run dev

Happy coding! 🚀
```

## Requirements

- Node.js installed
- "Skeleton Crew" template folder in the same directory

## Notes

- The script automatically converts your extension name to kebab-case for the folder name
- All instances of "Extension Bro" in the template will be replaced with your extension name
- Only essential template files are copied (source code, configs, docs)
- Lock files are skipped so users can use their preferred package manager
