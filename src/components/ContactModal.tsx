import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, Check } from 'lucide-react'

const EMAIL = 'george@trusynth.com'

type SocialLink = {
  name: string
  href: string
  icon: string
  color: string
}

const socials: SocialLink[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/georgy-trushevskiy/',
    icon: '/socials/linkedin.svg',
    color: '#0A66C2',
  },
  {
    name: 'X',
    href: 'https://x.com/GTrushevskiy',
    icon: '/socials/x.svg',
    color: '#ffffff',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/420777009354',
    icon: '/socials/whatsapp.svg',
    color: '#25D366',
  },
]

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modal = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 350, damping: 30, delay: 0.05 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.06, duration: 0.35, ease: 'easeOut' as const },
  }),
}

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock body scroll + reset copied state
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setCopied(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center px-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-xl shadow-[0_0_60px_-12px_rgba(146,132,102,0.25)] overflow-hidden"
          >
            {/* Gold accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-primary hover:bg-white/[0.06] transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="px-8 pt-10 pb-8">
              <h2 className="text-2xl font-bold text-primary mb-1">
                Get In Touch
              </h2>
              <p className="text-sm text-secondary mb-8">
                Let's connect and build something great.
              </p>

              <div className="flex flex-col gap-3">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: `${social.color}15` }}
                    >
                      <img
                        src={social.icon}
                        alt={social.name}
                        className="w-5 h-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          filter:
                            social.name === 'LinkedIn'
                              ? 'brightness(0) saturate(100%) invert(35%) sepia(78%) saturate(1200%) hue-rotate(190deg) brightness(95%)'
                              : social.name === 'WhatsApp'
                                ? 'brightness(0) saturate(100%) invert(66%) sepia(60%) saturate(500%) hue-rotate(100deg) brightness(95%)'
                                : undefined,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-primary group-hover:text-gold-light transition-colors duration-300">
                        {social.name}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-muted group-hover:text-secondary group-hover:translate-x-0.5 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                ))}

                {/* Email row — click to open mail client, copy button to copy address */}
                <motion.div
                  custom={socials.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="group flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: 'rgba(146, 132, 102, 0.08)' }}
                  >
                    <img
                      src="/socials/email.svg"
                      alt="Email"
                      className="w-5 h-5 opacity-90"
                      style={{
                        filter: 'brightness(0) saturate(100%) invert(55%) sepia(15%) saturate(600%) hue-rotate(10deg) brightness(100%)',
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="text-sm font-medium text-primary hover:text-gold-light transition-colors duration-300 block truncate"
                    >
                      {EMAIL}
                    </a>
                    <span className="text-xs text-muted">Click to email</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200 cursor-pointer"
                    title="Copy email"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} className="text-secondary" />
                        <span className="text-secondary">Copy</span>
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
