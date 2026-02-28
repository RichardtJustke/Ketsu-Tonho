import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'

const Hero = () => {
  const { images } = useCloudinaryImages('portico_de_entrada', { isRawFolder: true })
  const heroImage = images.length > 0 ? images[0] : null

  return (
    <section className="relative bg-black min-h-[500px] flex items-center">
      <div
        className={`absolute inset-0 opacity-50 ${heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-900'}`}
        style={heroImage ? { backgroundImage: `url('${heroImage}')` } : {}}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Pórticos e Box Truss
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
            Destaque-se com Pórticos e Box Truss de alta qualidade. Ideais para eventos, feiras e elevações de marca. Resistentes, seguros e sofisticados, elevam a experiência do seu evento com sobriedade e impacto visual.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
