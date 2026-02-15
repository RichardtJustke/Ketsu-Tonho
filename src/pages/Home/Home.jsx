import { useState } from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ProcessSection from './components/ProcessSection'
import ServiceSection from './components/ServiceSection'
import WhyChooseSection from './components/WhyChooseSection'
import TrustSection from './components/TrustSection'
import EventTypeSection from './components/EventTypeSection'
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
      
      {/* 2. Seção "Tudo o que você precisa para realizar seu evento" */}
      <AboutSection />
      
      {/* 3. Seção "Realizar seu evento com a Tonho é muito simples e rápido" */}
      <ProcessSection />
      
      {/* 4. Seção "Veja o que temos" (cards com produtos/serviços) */}
      <ServiceSection />
      
      {/* 5. Seção "Por que escolher a Tonho" */}
      <WhyChooseSection />
      
      {/* 6. Seção "Quem confia na Tonho" */}
      <TrustSection />
      
      {/* 7. Seção "Que tipo de evento você vai realizar" (accordion) */}
      <EventTypeSection />
      
      {/* 8. Seção "Veja os itens que vão fazer o seu evento acontecer" */}
      <ItemsSection />
      
      {/* 9. Seção "Monte seu evento em dois minutos" (CTA) */}
      <CtaSection onOpenFilterModal={handleOpenFilterModal} />
      
      {/* 10. Seção "O que os clientes dizem" */}
      <TestimonialSection />
      
      {/* 11. Seção de Contato */}
      <ContactSection />
      
      {/* 12. Footer */}
      <Footer />
    </main>
  )
}

export default Home
