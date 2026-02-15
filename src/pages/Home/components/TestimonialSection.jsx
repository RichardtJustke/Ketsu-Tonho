const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Maria L.',
      role: 'cliente desde 2021',
      text: 'Realizamos o casamento da minha filha com a Tonho e foi perfeito! Tudo entregue no prazo, montagem impecável e equipe super atenciosa. Recomendo de olhos fechados!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Roberto M.',
      role: 'empresário',
      text: 'Precisei de estrutura completa para um evento de última hora e a Tonho conseguiu atender. Profissionalismo e agilidade que fazem a diferença!',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Carlos R.',
      role: 'produtor de eventos',
      text: 'Trabalho com eventos corporativos e a Tonho é minha parceira de confiança. Sempre cumprem o combinado, equipamentos em ótimo estado e resolvem qualquer imprevisto rapidamente.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Ana Paula F.',
      role: 'cliente',
      text: 'A festa de 15 anos da minha filha ficou linda! A equipe foi super cuidadosa com a decoração e tudo saiu melhor do que imaginamos. Obrigada, Tonho!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Juliana S.',
      role: 'gestora de RH',
      text: 'Aluguei mesas, cadeiras e tenda para uma confraternização da empresa. Atendimento excelente desde o primeiro contato. Voltaremos a fazer negócio com certeza!',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop'
    },
    {
      name: 'Fernando K.',
      role: 'organizador de eventos',
      text: 'Confiança é tudo quando se trata de evento. Com a Tonho, sei que não vou ter surpresas desagradáveis. Já são anos de parceria e sempre com a mesma qualidade.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
    }
  ]

  const StarRating = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FF5F1F" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 0L10.3 5.3L16 6.2L12 10.1L12.9 16L8 13.3L3.1 16L4 10.1L0 6.2L5.7 5.3L8 0Z"/>
        </svg>
      ))}
    </div>
  )

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-black text-center mb-12">
          O que nossos clientes dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#F7F7F8] rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-black text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#333333] opacity-80 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <StarRating />
              </div>
              
              <p className="text-black text-sm leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
