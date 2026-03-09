
-- Update tenda prices and dimensions (all currently have daily_price = 0)
UPDATE public.equipment SET daily_price = 380, dimension = '5x5m' WHERE product_key = 'tenda_paissandu_5x5';
UPDATE public.equipment SET daily_price = 300, dimension = NULL WHERE product_key = 'tenda_pe_dagua';
UPDATE public.equipment SET daily_price = 380, dimension = '5x5m' WHERE product_key = 'tenda_remo_5x5';
UPDATE public.equipment SET daily_price = 1700, dimension = '10x10m' WHERE product_key = 'tenda_cristal_10x10';
UPDATE public.equipment SET daily_price = 1500, dimension = '10x10m' WHERE product_key = 'tenda_branca_10x10';
UPDATE public.equipment SET daily_price = 850, dimension = '9x6m' WHERE product_key = 'tenda_branca_9x6';
UPDATE public.equipment SET daily_price = 1000, dimension = '8x8m' WHERE product_key = 'tenda_branca_8x8';
UPDATE public.equipment SET daily_price = 550, dimension = '6x6m' WHERE product_key = 'tenda_cristal_6x6';
UPDATE public.equipment SET daily_price = 500, dimension = '6x6m' WHERE product_key = 'tenda_branca_6x6';
UPDATE public.equipment SET daily_price = 430, dimension = '5x5m' WHERE product_key = 'tenda_cristal_5x5';
UPDATE public.equipment SET daily_price = 380, dimension = '5x5m' WHERE product_key = 'tenda_branca_5x5';
UPDATE public.equipment SET daily_price = 380, dimension = '4x4m' WHERE product_key = 'tenda_cristal_4x4';
UPDATE public.equipment SET daily_price = 300, dimension = '4x4m' WHERE product_key = 'tenda_branca_4x4';
UPDATE public.equipment SET daily_price = 250, dimension = '3x3m' WHERE product_key = 'tenda_branca_3x3';
UPDATE public.equipment SET daily_price = 300, dimension = '3x3m' WHERE product_key = 'tenda_cristal_3x3';
UPDATE public.equipment SET daily_price = 850, dimension = '9x6m' WHERE product_key = 'tenda_9x6_lona_box_struss';

-- Update box truss dimensions
UPDATE public.equipment SET dimension = '6m x 4,6m' WHERE product_key = 'portico_de_entrada';
UPDATE public.equipment SET dimension = '9x6m' WHERE product_key = 'tenda_box_truss_9x6';
UPDATE public.equipment SET dimension = '3m x 2m' WHERE product_key = 'backdrop_3x2';
