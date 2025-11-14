# Extension Bro 🚀

> Professional Chrome Extension Template - Build production-ready extensions in minutes

A premium Chrome extension boilerplate with luxury UI, TypeScript, React, and modern development tools. Includes a powerful CLI generator and two production-ready example extensions to get you started.

---

## 🎯 Main Product: Skeleton Crew Template

**The ultimate Chrome extension boilerplate for professional developers.**

### ✨ Features

- 🎨 **Luxury Design System** - Premium gradients, glass morphism, smooth animations
- ⚡ **Lightning Fast** - Vite for instant HMR and optimized builds
- � *o*TypeScript First** - Full type safety across the entire codebase
- ⚛️ **React 18** - Modern React with hooks and best practices
- 🎨 **Tailwind CSS** - Utility-first styling with custom design tokens
- 🔧 **Manifest V3** - Latest Chrome extension standard
- 🎯 **Complete Architecture** - Popup, content scripts, service worker
- 📦 **Auto-Generated Icons** - Professional icons with one command
- � **MeDssage Passing** - Built-in communication system
- 💾 **Storage Helpers** - Easy Chrome storage integration
- 🧪 **Testing Ready** - Vitest configured and ready
- 📚 **Comprehensive Docs** - Everything you need to know

### 🚀 Quick Start

```bash
# Use the generator to create a new extension
node generate-bro.js

# Or manually copy the template
cd "Skeleton Crew"
npm install
npm run build

# Load in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the dist folder
```

### 📁 Template Structure

```
Skeleton Crew/
├── src/
│   ├── popup/              # Extension popup UI (React)
│   │   ├── App.tsx         # Main popup component
│   │   └── main.tsx        # Entry point
│   │
│   ├── content/            # Content scripts (inject into pages)
│   │   └── content.ts      # Main content script
│   │
│   ├── background/         # Service worker (background tasks)
│   │   └── service-worker.ts
│   │
│   ├── shared/             # Shared utilities
│   │   ├── messaging.ts    # Message passing helpers
│   │   └── storage.ts      # Chrome storage helpers
│   │
│   └── types/              # TypeScript types
│       └── index.ts
│
├── public/
│   └── icons/              # Extension icons (auto-generated)
│
├── scripts/
│   ├── generate-icons.js   # Icon generator
│   └── copy-manifest.js    # Build helper
│
├── index.html              # Popup HTML
├── manifest.json           # Extension manifest
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind + design tokens
```

### 🎨 Design System

**Premium Color Palette:**
- Royal Blue → Indigo → Purple gradients
- Gold accents for premium feel
- Glass morphism with backdrop blur
- Multi-layer shadows for depth

**Typography:**
- Headings: Playfair Display (elegant serif)
- Body: Inter (modern sans-serif)

**Animations:**
- 300-500ms smooth transitions
- Cubic-bezier easing
- Loading states and spinners

[📖 Full Documentation](./Skeleton%20Crew/README.md)

---

## 🛠️ CLI Generator: Generate Bro

**Instantly create new extensions from the template.**

### Usage

```bash
# Interactive mode
node generate-bro.js

# Follow the prompts
Enter your extension name: My Awesome Extension
Enter folder name: my-awesome-extension
Install dependencies? y

# Done! Your extension is ready
cd my-awesome-extension
npm run dev
```

### What It Does

- ✅ Copies all template files
- ✅ Replaces extension name throughout
- ✅ Skips build artifacts and lock files
- ✅ Optionally installs dependencies
- ✅ Creates ready-to-develop project

[📖 Generator Documentation](./GENERATOR_README.md)

---

## 📚 Example Extensions

Two production-ready extensions built with the Skeleton Crew template to demonstrate its capabilities.

### Example 1: Is True? ✓

**AI-powered fact-checking extension**

Demonstrates:
- ✅ Google Gemini AI integration
- ✅ Context menu implementation
- ✅ Modal overlays in content scripts
- ✅ Complex state management
- ✅ API key configuration
- ✅ Loading states and animations
- ✅ Error handling

**Features:**
- Select text → Right-click → Verify facts
- TRUE/FALSE/UNCERTAIN verdicts
- Confidence ratings and evidence
- Luxury gold shield icon

**Tech Highlights:**
- `@google/genai` SDK integration
- Chrome context menus API
- Dynamic content script injection
- Chrome storage for caching

[📖 View Example](./is-true/README.md)

---

### Example 2: Spam Detector 🛡️

**Real-time website protection extension**

Demonstrates:
- ✅ Automatic page analysis
- ✅ Background AI processing
- ✅ Warning modal system
- ✅ Toggle state persistence
- ✅ Real-time content monitoring
- ✅ Service worker patterns

**Features:**
- Automatic website scanning
- AI-powered threat detection
- Warning modals for dangerous sites
- Emerald shield icon

**Tech Highlights:**
- Page load event handling
- Background service worker communication
- Real-time DOM monitoring
- Persistent toggle state

[📖 View Example](./spam-detector/README.md)

---

## 🎯 Why Use This Template?

### For Developers

✅ **Save Weeks of Setup** - Everything configured and ready  
✅ **Best Practices** - Industry-standard architecture  
✅ **Type Safety** - Catch errors before runtime  
✅ **Modern Stack** - Latest tools and frameworks  
✅ **Production Ready** - Build and ship immediately  

### For Businesses

✅ **Professional UI** - Luxury design out of the box  
✅ **Scalable** - Clean architecture for growth  
✅ **Maintainable** - Well-organized codebase  
✅ **Fast Development** - Rapid prototyping to production  
✅ **Cost Effective** - Reduce development time  

### For Learners

✅ **Complete Examples** - Two real-world extensions  
✅ **Comprehensive Docs** - Learn as you build  
✅ **Modern Patterns** - Industry best practices  
✅ **Active Development** - Regular updates  
✅ **Community Support** - Get help when needed  

---

## 🚀 Getting Started

### Option 1: Use the Generator (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd Extension-Bro

# Generate a new extension
node generate-bro.js

# Follow the prompts and start coding!
```

### Option 2: Manual Setup

```bash
# Copy the template
cp -r "Skeleton Crew" my-extension
cd my-extension

# Install dependencies
npm install

# Start developing
npm run dev
```

### Option 3: Study the Examples

```bash
# Try the fact-checker
cd is-true
npm install
# Configure API key (see README)
npm run build

# Or try the spam detector
cd spam-detector
npm install
# Configure API key (see README)
npm run build
```

---

## 📖 Documentation

### Template Documentation
- [📘 Complete Guide](./Skeleton%20Crew/README.md) - Full template documentation
- [🚀 Quick Start](./Skeleton%20Crew/QUICKSTART.md) - Get started in 5 minutes
- [✨ Features](./Skeleton%20Crew/FEATURES.md) - What's included
- [🔧 Development](./Skeleton%20Crew/DEVELOPMENT.md) - Development patterns
- [💡 Examples](./Skeleton%20Crew/EXAMPLES.md) - Code examples
- [🎨 Design System](./Skeleton%20Crew/DESIGN_SYSTEM.md) - Design tokens

### Example Extensions
- [Is True? Documentation](./is-true/README.md)
- [Spam Detector Documentation](./spam-detector/README.md)

### External Resources
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 🛠️ Tech Stack

### Core
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Chrome Manifest V3** - Latest extension standard

### Development
- **Vitest** - Fast unit testing
- **PostCSS** - CSS processing
- **ESLint Ready** - Code linting
- **Prettier Ready** - Code formatting

### Optional (Examples)
- **Google Gemini AI** - AI capabilities
- **@google/genai** - Official SDK

---

## 🎨 What You Get

### UI Components
- ✅ Premium popup interface
- ✅ Toast notification system
- ✅ Loading spinners and states
- ✅ Modal overlays
- ✅ Toggle switches
- ✅ Gradient backgrounds
- ✅ Glass morphism effects

### Functionality
- ✅ Chrome storage helpers
- ✅ Message passing system
- ✅ Content script injection
- ✅ Service worker setup
- ✅ Context menu integration
- ✅ Tab management
- ✅ Event handling

### Developer Experience
- ✅ Hot module replacement
- ✅ TypeScript autocomplete
- ✅ Build optimization
- ✅ Icon generation
- ✅ Manifest copying
- ✅ Error handling
- ✅ Testing setup

---

## 💡 Use Cases

### What You Can Build

**Productivity Tools**
- Task managers
- Note-taking apps
- Time trackers
- Calendar integrations

**AI-Powered Extensions**
- Content generators
- Text analyzers
- Translation tools
- Summarizers

**Web Enhancement**
- Ad blockers
- Dark mode toggles
- Screenshot tools
- Page modifiers

**Security & Privacy**
- Password managers
- Cookie cleaners
- Tracker blockers
- VPN controllers

**Developer Tools**
- Code formatters
- API testers
- Color pickers
- CSS inspectors

---

## 🔧 Development Workflow

### 1. Create Extension
```bash
node generate-bro.js
cd your-extension
npm install
```

### 2. Develop
```bash
npm run dev        # Start dev server (popup UI)
npm run build      # Build extension
npm run typecheck  # Check types
npm test           # Run tests
```

### 3. Test in Chrome
```bash
# After building:
# 1. chrome://extensions/
# 2. Enable "Developer mode"
# 3. Load unpacked → Select dist folder
```

### 4. Customize
- Edit `manifest.json` for name/permissions
- Modify `tailwind.config.js` for colors
- Update `src/popup/App.tsx` for UI
- Add features in `src/content/` or `src/background/`

### 5. Build for Production
```bash
npm run build
npm run zip  # Create distribution ZIP
```

---

## 🎯 Roadmap

### Template Enhancements
- [ ] More UI components (modals, dropdowns, forms)
- [ ] Additional utility functions
- [ ] More design system tokens
- [ ] Internationalization support
- [ ] Dark/light mode toggle
- [ ] Advanced animation library

### Developer Tools
- [ ] VS Code extension for generator
- [ ] Live reload for content scripts
- [ ] Chrome Web Store deployment guide
- [ ] Automated testing examples
- [ ] Performance monitoring

### Example Extensions
- [ ] Email Assistant - AI email writing
- [ ] Translator Pro - Real-time translation
- [ ] Color Picker - Advanced color tools
- [ ] Screenshot Tool - Capture and annotate
- [ ] Password Manager - Secure storage

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation
- Keep commits clear and atomic

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details.

**Free to use for:**
- ✅ Personal projects
- ✅ Commercial applications
- ✅ Open source projects
- ✅ Client work

---

## 🙏 Acknowledgments

**Built With:**
- [React](https://react.dev/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

**Design Inspiration:**
- Apple's design language
- Google Material Design
- Modern SaaS applications

**AI Integration:**
- [Google Gemini AI](https://ai.google.dev/) - Example extensions

---

## 📊 Project Stats

- **1 Professional Template** - Production-ready boilerplate
- **1 CLI Generator** - Instant project creation
- **2 Example Extensions** - Real-world implementations
- **100% TypeScript** - Full type safety
- **React 18** - Modern UI
- **Manifest V3** - Latest standard
- **Comprehensive Docs** - Everything documented

---

## 💬 Support

### Get Help
- 📖 Read the [documentation](./Skeleton%20Crew/README.md)
- 🐛 [Report bugs](https://github.com/yourusername/extension-bro/issues)
- 💡 [Request features](https://github.com/yourusername/extension-bro/issues)
- 💬 Ask questions in discussions

### Contact
- **Author:** Deepu
- **GitHub:** [@yourusername](https://github.com/yourusername)

---

## ⭐ Show Your Support

If this template helps you:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code
- 📢 Share with others
- ☕ [Buy me a coffee](https://buymeacoffee.com/yourusername)

---

<div align="center">

**Made with ❤️ by Deepu**

*Build amazing Chrome extensions in minutes, not weeks.*

[⬆ Back to Top](#extension-bro-)

</div>
