import { cloudinaryVideoUrl } from '../../../utils/cloudinary'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const videoTendas = cloudinaryVideoUrl('vdd/5ZQGjQQhSx3g1yAwgWhA_DJI_0008-v')

const Hero = () => {
  const { style: parallaxStyle } = useParallax(0.2)

  return (
    <section className="relative bg-black min-h-[500px] flex items-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 will-change-transform"
        style={parallaxStyle}
      >
        <source src={videoTendas} type="video/mp4" />
      </video>

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
