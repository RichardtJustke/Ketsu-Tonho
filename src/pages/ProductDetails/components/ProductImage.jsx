/**
 * ProductImage - Exibe a imagem principal do produto
 * Preparado para troca dinâmica futura
 */
const ProductImage = ({ image, name }) => {
  return (
    <section className="bg-black px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={image} 
            alt={name}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
          
          {/* Gradient overlay sutil para melhor visualização */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default ProductImage
