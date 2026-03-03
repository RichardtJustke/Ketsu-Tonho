import { useState, useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import TendasGrid from './components/TendasGrid'
import ContactSection from './components/ContactSection'
import { getHasAnsweredForm, subscribeAnsweredForm } from '../../utils/answeredForm'

const Tendas = () => {
  // Estado que controla se o usuário já respondeu o formulário
  // Futuramente será controlado pelo back-end
  const [hasAnsweredForm, setHasAnsweredForm] = useState(getHasAnsweredForm)

  useEffect(() => subscribeAnsweredForm(setHasAnsweredForm), [])

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      <TendasGrid hasAnsweredForm={hasAnsweredForm} />

      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>

      {/* 4. Footer */}
      <Footer />
    </main>
  )
}

export default Tendas
