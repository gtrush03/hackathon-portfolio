import { ExternalLink, Star, ArrowUpRight, MapPin, BookOpen, GraduationCap, Play, X, Pause, Download, Maximize2, Minimize2, FileText } from 'lucide-react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

type Project = {
  name: string
  brandedName?: { pre: string; bold: string; post?: string }
  description: string
  stack: string[]
  url?: string
  landingPage?: string
  featured?: boolean
  tagline?: string
  previewImage?: string
  youtubeUrl?: string
}

type LegacyProject = {
  name: string
  brandedName?: { pre: string; bold: string; post?: string }
  description: string
  stack: string[]
  url?: string
  videoUrl?: string
  previewImage?: string
  previewImages?: string[]
  year: string
  location: string
}

/* ── Products ── */
const products: Project[] = [
  {
    name: 'SynthOS',
    brandedName: { pre: 'Synth', bold: 'OS', post: ' (TRU SYNTH)' },
    description: 'The command centre for autonomous operations. You define the roles — sales, support, operations — and AI agents fill them, running continuously on a virtual machine you own. No seat costs, no hiring pipeline, no org chart. Just a desktop app and a company that runs.',
    tagline: 'Every role in your company. One machine.',
    stack: ['React', 'TypeScript', 'Tauri', 'Rust', 'FastAPI', 'Redis'],
    url: 'https://trusynth.com',
    featured: true,
    previewImage: '/screenshots/synthos-preview.png',
  },
  {
    name: 'TRU Spend',
    brandedName: { pre: 'TRU ', bold: 'Spend' },
    description: 'Ontology-backed SaaS spend intelligence that finds hidden software waste other tools structurally cannot see. AI agents map your entire vendor stack, resolve entity aliases across systems, and build audit-ready proof for every dollar saved.',
    tagline: 'Your SaaS spend is hiding money from you.',
    stack: ['React', 'TypeScript', 'Supabase', 'FastAPI', 'Claude API'],
    url: 'https://spend.trusynth.com',
    featured: true,
    previewImage: '/screenshots/truspend-preview.png',
  },
  {
    name: 'SynthOS Voice Interface',
    brandedName: { pre: 'Synth', bold: 'OS', post: ' Voice' },
    description: 'Turns spoken commands into live UI components — no clicks, no code, no waiting. The interface listens, interprets intent, and renders structured JSON into real interface elements in real-time. A working proof that the next input paradigm isn\'t a keyboard.',
    tagline: 'Speak a command. Watch the UI build itself.',
    stack: ['React', 'TypeScript', 'Web Speech API', 'JSON Schema', 'SynthOS'],
    youtubeUrl: 'https://www.youtube.com/watch?v=7tuRpqwvZuI&t=1s',
  },
  {
    name: 'Robotics Pick & Place',
    brandedName: { pre: 'Robotics ', bold: 'P&P' },
    description: 'LLM-managed robotic manipulation — a multimodal AI acts as the perception layer for a Franka Panda arm. MuJoCo physics simulation with Gemini vision for autonomous object detection, grasping, and sorting — all running in the browser.',
    tagline: 'LLM-managed robot manipulation.',
    stack: ['React', 'Three.js', 'MuJoCo WASM', 'Gemini API'],
    previewImage: '/screenshots/robotics/preview.png',
    landingPage: '/robotics',
  },
  {
    name: 'TruSales CRM',
    brandedName: { pre: 'Tru', bold: 'Sales' },
    description: 'Agent-first sales platform. AI agents run your pipeline end-to-end — prospecting, outreach, deal tracking — you just approve the moves.',
    stack: ['React', 'TypeScript', 'Supabase', 'Zustand'],
    previewImage: '/screenshots/trusales-preview.png',
    url: 'https://sales.trusynth.com',
    landingPage: '/trusales',
  },
]

/* ── Agents ── */
const agents: Project[] = [
  {
    name: 'X Engagement Agent',
    brandedName: { pre: 'X ', bold: 'Agent' },
    description: 'Your Twitter on autopilot. Claude decides what to engage with, crafts contextual replies, avoids AI detection patterns.',
    tagline: 'Autonomous social engagement.',
    stack: ['Python', 'Selenium', 'Claude CLI', 'SQLite'],
    featured: true,
  },
  {
    name: 'LinkedIn Outreach Agent',
    brandedName: { pre: 'LinkedIn ', bold: 'Agent' },
    description: 'Fully autonomous lead-gen system. AI crafts personalized connection requests, manages intelligent follow-up sequences, and pipes qualified leads into a built-in CRM — human approves via Telegram.',
    tagline: 'Autonomous pipeline generation.',
    stack: ['Python', 'Selenium', 'Claude CLI', 'SQLite', 'Telegram Bot'],
    featured: true,
  },
]

/* ── Legacy / earlier ventures ── */
const legacyProjects: LegacyProject[] = [
  {
    name: 'TRU Graphics',
    brandedName: { pre: 'TRU ', bold: 'Graphics' },
    description: 'Founded and scaled a digital content studio. Led a team of 6 creatives, managed 20+ concurrent clients, delivered 500+ projects, and generated over \u20AC1.5M in client revenue in 2022 alone.',
    stack: ['Figma', 'After Effects', 'Premiere Pro', 'AI Tools'],
    url: 'https://projects.georgetru.com/tru-graphics',
    previewImage: '/screenshots/tru-graphics.jpg',
    year: '2021\u20132023',
    location: 'Paris',
  },
  {
    name: 'AI Photo Agency',
    brandedName: { pre: 'AI Photo ', bold: 'Agency' },
    description: 'Online platform that democratizes professional photography. Transforms regular photos into studio-grade images using generative AI, with integrated payments and self-serve onboarding.',
    stack: ['Next.js', 'Python', 'Stable Diffusion', 'Stripe'],
    url: 'https://ai-photo-agency1.vercel.app',
    previewImage: '/screenshots/aiphoto-agency.jpg',
    year: '2024',
    location: 'Berlin',
  },
  {
    name: 'School Spirit',
    brandedName: { pre: 'School', bold: 'Spirit' },
    description: 'MVP education platform that proved the AI-in-learning thesis. AI-driven curriculum generation and adaptive testing \u2014 the proof-of-concept that evolved into TRU SYNTH.',
    stack: ['React', 'Firebase', 'OpenAI API', 'Stripe'],
    url: 'https://projects.georgetru.com/schoolspirit',
    previewImage: '/screenshots/schoolspirit.jpg',
    year: '2023',
    location: 'Turin',
  },
  {
    name: 'Ponic.cz',
    brandedName: { pre: 'Ponic', bold: '.cz' },
    description: 'Pioneered accessible hydroponics in the Czech market. Custom 3D-printed hardware, modular plant-growing systems, and an e-commerce storefront.',
    stack: ['3D Printing', 'IoT', 'Hardware', 'E-commerce'],
    url: 'https://projects.georgetru.com/ponic',
    previewImage: '/screenshots/ponic.jpg',
    year: '2020',
    location: 'Prague',
  },
  {
    name: 'Oh My Teddy',
    brandedName: { pre: 'Oh My ', bold: 'Teddy' },
    description: 'First importer of flower teddy bears to the Czech Republic. Built the brand from sourcing to Instagram marketing, selling 100+ units across Prague.',
    stack: ['E-commerce', 'Import', 'Instagram Marketing'],
    previewImages: ['/screenshots/ohmyteddy/teddy-instagram.jpg', '/screenshots/ohmyteddy/teddy-delivery.jpg', '/screenshots/ohmyteddy/teddy-moet.jpg', '/screenshots/ohmyteddy/teddy-inventory.jpg'],
    year: '2018',
    location: 'Prague',
  },
  {
    name: 'EQTL Clothing',
    brandedName: { pre: 'EQTL ', bold: 'Clothing' },
    description: 'Founded Equilateral Clothing \u2014 a streetwear brand designed, produced, and sold from scratch. Managed everything from graphic design and sourcing to photoshoots and retail distribution across Prague.',
    stack: ['Graphic Design', 'Branding', 'Production', 'Retail'],
    previewImages: ['/screenshots/eqtl/eqtl-instagram.jpg', '/screenshots/eqtl/eqtl-front-back.jpg', '/screenshots/eqtl/eqtl-sunset.jpg', '/screenshots/eqtl/eqtl-store.jpg'],
    year: '2017',
    location: 'Prague',
  },
  {
    name: 'Sneaker Re-Sell',
    brandedName: { pre: 'Sneaker ', bold: 'Re-Sell' },
    description: 'Early sneaker reselling operation focused on limited Yeezy drops. Sourced, authenticated, and flipped limited-edition pairs at scale \u2014 first taste of entrepreneurship at 13.',
    stack: ['E-commerce', 'Logistics', 'Market Analysis'],
    videoUrl: 'https://www.youtube.com/watch?v=08aYLmZRkCY&t=185s',
    year: '2016',
    location: 'Prague',
  },
]

function BrandedName({ project, className = '' }: { project: Project | LegacyProject; className?: string }) {
  if (project.brandedName) {
    return (
      <span className={className}>
        <span className="font-light">{project.brandedName.pre}</span>
        <span className="font-black">{project.brandedName.bold}</span>
        {project.brandedName.post && <span className="font-light">{project.brandedName.post}</span>}
      </span>
    )
  }
  return <span className={className}>{project.name}</span>
}

function CategoryHeading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 mt-16 first:mt-0">
      <h3 className="text-xs uppercase tracking-[0.2em] text-muted font-medium">{label}</h3>
      <div className="h-px flex-1 bg-white/[0.06]" />
    </div>
  )
}

function FeaturedCard({ project, span2 }: { project: Project; span2?: boolean }) {
  return (
    <div
      className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] hover:border-white/[0.15] rounded-[24px] overflow-hidden transition-[border-color,box-shadow] duration-500${span2 ? ' lg:col-span-2' : ''}`}
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1 bg-white/[0.08] text-gold-light text-[10px] uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full border border-white/[0.06]">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        </div>

        {span2 && project.previewImage && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg overflow-hidden border border-white/[0.04] hover:border-white/[0.1] mb-5 transition-all group/preview"
          >
            <img
              src={project.previewImage}
              alt={`${project.name} preview`}
              className="w-full h-auto opacity-90 group-hover/preview:opacity-100 transition-opacity"
              loading="lazy"
            />
          </a>
        )}
        {span2 && !project.previewImage && (
          <div className="rounded-lg aspect-video bg-white/[0.02] border border-white/[0.04] mb-5 flex items-center justify-center">
            <span className="text-xs text-muted/40 font-mono tracking-wider uppercase">Screenshot</span>
          </div>
        )}

        {project.name === 'SynthOS' ? (
          <>
            <div className="flex items-center gap-1.5 mb-3">
              <img src="/tru-logo.png" alt="TRU" className="h-5 w-auto" />
              <h3 className="text-2xl md:text-3xl tracking-tight">
                <span className="font-light text-primary">Synth</span><span className="font-black synthos-liquid-gold">OS</span>
              </h3>
            </div>
            {project.tagline && (
              <p className="text-lg md:text-xl font-semibold text-gold mb-4">
                {project.tagline}
              </p>
            )}
          </>
        ) : (
          <>
            <h3 className="text-xl text-primary mb-2">
              <BrandedName project={project} />
            </h3>
            {project.tagline && (
              <p className="text-xs text-secondary font-medium mb-3">
                {project.tagline}
              </p>
            )}
          </>
        )}

        <p className="text-sm text-secondary leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] text-muted border border-white/[0.04] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-muted hover:text-primary transition-colors group/link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded"
          >
            <span className="font-mono">{project.url.replace('https://', '')}</span>
            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] card-hover-glow rounded-[24px] overflow-hidden transition-[border-color,box-shadow] duration-500"
    >
      <div className="p-6">
        {project.previewImage && (project.landingPage || project.url) && (
          project.landingPage ? (
            <Link
              to={project.landingPage}
              className="block rounded-lg overflow-hidden border border-white/[0.04] hover:border-white/[0.1] mb-5 transition-all group/preview"
            >
              <img
                src={project.previewImage}
                alt={`${project.name} preview`}
                className="w-full h-auto opacity-90 group-hover/preview:opacity-100 transition-opacity"
                loading="lazy"
              />
            </Link>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg overflow-hidden border border-white/[0.04] hover:border-white/[0.1] mb-5 transition-all group/preview"
            >
              <img
                src={project.previewImage}
                alt={`${project.name} preview`}
                className="w-full h-auto opacity-90 group-hover/preview:opacity-100 transition-opacity"
                loading="lazy"
              />
            </a>
          )
        )}

        <div className="flex items-start justify-between mb-3">
          {project.name === 'TRU Spend' ? (
            <div className="flex items-center gap-1.5">
              <img src="/tru-logo.png" alt="TRU" className="h-5 w-auto" />
              <h3 className="text-xl tracking-tight">
                <span className="font-bold text-primary">Spend</span>
              </h3>
            </div>
          ) : project.name === 'TruSales CRM' ? (
            <div className="flex items-center gap-1.5">
              <img src="/tru-logo.png" alt="TRU" className="h-5 w-auto" />
              <h3 className="text-xl tracking-tight">
                <span className="font-bold text-primary">Sales</span>
              </h3>
            </div>
          ) : (
            <h3 className="text-xl text-primary">
              <BrandedName project={project} />
            </h3>
          )}
        </div>

        <p className="text-sm text-secondary mb-5 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.05] text-muted border border-white/[0.04] font-mono"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.landingPage ? (
          <Link
            to={project.landingPage}
            className="inline-flex items-center gap-1.5 mt-4 text-xs text-gold hover:text-gold-light transition-colors group/link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded"
          >
            <span className="font-medium">View Demo &amp; Features</span>
            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        ) : project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted hover:text-primary transition-colors group/link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold rounded"
          >
            <ExternalLink size={12} />
            <span className="font-mono">{project.url.replace('https://', '')}</span>
          </a>
        )}
      </div>
    </div>
  )
}

function VideoEmbedCard({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false)
  const match = project.youtubeUrl?.match(/[?&]v=([^&]+)/)
  const videoId = match?.[1] ?? ''
  const timeMatch = project.youtubeUrl?.match(/[?&]t=(\d+)/)
  const startTime = timeMatch?.[1] ?? '0'

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] card-hover-glow rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500">
      <div className="h-0.5 w-full bg-blue-500/40" />
      <div className="p-5 flex flex-col lg:flex-row lg:gap-5">
        {/* Video embed — left side */}
        <div className="w-full lg:w-80 shrink-0 rounded-lg overflow-hidden border border-white/[0.06] bg-black">
          {playing ? (
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&rel=0`}
                title={`${project.name} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="relative cursor-pointer group/thumb"
              onClick={() => setPlaying(true)}
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={`${project.name} demo`}
                className="w-full h-auto opacity-80 group-hover/thumb:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/[0.15] flex items-center justify-center group-hover/thumb:scale-110 group-hover/thumb:bg-gold/20 group-hover/thumb:border-gold/30 transition-all duration-300">
                  <Play size={18} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-[9px] font-mono text-white/70 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Watch Demo
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card content — right side */}
        <div className="flex-1 mt-4 lg:mt-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <img src="/tru-logo.png" alt="TRU" className="h-4 w-auto" />
              <h3 className="text-base tracking-tight">
                <span className="font-light text-primary">Synth</span>
                <span className="font-black synthos-liquid-gold">OS</span>
                <span className="font-light text-primary ml-1">Voice</span>
              </h3>
            </div>
          </div>

          {project.tagline && (
            <p className="text-xs font-semibold text-gold mb-1.5">{project.tagline}</p>
          )}

          <p className="text-[13px] text-secondary mb-3 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-muted border border-white/[0.04] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

function YouTubeModal({ videoUrl, onClose }: { videoUrl: string; onClose: () => void }) {
  const match = videoUrl.match(/[?&]v=([^&]+)/)
  const videoId = match?.[1] ?? ''
  const timeMatch = videoUrl.match(/[?&]t=(\d+)/)
  const startTime = timeMatch?.[1] ?? '0'

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.2] transition-colors"
        >
          <X size={16} />
        </button>
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${startTime}&rel=0`}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function LegacyCard({ project, span2 }: { project: LegacyProject; span2?: boolean }) {
  const videoId = project.videoUrl?.match(/[?&]v=([^&]+)/)?.[1] ?? null
  const [ytModalOpen, setYtModalOpen] = useState(false)
  const closeYtModal = useCallback(() => setYtModalOpen(false), [])

  return (
    <>
    <div
      className={`group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.10] rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500${span2 ? ' lg:col-span-2' : ''}`}
    >
      <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className={`p-5 pl-6${span2 ? ' flex flex-col lg:flex-row lg:items-center lg:gap-6' : ''}`}>
        <div className={span2 ? 'flex-1' : ''}>
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-base font-semibold text-primary">
              <BrandedName project={project} />
            </h4>
            <span className="text-[11px] font-mono text-gold shrink-0">{project.year}</span>
          </div>

          <div className="flex items-center gap-1.5 mb-3">
            <MapPin size={10} className="text-muted" />
            <span className="text-[11px] text-secondary">{project.location}</span>
          </div>

          {project.previewImage && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all group/preview"
            >
              <img
                src={project.previewImage}
                alt={`${project.name} preview`}
                className="w-full h-auto opacity-80 group-hover/preview:opacity-100 transition-opacity"
                loading="lazy"
              />
            </a>
          )}

          {project.previewImages && project.previewImages.length > 0 && (
            <div className="mb-4 space-y-2">
              <div className="rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all">
                <img
                  src={project.previewImages[0]}
                  alt={`${project.name} main`}
                  className="w-full h-56 object-cover object-top opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              {project.previewImages.length > 1 && (
                <div className={`grid gap-2 ${project.previewImages.length - 1 === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {project.previewImages.slice(1).map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all">
                      <img
                        src={src}
                        alt={`${project.name} ${i + 2}`}
                        className="w-full h-36 object-cover opacity-80 hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-secondary leading-relaxed mb-4">
            {project.description}
          </p>

          {span2 && (
            <p className="text-xs italic text-gold/60 mb-4">
              Where it all started — reselling Yeezys at 13, learning supply &amp; demand the hard way.
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/[0.04] font-mono"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white shadow-[0_2px_8px_-2px_rgba(146,132,102,0.5)] hover:brightness-110 hover:shadow-[0_4px_12px_-2px_rgba(146,132,102,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <ExternalLink size={10} />
                <span>Visit Site</span>
              </a>
            )}
            {project.videoUrl && (
              <button
                onClick={() => setYtModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white shadow-[0_2px_8px_-2px_rgba(146,132,102,0.5)] hover:brightness-110 hover:shadow-[0_4px_12px_-2px_rgba(146,132,102,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer"
              >
                <Play size={10} fill="currentColor" />
                <span>Watch Video</span>
              </button>
            )}
          </div>
        </div>

        {span2 && videoId && (
          <div
            className="block mt-4 lg:mt-0 w-full lg:w-64 shrink-0 rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all group/thumb cursor-pointer"
            onClick={() => setYtModalOpen(true)}
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt={`${project.name} video`}
                className="w-full h-auto opacity-80 group-hover/thumb:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover/thumb:scale-110 transition-transform">
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        )}

        {!span2 && videoId && (
          <div
            className="block mb-4 rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all group/thumb cursor-pointer"
            onClick={() => setYtModalOpen(true)}
          >
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt={`${project.name} video`}
                className="w-full h-auto opacity-80 group-hover/thumb:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover/thumb:scale-110 transition-transform">
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    {ytModalOpen && project.videoUrl && <YouTubeModal videoUrl={project.videoUrl} onClose={closeYtModal} />}
    </>
  )
}

function SectionHeading() {
  return (
    <div className="mb-6 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Products & Agents</p>
      <h2 className="text-3xl md:text-5xl font-semibold">
        <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
          The Full Stack
        </span>
      </h2>
    </div>
  )
}

function LegacyHeading() {
  return (
    <div className="mb-8 mt-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted font-mono text-center mb-3">2016 &ndash; 2024</p>
      <h3 className="text-xl md:text-2xl font-semibold text-center text-secondary">
        Earlier Ventures
      </h3>
    </div>
  )
}

function FoundationsHeading() {
  return (
    <div className="mb-8 mt-20">
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted font-mono text-center mb-3">Foundations</p>
      <h3 className="text-xl md:text-2xl font-semibold text-center text-secondary">
        Why AI Agents?
      </h3>
    </div>
  )
}

function VideoModal({ onClose }: { onClose: () => void }) {
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const v = modalVideoRef.current
    if (!v) return
    v.play()

    function onTime() {
      if (!v) return
      setProgress(v.duration ? v.currentTime / v.duration : 0)
      setCurrentTime(formatTime(v.currentTime))
    }
    function onLoaded() { if (v) setDuration(formatTime(v.duration)) }
    function onEnd() { setPlaying(false) }

    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('ended', onEnd)
    return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onLoaded); v.removeEventListener('ended', onEnd) }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function togglePlay() {
    const v = modalVideoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const v = modalVideoRef.current
    if (!v || !v.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    v.currentTime = ratio * v.duration
  }

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.2] transition-colors"
        >
          <X size={16} />
        </button>

        {/* Video */}
        <video
          ref={modalVideoRef}
          className="w-full h-auto cursor-pointer"
          playsInline
          preload="auto"
          poster="/videos/tru-content-moderation-thumb.jpg"
          onClick={togglePlay}
        >
          <source src="/videos/tru-content-moderation.mp4" type="video/mp4" />
        </video>

        {/* Custom controls */}
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={togglePlay} className="text-white/70 hover:text-gold transition-colors shrink-0">
            {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          </button>

          <span className="text-[11px] font-mono text-muted shrink-0 w-10 text-right">{currentTime}</span>

          {/* Progress bar */}
          <div className="flex-1 h-6 flex items-center cursor-pointer group/bar" onClick={seek}>
            <div className="w-full h-[2px] bg-white/[0.08] rounded-full relative group-hover/bar:h-[3px] transition-all">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold/80 to-gold rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_6px_rgba(146,132,102,0.6)] opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: `${progress * 100}%`, marginLeft: '-5px' }}
              />
            </div>
          </div>

          <span className="text-[11px] font-mono text-muted shrink-0 w-10">{duration}</span>
        </div>
      </div>
    </div>
  )
}

function GoogleCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.10] rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500 lg:col-span-2">
        <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

        <div className="p-5 pl-6 flex flex-col lg:flex-row lg:gap-6">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <img src="/google-g.svg" alt="Google" className="h-8 w-8" />
                <div>
                  <h4 className="text-base font-semibold text-primary">
                    <span className="font-black">Google</span>
                    <span className="font-light text-muted"> × Cognizant</span>
                  </h4>
                  <p className="text-xs text-secondary">Trust & Safety</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-gold shrink-0">2023&ndash;2024</span>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              <MapPin size={10} className="text-muted" />
              <span className="text-[11px] text-secondary">Lisbon, Portugal</span>
            </div>

            {/* Timeline */}
            <div className="relative pl-4 border-l border-white/[0.06] space-y-3 mb-4">
              <div>
                <p className="text-xs font-medium text-primary">Content Analyst — Google Search</p>
                <p className="text-[11px] text-muted">Started on the Czech market team, reviewing and rating search quality at scale.</p>
              </div>
              <div>
                <p className="text-xs font-medium text-primary">Regional Trust & Safety Manager — Czech Republic Markets</p>
                <p className="text-[11px] text-muted">Promoted to lead content moderation operations for the Czech market. Built internal tooling to streamline review workflows.</p>
              </div>
            </div>

            <p className="text-sm text-secondary leading-relaxed mb-4">
              Moderators had to manually read every piece of flagged content, find the violation, and write a justification — thousands of reviews a day. I built a tool that analyzed content automatically and surfaced the verdict with reasoning. Reviewers just had to approve or override — human in the loop. It became the team's internal standard and was my first product shipped at enterprise scale — the spark that led to TRU OS and eventually SynthOS.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {['Google', 'Trust & Safety', 'Human-in-the-Loop', 'Content Moderation'].map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/[0.04] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Video thumbnail — click to open modal */}
          <div className="mt-4 lg:mt-0 w-full lg:w-72 shrink-0">
            <div
              className="relative rounded-lg overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer group/video"
              onClick={() => setModalOpen(true)}
            >
              <img
                src="/videos/tru-content-moderation-thumb.jpg"
                alt="Content Moderation Tool preview"
                className="w-full h-auto opacity-80 group-hover/video:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm group-hover/video:scale-110 transition-transform">
                  <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
              </div>
              <p className="text-[10px] text-muted mt-2 text-center font-mono">Content Moderation Tool</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video lightbox modal — portaled to body so fixed positioning works */}
      {modalOpen && createPortal(<VideoModal onClose={closeModal} />, document.body)}
    </>
  )
}

const AGENTS_PDF_DRIVE_ID = '1m92jC0I_mCJ7X4p-3MGXsmougKwm_HN5'
const AGENTS_PDF_EMBED = `https://drive.google.com/file/d/${AGENTS_PDF_DRIVE_ID}/preview`
const AGENTS_PDF_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${AGENTS_PDF_DRIVE_ID}`

function PdfViewerModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [fullscreen, setFullscreen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (fullscreen) setFullscreen(false)
        else onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, fullscreen])

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
      <div
        className={`relative z-10 flex flex-col bg-[#0a0a0a] border border-white/[0.08] shadow-2xl transition-all duration-300 ${
          fullscreen
            ? 'w-full h-full rounded-none'
            : 'w-[95vw] max-w-5xl h-[92vh] rounded-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
              <FileText size={14} className="text-gold" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary leading-none">{title}</h3>
              <p className="text-[10px] text-muted font-mono mt-0.5">30 pages</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Download */}
            <a
              href={AGENTS_PDF_DOWNLOAD}
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center gap-1.5 px-3 text-muted hover:text-gold hover:border-gold/30 transition-all text-[11px] font-medium"
              title="Download PDF"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download</span>
            </a>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-muted hover:text-primary hover:border-white/[0.15] transition-all"
              title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-muted hover:text-white hover:border-white/[0.2] transition-all"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Google Drive PDF embed */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
              <p className="text-xs text-muted font-mono">Loading document...</p>
            </div>
          )}
          <iframe
            src={AGENTS_PDF_EMBED}
            className="w-full h-full border-0"
            allow="autoplay"
            onLoad={() => setLoading(false)}
            title={title}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function AgentsPlaybookCard() {
  const [pdfOpen, setPdfOpen] = useState(false)
  const closePdf = useCallback(() => setPdfOpen(false), [])

  return (
    <>
      <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.10] rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:shadow-[0_0_40px_-12px_rgba(146,132,102,0.12)]">
        <div className="flex flex-col sm:flex-row">
          {/* Cover — left side */}
          <div
            className="relative shrink-0 sm:w-[190px] w-full flex items-center justify-center p-5 sm:border-r border-white/[0.04] bg-gradient-to-br from-white/[0.03] via-transparent to-gold/[0.02] group/cover cursor-pointer"
            onClick={() => setPdfOpen(true)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(146,132,102,0.06) 0%, transparent 70%)'}} />
            <div className="relative [perspective:800px]">
              <div className="relative transition-transform duration-500 group-hover:[transform:rotateY(-3deg)_scale(1.03)]">
                {/* Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#928466]/40 via-[#928466]/20 to-[#928466]/40 rounded-l-sm z-10" />
                {/* Page edges */}
                <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[3px] rounded-r-[1px] z-0 overflow-hidden">
                  <div className="w-full h-full" style={{background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 3px)'}} />
                </div>
                {/* Stylized dark cover */}
                <div className="relative z-[1] w-full rounded-sm shadow-[6px_10px_30px_-6px_rgba(0,0,0,0.7),_2px_2px_8px_-2px_rgba(0,0,0,0.4)] border border-white/[0.06] flex flex-col items-center justify-between overflow-hidden opacity-90 group-hover/cover:opacity-100 transition-all duration-500" style={{aspectRatio: '2.6/4', background: 'linear-gradient(135deg, #0a0a0a 0%, #111 40%, #0a0a0a 100%)'}}>
                  {/* Concentric circles decoration */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{background: 'radial-gradient(circle at 40% 55%, rgba(146,132,102,0.15) 0%, transparent 60%)'}} />
                  {/* TRU logo area */}
                  <div className="mt-4">
                    <img src="/tru-logo.png" alt="TRU" className="h-5 w-auto opacity-80" />
                  </div>
                  {/* Title */}
                  <div className="text-center flex-1 flex flex-col justify-center gap-1 py-2 px-3">
                    <p className="text-[13px] font-light text-white/90 tracking-[0.12em] uppercase">AGENTS</p>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#928466]/50 to-transparent mx-auto" />
                    <p className="text-[6px] text-white/40 leading-[1.4] uppercase tracking-[0.1em]">Designing Systems<br />That Think & Act</p>
                  </div>
                  {/* Bottom */}
                  <p className="text-[5px] font-mono text-[#928466]/50 mb-3 tracking-[0.2em]">TRUSYNTH.COM</p>
                </div>
              </div>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-sm text-gold/90 border border-gold/15 whitespace-nowrap">
                30 pages
              </span>
            </div>
          </div>

          {/* Content — right side */}
          <div className="flex-1 p-5 sm:pl-6 flex flex-col justify-between min-h-0">
            <div>
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-gold" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-primary leading-snug">
                    <span className="font-black">Agents</span>
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-gold shrink-0">2025</span>
              </div>

              <p className="text-[13px] text-primary/80 leading-relaxed mb-3 font-medium">
                Designing Systems That Think & Act
              </p>

              <p className="text-[13px] text-secondary leading-relaxed mb-4">
                An executive playbook on Agentic AI — how multi-agent systems move from concept to production, the architecture behind autonomous workflows, and why the organizations that deploy them first will be the ones still standing. Real case studies, implementation blueprints, and the strategic framework behind SynthOS.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Playbook', 'Agentic AI', 'Architecture', 'Strategy'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/[0.04] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPdfOpen(true)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white shadow-[0_2px_8px_-2px_rgba(146,132,102,0.5)] hover:brightness-110 hover:shadow-[0_4px_12px_-2px_rgba(146,132,102,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer"
              >
                <BookOpen size={10} />
                <span>Preview</span>
              </button>
              <a
                href={AGENTS_PDF_DOWNLOAD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-muted hover:text-primary hover:border-white/[0.15] transition-all"
              >
                <Download size={10} />
                <span>Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {pdfOpen && <PdfViewerModal title="Agents — Designing Systems That Think & Act" onClose={closePdf} />}
    </>
  )
}

function FoundationsCards() {
  return (
    <div className="space-y-4">
      {/* Agents Playbook — full width */}
      <AgentsPlaybookCard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* TRU OS Book */}
      <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.10] rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:shadow-[0_0_40px_-12px_rgba(146,132,102,0.12)] h-full">

        <div className="flex flex-col sm:flex-row h-full">
          {/* Book cover — left side */}
          <a
            href="https://www.linkedin.com/feed/update/urn:li:activity:7163911140136239104/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 sm:w-[190px] w-full flex items-center justify-center p-5 sm:border-r border-white/[0.04] bg-gradient-to-br from-white/[0.03] via-transparent to-gold/[0.02] group/cover cursor-pointer"
          >
            {/* Ambient glow behind cover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(146,132,102,0.06) 0%, transparent 70%)'}} />
            <div className="relative [perspective:800px]">
              <div className="relative transition-transform duration-500 group-hover:[transform:rotateY(-3deg)_scale(1.03)]">
                {/* Book spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#928466]/40 via-[#928466]/20 to-[#928466]/40 rounded-l-sm z-10" />
                {/* Page edges effect — right side */}
                <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[3px] rounded-r-[1px] z-0 overflow-hidden">
                  <div className="w-full h-full" style={{background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 3px)'}} />
                </div>
                <img
                  src="/screenshots/tru-os-cover.png"
                  alt="TRU OS book cover"
                  className="relative z-[1] w-full h-auto rounded-sm shadow-[6px_10px_30px_-6px_rgba(0,0,0,0.7),_2px_2px_8px_-2px_rgba(0,0,0,0.4)] opacity-90 group-hover/cover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              {/* Page count badge */}
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-sm text-gold/90 border border-gold/15 whitespace-nowrap">
                326 pages
              </span>
            </div>
          </a>

          {/* Content — right side */}
          <div className="flex-1 p-5 sm:pl-6 flex flex-col justify-between min-h-0">
            <div>
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <BookOpen size={16} className="text-gold" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-primary leading-snug">
                    <span className="font-light">TRU </span>
                    <span className="font-black">OS</span>
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-gold shrink-0">2024</span>
              </div>

              <p className="text-[13px] text-primary/80 leading-relaxed mb-3 font-medium">
                Transformation of Business Entities from Traditional to Autonomous
              </p>

              <p className="text-[13px] text-secondary leading-relaxed mb-4">
                A 326-page book written in early 2024 — months before autonomous agents entered the mainstream conversation. Part thesis, part blueprint: a systematic case for why businesses will evolve from human-operated to self-running, and how to architect the transition. The ideas laid out here became the foundation for SynthOS.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Book', 'Autonomous Business', 'Written 2024', 'AI Agents'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/[0.04] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7163911140136239104/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white shadow-[0_2px_8px_-2px_rgba(146,132,102,0.5)] hover:brightness-110 hover:shadow-[0_4px_12px_-2px_rgba(146,132,102,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold w-fit"
            >
              <BookOpen size={10} />
              <span>Read on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bachelor's Thesis */}
      <div className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.10] rounded-[20px] overflow-hidden transition-[border-color,box-shadow] duration-500 hover:shadow-[0_0_40px_-12px_rgba(146,132,102,0.12)] h-full">

        <div className="flex flex-col sm:flex-row h-full">
          {/* Thesis cover — left side */}
          <div className="relative shrink-0 sm:w-[190px] w-full flex items-center justify-center p-5 sm:border-r border-white/[0.04] bg-gradient-to-br from-white/[0.03] via-transparent to-gold/[0.02] group/cover">
            {/* Ambient glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, rgba(146,132,102,0.06) 0%, transparent 70%)'}} />
            <div className="relative [perspective:800px]">
              <div className="relative transition-transform duration-500 group-hover:[transform:rotateY(-3deg)_scale(1.03)]">
                {/* Spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#928466]/40 via-[#928466]/20 to-[#928466]/40 rounded-l-sm z-10" />
                {/* Page edges — right side */}
                <div className="absolute right-[-3px] top-[3px] bottom-[3px] w-[3px] rounded-r-[1px] z-0 overflow-hidden">
                  <div className="w-full h-full" style={{background: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 3px)'}} />
                </div>
                {/* Stylized thesis cover */}
                <div className="relative z-[1] w-full rounded-sm shadow-[6px_10px_30px_-6px_rgba(0,0,0,0.7),_2px_2px_8px_-2px_rgba(0,0,0,0.4)] border border-black/[0.08] p-3.5 flex flex-col items-center justify-between overflow-hidden opacity-90 group-hover/cover:opacity-100 transition-all duration-500" style={{aspectRatio: '2.6/4', background: 'linear-gradient(to bottom, #f5f3ef, #eae7e0, #e5e2db)'}}>
                  {/* Top gold accent line */}
                  <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#928466]/50 to-transparent" />
                  {/* Bottom gold accent line */}
                  <div className="absolute bottom-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#928466]/50 to-transparent" />
                  {/* Inner decorative frame */}
                  <div className="absolute inset-[7px] border border-[#928466]/[0.15] rounded-[1px] pointer-events-none" />
                  {/* Corner decorations */}
                  <div className="absolute top-[5px] left-[5px] w-2 h-2 border-t border-l border-[#928466]/25 pointer-events-none" />
                  <div className="absolute top-[5px] right-[5px] w-2 h-2 border-t border-r border-[#928466]/25 pointer-events-none" />
                  <div className="absolute bottom-[5px] left-[5px] w-2 h-2 border-b border-l border-[#928466]/25 pointer-events-none" />
                  <div className="absolute bottom-[5px] right-[5px] w-2 h-2 border-b border-r border-[#928466]/25 pointer-events-none" />
                  {/* University crest area */}
                  <div className="w-12 h-12 rounded-full border border-[#928466]/30 flex items-center justify-center mt-2 bg-[#928466]/[0.06]">
                    <GraduationCap size={22} className="text-[#928466]" />
                  </div>
                  {/* Thesis title */}
                  <div className="text-center flex-1 flex flex-col justify-center gap-2.5 py-3">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#928466]/40 to-transparent mx-auto" />
                    <p className="text-[8px] font-mono text-[#928466]/70 uppercase tracking-[0.18em] leading-tight">Bachelor's Thesis</p>
                    <p className="text-[7px] text-black/50 leading-[1.5] px-1">Ontology-Governed Autonomous Enterprises in African Resource Zones</p>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#928466]/40 to-transparent mx-auto" />
                  </div>
                  {/* Bottom details */}
                  <div className="text-center mb-1">
                    <p className="text-[7px] font-mono text-black/40">G. Trushevskiy</p>
                    <p className="text-[6px] font-mono text-[#928466]/60 mt-1">ESCP Business School</p>
                    <p className="text-[6px] font-mono text-black/30 mt-0.5">2025</p>
                  </div>
                </div>
              </div>
              {/* Badge */}
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-[#0a0a0a]/90 backdrop-blur-sm text-gold/90 border border-gold/15 whitespace-nowrap">
                BSc Thesis
              </span>
            </div>
          </div>

          {/* Content — right side */}
          <div className="flex-1 p-5 sm:pl-6 flex flex-col justify-between min-h-0">
            <div>
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <GraduationCap size={16} className="text-gold" />
                  </div>
                  <h4 className="text-[15px] font-semibold text-primary leading-snug">
                    <span className="font-light">Bachelor's </span>
                    <span className="font-black">Thesis</span>
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-gold shrink-0">2025</span>
              </div>

              <p className="text-[11px] text-muted/70 leading-relaxed mb-2 italic tracking-wide">
                ESCP Business School — Berlin, 2025
              </p>

              <p className="text-[13px] text-primary/80 leading-relaxed mb-3 font-medium">
                Analyzing the Viability and Geo-Economic Implications of China's Emergent Techno-Strategic Model: Ontology-Governed Autonomous Enterprises in African Resource Zones
              </p>

              <p className="text-[13px] text-secondary leading-relaxed mb-4">
                How autonomous enterprises — governed by ontology systems and powered by robotics and humanoid agents — could reshape natural resource extraction. The academic foundation behind the ontology engine and autonomous architecture that now drives the entire SynthOS stack.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {['ESCP', 'Ontology', 'Autonomous Systems', 'Research'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted border border-white/[0.04] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="mailto:george@trusynth.com?subject=Thesis%20Request"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-lg bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white shadow-[0_2px_8px_-2px_rgba(146,132,102,0.5)] hover:brightness-110 hover:shadow-[0_4px_12px_-2px_rgba(146,132,102,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold w-fit"
            >
              <GraduationCap size={10} />
              <span>Request Thesis</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const synthOS = products[0]
  const truSpend = products.find((p) => p.name === 'TRU Spend')!
  const truSales = products.find((p) => p.name === 'TruSales CRM')!
  const voiceInterface = products.find((p) => p.name === 'SynthOS Voice Interface')!
  const robotics = products.find((p) => p.name === 'Robotics Pick & Place')!

  return (
    <section id="projects" className="relative py-24 px-6 scroll-mt-24">
      {/* Section divider glow */}
      <div className="section-divider-line" />

      <div className="max-w-6xl mx-auto">
        <SectionHeading />

        <CategoryHeading label="Products" />

        {/* Row 1: SynthOS — flagship, full width with preview */}
        <div className="mb-6">
          <FeaturedCard project={synthOS} span2 />
        </div>

        {/* Row 2: TRU Spend + TruSales side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProjectCard project={truSpend} />
          <ProjectCard project={truSales} />
        </div>

        {/* Row 3: SynthOS Voice Interface — video demo card */}
        <div className="mb-6">
          <VideoEmbedCard project={voiceInterface} />
        </div>

        {/* Row 4: Robotics */}
        <div className="mb-6">
          <ProjectCard project={robotics} />
        </div>

        <CategoryHeading label="Agents" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {agents.filter((a) => a.featured).map((agent) => (
            <FeaturedCard key={agent.name} project={agent} />
          ))}
        </div>

        <div className="flex justify-center mb-6">
          <a
            href="https://trusynth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-secondary hover:border-gold/20 hover:text-gold-light transition-[border-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <span>Explore 50+ more AI agents doing autonomous work</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        <LegacyHeading />
        <div className="mb-4">
          <GoogleCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {legacyProjects.map((project) => (
            <LegacyCard key={project.name} project={project} span2={project.videoUrl != null} />
          ))}
        </div>

        <FoundationsHeading />
        <FoundationsCards />
      </div>
    </section>
  )
}
