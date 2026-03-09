import { Linkedin, ArrowUp } from 'lucide-react'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/georgetrushevskiy', isComponent: false },
  { icon: XIcon, label: 'X', href: 'https://x.com/GTrushevskiy', isComponent: true },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative">
      {/* Gradient border top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/tru-logo.png" alt="TRU" className="h-6 w-auto opacity-60" />
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 hover:bg-gold/[0.08] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {social.isComponent ? <Icon /> : <Icon size={18} />}
                  </a>
                )
              })}
            </div>

            {/* Copyright + back to top */}
            <div className="flex items-center gap-4">
              <p className="text-xs text-muted">
                &copy; 2026 George Trushevskiy
              </p>
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-muted hover:text-gold hover:border-gold/30 hover:bg-gold/[0.08] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <ArrowUp size={16} />
              </button>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted">
              Founder of TRU Synth
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
