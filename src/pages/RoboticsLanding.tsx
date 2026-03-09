import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Eye, Crosshair, Hand, Brain, Box, Zap, Cpu, Maximize2, Minimize2 } from 'lucide-react'

const ROBOTICS_APP_URL = 'https://robotics-pick-and-place-one.vercel.app'

export default function RoboticsLanding() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="min-h-screen relative">
      {/* ── Nav ── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-obsidian/90 backdrop-blur-xl border border-white/[0.08] shadow-lg shadow-black/20">
        <a href="/" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} />
          <img src="/tru-logo.png" alt="TRU" className="h-4 w-auto" />
        </a>
        <div className="h-4 w-px bg-white/10" />
        <span className="text-sm font-bold text-primary tracking-tight">Robotics</span>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(146,132,102,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <img src="/tru-logo.png" alt="TRU" className="h-10 w-auto" />
            <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
              Robotics <span className="text-gold">P&P</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#E8E0CC] via-[#928466] to-[#E8E0CC] bg-clip-text text-transparent mb-4">
            Managing Robotics Systems with LLMs.
          </p>
          <p className="text-base md:text-lg text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            An end-to-end pipeline where a multimodal LLM acts as the perception layer for a robotic manipulation system.
            A single natural-language prompt drives the workflow — from visual object detection to physical pick-and-place execution.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <a
              href={ROBOTICS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-6 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.5)] hover:brightness-110 transition-all"
            >
              Launch App
              <ExternalLink size={16} />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-primary px-6 py-3 rounded-xl font-medium hover:border-white/[0.15] hover:bg-white/[0.06] transition-all"
            >
              Try Demo Below
              <Hand size={16} />
            </a>
          </div>

          {/* Hero screenshot */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40">
            <img
              src="/screenshots/robotics/preview.png"
              alt="Robotics Pick & Place"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-12 px-6 border-y border-white/[0.06]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '7-DOF', label: 'Robot Arm' },
            { value: 'Zero-shot', label: 'Object Detection' },
            { value: 'Real-time', label: 'Physics Sim' },
            { value: 'In-browser', label: 'WASM Execution' },
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

      {/* ── Pipeline ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">The Pipeline</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
              From prompt to physical action
            </h2>
            <p className="text-secondary max-w-xl mx-auto">
              Three stages transform a natural-language description into coordinated robotic manipulation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                num: '01',
                title: 'Perceive',
                description: 'Gemini Robotics ER receives a workspace snapshot and a target description. Returns object locations as bounding boxes, segmentation masks, or keypoints — zero-shot, no training required.',
              },
              {
                icon: Crosshair,
                num: '02',
                title: 'Localize',
                description: 'Each 2D detection is projected into 3D world coordinates by raycasting into the physics scene, mapping pixel-space predictions to precise spatial positions.',
              },
              {
                icon: Hand,
                num: '03',
                title: 'Manipulate',
                description: 'An analytical IK solver computes joint angles for the 7-DOF Franka Panda arm. A state machine sequences approach, grasp, transport, and release.',
              },
            ].map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: parseInt(step.num) * 0.15 }}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-6 hover:border-white/[0.12] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gold/60 tracking-wider">{step.num}</span>
                      <h3 className="text-lg font-semibold text-primary leading-tight">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Live Demo (iframe) ── */}
      <section id="demo" className="py-24 px-6 border-t border-white/[0.06] scroll-mt-24">
        <div className={isFullscreen ? 'fixed inset-0 z-[100] bg-black' : 'max-w-6xl mx-auto'}>
          {!isFullscreen && (
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Interactive</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
                Live Demo
              </h2>
              <p className="text-secondary max-w-xl mx-auto">
                The full robotics simulation running in your browser. Type a target, detect objects, and watch the robot pick them up.
              </p>
            </div>
          )}

          <div className={`relative ${isFullscreen ? 'w-full h-full' : 'rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40'}`}>
            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:border-white/[0.2] transition-colors"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <iframe
              src={ROBOTICS_APP_URL}
              title="Robotics Pick & Place Demo"
              className={`w-full border-0 bg-[#050505] ${isFullscreen ? 'h-full' : 'h-[600px] md:h-[700px]'}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="py-16 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-8">Built With</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            {[
              { icon: Brain, name: 'Gemini Robotics ER', role: 'Perception' },
              { icon: Box, name: 'MuJoCo WASM', role: 'Physics' },
              { icon: Zap, name: 'Three.js', role: 'Rendering' },
              { icon: Cpu, name: 'Analytical IK', role: '7-DOF Solver' },
            ].map((tech) => {
              const Icon = tech.icon
              return (
                <div key={tech.name} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 text-center">
                  <Icon size={18} className="text-gold/60 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-primary">{tech.name}</p>
                  <p className="text-[10px] text-muted mt-0.5">{tech.role}</p>
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['React 19', 'TypeScript', 'Three.js', 'MuJoCo WASM', 'Gemini API', 'Vite', 'Tailwind CSS'].map((tech) => (
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
            LLM-managed manipulation in your browser
          </h2>
          <p className="text-secondary mb-8">
            No installation. No GPU. Just a browser and a prompt.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={ROBOTICS_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-b from-[#c4b896] via-[#928466] to-[#6d6350] text-white px-8 py-3 rounded-xl font-medium shadow-[0_4px_20px_-4px_rgba(146,132,102,0.5)] hover:brightness-110 transition-all"
            >
              Launch Full App
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
    </div>
  )
}
