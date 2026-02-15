const CtaSection = ({ onOpenFilterModal }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div 
          className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Monte seu evento em 2 minutos
            </h2>
            
            <p className="text-white/80 mb-8">
              Conheça os itens recomendados para cada tipo de evento e monte sua estrutura completa sem complicação
            </p>
            
            <button 
              onClick={onOpenFilterModal}
              className="bg-white text-black text-sm font-medium py-3 px-6 rounded-full flex items-center gap-2 mx-auto shadow-md hover:shadow-lg transition-shadow"
            >
              Monte seu evento
              <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaSection
