import { useState, useEffect } from 'react'
import { sendMessageToActiveTab, sendMessageToBackground } from '../shared/messaging'

export default function App() {
  const [count, setCount] = useState(0)
  const [tabUrl, setTabUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setTabUrl(tabs[0].url)
        }
      })
    } else {
      setTabUrl('Dev mode - Load as extension to see tab URL')
    }
  }, [])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleHighlightPage = async () => {
    if (typeof chrome === 'undefined' || !chrome.tabs) {
      showNotification('error', 'Load as Chrome extension to use this feature')
      return
    }
    
    setIsLoading(true)
    try {
      await sendMessageToActiveTab({
        type: 'HIGHLIGHT_PAGE',
        payload: { color: '#667eea' }
      })
      showNotification('success', 'Page highlighted successfully!')
    } catch (error) {
      const errorMsg = (error as Error).message
      if (errorMsg.includes('Could not establish connection')) {
        showNotification('error', 'Please refresh the page and try again')
      } else {
        showNotification('error', 'Failed to highlight page')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePingBackground = async () => {
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      showNotification('error', 'Load as Chrome extension to use this feature')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await sendMessageToBackground({ type: 'PING' })
      showNotification('success', `Background responded: ${response.type}`)
    } catch (error) {
      showNotification('error', 'Failed to ping background')
    } finally {
      setIsLoading(false)
    }
  }

  const isExtensionContext = typeof chrome !== 'undefined' && chrome.runtime?.id

  return (
    <div className="w-[420px] min-h-[500px] bg-gradient-to-br from-luxury-light via-white to-primary-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-luxury opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 p-6 space-y-5">
        {/* Notification Toast */}
        {notification && (
          <div className={`absolute top-4 left-4 right-4 p-3 rounded-xl shadow-luxury-lg backdrop-blur-sm animate-slide-down ${
            notification.type === 'success' 
              ? 'bg-green-500/90 text-white' 
              : 'bg-red-500/90 text-white'
          }`}>
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        )}

        {/* Dev Mode Badge */}
        {!isExtensionContext && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-3 shadow-luxury">
            <p className="text-xs font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Dev Mode: Load as extension to test features
            </p>
          </div>
        )}

        {/* Header with Logo */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-luxury rounded-2xl shadow-luxury mb-3">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-luxury bg-clip-text text-transparent mb-1">
            Extension Bro
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Modern Chrome Extension Boilerplate
          </p>
        </div>

        {/* Current Tab Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-luxury border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Active Tab</h2>
          </div>
          <p className="text-xs text-gray-600 break-all leading-relaxed">
            {tabUrl || 'Loading...'}
          </p>
        </div>

        {/* Counter Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-luxury border border-gray-100">
          <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-4">Counter Demo</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-4xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                {count}
              </div>
              <p className="text-xs text-gray-500 mt-1">Current value</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCount(count - 1)}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-bold text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
              >
                −
              </button>
              <button
                onClick={() => setCount(count + 1)}
                className="w-12 h-12 bg-gradient-luxury hover:opacity-90 rounded-xl text-white font-bold text-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-luxury"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleHighlightPage}
            disabled={isLoading}
            className="w-full px-5 py-3.5 bg-gradient-luxury hover:opacity-90 text-white rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-luxury disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Highlight Page
              </>
            )}
          </button>
          
          <button
            onClick={handlePingBackground}
            disabled={isLoading}
            className="w-full px-5 py-3.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-luxury border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ping Background
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-400 font-medium">
            Press F12 to open DevTools
          </p>
        </div>
      </div>
    </div>
  )
}
