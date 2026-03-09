import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import Hero from './components/Hero'
import CartItems from './components/CartItems'
import OrderSummary from './components/OrderSummary'
import SpecialInstructions from './components/SpecialInstructions'
import ContactSection from './components/ContactSection'
import BudgetSuccessModal from './components/BudgetSuccessModal'
import PhoneModal from './components/PhoneModal'
import { useCartContext } from '../../shared/contexts/CartContext'
import { getEventDate } from '../../utils/cart'
import { supabase } from '../../integrations/supabase/client'

const Cart = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { items: cartItems, updateQuantity, removeItem, clear } = useCartContext()
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [appliedCouponId, setAppliedCouponId] = useState(null)
  const [appliedCouponCode, setAppliedCouponCode] = useState(null)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [pendingUserId, setPendingUserId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Calcular subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  // Ao retornar do login com ?budget=true, finalizar o pedido automaticamente
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('budget') === 'true') {
      supabase.auth.getUser().then(({ data }) => {
        if (data.user) {
          navigate('/carrinho', { replace: true })
          checkPhoneAndSubmit(data.user.id)
        }
      })
    }
  }, [location.search])

  // Handlers
  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId) => {
    removeItem(itemId)
  }

  const checkPhoneAndSubmit = async (userId) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('phone')
      .eq('id', userId)
      .single()

    if (!profile?.phone || profile.phone.replace(/\D/g, '').length < 10) {
      setPendingUserId(userId)
      setShowPhoneModal(true)
      return
    }

    await submitOrder(userId)
  }

  const submitOrder = async (userId) => {
    if (cartItems.length === 0) return

    setIsSubmitting(true)
    try {
      // Validação de disponibilidade antes de criar o pedido
      const eventDate = getEventDate()
      if (eventDate) {
        const { data: stockData, error: stockError } = await supabase
          .rpc('get_available_stock_for_date', { target_date: eventDate })

        if (!stockError && stockData) {
          const stockMap = {}
          stockData.forEach((row) => { stockMap[row.product_key] = row.available })

          const unavailableItems = cartItems.filter((item) => {
            const available = stockMap[item.id]
            return available !== undefined && available < (item.quantity || 1)
          })

          if (unavailableItems.length > 0) {
            const names = unavailableItems.map((i) => i.name || i.id).join(', ')
            alert(`Os seguintes itens não estão mais disponíveis para a data selecionada: ${names}. Remova-os do carrinho e tente novamente.`)
            setIsSubmitting(false)
            return
          }
        }
      }
      const orderSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
      const finalDiscount = couponDiscount || 0
      const orderTotal = orderSubtotal - finalDiscount
      const evDate = eventDate || getEventDate()
      const notes = specialInstructions || null

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          platform: 'tonho',
          subtotal: orderSubtotal,
          total_amount: Math.max(0, orderTotal),
          delivery_fee: 0,
          notes,
          event_date: evDate || null,
          status: 'pending',
          coupon_code: appliedCouponCode || null,
          discount_amount: finalDiscount
        })
        .select('id')
        .single()

      if (orderError) throw orderError

      // Insert order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_key: item.id,
        name: item.name || item.title || item.id,
        unit_price: item.price || 0,
        quantity: item.quantity || 1,
        image: item.image || null
      }))

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Increment coupon usage
      if (appliedCouponId) {
        const { data: coupon } = await supabase
          .from('coupons')
          .select('current_uses')
          .eq('id', appliedCouponId)
          .single()
        if (coupon) {
          await supabase
            .from('coupons')
            .update({ current_uses: coupon.current_uses + 1 })
            .eq('id', appliedCouponId)
        }
      }

      // Send order received email (fire and forget)
      supabase.functions.invoke('send-order-notification', {
        body: { order_id: order.id, type: 'order_received' }
      }).catch(err => console.warn('Email notification failed:', err))

      // Clear cart and show success
      clear()
      setShowSuccessModal(true)
    } catch (err) {
      console.error('Erro ao criar pedido:', err)
      alert('Erro ao enviar orçamento. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFinalize = async () => {
    if (cartItems.length === 0) return

    const { data } = await supabase.auth.getUser()
    if (!data.user) {
      setShowLoginAlert(true)
      return
    }
    setShowLoginAlert(false)
    await checkPhoneAndSubmit(data.user.id)
  }

  return (
    <main className="min-h-screen bg-white">
      {showSuccessModal && (
        <BudgetSuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
      {showPhoneModal && pendingUserId && (
        <PhoneModal
          userId={pendingUserId}
          onSuccess={() => {
            setShowPhoneModal(false)
            submitOrder(pendingUserId)
          }}
          onClose={() => {
            setShowPhoneModal(false)
            setPendingUserId(null)
          }}
        />
      )}
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
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Continuar comprando
        </Link>
      </div>

      <AnimateIn animation="fade-in-up">
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Cart Items + Instructions */}
            <div className="lg:w-2/3 space-y-6">
              <CartItems
                items={cartItems}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
              <SpecialInstructions
                onInstructionsChange={setSpecialInstructions}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-24">
                <OrderSummary
                  subtotal={subtotal}
                  installationFee={0}
                  discount={0}
                  onFinalize={handleFinalize}
                  onDiscountChange={setCouponDiscount}
                  onCouponIdChange={setAppliedCouponId}
                  onCouponCodeChange={setAppliedCouponCode}
                  isSubmitting={isSubmitting}
                  showLoginAlert={showLoginAlert}
                />
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>

      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>

      <Footer />
    </main>
  )
}

export default Cart
