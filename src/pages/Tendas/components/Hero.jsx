import videoTendas from '../../../imagens/vdd/5ZQGjQQhSx3g1yAwgWhA_DJI_0008-v.mp4'

const Hero = () => {
  return (
    <section className="relative bg-black min-h-[500px] flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src={videoTendas} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Tendas
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Descubra a liberdade de celebrar ao ar livre com nossas tendas de alta qualidade. Projetadas para resistir aos elementos e proporcionar conforto, nossas tendas são a escolha perfeita para seus eventos ao ar livre.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
