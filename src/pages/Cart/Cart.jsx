import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../shared/contexts/AuthContext'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import CartItems from './components/CartItems'
import OrderSummary from './components/OrderSummary'
import SpecialInstructions from './components/SpecialInstructions'
import ContactSection from './components/ContactSection'

const Cart = () => {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  // Dados de exemplo - 3 produtos pré-adicionados
  const [cartItems, setCartItems] = useState([
    {
      id: '85417',
      name: 'Climatizador Joape 110v',
      price: 300.00,
      quantity: 1,
      category: 'Climatizador',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '75644',
      name: 'Pórtico 6m x 4,6m',
      price: 600.00,
      quantity: 2,
      category: 'Estrutura',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '96447',
      name: "Tenda Pai D'agua",
      price: 300.00,
      quantity: 1,
      category: 'Tendas',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ])

  const [specialInstructions, setSpecialInstructions] = useState('')

  // Calcular subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Handlers
  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId))
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
