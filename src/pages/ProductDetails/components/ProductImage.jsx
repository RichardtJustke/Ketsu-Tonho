import { useState } from 'react'

/**
 * ProductImage - Exibe imagens do produto (pasta correspondente ao ID).
 * Uma imagem: exibição única. Mais de uma: carrossel.
 * Nunca carrossel com uma única imagem.
 */
const ProductImage = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const isCarousel = images.length > 1

  return (
    <section className="bg-black px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={name}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />

          {isCarousel && (
            <>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Anterior"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Próximo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

export default ProductImage
