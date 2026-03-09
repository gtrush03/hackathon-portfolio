import { WorldMap } from "./ui/world-map";

const journeyDots = [
  {
    start: { lat: 55.7558, lng: 37.6173, label: "Moscow" },
    end: { lat: 50.0755, lng: 14.4378, label: "Prague" },
  },
  {
    start: { lat: 50.0755, lng: 14.4378, label: "Prague" },
    end: { lat: 48.8566, lng: 2.3522, label: "Paris" },
  },
  {
    start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
    end: { lat: 45.0703, lng: 7.6869, label: "Turin" },
  },
  {
    start: { lat: 45.0703, lng: 7.6869, label: "Turin" },
    end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
  },
  {
    start: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
    end: { lat: 52.52, lng: 13.405, label: "Berlin" },
  },
  {
    start: { lat: 52.52, lng: 13.405, label: "Berlin" },
    end: { lat: 40.7128, lng: -74.006, label: "NYC" },
  },
];

const stops = [
  { city: "Moscow", years: "2003-2008", note: "Where it started" },
  { city: "Prague", years: "2008-2021", note: "School years & first ventures" },
  { city: "Paris", years: "2021-2023", note: "ESCP Business School" },
  { city: "Turin", years: "2023", note: "Google" },
  { city: "Lisbon", years: "2024", note: "ESCP final year" },
  { city: "Berlin", years: "2024-2025", note: "Building TRU Synth" },
  { city: "New York City", years: "2025-present", note: "Current: NYC Sprint" },
];

export default function JourneyMap() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section heading matching existing pattern */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">
            Map
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold">
            <span className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text text-transparent">
              The Journey
            </span>
          </h2>
        </div>

        {/* Interactive world map */}
        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
          <WorldMap
            dots={journeyDots}
            lineColor="#928466"
            showLabels={true}
            animationDuration={2}
            loop={true}
          />
        </div>

        {/* Legend below the map */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {stops.map((stop) => (
            <div key={stop.city} className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
              <span className="text-primary font-medium">{stop.city}</span>
              <span className="text-muted text-xs">
                {stop.years} &mdash; {stop.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
