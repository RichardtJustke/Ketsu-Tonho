const TrustSection = () => {
  const checkItems = [
    'Equipamentos certificados e inspecionados',
    'Equipe treinada, uniformizada e identificada',
    'Seguro de responsabilidade civil',
    'Manutenção preventiva constante'
  ]

  const CheckIcon = () => (
    <div className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center flex-shrink-0">
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black mb-12">
          Serviço de confiança em que você pode confiar
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Image */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" 
                alt="Serviço de confiança"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2">
            <p className="text-black font-medium mb-4">
              Na Tonho, trabalhamos com equipamentos de marcas reconhecidas, seguimos todas as normas de segurança e mantemos nosso acervo sempre atualizado e em perfeito estado.
            </p>
            
            <p className="text-black opacity-80 mb-8">
              Atuamos com total transparência e responsabilidade. Nossos equipamentos são certificados, nossa equipe é uniformizada e treinada, e todos os nossos serviços são cobertos por seguro de responsabilidade civil. Você contrata com a certeza de que está em boas mãos.
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
        </div>
      </div>
    </section>
  )
}

export default TrustSection
