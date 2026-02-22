import { getCasesImages } from '../../../utils/imagens'

const Hero = () => {
  const casesImages = getCasesImages()
  // Usa a primeira imagem da pasta cases se existir, senão usa uma imagem padrão
  const heroImage = casesImages && casesImages.length > 0 
    ? casesImages[0] 
    : 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop'

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImage}')`
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto pt-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
          Nossos trabalhos
        </h1>
        
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
          Conheça nossa história, valores e o compromisso que nos faz referência em locação para eventos há mais de 10 anos
        </p>
      </div>
    </section>
  )
}

export default Hero
