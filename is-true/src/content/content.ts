/**
 * Content Script
 * 
 * This script runs in the context of web pages.
 * It can access and modify the DOM, but runs in an isolated environment.
 * 
 * Use cases:
 * - Modify page content
 * - Extract data from pages
 * - Inject UI elements
 * - Listen to page events
 */

console.log('🚀 Content script loaded on:', window.location.href)

// Check if extension is enabled
let isExtensionEnabled = true

async function checkExtensionStatus() {
  try {
    const result = await chrome.storage.local.get(['isTrueEnabled'])
    isExtensionEnabled = result.isTrueEnabled ?? true
    console.log('✅ Extension enabled status:', isExtensionEnabled)
    
    // Exit early if disabled
    if (!isExtensionEnabled) {
      console.log('⏸️ Extension is disabled, content script will not activate')
      return false
    }
    return true
  } catch (error) {
    console.error('❌ Failed to check extension status:', error)
    return true // Default to enabled on error
  }
}

// Initialize extension status check
checkExtensionStatus()

// Listen for storage changes to update enabled status
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.isTrueEnabled) {
    isExtensionEnabled = changes.isTrueEnabled.newValue ?? true
    console.log('🔄 Extension enabled status changed:', isExtensionEnabled)
  }
})

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content script received message:', message)

  switch (message.type) {
    case 'START_VERIFICATION':
      // Check if extension is enabled before processing
      if (!isExtensionEnabled) {
        console.log('⏸️ Extension is disabled, ignoring verification request')
        sendResponse({ success: false, error: 'Extension is disabled' })
        break
      }
      handleVerificationRequest(message.payload?.text)
      sendResponse({ success: true })
      break

    case 'PING':
      sendResponse({ type: 'PONG', timestamp: Date.now() })
      break

    case 'HIGHLIGHT_PAGE':
      highlightPage(message.payload?.color || '#ffeb3b')
      sendResponse({ success: true, message: 'Page highlighted' })
      break

    case 'GET_PAGE_INFO':
      const pageInfo = {
        title: document.title,
        url: window.location.href,
        textContent: document.body.innerText.substring(0, 100)
      }
      sendResponse({ success: true, data: pageInfo })
      break

    default:
      sendResponse({ success: false, error: 'Unknown message type' })
  }

  return true // Keep message channel open for async responses
})

/**
 * Handle verification request with premium loading indicator
 */
async function handleVerificationRequest(text: string) {
  if (!text || text.trim().length === 0) {
    console.error('❌ No text provided for verification')
    return
  }

  console.log('🔍 Starting verification for text:', text.substring(0, 50) + '...')

  // Show loading indicator
  const loadingIndicator = createLoadingIndicator()
  document.body.appendChild(loadingIndicator)

  try {
    // Send VERIFY_TEXT message to service worker
    const response = await chrome.runtime.sendMessage({
      type: 'VERIFY_TEXT',
      payload: { text }
    })

    // Remove loading indicator
    loadingIndicator.remove()

    // Handle response
    if (response.type === 'VERIFICATION_RESULT') {
      console.log('✅ Verification result received:', response.payload)
      const { showResultModal } = await import('./modal')
      showResultModal(response.payload)
    } else if (response.type === 'VERIFICATION_ERROR') {
      console.error('❌ Verification error:', response.payload.error)
      const { showErrorModal } = await import('./modal')
      const isRetryable = !response.payload.error.toLowerCase().includes('api key')
      showErrorModal(response.payload.error, isRetryable)
    }
  } catch (error) {
    console.error('❌ Verification request failed:', error)
    loadingIndicator.remove()
    const { showErrorModal } = await import('./modal')
    showErrorModal(error instanceof Error ? error.message : 'An unexpected error occurred', true)
  }
}

/**
 * Create premium loading indicator
 */
function createLoadingIndicator(): HTMLElement {
  const indicator = document.createElement('div')
  indicator.id = 'is-true-loading-indicator'
  indicator.style.cssText = `
    position: fixed;
    top: 16px;
    right: 16px;
    width: 140px;
    height: 44px;
    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 0 40px rgba(245, 158, 11, 0.4), 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    animation: slideInRight 300ms cubic-bezier(0, 0, 0.2, 1);
  `

  // Add spinner
  const spinner = document.createElement('div')
  spinner.style.cssText = `
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `

  // Add text
  const text = document.createElement('span')
  text.textContent = 'Verifying...'

  indicator.appendChild(spinner)
  indicator.appendChild(text)

  // Add animations to document if not already present
  if (!document.getElementById('is-true-animations')) {
    const style = document.createElement('style')
    style.id = 'is-true-animations'
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
    document.head.appendChild(style)
  }

  return indicator
}

/**
 * Example function: Highlight the entire page
 */
function highlightPage(color: string) {
  // Create or update highlight overlay
  let overlay = document.getElementById('extension-highlight-overlay')
  
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.id = 'extension-highlight-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${color};
      opacity: 0.3;
      pointer-events: none;
      z-index: 999999;
      transition: opacity 0.3s ease;
    `
    document.body.appendChild(overlay)

    // Remove after 2 seconds
    setTimeout(() => {
      overlay?.remove()
    }, 2000)
  }
}

/**
 * Example: Detect page changes (for SPAs)
 */
let lastUrl = window.location.href
new MutationObserver(() => {
  const currentUrl = window.location.href
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl
    console.log('🔄 URL changed to:', currentUrl)
    
    // Notify background or popup about URL change
    chrome.runtime.sendMessage({
      type: 'URL_CHANGED',
      payload: { url: currentUrl }
    }).catch(() => {
      // Ignore if no listener
    })
  }
}).observe(document, { subtree: true, childList: true })

/**
 * Example: Add a floating button to the page
 */
function addFloatingButton() {
  const button = document.createElement('button')
  button.textContent = '🚀'
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999999;
    transition: transform 0.2s ease;
  `
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)'
  })
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)'
  })
  
  button.addEventListener('click', () => {
    alert('Hello from content script!')
  })
  
  document.body.appendChild(button)
}

// Uncomment to add floating button to every page
// addFloatingButton()
