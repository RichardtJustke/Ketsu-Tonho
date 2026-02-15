import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [phase, setPhase] = useState('hidden') // 'hidden' | 'entering' | 'visible' | 'exiting'
  const prevPathRef = useRef(location.pathname)
  const isFirstRender = useRef(true)

  const blindsCount = 5 // Número de barras da persiana

  useEffect(() => {
    // Ignora a primeira renderização
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Detecta mudança de rota
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname
      setIsAnimating(true)
      setPhase('hidden')

      // Pequeno delay para garantir que as barras sejam renderizadas antes de animar
      const startTimeout = setTimeout(() => {
        setPhase('entering')
      }, 30)

      // Após as barras cobrirem a tela, troca o conteúdo
      const enterTimeout = setTimeout(() => {
        window.scrollTo(0, 0)
        setDisplayChildren(children)
        setPhase('exiting')
      }, 450)

      // Após a animação de saída, finaliza
      const exitTimeout = setTimeout(() => {
        setPhase('hidden')
        setIsAnimating(false)
      }, 900)

      return () => {
        clearTimeout(startTimeout)
        clearTimeout(enterTimeout)
        clearTimeout(exitTimeout)
      }
    } else {
      setDisplayChildren(children)
    }
  }, [location.pathname, children])

  const getTransform = () => {
    switch (phase) {
      case 'hidden':
        return 'translateX(-100%)'
      case 'entering':
        return 'translateX(0%)'
      case 'exiting':
        return 'translateX(100%)'
      default:
        return 'translateX(-100%)'
    }
  }

  return (
    <div className="relative">
      {displayChildren}

      {/* Overlay de Persiana */}
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {[...Array(blindsCount)].map((_, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 bg-[#FF5F1F]"
              style={{
                height: `calc(${100 / blindsCount}% + 2px)`,
                top: `${(index * 100) / blindsCount}%`,
                transform: getTransform(),
                transition: phase !== 'hidden' ? 'transform 0.35s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
                transitionDelay: phase === 'entering' 
                  ? `${index * 40}ms` 
                  : phase === 'exiting'
                    ? `${(blindsCount - 1 - index) * 40}ms`
                    : '0ms',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PageTransition
