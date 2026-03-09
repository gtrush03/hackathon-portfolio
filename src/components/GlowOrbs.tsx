export default function GlowOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Hero orb - large, top center */}
      <div
        className="glow-orb"
        style={{
          top: '5vh',
          left: '50%',
          width: '800px',
          height: '800px',
          marginLeft: '-400px',
          animationDelay: '0s',
        }}
      />
      {/* Projects orb - medium, offset right */}
      <div
        className="glow-orb"
        style={{
          top: '140vh',
          right: '-5%',
          width: '600px',
          height: '600px',
          animationDelay: '-7s',
        }}
      />
      {/* Contact orb - small, offset left */}
      <div
        className="glow-orb"
        style={{
          bottom: '10vh',
          left: '-5%',
          width: '500px',
          height: '500px',
          animationDelay: '-14s',
        }}
      />
    </div>
  )
}
