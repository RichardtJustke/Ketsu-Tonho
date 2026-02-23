import { useRef, useState, useEffect } from 'react'

/**
 * Componente que anima os filhos quando entram no viewport.
 * @param {string} animation - 'fade-in-up' | 'fade-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right'
 * @param {number} delay - atraso em ms (para stagger)
 * @param {number} threshold - 0-1, quanto do elemento precisa estar visível (default 0.1)
 * @param {string} className - classes adicionais
 * @param {React.ReactNode} children
 */
export default function AnimateIn({
  animation = 'fade-in-up',
  delay = 0,
  threshold = 0.1,
  className = '',
  children,
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const animationClass = visible ? `animate-${animation}` : 'animate-initial'
  const delayClass = delay >= 100 ? `animate-delay-${Math.min(500, Math.round(delay / 100) * 100)}` : ''
  const style = delay > 500 ? { animationDelay: `${delay}ms` } : undefined

  return (
    <Tag
      ref={ref}
      className={`${animationClass} ${delayClass} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  )
}
