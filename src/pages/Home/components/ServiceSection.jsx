const ServiceSection = () => {
  const products = [
    {
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop',
      title: 'Tenda Cristal 10x10m',
      discount: '20%',
      price: 'R$300,00'
    },
    {
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
      title: 'Pórtico 6m x 4,6m',
      discount: '5%',
      price: 'R$600,00'
    },
    {
      image: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?q=80&w=2070&auto=format&fit=crop',
      title: 'Tenda Pai D\'egua',
      discount: '5%',
      price: 'R$300,00',
      buttonText: 'Ver disponibilidade'
    },
    {
      image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1974&auto=format&fit=crop',
      title: 'Climatizador Joape 110v',
      discount: '12%',
      price: 'R$300,00'
    }
  ]

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-[#F7F7F8] rounded-3xl py-16 px-6 md:px-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-black">
              Veja o que<br />temos
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl overflow-hidden border-2 border-black/10"
              >
                <div className="aspect-[4/3] overflow-hidden">
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
                    <span className="text-[#FF5F1F] font-semibold text-lg">
                      {product.discount}
                    </span>
                    <span className="text-black text-sm font-medium">OFF</span>
                  </div>
                  
                  <p className="text-[#333333] opacity-80 text-sm mb-4">
                    Valor diária: {product.price}
                  </p>
                  
                  <button className="w-full py-2.5 px-4 rounded-full border border-black/40 text-sm font-medium text-[#333333] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    {product.buttonText || 'Saiba mais'}
                    <span className="w-5 h-5 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
