import { Link } from 'react-router-dom'

/**
 * RelatedProducts - Seção "Veja outros tipos de produtos"
 * Mostra, para cada produto, as outras categorias disponíveis
 */
const RelatedProducts = ({ currentCategory }) => {
  const allCategories = [
    {
      id: 'tendas',
      title: 'Tendas e Estruturas',
      image: 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152433/3A7C7B230F064074BED7-1000w_fhksbr.jpg',
      href: '/tendas'
    },
    {
      id: 'moveis',
      title: 'Mobiliário e Decoração',
      image: 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152429/5E87AE070D5F59B45560-1920w_ut64ts.jpg',
      href: '/moveis'
    },
    {
      id: 'box',
      title: 'Estruturas de grande porte',
      image: 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152426/Tenda_Cristal-2-1920w_wxvz7l.jpg',
      href: '/box'
    },
    {
      id: 'climatizadores',
      title: 'Climatizadores',
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=2070&auto=format&fit=crop',
      href: '/climatizadores'
    }
  ]

  const normalizedCategory = (currentCategory || '').toLowerCase().trim()
  const relatedCategories = allCategories.filter(
    (category) => !normalizedCategory.includes(category.id) && category.id !== normalizedCategory
  )

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
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
