import { useState } from 'react'
import { formatBRL } from '../../../utils/formatCurrency'

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleIncrease = () => {
    const newQty = quantity + 1
    setQuantity(newQty)
    onQuantityChange?.(item.id, newQty)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1
      setQuantity(newQty)
      onQuantityChange?.(item.id, newQty)
    }
  }

  const totalPrice = item.price * quantity

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Image */}
      <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-[#333333] text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-1">id:{item.id}</p>
          <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
            {item.category}
          </span>
        </div>

        {/* Price & Controls */}
        <div className="flex flex-col items-end gap-3">
          <div className="text-right">
            <p className="font-semibold text-[#333333] text-lg">R${formatBRL(item.price)}</p>
            {quantity > 1 && (
              <p className="text-sm text-gray-500">R${formatBRL(totalPrice)} total</p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={handleDecrease}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Diminuir quantidade"
              >
                <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="w-10 text-center font-medium text-[#333333]">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                aria-label="Aumentar quantidade"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Remove Button */}
            <button 
              onClick={() => onRemove?.(item.id)}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H14M5.333 4V2.667C5.333 2.313 5.474 1.974 5.724 1.724C5.974 1.474 6.313 1.333 6.667 1.333H9.333C9.687 1.333 10.026 1.474 10.276 1.724C10.526 1.974 10.667 2.313 10.667 2.667V4M12.667 4V13.333C12.667 13.687 12.526 14.026 12.276 14.276C12.026 14.526 11.687 14.667 11.333 14.667H4.667C4.313 14.667 3.974 14.526 3.724 14.276C3.474 14.026 3.333 13.687 3.333 13.333V4H12.667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
