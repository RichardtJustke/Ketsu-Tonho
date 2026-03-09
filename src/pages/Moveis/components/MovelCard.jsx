import { Link } from 'react-router-dom'
import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'
import { useCartContext } from '../../../shared/contexts/CartContext'

const MovelCard = ({ item, hasAnsweredForm, onAction, availableStock, isItemAvailable = true }) => {
  const { images } = useCloudinaryImages(item.id)
  const { addItem } = useCartContext()
  const imageUrl = images.length > 0 ? images[0] : ''
  const unavailable = hasAnsweredForm && !isItemAvailable

  const handleClick = () => {
    if (unavailable) return
    if (hasAnsweredForm) {
      addItem({
        id: item.id,
        name: item.nome,
        price: item.valor,
        category: 'moveis',
        image: imageUrl
      })
      return
    }

    onAction(item.id)
  }

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm ${unavailable ? 'opacity-60' : 'hover-lift'}`}>
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 relative">
          {imageUrl ? (
            <div
              className={`h-56 sm:h-full min-h-[240px] sm:min-h-[300px] bg-cover bg-center bg-no-repeat ${unavailable ? 'grayscale' : ''}`}
              style={{ backgroundImage: `url('${imageUrl}')` }}
            />
          ) : null}
          {unavailable && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              INDISPONÍVEL
            </div>
          )}
        </div>

        <div className="w-full sm:w-1/2 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black mb-1">
              {item.nome}
            </h3>
            <p className="text-[#333333]/70 text-sm mb-4">
              Valor diária a partir de: <span className="font-medium text-black">R${item.valor.toFixed(2).replace('.', ',')}</span>
            </p>
            {unavailable && (
              <p className="text-red-600 text-xs font-medium mb-2">
                Sem estoque para a data selecionada
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to={`/produto/${item.id}`}
              className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF5F1F] rounded-full text-sm font-medium text-white hover:bg-white hover:text-[#FF5F1F] border border-[#FF5F1F] transition-colors w-fit"
            >
              SABER MAIS
              <span className="w-5 h-5 rounded-full bg-white group-hover:bg-[#FF5F1F] flex items-center justify-center transition-colors">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" className="stroke-[#FF5F1F] group-hover:stroke-white transition-colors" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <button
              onClick={handleClick}
              disabled={unavailable}
              className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-full text-sm font-medium transition-colors w-fit ${
                unavailable
                  ? 'border-black/10 text-black/40 cursor-not-allowed'
                  : 'border-black/20 text-black hover:bg-black hover:text-white'
              }`}
            >
              {unavailable ? 'INDISPONÍVEL' : hasAnsweredForm ? 'ALUGAR AGORA' : 'VER DISPONIBILIDADE'}
              <span className={`w-5 h-5 rounded-full flex items-center justify-center ${unavailable ? 'bg-black/20' : 'bg-[#FF5F1F]'}`}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovelCard
