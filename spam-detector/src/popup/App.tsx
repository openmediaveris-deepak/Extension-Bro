import { useState, useEffect } from 'react'
import Logo from '../components/Logo'
import { getStorage, setStorage } from '../shared/storage'

export default function App() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadState = async () => {
      try {
        const enabled = await getStorage<boolean>('spamDetectorEnabled')
        setIsEnabled(enabled ?? true)
      } catch (error) {
        console.error('Failed to load state:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadState()
  }, [])

  const handleToggle = async () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    try {
      await setStorage({ spamDetectorEnabled: newState })
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }

  return (
    <div className="w-[400px] h-[600px] bg-gradient-to-br from-noir-950 via-noir-900 to-noir-950 relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 opacity-[0.03] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 opacity-[0.02] rounded-full blur-3xl"></div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 opacity-20 blur-xl rounded-full"></div>
              <div className="relative">
                <Logo size={52} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                Spam Detector
              </h1>
              <p className="text-xs text-noir-400 font-medium mt-0.5">
                AI-Powered Protection
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 px-6 py-8 flex flex-col justify-center">
          {/* Status Card */}
          <div className="bg-noir-850/40 backdrop-blur-sm rounded-3xl p-8 border border-white/[0.06] mb-6">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="relative inline-block">
                <div className={`absolute inset-0 blur-2xl rounded-full transition-all duration-700 ${
                  isEnabled ? 'bg-emerald-500 opacity-25' : 'bg-noir-700 opacity-15'
                }`}></div>
                <div className={`relative inline-flex items-center justify-center w-24 h-24 rounded-2xl border-2 transition-all duration-700 ${
                  isEnabled 
                    ? 'bg-emerald-500/[0.08] border-emerald-500/30' 
                    : 'bg-noir-800/50 border-white/[0.06]'
                }`}>
                  <svg className={`w-12 h-12 transition-all duration-700 ${
                    isEnabled ? 'text-emerald-400' : 'text-noir-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
              </div>

              {/* Status Text */}
              <div>
                <h2 className={`text-xl font-display font-bold mb-2 transition-colors duration-700 ${
                  isEnabled ? 'text-white' : 'text-noir-500'
                }`}>
                  {isEnabled ? 'Protection Active' : 'Protection Disabled'}
                </h2>
                <p className="text-sm text-noir-400 leading-relaxed">
                  {isEnabled ? 'Monitoring all websites for threats' : 'Enable to start monitoring websites'}
                </p>
              </div>
            </div>
          </div>

          {/* Toggle Control */}
          <div className="bg-noir-850/30 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.04]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white mb-1">
                  Real-time Protection
                </h3>
                <p className="text-xs text-noir-400">
                  {isEnabled ? 'Active' : 'Inactive'}
                </p>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={handleToggle}
                disabled={isLoading}
                className={`relative w-16 h-9 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-noir-950 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isEnabled 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 focus:ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]' 
                    : 'bg-noir-800 focus:ring-noir-700'
                }`}
              >
                <span className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-500 flex items-center justify-center ${
                  isEnabled ? 'translate-x-7' : 'translate-x-0'
                }`}>
                  {isEnabled ? (
                    <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-noir-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-xs text-noir-500">
            <span className="font-medium">v1.0.0</span>
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-noir-700'}`}></span>
              {isEnabled ? 'Active' : 'Inactive'}
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
