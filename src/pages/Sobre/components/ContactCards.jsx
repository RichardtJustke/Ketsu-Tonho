import ContactMap from './ContactMap'

const contactCards = [
    {
        title: 'E-mail',
        description: 'Envie sua mensagem e responderemos o mais breve possível.',
        value: 'contato@tonhoeventos.com.br',
        href: 'mailto:contato@tonhoeventos.com.br',
        buttonText: 'Enviar e-mail',
        color: '#FF5F1F',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Instagram',
        description: 'Acompanhe nossos eventos e novidades pelo Instagram.',
        value: '@tonhoeventos',
        href: 'https://www.instagram.com/tonhoeventos/',
        buttonText: 'Seguir no Instagram',
        color: '#E1306C',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        title: 'WhatsApp',
        description: 'Fale diretamente com nossa equipe pelo WhatsApp.',
        value: '(91) 98904-5318',
        href: 'https://wa.me/5591989045318?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20eventos.',
        buttonText: 'Chamar no WhatsApp',
        color: '#25D366',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
    {
        title: 'Endereço',
        description: 'Visite nossa sede em Belém.',
        value: 'Passagem São João, 94 - Guamá, Belém - PA, 66077-075',
        href: 'https://www.google.com/maps/search/Passagem+São+João,+94,+Guamá,+Belém+-+PA,+66077-075',
        buttonText: 'Ver no Google Maps',
        color: '#FF5F1F',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

const ContactCards = () => {
    return (
        <section className="bg-[#F7F7F8] py-20 md:py-28 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-14">
                    <span className="inline-block text-[#FF5F1F] text-sm font-medium tracking-widest uppercase mb-4">
                        Contato & Localização
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-black mb-3">
                        Fale conosco
                    </h2>
                    <p className="text-black/50 max-w-lg mx-auto">
                        Escolha o canal de sua preferência e entre em contato com a nossa equipe.
                    </p>
                </div>

                {/* Two-column layout: cards + map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Contact cards column */}
                    <div className="flex flex-col gap-5">
                        {contactCards.map((card) => (
                            <a
                                key={card.title}
                                href={card.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-5 bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-black/5"
                            >
                                {/* Icon */}
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: `${card.color}12`, color: card.color }}
                                >
                                    {card.icon}
                                </div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base font-semibold text-black mb-0.5">
                                        {card.title}
                                    </h3>
                                    <p className="text-black/40 text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                    <p className="text-black/70 text-sm font-medium mt-1">
                                        {card.value}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div
                                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                                    style={{ backgroundColor: `${card.color}12`, color: card.color }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 8H12M12 8L8.5 4.5M12 8L8.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Map column */}
                    <div className="rounded-2xl overflow-hidden shadow-md border border-black/5 min-h-[350px]">
                        <ContactMap />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCards
