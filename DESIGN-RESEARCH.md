# Design Research: Premium React UI Components

> Portfolio stack: React 19 + Vite 7 + TypeScript + Tailwind CSS v4 + Framer Motion v12.33
> Existing pattern: Copy-paste components into `src/components/` (see `flickering-grid.tsx`)

---

## Compatibility Notes (READ FIRST)

- **Framer Motion v12.33** is already installed and works with React 19
- Aceternity UI components import from `motion/react` — change to `framer-motion` for this project
- Magic UI components use `@/registry/magicui/...` paths — adjust to `@/components/...`
- Both libraries are copy-paste friendly (no npm package install needed)
- CLI install available: `npx shadcn@latest add @aceternity/<component>` or `npx shadcn@latest add "https://magicui.design/r/<component>"`
- If using CLI, may need `components.json` with shadcn config — manual copy-paste is simpler for this Vite project

---

## HERO SECTION

### 1. Text Generate Effect (Aceternity UI) — MUST-HAVE
- **What**: Words fade in one-by-one on page load with blur-to-sharp animation
- **Section**: Hero headline
- **Install**: `npx shadcn@latest add @aceternity/text-generate-effect`
- **Or copy from**: https://ui.aceternity.com/components/text-generate-effect
- **Dependencies**: `framer-motion`, `clsx`, `tailwind-merge` (all already installed)
- **Usage**:
  ```tsx
  import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
  <TextGenerateEffect words="Building Digital Experiences" duration={0.5} />
  ```
- **Props**: `words: string`, `duration?: number`, `filter?: boolean`, `className?: string`
- **Compatibility**: Change `motion/react` import to `framer-motion`

### 2. Text Animate (Magic UI) — NICE-TO-HAVE
- **What**: Multiple animation types: blur-in, slide-up, scale-up, fade-in by line/word/character
- **Section**: Hero subtitle or section headers
- **Source**: https://magicui.design/docs/components/text-animate
- **Install**: `npx shadcn@latest add "https://magicui.design/r/text-animate"`
- **Advantage**: More flexible than Aceternity's — supports per-character, per-word, per-line

### 3. Number Ticker (Magic UI) — MUST-HAVE
- **What**: Animated counter that ticks up from startValue to value
- **Section**: Hero stats (years experience, projects completed, etc.)
- **Source**: https://magicui.design/docs/components/number-ticker
- **Install**: `npx shadcn@latest add "https://magicui.design/r/number-ticker"`
- **Usage**:
  ```tsx
  import { NumberTicker } from "@/components/ui/number-ticker";
  <NumberTicker value={100} startValue={0} className="text-6xl font-bold" />
  ```
- **Props**: `value: number`, `startValue?: number`, `className?: string`

### 4. Aurora Background (Aceternity UI) — NICE-TO-HAVE
- **What**: Subtle Northern Lights / Aurora Borealis animated background
- **Section**: Hero background or CTA section
- **Install**: `npx shadcn@latest add @aceternity/aurora-background`
- **Source**: https://ui.aceternity.com/components/aurora-background
- **CSS Required** (add to index.css):
  ```css
  @theme inline {
    --animate-aurora: aurora 60s linear infinite;
    @keyframes aurora {
      from { background-position: 50% 50%, 50% 50%; }
      to { background-position: 350% 50%, 350% 50%; }
    }
  }
  ```
- **Props**: `children`, `className`, `showRadialGradient?: boolean`
- **Note**: May conflict with existing GlowOrbs background — evaluate visual impact

### 5. Spotlight (Aceternity UI) — MUST-HAVE
- **What**: Animated spotlight beam effect, great for hero sections
- **Section**: Hero background accent
- **Install**: `npx shadcn@latest add @aceternity/spotlight`
- **Source**: https://ui.aceternity.com/components/spotlight
- **CSS Required**:
  ```css
  @theme inline {
    --animate-spotlight: spotlight 2s ease 0.75s 1 forwards;
  }
  @keyframes spotlight {
    0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
    100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
  }
  ```
- **Props**: `className?: string`, `fill?: string`

### 6. Hyper Text (Magic UI) — NICE-TO-HAVE
- **What**: Text scrambles random characters before revealing final text (hacker-style)
- **Section**: Hero title or name reveal
- **Source**: https://magicui.design/docs/components/hyper-text

---

## PROJECT CARDS

### 7. Card Spotlight (Aceternity UI) — MUST-HAVE
- **What**: Spotlight effect that follows cursor, revealing radial gradient on hover
- **Section**: Project cards
- **Install**: `npx shadcn@latest add @aceternity/card-spotlight`
- **Source**: https://ui.aceternity.com/components/card-spotlight
- **Usage**:
  ```tsx
  import { CardSpotlight } from "@/components/ui/card-spotlight";
  <CardSpotlight className="h-96 w-96" radius={350} color="#262626">
    <h3 className="text-xl font-bold relative z-20">Project Name</h3>
    <p className="relative z-20">Description</p>
  </CardSpotlight>
  ```
- **Props**: `radius?: number` (default 350), `color?: string` (default "#262626"), `className`, `children`
- **Note**: Content needs `relative z-20` to appear above the gradient

### 8. 3D Card Effect (Aceternity UI) — MUST-HAVE
- **What**: Perspective tilt on hover, child elements float at different Z-depths
- **Section**: Featured project cards
- **Install**: `npx shadcn@latest add @aceternity/3d-card`
- **Source**: https://ui.aceternity.com/components/3d-card-effect
- **Usage**:
  ```tsx
  import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
  <CardContainer>
    <CardBody className="bg-gray-50 dark:bg-black rounded-xl p-6">
      <CardItem translateZ="50"><h3>Title</h3></CardItem>
      <CardItem translateZ="60" as="p">Description</CardItem>
      <CardItem translateZ="100"><img src="..." /></CardItem>
    </CardBody>
  </CardContainer>
  ```
- **Props**: `translateX/Y/Z`, `rotateX/Y/Z` (number | string), `as` (element type)

### 9. Border Beam (Magic UI) — MUST-HAVE
- **What**: Animated beam of light traveling along card border
- **Section**: Project cards, featured content
- **Source**: https://magicui.design/docs/components/border-beam
- **Install**: `npx shadcn@latest add "https://magicui.design/r/border-beam"`
- **Usage**:
  ```tsx
  import { BorderBeam } from "@/components/ui/border-beam";
  <div className="relative rounded-xl overflow-hidden">
    <BorderBeam size={200} duration={8} />
    {/* Card content */}
  </div>
  ```
- **Compatibility Note**: Imports `motion/react` — must change to `framer-motion`

### 10. Shine Border (Magic UI) — NICE-TO-HAVE
- **What**: Animated shining border effect around container
- **Section**: Highlighted project cards or CTA buttons
- **Source**: https://magicui.design/docs/components/shine-border
- **Install**: `npx shadcn@latest add "https://magicui.design/r/shine-border"`

### 11. Magic Card (Magic UI) — NICE-TO-HAVE
- **What**: Card with gradient spotlight that follows mouse cursor
- **Section**: Project cards (alternative to Aceternity CardSpotlight)
- **Source**: https://magicui.design/docs/components/magic-card

### 12. Meteors (Aceternity UI) — NICE-TO-HAVE
- **What**: Animated meteor streaks in card background
- **Section**: Featured project card or hero accent
- **Install**: `npx shadcn@latest add @aceternity/meteors`
- **Source**: https://ui.aceternity.com/components/meteors
- **Usage**:
  ```tsx
  import { Meteors } from "@/components/ui/meteors";
  <div className="relative overflow-hidden rounded-2xl">
    <Meteors number={20} />
    {/* Card content */}
  </div>
  ```
- **Props**: `number?: number`, `className?: string`
- **CSS Required**: meteor keyframes animation

---

## SKILLS SECTION

### 13. Marquee (Magic UI) — MUST-HAVE
- **What**: Infinite horizontal/vertical scrolling ticker
- **Section**: Tech stack logos, tools, frameworks
- **Source**: https://magicui.design/docs/components/marquee
- **Install**: `npx shadcn@latest add "https://magicui.design/r/marquee"`
- **Usage**:
  ```tsx
  import { Marquee } from "@/components/ui/marquee";
  <Marquee pauseOnHover className="[--duration:20s]">
    {skills.map(skill => <SkillBadge key={skill.name} {...skill} />)}
  </Marquee>
  ```
- **Features**: Supports reverse direction, pause on hover, vertical mode
- **CSS Required**: marquee keyframes (horizontal + vertical)
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(calc(-100% - var(--gap))); }
  }
  ```

### 14. Bento Grid (Aceternity UI) — NICE-TO-HAVE
- **What**: Skewed grid layout with title, description, hover effects
- **Section**: Skills/tools showcase as visual grid
- **Source**: https://ui.aceternity.com/components/bento-grid
- **Multiple variants**: 5+ different layouts available

---

## BACKGROUND & DECORATIVE EFFECTS

### 15. Dot Pattern (Magic UI) — MUST-HAVE
- **What**: SVG dot pattern background, customizable size/spacing/color
- **Section**: Section backgrounds, dividers
- **Source**: https://magicui.design/docs/components/dot-pattern
- **Install**: `npx shadcn@latest add "https://magicui.design/r/dot-pattern"`

### 16. Grid Pattern (Magic UI) — NICE-TO-HAVE
- **What**: SVG grid lines background with gradient mask
- **Section**: Section backgrounds
- **Source**: https://magicui.design/docs/components/grid-pattern
- **Variants**: Static, Animated, Interactive (hover-responsive squares)

### 17. Flickering Grid (Magic UI) — ALREADY INSTALLED
- **What**: Canvas-based flickering dot grid
- **Location**: `src/components/flickering-grid.tsx`
- **Status**: Already in the project, ready to use

### 18. Tracing Beam (Aceternity UI) — NICE-TO-HAVE
- **What**: SVG beam that follows scroll path alongside content
- **Section**: Journey/timeline section
- **Source**: https://ui.aceternity.com/components/tracing-beam
- **Install**: `npx shadcn@latest add @aceternity/tracing-beam`

### 19. Background Beams (Aceternity UI) — NICE-TO-HAVE
- **What**: SVG beams following paths in background
- **Section**: Hero or CTA section background
- **Source**: https://ui.aceternity.com/components/background-beams

### 20. Lamp Effect (Aceternity UI) — NICE-TO-HAVE
- **What**: Lamp-style section header with gradient glow (as seen on Linear)
- **Section**: Section headers/dividers
- **Source**: https://ui.aceternity.com/components/lamp-effect
- **Note**: Very distinctive — good for one key section

---

## BUTTONS & INTERACTIONS

### 21. Shimmer Button (Magic UI) — NICE-TO-HAVE
- **What**: Button with shimmering light traveling around perimeter
- **Section**: CTA buttons (hero, contact)
- **Source**: https://magicui.design/docs/components/shimmer-button
- **Install**: `npx shadcn@latest add "https://magicui.design/r/shimmer-button"`

---

## PRIORITIZED IMPLEMENTATION ORDER

### Phase 1 — Highest Impact (MUST-HAVE)
| # | Component | Source | Section | Complexity |
|---|-----------|--------|---------|------------|
| 1 | Text Generate Effect | Aceternity | Hero headline | Low |
| 2 | Number Ticker | Magic UI | Hero stats | Low |
| 3 | Spotlight | Aceternity | Hero background | Low |
| 4 | Card Spotlight | Aceternity | Project cards | Medium |
| 5 | Border Beam | Magic UI | Project cards | Low |
| 6 | Marquee | Magic UI | Skills ticker | Medium |
| 7 | Dot Pattern | Magic UI | Section backgrounds | Low |

### Phase 2 — Enhanced Polish (NICE-TO-HAVE)
| # | Component | Source | Section | Complexity |
|---|-----------|--------|---------|------------|
| 8 | 3D Card Effect | Aceternity | Featured projects | Medium |
| 9 | Shine Border | Magic UI | Highlighted cards | Low |
| 10 | Meteors | Aceternity | Card decoration | Low |
| 11 | Shimmer Button | Magic UI | CTA buttons | Low |
| 12 | Lamp Effect | Aceternity | Section headers | Medium |
| 13 | Tracing Beam | Aceternity | Journey timeline | High |

### Phase 3 — Background Variety (NICE-TO-HAVE)
| # | Component | Source | Section | Complexity |
|---|-----------|--------|---------|------------|
| 14 | Aurora Background | Aceternity | Hero/CTA | Medium |
| 15 | Grid Pattern | Magic UI | Section backgrounds | Low |
| 16 | Background Beams | Aceternity | Hero variant | Medium |

---

## INSTALLATION APPROACH

Since this is a **Vite project without shadcn/ui config**, the recommended approach is:

1. **Copy-paste component source** into `src/components/ui/` (matches existing `flickering-grid.tsx` pattern)
2. **Adjust imports**: Change `motion/react` to `framer-motion`
3. **Adjust paths**: Change `@/registry/magicui/...` to local paths
4. **Add CSS**: Paste any required keyframes into `src/index.css`
5. **Dependencies**: `framer-motion`, `clsx`, `tailwind-merge` are all already installed

Alternatively, set up `components.json` for shadcn CLI:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "tailwind": { "config": "", "css": "src/index.css", "prefix": "" },
  "aliases": { "components": "@/components", "utils": "@/lib/utils" },
  "tsx": true
}
```

---

## SOURCES
- [Magic UI Components](https://magicui.design/docs/components)
- [Aceternity UI Components](https://ui.aceternity.com/components)
- [21st.dev Community Components](https://21st.dev/community/components)
- [Magic UI GitHub](https://github.com/magicuidesign/magicui)
- [shadcn/ui](https://ui.shadcn.com)
