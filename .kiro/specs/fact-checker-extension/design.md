# Design Document

## Overview

The "Is True?" extension is a Chrome browser extension that provides AI-powered fact-checking for selected text on any webpage. The extension leverages Google's Gemini AI API combined with web search context to verify claims and provide detailed reasoning. The design emphasizes a luxurious, premium user experience with sophisticated visual design, smooth animations, and intuitive interactions.

### Key Design Principles

1. **Luxury First**: Premium visual design with sophisticated color palettes, smooth gradients, and elegant typography
2. **Performance**: Fast response times with intelligent caching and optimized API usage
3. **User Control**: Clear on/off toggle with persistent state management
4. **Security**: API keys never exposed to version control, secure configuration pattern
5. **Clarity**: Clear visual feedback for all states (loading, success, error, disabled)
6. **Accessibility**: High contrast ratios, keyboard navigation, screen reader support

## Architecture

### Component Structure

```
is-true/
├── src/
│   ├── popup/                    # Extension popup UI
│   │   ├── App.tsx              # Main popup component with toggle
│   │   └── main.tsx             # Popup entry point
│   │
│   ├── content/                  # Content scripts
│   │   ├── content.ts           # Text selection detection
│   │   └── modal.ts             # Result modal rendering
│   │
│   ├── background/               # Service worker
│   │   └── service-worker.ts    # Message routing & API calls
│   │
│   ├── services/                 # External services
│   │   ├── ai.ts                # Gemini AI integration
│   │   └── cache.ts             # Result caching logic
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Logo.tsx             # Extension logo
│   │   ├── LoadingSpinner.tsx   # Loading animation
│   │   └── VerificationBadge.tsx # Truth/False/Uncertain badge
│   │
│   ├── config/                   # Configuration
│   │   ├── api.example.ts       # API key template
│   │   └── api.ts               # Actual API key (gitignored)
│   │
│   ├── shared/                   # Shared utilities
│   │   ├── messaging.ts         # Chrome message passing
│   │   ├── storage.ts           # Chrome storage helpers
│   │   └── constants.ts         # App constants
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css          # Tailwind + custom styles
│   │
│   └── types/                    # TypeScript types
│       └── index.ts             # Type definitions
│
├── public/
│   └── icons/                    # Extension icons (16, 48, 128)
│
├── scripts/
│   └── generate-icons.js         # Icon generation script
│
└── manifest.json                 # Extension manifest
```

### Communication Flow

```
User Action (Text Selection)
    ↓
Content Script (Detects selection, shows context menu)
    ↓
User Clicks "Verify"
    ↓
Content Script → Service Worker (via chrome.runtime.sendMessage)
    ↓
Service Worker → AI Service (Gemini API call)
    ↓
Service Worker → Content Script (Result via sendResponse)
    ↓
Content Script (Renders Result Modal)
```

## Components and Interfaces

### 1. Popup UI Component

**Purpose**: Main extension interface accessible from browser toolbar

**Visual Design**:
- Dimensions: 400px × 600px
- Color Scheme: Deep royal blue to purple gradient (#0F172A → #1E1B4B → #312E81)
- Accent Colors: Gold (#F59E0B), Platinum (#E5E7EB)
- Typography: Inter for body, Playfair Display for headings
- Effects: Subtle particle animation background, glass morphism cards

**Features**:
- Large, elegant toggle switch with smooth animation (500ms ease-in-out)
- Status indicator with animated glow effect
- Version info and activity status in footer
- Ambient lighting effects that respond to toggle state

**States**:
- **Enabled**: Gold glow, "Active" status, animated particles
- **Disabled**: Muted colors, "Inactive" status, static background
- **Loading**: Skeleton shimmer effect during initialization

### 2. Context Menu Integration

**Trigger**: User selects text (minimum 3 characters, maximum 1000 characters)

**Menu Item**:
- Label: "✓ Verify with Is True?"
- Icon: Checkmark shield icon
- Position: Top of context menu
- Visibility: Only when extension is enabled

**Implementation**:
```typescript
chrome.contextMenus.create({
  id: 'verify-text',
  title: '✓ Verify with Is True?',
  contexts: ['selection']
});
```

### 3. Result Modal Component

**Purpose**: Display verification results overlaid on the current webpage

**Visual Design**:
- Backdrop: Blur effect (blur-xl) with 80% opacity dark overlay
- Modal: 600px max width, glass morphism effect
- Border: 1px subtle gradient border (gold to platinum)
- Shadow: Multi-layer shadow for depth
- Animation: Scale-in entrance (0.95 → 1.0, 400ms cubic-bezier)

**Layout Structure**:
```
┌─────────────────────────────────────┐
│  [Close X]                          │
│                                     │
│  [Verification Badge]               │
│  TRUE / FALSE / UNCERTAIN           │
│                                     │
│  Confidence: 87%                    │
│  [Progress bar with gradient]       │
│                                     │
│  "Selected Text"                    │
│  [Quoted text in elegant card]      │
│                                     │
│  Why this verdict?                  │
│  • Evidence point 1                 │
│  • Evidence point 2                 │
│  • Evidence point 3                 │
│                                     │
│  [Dismiss Button]                   │
└─────────────────────────────────────┘
```

**Verification Badge Design**:
- **TRUE**: Green gradient (#10B981 → #059669), checkmark icon
- **FALSE**: Red gradient (#EF4444 → #DC2626), X icon
- **UNCERTAIN**: Amber gradient (#F59E0B → #D97706), question mark icon
- Size: 80px diameter circle
- Animation: Pulse effect on render
- Glow: Matching color with 40px blur

**Evidence List**:
- Maximum 5 evidence points
- Each point: Bullet with matching verdict color
- Typography: 14px, line-height 1.6
- Spacing: 12px between items

### 4. Loading States

**Inline Indicator** (during API call):
- Position: Top-right corner of viewport
- Design: Compact pill shape (120px × 40px)
- Content: Animated spinner + "Verifying..."
- Colors: Gold gradient background
- Animation: Slide-in from right (300ms)

**Spinner Design**:
- Type: Circular arc spinner
- Size: 20px diameter
- Color: White with gold accent
- Speed: 1 second per rotation
- Style: 3px stroke width, rounded caps

### 5. AI Service Integration

**API Configuration**:
```typescript
interface AIConfig {
  apiKey: string;
  model: 'gemini-flash-latest';
  maxTokens: 2048;
  temperature: 0.3; // Lower for factual accuracy
}
```

**Prompt Engineering**:
```typescript
const prompt = `You are a fact-checking AI assistant. Analyze the following claim and determine its truthfulness.

Claim: "${selectedText}"

Instructions:
1. Search your knowledge base and consider recent information
2. Evaluate the claim's accuracy
3. Provide a verdict: TRUE, FALSE, or UNCERTAIN
4. Assign a confidence level (0-100%)
5. List 2-5 specific evidence points supporting your verdict

Respond in JSON format:
{
  "verdict": "TRUE" | "FALSE" | "UNCERTAIN",
  "confidence": number,
  "evidence": string[],
  "summary": string
}

Be objective, cite specific facts, and acknowledge uncertainty when appropriate.`;
```

**Response Parsing**:
- Extract JSON from AI response using regex
- Validate required fields (verdict, confidence, evidence)
- Fallback to error state if parsing fails
- Log detailed errors for debugging

### 6. Caching System

**Purpose**: Reduce API calls and improve response time for repeated queries

**Implementation**:
```typescript
interface CacheEntry {
  selectedText: string;
  textHash: string; // SHA-256 hash for lookup
  result: VerificationResult;
  timestamp: number;
  expiresAt: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
```

**Cache Strategy**:
1. Hash selected text using SHA-256
2. Check chrome.storage.local for existing entry
3. If found and not expired, return cached result
4. If not found or expired, make API call
5. Store new result with expiration timestamp
6. Implement LRU eviction when storage exceeds 5MB

**Cache Key Generation**:
```typescript
async function generateCacheKey(text: string): Promise<string> {
  const normalized = text.trim().toLowerCase();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

## Data Models

### VerificationResult

```typescript
interface VerificationResult {
  verdict: 'TRUE' | 'FALSE' | 'UNCERTAIN';
  confidence: number; // 0-100
  evidence: string[]; // 2-5 items
  summary: string;
  selectedText: string;
  timestamp: number;
  cached: boolean;
}
```

### ExtensionState

```typescript
interface ExtensionState {
  isEnabled: boolean;
  installDate: number;
  version: string;
  totalVerifications: number;
  lastVerificationDate?: number;
}
```

### Message Types

```typescript
type MessageType =
  | { type: 'VERIFY_TEXT'; payload: { text: string } }
  | { type: 'VERIFICATION_RESULT'; payload: VerificationResult }
  | { type: 'VERIFICATION_ERROR'; payload: { error: string } }
  | { type: 'GET_STATE'; payload: null }
  | { type: 'SET_STATE'; payload: Partial<ExtensionState> };
```

## Error Handling

### Error Categories

1. **API Key Missing**
   - Detection: Check if GEMINI_API_KEY is defined and not placeholder
   - Message: "API key not configured. Please follow setup instructions."
   - Action: Show modal with link to README setup section
   - UI: Warning icon, yellow color scheme

2. **Network Error**
   - Detection: Fetch fails or times out
   - Message: "Unable to connect. Please check your internet connection."
   - Action: Offer retry button
   - UI: Connection icon, gray color scheme

3. **API Error**
   - Detection: API returns error status (401, 429, 500)
   - Message: Specific error based on status code
     - 401: "Invalid API key. Please check your configuration."
     - 429: "Rate limit exceeded. Please try again in a moment."
     - 500: "Service temporarily unavailable. Please try again later."
   - Action: Log detailed error, show user-friendly message
   - UI: Error icon, red color scheme

4. **Timeout Error**
   - Detection: Request exceeds 30 seconds
   - Message: "Request timed out. The claim may be too complex."
   - Action: Suggest shortening the text
   - UI: Clock icon, orange color scheme

5. **Text Length Error**
   - Detection: Selected text exceeds 1000 characters
   - Message: "Text too long. Please select up to 1000 characters."
   - Action: Automatically truncate and show warning
   - UI: Warning icon, yellow color scheme

6. **Parsing Error**
   - Detection: AI response doesn't match expected JSON format
   - Message: "Unable to process response. Please try again."
   - Action: Log raw response for debugging
   - UI: Error icon, red color scheme

### Error Modal Design

```
┌─────────────────────────────────────┐
│  [Close X]                          │
│                                     │
│  [Error Icon]                       │
│  ⚠️                                  │
│                                     │
│  Error Title                        │
│  [Specific error message]           │
│                                     │
│  [Retry Button] [Dismiss Button]    │
└─────────────────────────────────────┘
```

### Retry Logic

```typescript
async function verifyWithRetry(
  text: string,
  maxRetries: number = 2
): Promise<VerificationResult> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await verifyText(text);
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await delay(1000 * Math.pow(2, attempt)); // Exponential backoff
    }
  }
}
```

## Testing Strategy

### Unit Tests

**Coverage Areas**:
1. Cache key generation
2. Text normalization
3. Message passing helpers
4. Storage utilities
5. Error parsing logic

**Test Framework**: Vitest

**Example Test**:
```typescript
describe('generateCacheKey', () => {
  it('should generate consistent hash for same text', async () => {
    const text = 'The Earth is round';
    const hash1 = await generateCacheKey(text);
    const hash2 = await generateCacheKey(text);
    expect(hash1).toBe(hash2);
  });

  it('should generate different hashes for different text', async () => {
    const hash1 = await generateCacheKey('Text A');
    const hash2 = await generateCacheKey('Text B');
    expect(hash1).not.toBe(hash2);
  });
});
```

### Integration Tests

**Test Scenarios**:
1. End-to-end verification flow
2. Cache hit/miss scenarios
3. Error handling paths
4. Toggle state persistence
5. Context menu visibility

**Approach**: Manual testing with test pages

**Test Pages**:
- `test-claims.html`: Page with various factual claims
- `test-errors.html`: Page to trigger error conditions

### Manual Testing Checklist

- [ ] Text selection shows context menu
- [ ] Context menu hidden when extension disabled
- [ ] Verification shows loading indicator
- [ ] Result modal displays correctly
- [ ] All verdict types render properly (TRUE/FALSE/UNCERTAIN)
- [ ] Evidence list formats correctly
- [ ] Modal closes on backdrop click
- [ ] Modal closes on ESC key
- [ ] Toggle persists across browser restarts
- [ ] Cache returns results faster on second verification
- [ ] Error messages display for all error types
- [ ] Retry button works after network error
- [ ] Extension works on all websites
- [ ] No console errors in normal operation

## Design System

### Color Palette

**Primary Colors**:
```css
--royal-blue-950: #0F172A;
--royal-blue-900: #1E293B;
--royal-blue-800: #1E3A8A;
--indigo-900: #312E81;
--indigo-800: #3730A3;
--purple-900: #581C87;
```

**Accent Colors**:
```css
--gold-500: #F59E0B;
--gold-600: #D97706;
--platinum-200: #E5E7EB;
--platinum-300: #D1D5DB;
```

**Semantic Colors**:
```css
--success-500: #10B981;
--success-600: #059669;
--error-500: #EF4444;
--error-600: #DC2626;
--warning-500: #F59E0B;
--warning-600: #D97706;
```

### Typography

**Font Families**:
- Headings: 'Playfair Display', serif
- Body: 'Inter', sans-serif
- Monospace: 'JetBrains Mono', monospace

**Font Sizes**:
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

**Font Weights**:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
```

### Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Circular */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-glow-gold: 0 0 40px rgba(245, 158, 11, 0.4);
--shadow-glow-green: 0 0 40px rgba(16, 185, 129, 0.4);
--shadow-glow-red: 0 0 40px rgba(239, 68, 68, 0.4);
```

### Animations

**Durations**:
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

**Easings**:
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**Keyframes**:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## Icon Design

### Logo Concept

**Visual Elements**:
- Central checkmark symbol
- Shield or badge shape
- Magnifying glass element (subtle)
- Color: Gold gradient (#F59E0B → #D97706)

**Generation Script**:
```javascript
// scripts/generate-icons.js
const { createCanvas } = require('canvas');

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#0F172A');
  gradient.addColorStop(1, '#312E81');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Shield shape
  ctx.fillStyle = '#F59E0B';
  // ... draw shield path
  
  // Checkmark
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = 'round';
  // ... draw checkmark path
  
  return canvas.toBuffer('image/png');
}
```

### Icon Sizes

- **16×16**: Toolbar icon (simplified design)
- **48×48**: Extension management page
- **128×128**: Chrome Web Store listing

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Load modal components only when needed
2. **Debouncing**: Prevent rapid-fire verification requests
3. **Caching**: Store results for 24 hours
4. **Text Truncation**: Limit to 1000 characters
5. **Request Timeout**: Cancel after 30 seconds
6. **Minimal DOM Manipulation**: Use shadow DOM for modal
7. **CSS Containment**: Isolate modal styles

### Performance Targets

- Context menu appearance: < 50ms
- Modal render time: < 100ms
- Cached result display: < 200ms
- API response time: < 5 seconds (typical)
- Memory usage: < 50MB
- Storage usage: < 5MB

### Monitoring

```typescript
// Performance tracking
const metrics = {
  verificationCount: 0,
  cacheHitRate: 0,
  averageResponseTime: 0,
  errorRate: 0
};

function trackVerification(cached: boolean, duration: number) {
  metrics.verificationCount++;
  if (cached) metrics.cacheHitRate++;
  metrics.averageResponseTime = 
    (metrics.averageResponseTime + duration) / 2;
}
```

## Security Considerations

### API Key Protection

1. **Never commit api.ts**: Included in .gitignore
2. **Example file pattern**: Provide api.example.ts with placeholder
3. **Runtime validation**: Check for placeholder values
4. **Clear documentation**: Setup instructions in README

### Content Security Policy

```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### Permissions Justification

- **storage**: Persist toggle state and cache
- **activeTab**: Access selected text on current tab
- **scripting**: Inject content script for modal
- **contextMenus**: Add "Verify" option to context menu

### Data Privacy

- No user data collected or transmitted
- No analytics or tracking
- API calls only contain selected text
- Cache stored locally only
- No third-party services except Gemini API

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate through modal elements
- **Escape**: Close modal
- **Enter**: Activate buttons
- **Space**: Toggle switch in popup

### Screen Reader Support

```html
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Verification Result</h2>
  <div role="status" aria-live="polite">
    <!-- Result content -->
  </div>
</div>
```

### Color Contrast

- All text meets WCAG AA standards (4.5:1 minimum)
- Interactive elements meet AAA standards (7:1)
- Focus indicators clearly visible

### Focus Management

- Trap focus within modal when open
- Return focus to trigger element on close
- Clear focus indicators on all interactive elements

## Browser Compatibility

### Target Browsers

- Chrome: 88+
- Edge: 88+
- Brave: Latest
- Opera: Latest

### Feature Detection

```typescript
const isSupported = 
  typeof chrome !== 'undefined' &&
  chrome.runtime &&
  chrome.storage &&
  chrome.contextMenus;
```

### Polyfills

None required for target browsers.

## Deployment

### Build Process

```bash
npm run build
```

**Output**: `dist/` folder with:
- Bundled JavaScript
- Processed CSS
- Manifest file
- Icons
- HTML files

### Distribution

1. **Local Development**: Load unpacked from `dist/`
2. **Chrome Web Store**: Create ZIP of `dist/` folder
3. **Version Management**: Semantic versioning (MAJOR.MINOR.PATCH)

### Update Strategy

- Automatic updates via Chrome Web Store
- Preserve user settings during updates
- Migration scripts for breaking changes

## Future Enhancements

### Potential Features

1. **Source Citations**: Link to specific sources used in verification
2. **History View**: See past verifications
3. **Keyboard Shortcut**: Quick verify with Ctrl+Shift+V
4. **Batch Verification**: Verify multiple claims at once
5. **Custom Prompts**: User-defined verification criteria
6. **Export Results**: Save verifications as PDF/JSON
7. **Confidence Threshold**: Only show high-confidence results
8. **Multi-language Support**: Verify claims in different languages

### Scalability Considerations

- Implement request queuing for high-volume usage
- Add rate limiting to prevent API quota exhaustion
- Consider alternative AI providers for redundancy
- Implement progressive enhancement for slow connections
