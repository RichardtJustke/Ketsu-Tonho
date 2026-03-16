-- Remove unwanted image from Tenda 10x10 Branca - 2026-03-16
-- The user requested to remove the image with public ID 3ADFC19E4009C6F885C2

DELETE FROM public.equipment_images 
WHERE image_url = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772154796/3ADFC19E4009C6F885C2_waxoaq.jpg';

-- Also ensure it's not the primary image for anything else (should be handled by DELETE)
-- But if it was the only image for tenda_branca_10x10, we should make sure the new one is primary.
-- This was already handled in the previous migration, but we can reinforce it.

UPDATE public.equipment_images SET 
  is_primary = true
WHERE equipment_id = (SELECT id FROM public.equipment WHERE product_key = 'tenda_branca_10x10')
AND image_url = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772155047/Tenda_10x10_branca_2_ogdhq0.jpg';
