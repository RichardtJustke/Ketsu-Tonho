const Hero = ({ onOpenFilterModal }) => {
  return (
    <section className="relative min-h-screen">
      <div className="relative w-full overflow-hidden min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-screen p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Estrutura completa para o seu evento acontecer sem preocupação
            </h1>

            <div className="flex items-start gap-4">
              <button 
                onClick={onOpenFilterModal}
                className="bg-white text-black text-sm font-medium py-3 px-6 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap"
              >
                Monte seu evento
                <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div className="flex items-center gap-4">
                <div className="w-0.5 h-16 bg-white/20" />
                <p className="text-white text-sm max-w-xs">
                  Locação de tendas, mobiliário, equipamentos e buffet para eventos sociais e corporativos em Belém
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
