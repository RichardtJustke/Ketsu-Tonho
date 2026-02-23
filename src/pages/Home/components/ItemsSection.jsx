import { Link } from 'react-router-dom'
import AnimateIn from '../../../shared/components/AnimateIn'
import { getProductFirstImage } from '../../../utils/imagens'

const ItemsSection = () => {
  // Busca imagens das pastas locais
  const tendaImage = getProductFirstImage('tenda_9x6_lona_box_struss', 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop')
  const movelImage = getProductFirstImage('climatizador_juapi_110v', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop')
  const boxImage = getProductFirstImage('portico_de_entrada', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2032&auto=format&fit=crop')

  const items = [
    {
      image: tendaImage,
      title: 'Tendas e Estruturas',
      link: '/tendas'
    },
    {
      image: movelImage,
      title: 'Mobiliário e Decoração',
      link: '/moveis'
    },
    {
      image: boxImage,
      title: 'Estruturas de grande porte',
      link: '/box'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            Veja os itens que vão fazer seu evento acontecer
          </h2>
        </div>

        <div className="text-center mb-12">
          <p className="text-[#333333] text-lg max-w-2xl mx-auto">
            Conheça os itens recomendados para cada tipo de evento e monte sua estrutura completa sem complicação
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <AnimateIn key={index} animation="fade-in-up" delay={index * 120}>
              <Link
                to={item.link}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] block hover-scale"
              >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                
                <div className="bg-[#FF5F1F] text-white text-sm font-medium py-2.5 px-5 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity w-fit">
                  Saiba mais
                  <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ItemsSection
