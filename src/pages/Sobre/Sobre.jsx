import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
import HistorySection from './components/HistorySection'
import ValuesSection from './components/ValuesSection'
import ExperienceSection from './components/ExperienceSection'
import MetricsSection from './components/MetricsSection'
import TrustSection from './components/TrustSection'
import SolutionsSection from './components/SolutionsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

const Sobre = () => {
  return (
    <div className="min-h-screen bg-white font-['Figtree']">
      <Navbar />
      <Hero />
      <HistorySection />
      <ValuesSection />
      <ExperienceSection />
      <MetricsSection />
      <TrustSection />
      <SolutionsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Sobre
