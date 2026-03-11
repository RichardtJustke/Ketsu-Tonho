import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const heroImage = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772155248/Tenda_Cristal-1-1920w_lwsccv.jpg'

const Hero = () => {
  const { style: parallaxStyle } = useParallax(0.2)

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
              Tendas
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Descubra a liberdade de celebrar ao ar livre com nossas tendas de alta qualidade. Projetadas para resistir aos elementos e proporcionar conforto, nossas tendas são a escolha perfeita para seus eventos ao ar livre.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Hero
