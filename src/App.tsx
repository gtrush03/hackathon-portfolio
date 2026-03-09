import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FrameCanvas from './components/FrameCanvas'
import CursorGlow from './components/CursorGlow'
import GlowOrbs from './components/GlowOrbs'
import ParallaxDivider from './components/ParallaxDivider'
import LoadingScreen from './components/LoadingScreen'
import TruSalesLanding from './pages/TruSalesLanding'
import RoboticsLanding from './pages/RoboticsLanding'

function HomePage() {
  return (
    <div className="relative min-h-screen noise-overlay">
      <LoadingScreen />
      <GlowOrbs />
      <CursorGlow />
      <Nav />
      <main>
        <FrameCanvas>
          <Hero />
        </FrameCanvas>

        <div className="relative" style={{ contain: 'layout style paint' }}>
          <div className="section-fade-top" />
          <Projects />
        </div>

        <div className="relative" style={{ contain: 'layout style paint' }}>
          <div className="section-fade-top" />
          <Skills />
        </div>

        <ParallaxDivider />

        <div className="relative" style={{ contain: 'layout style paint' }}>
          <Journey />
        </div>

        <div className="relative" style={{ contain: 'layout style paint' }}>
          <div className="section-fade-top" />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trusales" element={<TruSalesLanding />} />
      <Route path="/robotics" element={<RoboticsLanding />} />
    </Routes>
  )
}
