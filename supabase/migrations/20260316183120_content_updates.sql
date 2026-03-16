-- Content Updates for Tonho Locação - 2026-03-16-v2
-- Applies requested pricing, text, images and item visibility changes.

-- 1. Climatizadores Updates
-- BR30: New name and value R$450
UPDATE public.equipment SET 
  name = 'Climatizador BR30',
  daily_price = 450,
  specs = specs || '{"Modelo": "BR30", "Capacidade": "150 litros", "Valor": "R$ 450,00 por diária"}'::jsonb
WHERE product_key = 'climatizador_c650';

-- Joape: Rename to 'Climatizador Joape 220v' and value R$300
UPDATE public.equipment SET 
  name = 'Climatizador Joape 220v',
  daily_price = 300,
  specs = specs || '{"Modelo": "Joape", "Voltagem": "220v", "Valor": "R$ 300,00 por diária"}'::jsonb
WHERE product_key IN ('climatizador_goar', 'climatizador_juapi_110v');

-- Remove Climatizador Guarujá from catalog
UPDATE public.equipment SET is_active = false WHERE product_key = 'climatizador_guaruja';

-- 2. Mobiliário Removal
-- Removing "Puff" and "Mesa decorativa (unidade)"
UPDATE public.equipment SET is_active = false WHERE product_key IN ('puff', 'mesa_decorativa_unidade');

-- 3. Tendas Removal
-- Removing "Tenda de lona box grande 19x6" (mapped to 'tenda_9x6_lona_box_struss')
UPDATE public.equipment SET is_active = false WHERE product_key = 'tenda_9x6_lona_box_struss';

-- 4. Tenda 10x10 Branca Image Update
-- Ensure the primary image is replaced
UPDATE public.equipment_images SET 
  image_url = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772155047/Tenda_10x10_branca_2_ogdhq0.jpg'
WHERE equipment_id = (SELECT id FROM public.equipment WHERE product_key = 'tenda_branca_10x10')
AND is_primary = true;

-- If no primary image exists, insert one
INSERT INTO public.equipment_images (equipment_id, image_url, is_primary, display_order)
SELECT id, 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772155047/Tenda_10x10_branca_2_ogdhq0.jpg', true, 0
FROM public.equipment 
WHERE product_key = 'tenda_branca_10x10'
AND NOT EXISTS (
    SELECT 1 FROM public.equipment_images 
    WHERE equipment_id = (SELECT id FROM public.equipment WHERE product_key = 'tenda_branca_10x10')
);

-- 5. Tenda Capacities & 7x7 Addition
-- Values provided by user for area, chairs, tables, buffet tables, and people.

-- Tenda 3x3
UPDATE public.equipment SET 
  specs = '{"Área": "9m²", "Cadeiras": "15", "Mesas": "3", "Mesa de buffet": "1", "Capacidade": "10 pessoas"}'::jsonb
WHERE product_key IN ('tenda_branca_3x3', 'tenda_cristal_3x3');

-- Tenda 4x4
UPDATE public.equipment SET 
  specs = '{"Área": "16m²", "Cadeiras": "20", "Mesas": "4", "Mesa de buffet": "2", "Capacidade": "20 pessoas"}'::jsonb
WHERE product_key IN ('tenda_branca_4x4', 'tenda_cristal_4x4');

-- Tenda 5x5
UPDATE public.equipment SET 
  specs = '{"Área": "25m²", "Cadeiras": "35", "Mesas": "5", "Mesa de buffet": "4", "Capacidade": "41 pessoas"}'::jsonb
WHERE product_key IN ('tenda_branca_5x5', 'tenda_cristal_5x5', 'tenda_paissandu_5x5', 'tenda_remo_5x5');

-- Tenda 6x6
UPDATE public.equipment SET 
  specs = '{"Área": "36m²", "Cadeiras": "50", "Mesas": "9", "Mesa de buffet": "5", "Capacidade": "60 pessoas"}'::jsonb
WHERE product_key IN ('tenda_branca_6x6', 'tenda_cristal_6x6');

-- Tenda 7x7 Addition
INSERT INTO public.equipment (product_key, name, dimension, daily_price, category_id, specs, is_active)
SELECT 'tenda_branca_7x7', 'Tenda Branca 7x7m', '7x7', 0, 'a1000000-0000-0000-0000-000000000001', 
  '{"Área": "49m²", "Cadeiras": "75", "Mesas": "12", "Mesa de buffet": "6", "Capacidade": "90 pessoas"}'::jsonb, true
WHERE NOT EXISTS (SELECT 1 FROM public.equipment WHERE product_key = 'tenda_branca_7x7');

UPDATE public.equipment SET 
  specs = '{"Área": "49m²", "Cadeiras": "75", "Mesas": "12", "Mesa de buffet": "6", "Capacidade": "90 pessoas"}'::jsonb
WHERE product_key = 'tenda_branca_7x7';

-- Tenda 8x8
UPDATE public.equipment SET 
  specs = '{"Área": "64m²", "Cadeiras": "90", "Mesas": "16", "Mesa de buffet": "8", "Capacidade": "106 pessoas"}'::jsonb
WHERE product_key = 'tenda_branca_8x8';

-- Tenda 10x10
UPDATE public.equipment SET 
  specs = '{"Área": "100m²", "Cadeiras": "140", "Mesas": "30", "Mesa de buffet": "16", "Capacidade": "166 pessoas em pé"}'::jsonb
WHERE product_key IN ('tenda_branca_10x10', 'tenda_cristal_10x10');
