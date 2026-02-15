import { useState, useEffect } from 'react'

/**
 * EventFilterModal - Formulário interativo step-by-step para filtrar produtos
 * 
 * Props:
 * - isOpen: boolean - controla visibilidade do modal
 * - onClose: function - callback para fechar o modal
 * - onComplete: function(filters) - callback com os filtros selecionados
 */
const EventFilterModal = ({ isOpen, onClose, onComplete }) => {
  // Estado do step atual (-1 = intro, 0, 1, 2 = perguntas)
  const [currentStep, setCurrentStep] = useState(-1)
  
  // Estado das respostas do formulário
  const [filters, setFilters] = useState({
    location: '',
    guests: '',
    date: ''
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
      setFilters({ location: '', guests: '', date: '' })
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

  // Função para selecionar a data
  const handleDateChange = (e) => {
    setFilters(prev => ({ ...prev, date: e.target.value }))
  }

  // Função para finalizar o formulário
  const handleComplete = () => {
    if (filters.date) {
      setIsVisible(false)
      setTimeout(() => {
        onComplete(filters)
        onClose()
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
      title: 'Qual a localização do evento?',
      subtitle: 'Digite o bairro ou endereço para calcularmos a entrega',
      field: 'location',
      placeholder: 'Ex: Nazaré, Umarizal, Ananindeua...',
      icon: '📍'
    },
    {
      title: 'Quantas pessoas irão?',
      subtitle: 'Informe a quantidade estimada de convidados',
      field: 'guests',
      placeholder: 'Ex: 50, 100, 200...',
      icon: '👥'
    },
    {
      title: 'Qual o dia do seu evento?',
      subtitle: 'Informe a data para verificarmos a disponibilidade',
      field: 'date',
      isDatePicker: true,
      icon: '📅'
    }
  ]

  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Overlay escuro */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Container do Modal */}
      <div 
        className={`relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Botão fechar */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
          aria-label="Fechar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* TELA DE INTRODUÇÃO */}
        {currentStep === -1 && (
          <div className="px-6 pt-6 pb-6">
            <div 
              className={`text-center transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
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
                Em apenas <span className="font-semibold text-[#FF5F1F]">3 perguntas rápidas</span>, 
                vamos te ajudar a encontrar tudo que você precisa.
              </p>

              {/* Benefícios em linha */}
              <div className="flex justify-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <span>⚡</span> Rápido
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <span>🎯</span> Personalizado
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
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      index < currentStep 
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
                className={`transition-all duration-300 ${
                  isAnimating 
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

                {/* Input de Data ou Texto */}
                {currentStepData?.isDatePicker ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="date"
                        value={filters.date}
                        onChange={handleDateChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-[#FF5F1F] focus:outline-none transition-all cursor-pointer"
                      />
                    </div>
                    
                    {/* Dica */}
                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                          <p className="font-medium text-[#333333] mb-1">Dica</p>
                          <p className="text-sm text-gray-600">
                            Recomendamos agendar com pelo menos 7 dias de antecedência.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
                        {currentStepData?.icon}
                      </span>
                      <input
                        type={currentStepData?.field === 'guests' ? 'number' : 'text'}
                        value={filters[currentStepData?.field]}
                        onChange={(e) => setFilters(prev => ({ ...prev, [currentStepData.field]: e.target.value }))}
                        placeholder={currentStepData?.placeholder}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-[#FF5F1F] focus:outline-none transition-all"
                        autoFocus
                      />
                    </div>
                    
                    {/* Botão continuar */}
                    <button
                      onClick={() => {
                        if (filters[currentStepData.field]) {
                          advanceStep()
                        }
                      }}
                      disabled={!filters[currentStepData?.field]}
                      className={`w-full py-4 rounded-2xl font-medium transition-all duration-200 ${
                        filters[currentStepData?.field]
                          ? 'bg-[#FF5F1F] text-white hover:bg-[#e5551b]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Continuar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer com navegação */}
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between gap-4">
                {/* Botão Voltar */}
                {currentStep > 0 ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-[#333333] font-medium transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Voltar
                  </button>
                ) : (
                  <div />
                )}
                
                {/* Botão Finalizar (só no último step) */}
                {currentStep === 2 && (
                  <button
                    onClick={handleComplete}
                    disabled={!filters.date}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                      filters.date
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>

            {/* Resumo das seleções */}
            {(filters.location || filters.guests) && (
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
                      <span>📍</span>
                      {filters.location}
                    </span>
                  )}
                  {filters.guests && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
                      <span>👥</span>
                      {filters.guests} pessoas
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default EventFilterModal
