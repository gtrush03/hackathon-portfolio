import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Wait for fonts + initial paint
    const timer = setTimeout(() => setDone(true), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (done) {
      const hideTimer = setTimeout(() => setHidden(true), 600)
      return () => clearTimeout(hideTimer)
    }
  }, [done])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-obsidian flex items-center justify-center ${
        done ? 'loading-fade-out' : ''
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <img
          src="/tru-logo.png"
          alt="Loading"
          className="h-10 w-auto loading-pulse"
          fetchPriority="high"
        />
        <div className="w-24 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full transition-all duration-700 ease-out"
            style={{ width: done ? '100%' : '60%' }}
          />
        </div>
      </div>
    </div>
  )
}
