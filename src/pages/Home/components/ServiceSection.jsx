import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'
import { supabase } from '@/integrations/supabase/client'

const FEATURED_KEYS = [
  'tenda_cristal_10x10',
  'portico_de_entrada',
  'tenda_pe_dagua',
  'climatizador_juapi_110v'
]

const ServiceSection = () => {
  const [dbProducts, setDbProducts] = useState([])

  const { images: cristalImages } = useCloudinaryImages('tenda_cristal_10x10', { isRawFolder: true })
  const { images: porticoImages } = useCloudinaryImages('portico_de_entrada', { isRawFolder: true })
  const { images: peDaguaImages } = useCloudinaryImages('tenda_pe_dagua', { isRawFolder: true })
  const { images: climaImages } = useCloudinaryImages('climatizador_juapi_110v', { isRawFolder: true })

  const cloudMap = {
    'tenda_cristal_10x10': cristalImages,
    'portico_de_entrada': porticoImages,
    'tenda_pe_dagua': peDaguaImages,
    'climatizador_juapi_110v': climaImages
  }

  useEffect(() => {
    supabase
      .from('equipment')
      .select('product_key, name, daily_price')
      .in('product_key', FEATURED_KEYS)
      .eq('is_active', true)
      .then(({ data }) => setDbProducts(data || []))
  }, [])

  // Static fallback data merged with DB
  const staticDefs = [
    { id: 'tenda_cristal_10x10', title: 'Tenda Cristal 10x10m', discount: '20%', price: 'R$300,00' },
    { id: 'portico_de_entrada', title: 'Pórtico 6m x 4,6m', discount: '5%', price: 'R$600,00' },
    { id: 'tenda_pe_dagua', title: 'Tenda Pai d\'Égua', discount: '5%', price: 'R$300,00', buttonText: 'Ver disponibilidade' },
    { id: 'climatizador_juapi_110v', title: 'Climatizador Joape 110v', discount: '12%', price: 'R$300,00' }
  ]

  const products = staticDefs.map((p) => {
    const db = dbProducts.find(d => d.product_key === p.id)
    const title = db?.name || p.title
    const price = db?.daily_price ? `R$${Number(db.daily_price).toFixed(2).replace('.', ',')}` : p.price
    const imgs = cloudMap[p.id] || []
    const image = imgs.length > 0 ? imgs[0] : 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop'
    return { ...p, title, price, image }
  })

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#F7F7F8] rounded-3xl py-16 px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Veja o que<br />temos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <AnimateIn key={index} animation="scale-in" delay={index * 100}>
                <div className="bg-white rounded-2xl overflow-hidden border-2 border-black/10 hover-lift">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h4 className="text-base font-semibold text-black mb-3">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#FF5F1F] font-semibold text-lg">{product.discount}</span>
                      <span className="text-black text-sm font-medium">OFF</span>
                    </div>
                    <p className="text-[#333333] opacity-80 text-sm mb-4">
                      Valor diária: {product.price}
                    </p>
                    <Link
                      to={`/produto/${product.id}`}
                      className="w-full py-2.5 px-4 rounded-full border border-black/40 text-sm font-medium text-[#333333] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      {product.buttonText || 'Saiba mais'}
                      <span className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
