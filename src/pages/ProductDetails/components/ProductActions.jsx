import { useNavigate } from 'react-router-dom'

/**
 * ProductActions - Área de ações com botões
 * Botão Voltar + Botão condicional (Ver disponibilidade OU Adicionar ao carrinho)
 */
const ProductActions = ({ productId, hasAnsweredForm, onCheckAvailability, onAddToCart }) => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <section className="bg-white px-6 pb-12 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Botão Voltar */}
          <button 
            onClick={handleGoBack}
            className="bg-[#FF5F1F] text-white text-sm font-medium py-3 px-6 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all"
          >
            VOLTAR
            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>

          {/* Botão condicional - NUNCA exibir os dois ao mesmo tempo */}
          {!hasAnsweredForm ? (
            // Estado 1: Antes do formulário respondido - Ver disponibilidade
            <button 
              onClick={onCheckAvailability}
              className="bg-[#FF5F1F] text-white text-sm font-medium py-3 px-6 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all"
            >
              VER DISPONIBILIDADE
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          ) : (
            // Estado 2: Depois do formulário respondido - Adicionar ao carrinho
            <button 
              onClick={() => onAddToCart(productId)}
              className="bg-[#FF5F1F] text-white text-sm font-medium py-3 px-6 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all"
            >
              ADICIONAR O CARRINHO
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductActions
