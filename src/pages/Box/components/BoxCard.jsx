import { Link } from 'react-router-dom'

const BoxCard = ({ box, hasAnsweredForm, onAction }) => {
  const handleClick = () => {
    if (hasAnsweredForm) {
      // Envia apenas o ID do produto para o carrinho (futura integração)
      onAction(box.id)
    } else {
      // Redireciona para verificar disponibilidade (futura integração)
      onAction(box.id)
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        {/* Imagem */}
        <div className="sm:w-1/2">
          <div 
            className="h-72 sm:h-full min-h-[300px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
        </div>
        
        {/* Conteúdo */}
        <div className="sm:w-1/2 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black mb-1">
              {box.nome} {box.dimensao !== '-' && box.dimensao}
            </h3>
            <p className="text-[#333333]/70 text-sm mb-4">
              Valor diária a partir de: <span className="font-medium text-black">R${box.valor.toFixed(2).replace('.', ',')}</span>
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link 
              to={`/produto/${box.id}`}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF5F1F] rounded-full text-sm font-medium text-white hover:bg-white hover:text-[#FF5F1F] border border-[#FF5F1F] transition-colors w-fit"
            >
              SABER MAIS
              <span className="w-5 h-5 rounded-full bg-white group-hover:bg-[#FF5F1F] flex items-center justify-center transition-colors">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" className="stroke-[#FF5F1F] group-hover:stroke-white transition-colors" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            
            <button 
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/20 rounded-full text-sm font-medium text-black hover:bg-black hover:text-white transition-colors w-fit"
            >
              {hasAnsweredForm ? 'ADICIONAR AO CARRINHO' : 'VER DISPONIBILIDADE'}
              <span className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxCard
