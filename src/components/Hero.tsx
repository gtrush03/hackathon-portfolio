import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Spotlight } from './ui/spotlight'
import ContactModal from './ContactModal'

type Stat = {
  value: string
  label: string
}

const stats: Stat[] = [
  { value: '10+', label: 'Years Building' },
  { value: '7', label: 'Countries' },
  { value: '15+', label: 'Products Shipped' },
  { value: '€1.5M+', label: 'Revenue Generated' },
]

// Cinematic auto-scroll: plays through the GIF animation at a comfortable pace
let autoScrollRafId: number | null = null

function cancelAutoScroll() {
  if (autoScrollRafId !== null) {
    cancelAnimationFrame(autoScrollRafId)
    autoScrollRafId = null
    document.documentElement.style.scrollBehavior = ''
    window.removeEventListener('wheel', cancelAutoScroll)
    window.removeEventListener('touchstart', cancelAutoScroll)
  }
}

function smoothScrollToProjects(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  cancelAutoScroll()

  const target = document.getElementById('projects')
  if (!target) return

  const targetY = target.getBoundingClientRect().top + window.scrollY - 96
  const startY = window.scrollY
  const distance = targetY - startY
  if (Math.abs(distance) < 1) return

  const duration = 3500
  const startTime = performance.now()

  // Disable CSS smooth scroll to prevent conflict
  document.documentElement.style.scrollBehavior = 'auto'
  window.addEventListener('wheel', cancelAutoScroll, { once: true })
  window.addEventListener('touchstart', cancelAutoScroll, { once: true })

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))

    if (progress < 1) {
      autoScrollRafId = requestAnimationFrame(step)
    } else {
      document.documentElement.style.scrollBehavior = ''
      autoScrollRafId = null
    }
  }

  autoScrollRafId = requestAnimationFrame(step)
}

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden grid-bg">
      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(146, 132, 102, 0.5)" />

      {/* Floating gold orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(146,132,102,0.12)_0%,transparent_70%)] blur-3xl animate-pulse pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center hero-scroll-content">
        <h1 className="text-[2.1rem] md:text-7xl font-bold tracking-tight leading-[0.95] mb-8">
          <span className="font-light">George Trushevskiy</span>
          <br />
          <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent gold-shimmer whitespace-nowrap">
            Builds AI That Ships
          </span>
        </h1>

        <div className="max-w-2xl mx-auto mb-5">
          <p className="text-base md:text-lg text-secondary text-center leading-relaxed">
            A decade of hustle across seven countries <span className="inline-block ml-1 tracking-wider">🇷🇺🇨🇿🇫🇷🇮🇹🇵🇹🇩🇪🇺🇸</span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-8 mb-12">
          <img src="/escp-logo.png" alt="ESCP Business School" className="h-12 brightness-0 invert opacity-50 hover:opacity-70 transition-opacity duration-300" />
          <div className="w-px h-8 bg-white/[0.1]" />
          <img src="/google-logo.png" alt="Google" className="h-10 brightness-0 invert opacity-50 hover:opacity-70 transition-opacity duration-300" />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <a
            href="#projects"
            onClick={smoothScrollToProjects}
            className="cta-pulse bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-8 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.6)] hover:brightness-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            View Projects
          </a>
          <button
            onClick={() => setContactOpen(true)}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-primary px-8 py-3 rounded-xl font-medium hover:border-white/[0.12] hover:bg-white/[0.06] transition-[border-color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer"
          >
            Get In Touch
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        onClick={smoothScrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-muted hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded-full"
      >
        <ChevronDown size={24} />
      </a>

      {/* Contact modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}
