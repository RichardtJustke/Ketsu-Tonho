import TendaCard from './TendaCard'
import AnimateIn from '../../../shared/components/AnimateIn'

const tendas = [
  { id: 'tenda_paissandu_5x5', nome: 'Tenda Paissandu', dimensao: '05x05m', valor: 380 },
  { id: 'tenda_pe_dagua', nome: "Tenda Pé d'Água", dimensao: '-', valor: 300 },
  { id: 'tenda_remo_5x5', nome: 'Tenda Remo', dimensao: '05x05m', valor: 380 },
  { id: 'tenda_cristal_10x10', nome: 'Tenda Cristal', dimensao: '10x10m', valor: 1700 },
  { id: 'tenda_branca_10x10', nome: 'Tenda Branca', dimensao: '10x10m', valor: 1500 },
  { id: 'tenda_branca_9x6', nome: 'Tenda Branca', dimensao: '9x6m', valor: 850 },
  { id: 'tenda_branca_8x8', nome: 'Tenda Branca', dimensao: '8x8m', valor: 1000 },
  { id: 'tenda_cristal_6x6', nome: 'Tenda Cristal', dimensao: '6x6m', valor: 550 },
  { id: 'tenda_branca_6x6', nome: 'Tenda Branca', dimensao: '6x6m', valor: 500 },
  { id: 'tenda_cristal_5x5', nome: 'Tenda Cristal', dimensao: '5x5m', valor: 430 },
  { id: 'tenda_branca_5x5', nome: 'Tenda Branca', dimensao: '5x5m', valor: 380 },
  { id: 'tenda_cristal_4x4', nome: 'Tenda Cristal', dimensao: '4x4m', valor: 380 },
  { id: 'tenda_branca_4x4', nome: 'Tenda Branca', dimensao: '4x4m', valor: 300 },
  { id: 'tenda_branca_3x3', nome: 'Tenda Branca', dimensao: '3x3m', valor: 250 },
  { id: 'tenda_cristal_3x3', nome: 'Tenda Cristal', dimensao: '3x3m', valor: 300 }
]

const normalizeDimension = (dimension) => {
  if (!dimension || dimension === '-') return 'outros'
  const normalized = dimension.toLowerCase().replace(/\s/g, '')
  const match = normalized.match(/(\d+)[xX](\d+).*/)
  if (!match) return dimension

  const a = String(Number(match[1]))
  const b = String(Number(match[2]))
  return `${a}x${b}m`
}

const computeArea = (dimension) => {
  if (dimension === 'outros') return 0
  const match = dimension.match(/(\d+)[xX](\d+)/)
  if (!match) return 0
  const a = Number(match[1])
  const b = Number(match[2])
  return a * b
}

const groupTendasByDimension = () => {
  const groups = {}

  tendas.forEach((tenda) => {
    const key = normalizeDimension(tenda.dimensao)
    if (!groups[key]) {
      groups[key] = {
        key,
        label: key === 'outros' ? 'Outros formatos' : `Tendas ${key}`,
        area: computeArea(key),
        items: []
      }
    }
    groups[key].items.push(tenda)
  })

  return Object.values(groups).sort((a, b) => b.area - a.area)
}

const groupedTendas = groupTendasByDimension()

const TendasGrid = ({ hasAnsweredForm }) => {
  const handleAction = (productId) => {
    // Futura integração com back-end
    console.log('Ação do produto:', productId)
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {groupedTendas.map((group, groupIndex) => (
          <AnimateIn key={group.key} animation="fade-in-up" delay={groupIndex * 80}>
            <div className="mb-12">
              <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                {group.label}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {group.items.map((tenda, itemIndex) => (
                  <AnimateIn key={tenda.id} animation="fade-in-up" delay={groupIndex * 80 + itemIndex * 100}>
                    <TendaCard
                      tenda={tenda}
                      hasAnsweredForm={hasAnsweredForm}
                      onAction={handleAction}
                    />
                  </AnimateIn>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

export default TendasGrid
