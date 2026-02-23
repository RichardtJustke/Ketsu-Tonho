import videoTrust from '../../../imagens/vdd/n1g7HMEESROCOjXXSeiL_IMG_0116-v.mp4'

const TrustSection = () => {
  const trustCards = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="18" r="8" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M12 36V32C12 28.7 14.7 26 18 26H30C33.3 26 36 28.7 36 32V36" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="24" cy="18" r="4" fill="white" opacity="0.3"/>
        </svg>
      ),
      title: 'Clientes pessoa física',
      description: 'Aniversários, casamentos, confraternizações e celebrações que marcam momentos especiais'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="14" width="28" height="24" rx="2" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M18 14V10C18 9.4 18.4 9 19 9H29C29.6 9 30 9.4 30 10V14" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M10 22H38" stroke="white" strokeWidth="1.5"/>
          <circle cx="20" cy="28" r="1.5" fill="white"/>
          <circle cx="28" cy="28" r="1.5" fill="white"/>
        </svg>
      ),
      title: 'Empresas e corporações',
      description: 'Eventos corporativos, treinamentos, convenções e ações de relacionamento'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 10L12 18V38H20V28H28V38H36V18L24 10Z" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 10V18H36" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="20" y="24" width="8" height="6" rx="1" fill="white" opacity="0.3"/>
        </svg>
      ),
      title: 'Produtores e organizadores',
      description: 'Parceiros que confiam na nossa estrutura para realizar eventos de médio e grande porte'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="16" width="28" height="20" rx="2" fill="#FF5F1F" stroke="#FF5F1F" strokeWidth="1.5"/>
          <path d="M38 16V12C38 10.9 37.1 10 36 10H30L28 6H20L18 10H12C10.9 10 10 10.9 10 12V16" stroke="#FF5F1F" strokeWidth="1.5"/>
          <circle cx="24" cy="26" r="5" fill="white" opacity="0.3"/>
          <circle cx="24" cy="26" r="3" stroke="white" strokeWidth="1.5"/>
          <circle cx="24" cy="26" r="1.5" fill="white"/>
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
          {/* Video */}
          <div className="lg:w-5/12">
            <div className="rounded-2xl overflow-hidden h-full min-h-[300px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={videoTrust} type="video/mp4" />
              </video>
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
