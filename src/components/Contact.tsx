import { Mail, Linkedin, Globe, MessageCircle } from 'lucide-react'

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'george@trusynth.com',
    href: 'mailto:george@trusynth.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/georgetrushevskiy',
    href: 'https://linkedin.com/in/georgetrushevskiy',
  },
  {
    icon: Globe,
    label: 'TRU Synth',
    value: 'trusynth.com',
    href: 'https://trusynth.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Message me',
    href: 'https://wa.me/420777009354',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 px-6 scroll-mt-24">
      {/* Section divider glow */}
      <div className="section-divider-line" />

      <div className="max-w-4xl mx-auto text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Contact</p>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              Let's Build Something
            </span>
          </h2>
          <p className="text-base text-secondary max-w-lg mx-auto mb-12">
            Available for partnerships, consulting, and founding roles.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {contacts.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-float bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-[24px] p-6 hover:border-white/[0.12] hover:translate-y-[-6px] transition-[border-color,background-color,transform] duration-500 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={22} className="text-gold" />
                </div>
                <div className="text-sm font-medium text-primary mb-1">{c.label}</div>
                <div className="text-xs text-muted truncate">{c.value}</div>
              </a>
            )
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:george@trusynth.com"
            className="cta-pulse inline-block bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-8 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.6)] hover:brightness-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Get In Touch
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-primary px-8 py-3 rounded-xl font-medium hover:border-white/[0.12] hover:bg-white/[0.06] transition-[border-color,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Follow on X
          </a>
        </div>
      </div>
    </section>
  )
}
