import { ArrowRight } from 'lucide-react'

const flagEmojis: Record<string, string> = {
  RU: '\u{1F1F7}\u{1F1FA}',
  FR: '\u{1F1EB}\u{1F1F7}',
  IT: '\u{1F1EE}\u{1F1F9}',
  PT: '\u{1F1F5}\u{1F1F9}',
  DE: '\u{1F1E9}\u{1F1EA}',
  CZ: '\u{1F1E8}\u{1F1FF}',
}

interface CityStop {
  city: string
  note: string
  flag: string
  years: string
  description: string
}

const cities: CityStop[] = [
  {
    city: 'Moscow',
    note: 'Where it started',
    flag: 'RU',
    years: '2003\u20132008',
    description: 'Born and raised. First spark of curiosity.',
  },
  {
    city: 'Prague',
    note: 'School years',
    flag: 'CZ',
    years: '2008\u20132021',
    description:
      'Grew up here. High school, first ventures \u2014 founded Ponic.cz and started building.',
  },
  {
    city: 'Paris',
    note: 'ESCP Business School',
    flag: 'FR',
    years: '2021\u20132022',
    description:
      'ESCP Business School. Founded TRU Graphics, built a team of 6, generated \u20AC1.5M+ in client revenue.',
  },
  {
    city: 'Turin',
    note: 'ESCP exchange',
    flag: 'IT',
    years: '2022\u20132023',
    description:
      'ESCP exchange semester. Built School Spirit \u2014 the MVP that became TRU SYNTH.',
  },
  {
    city: 'Lisbon',
    note: 'Google',
    flag: 'PT',
    years: '2023\u20132024',
    description:
      'Work at Google. Enterprise-scale thinking meets startup ambition.',
  },
  {
    city: 'Berlin',
    note: 'ESCP final year',
    flag: 'DE',
    years: '2024\u20132025',
    description:
      'ESCP final year. Launched AI Photo Agency and deepened AI product work.',
  },
]

function TimelineCard({ stop, index }: { stop: CityStop; index: number }) {
  return (
    <div className="relative flex items-start gap-6 md:gap-10">
      {/* Timeline dot + line segment */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-5">
        {/* Vertical connecting line above dot (hidden for first item) */}
        {index > 0 && (
          <div
            className="absolute bottom-1/2 w-px bg-gradient-to-b from-gold/10 to-gold/40"
            style={{ top: '-2rem' }}
          />
        )}

        {/* Dot */}
        <div className="relative z-10">
          <div className="w-3.5 h-3.5 rounded-full border-2 bg-gold/50 border-gold/40" />
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 pb-10 md:pb-14">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-white/[0.1] transition-colors duration-300">
          {/* Year badge */}
          <span className="inline-block text-[11px] font-mono tracking-wider text-gold/80 bg-gold/[0.07] px-2.5 py-1 rounded-full mb-3">
            {stop.years}
          </span>

          {/* City + flag row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg" aria-hidden="true">
              {flagEmojis[stop.flag]}
            </span>
            <h3 className="text-lg font-semibold text-primary">{stop.city}</h3>
            <span className="text-xs text-muted ml-1">{stop.note}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-secondary leading-relaxed mt-2">
            {stop.description}
          </p>
        </div>
      </div>
    </div>
  )
}

/* "What's Next" final card */
function WhatsNextCard() {
  return (
    <div className="relative flex items-start gap-6 md:gap-10">
      <div className="relative flex flex-col items-center flex-shrink-0 w-5">
        <div
          className="absolute bottom-1/2 w-px bg-gradient-to-b from-gold/10 to-gold/40"
          style={{ top: '-2rem' }}
        />
        <div className="relative z-10">
          <div className="w-3.5 h-3.5 rounded-full border-2 bg-gold border-gold shadow-[0_0_14px_rgba(146,132,102,0.6)] animate-pulse" />
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white/[0.03] backdrop-blur-sm border border-gold/10 rounded-2xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <ArrowRight size={18} className="text-gold" />
            <h3 className="text-lg font-semibold text-primary">What's Next</h3>
          </div>
          <p className="text-sm text-secondary leading-relaxed mt-2">
            Building the future of autonomous AI agents.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 px-6 scroll-mt-24">
      {/* Section divider glow */}
      <div className="section-divider-line" />

      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">About</p>
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              The Journey
            </span>
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* The gold vertical line */}
          <div
            className="absolute left-[9px] top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, rgba(146,132,102,0.05), rgba(146,132,102,0.35) 15%, rgba(146,132,102,0.35) 85%, rgba(146,132,102,0.05))',
            }}
          />

          {/* Timeline stops */}
          {cities.map((stop, i) => (
            <TimelineCard key={stop.city} stop={stop} index={i} />
          ))}

          {/* What's Next */}
          <WhatsNextCard />
        </div>
      </div>
    </section>
  )
}
