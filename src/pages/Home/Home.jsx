import { useState } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import ItemsSection from './components/ItemsSection'
import CtaSection from './components/CtaSection'
import TestimonialSection from './components/TestimonialSection'
import ContactSection from './components/ContactSection'
import EventFilterModal from '../../shared/components/EventFilterModal'

const Home = () => {
  // Estado para controlar o modal de filtro de eventos
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [eventFilters, setEventFilters] = useState(null)

  // Função para abrir o modal
  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true)
  }

  // Função para processar os filtros selecionados
  const handleFilterComplete = (filters) => {
    console.log('Filtros do evento:', filters)
    setEventFilters(filters)
    // TODO: Implementar lógica de filtragem de produtos
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Modal de filtro de eventos */}
      <EventFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onComplete={handleFilterComplete}
      />
      
      {/* 1. Hero Section */}
      <Hero onOpenFilterModal={handleOpenFilterModal} />

      {/* 2. Seção "Veja os itens que vão fazer o seu evento acontecer" */}
      <AnimateIn animation="fade-in-up">
        <ItemsSection />
      </AnimateIn>

      {/* 9. Seção "Monte seu evento em dois minutos" (CTA) */}
      <AnimateIn animation="scale-in">
        <CtaSection onOpenFilterModal={handleOpenFilterModal} />
      </AnimateIn>

      {/* 10. Seção "O que os clientes dizem" */}
      <AnimateIn animation="fade-in-up">
        <TestimonialSection />
      </AnimateIn>

      {/* 11. Seção de Contato */}
      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>

      {/* 12. Footer */}
      <Footer />
    </main>
  )
}

export default Home
