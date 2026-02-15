/**
 * ProductHero - Seção Hero da página de detalhes do produto
 * Exibe nome, descrição curta e botão principal (condicional)
 */
const ProductHero = ({ product, hasAnsweredForm, onCheckAvailability }) => {
  return (
    <section className="relative bg-black min-h-[400px] flex items-center pt-24 pb-16">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6">
            {product.name}
          </h1>
          
          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            {product.shortDescription}
          </p>

          {/* Botão condicional - Ver disponibilidade OU não aparece se formulário já respondido */}
          {!hasAnsweredForm && (
            <button 
              onClick={onCheckAvailability}
              className="bg-white text-black text-sm font-medium py-3 px-6 rounded-full inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              QUERO ALUGAR
              <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductHero
