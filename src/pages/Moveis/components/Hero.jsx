import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const Hero = () => {
  const heroImage = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152429/5E87AE070D5F59B45560-1920w_ut64ts.jpg'
  const { style: parallaxStyle } = useParallax(0.25)

  return (
    <section className="relative bg-black min-h-[500px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 will-change-transform"
        style={{ ...parallaxStyle, backgroundImage: `url('${heroImage}')` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <AnimateIn animation="fade-in-up">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
              Móveis e Equipamentos
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Oferecemos uma linha completa de móveis e equipamentos para eventos pensados para garantir conforto, funcionalidade e organização em diferentes tipos de produções. Trabalhamos com mesas, cadeiras, bistrôs, balcões, além de diversos equipamentos que auxiliam na estrutura e no funcionamento do evento.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Hero
