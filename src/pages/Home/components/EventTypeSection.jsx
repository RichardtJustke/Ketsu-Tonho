import { useState } from 'react'

const EventTypeSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const eventTypes = [
    {
      title: 'Casamentos e Festas de 15 Anos',
      description: 'Para tornar esse dia inesquecível, você vai precisar de uma estrutura completa que garanta conforto e beleza. Recomendamos: tendas decoradas, mesas e cadeiras elegantes, iluminação ambiente, sistema de som, climatizadores para conforto dos convidados, além de equipamentos para buffet completo.'
    },
    {
      title: 'Eventos Corporativos',
      description: 'Para eventos empresariais de sucesso, oferecemos tendas climatizadas, mobiliário executivo, equipamentos audiovisuais, palcos e púlpitos, além de toda infraestrutura necessária para convenções, treinamentos e confraternizações corporativas.'
    },
    {
      title: 'Aniversários e Confraternizações',
      description: 'Para celebrações memoráveis, disponibilizamos tendas de diversos tamanhos, mesas e cadeiras para todos os gostos, iluminação decorativa, som ambiente e equipamentos para bar e churrasqueira.'
    },
    {
      title: 'Eventos ao Ar Livre',
      description: 'Para eventos externos, contamos com tendas resistentes, pisos modulares, iluminação profissional, geradores, banheiros químicos de luxo e toda estrutura para garantir conforto mesmo em ambientes abertos.'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Que tipo de evento você vai realizar?
          </h2>
        </div>

        <div className="text-center mb-12">
          <p className="text-[#333333] text-lg max-w-2xl mx-auto">
            Selecionamos os itens essenciais para cada tipo de celebração. Veja nossas sugestões e facilite seu planejamento
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto">
          {eventTypes.map((event, index) => (
            <div 
              key={index}
              className="border-b border-black/10"
            >
              <button
                className={`w-full py-6 text-left transition-opacity ${
                  activeIndex === index ? '' : 'opacity-60'
                }`}
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-black">
                  {event.title}
                </h3>
              </button>
              
              {activeIndex === index && (
                <div className="pb-6">
                  <p className="text-[#333333] opacity-80 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventTypeSection
