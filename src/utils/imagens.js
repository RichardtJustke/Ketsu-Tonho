/**
 * Image utility functions backed by Cloudinary.
 * Sync functions return known URLs or empty arrays.
 * For full folder listings, use the useCloudinaryImages hook.
 */
import { getLogoImage as cloudinaryLogo, getFolderName } from './cloudinary'

/**
 * Returns [] synchronously. Components needing real product image lists
 * should use the useCloudinaryImages hook.
 */
export function getProductImages(productId) {
  return []
}

/**
 * Returns null synchronously. Components needing the first product image
 * should use useCloudinaryImages hook and pick images[0].
 * @param {string} productId
 * @param {string} [fallbackUrl]
 * @returns {string|null}
 */
export function getProductFirstImage(productId, fallbackUrl) {
  return fallbackUrl || null
}

/**
 * Returns the logo URL from Cloudinary.
 */
export function getLogoImage() {
  return cloudinaryLogo()
}

/**
 * Returns [] synchronously. Use useCloudinaryImages('cases') hook instead.
 */
export function getCasesImages() {
  return []
}

/**
 * Returns [] synchronously. Use useCloudinaryImages('equipe') hook instead.
 */
export function getEquipeImages() {
  return []
}

export default { getProductImages, getProductFirstImage, getLogoImage, getCasesImages, getEquipeImages }
