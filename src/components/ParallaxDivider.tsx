export default function ParallaxDivider() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      {/* Desktop background */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          backgroundImage: 'url(/past-bg-desktop.jpg)',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Mobile background */}
      <div
        className="md:hidden absolute inset-0"
        style={{
          backgroundImage: 'url(/past-bg-mobile.jpg)',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-obsidian/60" />
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-obsidian to-transparent z-10" />
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent z-10" />
    </div>
  )
}
