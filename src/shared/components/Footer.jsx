import { getLogoImage } from '../../utils/imagens'

const Footer = () => {
  const logoUrl = getLogoImage()
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Cases', href: '/cases' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
    { label: 'Carrinho', href: '/carrinho' },
    { label: 'Login', href: '/login' },
  ]

  return (
    <footer className="bg-[#F7F7F8] pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-black rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row justify-between gap-12 pb-12 border-b border-white/20">
            <div className="lg:w-1/2">
              <a href="/" className="text-white text-xl font-semibold inline-block mb-6">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="h-8 object-contain" />
                ) : (
                  'Logo'
                )}
              </a>
              <p className="text-[#F7F7F8] opacity-70 text-sm leading-relaxed max-w-md">
                Há mais de 10 anos realizando eventos com estrutura completa, qualidade e compromisso. Seu evento acontece. A gente cuida do resto.
              </p>
            </div>

            <div className="lg:w-1/2">
              <h4 className="text-white text-lg font-semibold mb-3">
                Alguma duvida?
              </h4>
              <p className="text-[#F7F7F8] opacity-70 text-sm mb-6">
                Entre em contato agora e receba um orçamento personalizado sem compromisso
              </p>
              <button className="bg-white text-black text-sm font-medium py-3 px-6 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
                Entre em contato
                <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white opacity-70 text-sm hover:opacity-100 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-white opacity-70 text-xs text-center">
              © 2025 Tonho Locação. Todos os direitos reservados. CNPJ: XX.XXX.XXX/XXXX-XX
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
