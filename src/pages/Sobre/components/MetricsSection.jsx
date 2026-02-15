const MetricsSection = () => {
  const metrics = [
    {
      value: '5000',
      suffix: '+',
      label: 'Eventos realizados com sucesso desde 2013'
    },
    {
      value: '95',
      suffix: '%',
      label: 'Taxa de satisfação e recomendação dos nossos clientes'
    },
    {
      value: '24',
      suffix: '/7',
      label: 'Suporte disponível para emergências e atendimento ágil'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F7F7F8] rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center md:text-left">
                <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black">
                    {metric.value}
                  </span>
                  <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black">
                    {metric.suffix}
                  </span>
                </div>
                <p className="text-[#333333] opacity-80">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MetricsSection
