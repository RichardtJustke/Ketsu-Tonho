import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const heroImage = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152816/IMG_8644-1920w_i8mbk3.jpg'

const Hero = () => {
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
              Pórticos e Box Truss
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Estruturas em Box Truss ideais para pórticos, backdrops e coberturas, garantindo segurança, estabilidade e acabamento profissional para seu evento.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Hero
