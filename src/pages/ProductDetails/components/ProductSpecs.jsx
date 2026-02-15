/**
 * ProductSpecs - Seção "Especificações Técnicas"
 * Estrutura flexível que renderiza apenas os campos existentes
 * Agrupa especificações em categorias quando possível
 */
const ProductSpecs = ({ specs }) => {
  // Organiza as specs em categorias baseado nas chaves
  const categorizeSpecs = (specs) => {
    const categories = {
      'Dimensões': [],
      'Materiais': [],
      'Capacidade': [],
      'Outros': []
    }

    Object.entries(specs).forEach(([key, value]) => {
      const keyLower = key.toLowerCase()
      
      if (keyLower.includes('comprimento') || keyLower.includes('largura') || 
          keyLower.includes('altura') || keyLower.includes('área') || keyLower.includes('metro')) {
        categories['Dimensões'].push({ key, value })
      } else if (keyLower.includes('estrutura') || keyLower.includes('cobertura') || 
                 keyLower.includes('parede') || keyLower.includes('material') || keyLower.includes('lona')) {
        categories['Materiais'].push({ key, value })
      } else if (keyLower.includes('pessoa') || keyLower.includes('capacidade') || keyLower.includes('coquetel')) {
        categories['Capacidade'].push({ key, value })
      } else {
        categories['Outros'].push({ key, value })
      }
    })

    // Remove categorias vazias
    return Object.fromEntries(
      Object.entries(categories).filter(([, items]) => items.length > 0)
    )
  }

  const categorizedSpecs = categorizeSpecs(specs)

  return (
    <section className="bg-white px-6 pb-12 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-8">
          Especificações Técnicas
        </h2>
        
        <div className="space-y-8">
          {Object.entries(categorizedSpecs).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-black mb-4">
                {category}:
              </h3>
              
              <ul className="space-y-2">
                {items.map(({ key, value }, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-sm md:text-base"
                  >
                    {/* Bullet point */}
                    <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
                    
                    <span className="text-[#333333] opacity-80">
                      {key}: {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductSpecs
