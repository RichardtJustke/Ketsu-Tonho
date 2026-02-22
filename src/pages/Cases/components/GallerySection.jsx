import { getCasesImages } from '../../../utils/imagens'

const GallerySection = () => {
  const casesImages = getCasesImages()
  
  // Se houver imagens na pasta cases, usa elas. Senão, usa imagens padrão.
  const defaultImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop',
      alt: 'Instalação de ar condicionado',
      size: 'small'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1500916434205-0c77489917b1?q=80&w=2070&auto=format&fit=crop',
      alt: 'Silhueta ao pôr do sol',
      size: 'medium'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
      alt: 'Arte abstrata',
      size: 'small'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      alt: 'Paisagem montanha',
      size: 'large'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
      alt: 'Lago com montanhas',
      size: 'medium'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=2070&auto=format&fit=crop',
      alt: 'Luz neon abstrata',
      size: 'small'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
      alt: 'Vista aérea natureza',
      size: 'medium'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop',
      alt: 'Raios de sol na floresta',
      size: 'large'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=2070&auto=format&fit=crop',
      alt: 'Arte colorida abstrata',
      size: 'small'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      alt: 'Pessoa sorrindo',
      size: 'medium'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop',
      alt: 'Vista do mar',
      size: 'small'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop',
      alt: 'Montanhas nevadas',
      size: 'medium'
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1974&auto=format&fit=crop',
      alt: 'Paisagem deserto',
      size: 'large'
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop',
      alt: 'Oceano calmo',
      size: 'small'
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop',
      alt: 'Gradiente colorido',
      size: 'medium'
    }
  ]

  // Se existem imagens da pasta cases, converte para o formato esperado
  const galleryImages = casesImages && casesImages.length > 0
    ? casesImages.map((src, index) => ({
        id: index + 1,
        src,
        alt: `Case ${index + 1}`,
        size: index % 3 === 0 ? 'large' : index % 2 === 0 ? 'medium' : 'small'
      }))
    : defaultImages

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Row 1 - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {galleryImages.slice(0, 3).map((image) => (
            <div 
              key={image.id} 
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {galleryImages.slice(3, 5).map((image) => (
            <div 
              key={image.id} 
              className="aspect-[16/10] rounded-2xl overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Row 3 - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {galleryImages.slice(5, 8).map((image) => (
            <div 
              key={image.id} 
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Row 4 - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {galleryImages.slice(8, 10).map((image) => (
            <div 
              key={image.id} 
              className="aspect-[16/10] rounded-2xl overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Row 5 - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.slice(10, 13).map((image) => (
            <div 
              key={image.id} 
              className="aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GallerySection
