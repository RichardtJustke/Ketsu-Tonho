import MovelCard from '../../Moveis/components/MovelCard'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useAvailability } from '../../../hooks/useAvailability'
import { getEventDate } from '../../../utils/cart'
import { getHasAnsweredForm } from '../../../utils/answeredForm'

const climatizadores = [
    { id: "climatizador_guaruja", nome: "Climatizador Guarujá", valor: 250 },
    { id: "climatizador_juapi_110v", nome: "Climatizador Joape 110V", valor: 300 },
    { id: "clima_brisa_br30", nome: "Climabrisa BR30", valor: 400 },
    { id: "clima_brisa_i20", nome: "Climabrisa Portátil I20", valor: 300 }
]

const ClimatizadoresGrid = ({ hasAnsweredForm }) => {
    const eventDate = getHasAnsweredForm() ? getEventDate() : null
    const { isAvailable, getStock } = useAvailability(eventDate)

    const handleAction = (productId) => {
        console.log('Ação do produto:', productId)
    }

    return (
        <section className="bg-white py-16 md:py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    {climatizadores.map((item, index) => (
                        <AnimateIn key={item.id} animation="fade-in-up" delay={index * 50}>
                            <MovelCard
                                item={item}
                                hasAnsweredForm={hasAnsweredForm}
                                onAction={handleAction}
                                availableStock={getStock(item.id)}
                                isItemAvailable={isAvailable(item.id)}
                            />
                        </AnimateIn>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ClimatizadoresGrid
