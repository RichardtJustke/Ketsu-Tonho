const Hero = () => {
  return (
    <section className="relative bg-black min-h-[500px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')`
        }}
      />
      
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
