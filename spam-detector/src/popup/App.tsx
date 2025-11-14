import Logo from '../components/Logo'

export default function App() {
  return (
    <div className="w-[400px] h-[600px] bg-gradient-noir relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 opacity-5 rounded-full blur-3xl"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500 opacity-20 blur-xl rounded-full"></div>
              <div className="relative">
                <Logo size={48} />
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

        {/* Content area - placeholder for now */}
        <div className="flex-1 px-6 py-8">
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-noir-800 border border-white/10">
                <svg className="w-10 h-10 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">
                  Protected
                </h2>
                <p className="text-sm text-noir-400">
                  Your inbox is being monitored
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-noir-500">
            <span>v1.0.0</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Active
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}
