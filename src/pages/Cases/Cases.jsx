import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

const Cases = () => {
  return (
    <div className="min-h-screen bg-white font-['Figtree']">
      <Navbar />
      <Hero />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Cases
