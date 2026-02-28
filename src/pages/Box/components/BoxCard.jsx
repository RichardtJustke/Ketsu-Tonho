import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductById } from '../../../data/products'
import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'
import { addToCart } from '../../../utils/cart'

const BoxCard = ({ box, hasAnsweredForm, onAction }) => {
  const product = getProductById(box.id)
  const { images: folderImages } = useCloudinaryImages(box.id)

  const primaryUrl = folderImages.length > 0 ? folderImages[0] : (product?.image || '')
  const fallbackUrl = product?.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'
  const [imageUrl, setImageUrl] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [showSizeOptions, setShowSizeOptions] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')

  const displayUrl = imageUrl || primaryUrl || fallbackUrl

  const parseDimensions = (dimension) => {
    if (!dimension || dimension === '-') return null
    const normalized = dimension.toLowerCase().replace(/,/g, '.')
    const numbers = normalized.match(/(\d+(\.\d+)?)/g)
    if (!numbers || numbers.length < 2) return null
    return {
      width: Number(numbers[0]),
      height: Number(numbers[1]),
      hasMeters: normalized.includes('m')
    }
  }

  const formatNumber = (value) => (
    Number.isInteger(value) ? value.toString() : value.toFixed(1).replace('.', ',')
  )

  const buildSizeOptions = (dimension) => {
    const parsed = parseDimensions(dimension)
    const multipliers = [1, 2, 4, 8, 16]

    if (!parsed) {
      return multipliers.map((multiplier) => ({
        value: multiplier === 1 ? 'Tamanho padrão' : `${multiplier}x padrão`,
        label: multiplier === 1 ? 'Tamanho padrão' : `${multiplier}x padrão`
      }))
    }

    return multipliers.map((multiplier) => {
      const width = parsed.width * multiplier
      const height = parsed.height * multiplier
      const label = parsed.hasMeters
        ? `${formatNumber(width)}m x ${formatNumber(height)}m`
        : `${formatNumber(width)} x ${formatNumber(height)}`
      return { value: label, label }
    })
  }

  const sizeOptions = buildSizeOptions(box.dimensao)

  const handleImageError = () => {
    if (folderImages.length > imageIndex + 1) {
      const next = imageIndex + 1
      setImageIndex(next)
      setImageUrl(folderImages[next])
    } else {
      setImageUrl(fallbackUrl)
    }
  }

  const handleClick = () => {
    if (hasAnsweredForm) {
      if (!showSizeOptions) {
        setShowSizeOptions(true)
        return
      }

      if (!selectedSize) return

      const baseName = `${box.nome}${box.dimensao !== '-' ? ` ${box.dimensao}` : ''}`
      const name = selectedSize ? `${baseName} - ${selectedSize}` : baseName
      addToCart({
        id: box.id,
        name,
        price: box.valor,
        category: product?.category || 'box',
        image: displayUrl || fallbackUrl
      })
      setShowSizeOptions(false)
      setSelectedSize('')
      return
    }

    onAction(box.id)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover-lift">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/2 min-h-[300px] h-72 sm:h-full bg-gray-100">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt={box.nome}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Imagem do produto</div>
          )}
        </div>

        <div className="sm:w-1/2 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-black mb-1">
              {box.nome} {box.dimensao !== '-' && box.dimensao}
            </h3>
            <p className="text-[#333333]/70 text-sm mb-4">
              Valor diária a partir de: <span className="font-medium text-black">R${box.valor.toFixed(2).replace('.', ',')}</span>
            </p>
            <p className="text-[#333333]/60 text-xs">
              Escolha o tamanho ideal antes de alugar.
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
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" className="stroke-[#FF5F1F] group-hover:stroke-white transition-colors" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <button
              onClick={handleClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-black/20 rounded-full text-sm font-medium text-black hover:bg-black hover:text-white transition-colors w-fit"
            >
              {hasAnsweredForm ? (showSizeOptions ? 'CONFIRMAR TAMANHO' : 'ALUGAR AGORA') : 'VER DISPONIBILIDADE'}
              <span className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            {hasAnsweredForm && showSizeOptions && (
              <div className="w-full max-w-[240px]">
                <label className="block text-xs text-[#333333]/70 mb-1">
                  Tamanho
                </label>
                <select
                  value={selectedSize}
                  onChange={(event) => setSelectedSize(event.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors"
                >
                  <option value="" disabled>Selecione o tamanho</option>
                  {sizeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoxCard
