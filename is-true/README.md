# Is True? ✓

AI-powered fact-checking Chrome extension. Select any text on the web, right-click, and instantly verify its truthfulness using Google's Gemini AI.

## Features

- 🤖 **AI-Powered Verification** - Uses Google Gemini AI for fact-checking
- ⚡ **Instant Results** - Fast verification with confidence ratings
- 🎨 **Luxury UI** - Premium design with smooth animations
- 🛡️ **Three Verdict Types** - TRUE, FALSE, or UNCERTAIN
- 📊 **Confidence Ratings** - See how confident the AI is
- 📝 **Detailed Evidence** - Get supporting evidence for every verdict

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 3. Configure API Key

```bash
# Copy the example config file
copy src\config\api.example.ts src\config\api.ts
```

Edit `src/config/api.ts` and add your API key:

```typescript
export const GEMINI_API_KEY = 'your-actual-api-key-here';
```

### 4. Build Extension

```bash
npm run build
```

### 5. Load in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `dist` folder
5. Done! The extension is now active

## Usage

1. **Enable the extension** - Click the extension icon and make sure toggle is ON (gold)
2. **Select text** - Highlight any text on a webpage
3. **Right-click** - Choose "✓ Verify with Is True?"
4. **View results** - See the verdict with confidence rating and evidence

## Verdicts

- 🟢 **TRUE** - The claim is factually accurate
- 🔴 **FALSE** - The claim is factually incorrect
- 🟡 **UNCERTAIN** - Insufficient evidence or ambiguous claim

## Development

```bash
# Start dev server (for popup UI development)
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Run tests
npm test

# Generate icons
npm run generate-icons
```

## Project Structure

```
is-true/
├── src/
│   ├── popup/              # Extension popup UI
│   ├── content/            # Content scripts (modal, text selection)
│   ├── background/         # Service worker
│   ├── services/           # AI service (Gemini integration)
│   ├── config/             # API key configuration
│   └── types/              # TypeScript types
├── public/
│   └── icons/              # Extension icons
└── dist/                   # Built extension (load this in Chrome)
```

## Troubleshooting

### "API key not configured" error
- Make sure you created `src/config/api.ts` (not just the example file)
- Verify your API key is correct
- Rebuild: `npm run build`
- Reload extension in Chrome

### Context menu doesn't appear
- Make sure toggle is ON in the popup
- Refresh the webpage
- Reload extension in `chrome://extensions/`

### Icons not showing
- Rebuild: `npm run build`
- Reload extension in Chrome
- If still not working, remove and re-add the extension

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini AI
- Chrome Extension Manifest V3

## License

MIT

---

Made with ❤️ by Deepu
