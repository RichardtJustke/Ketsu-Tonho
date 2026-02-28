import MovelCard from './MovelCard'

const moveis = [
  { id: "climatizador_guaruja", nome: "Climatizador Guarujá", valor: 250 },
  { id: "climatizador_juapi_110v", nome: "Climatizador Juapi 110V", valor: 300 },
  { id: "clima_brisa_br30", nome: "Clima Brisa BR30", valor: 400 },
  { id: "clima_brisa_i20", nome: "Clima Brisa Portátil I20", valor: 300 },
  { id: "tv_55_suporte", nome: "TV 55\" com suporte", valor: 150 },
  { id: "notebook", nome: "Notebook", valor: 100 },
  { id: "impressora", nome: "Impressora", valor: 90 },
  { id: "microfone_sem_fio", nome: "Microfone sem fio", valor: 80 },
  { id: "kit_microfone_sem_fio", nome: "Kit microfone sem fio", valor: 50 },
  { id: "caixa_som", nome: "Caixa de som", valor: 150 },
  { id: "caixa_som_vertical", nome: "Caixa de som vertical integrada", valor: 300 },
  { id: "fogao_industrial", nome: "Fogão industrial", valor: 80 },
  { id: "frigobar_90l", nome: "Frigobar 90L", valor: 150 },
  { id: "cafeteira_dolce_gusto", nome: "Cafeteira Dolce Gusto", valor: 50 },
  { id: "bebedouro", nome: "Bebedouro", valor: 90 },
  { id: "caixa_sorteio_acrilico", nome: "Caixa de sorteio em acrílico", valor: 15 },
  { id: "cadeira_unidade", nome: "Cadeira (unidade)", valor: 3 },
  { id: "mesa_unidade", nome: "Mesa (unidade)", valor: 5 },
  { id: "jogo_4_cadeiras", nome: "Jogo com 4 cadeiras", valor: 10 },
  { id: "mesa_pranchao_evento", nome: "Mesa pranchão de evento", valor: 15 },
  { id: "mesa_dobravel_portatil", nome: "Mesa dobrável portátil", valor: 25 },
  { id: "mesa_bistro", nome: "Mesa bistrô", valor: 50 },
  { id: "mesa_reuniao", nome: "Mesa de reunião", valor: 100 },
  { id: "mesa_redonda_tramontina", nome: "Mesa redonda Tramontina", valor: 50 },
  { id: "vaso_decorativo", nome: "Vaso decorativo", valor: 50 },
  { id: "banqueta_alta", nome: "Banqueta alta", valor: 35 },
  { id: "cadeira_escritorio", nome: "Cadeira de escritório", valor: 10 },
  { id: "balcao_atendimento", nome: "Balcão de atendimento", valor: 100 },
  { id: "poltrona", nome: "Poltrona", valor: 130 },
  { id: "puff", nome: "Puff", valor: 10 },
  { id: "mesa_decorativa_unidade", nome: "Mesa decorativa (unidade)", valor: 30 },
  { id: "mesa_decorativa_conjunto", nome: "Conjunto de mesas decorativas (3)", valor: 70 },
  { id: "caixa_termica_360l", nome: "Caixa térmica 360L", valor: 150 },
  { id: "refletor_led_100w", nome: "Refletor LED 100W", valor: 25 },
  { id: "lixeira_100l_pedal", nome: "Lixeira 100L com pedal", valor: 40 },
  { id: "microondas", nome: "Micro-ondas", valor: 60 },
  { id: "lixeira_escritorio", nome: "Lixeira de escritório", valor: 5 },
  { id: "kit_cones_marcacao", nome: "Kit de cones de marcação", valor: 18 }
]

const MoveisGrid = ({ hasAnsweredForm }) => {
  const handleAction = (productId) => {
    // Futura integração com back-end
    // Envia apenas o ID do produto
    console.log('Ação do produto:', productId)
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid de Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {moveis.map((item) => (
            <MovelCard 
              key={item.id} 
              item={item} 
              hasAnsweredForm={hasAnsweredForm}
              onAction={handleAction}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default MoveisGrid
