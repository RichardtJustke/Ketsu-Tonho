import { useState, useEffect } from 'react'
import { supabase } from '../integrations/supabase/client'

/**
 * Hook que retorna disponibilidade de estoque para uma data específica.
 * Chama a função RPC get_available_stock_for_date no Supabase.
 *
 * @param {string|null} eventDate - Data do evento (YYYY-MM-DD) ou null
 * @returns {{ stockMap: Object, isAvailable: Function, getStock: Function, loading: boolean }}
 */
export const useAvailability = (eventDate) => {
  const [stockMap, setStockMap] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!eventDate) {
      setStockMap({})
      return
    }

    let cancelled = false
    setLoading(true)

    supabase
      .rpc('get_available_stock_for_date', { target_date: eventDate })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.error('Erro ao buscar disponibilidade:', error)
          setStockMap({})
        } else {
          const map = {}
          ;(data || []).forEach((row) => {
            map[row.product_key] = row.available
          })
          setStockMap(map)
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [eventDate])

  const isAvailable = (productKey) => {
    if (!eventDate) return true
    const stock = stockMap[productKey]
    if (stock === undefined) return true // product not in equipment table = always available
    return stock > 0
  }

  const getStock = (productKey) => {
    if (!eventDate) return null
    return stockMap[productKey] ?? null
  }

  return { stockMap, isAvailable, getStock, loading }
}
