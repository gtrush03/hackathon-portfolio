import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SpatialProductShowcase, { type ProductData } from './ui/spatial-product-showcase'
import { CardStack, type CardStackItem } from './ui/card-stack'

/* ─── Types ─── */
type Era = 'now' | 'building' | 'early'

type PreviewCard = CardStackItem & { tags: string[] }

/* ─── Card stack preview — all projects ─── */
const allProjects: PreviewCard[] = [
  {
    id: 'synthos',
    title: 'SynthOS',
    description: 'The command centre for autonomous operations — AI agents fill every role in your company',
    imageSrc: '/screenshots/synthos-preview.png',
    href: 'https://trusynth.com',
    tags: ['React', 'Tauri', 'Rust', 'FastAPI'],
  },
  {
    id: 'truspend',
    title: 'TRU Spend',
    description: 'Ontology-backed SaaS spend intelligence that finds hidden software waste',
    imageSrc: '/screenshots/truspend-preview.png',
    href: 'https://spend.trusynth.com',
    tags: ['React', 'Supabase', 'Claude API'],
  },
  {
    id: 'trusales',
    title: 'TruSales CRM',
    description: 'Agent-first sales platform — AI runs your pipeline end-to-end',
    imageSrc: '/screenshots/trusales-preview.png',
    href: 'https://sales.trusynth.com',
    tags: ['React', 'Supabase', 'Zustand'],
  },
  {
    id: 'robotics',
    title: 'Robotics P&P',
    description: 'LLM-managed robotic manipulation with Gemini vision in the browser',
    imageSrc: '/screenshots/robotics/preview.png',
    tags: ['Three.js', 'MuJoCo', 'Gemini'],
  },
  {
    id: 'x-agent',
    title: 'X Engagement Agent',
    description: 'Twitter on autopilot — Claude crafts contextual replies, avoids AI detection',
    imageSrc: '/screenshots/synthos-preview.png',
    tags: ['Python', 'Selenium', 'Claude CLI'],
  },
  {
    id: 'ghost-treasury',
    title: 'Ghost Treasury',
    description: 'Hackathon DAO on Monad — autonomous trading agent with on-chain treasury',
    imageSrc: '/screenshots/synthos-preview.png',
    tags: ['Viem', 'Unlink SDK', 'Claude'],
  },
  {
    id: 'ponic',
    title: 'Ponic.cz',
    description: 'Pioneered accessible hydroponics — custom 3D-printed modular systems',
    imageSrc: '/screenshots/ponic.jpg',
    tags: ['3D Printing', 'IoT', 'E-commerce'],
  },
  {
    id: 'content-moderation',
    title: 'Content Moderation',
    description: 'AI content moderation system for platform safety',
    imageSrc: '/videos/tru-content-moderation-thumb.jpg',
    tags: ['Python', 'FastAPI', 'Claude'],
  },
]

/* ─── Era showcase data ─── */
const eraShowcases: ProductData[] = [
  {
    id: 'now',
    label: '2024 – Present',
    title: 'AI Era',
    description:
      'SynthOS, TRU Spend, TruSales, autonomous agents, robotics, and hackathon wins. Full-stack AI platforms shipped to production from Berlin to NYC.',
    image: '/screenshots/synthos-preview.png',
    colors: {
      gradient: 'from-[#928466] to-[#5a5040]',
      glow: 'bg-[#928466]',
      ring: 'border-l-[#928466]/50',
      bar: 'bg-[#928466]',
    },
    features: [
      { label: 'Platforms', value: '8' },
      { label: 'Revenue', value: '€1.5M+' },
      { label: 'Agents', value: '3+' },
    ],
  },
  {
    id: 'building',
    label: '2021 – 2024',
    title: 'University & Products',
    description:
      'ESCP Business School across Paris, Turin, and Lisbon. Built SchoolSpirit, AI Photo Agency, and early prototypes that evolved into TRU SYNTH. Google internship in Turin.',
    image: '/screenshots/schoolspirit.jpg',
    colors: {
      gradient: 'from-[#8a8466] to-[#504a3d]',
      glow: 'bg-[#8a8466]',
      ring: 'border-l-[#8a8466]/50',
      bar: 'bg-[#8a8466]',
    },
    features: [
      { label: 'Products', value: '4' },
      { label: 'Cities', value: '3' },
      { label: 'Highlight', value: 'Google' },
    ],
  },
  {
    id: 'early',
    label: '2016 – 2021',
    title: 'First Ventures',
    description:
      'Started at 13 flipping Yeezys, then built a streetwear brand, imported flower teddy bears across Prague, and pioneered 3D-printed hydroponics. Entrepreneurship before engineering.',
    image: '/screenshots/ponic.jpg',
    colors: {
      gradient: 'from-[#866d4e] to-[#50403a]',
      glow: 'bg-[#866d4e]',
      ring: 'border-l-[#866d4e]/50',
      bar: 'bg-[#866d4e]',
    },
    features: [
      { label: 'Ventures', value: '4' },
      { label: 'Revenue', value: '€50K+' },
      { label: 'Markets', value: 'CZ & EU' },
    ],
  },
]

const eraIds: Era[] = ['now', 'building', 'early']
const eraLabels: Record<Era, string> = {
  now: '2024–Now',
  building: '2021–2024',
  early: '2016–2021',
}

/* ─── Card Renderer ─── */
function PreviewCardRenderer(item: PreviewCard, { active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/[0.04]">
            <span className="text-sm text-white/30 font-mono">No preview</span>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {active && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#928466]/40" />
      )}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-medium bg-[#928466]/20 text-[#E8E0CC] border border-[#928466]/30 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="truncate text-lg font-semibold text-white tracking-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-sm text-white/70">{item.description}</p>
        )}
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export default function FeaturedWork() {
  const [showcaseIndex, setShowcaseIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [activeScrollEra, setActiveScrollEra] = useState<Era>('now')

  const sectionTopRef = useRef<HTMLDivElement>(null)
  const sectionEndRef = useRef<HTMLDivElement>(null)

  // Auto-rotate showcase
  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % eraShowcases.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay])

  // Sticky nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const topEl = sectionTopRef.current
      const endEl = sectionEndRef.current
      if (!topEl || !endEl) return

      const topRect = topEl.getBoundingClientRect()
      const endRect = endEl.getBoundingClientRect()
      setShowStickyNav(topRect.top < window.innerHeight * 0.8 && endRect.bottom > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShowcaseToggle = useCallback((id: string) => {
    const idx = eraShowcases.findIndex((s) => s.id === id)
    if (idx >= 0) {
      setShowcaseIndex(idx)
      setAutoPlay(false)
    }
  }, [])

  const handleNavClick = useCallback((era: Era) => {
    setAutoPlay(false)
    const idx = eraShowcases.findIndex((s) => s.id === era)
    if (idx >= 0) setShowcaseIndex(idx)
    setActiveScrollEra(era)

    // Scroll to the Projects section
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <section id="featured-work" className="relative scroll-mt-24">
      <div className="section-divider-line" />

      {/* Section heading */}
      <div className="pt-24 pb-8 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold">
          <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
            Featured Work
          </span>
        </h2>
      </div>

      {/* ── Card stack preview — all projects ── */}
      <div className="px-2 md:px-6 relative overflow-hidden" style={{ height: 'clamp(280px, 50vw, 460px)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-white/40">
              {allProjects.length} projects
              <span className="text-white/20 ml-2">— swipe or drag to explore</span>
            </p>
          </div>

          <div className="transform scale-[0.6] sm:scale-[0.75] md:scale-100 origin-top">
            <CardStack<PreviewCard>
              items={allProjects}
              cardWidth={480}
              cardHeight={300}
              maxVisible={7}
              overlap={0.48}
              spreadDeg={44}
              depthPx={120}
              tiltXDeg={10}
              activeLiftPx={24}
              activeScale={1.04}
              inactiveScale={0.92}
              springStiffness={200}
              springDamping={24}
              loop
              autoAdvance
              intervalMs={4000}
              pauseOnHover
              showDots
              renderCard={PreviewCardRenderer}
            />
          </div>
        </div>
      </div>

      {/* ── Sticky nav start sentinel ── */}
      <div ref={sectionTopRef} />

      {/* ── Auto-rotating spatial showcase ── */}
      <SpatialProductShowcase
        products={eraShowcases}
        className="bg-transparent"
        activeIndex={showcaseIndex}
        onToggle={handleShowcaseToggle}
        hideSwitcher
      />

      {/* ── Sticky nav end sentinel ── */}
      <div ref={sectionEndRef} />

      {/* ── Sticky Bottom Nav ── */}
      <AnimatePresence>
        {showStickyNav && (
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
            className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-[#928466]/20 shadow-[0_8px_40px_rgba(146,132,102,0.15),0_2px_12px_rgba(0,0,0,0.4)]">
              {eraIds.map((era) => (
                <button
                  key={era}
                  onClick={() => handleNavClick(era)}
                  className="relative px-3 py-2 md:px-4 md:py-2.5 rounded-full text-[11px] md:text-xs font-medium transition-colors duration-200 focus:outline-none"
                >
                  {activeScrollEra === era && (
                    <motion.div
                      layoutId="stickyTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-[#928466]/25 to-[#928466]/10 border border-[#928466]/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeScrollEra === era ? 'text-[#E8E0CC]' : 'text-white/40 hover:text-white/60'}`}>
                    {eraLabels[era]}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
