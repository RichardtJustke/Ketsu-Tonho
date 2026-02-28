import BoxCard from './BoxCard'

const boxes = [
  { id: "portico_de_entrada", nome: "Pórtico", dimensao: "6m x 4,6m", valor: 600 },
  { id: "tenda_box_truss_9x6", nome: "Tenda Box Truss", dimensao: "9x6", valor: 2800 },
  { id: "backdrop_3x2", nome: "Backdrop", dimensao: "3m x 2m", valor: 240 }
]

const BoxGrid = ({ hasAnsweredForm }) => {
  const handleAction = (productId) => {
    // Futura integração com back-end
    // Envia apenas o ID do produto
    console.log('Ação do produto:', productId)
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {boxes.map((box) => (
            <BoxCard 
              key={box.id} 
              box={box} 
              hasAnsweredForm={hasAnsweredForm}
              onAction={handleAction}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default BoxGrid
