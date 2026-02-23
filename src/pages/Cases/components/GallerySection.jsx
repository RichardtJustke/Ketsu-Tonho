import { useMemo } from 'react'
import AnimateIn from '../../../shared/components/AnimateIn'
import { getCasesImages } from '../../../utils/imagens'

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const defaultImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop', alt: 'Evento', size: 'small' },
  { id: 2, src: 'https://images.unsplash.com/photo-1500916434205-0c77489917b1?q=80&w=2070&auto=format&fit=crop', alt: 'Evento', size: 'medium' },
  { id: 3, src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop', alt: 'Evento', size: 'small' },
]

const GallerySection = () => {
  const casesImages = getCasesImages()

  const galleryImages = useMemo(() => {
    if (casesImages && casesImages.length > 0) {
      const shuffled = shuffleArray(casesImages)
      return shuffled.map((src, index) => ({
        id: index + 1,
        src,
        alt: `Case ${index + 1}`,
      }))
    }
    return defaultImages
  }, [casesImages?.length])

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <AnimateIn key={`${image.id}-${image.src}`} animation="scale-in" delay={index * 80}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden hover-scale">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
