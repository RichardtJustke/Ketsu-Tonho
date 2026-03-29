import { useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import GallerySection from './components/GallerySection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'

const Cases = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
