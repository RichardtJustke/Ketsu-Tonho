import { useState } from 'react'
import BoxCard from './BoxCard'

const boxes = [
  { id: "portico_de_entrada", nome: "Pórtico", dimensao: "6m x 4,6m", valor: 600 },
  { id: "tenda_box_truss_9x6", nome: "Tenda Box Truss", dimensao: "9x6", valor: 2800 },
  { id: "backdrop_3x2", nome: "Backdrop", dimensao: "3m x 2m", valor: 240 }
]

const BoxGrid = ({ hasAnsweredForm }) => {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleAction = (productId) => {
    // Futura integração com back-end
    // Envia apenas o ID do produto
    console.log('Ação do produto:', productId)
  }

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, boxes.length))
  }

  const visibleBoxes = boxes.slice(0, visibleCount)
  const hasMore = visibleCount < boxes.length

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {visibleBoxes.map((box) => (
            <BoxCard 
              key={box.id} 
              box={box} 
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

export default BoxGrid
