# 🚀 Deployment Guide

## Testing Locally

1. **Build the extension**:
   ```bash
   npm run build
   ```

2. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `spam-detector/dist` folder
   - Done! The extension is now active

3. **Test it**:
   - Click the extension icon in toolbar
   - Toggle protection ON
   - Visit any website
   - Watch for "Analyzing..." indicator in top right
   - Safe sites show "Secure Site" briefly
   - Malicious sites trigger a warning modal

## Publishing to Chrome Web Store

### Prerequisites

- Google account
- $5 one-time developer registration fee
- High-quality screenshots (1280x800 or 640x400)
- Promotional images (optional but recommended)

### Steps

1. **Prepare assets**:
   - Take screenshots of your extension
   - Create a 128x128 icon (already in `public/icons/128.png`)
   - Write a compelling description

2. **Create ZIP**:
   ```bash
   cd dist
   # Windows:
   tar -a -c -f spam-detector.zip *
   # Mac/Linux:
   zip -r spam-detector.zip *
   ```

3. **Upload**:
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Click "New Item"
   - Upload `spam-detector.zip`
   - Fill in store listing details
   - Submit for review

4. **Store Listing Info**:
   - **Name**: Spam Detector
   - **Summary**: AI-powered protection from malicious websites
   - **Description**: See below
   - **Category**: Productivity
   - **Language**: English

### Recommended Description

```
🛡️ Spam Detector - AI-Powered Website Protection

Stay safe online with real-time AI analysis of every website you visit.

✨ KEY FEATURES:
• AI-powered threat detection using Google Gemini
• Real-time website analysis
• Beautiful, non-intrusive notifications
• Lightweight and fast
• Privacy-focused - no data collection

🎯 HOW IT WORKS:
1. Enable protection with one click
2. Browse normally
3. Get instant warnings about malicious sites
4. Stay protected automatically

🔒 PRIVACY:
• No tracking or analytics
• No data collection
• All processing happens locally
• Open source code

Perfect for anyone who wants an extra layer of security while browsing.
```

### Screenshots to Include

1. Extension popup (toggle ON)
2. "Analyzing..." indicator
3. "Secure Site" notification
4. Warning modal for malicious site
5. Extension popup (toggle OFF)

## Updating the Extension

1. **Update version** in `manifest.json`:
   ```json
   {
     "version": "1.0.1"
   }
   ```

2. **Rebuild**:
   ```bash
   npm run build
   ```

3. **Create new ZIP** and upload to Chrome Web Store

4. **Users get auto-update** within a few hours

## Best Practices

- Test thoroughly before publishing
- Respond to user reviews
- Keep the extension updated
- Monitor error reports in Developer Dashboard
- Follow Chrome Web Store policies

## Support

If users report issues:
1. Check Chrome Web Store reviews
2. Look at error logs in Developer Dashboard
3. Test with the reported scenario
4. Fix and push update

## Marketing Tips

- Share on social media
- Post on Product Hunt
- Write a blog post
- Create a demo video
- Engage with users in reviews
