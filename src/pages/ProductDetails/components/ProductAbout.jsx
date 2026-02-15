/**
 * ProductAbout - Seção "Sobre este Produto"
 * Texto totalmente editável via props
 */
const ProductAbout = ({ description }) => {
  // Divide o texto em parágrafos para melhor formatação
  const paragraphs = description.split('\n\n').filter(p => p.trim())

  return (
    <section className="bg-white py-12 md:py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
          Sobre este Produto
        </h2>
        
        <div className="space-y-4">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index}
              className="text-[#333333] opacity-80 text-sm md:text-base leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductAbout
