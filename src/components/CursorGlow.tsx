import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -500, y: -500 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const glow = glowRef.current
    if (!glow) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const { x, y } = posRef.current
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Don't render on touch devices (SSR-safe check done in effect)
  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(146,132,102,0.06) 0%, transparent 70%)',
        zIndex: 9998,
        willChange: 'transform',
        transform: 'translate(-500px, -500px)',
      }}
    />
  )
}
