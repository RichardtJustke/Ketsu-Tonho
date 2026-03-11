const ContactSection = () => {
  const handleClick = () => {
    const text = 'Olá, gostaria de tirar uma dúvida sobre eventos.'
    window.open(`https://wa.me/5591989045318?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden py-16 px-8 md:px-16"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dqvldq2ku/image/upload/v1772152426/Tenda_Cristal-2-1920w_wxvz7l.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 70%'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Tire suas dúvidas pelo WhatsApp
            </h2>

            <p className="text-white/80 mb-8">
              Envie sua mensagem e nossa equipe responde diretamente no seu WhatsApp, sem complicação
            </p>

            <button
              onClick={handleClick}
              className="bg-[#25D366] text-white font-medium py-3.5 px-8 rounded-full flex items-center justify-center gap-2 mx-auto hover:bg-[#1ebe5a] transition-colors shadow-lg"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar dúvida pelo WhatsApp
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection