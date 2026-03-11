import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import HistorySection from './components/HistorySection'
import ValuesSection from './components/ValuesSection'
import ExperienceSection from './components/ExperienceSection'
import MetricsSection from './components/MetricsSection'
import TrustSection from './components/TrustSection'
import SolutionsSection from './components/SolutionsSection'
import ContactCards from './components/ContactCards'

const Sobre = () => {
  return (
    <div className="min-h-screen bg-white font-['Figtree']">
      <Navbar />
      <Hero />
      <AnimateIn animation="fade-in-up"><HistorySection /></AnimateIn>
      <AnimateIn animation="fade-in-up"><ValuesSection /></AnimateIn>
      <AnimateIn animation="fade-in-up"><ExperienceSection /></AnimateIn>
      <AnimateIn animation="scale-in"><MetricsSection /></AnimateIn>
      <AnimateIn animation="fade-in-up"><TrustSection /></AnimateIn>
      <AnimateIn animation="fade-in-up"><SolutionsSection /></AnimateIn>
      <AnimateIn animation="fade-in-up"><ContactCards /></AnimateIn>
      <Footer />
    </div>
  )
}

export default Sobre

