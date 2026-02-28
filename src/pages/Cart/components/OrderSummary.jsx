import { useState, useEffect } from 'react'

const OrderSummary = ({ subtotal, installationFee = 300, discount = 0, onFinalize }) => {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCode, setAppliedCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(discount)
  const [couponMessage, setCouponMessage] = useState('')

  const calculateDiscountValue = (code) => {
    const normalized = code.trim().toUpperCase()
    let percentage = 0

    if (normalized === 'TONHO10') percentage = 10
    if (normalized === 'PRIMEIRA') percentage = 20
    if (normalized === 'EVENTO30') percentage = 30

    if (!percentage) return { value: 0, percentage: 0 }

    const value = subtotal * (percentage / 100)
    return { value, percentage }
  }

  useEffect(() => {
    if (!appliedCode) return
    const { value } = calculateDiscountValue(appliedCode)
    setAppliedDiscount(value)
  }, [subtotal, appliedCode])

  const effectiveDiscount = appliedDiscount || discount
  const total = subtotal + installationFee - effectiveDiscount

  const handleApplyCoupon = () => {
    const trimmed = couponCode.trim().toUpperCase()
    if (!trimmed) {
      setAppliedCode('')
      setAppliedDiscount(0)
      setCouponMessage('Digite um código promocional.')
      return
    }

    const { value, percentage } = calculateDiscountValue(trimmed)

    if (!percentage) {
      setAppliedCode('')
      setAppliedDiscount(0)
      setCouponMessage('Código inválido. Use TONHO10, PRIMEIRA ou EVENTO30.')
      return
    }

    setAppliedCode(trimmed)
    setAppliedDiscount(value)
    setCouponMessage(`Código ${trimmed} aplicado: ${percentage}% de desconto nos itens.`)
  }

  return (
    <div className="space-y-6">
      {/* Coupon Code Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.667 10V17.5H3.333V10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.333 5.833H1.667V10H18.333V5.833Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 17.5V5.833" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 5.833H6.25C5.587 5.833 4.951 5.57 4.482 5.101C4.013 4.632 3.75 3.996 3.75 3.333C3.75 2.671 4.013 2.035 4.482 1.566C4.951 1.097 5.587 0.833 6.25 0.833C9.167 0.833 10 5.833 10 5.833Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 5.833H13.75C14.413 5.833 15.049 5.57 15.518 5.101C15.987 4.632 16.25 3.996 16.25 3.333C16.25 2.671 15.987 2.035 15.518 1.566C15.049 1.097 14.413 0.833 13.75 0.833C10.833 0.833 10 5.833 10 5.833Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="font-semibold text-[#333333]">Código Promocional</h3>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Digite seu código"
            className="flex-1 px-4 py-3 bg-[#F7F7F8] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF5F1F] transition-colors"
          />
          <button 
            onClick={handleApplyCoupon}
            className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-[#333333] hover:bg-gray-50 transition-colors"
          >
            Aplicar
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Use <span className="font-semibold">TONHO10</span>, <span className="font-semibold">PRIMEIRA</span> ou <span className="font-semibold">EVENTO30</span> para 10%, 20% ou 30% de desconto nos itens.
        </p>

        {couponMessage && (
          <p className="text-xs mt-2 {appliedCode ? 'text-green-600' : 'text-red-500'}">
            {couponMessage}
          </p>
        )}
      </div>

      {/* Order Summary Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="font-semibold text-[#333333] mb-4">Resumo do Pedido</h3>

        <div className="space-y-3 pb-4 border-b border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({subtotal > 0 ? 'itens' : '0 itens'})</span>
            <span className="font-medium text-[#333333]">R${subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de instalação</span>
            <span className="font-medium text-[#333333]">R${installationFee.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Desconto</span>
            <span className="font-medium text-green-600">R${effectiveDiscount.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>

        <div className="flex justify-between pt-4 pb-4">
          <span className="font-semibold text-[#333333]">Total</span>
          <span className="font-bold text-xl text-[#333333]">R${total.toFixed(2).replace('.', ',')}</span>
        </div>

        {/* Finalize Button */}
        <button 
          onClick={onFinalize}
          className="w-full bg-[#333333] text-white font-medium py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.333 5V3.333C13.333 2.89 13.157 2.467 12.845 2.155C12.533 1.843 12.11 1.667 11.667 1.667H3.333C2.89 1.667 2.467 1.843 2.155 2.155C1.843 2.467 1.667 2.89 1.667 3.333V16.667C1.667 17.11 1.843 17.533 2.155 17.845C2.467 18.157 2.89 18.333 3.333 18.333H11.667C12.11 18.333 12.533 18.157 12.845 17.845C13.157 17.533 13.333 17.11 13.333 16.667V15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6.667 10H18.333M18.333 10L15 6.667M18.333 10L15 13.333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Enviar orçamento
        </button>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.167 1.667H5.833C5.373 1.667 5 2.04 5 2.5V17.5C5 17.96 5.373 18.333 5.833 18.333H14.167C14.627 18.333 15 17.96 15 17.5V2.5C15 2.04 14.627 1.667 14.167 1.667Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.667 5.833H5M1.667 14.167H5M15 5.833H18.333M15 14.167H18.333" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-[#333333] text-sm">Entrega gratuita</p>
            <p className="text-xs text-gray-500">Em pedidos acima de R$200</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18.333C14.602 18.333 18.333 14.602 18.333 10C18.333 5.398 14.602 1.667 10 1.667C5.398 1.667 1.667 5.398 1.667 10C1.667 14.602 5.398 18.333 10 18.333Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 5V10L13.333 11.667" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-medium text-[#333333] text-sm">Equipamentos Seguros</p>
            <p className="text-xs text-gray-500">Todos os itens revisados antes da entrega</p>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="bg-[#F7F7F8] rounded-2xl p-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          Cada equipamento é cuidadosamente revisado e higienizado antes de cada locação
        </p>
        <p className="text-xs font-medium text-[#333333]">Equipe Tonho Locação</p>
      </div>
    </div>
  )
}

export default OrderSummary
