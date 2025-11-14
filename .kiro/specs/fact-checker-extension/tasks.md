# Implementation Plan

- [x] 1. Set up API key configuration





  - Create `src/config/api.example.ts` with placeholder: `export const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';`
  - Add `src/config/api.ts` to `.gitignore`
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 2. Add type definitions





  - Add `VerificationResult` interface to `src/types/index.ts` with verdict, confidence, evidence fields
  - Add message types for VERIFY_TEXT and VERIFICATION_RESULT
  - _Requirements: 1.4, 5.1, 5.2_

- [x] 3. Create AI service for fact-checking





  - [x] 3.1 Create `src/services/ai.ts` file


    - Import Google GenAI SDK and API key
    - Export `verifyText` function that takes text string as parameter
    - _Requirements: 1.2, 3.1_
  

  - [x] 3.2 Implement verification prompt




    - Create prompt asking AI to verify the claim as TRUE, FALSE, or UNCERTAIN
    - Request confidence percentage (0-100) and 2-5 evidence points
    - Request JSON response format
    - _Requirements: 5.1, 5.2, 5.3_

  
  - [x] 3.3 Parse AI response





    - Extract JSON from response text using regex
    - Return VerificationResult object
    - Handle errors by returning error message
    - _Requirements: 5.4, 6.6_

- [x] 4. Update service worker





  - Listen for extension install and set `isTrueEnabled: true` in storage
  - Listen for VERIFY_TEXT messages from content script
  - Call AI service with selected text
  - Send result back to content script
  - _Requirements: 2.5, 1.2_

- [x] 5. Build luxurious popup UI





  - [x] 5.1 Update `src/popup/App.tsx` with premium design


    - Change title to "Is True?" with elegant serif font (Playfair Display or similar)
    - Change subtitle to "AI-Powered Fact Checking"
    - Create deep gradient background: royal blue (#0F172A) → indigo (#1E1B4B) → purple (#312E81)
    - Add subtle animated particles or mesh gradient background
    - Add ambient glow effects with blur filters
    - Use glass morphism cards with backdrop-blur
    - Ensure smooth animations (500ms ease-in-out transitions)
    - _Requirements: 4.1, 4.2, 4.3_
  
  - [x] 5.2 Add premium toggle switch

    - Load `isTrueEnabled` state from storage on mount
    - Create large, elegant toggle switch (64px width) with smooth animation
    - Apply gold/amber gradient (#F59E0B → #D97706) when enabled
    - Add glow effect around toggle when active
    - Show animated checkmark icon inside toggle knob when enabled
    - Display status with elegant typography and animated status dot
    - Save state to storage when toggled
    - _Requirements: 2.1, 2.2, 2.4, 4.3_
  
  - [x] 5.3 Add premium visual elements

    - Create custom logo/icon with shield and checkmark (gold gradient)
    - Add subtle grid pattern overlay
    - Add floating ambient light effects
    - Use premium shadows (multi-layer, soft)
    - Ensure all spacing follows 8px grid system
    - Use Inter font for body text, Playfair Display for headings
    - _Requirements: 4.1, 4.2_

- [x] 6. Implement content script for text selection




  - [x] 6.1 Update `src/content/content.ts`


    - Check if extension is enabled from storage
    - Exit if disabled
    - _Requirements: 2.3_
  
  - [x] 6.2 Add context menu


    - Create context menu in service worker with "✓ Verify with Is True?" label
    - Show only when text is selected
    - Listen for menu clicks in content script
    - _Requirements: 1.1_
  
  - [x] 6.3 Handle verification request with premium loading indicator


    - Get selected text when context menu clicked
    - Create elegant loading indicator (pill shape, 140px × 44px)
    - Position at top-right corner with 16px margin
    - Apply gold gradient background with glow effect
    - Show spinning icon + "Verifying..." text
    - Add slide-in animation from right (300ms)
    - Send VERIFY_TEXT message to service worker
    - Wait for response
    - _Requirements: 1.2, 4.4, 7.1_

- [x] 7. Create luxurious result modal





  - [x] 7.1 Build premium modal structure


    - Create overlay with blur backdrop (backdrop-filter: blur(12px)) and 85% dark opacity
    - Create modal container (max 600px width) with glass morphism effect
    - Add elegant gradient border (1px, gold to platinum)
    - Apply multi-layer shadows for depth
    - Add scale-in animation (0.95 → 1.0, 400ms cubic-bezier)
    - Add premium close button (top-right, hover effects)
    - _Requirements: 1.3, 4.1, 4.2_
  
  - [x] 7.2 Display verification result with luxury design


    - Create large circular verdict badge (80px diameter) with glow effect
    - TRUE: Emerald gradient (#10B981 → #059669) with checkmark icon and green glow
    - FALSE: Red gradient (#EF4444 → #DC2626) with X icon and red glow
    - UNCERTAIN: Amber gradient (#F59E0B → #D97706) with question mark icon and amber glow
    - Add pulse animation to badge on render
    - Show verdict text below badge with elegant typography
    - Display confidence percentage with large numbers and animated gradient progress bar
    - Show selected text in elegant quote card with subtle background and border
    - Display evidence list with custom styled bullets matching verdict color
    - Use proper spacing (24px between sections) and typography hierarchy
    - _Requirements: 1.4, 5.1, 5.2, 5.3, 5.4, 4.1, 4.2_
  
  - [x] 7.3 Add smooth modal interactions

    - Close on backdrop click with fade-out animation
    - Close on ESC key press
    - Close on X button click
    - Add elegant dismiss button at bottom with hover effects
    - Ensure all interactions have smooth transitions
    - _Requirements: 1.5, 4.3_
  
  - [x] 7.4 Handle errors with premium design


    - Show error icon with red glow effect
    - Display error message with clear typography
    - Show specific messages: "API key not configured", "Network error", "Service unavailable"
    - Add elegant retry button for recoverable errors
    - Use red color scheme but maintain luxury aesthetic
    - _Requirements: 6.1, 6.2, 6.3_

- [x] 8. Create premium design system





  - [x] 8.1 Configure Tailwind with luxury colors


    - Add royal blue shades (#0F172A, #1E293B, #1E3A8A)
    - Add indigo shades (#312E81, #3730A3)
    - Add purple shades (#581C87, #6B21A8)
    - Add gold/amber accents (#F59E0B, #D97706, #B45309)
    - Add platinum/silver (#E5E7EB, #D1D5DB)
    - Add semantic colors (success green, error red, warning amber)
    - _Requirements: 4.1, 4.2_
  
  - [x] 8.2 Add premium typography


    - Import Google Fonts: Inter (body), Playfair Display (headings)
    - Configure font sizes (12px to 48px scale)
    - Set proper font weights (400, 500, 600, 700)
    - Configure line heights for readability
    - _Requirements: 4.1, 4.2_
  
  - [x] 8.3 Create custom gradients and effects


    - Define luxury gradients (royal-blue-to-purple, gold-to-amber)
    - Create glow effects (box-shadow with blur and color)
    - Add glass morphism utilities (backdrop-blur, transparency)
    - Define multi-layer shadows for depth
    - _Requirements: 4.1, 4.2_
  
  - [x] 8.4 Add smooth animations


    - Create keyframes: fadeIn, scaleIn, slideInRight, pulse, spin
    - Set animation durations (150ms, 300ms, 500ms)
    - Use cubic-bezier easings for smooth motion
    - Add hover and active state transitions
    - _Requirements: 4.3_
  
  - [x] 8.5 Ensure accessibility


    - Verify all text has 4.5:1 contrast ratio minimum
    - Add focus indicators for keyboard navigation
    - Ensure all interactive elements are accessible
    - Test with different browser themes (light/dark)
    - _Requirements: 4.1, 4.2_

- [x] 9. Update manifest




  - Change name to "Is True?"
  - Update description to "AI-powered fact-checking for selected text"
  - Add contextMenus permission
  - _Requirements: 1.1_

- [x] 10. Write README





  - Add overview of extension
  - Document how to get Gemini API key
  - Explain how to create `src/config/api.ts` from example file
  - Add build and installation instructions
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 11. Test the extension





  - Build extension with `npm run build`
  - Load in Chrome and test toggle
  - Select text on a webpage and verify it works
  - Test with TRUE, FALSE, and UNCERTAIN claims
  - Verify modal displays correctly
  - Test error handling (no API key, network error)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.3, 5.1, 6.1_
