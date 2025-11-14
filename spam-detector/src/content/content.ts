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

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content script received message:', message)

  switch (message.type) {
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
