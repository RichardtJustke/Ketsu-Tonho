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
          <path d="M8 36L24 12L40 36H8Z" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 36V28C16 26.9 16.9 26 18 26H30C31.1 26 32 26.9 32 28V36" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 36V30M28 36V30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Tendas e Estruturas',
      description: 'Tendas de diversos tamanhos, cobertura para eventos ao ar livre e infraestrutura completa para qualquer tipo de celebração'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="18" width="28" height="20" rx="2" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M14 18V12C14 10.9 14.9 10 16 10H32C33.1 10 34 10.9 34 12V18" stroke="#FF5F1F" strokeWidth="1.5"/>
          <circle cx="20" cy="28" r="2" fill="white"/>
          <circle cx="28" cy="28" r="2" fill="white"/>
          <path d="M14 38H34" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Mesas e Cadeiras',
      description: 'Amplo acervo de mesas e cadeiras para todos os estilos de evento, com entrega e montagem incluídas'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="10" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M24 12V16M24 32V36M36 24H32M16 24H12M31.3 16.7L28.5 19.5M19.5 28.5L16.7 31.3M31.3 31.3L28.5 28.5M19.5 19.5L16.7 16.7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="4" fill="white" opacity="0.3"/>
        </svg>
      ),
      title: 'Mobiliário e Decoração',
      description: 'Puffs, vasos decorativos, balizadores e outros itens para deixar seu evento com a cara que você imaginou'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="14" width="24" height="18" rx="2" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <rect x="16" y="18" width="16" height="10" rx="1" fill="white" opacity="0.2"/>
          <path d="M20 38H28" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M24 32V38" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="24" cy="23" r="2" fill="white"/>
          <path d="M18 14V10C18 9.4 18.4 9 19 9H29C29.6 9 30 9.4 30 10V14" stroke="#FF5F1F" strokeWidth="1.5"/>
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
