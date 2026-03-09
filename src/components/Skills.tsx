import {
  Monitor,
  Server,
  Brain,
  Bot,
  Cloud,
  Briefcase,
  Terminal,
} from 'lucide-react'
import { Marquee } from './ui/marquee'

const categories = [
  {
    title: 'Agentic Engineering',
    icon: Terminal,
    description: 'Building autonomous systems that plan, execute, and self-correct — from single agents to multi-agent orchestration.',
    skills: ['Claude Code', 'Claude API', 'OpenAI Codex', 'Gemini API', 'OpenRouter', 'MCP Servers', 'Tool Use', 'Agent Loops'],
    span: 'md:col-span-2',
  },
  {
    title: 'Frontend',
    icon: Monitor,
    description: 'Production interfaces built for speed — React, real-time state, 3D, and desktop apps.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Tauri'],
    span: 'md:col-span-1',
  },
  {
    title: 'Backend',
    icon: Server,
    description: 'APIs, real-time pipelines, and the infrastructure layer behind production AI products.',
    skills: ['Python', 'FastAPI', 'Node.js', 'Supabase', 'PostgreSQL', 'Redis', 'Rust'],
    span: 'md:col-span-1',
  },
  {
    title: 'AI / ML',
    icon: Brain,
    description: 'Multi-model orchestration — vision, language, reasoning — across Claude, GPT, and Gemini.',
    skills: ['Claude 4.6', 'GPT-5.3', 'Gemini 3', 'Stable Diffusion', 'MuJoCo', 'RAG Pipelines', 'Embeddings'],
    span: 'md:col-span-1',
  },
  {
    title: 'Automation',
    icon: Bot,
    description: 'Browser automation, scraping pipelines, and always-on autonomous daemon processes.',
    skills: ['Selenium', 'Playwright', 'Puppeteer', 'Web Scraping', 'Cron Daemons', 'Telegram Bots'],
    span: 'md:col-span-1',
  },
  {
    title: 'DevOps & Infra',
    icon: Cloud,
    description: 'Ship fast, stay up. Edge deployments, containers, and CI/CD.',
    skills: ['Vercel', 'Railway', 'Fly.io', 'Docker', 'GitHub Actions', 'Cloudflare'],
    span: 'md:col-span-1',
  },
  {
    title: 'Business',
    icon: Briefcase,
    description: 'ESCP-trained. B2B strategy, procurement, and multilingual operations across 4 markets.',
    skills: ['ESCP Business School', 'B2B Sales', 'Procurement', 'EN / CZ / RU / DE'],
    span: 'md:col-span-1',
  },
]

const allSkills = categories.flatMap((c) => c.skills)

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 scroll-mt-24">
      {/* Section divider glow */}
      <div className="section-divider-line" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Expertise</p>
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              Skills & Tools
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <div
                key={cat.title}
                className={`bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[24px] p-6 hover:border-gold/20 card-hover-glow transition-[border-color,box-shadow] duration-500 ${cat.span}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-primary">{cat.title}</h3>
                </div>
                <p className="text-xs text-muted mt-1 mb-4">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-xl bg-white/[0.04] text-secondary border border-white/[0.04] hover:border-gold/30 hover:text-gold-light transition-[border-color,color] duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Scrolling marquee ticker */}
        <div className="mt-12 relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

          <Marquee pauseOnHover duration="30s" gap="0.75rem">
            {allSkills.map((skill) => (
              <span
                key={skill}
                className="inline-block text-xs px-3 py-1.5 rounded-full bg-white/[0.03] text-muted border border-white/[0.04] font-mono whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
