const CART_KEY = 'ketsu_cart_items'

const readCart = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CART_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Erro ao ler carrinho:', error)
    return []
  }
}

const writeCart = (items) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { items } }))
  } catch (error) {
    console.error('Erro ao salvar carrinho:', error)
  }
}

export const getCartItems = () => readCart()

export const subscribeCart = (callback) => {
  if (typeof window === 'undefined') return () => {}

  const handleCustom = (event) => {
    const items = event?.detail?.items || readCart()
    callback(items)
  }

  const handleStorage = (event) => {
    if (event.key === CART_KEY) {
      callback(readCart())
    }
  }

  window.addEventListener('cartUpdated', handleCustom)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener('cartUpdated', handleCustom)
    window.removeEventListener('storage', handleStorage)
  }
}

export const addToCart = (item) => {
  const items = readCart()
  const quantityToAdd = Number.isFinite(item?.quantity) ? item.quantity : 1
  const existing = items.find((entry) => entry.id === item.id)

  if (existing) {
    existing.quantity += quantityToAdd
  } else {
    items.push({
      ...item,
      quantity: quantityToAdd
    })
  }

  writeCart(items)
  return items
}

export const updateCartItemQuantity = (itemId, quantity) => {
  const items = readCart().map((entry) => (
    entry.id === itemId ? { ...entry, quantity } : entry
  ))
  writeCart(items)
  return items
}

export const removeCartItem = (itemId) => {
  const items = readCart().filter((entry) => entry.id !== itemId)
  writeCart(items)
  return items
}
