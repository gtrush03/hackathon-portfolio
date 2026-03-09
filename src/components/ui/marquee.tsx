import type { ReactNode, CSSProperties } from 'react'

type MarqueeProps = {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  duration?: string
  gap?: string
}

export function Marquee({
  children,
  className = '',
  reverse = false,
  pauseOnHover = false,
  duration = '40s',
  gap = '1rem',
}: MarqueeProps) {
  const style = {
    '--marquee-duration': duration,
    '--marquee-gap': gap,
  } as CSSProperties

  return (
    <div
      className={`group flex overflow-hidden ${className}`}
      style={style}
    >
      <div
        className={`flex shrink-0 items-center justify-around gap-[var(--marquee-gap)] animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`flex shrink-0 items-center justify-around gap-[var(--marquee-gap)] animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
