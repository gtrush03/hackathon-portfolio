import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ContactModal from './ContactModal'

type Stat = { value: string; label: string }

const stats: Stat[] = [
  { value: '10+', label: 'Years Building' },
  { value: '7', label: 'Countries' },
  { value: '15+', label: 'Products Shipped' },
  { value: '€1.5M+', label: 'Revenue Generated' },
]

/* ─── Cinematic auto-scroll ─── */
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
  document.documentElement.style.scrollBehavior = 'auto'
  window.addEventListener('wheel', cancelAutoScroll, { once: true })
  window.addEventListener('touchstart', cancelAutoScroll, { once: true })
  function easeInOutCubic(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) { autoScrollRafId = requestAnimationFrame(step) }
    else { document.documentElement.style.scrollBehavior = ''; autoScrollRafId = null }
  }
  autoScrollRafId = requestAnimationFrame(step)
}

/* ─── Animation variants ─── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const scaleFade = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const lineExpand = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

const letterReveal = {
  hidden: { opacity: 0, y: 40, rotateX: 40 },
  show: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.6, delay: 0.5 + i * 0.03, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ─── Component ─── */
export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false)

  const name = 'George Trushevskiy'
  const tagline = 'Builds AI That Ships'

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-24 pb-16 overflow-hidden grid-bg">
      {/* Minimal ambient glow — no spotlight, just a soft radial */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(146,132,102,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center hero-scroll-content"
      >
        {/* Thin accent line */}
        <motion.div variants={lineExpand} className="w-12 h-px bg-[#928466] mx-auto mb-10 origin-center" />

        {/* Name — letter by letter reveal */}
        <h1 className="text-[2.1rem] md:text-7xl font-bold tracking-tight leading-[0.95] mb-8" style={{ perspective: '600px' }}>
          <span className="font-light inline-flex flex-wrap justify-center overflow-hidden">
            {name.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterReveal}
                className="inline-block"
                style={{ transformOrigin: 'bottom center' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
          <br />
          {/* Tagline — smooth fade up after name */}
          <motion.span
            variants={fadeUp}
            className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent gold-shimmer whitespace-nowrap inline-block mt-2"
          >
            {tagline}
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.div variants={fadeUp} className="max-w-2xl mx-auto mb-5">
          <p className="text-base md:text-lg text-secondary text-center leading-relaxed">
            A decade of hustle across seven countries <span className="inline-block ml-1 tracking-wider">🇷🇺🇨🇿🇫🇷🇮🇹🇵🇹🇩🇪🇺🇸</span>
          </p>
        </motion.div>

        {/* Logos */}
        <motion.div variants={scaleFade} className="flex items-center justify-center gap-8 mb-12">
          <img src="/escp-logo.png" alt="ESCP Business School" className="h-12 brightness-0 invert opacity-50 hover:opacity-70 transition-opacity duration-300" />
          <div className="w-px h-8 bg-white/[0.1]" />
          <img src="/google-logo.png" alt="Google" className="h-10 brightness-0 invert opacity-50 hover:opacity-70 transition-opacity duration-300" />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-20">
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
        </motion.div>

        {/* Stats — staggered count-up feel */}
        <motion.div variants={container} className="flex flex-wrap justify-center gap-8 md:gap-16">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — gentle pulse */}
      <motion.a
        href="#projects"
        onClick={smoothScrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator text-muted hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded-full"
      >
        <ChevronDown size={24} />
      </motion.a>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}
