import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getLogoImage } from '../../utils/imagens'

const Navbar = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicosOpen, setIsServicosOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const servicosSubmenu = [
    { label: 'Tendas', href: '/tendas' },
    { label: 'Pórticos e Box Truss', href: '/box' },
    { label: 'Móveis e Equipamentos', href: '/moveis' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-[#1a1a1a]/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold flex items-center gap-2">
          {getLogoImage() ? (
            <img src={getLogoImage()} alt="Logo" className="h-8 md:h-9 object-contain" />
          ) : (
            'Logo'
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-white text-sm hover:opacity-80 transition-opacity"
          >
            Home
          </Link>

          {/* Serviços com Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicosOpen(true)}
            onMouseLeave={() => setIsServicosOpen(false)}
          >
            <button 
              className="text-white text-sm hover:opacity-80 transition-opacity flex items-center gap-1"
            >
              Serviços
              <svg 
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${isServicosOpen ? 'rotate-180' : ''}`}
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 mt-2 py-2 bg-white rounded-lg shadow-lg min-w-[200px] transition-all duration-200 ${
                isServicosOpen 
                  ? 'opacity-100 visible translate-y-0' 
                  : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              {servicosSubmenu.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block px-4 py-2.5 text-sm text-[#333333] hover:bg-[#F7F7F8] hover:text-[#FF5F1F] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/cases"
            className="text-white text-sm hover:opacity-80 transition-opacity"
          >
            Cases
          </Link>

          <Link
            to="/sobre"
            className="text-white text-sm hover:opacity-80 transition-opacity"
          >
            Sobre
          </Link>

          <Link
            to="/contato"
            className="text-white text-sm hover:opacity-80 transition-opacity"
          >
            Contato
          </Link>

          {/* Botão Carrinho */}
          <Link 
            to="/carrinho"
            className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link 
            to="/login"
            className="bg-white text-black text-sm font-medium py-2.5 px-5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
          >
            Login
            <span className="w-6 h-6 rounded-full bg-[#FF5F1F] flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>

        <button className="md:hidden text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
