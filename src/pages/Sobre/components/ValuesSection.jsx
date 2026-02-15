const ValuesSection = () => {
  const values = [
    {
      title: 'Integridade',
      description: [
        'Trabalhamos com transparência em cada etapa, do orçamento à execução.',
        'Nosso compromisso é com a verdade e clareza em todas as relações.',
        'Você sabe exatamente o que está contratando, quanto vai pagar e o que esperar de nós.'
      ]
    },
    {
      title: 'Compromisso',
      description: [
        'Cumprimos prazos, mantemos a qualidade e garantimos que cada detalhe saia conforme o planejado.',
        'Seu evento é nossa prioridade máxima.',
        'Quando assumimos um compromisso, ele é cumprido sem exceções.'
      ]
    },
    {
      title: 'Cuidado',
      description: [
        'Tratamos cada evento como se fosse nosso. Cuidamos dos equipamentos, do atendimento e da experiência do cliente com dedicação total.',
        'Para nós, não existem "apenas mais um evento" — cada celebração é única e merece atenção especial.'
      ]
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
          Nossos Valores
        </h2>

        <div className="space-y-0">
          {values.map((value, index) => (
            <div 
              key={index}
              className="py-8 border-b border-black/10 last:border-b-0"
            >
              <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">
                {value.title}
              </h3>
              <div className="text-[#333333] opacity-80 space-y-2">
                {value.description.map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
