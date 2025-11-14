/**
 * Service Worker (Background Script)
 * 
 * This script runs in the background and handles:
 * - Extension lifecycle events
 * - Long-running tasks
 * - Coordination between popup and content scripts
 * - Network requests
 * - Storage management
 * 
 * Note: Service workers are event-driven and may be terminated when idle.
 * Don't rely on global state - use chrome.storage instead.
 */

import { verifyText } from '../services/ai';
import type { VerificationResult } from '../types';

console.log('🔧 Service worker initialized')

/**
 * Installation event - runs when extension is first installed or updated
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('✅ Extension installed:', details.reason)

  if (details.reason === 'install') {
    // First time installation - set isTrueEnabled to true
    await chrome.storage.local.set({
      isTrueEnabled: true,
      installDate: Date.now(),
      version: chrome.runtime.getManifest().version,
      totalVerifications: 0
    })
    
    console.log('✅ Is True? extension enabled by default')
  } else if (details.reason === 'update') {
    // Extension was updated
    console.log('🔄 Extension updated to version:', chrome.runtime.getManifest().version)
  }

  // Get current toggle state
  const storage = await chrome.storage.local.get(['isTrueEnabled'])
  const isEnabled = storage.isTrueEnabled ?? true

  // Create context menu for text verification
  chrome.contextMenus.create({
    id: 'verify-text',
    title: '✓ Verify with Is True?',
    contexts: ['selection'],
    visible: isEnabled
  })
  console.log('✅ Context menu created (visible:', isEnabled, ')')
})

/**
 * Message handler - receives messages from popup and content scripts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Background received message:', message, 'from:', sender)

  switch (message.type) {
    case 'VERIFY_TEXT':
      handleVerifyText(message.payload?.text)
        .then(result => {
          sendResponse({ 
            type: 'VERIFICATION_RESULT', 
            payload: result 
          })
        })
        .catch(error => {
          sendResponse({ 
            type: 'VERIFICATION_ERROR', 
            payload: { error: error.message } 
          })
        })
      return true // Keep channel open for async response

    case 'PING':
      sendResponse({ 
        type: 'PONG', 
        timestamp: Date.now(),
        from: 'background'
      })
      break

    case 'GET_STORAGE':
      handleGetStorage(message.payload?.keys)
        .then(data => sendResponse({ success: true, data }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true // Keep channel open for async response

    case 'SET_STORAGE':
      handleSetStorage(message.payload?.data)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true

    case 'TOGGLE_CHANGED':
      // Update context menu visibility when toggle changes
      updateContextMenu(message.payload?.enabled)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }))
      return true

    case 'URL_CHANGED':
      console.log('🔄 URL changed in tab:', sender.tab?.id, 'to:', message.payload?.url)
      sendResponse({ success: true })
      break

    default:
      sendResponse({ success: false, error: 'Unknown message type' })
  }

  return true
})

/**
 * Tab events - monitor tab changes
 */
chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log('👁️ Tab activated:', activeInfo.tabId)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('✅ Tab loaded:', tab.url)
  }
})

/**
 * Verify text handler - calls AI service and updates stats
 */
async function handleVerifyText(text: string): Promise<VerificationResult> {
  console.log('🔍 Verifying text:', text.substring(0, 50) + '...')
  
  try {
    // Call AI service with selected text
    const result = await verifyText(text)
    
    // Update verification stats
    const storage = await chrome.storage.local.get(['totalVerifications'])
    await chrome.storage.local.set({
      totalVerifications: (storage.totalVerifications || 0) + 1,
      lastVerificationDate: Date.now()
    })
    
    console.log('✅ Verification complete:', result.verdict, `(${result.confidence}%)`)
    
    return result
  } catch (error) {
    console.error('❌ Verification failed:', error)
    throw error
  }
}

/**
 * Storage helpers
 */
async function handleGetStorage(keys?: string[]) {
  if (keys) {
    return await chrome.storage.local.get(keys)
  }
  return await chrome.storage.local.get(null) // Get all
}

async function handleSetStorage(data: Record<string, any>) {
  await chrome.storage.local.set(data)
  return true
}

/**
 * Update context menu visibility based on toggle state
 */
async function updateContextMenu(enabled: boolean) {
  try {
    if (enabled) {
      // Show context menu
      await chrome.contextMenus.update('verify-text', {
        visible: true
      })
      console.log('✅ Context menu enabled')
    } else {
      // Hide context menu
      await chrome.contextMenus.update('verify-text', {
        visible: false
      })
      console.log('⏸️ Context menu disabled')
    }
  } catch (error) {
    console.error('❌ Failed to update context menu:', error)
    throw error
  }
}

/**
 * Example: Periodic task (runs every 5 minutes)
 * Uncomment and add "alarms" permission to manifest.json to use
 */
// chrome.alarms.create('periodicTask', { periodInMinutes: 5 })
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'periodicTask') {
//     console.log('⏰ Periodic task triggered')
//   }
// })

/**
 * Context menu click handler
 */
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'verify-text' && info.selectionText && tab?.id) {
    console.log('🔍 Context menu clicked, selected text:', info.selectionText.substring(0, 50) + '...')
    
    // Check if extension is enabled
    const storage = await chrome.storage.local.get(['isTrueEnabled'])
    if (!storage.isTrueEnabled) {
      console.log('⏸️ Extension is disabled, ignoring context menu click')
      return
    }
    
    // Send message to content script to start verification
    chrome.tabs.sendMessage(tab.id, {
      type: 'START_VERIFICATION',
      payload: { text: info.selectionText }
    }).catch(error => {
      console.error('❌ Failed to send message to content script:', error)
    })
  }
})

/**
 * Example: Badge management
 */
// function updateBadge(text: string, color: string = '#FF0000') {
//   chrome.action.setBadgeText({ text })
//   chrome.action.setBadgeBackgroundColor({ color })
// }
// updateBadge('5', '#00FF00')
