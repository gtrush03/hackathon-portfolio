# V0 x CONTRA HACKATHON — WINNING STRATEGY v2

> **Event:** Monday, March 10, 2026 | **Prize:** $5,000
> **Location:** Contra HQ, 300 Kent Ave, Brooklyn
> **Theme:** "Build the portfolio of your dreams"

---

## TABLE OF CONTENTS

1. [Judge Scores (Current)](#judge-scores)
2. [Hero Section Upgrade](#hero-upgrade)
3. [Spatial Product Showcase → Ponic](#spatial-showcase-ponic)
4. [Card Stack 3D → Projects](#card-stack-projects)
5. [Contact Section Redesign](#contact-redesign)
6. [Voice Assistant Integration](#voice-assistant)
7. [21st SDK / Agents Integration](#21st-sdk-agents)
8. [Component Integration Map](#component-map)
9. [1-Hour Execution Plan](#execution-plan)
10. [Pitch Script](#pitch-script)

---

## 1. JUDGE SCORES (Current Portfolio) <a name="judge-scores"></a>

| Category | Score | Key Issue |
|----------|-------|-----------|
| Visual Design | 8.5 | Obsidian+Gold is premium but "AI startup default" |
| Animations | 9.0 | FrameCanvas is cinema-quality |
| Layout | 8.0 | 25 projects overwhelms |
| Branding | 7.5 | Consistent but not distinctly *George* |
| UX/Navigation | 8.5 | Good mobile, intuitive flow |
| Storytelling | 9.0 | Geographic journey is compelling |
| CTAs | 7.5 | Generic copy, broken X link |
| Tech Innovation | 8.7 | FrameCanvas + FlickeringGrid novel |
| **OVERALL** | **8.2/10** | **Polished but won't win as-is** |

**Target with upgrades: 9.3/10**

---

## 2. HERO SECTION UPGRADE <a name="hero-upgrade"></a>

### Problem
Current hero wraps content in a **350vh FrameCanvas scroll container** with 29-frame animation. Users must scroll through ~2.5 extra viewports before reaching Projects. For a hackathon where judges want quick overview, this delays content access.

### Solution: 100vh Hero with Aurora Background

**Remove FrameCanvas wrapper. Make hero exactly one screen. Everything visible on load.**

#### What Stays
- Name "George Trushevskiy"
- "Builds AI That Ships" gold shimmer tagline
- ESCP + Google logos
- 4 stats (10+ Years, 7 Countries, 15+ Products, EUR 1.5M+)
- "View Projects" + "Get In Touch" CTAs
- ContactModal
- Spotlight component
- CursorGlow

#### What Changes

**A) Aurora Mesh Gradient Background (CSS-only)**
Replace static grid background with 3-4 large blurred blobs orbiting slowly:
```css
/* Blob 1: large gold, 20s orbit */
background: rgba(146, 132, 102, 0.15);
filter: blur(120px);
animation: aurora-drift-1 20s ease-in-out infinite;

/* Blob 2: darker gold, 25s orbit */
background: rgba(100, 80, 60, 0.10);
animation: aurora-drift-2 25s ease-in-out infinite;

/* Blob 3: light gold, 15s orbit */
background: rgba(200, 185, 155, 0.08);
animation: aurora-drift-3 15s ease-in-out infinite;
```
- GPU-composited (transform3d only)
- `mix-blend-mode: screen`
- `pointer-events: none`
- 0ms JavaScript cost

**B) Staggered Entrance Animation (CSS-only, <1.2s total)**
```
0ms    → Name fades up
150ms  → Tagline fades up
300ms  → Subtitle/flags
400ms  → Logos
500ms  → CTAs
600ms  → Stats
```
Each: `opacity: 0 → 1` + `translateY(20px) → 0`, 600ms duration, ease-out.

**C) Typography Tightening**
- Name: `text-8xl` desktop, `letter-spacing: -0.03em`, `font-weight: 200` (sharper contrast)
- Tagline: richer gradient, `text-shadow: 0 0 80px rgba(146,132,102,0.3)`, slower shimmer (8s)

**D) Magnetic Buttons (~20 lines JS)**
Both CTAs subtly pull toward cursor on hover (max 6-8px displacement). Spring back on mouseleave with cubic-bezier easing.

**E) Stat Counter Animation**
On load, stats count up: 0→10+, 0→7, 0→15+, 0→1.5M+ over 1.5s with easeOutCubic deceleration.

**F) Glass Stats Card**
Wrap 4 stats in a single glassmorphic container with `border-beam` animated border:
```
bg-white/[0.02] backdrop-blur-xl border-white/[0.05] rounded-2xl
```

#### Files to Change
| File | Change |
|------|--------|
| `src/App.tsx` | Remove `<FrameCanvas>` wrapper, render `<Hero />` directly |
| `src/components/Hero.tsx` | Add aurora blobs, entrance animations, magnetic buttons, stat counters, glass card |
| `src/index.css` | Add `@keyframes aurora-drift-*`, `@keyframes hero-enter` |
| `src/components/FrameCanvas.tsx` | Can delete (no longer imported) |

#### Performance Impact
- **Removed:** ~200 lines JS + 29 image preloads (~3-5MB)
- **Added:** ~50 lines JS + CSS-only animations
- **Net:** Faster load, instant content access, still visually striking

---

## 3. SPATIAL PRODUCT SHOWCASE → PONIC <a name="spatial-showcase-ponic"></a>

### What
Use the [Spatial Product Showcase](https://21st.dev/community/components/daiv09/spatial-product-showcase/default) component specifically for **Ponic.cz** — George's hydroponics hardware venture.

### Why Ponic
- **Hardware product** = perfect for spatial showcase (rotating halos, metric bars suit physical products)
- **Unique story** — 3D-printed hydroponics systems, IoT-enabled, e-commerce
- **Stands out** from the AI/software projects — shows range
- **Year 2020, Prague** — adds depth to the journey narrative

### Placement
**Above the projects section**, as a standalone showcase. Users can interact with it or scroll past to the full project grid.

```
[HERO - 100vh]
[SPATIAL SHOWCASE - Ponic.cz]  ← NEW: click-to-explore product showcase
[PROJECTS - Card Stack 3D]
[TESTIMONIALS]
[SKILLS]
[JOURNEY]
[CONTACT]
```

### Implementation
The component is ~300 lines, self-contained. Swap product data:

```tsx
const products = [
  {
    name: "Ponic System",
    tagline: "Modular hydroponics for everyone",
    metrics: [
      { label: "Custom Parts", value: "24+" },
      { label: "Growth Rate", value: "3x faster" },
      { label: "Water Saved", value: "90%" }
    ],
    image: "/screenshots/ponic.jpg"
  },
  {
    name: "Ponic Store",
    tagline: "Czech Republic's first hydroponics e-commerce",
    metrics: [
      { label: "Products", value: "50+" },
      { label: "Tech", value: "3D Printing + IoT" },
      { label: "Market", value: "Czech Republic" }
    ],
    image: "/screenshots/ponic-store.jpg"  // need this asset
  }
];
```

### Dependencies
- `framer-motion` (already have)
- `lucide-react` (already have)
- Zero new deps

---

## 4. CARD STACK 3D FAN CAROUSEL → PROJECTS <a name="card-stack-projects"></a>

### What
Replace the flat project grid with the [Card Stack 3D Fan Carousel](https://21st.dev/community/components/ruixenui/card-stack/default) for the **top 7 projects**.

### Placement
Users see this right after Ponic showcase. Cards fan out from center with rotation, depth, and tilt. Active card lifts and scales. Supports drag, keyboard nav, auto-advance.

### Curated Top 7 Projects (from current 25)
1. **SynthOS** — Flagship AI operating system
2. **TRU Sales** — AI sales pipeline
3. **Robotics P&P** — MuJoCo dual-robot manipulation
4. **Ghost Treasury** — Hackathon DAO project
5. **TRU Spend** — Expense tracking AI
6. **Content Moderation** — AI moderation system
7. **Ponic.cz** — Hydroponics (links to spatial showcase above)

### Implementation Notes
- Swap `next/link` → `<a>` tag (not using Next.js)
- Each card: project screenshot + title + 3-tag stack + "View" link
- `renderCard` prop for custom card content
- Auto-advance with pause-on-hover keeps it alive

### Legacy Projects
Move the remaining 18 projects into a collapsible "More Work" section below the carousel, or a simple linked page.

---

## 5. CONTACT SECTION REDESIGN <a name="contact-redesign"></a>

### Problems (Current)
- "Get In Touch" appears 3 times (generic)
- X/Twitter link is broken (`href="https://x.com"` — no handle)
- LinkedIn URL inconsistency (two different slugs in different files)
- ContactModal is just social links — no form
- Floating card animation undermines premium feel

### New Layout: Asymmetric Split

```
┌─────────────────────────────────────────────┐
│                                             │
│  LEFT (55%)              RIGHT (45%)        │
│                                             │
│  "Let's Build            ┌──────────────┐   │
│   Something Great"       │ Your Name    │   │
│                          │ ____________ │   │
│  Open to founding,       │ Email        │   │
│  partnerships, and       │ ____________ │   │
│  ambitious builds.       │ Message      │   │
│                          │              │   │
│  ┌─ Email ──── george@trusynth.com [⊕]┐│ ____________ │   │
│  ├─ LinkedIn ─ Connect on LinkedIn  [→]││              │   │
│  ├─ X ──────── @GTrushevskiy       [→]││ [Send →]     │   │
│  ├─ WhatsApp ─ Quick chat           [→]│└──────────────┘   │
│  └─ TRU Synth  trusynth.com        [→]│                    │
│                                             │
└─────────────────────────────────────────────┘
```

### Contact Rows (Pill-style, not cards)
Each row shows the actual handle/URL — no more "Message me" vagueness:
- **Email**: `george@trusynth.com` + copy button (reuse existing copy logic from ContactModal)
- **LinkedIn**: `Connect on LinkedIn` → `https://linkedin.com/in/georgetrushevskiy`
- **X**: `@GTrushevskiy` → `https://x.com/GTrushevskiy` (FIXED)
- **WhatsApp**: `Quick chat` → WhatsApp deep link
- **TRU Synth**: `trusynth.com` → website

### Inline Mini Form (Right Column)
- 3 fields: Name, Email, Message (3-line textarea)
- Submit via [Web3Forms](https://web3forms.com) (free, no backend)
- Success state: checkmark animation inside card
- Glassmorphic card:
  ```
  bg-white/[0.02] backdrop-blur-xl border-white/[0.08]
  rounded-2xl p-8
  ```

### Copy Changes
| Current | New |
|---------|-----|
| "Let's Build Something" | "Let's Build Something Great" |
| "Get In Touch" (CTA) | Remove — form has "Send Message" |
| "Follow on X" (CTA) | Remove — X is in contact rows |

### Quick Fixes (Do Now)
- [ ] Fix X link: `https://x.com` → `https://x.com/GTrushevskiy`
- [ ] Standardize LinkedIn: pick one slug across all files
- [ ] Remove floating animation on contact cards

---

## 6. VOICE ASSISTANT <a name="voice-assistant"></a>

### Why
**Nobody else at the hackathon will have "talk to my portfolio."** This is the single biggest differentiator.

### Recommended Stack: Web Speech API + Custom Orb + Gemini Flash

| Layer | Choice | Cost |
|-------|--------|------|
| **STT** | Web Speech API (browser-native) | FREE |
| **Brain** | Gemini 2.0 Flash (via your existing setup) | ~$0.001/query |
| **TTS** | Web Speech API or ElevenLabs | FREE / $5/mo |
| **UI** | Custom golden orb | Custom |

**Total cost: essentially $0**

### Voice UI Component: Golden Orb

A WebGL/canvas orb that matches the Obsidian & Gold design system.

**Library options:**
| Library | What | Install |
|---------|------|---------|
| `react-ai-orb` | WebGL orb with `goldenGlowPreset` | `npm i react-ai-orb` |
| `voice-orb-visualizer` | Canvas blob that deforms to audio | `npm i voice-orb-visualizer` |

**Three states with distinct animations:**

| State | Orb Visual | UI |
|-------|-----------|-----|
| **Idle** | Gentle breathing pulse, dim gold glow | "Ask me anything..." tooltip |
| **Listening** | Expands, gold intensifies, particle ring appears | Pulsing mic indicator |
| **Speaking** | Deforms to audio amplitude, gold ripples outward | Text streams below |

**Glassmorphic wrapper:**
```css
backdrop-filter: blur(40px);
background: rgba(146, 132, 102, 0.08);
border: 1px solid rgba(146, 132, 102, 0.15);
border-radius: 24px;
```

### Placement Options

**Option A: Floating widget (bottom-right)** — always accessible, doesn't block content
```
[Portfolio content]
                                    ┌─────────┐
                                    │  🔮 orb  │
                                    │ "Ask me" │
                                    └─────────┘
```

**Option B: Hero section integration** — orb lives in hero as a conversation starter
```
┌─────────────────────────────────────┐
│  George Trushevskiy                 │
│  Builds AI That Ships               │
│                                     │
│         [Golden Orb]                │
│    "Talk to my portfolio"           │
│                                     │
│  [View Projects] [Get In Touch]     │
└─────────────────────────────────────┘
```

**Option C: Dedicated section** — between Skills and Journey
```
[Skills]
┌──────────────────────────────────────┐
│        [Golden Orb - large]          │
│    "Ask me about George's work"      │
│                                      │
│    Try: "What is SynthOS?"           │
│         "Tell me about robotics"     │
│         "What's George's stack?"     │
└──────────────────────────────────────┘
[Journey]
```

### Agent Context (System Prompt)
Feed the voice agent your portfolio data so it can answer intelligently:
```
You are George's portfolio assistant. You know about:
- SynthOS: AI operating system for autonomous businesses
- TRU Sales: AI-powered sales pipeline
- Robotics P&P: MuJoCo dual-robot manipulation with Gemini vision
- Ghost Treasury: Hackathon DAO project on Monad blockchain
- Ponic.cz: Hydroponics hardware venture from Prague
- Journey: Moscow → Prague → Paris (ESCP) → Turin (Google) → Lisbon → Berlin → NYC
- Stats: 10+ years building, 7 countries, 15+ products shipped, EUR 1.5M+ revenue
- Stack: React, TypeScript, Python, Rust, Claude API, Gemini API, MuJoCo, Three.js
- Currently: NYC sprint, building autonomous AI systems
```

### Implementation Flow
```
1. User clicks orb or says "Hey"
2. Web Speech API starts listening
3. Transcript sent to Gemini Flash API
4. Response streamed back
5. Web Speech API speaks response (or ElevenLabs for better voice)
6. Orb animates throughout
```

### Cool Extras (If Time)
- Gold particle field swirling around orb when active
- Transcript fading in letter-by-letter below orb
- Ambient gold light casting onto nearby cards when speaking
- Sound wave ring radiating outward on each word

---

## 7. 21st SDK / AGENTS INTEGRATION <a name="21st-sdk-agents"></a>

### What is 21st SDK?
Production infrastructure for deploying AI agents inside your app. Three products:

| Product | What | Repo |
|---------|------|------|
| **Component Marketplace** | NPM for design engineers, shadcn components | [serafimcloud/21st](https://github.com/serafimcloud/21st) — MIT, 5K stars |
| **21st Agents SDK** | Deploy AI agents with chat UI, streaming, sandboxing | `@21st-sdk/agent`, `@21st-sdk/react` |
| **Magic MCP** | AI component generator for IDEs | [21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp) — MIT, 4.4K stars |
| **1code** | Open-source coding agent client (like Cursor) | [21st-dev/1code](https://github.com/21st-dev/1code) — Apache 2.0, 5.2K stars |

### How to Use at Hackathon

**Level 1: Component Marketplace (Already planned)**
- Pull 21st.dev community components (Spatial Showcase, Card Stack, Testimonials, Wavy Text, World Map)
- Install via `npx shadcn@latest add [component-url]`
- Shows ecosystem fluency

**Level 2: Magic MCP (During hackathon)**
- Use Magic MCP in Cursor/Claude Code to generate custom portfolio components from natural language
- "Generate a glassmorphic testimonial card with gold accents" → get polished component instantly
- Shows AI-assisted development

**Level 3: 21st Agents SDK (Advanced — voice agent deployment)**
- Deploy your voice assistant as a 21st Agent
- Get: chat UI, SSE streaming, sandbox isolation, session persistence, cost tracking
- NPM packages: `@21st-sdk/agent` (config), `@21st-sdk/react` (UI), `@21st-sdk/cli` (deploy)
- Themed chat component matches your portfolio design (80+ CSS variables)

```typescript
// agent.ts
import { agent } from '@21st-sdk/agent';

export default agent({
  model: 'claude-sonnet-4-6',
  systemPrompt: `You are George's portfolio assistant...`,
  tools: [/* project search, navigation */],
  permissions: { mode: 'default' }
});
```

```bash
npx @21st-sdk/cli deploy
```

### OpenClaw — Separate Project
- **Not related to 21st.dev** — different team entirely
- Open-source autonomous AI assistant (247K stars, MIT)
- Multi-channel: WhatsApp, Telegram, Slack, Discord, Signal, iMessage
- 100+ AgentSkills via ClawHub
- **Portfolio integration idea:** Fork OpenClaw, customize with your portfolio data, deploy as a multi-channel assistant. Judges can talk to "George" on WhatsApp, Telegram, etc.
- **BUT:** Heavy setup for a 1-hour hackathon. Better as a post-hackathon project.

### Recommendation
- **Tonight:** Use 21st.dev component marketplace for UI components
- **At hackathon:** Use Magic MCP to generate components live (impressive to show)
- **Stretch:** Deploy voice agent via 21st Agents SDK

---

## 8. COMPONENT INTEGRATION MAP <a name="component-map"></a>

### Final Page Structure

```
┌──────────────────────────────────────────┐
│ NAV (fixed, glass)                       │
├──────────────────────────────────────────┤
│                                          │
│ HERO (100vh, aurora background)          │
│   Name + Tagline + Stats + CTAs          │
│   [Magnetic buttons, stat counters]      │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ SPATIAL SHOWCASE — PONIC                 │
│   [21st.dev: spatial-product-showcase]   │
│   Interactive product display            │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ PROJECTS — 3D CARD STACK                 │
│   [21st.dev: card-stack]                 │
│   Top 7 projects, drag + keyboard nav    │
│   + "More Work" collapsible below        │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ TESTIMONIALS                             │
│   [21st.dev: twitter-testimonial-cards]  │
│   3-5 real recommendations               │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ SKILLS                                   │
│   [21st.dev: wavy-text-block headers]    │
│   Existing grid + marquee               │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ VOICE ASSISTANT                          │
│   [Golden Orb + Gemini brain]            │
│   "Talk to my portfolio"                 │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ JOURNEY                                  │
│   [21st.dev: world-map] + timeline       │
│   Animated city connections              │
│                                          │
├──────────────────────────────────────────┤
│                                          │
│ CONTACT (Asymmetric split)               │
│   Contact rows + Mini form               │
│   [Web3Forms backend]                    │
│                                          │
├──────────────────────────────────────────┤
│ FOOTER                                   │
│ + Floating voice widget (bottom-right)   │
└──────────────────────────────────────────┘
```

### 21st.dev Components Used (5 total = strong ecosystem signal)

| # | Component | Section | New Deps |
|---|-----------|---------|----------|
| 1 | Spatial Product Showcase | Ponic | None |
| 2 | Card Stack 3D Fan | Projects | None |
| 3 | Twitter Testimonial Cards | Testimonials | None |
| 4 | Wavy Text Block | Skill headers | None |
| 5 | World Map | Journey | `dotted-map` |

All 5 share `framer-motion` (already installed). Only 1 new dep total.

---

## 9. EXECUTION PLAN <a name="execution-plan"></a>

### TONIGHT (Sunday, Pre-Work)

```
Priority 1 — Quick Fixes (30 min)
├── Fix X/Twitter link in Contact.tsx
├── Standardize LinkedIn URL across files
├── Curate projects list to top 7
└── Remove FrameCanvas wrapper from App.tsx

Priority 2 — Hero Upgrade (45 min)
├── Add aurora mesh gradient CSS
├── Add staggered entrance animations
├── Add stat counter animation
├── Add glass stats card with border-beam
└── Test on mobile

Priority 3 — Contact Redesign (45 min)
├── Build asymmetric split layout
├── Create contact pill rows
├── Add inline mini form (Web3Forms)
└── Update CTA copy

Priority 4 — Component Integration (1.5 hrs)
├── Install Card Stack 3D → Projects
├── Install Twitter Testimonial Cards → new section
├── Install Spatial Product Showcase → Ponic
├── Install Wavy Text Block → headers
└── Test all interactions

Priority 5 — Voice Assistant (1 hr)
├── Install react-ai-orb or voice-orb-visualizer
├── Set up Web Speech API STT
├── Connect to Gemini Flash backend
├── Build orb UI with 3 states
├── Write agent system prompt with portfolio data
└── Test conversation flow

Priority 6 — Push & Verify (15 min)
├── git push to GitHub
├── Verify Vercel deployment
└── Test on phone
```

### AT THE HACKATHON (Monday, 1 hour)

```
00:00-00:05  Pull latest on Mac Mini, verify dev server
00:05-00:15  v0: generate any missing polish components
00:15-00:25  Magic MCP: generate custom animations/effects
00:25-00:35  Fine-tune responsive behavior + voice assistant
00:35-00:45  Add World Map to Journey section (if time)
00:45-00:55  Final polish, test all interactions
00:55-01:00  Deploy final version to Vercel
```

---

## 10. PITCH SCRIPT <a name="pitch-script"></a>

### 30-Second Pitch (When Judges Walk By)
> "This portfolio talks back. Ask it anything — it knows about the
> autonomous agents I've built, the EUR 1.5M I generated at 21,
> and the robotics systems I'm working on. Every component is from
> the 21st.dev ecosystem, and the voice assistant runs on Gemini.
> The portfolio IS the product — it demonstrates what I build:
> AI that ships."

### Key Talking Points
1. **"Talk to my portfolio"** — demonstrate voice assistant live
2. **5 community components from 21st.dev** — show ecosystem fluency
3. **Real products, real revenue** — not mockups
4. **Scroll-driven storytelling** — Moscow → Prague → Paris → NYC
5. **Built tonight, shipping now** — show the git history

### Demo Order
1. Voice assistant interaction (wow moment)
2. Spatial Ponic showcase (visual impact)
3. 3D Card Stack projects (interaction)
4. Testimonials hover effect (social proof)
5. Contact form submission (it works!)

### What NOT to Say
- Don't apologize for pre-existing work
- Don't explain the full tech stack unprompted
- Don't show all projects — focus on top 3
- Don't demo on mobile first

---

## APPENDIX: QUICK REFERENCE

### NPM Installs Needed
```bash
# Voice orb (pick one)
npm i react-ai-orb
# or
npm i voice-orb-visualizer

# World map (if using)
npm i dotted-map

# That's it. Everything else is already installed.
```

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/SpatialShowcase.tsx` | Ponic product showcase |
| `src/components/CardStack.tsx` | 3D project carousel |
| `src/components/Testimonials.tsx` | Twitter-style social proof |
| `src/components/WavyText.tsx` | Animated section headers |
| `src/components/VoiceAssistant.tsx` | Golden orb + speech logic |
| `src/components/WorldMap.tsx` | Animated journey map |

### Files to Modify
| File | Change |
|------|--------|
| `src/App.tsx` | Remove FrameCanvas, add new sections |
| `src/components/Hero.tsx` | Aurora bg, magnetic buttons, stat counters |
| `src/components/Contact.tsx` | Full redesign: split layout + form |
| `src/components/Projects.tsx` | Swap grid for Card Stack import |
| `src/components/Skills.tsx` | Wavy text headers |
| `src/components/Journey.tsx` | Add World Map |
| `src/index.css` | Aurora keyframes, form styles |
| `package.json` | Add 1-2 new deps |

### Key URLs
- **Repo:** https://github.com/gtrush03/portfolio
- **Live:** https://george.trusynth.com
- **21st.dev:** https://21st.dev
- **Voice Orb:** https://github.com/Steve0929/react-ai-orb
- **Web3Forms:** https://web3forms.com

---

**Current: 8.2/10 → Target: 9.3/10**

**The single biggest upgrade:** Voice assistant (golden orb + "talk to my portfolio")
**The second biggest:** 3D Card Stack for projects (transforms weakest section)
**The third biggest:** Testimonials (social proof judges always look for)

**Go win that $5K.**
