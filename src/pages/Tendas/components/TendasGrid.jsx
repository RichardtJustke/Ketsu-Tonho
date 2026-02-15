import { useState } from 'react'
import TendaCard from './TendaCard'

const tendas = [
  { id: "tenda_paissandu_5x5", nome: "Tenda Paissandu", dimensao: "05x05m", valor: 380 },
  { id: "tenda_pe_dagua", nome: "Tenda Pé d'Água", dimensao: "-", valor: 300 },
  { id: "tenda_remo_5x5", nome: "Tenda Remo", dimensao: "05x05m", valor: 380 },
  { id: "tenda_cristal_10x10", nome: "Tenda Cristal", dimensao: "10x10m", valor: 1700 },
  { id: "tenda_branca_10x10", nome: "Tenda Branca", dimensao: "10x10m", valor: 1500 },
  { id: "tenda_branca_9x6", nome: "Tenda Branca", dimensao: "9x6m", valor: 850 },
  { id: "tenda_branca_8x8", nome: "Tenda Branca", dimensao: "8x8m", valor: 1000 },
  { id: "tenda_cristal_6x6", nome: "Tenda Cristal", dimensao: "6x6m", valor: 550 },
  { id: "tenda_branca_6x6", nome: "Tenda Branca", dimensao: "6x6m", valor: 500 },
  { id: "tenda_cristal_5x5", nome: "Tenda Cristal", dimensao: "5x5m", valor: 430 },
  { id: "tenda_branca_5x5", nome: "Tenda Branca", dimensao: "5x5m", valor: 380 },
  { id: "tenda_cristal_4x4", nome: "Tenda Cristal", dimensao: "4x4m", valor: 380 },
  { id: "tenda_branca_4x4", nome: "Tenda Branca", dimensao: "4x4m", valor: 300 },
  { id: "tenda_branca_3x3", nome: "Tenda Branca", dimensao: "3x3m", valor: 250 },
  { id: "tenda_cristal_3x3", nome: "Tenda Cristal", dimensao: "3x3m", valor: 300 }
]

const TendasGrid = ({ hasAnsweredForm }) => {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleAction = (productId) => {
    // Futura integração com back-end
    // Envia apenas o ID do produto
    console.log('Ação do produto:', productId)
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, tendas.length))
  }

  const visibleTendas = tendas.slice(0, visibleCount)
  const hasMore = visibleCount < tendas.length

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {visibleTendas.map((tenda) => (
            <TendaCard 
              key={tenda.id} 
              tenda={tenda} 
              hasAnsweredForm={hasAnsweredForm}
              onAction={handleAction}
            />
          ))}
        </div>

        {/* Botão Ver Mais */}
        {hasMore && (
          <div className="flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="bg-[#FF5F1F] text-white font-medium py-3 px-8 rounded-full hover:opacity-90 transition-opacity"
            >
              VEJA MAIS
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TendasGrid
