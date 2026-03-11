import { useState, useEffect, useRef } from 'react'
import AnimateIn from '../../../shared/components/AnimateIn'

const testimonials = [
  {
    stars: 5,
    text: 'A equipe da Ketsu superou todas as expectativas! A tenda ficou impecável e a decoração transformou completamente o espaço. Nosso casamento ficou dos sonhos.',
    name: 'Mariana Silva',
    role: 'Casamento — Belém, PA',
  },
  {
    stars: 5,
    text: 'Profissionalismo do início ao fim. O box truss e toda a estrutura de iluminação ficaram perfeitos para o nosso evento corporativo. Recomendo de olhos fechados!',
    name: 'Carlos Mendes',
    role: 'Evento Corporativo — Ananindeua',
  },
  {
    stars: 5,
    text: 'Contratamos tendas e mobiliário para a confraternização da empresa. Tudo entregue no prazo, montado com cuidado e a qualidade surpreendeu todos os convidados.',
    name: 'Fernanda Costa',
    role: 'Confraternização — Belém, PA',
  },
  {
    stars: 5,
    text: 'O atendimento é incrível, sempre muito atenciosos e prestativos. Os climatizadores fizeram toda a diferença no conforto dos nossos convidados durante o evento.',
    name: 'Rafael Oliveira',
    role: 'Festa de Aniversário — Marituba',
  },
  {
    stars: 5,
    text: 'Já é a terceira vez que contratamos a Ketsu e a qualidade se mantém impecável. O mobiliário e as tendas são de primeira linha. Parceria de confiança!',
    name: 'Ana Paula Rodrigues',
    role: 'Eventos Sociais — Belém, PA',
  },
  {
    stars: 5,
    text: 'A estrutura de box truss para o nosso festival ficou sensacional. Equipe pontual, organizada e muito competente. Já estamos planejando o próximo evento juntos.',
    name: 'Lucas Ferreira',
    role: 'Festival — Belém, PA',
  },
]

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill={i < rating ? '#FF5F1F' : '#E0E0E0'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 0L10.3 5.3L16 6.2L12 10.1L12.9 16L8 13.3L3.1 16L4 10.1L0 6.2L5.7 5.3L8 0Z" />
        </svg>
      ))}
    </div>
  )
}

const QuoteIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#FF5F1F] opacity-30"
  >
    <path
      d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
      fill="currentColor"
    />
  </svg>
)

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useRef(null)
  const intervalRef = useRef(null)

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(intervalRef.current)
  }, [isAutoPlaying])

  // Scroll to active card on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[activeIndex]
      if (card) {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        })
      }
    }
  }, [activeIndex])

  const handleDotClick = (index) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="bg-[#F7F7F8] py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimateIn animation="fade-in-up">
          <div className="text-center mb-16">
            <span className="inline-block text-[#FF5F1F] text-sm font-medium tracking-widest uppercase mb-4">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-black/50 max-w-xl mx-auto text-base md:text-lg">
              A satisfação dos nossos clientes é o nosso maior orgulho. Confira alguns depoimentos de quem já viveu a experiência Ketsu.
            </p>
          </div>
        </AnimateIn>

        {/* Featured testimonial — large card */}
        <AnimateIn animation="fade-in-up" delay={100}>
          <div className="relative bg-white rounded-3xl p-8 md:p-12 mb-10 border border-black/5 shadow-lg overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF5F1F]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FF5F1F]/3 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <QuoteIcon />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-black text-lg md:text-2xl font-light leading-relaxed mb-8 transition-opacity duration-500"
                  key={activeIndex}
                  style={{ animation: 'fadeInUp 0.5s ease-out' }}
                >
                  "{testimonials[activeIndex].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF5F1F] to-[#FF8F5F] flex items-center justify-center text-white font-semibold text-lg"
                  >
                    {testimonials[activeIndex].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-base">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-black/40 text-sm">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <StarRating rating={testimonials[activeIndex].stars} />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-3 md:-left-0 z-20 hidden md:block">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-black transition-colors"
                aria-label="Anterior"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-3 md:-right-0 z-20 hidden md:block">
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 flex items-center justify-center text-black transition-colors"
                aria-label="Próximo"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </AnimateIn>

        {/* Small cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`flex-shrink-0 w-[260px] md:w-[280px] rounded-2xl p-5 text-left transition-all duration-300 border ${index === activeIndex
                ? 'bg-white border-[#FF5F1F]/30 shadow-lg shadow-[#FF5F1F]/10'
                : 'bg-white/60 border-black/5 hover:border-black/10'
                }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${index === activeIndex
                    ? 'bg-gradient-to-br from-[#FF5F1F] to-[#FF8F5F] text-white'
                    : 'bg-black/10 text-black/50'
                    }`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-black text-sm truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-black/30 text-xs truncate">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-black/50 text-xs leading-relaxed line-clamp-2">
                "{testimonial.text}"
              </p>
            </button>
          ))}
        </div>

        {/* Dots — mobile only */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`rounded-full transition-all duration-300 ${index === activeIndex
                ? 'w-8 h-2 bg-[#FF5F1F]'
                : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                }`}
              aria-label={`Depoimento ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default TestimonialsSection
