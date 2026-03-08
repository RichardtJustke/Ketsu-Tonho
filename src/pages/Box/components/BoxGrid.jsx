import BoxCard from './BoxCard'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useAvailability } from '../../../hooks/useAvailability'
import { getEventDate } from '../../../utils/cart'
import { getHasAnsweredForm } from '../../../utils/answeredForm'

const boxes = [
  { id: "portico_de_entrada", nome: "Pórtico", dimensao: "6m x 4,6m", valor: 600 },
  { id: "tenda_box_truss_9x6", nome: "Tenda Box Truss", dimensao: "9x6", valor: 2800 },
  { id: "backdrop_3x2", nome: "Backdrop", dimensao: "3m x 2m", valor: 240 }
]

const BoxGrid = ({ hasAnsweredForm }) => {
  const eventDate = getHasAnsweredForm() ? getEventDate() : null
  const { isAvailable, getStock } = useAvailability(eventDate)

  const handleAction = (productId) => {
    console.log('Ação do produto:', productId)
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {boxes.map((box, index) => (
            <AnimateIn key={box.id} animation="fade-in-up" delay={index * 50}>
              <BoxCard
                box={box}
                hasAnsweredForm={hasAnsweredForm}
                onAction={handleAction}
                availableStock={getStock(box.id)}
                isItemAvailable={isAvailable(box.id)}
              />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BoxGrid
