import { analyzeSite } from '../services/ai'

console.log('🛡️ Spam Detector: Service worker initialized')

chrome.runtime.onInstalled.addListener((details) => {
  console.log('✅ Extension installed:', details.reason)

  if (details.reason === 'install') {
    chrome.storage.local.set({
      spamDetectorEnabled: true,
      installDate: Date.now(),
      version: chrome.runtime.getManifest().version
    })
  }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ANALYZE_SITE') {
    handleAnalyzeSite(message.payload)
      .then(result => sendResponse(result))
      .catch(error => {
        console.error('Analysis error:', error)
        sendResponse({ isMalicious: false, error: error.message })
      })
    return true
  }
  
  return false
})

async function handleAnalyzeSite(payload: { url: string; content: string }) {
  console.log('🔍 Background: Received analysis request');
  console.log('URL:', payload.url);
  console.log('Content length:', payload.content.length);
  
  try {
    const result = await analyzeSite(payload.url, payload.content)
    
    console.log('🎯 Analysis Result:', result);
    
    // Update badge based on result
    if (result.isMalicious) {
      console.log('⚠️ MALICIOUS SITE DETECTED!');
      chrome.action.setBadgeText({ text: '!' })
      chrome.action.setBadgeBackgroundColor({ color: '#ef4444' })
    } else {
      console.log('✅ Site appears safe');
      chrome.action.setBadgeText({ text: '✓' })
      chrome.action.setBadgeBackgroundColor({ color: '#10b981' })
    }
    
    // Clear badge after 3 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({ text: '' })
    }, 3000)
    
    return result
  } catch (error) {
    console.error('❌ AI analysis failed:', error)
    return { isMalicious: false, confidence: 0, reason: 'Analysis failed', category: 'safe' }
  }
}
