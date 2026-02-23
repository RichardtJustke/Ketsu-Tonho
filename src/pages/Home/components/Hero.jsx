import { useState, useEffect } from 'react'
import { getCasesImages } from '../../../utils/imagens'

// Ordem desejada das imagens do hero (por trecho do nome do arquivo)
const HERO_ORDER = ['Tenda', 'Sem', '5E87AE07', '3A7C7B23']

function orderHeroImages(urls) {
  if (!urls || urls.length === 0) return []
  const withIndex = urls.map((url) => {
    const i = HERO_ORDER.findIndex((key) => url.includes(key))
    return { url, order: i >= 0 ? i : 999 }
  })
  withIndex.sort((a, b) => a.order - b.order)
  return withIndex.map((x) => x.url).slice(0, 4)
}

const Hero = ({ onOpenFilterModal }) => {
  const casesUrls = getCasesImages()
  const heroImages = orderHeroImages(casesUrls).length > 0
    ? orderHeroImages(casesUrls)
    : ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop']

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const total = heroImages.length
    if (total <= 1) return
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % total)
    }, 5000)
    return () => clearInterval(t)
  }, [heroImages.length])

  return (
    <section className="relative min-h-screen">
      <div className="relative w-full overflow-hidden min-h-screen">
        {/* Carrossel automático (sem botões) */}
        {heroImages.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: index === current ? 1 : 0,
              zIndex: index === current ? 0 : -1,
            }}
            aria-hidden={index !== current}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[1]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full min-h-screen p-8 md:p-12 lg:p-16">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
              Estrutura completa para o seu evento acontecer sem preocupação
            </h1>

            <div className="flex items-start gap-4">
              <button
                onClick={onOpenFilterModal}
                className="bg-white text-black text-sm font-medium py-3 px-6 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap"
              >
                Monte seu evento
                <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div className="flex items-center gap-4">
                <div className="w-0.5 h-16 bg-white/20" />
                <p className="text-white text-sm max-w-xs">
                  Locação de tendas, mobiliário, equipamentos e buffet para eventos sociais e corporativos em Belém
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
