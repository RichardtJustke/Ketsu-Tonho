const Hero = () => {
  return (
    <section className="relative bg-black min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">
            Pórticos e Box Truss
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Destaque-se com Pórticos e Box Truss de alta qualidade. Ideais para eventos, feiras e elevações de marca. Resistentes, seguros e sofisticados, elevam a experiência do seu evento com sobriedade e impacto visual.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
