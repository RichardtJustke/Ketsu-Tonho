import CartItem from './CartItem'

const CartItems = ({ items, onQuantityChange, onRemove }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1.667L2.5 5V16.667C2.5 17.108 2.675 17.533 2.988 17.845C3.3 18.158 3.725 18.333 4.167 18.333H15.833C16.275 18.333 16.7 18.158 17.012 17.845C17.325 17.533 17.5 17.108 17.5 16.667V5L15 1.667H5Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 5H17.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.333 8.333C13.333 9.217 12.982 10.064 12.357 10.69C11.732 11.315 10.884 11.667 10 11.667C9.116 11.667 8.268 11.315 7.643 10.69C7.018 10.064 6.667 9.217 6.667 8.333" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="font-semibold text-[#333333] text-lg">
          Carrinho de Locação ({items.length} {items.length === 1 ? 'item' : 'itens'})
        </h2>
      </div>

      {/* Items List */}
      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <CartItem 
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1.667L2.5 5V16.667C2.5 17.108 2.675 17.533 2.988 17.845C3.3 18.158 3.725 18.333 4.167 18.333H15.833C16.275 18.333 16.7 18.158 17.012 17.845C17.325 17.533 17.5 17.108 17.5 16.667V5L15 1.667H5Z" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 5H17.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Seu carrinho está vazio</h3>
          <p className="text-gray-500 text-sm">Adicione itens para começar seu orçamento</p>
        </div>
      )}
    </div>
  )
}

export default CartItems
