import { useState } from 'react'

const SpecialInstructions = ({ onInstructionsChange }) => {
  const [instructions, setInstructions] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setInstructions(value)
    onInstructionsChange?.(value)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.667 2.5H3.333C2.413 2.5 1.667 3.246 1.667 4.167V15.833C1.667 16.754 2.413 17.5 3.333 17.5H16.667C17.587 17.5 18.333 16.754 18.333 15.833V4.167C18.333 3.246 17.587 2.5 16.667 2.5Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 6.667H15M5 10H15M5 13.333H10" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="font-semibold text-[#333333]">Instruções Especiais</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Adicione uma observação ao seu pedido (opcional)
      </p>

      <textarea
        value={instructions}
        onChange={handleChange}
        placeholder="Observações especiais sobre entrega, montagem, horário preferencial, endereço do evento..."
        rows={4}
        className="w-full px-4 py-3 bg-[#F7F7F8] border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#FF5F1F] transition-colors placeholder:text-gray-400"
      />

      <p className="text-xs text-gray-500 mt-3">
        Exemplos: "Evento será no dia 15/03 às 14h" • "Entregar em [endereço]" • "Montagem no período da manhã" • "Preciso de ajuda com o layout"
      </p>
    </div>
  )
}

export default SpecialInstructions
