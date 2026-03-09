import { useState, useEffect } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import MoveisGrid from './components/MoveisGrid'
import ContactSection from './components/ContactSection'
import EventFilterModal from '../../shared/components/EventFilterModal'
import { getHasAnsweredForm, subscribeAnsweredForm } from '../../utils/answeredForm'

const Moveis = () => {
  const [hasAnsweredForm, setHasAnsweredForm] = useState(getHasAnsweredForm)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  useEffect(() => subscribeAnsweredForm(setHasAnsweredForm), [])

  const handleFilterComplete = (filters) => {
    console.log('Filtros do evento:', filters)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <EventFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onComplete={handleFilterComplete}
      />

      <Hero />

      <MoveisGrid
        hasAnsweredForm={hasAnsweredForm}
        onOpenFilterModal={() => setIsFilterModalOpen(true)}
      />

      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>

      <Footer />
    </main>
  )
}

export default Moveis
