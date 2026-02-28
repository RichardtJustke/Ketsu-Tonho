import AnimateIn from '../../../shared/components/AnimateIn'
import { useParallax } from '../../../hooks/useParallax'

const Hero = () => {
  const { style: parallaxStyle } = useParallax(0.2)

  return (
    <section className="relative bg-black min-h-[400px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 will-change-transform"
        style={{
          ...parallaxStyle,
          backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <AnimateIn animation="fade-in-up">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4">
              Finalize seu Pedido
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
              Revise os itens selecionados, adicione observações sobre o seu evento e confirme a locação.<br />
              Nossa equipe entrará em contato para finalizar os detalhes.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

export default Hero
