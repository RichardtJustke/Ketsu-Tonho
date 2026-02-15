import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import ProductHero from './components/ProductHero'
import ProductImage from './components/ProductImage'
import ProductAbout from './components/ProductAbout'
import ProductBenefits from './components/ProductBenefits'
import ProductSpecs from './components/ProductSpecs'
import ProductActions from './components/ProductActions'
import RelatedProducts from './components/RelatedProducts'
import ContactSection from './components/ContactSection'
import { getProductById } from '../../data/products'

/**
 * ProductDetails - Página principal de detalhes do produto
 * 
 * Template reutilizável para qualquer produto
 * Controla o estado de formulário respondido
 * Preparado para integração com backend e carrinho
 */
const ProductDetails = () => {
  // Obtém o ID do produto da URL
  const { productId } = useParams()

  /**
   * Estado que controla se o usuário já respondeu o formulário de disponibilidade
   * 
   * Regra crítica:
   * - false: Exibe botão "Ver disponibilidade"
   * - true: Exibe botão "Adicionar ao carrinho"
   * 
   * Futuramente será controlado pelo backend
   */
  const [hasAnsweredForm, setHasAnsweredForm] = useState(false)

  /**
   * Busca o produto pelo ID
   * Se não encontrar, redireciona para a home
   */
  const product = getProductById(productId)

  if (!product) {
    return <Navigate to="/" replace />
  }

  /**
   * Handler para verificar disponibilidade
   * Inicia o fluxo de verificação (não adiciona ao carrinho)
   */
  const handleCheckAvailability = () => {
    // TODO: Implementar modal/formulário de verificação de disponibilidade
    // Por enquanto, simula a transição de estado
    console.log('Verificando disponibilidade para:', product.id)
    
    // Em produção, isso seria chamado após o usuário preencher o formulário
    // setHasAnsweredForm(true)
  }

  /**
   * Handler para adicionar ao carrinho
   * Usa o ID do produto para integração futura
   */
  const handleAddToCart = (id) => {
    // TODO: Implementar lógica de carrinho
    console.log('Adicionando ao carrinho:', id)
  }

  return (
    <main className="min-h-screen">
      {/* 1. Navbar - Exatamente igual às outras páginas */}
      <Navbar />
      
      {/* 2. Hero do Produto - Nome, descrição curta, botão condicional */}
      <ProductHero 
        product={product}
        hasAnsweredForm={hasAnsweredForm}
        onCheckAvailability={handleCheckAvailability}
      />
      
      {/* 3. Imagem Principal do Produto */}
      <ProductImage 
        image={product.image}
        name={product.name}
      />
      
      {/* 4. Seção "Sobre este Produto" */}
      <ProductAbout 
        description={product.fullDescription}
      />
      
      {/* 5. Seção "O que oferecemos" */}
      <ProductBenefits 
        benefits={product.benefits}
      />
      
      {/* 6. Seção "Especificações Técnicas" */}
      <ProductSpecs 
        specs={product.specs}
      />
      
      {/* 7. Área de Ações - Botões Voltar e Ver disponibilidade/Adicionar ao carrinho */}
      <ProductActions 
        productId={product.id}
        hasAnsweredForm={hasAnsweredForm}
        onCheckAvailability={handleCheckAvailability}
        onAddToCart={handleAddToCart}
      />
      
      {/* 8. Seção "Veja outros tipos de produtos" */}
      <RelatedProducts />
      
      {/* 9. Seção de Contato */}
      <ContactSection />
      
      {/* 10. Footer - Mesmo footer do restante do site */}
      <Footer />
    </main>
  )
}

export default ProductDetails
