import { useEffect } from 'react'

const WA_LINK = 'https://wa.me/5591989045318?text=Ol%C3%A1%20fiz%20meu%20or%C3%A7amento%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20processo!'

const BudgetSuccessModal = ({ onClose }) => {
    // Fechar com ESC
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center animate-fade-in-up"
                style={{ animation: 'fadeInUp 0.35s ease both' }}
            >
                {/* Ícone de sucesso */}
                <div className="w-20 h-20 rounded-full bg-[#FF5F1F]/10 flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#FF5F1F" fillOpacity="0.12" />
                        <path d="M12 20.5L17.5 26L28 14" stroke="#FF5F1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold text-[#333333] mb-3">
                    Orçamento enviado com sucesso!
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Recebemos seu pedido e nossa equipe já está ciente. Se quiser tirar dúvidas ou acelerar o processo, fale diretamente com a gente pelo WhatsApp.
                </p>

                {/* Botão WhatsApp */}
                <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#25D366] rounded-xl text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors mb-3"
                >
                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.003 2.667C8.639 2.667 2.667 8.638 2.667 16c0 2.35.624 4.613 1.809 6.598L2.667 29.333l6.918-1.776A13.27 13.27 0 0016.003 29.333c7.364 0 13.33-5.97 13.33-13.333 0-7.363-5.966-13.333-13.33-13.333z" fill="white" fillOpacity="0.25" />
                        <path d="M16.003 4C9.373 4 4 9.373 4 16c0 2.195.592 4.35 1.717 6.24L4 28l5.94-1.692A11.95 11.95 0 0016.003 28C22.627 28 28 22.627 28 16S22.627 4 16.003 4zm5.997 16.453c-.254.714-1.47 1.366-2.027 1.422-.503.051-1.133.072-1.83-.115-.422-.115-.963-.27-1.657-.532-2.915-1.127-4.813-4.034-4.96-4.223-.146-.188-1.19-1.584-1.19-3.024 0-1.44.754-2.148 1.022-2.44.267-.29.585-.363.78-.363.195 0 .39.002.56.01.18.008.42-.068.657.502.245.583.83 2.022.903 2.167.073.146.122.317.024.512-.097.195-.146.317-.292.488-.146.17-.307.38-.438.511-.147.145-.3.303-.129.594.17.29.758 1.252 1.628 2.028 1.119.997 2.063 1.305 2.353 1.45.29.146.461.122.632-.073.17-.195.731-.853.927-1.147.195-.293.39-.244.657-.147.268.098 1.706.805 2 .951.292.146.487.22.56.34.073.12.073.683-.18 1.397z" fill="white" />
                    </svg>
                    Falar com a equipe
                </a>

                {/* Botão Fechar */}
                <button
                    onClick={onClose}
                    className="w-full py-3 px-6 rounded-xl border border-gray-200 text-[#333333] font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                    Fechar
                </button>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
      `}</style>
        </div>
    )
}

export default BudgetSuccessModal
