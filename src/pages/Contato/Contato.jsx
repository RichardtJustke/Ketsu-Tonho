import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import Hero from './components/Hero'
import ContactInfo from './components/ContactInfo'
import ContactForm from './components/ContactForm'
import ContactMap from './components/ContactMap'

const Contato = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Seção de Contato */}
      <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Content - Info */}
            <div className="lg:w-1/2">
              <ContactInfo />
            </div>

            {/* Right Content - Form */}
            <div className="lg:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mapa */}
      <section className="bg-[#F7F7F8] pb-16 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ContactMap />
        </div>
      </section>
      
      {/* 4. Footer */}
      <Footer />
    </main>
  )
}

export default Contato
