import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, X, ChevronRight, Zap, Users, BarChart3, Mail, Brain, Shield, MessageCircle, Layout } from 'lucide-react'
import { createPortal } from 'react-dom'

/* ── Screenshot data ── */
const features = [
  {
    title: 'Dashboard',
    description: 'Real-time pipeline health, activity feed, and AI-driven next actions — all in one view.',
    image: '/screenshots/trusales/trusales-dashboard.png',
    icon: BarChart3,
  },
  {
    title: 'Pipeline',
    description: 'Kanban board with drag-and-drop deal management across every stage from Lead to Won.',
    image: '/screenshots/trusales/trusales-pipeline.png',
    icon: ChevronRight,
  },
  {
    title: 'Prospects',
    description: 'Smart contact database with company intel, lead scoring, and source tracking.',
    image: '/screenshots/trusales/trusales-prospects.png',
    icon: Users,
  },
  {
    title: 'AI Content Studio',
    description: 'Generate sales emails, LinkedIn messages, and follow-ups with AI that knows your pipeline.',
    image: '/screenshots/trusales/trusales-content.png',
    icon: Brain,
  },
  {
    title: 'Analytics',
    description: 'Conversion funnels, lead source breakdown, and revenue forecasting with interactive charts.',
    image: '/screenshots/trusales/trusales-analytics.png',
    icon: BarChart3,
  },
  {
    title: 'Outreach',
    description: 'Multi-channel outreach sequences — email, LinkedIn, calls — orchestrated by AI agents.',
    image: '/screenshots/trusales/trusales-outreach.png',
    icon: Mail,
  },
  {
    title: 'AI Chat',
    description: 'Sales copilot with persona modes — Professional, Hustler, Analyst — for any situation.',
    image: '/screenshots/trusales/trusales-chat.png',
    icon: MessageCircle,
  },
  {
    title: 'Strategy',
    description: 'AI-generated sales playbooks and competitive analysis tailored to your pipeline.',
    image: '/screenshots/trusales/trusales-strategy.png',
    icon: Zap,
  },
  {
    title: 'Campaigns',
    description: 'Manage multi-step outreach campaigns with tracking, replies, and meeting scheduling.',
    image: '/screenshots/trusales/trusales-campaigns.png',
    icon: Mail,
  },
  {
    title: 'Contracts',
    description: 'Track proposals, contracts, and signature status with automated follow-up reminders.',
    image: '/screenshots/trusales/trusales-contracts.png',
    icon: Shield,
  },
  {
    title: 'Kim Aira',
    description: 'Digital employee — autonomous agent with her own activity log, scheduled posts, and ICP targets.',
    image: '/screenshots/trusales/trusales-kim.png',
    icon: Brain,
  },
  {
    title: 'Settings',
    description: 'Bring your own API keys — Gemini, Anthropic, Telegram — and configure every integration.',
    image: '/screenshots/trusales/trusales-settings.png',
    icon: Layout,
  },
]

/* ── Lightbox ── */
function Lightbox({ image, title, onClose, onPrev, onNext }: {
  image: string
  title: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <div className="relative z-10 w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.2] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a]">
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onPrev}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.15] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={onNext}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.15] transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>,
    document.body
  )
}

/* ── Main page ── */
export default function TruSalesLanding() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + features.length) % features.length))
  }, [])
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % features.length))
  }, [])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <div className="min-h-screen relative">
      {/* ── Nav ── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-obsidian/90 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
        <a href="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <img src="/tru-logo.png" alt="TRU" className="h-4 w-auto" />
        </a>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-sm font-bold text-primary tracking-tight">Sales</span>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(146,132,102,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <img src="/tru-logo.png" alt="TRU" className="h-10 w-auto" />
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
              Sales
            </h1>
          </div>

          <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#E8E0CC] via-[#928466] to-[#E8E0CC] bg-clip-text text-transparent mb-4">
            Agent-first sales platform.
          </p>
          <p className="text-base md:text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            AI agents run your pipeline end-to-end — prospecting, outreach, content, deal tracking.
            You just approve the moves.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href="https://sales.trusynth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-6 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.5)] hover:brightness-110 transition-all"
            >
              Open TruSales
              <ExternalLink size={16} />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-primary px-6 py-3 rounded-xl font-medium hover:border-white/[0.15] hover:bg-white/[0.06] transition-all"
            >
              See Features
              <ChevronRight size={16} />
            </a>
          </div>

          {/* Hero screenshot */}
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 cursor-pointer group"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src="/screenshots/trusales/trusales-dashboard.png"
              alt="TruSales Dashboard"
              className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-12 px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '12+', label: 'AI Modules' },
            { value: 'Real-time', label: 'Pipeline Tracking' },
            { value: 'Multi-channel', label: 'Outreach' },
            { value: 'End-to-end', label: 'Automation' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold bg-gradient-to-b from-[#E8E0CC] to-[#928466] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section id="features" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Platform</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
              Everything your sales team needs
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              From first touch to closed deal — every step is AI-assisted, every action is tracked.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] rounded-[20px] overflow-hidden transition-all duration-500 cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                >
                  {/* Screenshot preview */}
                  <div className="aspect-video overflow-hidden bg-black/20">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Icon size={14} className="text-gold" />
                      </div>
                      <h3 className="text-sm font-semibold text-primary">{feature.title}</h3>
                    </div>
                    <p className="text-xs text-secondary leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="py-16 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-8">Built With</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'TypeScript', 'Supabase', 'Zustand', 'Tailwind', 'Framer Motion', 'Claude API', 'Gemini API'].map((tech) => (
              <span
                key={tech}
                className="text-xs px-4 py-2 rounded-full bg-white/[0.04] text-secondary border border-white/[0.06] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
            Ready to automate your pipeline?
          </h2>
          <p className="text-secondary mb-8">
            TruSales is live. Start running AI-powered sales today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://sales.trusynth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-8 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.5)] hover:brightness-110 transition-all"
            >
              Launch TruSales
              <ExternalLink size={16} />
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-primary px-8 py-3 rounded-xl font-medium hover:border-white/[0.15] hover:bg-white/[0.06] transition-all"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/tru-logo.png" alt="TRU" className="h-4 w-auto opacity-50" />
            <span className="text-xs text-muted">&copy; 2026 George Trushevskiy</span>
          </div>
          <a href="/" className="text-xs text-muted hover:text-primary transition-colors">
            george.trusynth.com
          </a>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            image={features[lightboxIndex].image}
            title={features[lightboxIndex].title}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
