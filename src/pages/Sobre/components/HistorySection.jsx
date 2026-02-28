import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'

const HistorySection = () => {
  const { images: equipeImages } = useCloudinaryImages('equipe', { isRawFolder: true })
  const imageUrl = equipeImages.length > 3 ? equipeImages[3] : (equipeImages.length > 0 ? equipeImages[equipeImages.length - 1] : 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop')

  const stats = [
    { value: '4.9/5', label: 'Avaliação média dos clientes' },
    { value: '1000+', label: 'Eventos realizados' }
  ]

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6">Nossa História</h2>
            <div className="text-[#333333] opacity-80 space-y-4 mb-8">
              <p>Fundada em 2013, a Tonho Locação & Eventos nasceu do desejo de facilitar a realização de eventos, oferecendo soluções completas e de qualidade. O que começou como uma pequena empresa familiar se transformou em uma das principais referências do mercado de locação para eventos.</p>
              <p>Ao longo de mais de 10 anos, construímos uma reputação sólida baseada em pontualidade, compromisso e atendimento próximo. Começamos atendendo pequenas festas familiares e hoje somos parceiros de empresas, produtores de eventos e instituições que confiam na nossa estrutura para realizar desde pequenas comemorações até grandes eventos corporativos.</p>
              <p>Nossa missão sempre foi clara: tornar seu evento possível, cuidando de toda a infraestrutura enquanto você aproveita cada momento. E é isso que fazemos com dedicação desde o primeiro dia.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg p-6 flex-1 min-w-[180px]">
                  <h3 className="text-2xl md:text-3xl font-semibold text-black mb-1">{stat.value}</h3>
                  <p className="text-[#333333] opacity-80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="rounded-2xl overflow-hidden">
              <img src={imageUrl} alt="Nossa história" className="w-full h-[400px] md:h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HistorySection
