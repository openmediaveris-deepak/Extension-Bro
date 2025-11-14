console.log('🛡️ Spam Detector: Content script loaded')

let isAnalyzing = false

// Check if protection is enabled and analyze page
async function checkAndAnalyzePage() {
  try {
    // Check if protection is enabled
    const result = await chrome.storage.local.get('spamDetectorEnabled')
    const isEnabled = result.spamDetectorEnabled ?? true
    
    if (isEnabled === false) {
      console.log('🛡️ Protection is disabled')
      return
    }

    if (isAnalyzing) return
    isAnalyzing = true

    showAnalyzingIndicator()

    const pageContent = extractPageContent()
    
    // Send to background for AI analysis
    chrome.runtime.sendMessage({
      type: 'ANALYZE_SITE',
      payload: {
        url: window.location.href,
        content: pageContent
      }
    }, (response) => {
      hideAnalyzingIndicator()
      isAnalyzing = false

      if (chrome.runtime.lastError) {
        console.error('Message error:', chrome.runtime.lastError)
        return
      }

      if (response?.isMalicious) {
        showWarningModal(response)
      } else {
        showSafeIndicator()
      }
    })
  } catch (error) {
    console.error('Analysis error:', error)
    hideAnalyzingIndicator()
    isAnalyzing = false
  }
}

function extractPageContent(): string {
  const title = document.title
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
  const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent?.trim()).filter(Boolean).join(' ')
  const links = Array.from(document.querySelectorAll('a')).slice(0, 10).map(a => a.href).join(' ')
  const bodyText = document.body.innerText.substring(0, 2000)
  
  return `Title: ${title}\nDescription: ${metaDesc}\nHeadings: ${headings}\nLinks: ${links}\nContent: ${bodyText}`
}

function showAnalyzingIndicator() {
  const existing = document.getElementById('spam-detector-analyzing')
  if (existing) return

  const indicator = document.createElement('div')
  indicator.id = 'spam-detector-analyzing'
  indicator.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <svg style="width: 16px; height: 16px; animation: spin 1s linear infinite;" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
        <path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2z"/>
      </svg>
      <span style="font-weight: 600;">Analyzing...</span>
    </div>
  `
  indicator.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    color: #fbbf24;
    padding: 12px 20px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
    z-index: 2147483647;
    backdrop-filter: blur(10px);
    animation: slideIn 0.3s ease;
  `
  
  const style = document.createElement('style')
  style.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `
  document.head.appendChild(style)
  document.body.appendChild(indicator)
}

function hideAnalyzingIndicator() {
  const indicator = document.getElementById('spam-detector-analyzing')
  if (indicator) {
    indicator.style.animation = 'slideIn 0.3s ease reverse'
    setTimeout(() => indicator.remove(), 300)
  }
}

function showSafeIndicator() {
  const indicator = document.createElement('div')
  indicator.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <svg style="width: 16px; height: 16px;" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span style="font-weight: 600;">Secure Site</span>
    </div>
  `
  indicator.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    color: #10b981;
    padding: 12px 20px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(16, 185, 129, 0.2);
    z-index: 2147483647;
    backdrop-filter: blur(10px);
    animation: slideIn 0.3s ease;
  `
  document.body.appendChild(indicator)
  
  setTimeout(() => {
    indicator.style.animation = 'slideIn 0.3s ease reverse'
    setTimeout(() => indicator.remove(), 300)
  }, 2000)
}

function showWarningModal(analysis: any) {
  const modal = document.createElement('div')
  modal.id = 'spam-detector-warning'
  modal.innerHTML = `
    <div style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); z-index: 2147483647; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease;">
      <div style="background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); border-radius: 24px; padding: 32px; max-width: 480px; width: 90%; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1); animation: scaleIn 0.3s ease;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 80px; height: 80px; margin: 0 auto 16px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 40px rgba(239, 68, 68, 0.4);">
            <svg style="width: 40px; height: 40px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h2 style="color: white; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">⚠️ Warning: Malicious Site Detected</h2>
          <p style="color: #a3a3a3; font-size: 14px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">This website may be dangerous</p>
        </div>
        
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #f87171; font-size: 14px; margin: 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
            <strong>Threat Type:</strong> ${analysis.category || 'Unknown'}<br>
            <strong>Confidence:</strong> ${analysis.confidence}%<br>
            <strong>Reason:</strong> ${analysis.reason}
          </p>
        </div>
        
        <div style="display: flex; gap: 12px;">
          <button id="spam-detector-go-back" style="flex: 1; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3); transition: transform 0.2s;">
            ← Go Back
          </button>
          <button id="spam-detector-proceed" style="flex: 1; background: rgba(255, 255, 255, 0.1); color: #a3a3a3; border: 1px solid rgba(255, 255, 255, 0.1); padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; transition: all 0.2s;">
            Proceed Anyway
          </button>
        </div>
      </div>
    </div>
  `
  
  const style = document.createElement('style')
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    #spam-detector-go-back:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4); }
    #spam-detector-proceed:hover { background: rgba(255, 255, 255, 0.15); color: white; }
  `
  document.head.appendChild(style)
  document.body.appendChild(modal)
  
  document.getElementById('spam-detector-go-back')?.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = 'https://www.google.com'
    }
  })
  
  document.getElementById('spam-detector-proceed')?.addEventListener('click', () => {
    modal.remove()
  })
}

// Run analysis on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAndAnalyzePage)
} else {
  checkAndAnalyzePage()
}

// Listen for URL changes (SPAs)
let lastUrl = window.location.href
new MutationObserver(() => {
  const currentUrl = window.location.href
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl
    setTimeout(checkAndAnalyzePage, 500)
  }
}).observe(document, { subtree: true, childList: true })
