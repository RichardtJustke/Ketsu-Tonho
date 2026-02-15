const ProcessSection = () => {
  const processCards = [
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10V20L26.67 23.33" stroke="#FF5F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="15" stroke="#FF5F1F" strokeWidth="2"/>
        </svg>
      ),
      title: 'Receba seu orçamento',
      description: 'Montamos uma proposta sob medida com os itens que você precisa, transparência nos valores e prazo definido'
    },
    {
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.33 20L18.33 25L28.33 15" stroke="#FF5F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="20" r="15" stroke="#FF5F1F" strokeWidth="2"/>
        </svg>
      ),
      title: 'Confirme e relaxe',
      description: 'Após a confirmação, cuidamos de tudo: entrega, montagem e retirada no prazo. Você só precisa aproveitar o evento'
    }
  ]

  const categories = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 36L24 8L44 36H4Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Tendas e Estruturas',
      description: 'Tendas de diversos tamanhos, cobertura para eventos ao ar livre e infraestrutura completa para qualquer tipo de celebração'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="20" width="32" height="20" rx="2" stroke="#333" strokeWidth="2"/>
          <path d="M12 20V12C12 10.9 12.9 10 14 10H34C35.1 10 36 10.9 36 12V20" stroke="#333" strokeWidth="2"/>
        </svg>
      ),
      title: 'Mesas e Cadeiras',
      description: 'Amplo acervo de mesas e cadeiras para todos os estilos de evento, com entrega e montagem incluídas'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="8" stroke="#333" strokeWidth="2"/>
          <path d="M24 8V12M24 36V40M40 24H36M12 24H8M35.3 12.7L32.5 15.5M15.5 32.5L12.7 35.3M35.3 35.3L32.5 32.5M15.5 15.5L12.7 12.7" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Mobiliário e Decoração',
      description: 'Puffs, vasos decorativos, balizadores e outros itens para deixar seu evento com a cara que você imaginou'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="28" height="20" rx="2" stroke="#333" strokeWidth="2"/>
          <path d="M18 38H30" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 34V38" stroke="#333" strokeWidth="2"/>
        </svg>
      ),
      title: 'Equipamentos e Tecnologia',
      description: 'Som, TV, climatizadores, bebedouros, fogões industriais e tudo o que você precisa para o conforto dos seus convidados'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Content */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
              Realizar seu evento com a Tonho é simples e rápido
            </h2>
            <p className="text-[#333333] opacity-80">
              Em poucos passos, você garante toda a estrutura necessária para o seu dia especial
            </p>
            
            <div className="rounded-2xl overflow-hidden aspect-video bg-[#F7F7F8]">
              <img 
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop" 
                alt="Evento decorado"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4">
            {processCards.map((card, index) => (
              <div key={index} className="bg-[#F7F7F8] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black mb-2">
                      {card.title}
                    </h4>
                    <p className="text-[#333333] opacity-80 text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {category.icon}
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">
                {category.title}
              </h4>
              <p className="text-[#333333] opacity-80 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
