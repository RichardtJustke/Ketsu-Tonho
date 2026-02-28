import { useEffect, useState } from 'react'

/**
 * Hook simples de parallax baseado no scroll da página.
 * Retorna um objeto { style } pronto para ser espalhado em um elemento.
 *
 * @param {number} speed - Intensidade do efeito (valores entre 0 e 0.6 costumam funcionar bem)
 */
export function useParallax(speed = 0.25) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0
        // valor negativo para o fundo se mover mais devagar que o conteúdo
        setOffset(-y * speed)
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return {
    style: {
      transform: `translateY(${offset}px)`,
      willChange: 'transform',
    },
  }
}

