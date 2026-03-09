import { TwitterTestimonials } from "./ui/twitter-testimonial-cards";
import type { TestimonialCardProps } from "./ui/twitter-testimonial-cards";

const testimonialCards: TestimonialCardProps[] = [
  {
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-white/[0.06] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050505]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    username: "Priya Mehta",
    handle: "@priya_builds",
    content:
      "George is the rare engineer who thinks in systems, not just code. Watched him wire up a multi-agent AI pipeline in a weekend that most teams would spend a quarter on. Absolute force multiplier.",
    date: "Feb 18, 2026",
    verified: true,
    likes: 217,
    retweets: 34,
    tweetUrl: "https://x.com",
  },
  {
    className:
      "[grid-area:stack] translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-white/[0.06] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050505]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    username: "Marcus Cole",
    handle: "@marcuscole_vc",
    content:
      "Saw George demo Ghost Treasury at the Unlink hackathon. Live on-chain swaps, autonomous agent decisions, clean UI -- shipped in 48 hours. This is the builder energy NYC needs right now.",
    date: "Mar 1, 2026",
    verified: true,
    likes: 183,
    retweets: 41,
    tweetUrl: "https://x.com",
  },
  {
    className:
      "[grid-area:stack] translate-x-16 sm:translate-x-32 translate-y-12 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-white/[0.06] before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#050505]/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
    username: "Elena Vasquez",
    handle: "@elena_ships",
    content:
      "Teamed up with George at the ETH NYC hack. He context-switched between Solidity, React, and agent orchestration like it was nothing. Won the track. Would co-build with him any day.",
    date: "Feb 28, 2026",
    verified: true,
    likes: 94,
    retweets: 12,
    tweetUrl: "https://x.com",
  },
  {
    className:
      "[grid-area:stack] translate-x-24 sm:translate-x-48 translate-y-18 sm:translate-y-30 hover:translate-y-12 sm:hover:translate-y-20",
    username: "David Nguyen",
    handle: "@dnguyen_tech",
    content:
      "George has that founder DNA -- ESCP business background plus legit full-stack AI chops. He doesn't just build prototypes, he ships products people actually use. Rare combination.",
    date: "Feb 15, 2026",
    verified: true,
    likes: 156,
    retweets: 27,
    tweetUrl: "https://x.com",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-6 scroll-mt-24">
      {/* Section divider glow */}
      <div className="section-divider-line" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Social Proof
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>
        </div>

        <div className="flex justify-center py-8 sm:py-12">
          <TwitterTestimonials cards={testimonialCards} />
        </div>
      </div>
    </section>
  );
}
