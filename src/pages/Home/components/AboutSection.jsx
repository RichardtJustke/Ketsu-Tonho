import { useCloudinaryImages } from '../../../hooks/useCloudinaryImages'

const AboutSection = () => {
  const { images: tenda5x5Images } = useCloudinaryImages('tenda_branca_5x5', { isRawFolder: true })
  const aboutImage = tenda5x5Images.find(url => url.includes('IMG-20231030-WA0059')) || tenda5x5Images[0] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop'

  return (
    <section className="bg-[#F7F7F8] py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={aboutImage}
                alt="Tudo o que você precisa para realizar o seu evento"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 bg-white rounded-3xl p-8 md:p-10 lg:p-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-black mb-6 leading-tight">
              Tudo o que você precisa para realizar o seu evento
            </h2>

            <div className="space-y-4 text-[#333333] opacity-80 mb-8">
              <p>
                Desde a estrutura até os últimos detalhes, a Tonho oferece soluções completas com qualidade, pontualidade e atendimento personalizado.
              </p>
              <p>
                Somos especialistas em transformar sua ideia em realidade. Com mais de 10 anos de experiência no mercado de eventos, oferecemos um portfólio completo de produtos e serviços que garantem o sucesso da sua celebração — seja uma festa íntima ou um grande evento corporativo.
              </p>
            </div>

            <button className="bg-[#FF5F1F] text-white text-sm font-medium py-3 px-6 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity">
              Saiba mais
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="#FF5F1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
