import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import CartItems from './components/CartItems'
import OrderSummary from './components/OrderSummary'
import SpecialInstructions from './components/SpecialInstructions'
import ContactSection from './components/ContactSection'
import { getCartItems, updateCartItemQuantity, removeCartItem } from '../../utils/cart'

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => getCartItems())

  const [specialInstructions, setSpecialInstructions] = useState('')

  // Calcular subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Handlers
  const handleQuantityChange = (itemId, newQuantity) => {
    const updated = updateCartItemQuantity(itemId, newQuantity)
    setCartItems(updated)
  }

  const handleRemoveItem = (itemId) => {
    const updated = removeCartItem(itemId)
    setCartItems(updated)
  }

  const handleFinalize = () => {
    // TODO: Implementar lógica de finalização
    console.log('Finalizar pedido:', {
      items: cartItems,
      subtotal,
      specialInstructions
    })
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link 
          to="/tendas" 
          className="inline-flex items-center gap-2 text-[#333333] hover:text-[#FF5F1F] transition-colors text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Continuar comprando
        </Link>
      </div>

      <AnimateIn animation="fade-in-up">
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items + Instructions */}
          <div className="lg:w-2/3 space-y-6">
            {/* Cart Items */}
            <CartItems 
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />

            {/* Special Instructions */}
            <SpecialInstructions 
              onInstructionsChange={setSpecialInstructions}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <OrderSummary 
                subtotal={subtotal}
                installationFee={300}
                discount={0}
                onFinalize={handleFinalize}
              />
            </div>
          </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default Cart
