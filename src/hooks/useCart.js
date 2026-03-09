import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../integrations/supabase/client'
import {
  getCartItems,
  addToCart as localAddToCart,
  updateCartItemQuantity as localUpdateQuantity,
  removeCartItem as localRemoveItem,
  clearCart as localClearCart,
  subscribeCart,
  getEventDate
} from '../utils/cart'

/**
 * useCart — hybrid cart hook
 * Guest users → localStorage (existing behavior)
 * Logged-in users → Supabase cart_items table
 * On login → merges localStorage into DB, then clears local
 */
export const useCart = () => {
  const [items, setItems] = useState(() => getCartItems())
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Listen to auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null
      const prevUser = user

      setUser(newUser)

      // User just logged in → merge local cart into DB
      if (newUser && !prevUser) {
        mergeLocalCartIntoDB(newUser.id)
      }

      // User logged out → revert to localStorage
      if (!newUser && prevUser) {
        setItems(getCartItems())
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null
      setUser(u)
      if (u) {
        fetchCartFromDB(u.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Subscribe to localStorage changes for guests
  useEffect(() => {
    if (user) return // logged-in users don't use localStorage
    return subscribeCart(setItems)
  }, [user])

  const fetchCartFromDB = async (userId) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, equipment_id, quantity, platform, start_date, end_date')
        .eq('user_id', userId)

      if (error) throw error

      // We need to map DB cart_items to the frontend format
      // For now, fetch equipment details for each item
      if (data && data.length > 0) {
        const equipmentIds = data.filter(i => i.equipment_id).map(i => i.equipment_id)

        let equipmentMap = {}
        if (equipmentIds.length > 0) {
          const { data: equipment } = await supabase
            .from('equipment')
            .select('id, name, product_key, daily_price')
            .in('id', equipmentIds)

          if (equipment) {
            equipment.forEach(e => { equipmentMap[e.id] = e })
          }
        }

        const mapped = data.map(ci => {
          const eq = ci.equipment_id ? equipmentMap[ci.equipment_id] : null
          return {
            id: eq?.product_key || ci.equipment_id || ci.id,
            dbId: ci.id,
            equipmentId: ci.equipment_id,
            name: eq?.name || '',
            price: eq ? Number(eq.daily_price) : 0,
            quantity: ci.quantity,
            platform: ci.platform,
            image: ''
          }
        })

        setItems(mapped)
      } else {
        setItems([])
      }
    } catch (err) {
      console.error('Erro ao buscar carrinho do DB:', err)
      // Fallback to localStorage
      setItems(getCartItems())
    } finally {
      setLoading(false)
    }
  }

  const mergeLocalCartIntoDB = async (userId) => {
    const localItems = getCartItems()
    if (localItems.length === 0) {
      // Nothing to merge, just fetch DB cart
      fetchCartFromDB(userId)
      return
    }

    try {
      // Look up equipment by product_key for each local item
      const productKeys = localItems.map(i => i.id)
      const { data: equipment } = await supabase
        .from('equipment')
        .select('id, product_key')
        .in('product_key', productKeys)

      const keyToId = {}
      if (equipment) {
        equipment.forEach(e => { keyToId[e.product_key] = e.id })
      }

      const eventDate = getEventDate() || null

      // Upsert each item
      for (const item of localItems) {
        const equipmentId = keyToId[item.id]
        if (!equipmentId) continue // skip items not in equipment table

        // Check if already exists in DB
        const { data: existing } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('user_id', userId)
          .eq('equipment_id', equipmentId)
          .maybeSingle()

        if (existing) {
          await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + (item.quantity || 1) })
            .eq('id', existing.id)
        } else {
          await supabase
            .from('cart_items')
            .insert({
              user_id: userId,
              equipment_id: equipmentId,
              quantity: item.quantity || 1,
              platform: 'tonho',
              start_date: eventDate,
              end_date: eventDate
            })
        }
      }

      // Clear localStorage after merge
      localClearCart()

      // Fetch fresh cart from DB
      fetchCartFromDB(userId)
    } catch (err) {
      console.error('Erro ao sincronizar carrinho:', err)
      fetchCartFromDB(userId)
    }
  }

  const addItem = useCallback(async (item) => {
    if (!user) {
      const updated = localAddToCart(item)
      setItems(updated)
      return
    }

    try {
      // Lookup equipment_id by product_key
      const { data: eq } = await supabase
        .from('equipment')
        .select('id')
        .eq('product_key', item.id)
        .maybeSingle()

      const equipmentId = eq?.id || null
      const eventDate = getEventDate() || null

      // Check if already in cart
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('equipment_id', equipmentId)
        .maybeSingle()

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + (item.quantity || 1) })
          .eq('id', existing.id)
      } else {
        await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            equipment_id: equipmentId,
            quantity: item.quantity || 1,
            platform: 'tonho',
            start_date: eventDate,
            end_date: eventDate
          })
      }

      fetchCartFromDB(user.id)
    } catch (err) {
      console.error('Erro ao adicionar item:', err)
      // Fallback to local
      const updated = localAddToCart(item)
      setItems(updated)
    }
  }, [user])

  const updateQuantity = useCallback(async (itemId, quantity) => {
    if (!user) {
      const updated = localUpdateQuantity(itemId, quantity)
      setItems(updated)
      return
    }

    try {
      // Find the DB cart item by product_key
      const item = items.find(i => i.id === itemId)
      if (item?.dbId) {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', item.dbId)
      }
      fetchCartFromDB(user.id)
    } catch (err) {
      console.error('Erro ao atualizar quantidade:', err)
    }
  }, [user, items])

  const removeItem = useCallback(async (itemId) => {
    if (!user) {
      const updated = localRemoveItem(itemId)
      setItems(updated)
      return
    }

    try {
      const item = items.find(i => i.id === itemId)
      if (item?.dbId) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('id', item.dbId)
      }
      fetchCartFromDB(user.id)
    } catch (err) {
      console.error('Erro ao remover item:', err)
    }
  }, [user, items])

  const clear = useCallback(async () => {
    if (!user) {
      localClearCart()
      setItems([])
      return
    }

    try {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
      setItems([])
    } catch (err) {
      console.error('Erro ao limpar carrinho:', err)
    }
  }, [user])

  return {
    items,
    loading,
    user,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    refetch: () => user ? fetchCartFromDB(user.id) : setItems(getCartItems())
  }
}
