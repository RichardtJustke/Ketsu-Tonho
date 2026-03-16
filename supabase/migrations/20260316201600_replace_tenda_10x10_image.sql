-- Update primary image for Tenda Branca 10x10m - 2026-03-16-v3
-- The user requested to replace the current image with the new one provided.

UPDATE public.equipment_images SET 
  image_url = 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772154941/Tenda_10x10_branca_1-1920w_qxjkbg.jpg'
WHERE equipment_id = (SELECT id FROM public.equipment WHERE product_key = 'tenda_branca_10x10')
AND is_primary = true;

-- Ensure it exists if somehow it doesn't
INSERT INTO public.equipment_images (equipment_id, image_url, is_primary, display_order)
SELECT id, 'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772154941/Tenda_10x10_branca_1-1920w_qxjkbg.jpg', true, 0
FROM public.equipment 
WHERE product_key = 'tenda_branca_10x10'
AND NOT EXISTS (
    SELECT 1 FROM public.equipment_images 
    WHERE equipment_id = (SELECT id FROM public.equipment WHERE product_key = 'tenda_branca_10x10')
    AND is_primary = true
);
