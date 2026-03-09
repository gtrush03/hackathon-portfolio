import { useState } from 'react'
import { CardStack, type CardStackItem } from './ui/card-stack'
import { motion, AnimatePresence } from 'framer-motion'

type ProjectCard = CardStackItem & {
  tags: string[]
}

type Category = 'Products' | 'Agents' | 'Hardware'

const categoryItems: Record<Category, ProjectCard[]> = {
  Products: [
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
      id: 'synthos-voice',
      title: 'SynthOS Voice',
      description: 'Spoken commands → live UI components. No clicks, no code, no waiting.',
      imageSrc: '/screenshots/synthos-preview.png',
      tags: ['Web Speech API', 'JSON Schema', 'React'],
    },
    {
      id: 'robotics',
      title: 'Robotics P&P',
      description: 'LLM-managed robotic manipulation with Gemini vision in the browser',
      imageSrc: '/screenshots/robotics/preview.png',
      tags: ['Three.js', 'MuJoCo', 'Gemini'],
    },
    {
      id: 'content-moderation',
      title: 'Content Moderation',
      description: 'AI content moderation system',
      imageSrc: '/videos/tru-content-moderation-thumb.jpg',
      tags: ['Python', 'FastAPI', 'Claude'],
    },
    {
      id: 'aiphoto',
      title: 'AI Photo Agency',
      description: 'Transforms regular photos into studio-grade images using generative AI',
      imageSrc: '/screenshots/aiphoto-agency.jpg',
      tags: ['Next.js', 'Stable Diffusion', 'Stripe'],
    },
    {
      id: 'schoolspirit',
      title: 'SchoolSpirit',
      description: 'AI-driven curriculum generation and adaptive testing — evolved into TRU SYNTH',
      imageSrc: '/screenshots/schoolspirit.jpg',
      tags: ['React', 'Firebase', 'OpenAI'],
    },
  ],
  Agents: [
    {
      id: 'x-agent',
      title: 'X Engagement Agent',
      description: 'Twitter on autopilot — Claude crafts contextual replies, avoids AI detection patterns',
      imageSrc: '/screenshots/synthos-preview.png',
      tags: ['Python', 'Selenium', 'Claude CLI'],
    },
    {
      id: 'linkedin-agent',
      title: 'LinkedIn Outreach Agent',
      description: 'Fully autonomous lead-gen — personalized connections, intelligent follow-ups, built-in CRM',
      imageSrc: '/screenshots/synthos-preview.png',
      tags: ['Python', 'Selenium', 'Telegram Bot'],
    },
    {
      id: 'ghost-treasury',
      title: 'Ghost Treasury',
      description: 'Hackathon DAO on Monad — autonomous trading agent with on-chain treasury',
      imageSrc: '/screenshots/synthos-preview.png',
      href: 'https://github.com/gtrush03',
      tags: ['Viem', 'Unlink SDK', 'Claude'],
    },
  ],
  Hardware: [
    {
      id: 'ponic',
      title: 'Ponic.cz',
      description: 'Pioneered accessible hydroponics in Czech Republic — custom 3D-printed modular systems',
      imageSrc: '/screenshots/ponic.jpg',
      href: 'https://projects.georgetru.com/ponic',
      tags: ['3D Printing', 'IoT', 'E-commerce'],
    },
    {
      id: 'ohmyteddy',
      title: 'Oh My Teddy',
      description: 'First importer of flower teddy bears to Czech Republic — 100+ units sold across Prague',
      imageSrc: '/screenshots/ohmyteddy/teddy-instagram.jpg',
      tags: ['Import', 'Instagram', 'E-commerce'],
    },
    {
      id: 'eqtl',
      title: 'EQTL Clothing',
      description: 'Streetwear brand — designed, produced, and sold from scratch across Prague',
      imageSrc: '/screenshots/eqtl/eqtl-front-back.jpg',
      tags: ['Design', 'Branding', 'Retail'],
    },
    {
      id: 'sneaker',
      title: 'Sneaker Re-Sell',
      description: 'Limited Yeezy drops — sourced, authenticated, and flipped at scale. First venture at 13.',
      imageSrc: '/screenshots/eqtl/eqtl-instagram.jpg',
      tags: ['Logistics', 'Market Analysis'],
    },
  ],
}

const categories: Category[] = ['Products', 'Agents', 'Hardware']

const categoryDescriptions: Record<Category, string> = {
  Products: 'Full-stack applications & platforms',
  Agents: 'Autonomous AI systems',
  Hardware: 'Physical products & ventures',
}

function ProjectCardRenderer(item: ProjectCard, { active }: { active: boolean }) {
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
          <p className="mt-1 line-clamp-2 text-sm text-white/70">
            {item.description}
          </p>
        )}
      </div>
    </div>
  )
}

export default function ProjectCarousel() {
  const [activeCategory, setActiveCategory] = useState<Category>('Products')

  return (
    <section id="featured-work" className="relative py-24 px-6 scroll-mt-24">
      <div className="section-divider-line" />

      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300"
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#928466]/30 to-[#928466]/15 border border-[#928466]/40"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeCategory === cat ? 'text-[#E8E0CC]' : 'text-white/40 hover:text-white/60'}`}>
                  {cat}
                </span>
                <span className={`relative z-10 ml-1.5 text-xs ${activeCategory === cat ? 'text-[#928466]' : 'text-white/20'}`}>
                  {categoryItems[cat].length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Category description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center text-sm text-white/40 mb-8"
          >
            {categoryDescriptions[activeCategory]}
            <span className="text-white/20 ml-2">— swipe or drag to explore</span>
          </motion.p>
        </AnimatePresence>

        {/* Card Stack — re-keyed per category for fresh mount */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <CardStack<ProjectCard>
              items={categoryItems[activeCategory]}
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
              springStiffness={260}
              springDamping={26}
              loop
              autoAdvance
              intervalMs={4000}
              pauseOnHover
              showDots
              renderCard={ProjectCardRenderer}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
