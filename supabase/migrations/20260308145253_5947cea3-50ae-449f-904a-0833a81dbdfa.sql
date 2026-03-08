-- Add product_key column to equipment for mapping to hardcoded IDs
ALTER TABLE public.equipment ADD COLUMN product_key text UNIQUE;

-- Insert equipment categories
INSERT INTO public.equipment_categories (id, name, description, display_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Tendas', 'Tendas para eventos de todos os portes', 1),
  ('a1000000-0000-0000-0000-000000000002', 'Box Truss & Pórticos', 'Estruturas em box truss para eventos profissionais', 2),
  ('a1000000-0000-0000-0000-000000000003', 'Climatizadores', 'Climatizadores evaporativos para conforto térmico', 3),
  ('a1000000-0000-0000-0000-000000000004', 'Mobiliário & Equipamentos', 'Móveis, eletrônicos e acessórios para eventos', 4);

-- Insert all equipment (Tendas)
INSERT INTO public.equipment (product_key, name, description, daily_price, stock_total, stock_available, category_id) VALUES
  ('tenda_remo_5x5', 'Tenda Remo 5x5m', 'Tenda temática oficial do Clube do Remo, 25m²', 0, 2, 2, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_pe_dagua', 'Tenda Pai d''Égua', 'Tenda versátil para feiras, festivais e eventos corporativos', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_cristal_10x10', 'Tenda Cristal 10x10m', 'Tenda cristal transparente, 100m²', 0, 2, 2, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_10x10', 'Tenda Branca 10x10m', 'Tenda branca impermeável, 100m²', 0, 2, 2, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_paissandu_5x5', 'Tenda Paysandu 5x5m', 'Tenda temática do Paysandu, 25m²', 0, 2, 2, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_9x6', 'Tenda Branca 9x6m', 'Tenda branca impermeável, 54m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_9x6_lona_box_struss', 'Tenda 9x6 em Lona Box Struss', 'Tenda com estrutura box truss, 54m²', 0, 2, 2, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_8x8', 'Tenda Branca 8x8m', 'Tenda branca impermeável, 64m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_cristal_6x6', 'Tenda Cristal 6x6m', 'Tenda cristal transparente, 36m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_6x6', 'Tenda Branca 6x6m', 'Tenda branca impermeável, 36m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_cristal_5x5', 'Tenda Cristal 5x5m', 'Tenda cristal transparente, 25m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_5x5', 'Tenda Branca 5x5m', 'Tenda branca impermeável, 25m²', 0, 5, 5, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_cristal_4x4', 'Tenda Cristal 4x4m', 'Tenda cristal transparente, 16m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_4x4', 'Tenda Branca 4x4m', 'Tenda branca impermeável, 16m²', 0, 5, 5, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_branca_3x3', 'Tenda Branca 3x3m', 'Tenda branca impermeável, 9m²', 0, 5, 5, 'a1000000-0000-0000-0000-000000000001'),
  ('tenda_cristal_3x3', 'Tenda Cristal 3x3m', 'Tenda cristal transparente, 9m²', 0, 3, 3, 'a1000000-0000-0000-0000-000000000001');

-- Insert all equipment (Box Truss & Pórticos)
INSERT INTO public.equipment (product_key, name, description, daily_price, stock_total, stock_available, category_id) VALUES
  ('portico_de_entrada', 'Pórtico de Entrada', 'Pórtico em box truss, 6m x 4,6m', 600, 2, 2, 'a1000000-0000-0000-0000-000000000002'),
  ('tenda_box_truss_9x6', 'Tenda Box Truss 9x6', 'Tenda box truss profissional, 54m²', 2800, 1, 1, 'a1000000-0000-0000-0000-000000000002'),
  ('backdrop_3x2', 'Backdrop 3x2', 'Backdrop em box truss, 3m x 2m', 240, 3, 3, 'a1000000-0000-0000-0000-000000000002');

-- Insert all equipment (Climatizadores)
INSERT INTO public.equipment (product_key, name, description, daily_price, stock_total, stock_available, category_id) VALUES
  ('climatizador_guaruja', 'Climatizador Guarujá', 'Compacto, 100L, alcance 20m', 150, 5, 5, 'a1000000-0000-0000-0000-000000000003'),
  ('climatizador_goar', 'Climatizador Go.Ar', 'Capacidade 70L, alcance 15m', 200, 3, 3, 'a1000000-0000-0000-0000-000000000003'),
  ('climatizador_c650', 'Climatizador C650', 'Industrial, 150L, alta vazão', 400, 2, 2, 'a1000000-0000-0000-0000-000000000003'),
  ('clima_brisa_i20', 'Climatizador Climabrisa Portátil i20', 'Portátil, 150L, vazão média', 300, 3, 3, 'a1000000-0000-0000-0000-000000000003');

-- Insert all equipment (Mobiliário & Equipamentos)
INSERT INTO public.equipment (product_key, name, description, daily_price, stock_total, stock_available, category_id) VALUES
  ('tv_55_suporte', 'TV 55" com Suporte', 'TV 55 polegadas com suporte incluso', 150, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('notebook', 'Notebook', 'Notebook para apresentações e cadastros', 100, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('impressora', 'Impressora', 'Impressora para crachás e certificados', 90, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('microfone_sem_fio', 'Microfone sem Fio', 'Microfone sem fio para apresentações', 80, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('kit_microfone_sem_fio', 'Kit Microfone Sem Fio', 'Kit completo com microfone sem fio', 50, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('caixa_som', 'Caixa de Som', 'Caixa de som com suporte e extensão', 150, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('caixa_som_vertical', 'Caixa de Som Vertical Integrado Boxx', 'Ibanez 600W, bivolt', 300, 2, 2, 'a1000000-0000-0000-0000-000000000004'),
  ('fogao_industrial', 'Fogão Industrial Progas', 'Fogão industrial para preparo em escala', 80, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('frigobar_90l', 'Frigobar 90L', 'Frigobar 90 litros para bebidas e alimentos', 150, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('cafeteira_dolce_gusto', 'Cafeteira Dolce Gusto', 'Cafeteira Dolce Gusto para coffee breaks', 50, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('bebedouro', 'Bebedouro', 'Bebedouro de coluna para água gelada e natural', 90, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('microondas', 'Micro-ondas', 'Micro-ondas para aquecimento de alimentos', 60, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('caixa_termica_360l', 'Caixa Térmica 360L', 'Caixa térmica 360 litros para bebidas', 150, 3, 3, 'a1000000-0000-0000-0000-000000000004'),
  ('cadeira_unidade', 'Cadeira (unidade)', 'Cadeira avulsa para eventos', 3, 200, 200, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_unidade', 'Mesa (unidade)', 'Mesa avulsa para eventos', 5, 100, 100, 'a1000000-0000-0000-0000-000000000004'),
  ('jogo_4_cadeiras', 'Jogo de Mesa com 4 Cadeiras', 'Jogo completo mesa + 4 cadeiras', 10, 50, 50, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_pranchao_evento', 'Mesa Pranchão Evento', 'Mesa pranchão 1,60m x 0,80m', 15, 20, 20, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_dobravel_portatil', 'Mesa Dobrável Portátil', 'Mesa dobrável 74cm x 180cm x 75cm', 25, 15, 15, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_bistro', 'Mesa Bistrô', 'Mesa bistrô para coquetéis e eventos em pé', 50, 10, 10, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_reuniao', 'Mesa de Reunião', 'Mesa de reunião profissional', 100, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_redonda_tramontina', 'Mesa Redonda Tramontina', 'Mesa Tramontina Tauari Amêndoa 60cm', 50, 10, 10, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_decorativa_unidade', 'Mesa Decorativa (unidade)', 'Mesa decorativa avulsa', 30, 10, 10, 'a1000000-0000-0000-0000-000000000004'),
  ('mesa_decorativa_conjunto', 'Conjunto de Mesas Decorativas (3)', 'Conjunto com 3 mesas decorativas', 70, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('vaso_decorativo', 'Vaso Decorativo', 'Vaso decorativo para arranjos', 50, 10, 10, 'a1000000-0000-0000-0000-000000000004'),
  ('banqueta_alta', 'Banqueta Alta', 'Banqueta alta para mesas bistrô e balcões', 35, 15, 15, 'a1000000-0000-0000-0000-000000000004'),
  ('cadeira_escritorio', 'Cadeira de Escritório', 'Cadeira de escritório ergonômica', 10, 20, 20, 'a1000000-0000-0000-0000-000000000004'),
  ('poltrona', 'Poltrona', 'Poltrona confortável para lounges e áreas VIP', 130, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('puff', 'Puff', 'Puff versátil para lounges e decoração', 10, 15, 15, 'a1000000-0000-0000-0000-000000000004'),
  ('balcao_atendimento', 'Balcão de Atendimento', 'Balcão de atendimento 64cm x 38cm', 100, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('refletor_led_100w', 'Refletor LED 100W', 'Refletor LED 100W com extensão', 25, 20, 20, 'a1000000-0000-0000-0000-000000000004'),
  ('caixa_sorteio_acrilico', 'Caixa de Sorteio Acrílico', 'Urna de sorteio em acrílico transparente', 15, 5, 5, 'a1000000-0000-0000-0000-000000000004'),
  ('lixeira_100l_pedal', 'Lixeira 100L com Pedal', 'Lixeira 100L com acionamento por pedal', 40, 10, 10, 'a1000000-0000-0000-0000-000000000004'),
  ('lixeira_escritorio', 'Lixeira de Escritório', 'Lixeira compacta para escritório', 5, 20, 20, 'a1000000-0000-0000-0000-000000000004'),
  ('kit_cones_marcacao', 'Kit de 10 Cones de Marcação', 'Kit com 10 cones para sinalização', 18, 5, 5, 'a1000000-0000-0000-0000-000000000004');