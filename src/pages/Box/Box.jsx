import { useState } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
import BoxGrid from './components/BoxGrid'
import ContactSection from './components/ContactSection'

const Box = () => {
  // Estado que controla se o usuário já respondeu o formulário
  // Futuramente será controlado pelo back-end
  const [hasAnsweredForm] = useState(false)

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Grid de Box */}
      <BoxGrid hasAnsweredForm={hasAnsweredForm} />
      
      {/* 3. Seção de Contato */}
      <ContactSection />
      
      {/* 4. Footer */}
      <Footer />
    </main>
  )
}

export default Box
