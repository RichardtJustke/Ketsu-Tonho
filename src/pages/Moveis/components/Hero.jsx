import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const Hero = () => {
  const { images } = useCloudinaryImages('climatizador_juapi_110v', { isRawFolder: true })
  const heroImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop'
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
              Equipamentos e mobiliário de alta qualidade para o seu evento. Climatizadores, mesas, cadeiras, equipamentos de som e muito mais. Tudo que você precisa para criar o ambiente perfeito.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Hero
