import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import EventFilterModal from '../../shared/components/EventFilterModal'
import ProductHero from './components/ProductHero'
import ProductImage from './components/ProductImage'
import ProductAbout from './components/ProductAbout'
import ProductBenefits from './components/ProductBenefits'
import ProductSpecs from './components/ProductSpecs'
import ProductActions from './components/ProductActions'
import RelatedProducts from './components/RelatedProducts'
import ContactSection from './components/ContactSection'
import { useCloudinaryImages } from '../../hooks/useCloudinaryImages'
import { getHasAnsweredForm, subscribeAnsweredForm } from '../../utils/answeredForm'
import { useCartContext } from '../../shared/contexts/CartContext'
import { getEventDate } from '../../utils/cart'
import { useAvailability } from '../../hooks/useAvailability'
import { supabase } from '@/integrations/supabase/client'

const ProductDetails = () => {
  const { productId } = useParams()
  const [hasAnsweredForm, setHasAnsweredForm] = useState(getHasAnsweredForm)
  const [dbProduct, setDbProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const { images: cloudImages } = useCloudinaryImages(productId)
  const { addItem } = useCartContext()

  const eventDate = hasAnsweredForm ? getEventDate() : null
  const { isAvailable } = useAvailability(eventDate)
  const itemAvailable = isAvailable(productId)

  useEffect(() => subscribeAnsweredForm(setHasAnsweredForm), [])

  useEffect(() => {
    supabase
      .from('equipment')
      .select('*, equipment_images(*), equipment_categories(name)')
      .eq('product_key', productId)
      .maybeSingle()
      .then(({ data }) => {
        setDbProduct(data)
        setLoading(false)
      })
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-40 text-muted-foreground">Carregando...</div>
        <Footer />
      </main>
    )
  }

  if (!dbProduct) {
    return <Navigate to="/" replace />
  }

  // Build product from DB data
  const specs = dbProduct.specs || {}
  if (!specs['Valor'] && dbProduct.daily_price > 0) {
    specs['Valor'] = `R$ ${Number(dbProduct.daily_price).toFixed(2).replace('.', ',')}`
  }

  const product = {
    id: dbProduct.product_key || productId,
    name: dbProduct.name,
    shortDescription: dbProduct.short_description || dbProduct.description || '',
    fullDescription: dbProduct.full_description || dbProduct.description || '',
    image: '',
    category: dbProduct.equipment_categories?.name?.toLowerCase() || 'produto',
    benefits: dbProduct.benefits || [],
    specs,
    price: Number(dbProduct.daily_price) || 0,
    dimension: dbProduct.dimension || null
  }

  const dbImages = dbProduct.equipment_images?.sort((a, b) => a.display_order - b.display_order).map(i => i.image_url) || []
  const productImages = dbImages.length > 0
    ? dbImages
    : cloudImages || []

  const handleCheckAvailability = () => {
    setIsFilterModalOpen(true)
  }

  const handleFilterComplete = (filters) => {
    console.log('Filtros do evento:', filters)
    setIsFilterModalOpen(false)
  }

  const handleAddToCart = (id, selectedSize) => {
    if (hasAnsweredForm && !itemAvailable) return
    const sizeLabel = selectedSize ? ` - ${selectedSize}` : ''
    const item = {
      id,
      name: `${product.name}${sizeLabel}`,
      price: product.price || 0,
      category: product.category || 'produto',
      image: productImages[0] || ''
    }
    addItem(item)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Modal de filtro de eventos */}
      <EventFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onComplete={handleFilterComplete}
      />

      <ProductHero
        product={product}
        hasAnsweredForm={hasAnsweredForm}
        onCheckAvailability={handleCheckAvailability}
      />
      <AnimateIn animation="fade-in-up">
        <ProductImage images={productImages} name={product.name} />
      </AnimateIn>
      {product.fullDescription && (
        <AnimateIn animation="fade-in-up">
          <ProductAbout description={product.fullDescription} />
        </AnimateIn>
      )}
      {product.benefits?.length > 0 && (
        <AnimateIn animation="fade-in-up">
          <ProductBenefits benefits={product.benefits} />
        </AnimateIn>
      )}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <AnimateIn animation="scale-in">
          <ProductSpecs specs={product.specs} />
        </AnimateIn>
      )}
      <AnimateIn animation="fade-in-up">
        <ProductActions
          productId={product.id}
          product={product}
          hasAnsweredForm={hasAnsweredForm}
          onCheckAvailability={handleCheckAvailability}
          onAddToCart={handleAddToCart}
          isItemAvailable={itemAvailable}
        />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <RelatedProducts currentCategory={product.category} />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>
      <Footer />
    </main>
  )
}

export default ProductDetails
