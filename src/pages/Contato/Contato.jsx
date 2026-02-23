import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import ContactInfo from './components/ContactInfo'
import ContactForm from './components/ContactForm'
import ContactMap from './components/ContactMap'

const Contato = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      <AnimateIn animation="fade-in-up">
        <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <ContactInfo />
              </div>
              <div className="lg:w-1/2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn animation="fade-in-up">
        <section className="bg-[#F7F7F8] pb-16 md:pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <ContactMap />
          </div>
        </section>
      </AnimateIn>

      <Footer />
    </main>
  )
}

export default Contato
