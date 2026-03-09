type BorderBeamProps = {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({
  className = '',
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = '#928466',
  colorTo = '#E8E0CC',
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`}
    >
      <div
        className="absolute"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: '-50%',
          left: '-50%',
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          borderRadius: '50%',
          filter: 'blur(20px)',
          opacity: 0.6,
          animation: `border-beam-move ${duration}s linear ${delay}s infinite`,
        }}
      />
    </div>
  )
}

// Inject keyframes once
if (typeof document !== 'undefined') {
  const styleId = 'border-beam-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes border-beam-move {
        0% { top: -10%; left: -10%; }
        25% { top: -10%; left: 100%; }
        50% { top: 100%; left: 100%; }
        75% { top: 100%; left: -10%; }
        100% { top: -10%; left: -10%; }
      }
    `
    document.head.appendChild(style)
  }
}

export type { BorderBeamProps }
