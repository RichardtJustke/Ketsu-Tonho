const TrustSection = () => {
  const trustCards = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 24C28.42 24 32 20.42 32 16C32 11.58 28.42 8 24 8C19.58 8 16 11.58 16 16C16 20.42 19.58 24 24 24Z" stroke="#333" strokeWidth="2"/>
          <path d="M8 40V36C8 31.58 11.58 28 16 28H32C36.42 28 40 31.58 40 36V40" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Clientes pessoa física',
      description: 'Aniversários, casamentos, confraternizações e celebrações que marcam momentos especiais'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="32" height="28" rx="2" stroke="#333" strokeWidth="2"/>
          <path d="M16 12V8" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 12V8" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 20H40" stroke="#333" strokeWidth="2"/>
        </svg>
      ),
      title: 'Empresas e corporações',
      description: 'Eventos corporativos, treinamentos, convenções e ações de relacionamento'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8L8 16V40H20V28H28V40H40V16L28 8" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 8H28L40 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Produtores e organizadores',
      description: 'Parceiros que confiam na nossa estrutura para realizar eventos de médio e grande porte'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20H8V38C8 39.1 8.9 40 10 40H38C39.1 40 40 39.1 40 38V20Z" stroke="#333" strokeWidth="2"/>
          <path d="M40 20V14C40 12.9 39.1 12 38 12H30L28 8H20L18 12H10C8.9 12 8 12.9 8 14V20" stroke="#333" strokeWidth="2"/>
          <circle cx="24" cy="30" r="6" stroke="#333" strokeWidth="2"/>
        </svg>
      ),
      title: 'Instituições públicas e privadas',
      description: 'Órgãos que promovem eventos sociais, culturais e institucionais com segurança e profissionalismo'
    }
  ]

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="lg:w-5/12">
            <div className="rounded-2xl overflow-hidden h-full min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop" 
                alt="Evento com pessoas"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-7/12">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4 leading-tight">
                Quem confia na Tonho
              </h2>
              <p className="text-[#333333] opacity-80">
                Atendemos desde pequenas festas familiares até grandes eventos corporativos e institucionais
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trustCards.map((card, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-black mb-1">
                      {card.title}
                    </h4>
                    <p className="text-[#333333] opacity-80 text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
