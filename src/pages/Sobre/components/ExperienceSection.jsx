const ExperienceSection = () => {
  const checkItems = [
    {
      title: 'Equipe certificada e treinada',
      description: 'Nossos profissionais passam por treinamento constante para garantir instalação segura, atendimento de qualidade e resolução ágil de qualquer imprevisto. Segurança e excelência técnica em cada entrega.'
    },
    {
      title: 'Equipamentos modernos e eficientes',
      description: 'Mantemos nosso acervo sempre atualizado com os melhores equipamentos do mercado. Todos os itens passam por rigorosa manutenção preventiva e higienização antes de cada locação.'
    }
  ]

  const CheckIcon = () => (
    <div className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Image */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop" 
                alt="Experiência"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
              Experiência que entrega resultados
            </h2>
            
            <p className="text-[#333333] opacity-80 mb-8">
              Com mais de uma década no mercado, a Tonho se consolidou como referência em locação para eventos. Nossa expertise garante que você tenha a estrutura certa para qualquer tipo de celebração, do planejamento à execução.
            </p>

            <div className="space-y-6">
              {checkItems.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <CheckIcon />
                  <div>
                    <h4 className="font-semibold text-black mb-2">
                      {item.title}
                    </h4>
                    <p className="text-black opacity-80 text-sm">
                      {item.description}
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

export default ExperienceSection
