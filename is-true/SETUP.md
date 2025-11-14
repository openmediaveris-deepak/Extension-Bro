# Quick Setup Guide

## 1. Install Dependencies
```bash
npm install
```

## 2. Get Gemini API Key
- Visit: https://aistudio.google.com/app/apikey
- Sign in and create API key
- Copy the key

## 3. Configure API Key
```bash
copy src\config\api.example.ts src\config\api.ts
```
Edit `src/config/api.ts` and paste your API key

## 4. Build
```bash
npm run build
```

## 5. Load in Chrome
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `dist` folder

Done! 🎉
