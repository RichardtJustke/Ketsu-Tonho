import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'

const Hero = () => {
  const { images } = useCloudinaryImages('climatizador_juapi_110v', { isRawFolder: true })
  const heroImage = images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop'

  return (
    <section className="relative bg-black min-h-[500px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Móveis e Equipamentos
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Equipamentos e mobiliário de alta qualidade para o seu evento. Climatizadores, mesas, cadeiras, equipamentos de som e muito mais. Tudo que você precisa para criar o ambiente perfeito.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
