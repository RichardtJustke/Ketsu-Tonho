import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

const Cases = () => {
  return (
    <div className="min-h-screen bg-white font-['Figtree']">
      <Navbar />
      <Hero />
      <AnimateIn animation="fade-in-up">
        <GallerySection />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <TestimonialsSection />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>
      <Footer />
    </div>
  )
}

export default Cases
