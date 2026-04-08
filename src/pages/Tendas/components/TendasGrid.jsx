import { useState, useEffect } from 'react'
import TendaCard from './TendaCard'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useAvailability } from '../../../hooks/useAvailability'
import { getEventDate } from '../../../utils/cart'
import { getHasAnsweredForm } from '../../../utils/answeredForm'
import { supabase } from '@/integrations/supabase/client'

const CATEGORY_ID = 'a1000000-0000-0000-0000-000000000001'

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
  return Number(match[1]) * Number(match[2])
}

const groupByDimension = (items) => {
  const groups = {}
  items.forEach((item) => {
    const key = normalizeDimension(item.dimension)
    if (!groups[key]) {
      groups[key] = {
        key,
        label: key === 'outros' ? 'Outros formatos' : `Tendas ${key}`,
        area: computeArea(key),
        items: []
      }
    }
    groups[key].items.push(item)
  })
  return Object.values(groups).sort((a, b) => b.area - a.area)
}

const TendasGrid = ({ hasAnsweredForm, onOpenFilterModal }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const eventDate = getHasAnsweredForm() ? getEventDate() : null
  const { isAvailable, getStock } = useAvailability(eventDate)

  useEffect(() => {
    supabase
      .from('equipment')
      .select('*, equipment_images(*)')
      .eq('category_id', CATEGORY_ID)
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        setItems(data || [])
        setLoading(false)
      })
  }, [])

  const handleAction = () => {
    onOpenFilterModal?.()
  }

  const grouped = groupByDimension(items)

  if (loading) {
    return (
      <section className="bg-white py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">Carregando...</div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {grouped.map((group, groupIndex) => (
          <div key={group.key} className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
              {group.label}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {group.items.map((item, itemIndex) => (
                <AnimateIn key={item.id} animation="fade-in-up" delay={groupIndex * 80 + itemIndex * 100}>
                  <TendaCard
                    tenda={{
                      id: item.product_key,
                      nome: item.name,
                      dimensao: item.dimension || '-',
                      valor: Number(item.daily_price),
                      dbImage: item.equipment_images?.find(img => img.is_primary)?.image_url
                    }}
                    hasAnsweredForm={hasAnsweredForm}
                    onAction={handleAction}
                    availableStock={getStock(item.product_key)}
                    isItemAvailable={item.stock_total > 0 && isAvailable(item.product_key)}
                  />
                </AnimateIn>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TendasGrid
