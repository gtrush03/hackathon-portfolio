import { useEffect, useRef, type MutableRefObject } from 'react'

type StoryItem = {
  age?: string
  text: string
  rich?: React.ReactNode
  isHeadline?: boolean
  isFinal?: boolean
}

const ITEMS: StoryItem[] = [
  { text: "Hey, I'm George.", isHeadline: true },
  { age: '13', text: 'Sold my first pair of Yeezys out of Prague.' },
  { age: '15', text: 'Designed and launched my own clothing brand.' },
  { age: '17', text: 'Built a hydroponics startup from scratch.' },
  {
    age: '21',
    text: 'Scaled a creative studio to €1.5M+.',
    rich: (
      <>
        Scaled a creative studio to <span className="text-gold">€1.5M+</span>.
        <br />
        Graduated from{' '}
        <span className="text-gold underline decoration-gold/40 underline-offset-2">ESCP</span>. Worked at{' '}
        <span className="text-gold underline decoration-gold/40 underline-offset-2">Google</span>.
      </>
    ),
  },
  { age: '22', text: 'Going all-in on autonomous AI.', isFinal: true },
]

// CTA is the 7th element
const TOTAL_ELEMENTS = ITEMS.length + 1
// Each element occupies a slice of the 0→1 progress range, with overlap
const ELEMENT_DURATION = 0.18
const ELEMENT_SPACING = (1 - ELEMENT_DURATION) / (TOTAL_ELEMENTS - 1)

function getElementProgress(index: number, progress: number): number {
  const start = index * ELEMENT_SPACING
  const end = start + ELEMENT_DURATION
  if (progress <= start) return 0
  if (progress >= end) return 1
  return (progress - start) / ELEMENT_DURATION
}

export default function IntroStory({
  progressRef,
}: {
  progressRef: MutableRefObject<number>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<(HTMLElement | null)[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let running = true

    const update = () => {
      if (!running) return
      const p = progressRef.current
      const els = elementsRef.current

      for (let i = 0; i < els.length; i++) {
        const el = els[i]
        if (!el) continue
        const ep = getElementProgress(i, p)
        // Ease out cubic for smooth deceleration
        const eased = 1 - Math.pow(1 - ep, 3)
        el.style.opacity = String(eased)
        el.style.transform = `translate3d(0, ${(1 - eased) * 24}px, 0)`
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [progressRef])

  const setRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el
  }

  const headline = ITEMS[0]
  const timeline = ITEMS.slice(1)

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto text-center">
      {/* Headline */}
      <h2
        ref={setRef(0)}
        className="text-4xl md:text-6xl font-bold text-white mb-8"
        style={{ opacity: 0, willChange: 'opacity, transform' }}
      >
        {headline.text}
      </h2>

      {/* Timeline */}
      <div className="inline-flex flex-col items-start space-y-4">
        {timeline.map((item, ti) => (
          <p
            key={ti}
            ref={setRef(ti + 1)}
            className={`text-sm md:text-base text-secondary/70 leading-relaxed flex items-baseline gap-3${
              item.isFinal ? ' !text-white font-medium !text-base md:!text-lg' : ''
            }`}
            style={{ opacity: 0, willChange: 'opacity, transform' }}
          >
            <span className="text-gold/60 font-mono text-sm w-7 text-right shrink-0">
              {item.age}
            </span>
            <span>
              — {item.rich || item.text}
            </span>
          </p>
        ))}
      </div>

      {/* CTA */}
      <div
        ref={setRef(ITEMS.length)}
        className="pt-8"
        style={{ opacity: 0, willChange: 'opacity, transform' }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-muted font-mono">2025–2026</p>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        </div>
        <p className="text-xs uppercase tracking-[0.15em] text-gold/40">
          Products ↓
        </p>
      </div>
    </div>
  )
}
