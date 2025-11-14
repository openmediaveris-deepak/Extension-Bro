# 🛡️ Spam Detector

AI-powered Chrome extension that protects you from malicious websites using Google's Gemini AI.

## ✨ Features

- 🤖 Real-time AI analysis of websites
- ⚠️ Warning modals for malicious sites
- ✅ Safe site indicators
- 🎨 Luxurious dark UI
- 💾 Persistent on/off toggle

## 🚀 Quick Start

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Setup

```bash
cd spam-detector
npm install
```

### 3. Configure API Key

**Option A: Use the example file (for new users)**
```bash
# Copy the example file
cp src/config/api.example.ts src/config/api.ts

# Edit src/config/api.ts and replace YOUR_API_KEY_HERE with your actual key
```

**Option B: Create api.ts directly**
```bash
# Create src/config/api.ts with your key
echo "export const GEMINI_API_KEY = 'your_actual_api_key_here';" > src/config/api.ts
```

**⚠️ IMPORTANT:** 
- `src/config/api.ts` is in `.gitignore` and won't be pushed to GitHub
- Never commit your real API key
- Each developer needs to create their own `api.ts` file locally

### 4. Build

```bash
npm run build
```

### 5. Load Extension

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `spam-detector/dist` folder

## 🎯 Usage

1. Click extension icon
2. Toggle protection ON
3. Browse normally - automatic protection!

## 📁 Project Structure

```
spam-detector/
├── src/
│   ├── popup/           # Extension popup UI
│   ├── content/         # Page monitoring
│   ├── background/      # AI analysis handler
│   ├── services/        # Gemini AI integration
│   ├── components/      # React components
│   ├── config/          # Configuration
│   └── shared/          # Utilities
├── public/icons/        # Extension icons
└── dist/                # Built extension
```

## 🛠️ Development

```bash
npm run dev      # Dev server
npm run build    # Build extension
npm run typecheck # Type checking
```

## 📝 License

MIT License - Use freely!
