const SolutionsSection = () => {
  const checkItems = [
    'Orçamentos personalizados',
    'Consultoria de espaço',
    'Logística integrada'
  ]

  const CheckIcon = () => (
    <div className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
              Soluções inteligentes para eventos duradouros
            </h2>
            
            <p className="text-black opacity-80 mb-8">
              Oferecemos não apenas locação, mas consultoria completa para garantir que cada aspecto do seu evento seja planejado com eficiência e economia.
            </p>

            <div className="space-y-4">
              {checkItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2070&auto=format&fit=crop" 
                alt="Soluções inteligentes"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
