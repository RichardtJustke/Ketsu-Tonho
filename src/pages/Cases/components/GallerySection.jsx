import { useMemo } from 'react'
import AnimateIn from '../../../shared/components/AnimateIn'
import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'

const GallerySection = () => {
  const { images: casesImages } = useCloudinaryImages('cases', { isRawFolder: true })

  const galleryImages = useMemo(() => {
    if (casesImages && casesImages.length > 0) {
      return casesImages.map((src, index) => ({
        id: index + 1,
        src,
        alt: `Case ${index + 1}`,
      }))
    }
    return []
  }, [casesImages])

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
