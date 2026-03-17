
-- Update capacity specs for all tenda products
-- Removes old keys: "Pessoas em pé (Coquetel)", "Pessoas sentadas", "Pessoas"
-- Adds new keys: "Cadeiras", "Mesas", "Mesas de Buffet", "Pessoas"
-- All other specs remain untouched

-- 3x3 tendas: Cadeiras=15, Mesas=3, Mesas de Buffet=1, Pessoas=10
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "15", "Mesas": "3", "Mesas de Buffet": "1", "Pessoas": "10"}'::jsonb
WHERE product_key IN ('tenda_branca_3x3', 'tenda_cristal_3x3');

-- 4x4 tendas: Cadeiras=20, Mesas=4, Mesas de Buffet=2, Pessoas=20
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "20", "Mesas": "4", "Mesas de Buffet": "2", "Pessoas": "20"}'::jsonb
WHERE product_key IN ('tenda_branca_4x4', 'tenda_cristal_4x4');

-- 5x5 tendas: Cadeiras=35, Mesas=5, Mesas de Buffet=4, Pessoas=41
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "35", "Mesas": "5", "Mesas de Buffet": "4", "Pessoas": "41"}'::jsonb
WHERE product_key IN ('tenda_branca_5x5', 'tenda_cristal_5x5', 'tenda_paissandu_5x5', 'tenda_remo_5x5');

-- 6x6 tendas: Cadeiras=50, Mesas=9, Mesas de Buffet=5, Pessoas=60
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "50", "Mesas": "9", "Mesas de Buffet": "5", "Pessoas": "60"}'::jsonb
WHERE product_key IN ('tenda_branca_6x6', 'tenda_cristal_6x6');

-- 7x7 (Pé d'Água): Cadeiras=75, Mesas=12, Mesas de Buffet=6, Pessoas=90
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "75", "Mesas": "12", "Mesas de Buffet": "6", "Pessoas": "90"}'::jsonb
WHERE product_key = 'tenda_pe_dagua';

-- 8x8 tendas: Cadeiras=90, Mesas=16, Mesas de Buffet=8, Pessoas=106
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "90", "Mesas": "16", "Mesas de Buffet": "8", "Pessoas": "106"}'::jsonb
WHERE product_key = 'tenda_branca_8x8';

-- 10x10 tendas: Cadeiras=140, Mesas=30, Mesas de Buffet=16, Pessoas=166
UPDATE equipment SET specs = (specs - 'Pessoas em pé (Coquetel)' - 'Pessoas sentadas' - 'Pessoas') || '{"Cadeiras": "140", "Mesas": "30", "Mesas de Buffet": "16", "Pessoas": "166"}'::jsonb
WHERE product_key IN ('tenda_branca_10x10', 'tenda_cristal_10x10');
