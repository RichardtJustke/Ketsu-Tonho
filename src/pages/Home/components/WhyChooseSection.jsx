import { useState } from 'react'

const WhyChooseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const reasons = [
    {
      title: 'Experiência de mais de 10 anos',
      description: 'Desde 2013 realizando eventos com excelência, pontualidade e compromisso com a satisfação do cliente'
    },
    {
      title: 'Portfólio completo',
      description: 'De tendas a equipamentos tecnológicos, oferecemos tudo para seu evento em um só lugar'
    },
    {
      title: 'Atendimento próximo e ágil',
      description: 'Equipe dedicada para atender suas necessidades com rapidez e eficiência'
    },
    {
      title: 'Equipe especializada',
      description: 'Profissionais treinados para garantir a montagem perfeita e o funcionamento de todos os equipamentos'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-10 leading-tight">
              Por que escolher a Tonho Locação & Eventos?
            </h2>

            <div className="space-y-0">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className={`py-5 border-b border-black/10 cursor-pointer transition-all ${
                    activeIndex === index ? '' : 'opacity-60'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <h4 className="text-lg font-semibold text-black mb-2">
                    {reason.title}
                  </h4>
                  {activeIndex === index && (
                    <p className="text-[#333333] opacity-80 text-sm">
                      {reason.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden h-full min-h-[400px]">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
                alt="Casamento decorado"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseSection
