import { useState, useEffect } from 'react'
import { getStorage, setStorage } from '../shared/storage'

export default function App() {
  const [isTrueEnabled, setIsTrueEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadToggleState()
  }, [])

  const loadToggleState = async () => {
    try {
      const enabled = await getStorage<boolean>('isTrueEnabled')
      setIsTrueEnabled(enabled ?? true)
    } catch (error) {
      console.error('Failed to load toggle state:', error)
      setIsTrueEnabled(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async () => {
    const newState = !isTrueEnabled
    setIsTrueEnabled(newState)
    
    try {
      await setStorage({ isTrueEnabled: newState })
      
      // Notify background script to update context menu
      chrome.runtime.sendMessage({
        type: 'TOGGLE_CHANGED',
        payload: { enabled: newState }
      }).catch(error => {
        console.error('Failed to notify background script:', error)
      })
    } catch (error) {
      console.error('Failed to save toggle state:', error)
      setIsTrueEnabled(!newState)
    }
  }

  return (
    <div className="w-[420px] h-[600px] bg-gradient-royal relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>
      
      {/* Animated Ambient Light Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gold-500/15 to-gold-600/15 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
      
      <div className="relative z-10 h-full flex flex-col p-8">
        {/* Logo with Shield and Checkmark */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 relative">
            {/* Shield with gold gradient */}
            <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Shield shape */}
              <path 
                d="M40 8 L60 16 L60 36 C60 52 52 64 40 72 C28 64 20 52 20 36 L20 16 Z" 
                fill="url(#goldGradient)"
                filter="url(#glow)"
                className="drop-shadow-lg"
              />
              {/* Checkmark */}
              <path 
                d="M32 40 L36 44 L48 32" 
                stroke="white" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">
            Is True?
          </h1>
          <p className="text-sm text-platinum-200 font-medium tracking-wide">
            AI-Powered Fact Checking
          </p>
        </div>

        {/* Glass Morphism Card */}
        <div className="glass-morphism rounded-3xl p-8 shadow-premium animate-scale-in flex-1 flex flex-col justify-center">
          {/* Toggle Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-2">
                Fact Checking
              </h2>
              <p className="text-sm text-platinum-200">
                {isTrueEnabled ? 'Verification is active' : 'Verification is disabled'}
              </p>
            </div>

            {/* Premium Toggle Switch */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`
                  relative w-16 h-8 rounded-full transition-all duration-500 ease-in-out
                  ${isTrueEnabled 
                    ? 'bg-gradient-gold shadow-glow-gold' 
                    : 'bg-white/20'
                  }
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  hover:scale-105 active:scale-95
                `}
                aria-label="Toggle fact checking"
              >
                {/* Toggle Knob */}
                <div
                  className={`
                    absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg
                    transition-all duration-500 ease-in-out
                    flex items-center justify-center
                    ${isTrueEnabled ? 'left-9' : 'left-1'}
                  `}
                >
                  {/* Checkmark Icon (shown when enabled) */}
                  {isTrueEnabled && (
                    <svg 
                      className="w-4 h-4 text-gold-600 animate-scale-in" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={3} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-3">
              <div 
                className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${isTrueEnabled 
                    ? 'bg-gold-500 shadow-glow-gold animate-pulse' 
                    : 'bg-white/40'
                  }
                `}
              ></div>
              <span className={`
                text-sm font-medium transition-colors duration-500
                ${isTrueEnabled ? 'text-gold-500' : 'text-white/60'}
              `}>
                {isTrueEnabled ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Instructions */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-platinum-200 text-center leading-relaxed">
                {isTrueEnabled 
                  ? 'Select text on any webpage and right-click to verify facts'
                  : 'Enable to start verifying facts on webpages'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-fade-in">
          <p className="text-xs text-white/40 font-medium">
            Made with ❤️ by Deepu
          </p>
        </div>
      </div>
    </div>
  )
}
