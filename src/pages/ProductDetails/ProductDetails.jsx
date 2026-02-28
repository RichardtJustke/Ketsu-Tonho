import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import AnimateIn from '../../shared/components/AnimateIn'
import ProductHero from './components/ProductHero'
import ProductImage from './components/ProductImage'
import ProductAbout from './components/ProductAbout'
import ProductBenefits from './components/ProductBenefits'
import ProductSpecs from './components/ProductSpecs'
import ProductActions from './components/ProductActions'
import RelatedProducts from './components/RelatedProducts'
import ContactSection from './components/ContactSection'
import { getProductById } from '../../data/products'
import { useCloudinaryImages } from '../../hooks/useCloudinaryImages'

const ProductDetails = () => {
  const { productId } = useParams()
  const [hasAnsweredForm, setHasAnsweredForm] = useState(false)
  const product = getProductById(productId)
  const { images: cloudImages } = useCloudinaryImages(productId)

  if (!product) {
    return <Navigate to="/" replace />
  }

  const productImages = cloudImages.length > 0 ? cloudImages : (product.image ? [product.image] : [])

  const handleCheckAvailability = () => {
    console.log('Verificando disponibilidade para:', product.id)
  }

  const handleAddToCart = (id) => {
    console.log('Adicionando ao carrinho:', id)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductHero
        product={product}
        hasAnsweredForm={hasAnsweredForm}
        onCheckAvailability={handleCheckAvailability}
      />
      <AnimateIn animation="fade-in-up">
        <ProductImage images={productImages} name={product.name} />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ProductAbout description={product.fullDescription} />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ProductBenefits benefits={product.benefits} />
      </AnimateIn>
      <AnimateIn animation="scale-in">
        <ProductSpecs specs={product.specs} />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ProductActions
          productId={product.id}
          hasAnsweredForm={hasAnsweredForm}
          onCheckAvailability={handleCheckAvailability}
          onAddToCart={handleAddToCart}
        />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <RelatedProducts />
      </AnimateIn>
      <AnimateIn animation="fade-in-up">
        <ContactSection />
      </AnimateIn>
      <Footer />
    </main>
  )
}

export default ProductDetails
