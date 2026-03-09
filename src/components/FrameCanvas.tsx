import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react'
import { FlickeringGrid } from './flickering-grid'
import IntroStory from './IntroStory'

const FRAME_START = 20
const FRAME_END = 48
const FRAME_COUNT = FRAME_END - FRAME_START + 1

// Three-layer scroll — 250vh scroll range (wrapper 350vh - viewport 100vh)
// Layer 1 (0.00–0.30): Hero text fully visible, fades out 0.20–0.35
// Layer 2 (0.25–0.75): GIF canvas fades in, frames play, fades out
// Layer 3 (0.70–1.00): "What I've Built" preview fades in with FlickeringGrid
const HERO_FADE_START = 0.20
const HERO_FADE_END = 0.35
const CANVAS_FADE_IN_START = 0.18
const CANVAS_FADE_IN_END = 0.32
const ANIM_START = 0.22
const ANIM_END = 0.72
const CANVAS_FADE_OUT_START = 0.68
const CANVAS_FADE_OUT_END = 0.82
const PROJECTS_FADE_IN_START = 0.70
const PROJECTS_FADE_IN_END = 0.85
const INTRO_CONTENT_START = 0.74
const INTRO_CONTENT_END = 0.98

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function FrameCanvas({ children }: { children?: ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const heroLayerRef = useRef<HTMLDivElement>(null)
  const projectsLayerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)
  const introProgressRef = useRef(0) as MutableRefObject<number>
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = []
    for (let i = FRAME_START; i <= FRAME_END; i++) {
      const img = new Image()
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`
      img.decode().then(() => {
        loadedCount++
        if (loadedCount >= FRAME_COUNT) setLoaded(true)
      }).catch(() => {
        loadedCount++
        if (loadedCount >= FRAME_COUNT) setLoaded(true)
      })
      images.push(img)
    }
    framesRef.current = images
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper || !loaded) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let currentFrame = -1
    let ticking = false

    const draw = () => {
      const rect = wrapper.getBoundingClientRect()
      const scrollRange = wrapper.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = scrollRange > 0 ? Math.max(0, Math.min(scrolled / scrollRange, 1)) : 0

      // --- Frame index ---
      let frameProgress = 0
      if (progress > ANIM_START) {
        const raw = Math.min((progress - ANIM_START) / (ANIM_END - ANIM_START), 1)
        frameProgress = easeInOutCubic(raw)
      }
      const frameIndex = Math.min(Math.floor(frameProgress * FRAME_COUNT), FRAME_COUNT - 1)

      // --- Canvas opacity ---
      let canvasOpacity = 0
      if (progress < CANVAS_FADE_IN_START) {
        canvasOpacity = 0
      } else if (progress < CANVAS_FADE_IN_END) {
        canvasOpacity = easeOutCubic((progress - CANVAS_FADE_IN_START) / (CANVAS_FADE_IN_END - CANVAS_FADE_IN_START))
      } else if (progress <= CANVAS_FADE_OUT_START) {
        canvasOpacity = 1
      } else if (progress <= CANVAS_FADE_OUT_END) {
        canvasOpacity = 1 - easeOutCubic((progress - CANVAS_FADE_OUT_START) / (CANVAS_FADE_OUT_END - CANVAS_FADE_OUT_START))
      }
      canvas.style.opacity = String(loaded ? canvasOpacity : 0)

      // --- Overlay: opaque for hero, dims for GIF, fades to 0 before projects ---
      const overlay = overlayRef.current
      if (overlay) {
        let overlayOpacity = 1
        if (progress < CANVAS_FADE_IN_START) {
          overlayOpacity = 1
        } else if (progress < CANVAS_FADE_IN_END) {
          const t = (progress - CANVAS_FADE_IN_START) / (CANVAS_FADE_IN_END - CANVAS_FADE_IN_START)
          overlayOpacity = 1 - t * 0.65
        } else if (progress <= CANVAS_FADE_OUT_START) {
          overlayOpacity = 0.35
        } else {
          const t = easeOutCubic((progress - CANVAS_FADE_OUT_START) / (CANVAS_FADE_OUT_END - CANVAS_FADE_OUT_START))
          overlayOpacity = 0.35 * (1 - t)
        }
        overlay.style.opacity = String(overlayOpacity)
      }

      // --- Hero layer opacity (Layer 1) ---
      const heroLayer = heroLayerRef.current
      if (heroLayer) {
        let heroOpacity = 1
        if (progress > HERO_FADE_START) {
          const t = Math.min((progress - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START), 1)
          heroOpacity = 1 - easeOutCubic(t)
        }
        heroLayer.style.opacity = String(heroOpacity)
        // Parallax shift
        const shift = progress > HERO_FADE_START
          ? easeOutCubic(Math.min((progress - HERO_FADE_START) / (HERO_FADE_END - HERO_FADE_START), 1)) * 50
          : 0
        heroLayer.style.transform = `translate3d(0, ${-shift}px, 0)`
      }

      // --- Projects preview layer (Layer 3) ---
      const projectsLayer = projectsLayerRef.current
      if (projectsLayer) {
        let projectsOpacity = 0
        if (progress >= PROJECTS_FADE_IN_START && progress < PROJECTS_FADE_IN_END) {
          projectsOpacity = easeOutCubic((progress - PROJECTS_FADE_IN_START) / (PROJECTS_FADE_IN_END - PROJECTS_FADE_IN_START))
        } else if (progress >= PROJECTS_FADE_IN_END) {
          projectsOpacity = 1
        }
        projectsLayer.style.opacity = String(projectsOpacity)

        // Intro content scroll progress (0→1)
        if (progress >= INTRO_CONTENT_START) {
          introProgressRef.current = Math.min((progress - INTRO_CONTENT_START) / (INTRO_CONTENT_END - INTRO_CONTENT_START), 1)
        } else {
          introProgressRef.current = 0
        }
      }

      // --- Zoom on canvas during fade-out, reset when done ---
      if (progress > CANVAS_FADE_OUT_START && progress <= CANVAS_FADE_OUT_END) {
        const z = easeOutCubic((progress - CANVAS_FADE_OUT_START) / (CANVAS_FADE_OUT_END - CANVAS_FADE_OUT_START))
        canvas.style.transform = `scale(${1 + z * 0.15})`
      } else {
        // Reset transform when not zooming — prevents layout thrash at unstick
        canvas.style.transform = ''
      }

      // --- Draw frame ---
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex
        const img = framesRef.current[frameIndex]
        if (img && img.complete) {
          const w = window.innerWidth
          const h = window.innerHeight
          ctx.clearRect(0, 0, w, h)
          const imgRatio = img.naturalWidth / img.naturalHeight
          const canvasRatio = w / h
          let drawW: number, drawH: number, drawX: number, drawY: number
          if (imgRatio > canvasRatio) {
            drawH = h; drawW = h * imgRatio; drawX = (w - drawW) / 2; drawY = 0
          } else {
            drawW = w; drawH = w / imgRatio; drawX = 0; drawY = (h - drawH) / 2
          }
          ctx.drawImage(img, drawX, drawY, drawW, drawH)
        }
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [loaded])

  return (
    <div ref={wrapperRef} style={{ height: '350vh', position: 'relative' }}>
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Layer 2: GIF canvas (z-0) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0, opacity: 0, willChange: 'opacity, transform', transformOrigin: 'center center' }}
        />
        {/* Overlay (z-1) */}
        <div ref={overlayRef} className="hero-frame-overlay" />

        {/* Layer 1: Hero content (z-10) */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0"
          style={{ zIndex: 10, willChange: 'opacity, transform' }}
        >
          {children}
        </div>

        {/* Layer 3: Projects preview (z-5, behind hero but above canvas) */}
        <div
          ref={projectsLayerRef}
          className="absolute inset-0"
          style={{ zIndex: 5, opacity: 0, willChange: 'opacity' }}
        >
          {/* FlickeringGrid background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FlickeringGrid
              squareSize={4}
              gridGap={6}
              flickerChance={0.3}
              color="rgb(146, 132, 102)"
              maxOpacity={0.15}
            />
          </div>
          {/* "Hey I'm George" intro bio */}
          <div className="relative flex flex-col justify-center items-center h-full px-6">
            <IntroStory progressRef={introProgressRef} />
            {/* Gold arrow */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator">
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="10" y1="0" x2="10" y2="22" stroke="#928466" strokeWidth="1" />
                <path d="M4 17 L10 24 L16 17" stroke="#928466" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
          {/* Bottom fade to blend into Projects section below */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#050505] pointer-events-none z-10" />
        </div>
      </div>
    </div>
  )
}
