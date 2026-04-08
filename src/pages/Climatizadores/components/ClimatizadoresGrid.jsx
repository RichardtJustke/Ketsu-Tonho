import { useState, useEffect } from 'react'
import MovelCard from '../../Moveis/components/MovelCard'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useAvailability } from '../../../hooks/useAvailability'
import { getEventDate } from '../../../utils/cart'
import { getHasAnsweredForm } from '../../../utils/answeredForm'
import { supabase } from '@/integrations/supabase/client'

const CATEGORY_ID = 'a1000000-0000-0000-0000-000000000003'

const ClimatizadoresGrid = ({ hasAnsweredForm, onOpenFilterModal }) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {items.map((item, index) => (
            <AnimateIn key={item.id} animation="fade-in-up" delay={index * 50}>
              <MovelCard
                item={{
                  id: item.product_key,
                  nome: item.name,
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
    </section>
  )
}

export default ClimatizadoresGrid
