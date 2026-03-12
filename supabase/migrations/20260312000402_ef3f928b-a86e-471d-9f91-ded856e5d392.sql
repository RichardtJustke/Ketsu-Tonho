-- Step 1: Delete fake test product
DELETE FROM equipment WHERE product_key = 'ketsu_id';

-- Step 2: Update all 57 products with correct data from products.js

UPDATE equipment SET
  name = 'Tenda Remo 5x5m',
  short_description = 'Demonstre sua paixão pelo Leão Azul com a nossa tenda temática oficial do Clube do Remo! Perfeita para eventos esportivos, festas de aniversário, churrascos e muito mais.',
  full_description = 'A Tenda Remo é a escolha perfeita para quem quer celebrar o amor pelo Leão Azul com muito estilo e identidade. Com design exclusivo nas cores azul e branco e o escudo oficial do Clube do Remo, ela transforma qualquer evento em uma verdadeira festa azulina.

Ideal para jogos em telão, churrascos entre torcedores, festas de aniversário temáticas, eventos esportivos e confraternizações que merecem aquele toque especial de quem veste a camisa do Remo. A estrutura robusta garante segurança e estabilidade, enquanto a iluminação interna cria uma atmosfera única e inesquecível para seus convidados.

Com espaço amplo e confortável, a tenda acomoda bem seus convidados, oferecendo versatilidade para diferentes layouts e decorações.',
  benefits = '[{"title":"Design Exclusivo Remo","description":"Cobertura nas cores azul e branco com o escudo oficial do Clube do Remo, criando uma atmosfera temática apaixonante para os torcedores do Leão Azul."},{"title":"Iluminação Interna","description":"Inclui iluminação interna para garantir conforto e visibilidade durante eventos noturnos, valorizando ainda mais a decoração do seu evento."},{"title":"Material Resistente","description":"Fabricada com material de alta qualidade que garante durabilidade, segurança e proteção contra sol e chuva em qualquer condição climática."},{"title":"Fácil Montagem","description":"Sistema prático de montagem e desmontagem que permite instalação rápida, sem necessidade de ferramentas ou equipe especializada."},{"title":"Espaço Confortável","description":"Tamanho espaçoso para acomodar confortavelmente seus convidados, ideal para grupos de amigos e família que querem celebrar juntos."}]'::jsonb,
  specs = '{"Comprimento":"5 metros","Largura":"5 metros","Área coberta":"25m²","Estrutura":"Alumínio reforçado","Cobertura":"Lona temática Clube do Remo (azul e branco) — alta resistência","Paredes laterais":"Lona simples (removível)","Iluminação":"Inclusa","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_remo_5x5';

UPDATE equipment SET
  name = 'Tenda Pé d''Água',
  short_description = 'A tenda Pé d''Água é perfeita para eventos que exigem praticidade e versatilidade. Ideal para feiras, festivais gastronômicos, exposições e eventos corporativos.',
  full_description = 'A Tenda Pé d''Água é a solução completa para quem busca praticidade, versatilidade e muito estilo. Com design clean e elegante, ela se adapta com facilidade a diferentes tipos de eventos, combinando com qualquer estilo de decoração e proposta.

Ideal para feiras, festivais gastronômicos, exposições, eventos corporativos e confraternizações, essa tenda oferece um espaço amplo e funcional para acomodar seus convidados e atividades com conforto e segurança.

Com laterais abertas ou fechadas conforme sua necessidade, e disponível em diversos tamanhos, a Tenda Pé d''Água se adapta perfeitamente ao seu evento, garantindo proteção contra sol e chuva sem abrir mão do visual sofisticado.',
  benefits = '[{"title":"Design Clean e Elegante","description":"Visual moderno e versátil que combina com diferentes estilos de eventos, desde feiras e festivais até eventos corporativos e confraternizações."},{"title":"Estrutura Resistente","description":"Estrutura de alta resistência e fácil montagem, garantindo segurança e estabilidade mesmo em condições climáticas adversas."},{"title":"Proteção Total","description":"Cobertura impermeável que protege do sol e da chuva, permitindo que seu evento aconteça com tranquilidade em qualquer clima."},{"title":"Laterais Adaptáveis","description":"Laterais abertas ou fechadas conforme suas necessidades, proporcionando flexibilidade para diferentes configurações de espaço e conforto térmico."},{"title":"Diversos Tamanhos","description":"Disponível em diferentes tamanhos para atender às demandas de eventos de pequeno, médio e grande porte."}]'::jsonb,
  specs = '{"Estrutura":"Alumínio reforçado","Cobertura":"Lona impermeável — alta resistência","Paredes laterais":"Lona simples (removível / adaptável)","Tamanhos disponíveis":"Diversos","Pessoas sentadas":"a confirmar por tamanho","Pessoas em pé (Coquetel)":"a confirmar por tamanho"}'::jsonb
WHERE product_key = 'tenda_pe_dagua';

UPDATE equipment SET
  name = 'Tenda Cristal 10x10m',
  short_description = 'Eleve seu evento com a sofisticação da nossa Tenda Cristal! Com 100m² de área coberta, ela oferece um ambiente elegante e espaçoso para casamentos, formaturas, eventos corporativos e muito mais.',
  full_description = 'A Tenda Cristal é a escolha perfeita para quem busca sofisticação e funcionalidade. Com paredes laterais transparentes, ela integra seu evento à beleza do ambiente externo, criando uma experiência única e memorável para seus convidados.

Ideal para casamentos ao ar livre, eventos corporativos elegantes, formaturas, confraternizações e recepções que merecem um toque especial. A estrutura robusta em alumínio garante segurança e estabilidade, enquanto a cobertura em lona cristal proporciona amplitude e beleza, sem perda de visão.

Com 100m² de área útil, a tenda acomoda confortavelmente seus convidados, oferecendo amplo espaço e versatilidade para diferentes layouts de decoração.',
  benefits = '[{"title":"Visão Panorâmica","description":"Paredes laterais transparentes proporcionam uma vista deslumbrante da paisagem ao redor, integrando o ambiente externo ao seu evento."},{"title":"Estrutura Elegante","description":"Design moderno e clean, com estrutura em alumínio e cobertura em lona cristal transparente, garantindo um visual sofisticado."},{"title":"Iluminação Natural","description":"Aproveite a luz natural durante o dia, criando um ambiente acolhedor e convidativo que valoriza sua decoração."},{"title":"Versatilidade de Decoração","description":"Personalize a decoração de acordo com o tema do seu evento, criando uma atmosfera única e inesquecível para os seus convidados."},{"title":"Conforto e Espaço Amplo","description":"100m² de área coberta para acomodar seus convidados com conforto e segurança, com versatilidade para diferentes layouts."}]'::jsonb,
  specs = '{"Comprimento":"10 metros","Largura":"10 metros","Área coberta":"100m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona cristal transparente — alta resistência","Paredes laterais":"Lona cristal transparente (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_cristal_10x10';

UPDATE equipment SET
  name = 'Tenda Branca 10x10m',
  short_description = 'Ideal para eventos de médio porte, a Tenda Branca 10x10m oferece um espaço versátil e amplo para acomodar seus convidados com conforto e segurança.',
  full_description = 'Ideal para eventos de médio porte, a Tenda Branca 10x10m oferece um espaço versátil e amplo para acomodar seus convidados com conforto e segurança. Seja para casamentos, festas, eventos corporativos ou feiras, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 100m² de área coberta e estrutura fabricada com materiais de alta qualidade, a Tenda Branca é sinônimo de durabilidade, praticidade e sofisticação. Sua montagem e desmontagem rápidas otimizam o tempo de preparação do seu evento, tornando tudo mais ágil e eficiente.

O visual clean e neutro permite total liberdade de decoração, adaptando-se perfeitamente a qualquer tema ou estilo de evento, do mais informal ao mais elegante.',
  benefits = '[{"title":"Área Total de 100m²","description":"Espaço generoso de 100m², ideal para acomodar confortavelmente um grande número de pessoas em diferentes configurações de layout."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição."},{"title":"Cobertura Impermeável","description":"Proteção contra sol e chuva, permitindo que seu evento aconteça em qualquer clima, com total tranquilidade e conforto para os convidados."},{"title":"Montagem e Desmontagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."},{"title":"Visual Clean e Versátil","description":"Design neutro e elegante que se adapta a qualquer tema ou estilo de decoração, do casamento mais sofisticado à festa mais descontraída."}]'::jsonb,
  specs = '{"Comprimento":"10 metros","Largura":"10 metros","Área coberta":"100m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_10x10';

UPDATE equipment SET
  name = 'Tenda Paysandu 5x5m',
  short_description = 'Mostre seu amor pelo Papão com estilo! Tenda temática oficial do Paysandu, perfeita para eventos esportivos, churrascos e festas.',
  full_description = 'A Tenda Paysandu é a escolha ideal para quem quer celebrar o amor pelo Bicola com muito estilo e personalidade. Com design exclusivo nas cores azul e branco e o escudo do Paysandu estampado, ela transforma qualquer evento em uma verdadeira festa do Papão do Norte.

Ideal para jogos em telão, churrascos entre torcedores, festas de aniversário temáticas, eventos esportivos e confraternizações que merecem aquele toque especial de quem veste a camisa. A estrutura robusta garante segurança e estabilidade, enquanto o visual temático cria uma atmosfera única e inesquecível para seus convidados.

Com 25m² de área útil, a tenda acomoda confortavelmente seus convidados, oferecendo amplo espaço e versatilidade para diferentes layouts e decorações.',
  benefits = '[{"title":"Design Exclusivo Paysandu","description":"Cobertura nas cores azul e branco com o escudo oficial do Paysandu, criando uma atmosfera temática e apaixonante para os torcedores."},{"title":"Estrutura Resistente","description":"Material de alta qualidade e estrutura robusta que garante segurança e estabilidade em diferentes condições climáticas."},{"title":"Fácil Montagem","description":"Sistema prático de montagem e desmontagem que permite instalação rápida, sem necessidade de ferramentas especializadas."},{"title":"Espaço Confortável","description":"25m² de área coberta para acomodar seus convidados com conforto, ideal para grupos de amigos e família."},{"title":"Versatilidade de Uso","description":"Perfeita para eventos esportivos, festas de aniversário, churrascos, confraternizações e qualquer celebração que mereça um toque especial."}]'::jsonb,
  specs = '{"Comprimento":"5 metros","Largura":"5 metros","Área coberta":"25m²","Altura lateral":"2,5 metros","Altura central (pico)":"3,5 metros","Estrutura":"Alumínio reforçado","Cobertura":"Lona temática Paysandu (azul e branco) — alta resistência","Paredes laterais":"Lona simples (removível)","Pessoas sentadas":"até 20 pessoas","Pessoas em pé (Coquetel)":"até 30 pessoas"}'::jsonb
WHERE product_key = 'tenda_paissandu_5x5';

UPDATE equipment SET
  name = 'Tenda Branca 9x6m',
  short_description = 'Ideal para eventos de médio porte, a Tenda Branca 9x6m oferece um espaço amplo e versátil para acomodar seus convidados com conforto e proteção.',
  full_description = 'Ideal para eventos de médio porte, a Tenda Branca 9x6m oferece um espaço amplo e versátil para acomodar seus convidados com conforto e proteção. Seja para casamentos, festas, eventos corporativos ou confraternizações, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 54m² de área coberta e estrutura fabricada com materiais de alta qualidade, a Tenda Branca 9x6m é sinônimo de durabilidade, praticidade e sofisticação. Sua montagem e desmontagem rápidas otimizam o tempo de preparação do seu evento, tornando tudo mais ágil e eficiente.

O visual clean e neutro permite total liberdade de decoração, adaptando-se perfeitamente a qualquer tema ou estilo de evento, do mais informal ao mais elegante.',
  benefits = '[{"title":"Área Total de 54m²","description":"Espaço generoso de 54m², ideal para acomodar confortavelmente seus convidados em diferentes configurações de layout."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição."},{"title":"Cobertura Impermeável","description":"Proteção contra sol e chuva, permitindo que seu evento aconteça em qualquer clima, com total tranquilidade e conforto para os convidados."},{"title":"Montagem e Desmontagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."},{"title":"Visual Clean e Versátil","description":"Design neutro e elegante que se adapta a qualquer tema ou estilo de decoração, do casamento mais sofisticado à festa mais descontraída."}]'::jsonb,
  specs = '{"Comprimento":"9 metros","Largura":"6 metros","Área coberta":"54m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_9x6';

UPDATE equipment SET
  name = 'Tenda 9x6 em Lona Box Struss',
  short_description = 'Eleve seu evento com a sofisticação da nossa Tenda 9x6 em Lona Box Struss! Com 54m² de área coberta, ela oferece um ambiente moderno e versátil para casamentos, formaturas, eventos corporativos e muito mais.',
  full_description = 'A Tenda 9x6 em Lona Box Struss é a escolha perfeita para quem busca modernidade, robustez e versatilidade em um só produto. Com estrutura em box truss metálico e cobertura em lona de alta durabilidade, ela se destaca pelo design imponente e pela capacidade de se adaptar a diferentes tipos de eventos.

Ideal para casamentos ao ar livre, formaturas, eventos corporativos, shows e festas que merecem um visual diferenciado e profissional. As paredes laterais opcionais proporcionam flexibilidade para integrar o ambiente externo ao seu evento, mantendo uma atmosfera aconchegante.

Com 54m² de área coberta, a tenda oferece amplo espaço para acomodar seus convidados com conforto, permitindo diferentes configurações de layout e decoração para criar uma experiência única e memorável.',
  benefits = '[{"title":"Visão Panorâmica","description":"Paredes laterais opcionais proporcionam flexibilidade para integrar o ambiente externo ao seu evento, mantendo uma atmosfera aconchegante e sofisticada."},{"title":"Estrutura Resistente","description":"Design robusto e clean, com estrutura em box truss metálico e cobertura em lona de alta durabilidade, ideal para diferentes estilos de eventos."},{"title":"Versatilidade","description":"Personalize a decoração e o layout de acordo com o tema do seu evento, criando uma experiência única e memorável para seus convidados."},{"title":"Custo-Benefício","description":"Alugue a Tenda 9x6 por apenas uma fração do custo de compra, com todo o suporte de montagem e desmontagem inclusos."},{"title":"Espaço Amplo","description":"54m² de área coberta para acomodar seus convidados com conforto, com versatilidade para diferentes configurações de layout e decoração."}]'::jsonb,
  specs = '{"Comprimento":"9 metros","Largura":"6 metros","Área coberta":"54m²","Estrutura":"Box truss metálico","Cobertura":"Lona de alta durabilidade","Paredes laterais":"Opcionais (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_9x6_lona_box_struss';

UPDATE equipment SET
  name = 'Tenda Branca 8x8m',
  short_description = 'Alugue uma tenda branca de 8x8 metros perfeita para o seu evento! Elegante e versátil, ideal para casamentos, festas, eventos corporativos e muito mais.',
  full_description = 'A Tenda Branca 8x8m é a solução elegante e versátil para quem busca um espaço amplo e protegido para seus convidados. Com estrutura resistente e cobertura branca de alta qualidade, ela oferece um ambiente sofisticado e funcional para os mais variados tipos de eventos ao ar livre.

Seja para casamentos, festas de aniversário, eventos corporativos, confraternizações ou qualquer celebração especial, essa tenda garante proteção contra sol e chuva sem abrir mão do visual clean e elegante que valoriza qualquer decoração.

Com 64m² de área coberta e montagem prática e rápida, a Tenda Branca 8x8m é a escolha certa para quem quer praticidade e sofisticação em um só produto.',
  benefits = '[{"title":"Dimensões Ideais","description":"8m x 8m de espaço generoso, oferecendo 64m² de área coberta para acomodar seus convidados com conforto em diferentes configurações de layout."},{"title":"Estrutura Resistente","description":"Estrutura resistente com cobertura branca de alta qualidade, garantindo durabilidade, segurança e proteção em qualquer condição climática."},{"title":"Ideal para Todo Tipo de Evento","description":"Perfeita para eventos ao ar livre de todos os tipos, desde casamentos e festas até eventos corporativos e confraternizações."},{"title":"Fácil Montagem","description":"Sistema prático de montagem e desmontagem que agiliza a preparação e o encerramento do seu evento com facilidade e eficiência."},{"title":"Ambiente Elegante","description":"Visual clean e neutro que combina com qualquer estilo de decoração, criando um ambiente elegante e convidativo para seus convidados."}]'::jsonb,
  specs = '{"Comprimento":"8 metros","Largura":"8 metros","Área coberta":"64m²","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta qualidade","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_8x8';

UPDATE equipment SET
  name = 'Tenda Cristal 6x6m',
  short_description = 'Encante seus convidados com a elegância e sofisticação da nossa Tenda Cristal 6x6m! Com 36m² de área coberta, ela oferece um ambiente charmoso e aconchegante para eventos menores.',
  full_description = 'A Tenda Cristal 6x6m é a escolha ideal para quem busca elegância e sofisticação em eventos mais intimistas. Com paredes laterais transparentes, ela integra o ambiente externo ao seu evento, criando uma atmosfera mais leve, arejada e visualmente deslumbrante para seus convidados.

Perfeita para mini casamentos, aniversários, reuniões corporativas e confraternizações que merecem um toque especial. A estrutura em alumínio garante segurança e estabilidade, enquanto a cobertura em lona cristal transparente proporciona um visual sofisticado e elegante.

Com 36m² de área coberta, a tenda oferece espaço charmoso e aconchegante, ideal para eventos que valorizam a qualidade e o bem-estar dos convidados em um ambiente diferenciado.',
  benefits = '[{"title":"Visão Panorâmica","description":"Paredes laterais transparentes proporcionam uma vista agradável do entorno, integrando o ambiente externo ao seu evento e criando uma atmosfera mais leve e arejada."},{"title":"Estrutura Elegante","description":"Design moderno e clean, com estrutura em alumínio e cobertura em lona cristal transparente, garantindo um visual sofisticado e elegante."},{"title":"Iluminação Natural","description":"Aproveite a luz natural durante o dia, criando um ambiente acolhedor e convidativo que valoriza e potencializa sua decoração."},{"title":"Perfeita para Eventos Intimistas","description":"36m² de espaço charmoso e aconchegante, ideal para mini casamentos, aniversários, reuniões corporativas e confraternizações especiais."},{"title":"Versatilidade de Decoração","description":"Personalize livremente a decoração de acordo com o tema do seu evento, criando uma atmosfera única e inesquecível para seus convidados."}]'::jsonb,
  specs = '{"Comprimento":"6 metros","Largura":"6 metros","Área coberta":"36m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona cristal transparente — alta resistência","Paredes laterais":"Lona cristal transparente (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_cristal_6x6';

UPDATE equipment SET
  name = 'Tenda Branca 6x6m',
  short_description = 'Ideal para eventos menores e intimistas, a Tenda Branca 6x6m oferece um espaço aconchegante e versátil para acomodar seus convidados com conforto e proteção.',
  full_description = 'Ideal para eventos menores e intimistas, a Tenda Branca 6x6m oferece um espaço aconchegante e versátil para acomodar seus convidados com conforto e proteção. Seja para um casamento ao ar livre, um aniversário em família, uma reunião de amigos ou um pequeno evento corporativo, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 36m² de área coberta e estrutura fabricada com materiais de alta qualidade, a Tenda Branca 6x6m une praticidade e sofisticação. Sua cobertura impermeável permite que seu evento aconteça com tranquilidade em qualquer clima, enquanto o visual neutro e elegante se adapta perfeitamente a qualquer estilo de decoração.

A montagem e desmontagem rápidas otimizam o tempo de preparação, tornando tudo mais ágil, eficiente e sem preocupações para você e sua equipe.',
  benefits = '[{"title":"Área Total de 36m²","description":"Espaço ideal de 36m² para acomodar um número reduzido de pessoas com conforto, perfeito para eventos menores e mais intimistas."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Impermeável","description":"Proteção eficiente contra sol e chuva, permitindo que seu evento aconteça com total tranquilidade e conforto para os convidados."},{"title":"Montagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."},{"title":"Visual Clean e Versátil","description":"Design neutro e elegante que se adapta a qualquer tema ou estilo de decoração, do churrasco em família ao evento corporativo."}]'::jsonb,
  specs = '{"Comprimento":"6 metros","Largura":"6 metros","Área coberta":"36m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_6x6';

UPDATE equipment SET
  name = 'Tenda Cristal 5x5m',
  short_description = 'Crie um ambiente mágico e inesquecível para seu evento com a nossa Tenda Cristal 5x5m! Ideal para mini weddings, festas de aniversário, batizados e eventos corporativos intimistas.',
  full_description = 'A Tenda Cristal 5x5m é a escolha perfeita para criar um ambiente mágico e inesquecível em eventos intimistas. Com paredes laterais transparentes, ela proporciona uma vista deslumbrante da paisagem ao redor, integrando o ambiente externo ao seu evento e criando uma atmosfera mais leve e arejada.

Ideal para mini weddings, festas de aniversário, batizados e eventos corporativos intimistas que merecem um toque especial. A estrutura em alumínio garante segurança e estabilidade, enquanto a cobertura em lona cristal transparente proporciona um visual sofisticado e elegante que encanta os convidados.

Com espaço charmoso e aconchegante para até 25 pessoas, a Tenda Cristal 5x5m oferece o ambiente perfeito para celebrações especiais que valorizam a qualidade, o conforto e a beleza.',
  benefits = '[{"title":"Visão Panorâmica","description":"Paredes laterais transparentes proporcionam uma vista deslumbrante da paisagem ao redor, integrando o ambiente externo ao seu evento e criando uma atmosfera mais leve e arejada."},{"title":"Estrutura Elegante","description":"Design moderno e clean, com estrutura em alumínio e cobertura em lona cristal transparente, garantindo um visual sofisticado e elegante."},{"title":"Iluminação Natural","description":"Aproveite a luz natural durante o dia, criando um ambiente acolhedor e convidativo que valoriza e potencializa qualquer decoração."},{"title":"Capacidade para até 25 Pessoas","description":"Espaço charmoso e aconchegante dimensionado para até 25 pessoas, perfeito para mini weddings, batizados e celebrações intimistas."},{"title":"Versatilidade de Decoração","description":"Personalize livremente a decoração de acordo com o tema do seu evento, criando uma atmosfera única e inesquecível para seus convidados."}]'::jsonb,
  specs = '{"Comprimento":"5 metros","Largura":"5 metros","Área coberta":"25m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona cristal transparente — alta resistência","Paredes laterais":"Lona cristal transparente (removível)","Pessoas sentadas":"até 25 pessoas","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_cristal_5x5';

UPDATE equipment SET
  name = 'Tenda Branca 5x5m',
  short_description = 'Ideal para eventos menores e intimistas, a Tenda Branca 5x5m oferece um espaço aconchegante e versátil para acomodar seus convidados com conforto e proteção.',
  full_description = 'Ideal para eventos menores e intimistas, a Tenda Branca 5x5m oferece um espaço aconchegante e versátil para acomodar seus convidados com conforto e proteção. Seja para um churrasco em família, uma reunião de amigos, um pequeno evento corporativo ou uma festa de aniversário, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 25m² de área coberta e estrutura fabricada com materiais de alta qualidade, a Tenda Branca 5x5m une praticidade e sofisticação no tamanho certo para eventos mais intimistas. Sua cobertura impermeável garante proteção total em qualquer clima, enquanto o design neutro se adapta perfeitamente a qualquer decoração.

A montagem e desmontagem rápidas otimizam o tempo de preparação, tornando tudo mais ágil e sem preocupações para que você possa focar no que realmente importa: curtir o seu evento.',
  benefits = '[{"title":"Área Total de 25m²","description":"Espaço ideal de 25m² para acomodar um número reduzido de pessoas com conforto, perfeito para eventos menores e mais intimistas."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Impermeável","description":"Proteção eficiente contra sol e chuva, permitindo que seu evento aconteça com total tranquilidade e conforto para os convidados."},{"title":"Montagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."},{"title":"Visual Clean e Versátil","description":"Design neutro e elegante que se adapta a qualquer tema ou estilo de decoração, do churrasco em família à festa de aniversário."}]'::jsonb,
  specs = '{"Comprimento":"5 metros","Largura":"5 metros","Área coberta":"25m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_5x5';

UPDATE equipment SET
  name = 'Tenda Cristal 4x4m',
  short_description = 'Ideal para eventos menores e intimistas, a Tenda Cristal 4x4m oferece um espaço aconchegante e elegante para acomodar seus convidados com conforto e proteção.',
  full_description = 'A Tenda Cristal 4x4m é a escolha perfeita para eventos menores e intimistas que merecem um visual sofisticado e moderno. Com estrutura transparente que permite a entrada de luz natural, ela cria um ambiente elegante e acolhedor para os mais variados tipos de celebrações.

Seja para um jantar romântico, um chá de bebê, uma reunião de amigos ou um pequeno evento corporativo, essa tenda garante proteção contra sol e chuva, além de um visual sofisticado e moderno que encanta todos os convidados.

Com 16m² de área coberta, a Tenda Cristal 4x4m oferece o espaço ideal para eventos intimistas, unindo praticidade, elegância e funcionalidade em um produto de alta qualidade.',
  benefits = '[{"title":"Área Total de 16m²","description":"Espaço compacto e elegante de 16m², ideal para acomodar um número reduzido de pessoas com conforto em eventos intimistas."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Transparente","description":"Permite a entrada de luz natural durante o dia, criando um ambiente iluminado e agradável. À noite, a iluminação artificial realça a beleza da tenda."},{"title":"Visual Sofisticado","description":"Design moderno e elegante que valoriza qualquer decoração, perfeito para jantares românticos, chás de bebê e eventos corporativos intimistas."},{"title":"Montagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."}]'::jsonb,
  specs = '{"Comprimento":"4 metros","Largura":"4 metros","Área coberta":"16m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona cristal transparente — alta resistência","Paredes laterais":"Lona cristal transparente (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_cristal_4x4';

UPDATE equipment SET
  name = 'Tenda Branca 4x4m',
  short_description = 'Ideal para eventos ao ar livre, a Tenda Branca 4x4m oferece um espaço compacto e versátil para acomodar seus convidados com conforto e proteção.',
  full_description = 'Ideal para eventos ao ar livre, a Tenda Branca 4x4m oferece um espaço compacto e versátil para acomodar seus convidados com conforto e proteção. Seja para um churrasco em família, uma reunião de amigos, um pequeno evento corporativo ou uma festa de aniversário, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 16m² de área coberta e estrutura fabricada com materiais de alta qualidade, a Tenda Branca 4x4m é a solução prática e sofisticada para quem precisa de um espaço protegido sem abrir mão do estilo. O design neutro e limpo combina com qualquer tipo de decoração.

Sua montagem e desmontagem rápidas tornam a preparação do evento muito mais ágil e sem complicações, para que você possa focar no que realmente importa.',
  benefits = '[{"title":"Área Total de 16m²","description":"Espaço compacto de 16m², ideal para acomodar um número reduzido de pessoas com conforto, perfeito para eventos menores e ao ar livre."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Impermeável","description":"Proteção eficiente contra sol e chuva, permitindo que seu evento aconteça com total tranquilidade e conforto para os convidados."},{"title":"Montagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação e encerramento do seu evento com praticidade e agilidade."},{"title":"Visual Clean e Versátil","description":"Design neutro e elegante que se adapta a qualquer tema ou estilo de decoração, do churrasco em família à festa de aniversário."}]'::jsonb,
  specs = '{"Comprimento":"4 metros","Largura":"4 metros","Área coberta":"16m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_4x4';

UPDATE equipment SET
  name = 'Tenda Branca 3x3m',
  short_description = 'Ideal para eventos ao ar livre, a Tenda Branca 3x3m oferece um espaço compacto e versátil para acomodar seus convidados com conforto e proteção.',
  full_description = 'Ideal para eventos ao ar livre, a Tenda Branca 3x3m oferece um espaço compacto e versátil para acomodar seus convidados com conforto e proteção. Seja para um churrasco em família, uma reunião de amigos, um pequeno evento corporativo ou uma barraquinha em feiras e mercados, essa tenda garante proteção contra sol e chuva, além de um visual clean e elegante.

Com 9m² de área coberta, a Tenda Branca 3x3m é perfeita para acomodar um pequeno grupo de pessoas ou expor produtos em feiras e eventos. Sua estrutura leve e resistente facilita o transporte e a instalação em qualquer local.

A cobertura impermeável garante proteção total em qualquer clima, enquanto a montagem e desmontagem rápidas tornam a sua utilização extremamente prática e eficiente.',
  benefits = '[{"title":"Área Total de 9m²","description":"Espaço compacto de 9m², ideal para acomodar um pequeno grupo de pessoas ou expor produtos em feiras, mercados e eventos ao ar livre."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Impermeável","description":"Proteção eficiente contra sol e chuva, permitindo que seu evento ou exposição aconteça com total tranquilidade em qualquer clima."},{"title":"Montagem e Desmontagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação com praticidade e agilidade, sem necessidade de ferramentas."},{"title":"Multiuso","description":"Versátil para churrascos, reuniões, pequenos eventos corporativos, barraquinhas em feiras e mercados, ou qualquer atividade ao ar livre."}]'::jsonb,
  specs = '{"Comprimento":"3 metros","Largura":"3 metros","Área coberta":"9m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona branca impermeável — alta resistência","Paredes laterais":"Lona branca (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_branca_3x3';

UPDATE equipment SET
  name = 'Tenda Cristal 3x3m',
  short_description = 'Ideal para eventos menores e intimistas, a Tenda Cristal 3x3m oferece um espaço aconchegante e elegante para acomodar seus convidados com conforto e proteção.',
  full_description = 'A Tenda Cristal 3x3m é a escolha perfeita para eventos menores e intimistas que valorizam sofisticação e modernidade. Com cobertura transparente que permite a entrada de luz natural durante o dia e realça a iluminação artificial à noite, ela cria um ambiente único e encantador.

Seja para um jantar romântico, um chá de bebê, uma reunião de amigos ou um pequeno evento corporativo, essa tenda garante proteção contra sol e chuva, além de um visual sofisticado e moderno que transforma qualquer espaço.

Com 9m² de área coberta, a Tenda Cristal 3x3m é compacta, prática e elegante, ideal para quem busca um produto de alta qualidade para pequenas celebrações e eventos especiais.',
  benefits = '[{"title":"Área Total de 9m²","description":"Espaço compacto e elegante de 9m², ideal para acomodar um número reduzido de pessoas com conforto em eventos intimistas e especiais."},{"title":"Estrutura Resistente","description":"Fabricada com materiais de alta qualidade, garantindo durabilidade e segurança para o seu evento em qualquer condição climática."},{"title":"Cobertura Transparente","description":"Permite a entrada de luz natural durante o dia, criando um ambiente iluminado e agradável. À noite, a iluminação artificial realça a beleza da tenda."},{"title":"Montagem e Desmontagem Rápida","description":"Facilidade na montagem e desmontagem, otimizando o tempo de preparação com praticidade e agilidade, sem necessidade de ferramentas especializadas."},{"title":"Visual Sofisticado","description":"Design moderno e elegante que valoriza qualquer decoração, perfeito para jantares românticos, chás de bebê e pequenos eventos corporativos."}]'::jsonb,
  specs = '{"Comprimento":"3 metros","Largura":"3 metros","Área coberta":"9m²","Altura lateral":"a confirmar","Altura central (pico)":"a confirmar","Estrutura":"Alumínio reforçado","Cobertura":"Lona cristal transparente — alta resistência","Paredes laterais":"Lona cristal transparente (removível)","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_cristal_3x3';

UPDATE equipment SET
  name = 'Pórtico de Entrada',
  short_description = 'Transforme a entrada do seu evento em um verdadeiro espetáculo com nosso Pórtico de Entrada em box truss. Com 6 metros de largura por 4,6 metros de altura, essa estrutura imponente cria uma primeira impressão marcante e profissional.',
  full_description = 'Transforme a entrada do seu evento em um verdadeiro espetáculo com nosso Pórtico de Entrada em box truss. Com 6 metros de largura por 4,6 metros de altura, essa estrutura imponente é perfeita para criar uma primeira impressão marcante e profissional.

Personalizável com banners, iluminação e outros elementos visuais, o pórtico não apenas orienta e recebe os convidados, mas também fortalece a identidade do seu evento, destacando patrocinadores e reforçando a comunicação visual da sua marca.

Ideal para campeonatos, feiras, shows, corridas, eventos corporativos e qualquer celebração que mereça uma entrada à altura da sua grandiosidade. Garanta um evento memorável desde a entrada!',
  benefits = '[{"title":"Primeira Impressão Marcante","description":"Estrutura imponente de 6m x 4,6m que transforma a entrada do evento em um espetáculo visual, criando impacto imediato nos convidados."},{"title":"Personalização Total","description":"Adaptável com banners, iluminação e elementos visuais da sua identidade de marca, destacando patrocinadores e reforçando a comunicação visual."},{"title":"Estrutura Box Truss Profissional","description":"Construído em alumínio box truss de alta resistência, garantindo segurança, estabilidade e um visual moderno e profissional."},{"title":"Fortalecimento de Marca","description":"Ideal para destacar patrocinadores e parceiros, reforçando a identidade visual do evento e gerando exposição de marca de alto impacto."},{"title":"Versátil para Grandes Eventos","description":"Perfeito para campeonatos esportivos, feiras, shows, corridas, eventos corporativos e qualquer celebração que mereça uma entrada memorável."}]'::jsonb,
  specs = '{"Largura":"6 metros","Altura":"4,6 metros","Estrutura":"Alumínio Box Truss","Personalização":"Banners, iluminação e elementos visuais","Valor":"R$ 600,00 por diária"}'::jsonb
WHERE product_key = 'portico_de_entrada';

UPDATE equipment SET
  name = 'Tenda Box Truss 9x6',
  short_description = 'Leve sofisticação e estrutura profissional para o seu evento com a Tenda Box Truss 9x6! Ideal para feiras, shows, ativações de marca e celebrações ao ar livre.',
  full_description = 'A Tenda Box Truss 9x6 é a escolha perfeita para quem busca sofisticação, resistência e um visual profissional para o seu evento. Com estrutura robusta em alumínio box truss e cobertura em lona tensionada de alta qualidade, ela garante segurança, estabilidade e um visual moderno que impressiona.

Ideal para feiras, shows, ativações de marca, eventos corporativos e celebrações ao ar livre que exigem uma estrutura à altura da sua proposta. O design modular permite combinações com outras estruturas para ampliar o espaço conforme a necessidade do seu evento.

Com 54m² de área coberta e fácil montagem e desmontagem, a Tenda Box Truss 9x6 transforma qualquer espaço em um ambiente profissional e memorável. Alugue agora e transforme seu evento com estilo e praticidade!',
  benefits = '[{"title":"Estrutura Box Truss Robusta","description":"Estrutura em alumínio box truss de alta resistência que garante segurança, estabilidade e um visual moderno e profissional para o seu evento."},{"title":"Cobertura de Alta Qualidade","description":"Cobertura resistente em lona tensionada de alta qualidade, garantindo proteção contra sol e chuva com excelente acabamento visual."},{"title":"Design Modular","description":"Permite combinações com outras estruturas para ampliar o espaço conforme a necessidade, oferecendo máxima flexibilidade no planejamento do evento."},{"title":"Fácil Montagem","description":"Sistema prático de montagem e desmontagem que agiliza a preparação do evento, sem necessidade de equipamentos especializados."},{"title":"Versátil para Grandes Eventos","description":"Perfeito para feiras, shows, ativações de marca, eventos corporativos e celebrações ao ar livre que exigem estrutura profissional."}]'::jsonb,
  specs = '{"Comprimento":"9 metros","Largura":"6 metros","Área coberta":"54m²","Estrutura":"Alumínio Box Truss","Cobertura":"Lona tensionada de alta qualidade","Montagem":"Modular — combinável com outras estruturas","Pessoas sentadas":"a confirmar","Pessoas em pé (Coquetel)":"a confirmar"}'::jsonb
WHERE product_key = 'tenda_box_truss_9x6';

UPDATE equipment SET
  name = 'Backdrop 3x2',
  short_description = 'Com 3 metros de largura por 2 metros de altura, essa estrutura compacta e impactante é ideal para eventos corporativos, palestras, feiras e congressos.',
  full_description = 'O Backdrop 3x2 é a solução perfeita para quem busca um fundo visual impactante e profissional para o seu evento. Com 3 metros de largura por 2 metros de altura, essa estrutura compacta é ideal para eventos corporativos, palestras, feiras e congressos que exigem um ambiente visualmente coerente e sofisticado.

Com um visual moderno e versátil, o Backdrop serve como painel de fundo para fotos, entrevistas e ativações de marca, além de valorizar os patrocinadores e parceiros do seu evento. Personalize com sua identidade visual e crie um ambiente visualmente coerente, sofisticado e inesquecível!

Perfeito para fotos e mídias sociais, ideal para áreas de recepção, auditórios e espaços de destaque que precisam transmitir credibilidade e profissionalismo desde o primeiro olhar.',
  benefits = '[{"title":"Impacto Visual Imediato","description":"Estrutura de 3m x 2m que cria um fundo impactante e profissional, perfeito para fotos, entrevistas e ativações de marca em eventos."},{"title":"Personalização de Marca","description":"Personalizável com a identidade visual do seu evento, destacando patrocinadores e parceiros em um ambiente visualmente coerente e sofisticado."},{"title":"Perfeito para Fotos e Mídias Sociais","description":"Design pensado para gerar conteúdo de alto impacto visual para fotos e redes sociais, ampliando o alcance e a visibilidade do seu evento."},{"title":"Versátil e Compacto","description":"Ideal para áreas de recepção, auditórios e espaços de destaque, adaptando-se facilmente a diferentes configurações de ambiente."},{"title":"Estrutura Box Truss Profissional","description":"Construído em alumínio box truss, garantindo estabilidade, segurança e um visual moderno que transmite credibilidade e profissionalismo."}]'::jsonb,
  specs = '{"Largura":"3 metros","Altura":"2 metros","Estrutura":"Alumínio Box Truss","Personalização":"Banner com identidade visual do evento","Indicado para":"Fotos, entrevistas, recepção, auditórios, ativações de marca","Valor":"R$ 240,00 por diária"}'::jsonb
WHERE product_key = 'backdrop_3x2';

UPDATE equipment SET
  name = 'Climatizador Guarujá',
  short_description = 'Compacto, leve e fácil de posicionar. Ideal para climatizar ambientes de pequeno e médio porte com eficiência e praticidade.',
  full_description = 'O Climatizador Guarujá é a solução ideal para quem busca conforto térmico em ambientes de pequeno e médio porte. Compacto, leve e fácil de posicionar, ele proporciona uma climatização eficiente e agradável para seus convidados.

Com capacidade de 100 litros e alcance frontal de até 20 metros, o Climatizador Guarujá é perfeito para eventos ao ar livre, festas, feiras, stands e qualquer ambiente que precise de uma temperatura mais agradável.

Econômico e silencioso, ele garante o conforto dos seus convidados sem comprometer a experiência do evento. Alugue agora e transforme o clima do seu evento!',
  benefits = '[{"title":"Compacto e Leve","description":"Fácil de posicionar e transportar, adaptando-se a diferentes configurações de espaço e layout do seu evento."},{"title":"Alcance de 20 Metros","description":"Alcance frontal de até 20 metros, garantindo climatização eficiente para ambientes de pequeno e médio porte."},{"title":"Capacidade 100L","description":"Reservatório de 100 litros que garante autonomia prolongada durante todo o evento."},{"title":"Econômico","description":"Baixo consumo de energia, proporcionando conforto térmico sem elevar os custos do evento."},{"title":"Silencioso","description":"Operação silenciosa que não interfere na comunicação e nas atividades do evento."}]'::jsonb,
  specs = '{"Capacidade":"100 litros","Alcance frontal":"até 20 metros","Tipo":"Climatizador evaporativo portátil","Uso indicado":"Ambientes de pequeno e médio porte","Valor":"R$ 150,00 por diária"}'::jsonb
WHERE product_key = 'climatizador_guaruja';

UPDATE equipment SET
  name = 'Climatizador Go.Ar',
  short_description = 'Potente e versátil, o Climatizador Go.Ar é ideal para climatizar ambientes de médio e grande porte com eficiência e alto alcance.',
  full_description = 'O Climatizador Go.Ar é a solução profissional para eventos que exigem climatização de alto desempenho. Com capacidade de 70 litros e alcance frontal de até 30 metros, ele garante conforto térmico em ambientes de médio e grande porte.

Ideal para eventos ao ar livre, festas, feiras, galpões e qualquer ambiente que precise de climatização potente e eficiente. Seu design robusto e funcional facilita o posicionamento e garante distribuição uniforme do ar.

Econômico e de fácil operação, o Climatizador Go.Ar transforma o clima do seu evento, proporcionando uma experiência agradável para todos os convidados.',
  benefits = '[{"title":"Alto Alcance","description":"Alcance frontal de até 30 metros, climatizando grandes áreas com eficiência e uniformidade."},{"title":"Capacidade 70L","description":"Reservatório de 70 litros para autonomia prolongada durante todo o evento."},{"title":"Design Robusto","description":"Estrutura funcional e resistente, ideal para uso intensivo em eventos de grande porte."},{"title":"Econômico","description":"Baixo consumo de energia com alta eficiência de climatização."},{"title":"Fácil Operação","description":"Controles simples e intuitivos para ajuste rápido da climatização."}]'::jsonb,
  specs = '{"Capacidade":"70 litros","Alcance frontal":"até 30 metros","Tipo":"Climatizador evaporativo","Uso indicado":"Ambientes de médio e grande porte","Valor":"R$ 200,00 por diária"}'::jsonb
WHERE product_key = 'climatizador_goar';

UPDATE equipment SET
  name = 'Climatizador C650',
  short_description = 'O Climatizador C650 é a solução de alto desempenho para grandes eventos. Potente e eficiente, ideal para galpões, tendas e áreas abertas.',
  full_description = 'O Climatizador C650 é a solução de climatização mais potente do nosso catálogo. Com capacidade industrial e alcance superior, ele é ideal para grandes eventos, galpões, tendas de grande porte e áreas abertas que exigem climatização de alto desempenho.

Projetado para atender às demandas de eventos de grande porte, o C650 oferece vazão de ar elevada e distribuição uniforme, garantindo conforto térmico mesmo em ambientes amplos e com grande circulação de pessoas.

Robusto, eficiente e de fácil operação, o Climatizador C650 é a escolha certa para quem não abre mão de qualidade e desempenho na climatização do seu evento.',
  benefits = '[{"title":"Alta Potência","description":"Climatização de alto desempenho para ambientes amplos e eventos de grande porte."},{"title":"Grande Vazão de Ar","description":"Distribuição uniforme e potente do ar para máximo conforto térmico."},{"title":"Ideal para Grandes Espaços","description":"Projetado para galpões, tendas grandes e áreas abertas com alta circulação."},{"title":"Robusto e Durável","description":"Estrutura industrial resistente para uso intensivo em eventos exigentes."},{"title":"Eficiente","description":"Alto desempenho com consumo energético otimizado."}]'::jsonb,
  specs = '{"Tipo":"Climatizador industrial","Uso indicado":"Grandes eventos, galpões, tendas de grande porte","Valor":"R$ 350,00 por diária"}'::jsonb
WHERE product_key = 'climatizador_c650';

UPDATE equipment SET
  name = 'Climatizador Climabrisa Portátil i20',
  short_description = 'O Climatizador Climabrisa Portátil i20 é compacto, eficiente e ideal para ambientes menores. Perfeito para escritórios, stands e salas de reunião.',
  full_description = 'O Climatizador Climabrisa Portátil i20 é a solução compacta e eficiente para climatização de ambientes menores. Com design portátil e moderno, ele é perfeito para escritórios, stands, salas de reunião e espaços que precisam de conforto térmico sem ocupar muito espaço.

Fácil de transportar e posicionar, o i20 oferece climatização silenciosa e eficiente, ideal para eventos corporativos, feiras e qualquer ocasião que precise de um ambiente mais agradável.

Econômico e de fácil operação, ele garante conforto sem comprometer o orçamento do seu evento.',
  benefits = '[{"title":"Portátil e Compacto","description":"Design leve e compacto, fácil de transportar e posicionar em diferentes ambientes."},{"title":"Silencioso","description":"Operação silenciosa ideal para ambientes corporativos e reuniões."},{"title":"Eficiente","description":"Climatização eficiente para ambientes de pequeno porte."},{"title":"Econômico","description":"Baixo consumo de energia com boa eficiência de climatização."},{"title":"Moderno","description":"Design contemporâneo que se integra a qualquer ambiente."}]'::jsonb,
  specs = '{"Tipo":"Climatizador portátil","Modelo":"Climabrisa i20","Uso indicado":"Escritórios, stands, salas de reunião","Valor":"R$ 100,00 por diária"}'::jsonb
WHERE product_key = 'clima_brisa_i20';

UPDATE equipment SET
  name = 'Notebook',
  short_description = 'Notebook para uso em eventos corporativos, palestras, apresentações e atividades que exigem computação portátil.',
  full_description = 'O Notebook é a solução prática para eventos que precisam de computação portátil. Ideal para apresentações, palestras, credenciamento, workshops e qualquer atividade que exija um computador durante o evento.

Com configuração adequada para as principais necessidades de eventos corporativos, ele oferece desempenho confiável e praticidade. Perfeito para uso com projetores, sistemas de credenciamento e apresentações multimídia.

Alugue o Notebook e tenha tecnologia à disposição no seu evento!',
  benefits = '[{"title":"Portátil","description":"Fácil de transportar e posicionar em diferentes pontos do evento."},{"title":"Versátil","description":"Ideal para apresentações, credenciamento, workshops e palestras."},{"title":"Configuração Adequada","description":"Desempenho confiável para as principais necessidades de eventos."},{"title":"Compatível","description":"Funciona com projetores, sistemas de credenciamento e apresentações."},{"title":"Prático","description":"Pronto para uso, sem necessidade de configurações complexas."}]'::jsonb,
  specs = '{"Tipo":"Notebook","Uso indicado":"Apresentações, palestras, credenciamento","Valor":"R$ 80,00 por diária"}'::jsonb
WHERE product_key = 'notebook';

UPDATE equipment SET
  name = 'Impressora',
  short_description = 'Impressora para uso em eventos corporativos, feiras e atividades que necessitam de impressão no local.',
  full_description = 'A Impressora é essencial para eventos que precisam de impressão no local. Ideal para credenciamento, emissão de certificados, impressão de materiais e qualquer atividade que exija documentos impressos durante o evento.

Prática e de fácil operação, ela garante que você tenha capacidade de impressão à disposição sem depender de serviços externos. Perfeita para eventos corporativos, feiras, congressos e workshops.

Alugue a Impressora e tenha autonomia de impressão no seu evento!',
  benefits = '[{"title":"Impressão no Local","description":"Capacidade de impressão durante o evento sem depender de serviços externos."},{"title":"Prática","description":"Fácil de operar e configurar no local do evento."},{"title":"Versátil","description":"Ideal para credenciamento, certificados e materiais impressos."},{"title":"Autônoma","description":"Garante independência para necessidades de impressão."},{"title":"Profissional","description":"Qualidade de impressão adequada para documentos corporativos."}]'::jsonb,
  specs = '{"Tipo":"Impressora","Uso indicado":"Credenciamento, certificados, materiais","Valor":"R$ 80,00 por diária"}'::jsonb
WHERE product_key = 'impressora';

UPDATE equipment SET
  name = 'Microfone sem Fio',
  short_description = 'Microfone sem fio profissional para eventos, palestras, cerimônias e apresentações.',
  full_description = 'O Microfone sem Fio é essencial para eventos que precisam de amplificação de voz com mobilidade. Com tecnologia sem fio, ele permite liberdade de movimento para apresentadores, palestrantes e mestres de cerimônia.

Ideal para palestras, cerimônias, eventos corporativos e qualquer ocasião que precise de comunicação clara e profissional. A qualidade do áudio garante que a mensagem chegue a todos os participantes.

Alugue o Microfone sem Fio e comunique-se com clareza no seu evento!',
  benefits = '[{"title":"Sem Fio","description":"Liberdade de movimento para apresentadores e palestrantes."},{"title":"Qualidade de Áudio","description":"Som claro e nítido para comunicação profissional."},{"title":"Profissional","description":"Ideal para palestras, cerimônias e apresentações."},{"title":"Prático","description":"Fácil de configurar e usar durante o evento."},{"title":"Versátil","description":"Ideal para apresentações, discursos, cerimônias e atividades interativas."}]'::jsonb,
  specs = '{"Tipo":"Microfone sem fio","Uso indicado":"Apresentações, discursos, cerimônias","Valor":"R$ 80,00 por diária"}'::jsonb
WHERE product_key = 'microfone_sem_fio';

UPDATE equipment SET
  name = 'Kit Microfone Sem Fio',
  short_description = 'Kit completo com microfone sem fio para eventos que precisam de amplificação de voz com praticidade.',
  full_description = 'O Kit Microfone Sem Fio é a solução completa para eventos que precisam de amplificação de voz. Com todos os componentes necessários para funcionamento imediato, ele oferece praticidade e qualidade de áudio.

Ideal para eventos menores, reuniões, workshops e ocasiões que precisam de um sistema de som compacto e eficiente. O kit inclui todos os acessórios necessários para instalação e uso durante o evento.

Alugue o Kit Microfone Sem Fio e tenha tudo que precisa para se comunicar com seu público!',
  benefits = '[{"title":"Kit Completo","description":"Todos os componentes necessários para funcionamento imediato."},{"title":"Praticidade","description":"Sistema pronto para uso, sem necessidade de equipamentos adicionais."},{"title":"Compacto","description":"Ideal para eventos menores, reuniões e workshops."},{"title":"Qualidade de Áudio","description":"Som claro e nítido para comunicação eficiente."},{"title":"Fácil Instalação","description":"Montagem rápida e simples para economizar tempo."}]'::jsonb,
  specs = '{"Tipo":"Kit microfone sem fio","Conteúdo":"Microfone + acessórios","Valor":"R$ 50,00 por diária"}'::jsonb
WHERE product_key = 'kit_microfone_sem_fio';

UPDATE equipment SET
  name = 'Caixa de Som',
  short_description = 'Caixa de som com suporte e extensão elétrica inclusos, perfeita para eventos que precisam de amplificação sonora.',
  full_description = 'A Caixa de Som é essencial para eventos que precisam de amplificação sonora de qualidade. Com potência adequada para ambientes de pequeno e médio porte, ela garante que a música e as mensagens cheguem a todos os convidados com clareza.

Acompanha suporte e extensão elétrica para facilitar a instalação e o posicionamento no local do evento. Ideal para festas, eventos corporativos, palestras e qualquer ocasião que precise de som ambiente ou amplificação.

Alugue a Caixa de Som e transforme a experiência sonora do seu evento!',
  benefits = '[{"title":"Suporte Incluso","description":"Acompanha suporte para posicionamento adequado e melhor dispersão do som."},{"title":"Extensão Elétrica Inclusa","description":"Facilita a instalação em diferentes pontos do ambiente."},{"title":"Qualidade de Áudio","description":"Som claro e potente para música ambiente e amplificação de voz."},{"title":"Versátil","description":"Ideal para festas, eventos corporativos, palestras e cerimônias."},{"title":"Fácil Instalação","description":"Montagem rápida e simples, pronta para uso imediato."}]'::jsonb,
  specs = '{"Tipo":"Caixa de som amplificada","Incluso":"Suporte e extensão elétrica","Uso indicado":"Festas, eventos corporativos, palestras","Valor":"R$ 150,00 por diária"}'::jsonb
WHERE product_key = 'caixa_som';

UPDATE equipment SET
  name = 'Caixa de Som Vertical Integrado Boxx',
  short_description = 'Caixa de som vertical Ibanez 600W, potente e versátil, cor preta, bivolt 110V/220V. Ideal para eventos de médio e grande porte.',
  full_description = 'A Caixa de Som Vertical Integrado Boxx é a solução profissional para eventos que exigem alta potência sonora. Com 600W de potência Ibanez, ela garante som de qualidade para eventos de médio e grande porte.

Design vertical elegante em cor preta que se integra perfeitamente a qualquer ambiente. Bivolt (110V/220V) para compatibilidade com diferentes instalações elétricas.

Ideal para festas, shows, eventos corporativos e qualquer ocasião que precise de um sistema de som potente e profissional. Alugue agora e impressione seus convidados com qualidade sonora!',
  benefits = '[{"title":"Alta Potência 600W","description":"Potência Ibanez de 600W para som de qualidade em eventos de médio e grande porte."},{"title":"Design Vertical Elegante","description":"Design moderno em cor preta que se integra perfeitamente a qualquer ambiente."},{"title":"Bivolt 110V/220V","description":"Compatibilidade com diferentes instalações elétricas para maior versatilidade."},{"title":"Qualidade Profissional","description":"Som claro e potente para festas, shows e eventos corporativos."},{"title":"Integrado","description":"Sistema completo e integrado, pronto para uso imediato."}]'::jsonb,
  specs = '{"Potência":"600W Ibanez","Cor":"Preta","Voltagem":"Bivolt 110V/220V","Tipo":"Caixa de som vertical integrada","Valor":"R$ 300,00 por diária"}'::jsonb
WHERE product_key = 'caixa_som_vertical';

UPDATE equipment SET
  name = 'Fogão Industrial Progas',
  short_description = 'Fogão industrial Progas, ideal para preparo de alimentos em grande escala em eventos, festas e buffets.',
  full_description = 'O Fogão Industrial Progas é a solução ideal para eventos que precisam de preparo de alimentos em grande escala. Com queimadores potentes e estrutura robusta, ele garante eficiência e praticidade na cozinha do seu evento.

Perfeito para festas, casamentos, eventos corporativos, buffets e qualquer ocasião que precise de equipamento profissional de cozinha. A marca Progas é sinônimo de qualidade e durabilidade no segmento de fogões industriais.

Alugue o Fogão Industrial e garanta o preparo de alimentos de qualidade para seus convidados!',
  benefits = '[{"title":"Potência Industrial","description":"Queimadores potentes para preparo rápido e eficiente de alimentos em grande escala."},{"title":"Marca Progas","description":"Qualidade e durabilidade reconhecidas no segmento de fogões industriais."},{"title":"Estrutura Robusta","description":"Construção sólida e resistente para uso intensivo em eventos."},{"title":"Versátil","description":"Ideal para festas, casamentos, eventos corporativos e serviços de buffet."},{"title":"Profissional","description":"Equipamento profissional que atende às demandas de cozinhas de eventos."}]'::jsonb,
  specs = '{"Marca":"Progas","Tipo":"Fogão industrial","Uso indicado":"Preparo de alimentos em grande escala","Valor":"R$ 80,00 por diária"}'::jsonb
WHERE product_key = 'fogao_industrial';

UPDATE equipment SET
  name = 'Frigobar 90L',
  short_description = 'Frigobar com capacidade de 90 litros, ideal para armazenar bebidas e alimentos em eventos de pequeno e médio porte.',
  full_description = 'O Frigobar 90L é a solução prática para manter bebidas e alimentos refrigerados durante seu evento. Com capacidade de 90 litros, ele é ideal para eventos de pequeno e médio porte.

Perfeito para festas, eventos corporativos, reuniões e qualquer ocasião que precise de refrigeração para bebidas e alimentos. Compacto e silencioso, ele se adapta facilmente a diferentes ambientes.

Alugue o Frigobar e garanta bebidas geladas e alimentos frescos para seus convidados!',
  benefits = '[{"title":"Capacidade 90L","description":"Espaço adequado para armazenar bebidas e alimentos em eventos de pequeno e médio porte."},{"title":"Compacto","description":"Tamanho ideal que se adapta facilmente a diferentes ambientes."},{"title":"Silencioso","description":"Operação silenciosa que não interfere nas atividades do evento."},{"title":"Eficiente","description":"Refrigeração eficiente para manter bebidas e alimentos na temperatura ideal."},{"title":"Versátil","description":"Ideal para festas, eventos corporativos, reuniões e camarins."}]'::jsonb,
  specs = '{"Capacidade":"90 litros","Tipo":"Frigobar","Uso indicado":"Refrigeração de bebidas e alimentos","Valor":"R$ 150,00 por diária"}'::jsonb
WHERE product_key = 'frigobar_90l';

UPDATE equipment SET
  name = 'Cafeteira Dolce Gusto',
  short_description = 'Cafeteira Dolce Gusto para preparo rápido de café e outras bebidas quentes em eventos corporativos e reuniões.',
  full_description = 'A Cafeteira Dolce Gusto é perfeita para eventos que precisam de café e bebidas quentes de qualidade. Com sistema de cápsulas, ela oferece praticidade e variedade de sabores para seus convidados.

Ideal para eventos corporativos, reuniões, coffee breaks e qualquer ocasião que precise de um café especial. O preparo rápido e a qualidade das bebidas garantem a satisfação dos participantes.

Alugue a Cafeteira Dolce Gusto e ofereça um café especial no seu evento!',
  benefits = '[{"title":"Sistema de Cápsulas","description":"Praticidade e variedade de sabores com o sistema de cápsulas Dolce Gusto."},{"title":"Preparo Rápido","description":"Bebidas prontas em segundos para atender a demanda do evento."},{"title":"Qualidade","description":"Café e bebidas de qualidade que impressionam os convidados."},{"title":"Fácil Operação","description":"Sistema simples e intuitivo que qualquer pessoa pode operar."},{"title":"Versátil","description":"Ideal para coffee breaks, eventos corporativos e reuniões."}]'::jsonb,
  specs = '{"Marca":"Dolce Gusto","Sistema":"Cápsulas","Tipo":"Cafeteira","Valor":"R$ 50,00 por diária"}'::jsonb
WHERE product_key = 'cafeteira_dolce_gusto';

UPDATE equipment SET
  name = 'Bebedouro',
  short_description = 'Bebedouro para fornecimento de água gelada e natural em eventos, festas e locais de trabalho temporários.',
  full_description = 'O Bebedouro é essencial para eventos que precisam oferecer água fresca para os participantes. Com opções de água gelada e natural, ele garante hidratação adequada durante todo o evento.

Perfeito para eventos corporativos, feiras, congressos, festas e qualquer ocasião com grande circulação de pessoas. O equipamento é prático, higiênico e fácil de usar.

Alugue o Bebedouro e garanta que seus convidados tenham acesso a água fresca durante todo o evento!',
  benefits = '[{"title":"Água Gelada e Natural","description":"Opções de temperatura para atender diferentes preferências."},{"title":"Higiênico","description":"Sistema higiênico que garante água limpa e segura."},{"title":"Fácil Operação","description":"Uso simples e intuitivo para todos os participantes."},{"title":"Capacidade Adequada","description":"Atende à demanda de eventos com grande circulação de pessoas."},{"title":"Essencial","description":"Equipamento indispensável para hidratação em eventos."}]'::jsonb,
  specs = '{"Tipo":"Bebedouro","Opções":"Água gelada e natural","Uso indicado":"Eventos, feiras, congressos","Valor":"R$ 90,00 por diária"}'::jsonb
WHERE product_key = 'bebedouro';

UPDATE equipment SET
  name = 'Micro-ondas',
  short_description = 'Micro-ondas para aquecimento rápido de alimentos em eventos, festas e locais de trabalho temporários.',
  full_description = 'O Micro-ondas é a solução prática para aquecer alimentos de forma rápida e eficiente durante seu evento. Ideal para áreas de apoio, camarins, copas temporárias e qualquer local que precise de aquecimento de refeições.

Perfeito para eventos corporativos, festas, feiras e produções que precisam de estrutura de apoio para alimentação. O equipamento é fácil de usar e garante praticidade no dia a dia do evento.

Alugue o Micro-ondas e tenha praticidade no aquecimento de alimentos!',
  benefits = '[{"title":"Aquecimento Rápido","description":"Aqueça alimentos em segundos com eficiência e praticidade."},{"title":"Fácil Operação","description":"Controles simples e intuitivos para uso rápido."},{"title":"Compacto","description":"Tamanho ideal para diferentes configurações de espaço."},{"title":"Versátil","description":"Ideal para áreas de apoio, camarins e copas temporárias."},{"title":"Prático","description":"Solução simples para necessidades de aquecimento no evento."}]'::jsonb,
  specs = '{"Tipo":"Micro-ondas","Uso indicado":"Aquecimento de alimentos","Valor":"R$ 60,00 por diária"}'::jsonb
WHERE product_key = 'microondas';

UPDATE equipment SET
  name = 'Caixa Térmica 360L',
  short_description = 'Caixa térmica com capacidade de 360 litros, ideal para manter bebidas geladas em eventos de grande porte.',
  full_description = 'A Caixa Térmica 360L é a solução ideal para eventos de grande porte que precisam manter grande quantidade de bebidas geladas. Com capacidade generosa, ela garante que suas bebidas permaneçam na temperatura ideal durante todo o evento.

Perfeita para festas, shows, eventos corporativos, churrascos e qualquer ocasião com grande número de convidados. A estrutura robusta e o isolamento térmico de qualidade garantem eficiência por longas horas.

Alugue a Caixa Térmica 360L e garanta bebidas geladas para todos os seus convidados!',
  benefits = '[{"title":"Grande Capacidade 360L","description":"Espaço generoso para armazenar grande quantidade de bebidas."},{"title":"Isolamento Térmico","description":"Mantém as bebidas geladas por longas horas durante o evento."},{"title":"Estrutura Robusta","description":"Material resistente e durável para uso intensivo."},{"title":"Ideal para Grandes Eventos","description":"Capacidade adequada para festas e eventos com muitos convidados."},{"title":"Prática","description":"Fácil de usar e abastecer durante o evento."}]'::jsonb,
  specs = '{"Capacidade":"360 litros","Tipo":"Caixa térmica","Uso indicado":"Armazenamento de bebidas geladas","Valor":"R$ 150,00 por diária"}'::jsonb
WHERE product_key = 'caixa_termica_360l';

UPDATE equipment SET
  name = 'Cadeira (unidade)',
  short_description = 'Cadeira avulsa para eventos, festas e comemorações. Alugue a quantidade que precisar.',
  full_description = 'A Cadeira é o item essencial para acomodar seus convidados com conforto. Alugue unidades avulsas conforme a necessidade do seu evento, com total flexibilidade na quantidade.

Ideal para festas, casamentos, eventos corporativos, confraternizações e qualquer ocasião que precise de assentos para os convidados. Modelo prático e versátil que se adapta a diferentes configurações.

Alugue as cadeiras que precisar e garanta o conforto dos seus convidados!',
  benefits = '[{"title":"Aluguel por Unidade","description":"Flexibilidade para alugar exatamente a quantidade que você precisa."},{"title":"Versátil","description":"Modelo prático que se adapta a diferentes configurações de evento."},{"title":"Confortável","description":"Assento confortável para eventos de diferentes durações."},{"title":"Prática","description":"Fácil de posicionar e organizar no espaço do evento."},{"title":"Econômica","description":"Excelente custo-benefício para grandes quantidades."}]'::jsonb,
  specs = '{"Tipo":"Cadeira avulsa","Aluguel":"Por unidade","Uso indicado":"Festas, casamentos, eventos corporativos","Valor":"R$ 5,00 por unidade/diária"}'::jsonb
WHERE product_key = 'cadeira_unidade';

UPDATE equipment SET
  name = 'Jogo de Mesa com 4 Cadeiras',
  short_description = 'Conjunto completo com 1 mesa e 4 cadeiras, perfeito para eventos, festas e confraternizações.',
  full_description = 'O Jogo de Mesa com 4 Cadeiras é a solução completa para acomodar seus convidados com conforto e praticidade. O conjunto inclui uma mesa e quatro cadeiras, oferecendo um espaço funcional e organizado para refeições e convivência.

Ideal para festas, casamentos, eventos corporativos, confraternizações e qualquer ocasião que precise de mobiliário para os convidados. O conjunto combina praticidade e bom custo-benefício.

Alugue os conjuntos que precisar e monte o espaço perfeito para seu evento!',
  benefits = '[{"title":"Conjunto Completo","description":"1 mesa + 4 cadeiras em um só aluguel, com praticidade e economia."},{"title":"Prático","description":"Solução rápida e funcional para acomodar convidados."},{"title":"Versátil","description":"Ideal para refeições, convivência e atividades diversas."},{"title":"Econômico","description":"Melhor custo-benefício comparado ao aluguel de itens avulsos."},{"title":"Funcional","description":"Espaço organizado e confortável para os convidados."}]'::jsonb,
  specs = '{"Conteúdo":"1 mesa + 4 cadeiras","Tipo":"Jogo de mesa com cadeiras","Uso indicado":"Festas, casamentos, eventos corporativos","Valor":"R$ 30,00 por conjunto/diária"}'::jsonb
WHERE product_key = 'jogo_4_cadeiras';

UPDATE equipment SET
  name = 'Mesa (unidade)',
  short_description = 'Mesa avulsa para eventos, festas e comemorações. Alugue a quantidade que precisar.',
  full_description = 'A Mesa é o item essencial para organizar o espaço do seu evento. Alugue unidades avulsas conforme a necessidade, com total flexibilidade na quantidade e disposição.

Ideal para festas, casamentos, eventos corporativos, feiras e qualquer ocasião que precise de superfícies para refeições, apoio ou exposição. Modelo prático e resistente que se adapta a diferentes configurações.

Alugue as mesas que precisar e organize o espaço perfeito para seu evento!',
  benefits = '[{"title":"Aluguel por Unidade","description":"Flexibilidade para alugar exatamente a quantidade que você precisa."},{"title":"Versátil","description":"Ideal para refeições, apoio, exposição e diversas configurações."},{"title":"Resistente","description":"Estrutura robusta para uso em diferentes tipos de eventos."},{"title":"Prática","description":"Fácil de posicionar e organizar no espaço do evento."},{"title":"Econômica","description":"Excelente custo-benefício para grandes quantidades."}]'::jsonb,
  specs = '{"Tipo":"Mesa avulsa","Aluguel":"Por unidade","Uso indicado":"Festas, casamentos, eventos corporativos","Valor":"R$ 10,00 por unidade/diária"}'::jsonb
WHERE product_key = 'mesa_unidade';

UPDATE equipment SET
  name = 'Mesa Pranchão Evento',
  short_description = 'Mesa pranchão resistente e espaçosa, ideal para eventos com grande número de convidados.',
  full_description = 'A Mesa Pranchão Evento é a solução ideal para eventos que precisam de mesas grandes e resistentes. Com superfície ampla e estrutura robusta, ela acomoda vários convidados com conforto e praticidade.

Perfeita para festas, casamentos, eventos corporativos, confraternizações e qualquer ocasião que precise de mesas espaçosas. O formato pranchão é tradicional e funcional para refeições e atividades em grupo.

Alugue as Mesas Pranchão e acomode seus convidados com espaço e conforto!',
  benefits = '[{"title":"Superfície Ampla","description":"Grande área de superfície para acomodar vários convidados confortavelmente."},{"title":"Estrutura Robusta","description":"Material resistente e durável para uso intensivo em eventos."},{"title":"Formato Tradicional","description":"Formato pranchão funcional para refeições e atividades em grupo."},{"title":"Versátil","description":"Ideal para festas, casamentos, eventos corporativos e confraternizações."},{"title":"Prática","description":"Fácil de posicionar e organizar no espaço do evento."}]'::jsonb,
  specs = '{"Tipo":"Mesa pranchão","Uso indicado":"Eventos com grande número de convidados","Valor":"R$ 15,00 por unidade/diária"}'::jsonb
WHERE product_key = 'mesa_pranchao_evento';

UPDATE equipment SET
  name = 'Mesa Dobrável Portátil',
  short_description = 'Mesa dobrável portátil, prática e versátil, ideal para eventos que precisam de mobilidade e praticidade.',
  full_description = 'A Mesa Dobrável Portátil é a solução prática para eventos que precisam de mobilidade e versatilidade. Com sistema dobrável, ela é fácil de transportar, montar e desmontar, otimizando o espaço e o tempo de preparação.

Ideal para feiras, eventos ao ar livre, áreas de apoio, credenciamento e qualquer ocasião que precise de uma superfície de trabalho prática e portátil. O design funcional permite uso em diferentes configurações.

Alugue as Mesas Dobráveis e tenha praticidade no seu evento!',
  benefits = '[{"title":"Dobrável e Portátil","description":"Fácil de transportar, montar e desmontar para máxima praticidade."},{"title":"Compacta","description":"Ocupa pouco espaço quando dobrada, otimizando o armazenamento."},{"title":"Versátil","description":"Ideal para feiras, credenciamento, áreas de apoio e eventos ao ar livre."},{"title":"Resistente","description":"Estrutura robusta mesmo com design compacto e portátil."},{"title":"Prática","description":"Montagem rápida sem necessidade de ferramentas."}]'::jsonb,
  specs = '{"Tipo":"Mesa dobrável portátil","Uso indicado":"Feiras, credenciamento, áreas de apoio","Valor":"R$ 15,00 por diária"}'::jsonb
WHERE product_key = 'mesa_dobravel_portatil';

UPDATE equipment SET
  name = 'Mesa Bistrô',
  short_description = 'Mesa bistrô alta, ideal para coquetéis, happy hours e eventos que privilegiam a circulação dos convidados.',
  full_description = 'A Mesa Bistrô é perfeita para eventos que privilegiam a circulação e a interação dos convidados. Com altura adequada para uso em pé, ela é ideal para coquetéis, happy hours, confraternizações e eventos sociais.

O design compacto e elegante permite melhor aproveitamento do espaço, facilitando a circulação dos convidados enquanto oferece apoio para bebidas e petiscos. Perfeita para criar ambientes descontraídos e sofisticados.

Alugue as Mesas Bistrô e crie o ambiente perfeito para seu coquetel!',
  benefits = '[{"title":"Altura para Uso em Pé","description":"Dimensões ideais para coquetéis e eventos em pé."},{"title":"Favorece Circulação","description":"Permite que os convidados circulem e interajam livremente."},{"title":"Versátil","description":"Ideal para coquetéis, happy hours e confraternizações."},{"title":"Compacta","description":"Ocupa pouco espaço, permitindo melhor aproveitamento do ambiente."},{"title":"Elegante","description":"Design sofisticado que valoriza a decoração do evento."}]'::jsonb,
  specs = '{"Tipo":"Mesa bistrô","Uso indicado":"Coquetéis, happy hours, eventos em pé","Valor":"R$ 50,00 por diária"}'::jsonb
WHERE product_key = 'mesa_bistro';

UPDATE equipment SET
  name = 'Mesa de Reunião',
  short_description = 'Mesa de reunião profissional, ideal para eventos corporativos, palestras e workshops.',
  full_description = 'A Mesa de Reunião é essencial para eventos corporativos que precisam de estrutura profissional. Com dimensões adequadas para reuniões de trabalho, ela oferece conforto e funcionalidade para os participantes.

Perfeita para eventos corporativos, palestras, workshops, entrevistas e qualquer ocasião que precise de uma mesa de trabalho profissional. O design clean combina com ambientes executivos.

Alugue a Mesa de Reunião e monte o ambiente profissional ideal para seu evento!',
  benefits = '[{"title":"Profissional","description":"Design adequado para ambientes corporativos e executivos."},{"title":"Dimensões Adequadas","description":"Tamanho ideal para reuniões de trabalho e apresentações."},{"title":"Confortável","description":"Espaço adequado para os participantes trabalharem com conforto."},{"title":"Design Clean","description":"Visual neutro que combina com diferentes decorações corporativas."},{"title":"Versátil","description":"Ideal para reuniões, palestras, workshops e entrevistas."}]'::jsonb,
  specs = '{"Tipo":"Mesa de reunião","Uso indicado":"Eventos corporativos, reuniões, workshops","Valor":"R$ 100,00 por diária"}'::jsonb
WHERE product_key = 'mesa_reuniao';

UPDATE equipment SET
  name = 'Mesa Redonda Tramontina',
  short_description = 'Mesa redonda Tramontina em madeira Tauari Amêndoa com base de alumínio preta, 60cm de diâmetro.',
  full_description = 'A Mesa Redonda Tramontina combina elegância e qualidade em um design sofisticado. Com tampo em madeira Tauari Amêndoa e base de alumínio preta, ela é perfeita para eventos que valorizam o acabamento premium.

O tamanho compacto de 60cm de diâmetro é ideal para coquetéis, lounges e áreas de descanso. A marca Tramontina é sinônimo de qualidade e durabilidade.

Alugue a Mesa Redonda Tramontina e adicione um toque de elegância ao seu evento!',
  benefits = '[{"title":"Marca Tramontina","description":"Qualidade e durabilidade reconhecidas da marca Tramontina."},{"title":"Design Premium","description":"Madeira Tauari Amêndoa com base de alumínio preta, visual sofisticado."},{"title":"Tamanho Compacto","description":"Diâmetro de 60cm ideal para coquetéis e áreas de descanso."},{"title":"Elegante","description":"Visual refinado que valoriza a decoração do evento."},{"title":"Versátil","description":"Ideal para lounges, áreas VIP e espaços de convivência."}]'::jsonb,
  specs = '{"Marca":"Tramontina","Material":"Madeira Tauari Amêndoa","Base":"Alumínio preto","Diâmetro":"60cm","Valor":"R$ 50,00 por diária"}'::jsonb
WHERE product_key = 'mesa_redonda_tramontina';

UPDATE equipment SET
  name = 'Mesa Decorativa (unidade)',
  short_description = 'Mesa decorativa avulsa para compor cenários e decorações em eventos especiais.',
  full_description = 'A Mesa Decorativa é perfeita para compor cenários e decorações em eventos especiais. Com design elegante, ela serve como apoio para arranjos, bolos, lembrancinhas e elementos decorativos.

Ideal para casamentos, aniversários, chás de bebê e eventos que precisam de superfícies decorativas. Alugue unidades avulsas conforme a necessidade da sua decoração.

Alugue as Mesas Decorativas e crie cenários incríveis para seu evento!',
  benefits = '[{"title":"Design Decorativo","description":"Visual elegante perfeito para compor cenários e decorações."},{"title":"Versátil","description":"Ideal como apoio para arranjos, bolos e elementos decorativos."},{"title":"Aluguel por Unidade","description":"Flexibilidade para alugar a quantidade que você precisa."},{"title":"Elegante","description":"Adiciona sofisticação à decoração do seu evento."},{"title":"Combinável","description":"Pode ser combinada em conjuntos para criar composições."}]'::jsonb,
  specs = '{"Tipo":"Mesa decorativa","Aluguel":"Por unidade","Uso indicado":"Decoração de eventos","Valor":"R$ 30,00 por unidade/diária"}'::jsonb
WHERE product_key = 'mesa_decorativa_unidade';

UPDATE equipment SET
  name = 'Conjunto de Mesas Decorativas (3)',
  short_description = 'Conjunto com 3 mesas decorativas em diferentes alturas para compor cenários e decorações.',
  full_description = 'O Conjunto de Mesas Decorativas inclui 3 mesas em diferentes alturas, perfeitas para criar composições visuais atraentes. Ideal para mesas de doces, lounges e cenários decorativos.

As diferentes alturas permitem criar níveis e volumes na decoração, valorizando bolos, arranjos e elementos decorativos. Perfeito para casamentos, aniversários e eventos especiais.

Alugue o Conjunto de Mesas Decorativas e crie composições incríveis!',
  benefits = '[{"title":"Conjunto de 3 Mesas","description":"Três mesas em diferentes alturas para composições visuais."},{"title":"Cria Níveis","description":"Alturas variadas permitem criar níveis e volumes na decoração."},{"title":"Valoriza a Decoração","description":"Destaca bolos, arranjos e elementos decorativos."},{"title":"Econômico","description":"Conjunto com melhor custo-benefício que itens avulsos."},{"title":"Versátil","description":"Ideal para mesas de doces, lounges e cenários diversos."}]'::jsonb,
  specs = '{"Conteúdo":"3 mesas decorativas","Alturas":"Variadas","Tipo":"Conjunto de mesas decorativas","Valor":"R$ 70,00 por conjunto/diária"}'::jsonb
WHERE product_key = 'mesa_decorativa_conjunto';

UPDATE equipment SET
  name = 'Banqueta Alta',
  short_description = 'Banqueta alta ideal para mesas bistrô, balcões e áreas de bar em eventos.',
  full_description = 'A Banqueta Alta é o complemento perfeito para mesas bistrô e balcões. Com altura adequada para uso em pé ou apoio, ela é ideal para áreas de bar, coquetéis e espaços de convivência.

Design moderno e confortável que valoriza o ambiente do evento. Perfeita para happy hours, festas e eventos que privilegiam a interação dos convidados.

Alugue as Banquetas Altas e complete a decoração do seu evento!',
  benefits = '[{"title":"Altura Adequada","description":"Dimensão ideal para uso com mesas bistrô e balcões."},{"title":"Design Moderno","description":"Visual contemporâneo que valoriza a decoração do evento."},{"title":"Confortável","description":"Assento confortável para momentos de descontração."},{"title":"Versátil","description":"Ideal para áreas de bar, coquetéis e espaços de convivência."},{"title":"Combinável","description":"Perfeita para usar com mesas bistrô e balcões."}]'::jsonb,
  specs = '{"Tipo":"Banqueta alta","Uso indicado":"Mesas bistrô, balcões, áreas de bar","Valor":"R$ 35,00 por diária"}'::jsonb
WHERE product_key = 'banqueta_alta';

UPDATE equipment SET
  name = 'Cadeira de Escritório',
  short_description = 'Cadeira de escritório confortável, ideal para eventos corporativos, reuniões e workshops.',
  full_description = 'A Cadeira de Escritório oferece conforto e ergonomia para eventos de longa duração. Ideal para reuniões, workshops, palestras e eventos corporativos que precisam de assentos profissionais.

Design executivo que combina com ambientes corporativos e profissionais. Perfeita para mesas de reunião, estações de trabalho e áreas administrativas.

Alugue as Cadeiras de Escritório e garanta o conforto dos participantes!',
  benefits = '[{"title":"Confortável","description":"Ergonomia adequada para eventos de longa duração."},{"title":"Design Executivo","description":"Visual profissional que combina com ambientes corporativos."},{"title":"Versátil","description":"Ideal para reuniões, workshops e eventos corporativos."},{"title":"Prática","description":"Fácil de posicionar e configurar no ambiente."},{"title":"Profissional","description":"Transmite credibilidade em ambientes executivos."}]'::jsonb,
  specs = '{"Tipo":"Cadeira de escritório","Uso indicado":"Eventos corporativos, reuniões, workshops","Valor":"R$ 10,00 por diária"}'::jsonb
WHERE product_key = 'cadeira_escritorio';

UPDATE equipment SET
  name = 'Poltrona',
  short_description = 'Poltrona confortável e elegante, ideal para lounges, áreas VIP e espaços de descanso em eventos.',
  full_description = 'A Poltrona oferece conforto e elegância para espaços de destaque no seu evento. Ideal para lounges, áreas VIP, camarins e espaços de descanso que merecem um toque especial.

Design sofisticado que valoriza a decoração e proporciona momentos de conforto para os convidados. Perfeita para criar ambientes aconchegantes e diferenciados.

Alugue as Poltronas e crie espaços VIP memoráveis no seu evento!',
  benefits = '[{"title":"Conforto Premium","description":"Máximo conforto para espaços de destaque e áreas VIP."},{"title":"Design Elegante","description":"Visual sofisticado que valoriza a decoração do evento."},{"title":"Versátil","description":"Ideal para lounges, camarins e espaços de descanso."},{"title":"Diferenciada","description":"Cria ambientes aconchegantes e diferenciados."},{"title":"Impactante","description":"Impressiona os convidados com conforto e elegância."}]'::jsonb,
  specs = '{"Tipo":"Poltrona","Uso indicado":"Lounges, áreas VIP, espaços de descanso","Valor":"R$ 130,00 por diária"}'::jsonb
WHERE product_key = 'poltrona';

UPDATE equipment SET
  name = 'Puff',
  short_description = 'Puff versátil e moderno, ideal para lounges, áreas de convivência e decoração de eventos.',
  full_description = 'O Puff é o complemento perfeito para criar ambientes descontraídos e modernos. Versátil e prático, ele funciona como assento adicional ou elemento decorativo em diferentes configurações.

Ideal para lounges, áreas de convivência, espaços kids e qualquer ambiente que precise de assentos extras ou elementos decorativos. Combine com poltronas e sofás para criar composições aconchegantes.

Alugue os Puffs e adicione versatilidade ao seu evento!',
  benefits = '[{"title":"Versátil","description":"Funciona como assento ou elemento decorativo."},{"title":"Moderno","description":"Design contemporâneo que valoriza ambientes descontraídos."},{"title":"Compacto","description":"Fácil de posicionar em diferentes configurações."},{"title":"Combinável","description":"Perfeito para compor com poltronas e outros móveis."},{"title":"Econômico","description":"Excelente custo-benefício para assentos extras."}]'::jsonb,
  specs = '{"Tipo":"Puff","Uso indicado":"Lounges, áreas de convivência, decoração","Valor":"R$ 10,00 por diária"}'::jsonb
WHERE product_key = 'puff';

UPDATE equipment SET
  name = 'Balcão de Atendimento',
  short_description = 'Balcão de atendimento profissional com dimensões 64cm x 38cm x 2,0m (com testeira) ou 82cm (só o balcão).',
  full_description = 'O Balcão de Atendimento é essencial para eventos que precisam de estrutura de recepção profissional. Com design funcional e dimensões adequadas, ele oferece espaço para credenciamento, informações e atendimento ao público.

Disponível com testeira (altura total 2,0m) para comunicação visual ou apenas o balcão (82cm). Perfeito para feiras, congressos, eventos corporativos e qualquer ocasião que precise de ponto de atendimento.

Alugue o Balcão de Atendimento e monte uma recepção profissional!',
  benefits = '[{"title":"Design Profissional","description":"Visual adequado para recepções e pontos de atendimento."},{"title":"Testeira Opcional","description":"Altura de 2,0m com testeira para comunicação visual."},{"title":"Dimensões Funcionais","description":"Espaço de 64cm x 38cm adequado para trabalho."},{"title":"Versátil","description":"Ideal para credenciamento, informações e atendimento."},{"title":"Profissional","description":"Transmite credibilidade em feiras e eventos corporativos."}]'::jsonb,
  specs = '{"Comprimento":"64cm","Largura":"38cm","Altura":"2,0m (com testeira) ou 82cm (só o balcão)","Tipo":"Balcão de atendimento","Valor":"R$ 100,00 por diária"}'::jsonb
WHERE product_key = 'balcao_atendimento';

UPDATE equipment SET
  name = 'Vaso Decorativo',
  short_description = 'Vaso decorativo elegante para compor arranjos e decorações em eventos especiais.',
  full_description = 'O Vaso Decorativo é o elemento perfeito para compor arranjos florais e decorações em eventos especiais. Com design elegante, ele valoriza qualquer composição decorativa.

Ideal para casamentos, aniversários, eventos corporativos e qualquer ocasião que precise de elementos decorativos de qualidade. Combine com flores, plantas ou outros elementos para criar composições únicas.

Alugue os Vasos Decorativos e adicione elegância à decoração do seu evento!',
  benefits = '[{"title":"Design Elegante","description":"Visual sofisticado que valoriza qualquer composição."},{"title":"Versátil","description":"Ideal para arranjos florais, plantas e elementos decorativos."},{"title":"Qualidade","description":"Acabamento premium que impressiona os convidados."},{"title":"Combinável","description":"Perfeito para compor com flores e outros elementos."},{"title":"Impactante","description":"Adiciona elegância e sofisticação ao ambiente."}]'::jsonb,
  specs = '{"Tipo":"Vaso decorativo","Uso indicado":"Arranjos florais, decoração de eventos","Valor":"R$ 50,00 por diária"}'::jsonb
WHERE product_key = 'vaso_decorativo';

UPDATE equipment SET
  name = 'Refletor LED 100W',
  short_description = 'Refletor LED de 100W com extensão elétrica inclusa, ideal para iluminação de eventos ao ar livre.',
  full_description = 'O Refletor LED 100W é a solução ideal para iluminação de eventos ao ar livre. Com potência adequada e tecnologia LED eficiente, ele garante iluminação de qualidade com baixo consumo de energia.

Acompanha extensão elétrica para facilitar a instalação em diferentes pontos do evento. Perfeito para tendas, áreas externas, fachadas e qualquer ambiente que precise de iluminação complementar.

Alugue os Refletores LED e ilumine seu evento com qualidade!',
  benefits = '[{"title":"Tecnologia LED","description":"Iluminação eficiente com baixo consumo de energia."},{"title":"Potência 100W","description":"Intensidade adequada para iluminação de eventos."},{"title":"Extensão Inclusa","description":"Facilita a instalação em diferentes pontos do evento."},{"title":"Versátil","description":"Ideal para tendas, áreas externas e fachadas."},{"title":"Econômico","description":"Baixo consumo de energia com alta eficiência."}]'::jsonb,
  specs = '{"Potência":"100W","Tecnologia":"LED","Incluso":"Extensão elétrica","Tipo":"Refletor","Valor":"R$ 25,00 por diária"}'::jsonb
WHERE product_key = 'refletor_led_100w';

UPDATE equipment SET
  name = 'Caixa de Sorteio Acrílico',
  short_description = 'Caixa de sorteio em acrílico transparente, ideal para promoções e ativações em eventos.',
  full_description = 'A Caixa de Sorteio em Acrílico é perfeita para promoções, sorteios e ativações em eventos. Com design transparente, ela permite visualização dos cupons e transmite credibilidade ao processo de sorteio.

Ideal para feiras, eventos corporativos, promoções e qualquer ocasião que precise de uma urna de sorteio profissional. O material acrílico garante durabilidade e visual elegante.

Alugue a Caixa de Sorteio e realize promoções com transparência!',
  benefits = '[{"title":"Transparente","description":"Permite visualização dos cupons e transmite credibilidade."},{"title":"Material Acrílico","description":"Durável, elegante e de fácil limpeza."},{"title":"Profissional","description":"Visual adequado para promoções e ativações de marca."},{"title":"Versátil","description":"Ideal para sorteios, promoções e coleta de cupons."},{"title":"Compacta","description":"Fácil de posicionar em diferentes pontos do evento."}]'::jsonb,
  specs = '{"Material":"Acrílico transparente","Tipo":"Caixa de sorteio / urna","Uso indicado":"Promoções, sorteios, ativações","Valor":"R$ 15,00 por diária"}'::jsonb
WHERE product_key = 'caixa_sorteio_acrilico';

UPDATE equipment SET
  name = 'Lixeira 100L com Pedal',
  short_description = 'Lixeira de 100 litros com pedal, ideal para eventos com grande circulação de pessoas.',
  full_description = 'A Lixeira 100L com Pedal é essencial para manter a limpeza em eventos com grande circulação. Com capacidade generosa e acionamento por pedal, ela oferece praticidade e higiene para seus convidados.

Ideal para festas, feiras, eventos corporativos e qualquer ocasião que precise de estrutura adequada para descarte de resíduos. O sistema de pedal evita o contato das mãos com a tampa.

Alugue as Lixeiras e mantenha seu evento limpo e organizado!',
  benefits = '[{"title":"Grande Capacidade 100L","description":"Volume adequado para eventos com grande circulação."},{"title":"Sistema de Pedal","description":"Acionamento sem contato das mãos, mais higiênico."},{"title":"Prática","description":"Fácil de usar e manter durante o evento."},{"title":"Essencial","description":"Item indispensável para manter o evento limpo."},{"title":"Resistente","description":"Material durável para uso intensivo em eventos."}]'::jsonb,
  specs = '{"Capacidade":"100 litros","Sistema":"Pedal","Tipo":"Lixeira","Valor":"R$ 40,00 por diária"}'::jsonb
WHERE product_key = 'lixeira_100l_pedal';

UPDATE equipment SET
  name = 'Lixeira de Escritório',
  short_description = 'Lixeira de escritório compacta, ideal para áreas administrativas e espaços de trabalho em eventos.',
  full_description = 'A Lixeira de Escritório é perfeita para áreas administrativas e espaços de trabalho em eventos. Compacta e discreta, ela mantém a organização sem interferir no ambiente.

Ideal para mesas de reunião, recepções, estandes e qualquer área que precise de uma lixeira de menor porte. Design simples e funcional que combina com ambientes profissionais.

Alugue as Lixeiras de Escritório para os espaços de trabalho do seu evento!',
  benefits = '[{"title":"Compacta","description":"Tamanho ideal para áreas de trabalho e mesas."},{"title":"Discreta","description":"Design simples que não interfere no ambiente."},{"title":"Profissional","description":"Visual adequado para ambientes corporativos."},{"title":"Prática","description":"Fácil de posicionar e manter organizada."},{"title":"Econômica","description":"Excelente custo-benefício para múltiplas unidades."}]'::jsonb,
  specs = '{"Tipo":"Lixeira de escritório","Uso indicado":"Áreas administrativas, mesas de trabalho","Valor":"R$ 5,00 por diária"}'::jsonb
WHERE product_key = 'lixeira_escritorio';

UPDATE equipment SET
  name = 'Kit de 10 Cones de Marcação',
  short_description = 'Kit com 10 cones de marcação, ideal para organização de filas, sinalização e atividades esportivas.',
  full_description = 'O Kit de 10 Cones de Marcação é essencial para eventos que precisam de sinalização e organização de espaços. Com 10 unidades, ele oferece versatilidade para diferentes aplicações.

Ideal para organização de filas, sinalização de áreas, atividades esportivas e qualquer situação que precise de marcação visual. Cores vibrantes que garantem alta visibilidade.

Alugue o Kit de Cones e organize os espaços do seu evento!',
  benefits = '[{"title":"Kit com 10 Unidades","description":"Quantidade adequada para diferentes aplicações."},{"title":"Alta Visibilidade","description":"Cores vibrantes que garantem sinalização eficiente."},{"title":"Versátil","description":"Ideal para filas, sinalização e atividades esportivas."},{"title":"Leve","description":"Fácil de transportar e posicionar."},{"title":"Prático","description":"Solução simples para organização de espaços."}]'::jsonb,
  specs = '{"Quantidade":"10 cones","Tipo":"Cones de marcação","Uso indicado":"Sinalização, filas, atividades esportivas","Valor":"R$ 18,00 por kit/diária"}'::jsonb
WHERE product_key = 'kit_cones_marcacao';