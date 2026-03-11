import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setHasAnsweredForm } from '../../utils/answeredForm'
import { setEventDate } from '../../utils/cart'

import { useCloudinaryImages } from '../../hooks/useCloudinaryImages'

/**
 * EventFilterModal - Formulário interativo step-by-step para filtrar produtos
 * 
 * Props:
 * - isOpen: boolean - controla visibilidade do modal
 * - onClose: function - callback para fechar o modal
 * - onComplete: function(filters) - callback com os filtros selecionados
 */
const EventFilterModal = ({ isOpen, onClose, onComplete }) => {
  // Estado do step atual (-1 = intro, 0 = pergunta)
  const [currentStep, setCurrentStep] = useState(-1)

  const { images: tendaImages } = useCloudinaryImages('tenda_branca_5x5', { isRawFolder: true })
  const { images: movelImages } = useCloudinaryImages('mesa_bistro', { isRawFolder: true })
  const { images: boxImages } = useCloudinaryImages('tenda_9x6_lona_box_struss', { isRawFolder: true })
  const { images: climaImages } = useCloudinaryImages('climatizador_juapi_110v', { isRawFolder: true })

  const tendaImage = tendaImages[0] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop'
  const movelImage = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152429/5E87AE070D5F59B45560-1920w_ut64ts.jpg'
  const boxImage = boxImages[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop'
  const climatizadorImage = climaImages[1] || climaImages[0] || 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop'

  // Estado das respostas do formulário
  const [filters, setFilters] = useState({
    eventDate: ''
  })

  // Estado para controlar animações
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next')

  // Estado para controlar a visibilidade do modal
  const [isVisible, setIsVisible] = useState(false)

  // Efeito para animar entrada do modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  // Reset do formulário quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(-1)
      setFilters({ eventDate: '' })
    }
  }, [isOpen])

  // Avançar para próximo step
  const advanceStep = () => {
    setDirection('next')
    setIsAnimating(true)

    setTimeout(() => {
      setCurrentStep(prev => prev + 1)
      setIsAnimating(false)
    }, 300)
  }

  // Função para voltar ao step anterior
  const handleBack = () => {
    if (currentStep > 0) {
      setDirection('prev')
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentStep(prev => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  // Função para finalizar o formulário
  const handleComplete = () => {
    if (filters.eventDate) {
      setHasAnsweredForm(true)
      setEventDate(filters.eventDate)
      onComplete(filters)
      setDirection('next')
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentStep(steps.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  // Função para fechar o modal
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }

  // Iniciar o formulário
  const handleStart = () => {
    advanceStep()
  }

  // Se o modal não está aberto, não renderiza nada
  if (!isOpen) return null

  // Configuração dos steps de perguntas
  const steps = [
    {
      title: 'Qual a data do evento?',
      subtitle: 'Escolha a data para sugerirmos os serviços ideais',
      field: 'eventDate',
      placeholder: '',
      icon: '📅'
    }
  ]

  const serviceCards = [
    {
      title: 'Tendas e Estruturas',
      link: '/tendas',
      image: tendaImage
    },
    {
      title: 'Mobiliário e Decoração',
      link: '/moveis',
      image: movelImage
    },
    {
      title: 'Climatizadores',
      link: '/climatizadores',
      image: climatizadorImage
    },
    {
      title: 'Estruturas de grande porte',
      link: '/box',
      image: boxImage
    }
  ]

  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {/* Overlay escuro */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={handleClose}
      />

      {/* Container do Modal */}
      <div
        className={`relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
      >
        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          aria-label="Fechar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="#333" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* TELA DE INTRODUÇÃO */}
        {currentStep === -1 && (
          <div className="px-6 pt-6 pb-6">
            <div
              className={`text-center transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
              {/* Ilustração */}
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎪</span>
              </div>

              {/* Título */}
              <h2 className="text-2xl font-bold text-[#333333] mb-2">
                Vamos montar seu evento!
              </h2>

              {/* Subtítulo */}
              <p className="text-gray-500 mb-6">
                Só precisamos da <span className="font-semibold text-[#FF5F1F]">data do evento</span> para
                sugerir os serviços ideais.
              </p>

              {/* Benefícios em linha */}
              <div className="flex justify-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <span>⚡</span> Rápido
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span>📅</span> Só a data
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span>💬</span> Sem compromisso
                </span>
              </div>

              {/* Botão de início */}
              <button
                onClick={handleStart}
                className="w-full py-4 bg-gradient-to-r from-[#FF5F1F] to-[#FF8C1F] text-white font-semibold text-lg rounded-2xl shadow-lg shadow-orange-300/30 hover:shadow-xl hover:shadow-orange-300/40 transition-all"
              >
                Começar agora
              </button>

              <p className="text-gray-400 text-sm mt-3">
                ⏱️ Leva menos de 1 minuto
              </p>
            </div>
          </div>
        )}

        {/* TELAS DE PERGUNTAS */}
        {currentStep >= 0 && currentStep < steps.length && (
          <>
            {/* Header com barra de progresso */}
            <div className="relative px-6 pt-6 pb-4">
              {/* Indicador de progresso */}
              <div className="flex items-center gap-2 mb-6">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${index < currentStep
                      ? 'bg-green-500'
                      : index === currentStep
                        ? 'bg-[#FF5F1F]'
                        : 'bg-gray-200'
                      }`}
                  />
                ))}
              </div>

              {/* Número do step */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#FF5F1F] text-white text-sm font-medium flex items-center justify-center">
                  {currentStep + 1}
                </span>
                <span className="text-sm text-gray-500">de {steps.length}</span>
              </div>
            </div>

            {/* Conteúdo do step atual */}
            <div className="px-6 pb-6">
              <div
                className={`transition-all duration-300 ${isAnimating
                  ? direction === 'next'
                    ? 'opacity-0 -translate-x-4'
                    : 'opacity-0 translate-x-4'
                  : 'opacity-100 translate-x-0'
                  }`}
              >
                {/* Título e subtítulo */}
                <h2 className="text-2xl font-bold text-[#333333] mb-2">
                  {currentStepData?.title}
                </h2>
                <p className="text-gray-500 mb-6">
                  {currentStepData?.subtitle}
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                      {currentStepData?.icon}
                    </span>
                    <input
                      type="date"
                      value={filters[currentStepData?.field]}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setFilters(prev => ({ ...prev, [currentStepData.field]: e.target.value }))}
                      placeholder={currentStepData?.placeholder}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-[#FF5F1F] focus:outline-none transition-all"
                      autoFocus
                    />
                  </div>

                  {/* Botão continuar */}
                  <button
                    onClick={handleComplete}
                    disabled={!filters[currentStepData?.field]}
                    className={`w-full py-4 rounded-2xl font-medium transition-all duration-200 ${filters[currentStepData?.field]
                      ? 'bg-[#FF5F1F] text-white hover:bg-[#e5551b]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    Ver serviços
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TELA DE SERVIÇOS */}
        {currentStep === steps.length && (
          <div className="px-6 pt-6 pb-6">
            <div
              className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
              <h2 className="text-2xl font-bold text-[#333333] mb-2 text-center">
                Serviços disponíveis
              </h2>
              <p className="text-gray-500 mb-6 text-center">
                Escolha uma categoria para ver todos os itens disponíveis
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceCards.map((card) => (
                  <Link
                    key={card.title}
                    to={card.link}
                    onClick={handleClose}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/3] block hover-scale"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">
                        {card.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventFilterModal
