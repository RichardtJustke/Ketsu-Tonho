import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * ProductActions - Área de ações com botões
 * Botão Voltar + Botão condicional (Ver disponibilidade OU Adicionar ao carrinho)
 */
const ProductActions = ({ productId, product, hasAnsweredForm, onCheckAvailability, onAddToCart }) => {
  const navigate = useNavigate()
  const [showSizeOptions, setShowSizeOptions] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')

  const parseDimensions = (specs = {}) => {
    const lengthRaw = specs.Comprimento || specs.Largura
    const widthRaw = specs.Largura || specs.Altura

    if (!lengthRaw || !widthRaw) return null

    const normalizedLength = String(lengthRaw).toLowerCase().replace(/,/g, '.')
    const normalizedWidth = String(widthRaw).toLowerCase().replace(/,/g, '.')
    const lengthMatch = normalizedLength.match(/(\d+(\.\d+)?)/)
    const widthMatch = normalizedWidth.match(/(\d+(\.\d+)?)/)

    if (!lengthMatch || !widthMatch) return null

    return {
      length: Number(lengthMatch[0]),
      width: Number(widthMatch[0]),
      hasMeters: normalizedLength.includes('m') || normalizedWidth.includes('m')
    }
  }

  const formatNumber = (value) => (
    Number.isInteger(value) ? value.toString() : value.toFixed(1).replace('.', ',')
  )

  const buildSizeOptions = (specs) => {
    const parsed = parseDimensions(specs)
    const multipliers = [1, 2, 4, 8, 16]

    if (!parsed) return []

    return multipliers.map((multiplier) => {
      const length = parsed.length * multiplier
      const width = parsed.width * multiplier
      const label = parsed.hasMeters
        ? `${formatNumber(length)}m x ${formatNumber(width)}m`
        : `${formatNumber(length)} x ${formatNumber(width)}`
      return { value: label, label }
    })
  }

  const isBoxProduct = product?.category === 'box'
  const sizeOptions = isBoxProduct ? buildSizeOptions(product?.specs) : []

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <section className="bg-white px-6 pb-12 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
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
            // Estado 2: Depois do formulário respondido - Alugar agora
            <div className="flex flex-col items-center sm:items-start gap-3 w-full sm:w-auto">
              <button 
                onClick={() => {
                  if (!sizeOptions.length) {
                    onAddToCart(productId)
                    return
                  }

                  if (!showSizeOptions) {
                    setShowSizeOptions(true)
                    return
                  }

                  if (!selectedSize) return

                  onAddToCart(productId, selectedSize)
                  setShowSizeOptions(false)
                  setSelectedSize('')
                }}
                className="bg-[#FF5F1F] text-white text-sm font-medium py-3 px-6 rounded-full inline-flex items-center gap-2 hover:opacity-90 transition-all"
              >
                {showSizeOptions && sizeOptions.length ? 'CONFIRMAR TAMANHO' : 'ALUGAR AGORA'}
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {showSizeOptions && sizeOptions.length > 0 && (
                <div className="w-full max-w-[280px]">
                  <label className="block text-xs text-[#333333]/70 mb-1 text-left">
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
                  <p className="text-[#333333]/60 text-xs mt-2">
                    Escolha o tamanho ideal antes de alugar.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductActions
