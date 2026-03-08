import { useState } from 'react'

const ContactSection = () => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = message.trim() || 'Olá, gostaria de tirar uma dúvida sobre eventos.'
    window.open(`https://wa.me/5591989045318?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4 leading-tight">
              Pronto para realizar o seu evento?
            </h2>
            
            <p className="text-[#333333] opacity-80 mb-8">
              Entre em contato agora e receba um orçamento personalizado sem compromisso
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <span className="font-medium text-black">Endereço:</span>
                <p className="text-[#333333] opacity-80 text-sm">....</p>
              </div>
              <div>
                <span className="font-medium text-black">Email de suporte:</span>
                <p className="text-[#333333] opacity-80 text-sm">....</p>
              </div>
              <div>
                <span className="font-medium text-black">WhatsApp:</span>
                <a href="https://wa.me/5591989045318" target="_blank" rel="noopener noreferrer" className="text-[#333333] opacity-80 text-sm block hover:text-[#25D366] transition-colors">(91) 98904-5318</a>
              </div>
            </div>

          </div>

          {/* Right Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl p-8">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <p className="text-[#333333] text-sm mb-2">
                    Escreva sua dúvida sobre o evento e, ao enviar, vamos continuar o atendimento com você pelo WhatsApp.
                  </p>
                  <label className="block text-[#333333] text-sm font-medium mb-2">
                    Qual é a sua dúvida?
                  </label>
                  <textarea 
                    placeholder="Conte pra gente o que você precisa para o seu evento"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F7F7F8] border border-black/10 text-sm placeholder:text-[#333333]/50 focus:outline-none focus:border-[#25D366] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#FF5F1F] text-white font-medium py-3.5 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-[#25D366] transition-colors"
                >
                  Enviar dúvida pelo WhatsApp
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection