import { Link } from 'react-router-dom'

/**
 * RelatedProducts - Seção "Veja outros tipos de produtos"
 * Cards fixos conforme Figma - apenas navegação
 */
const RelatedProducts = () => {
  const relatedCategories = [
    {
      id: 'moveis',
      title: 'Mobiliário e Decoração',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/moveis'
    },
    {
      id: 'equipamentos',
      title: 'Equipamentos e Tech',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      href: '/box'
    }
  ]

  return (
    <section className="bg-[#F7F7F8] py-12 md:py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black text-center mb-10">
          Veja outros tipos de produtos
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {relatedCategories.map((category) => (
            <div 
              key={category.id}
              className="flex items-center gap-6 group"
            >
              {/* Imagem */}
              <div className="w-40 h-28 md:w-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Conteúdo */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-black mb-3">
                  {category.title}
                </h3>
                
                <Link 
                  to={category.href}
                  className="inline-flex items-center gap-2 text-sm text-[#333333] hover:text-[#FF5F1F] transition-colors"
                >
                  VEJA AGORA
                  <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts
