/**
 * ProductBenefits - Seção "O que oferecemos"
 * Lista dinâmica de benefícios renderizada a partir de dados
 */
const ProductBenefits = ({ benefits }) => {
  return (
    <section className="bg-white px-6 pb-12 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
          O que oferecemos
        </h2>
        
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li 
              key={index}
              className="flex items-start gap-3"
            >
              {/* Bullet point */}
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 flex-shrink-0" />
              
              <div>
                <span className="font-medium text-black">
                  {benefit.title}
                </span>
                <span className="text-[#333333] opacity-80">
                  {' – '}{benefit.description}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ProductBenefits
