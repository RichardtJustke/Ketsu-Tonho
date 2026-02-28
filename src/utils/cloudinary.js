/**
 * Cloudinary image utilities for Tonho Locação
 * Cloud name: dqvldq2ku
 * Folder structure matches old src/imagens/ folders
 */

const CLOUD_NAME = 'dqvldq2ku'
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}`

/**
 * Mapping from product IDs to Cloudinary folder names
 * (when folder name differs from product ID)
 */
const productIdToFolder = {
  tenda_box_truss_9x6: 'tenda_9x6_lona_box_struss'
}

/**
 * Build an optimized Cloudinary image URL.
 * @param {string} publicId - The public ID (folder/filename without extension)
 * @param {object} [options]
 * @param {number} [options.width] - Desired width
 * @param {number} [options.height] - Desired height
 * @param {string} [options.crop] - Crop mode (default: 'fill')
 * @returns {string}
 */
export function cloudinaryUrl(publicId, options = {}) {
  const transforms = ['f_auto', 'q_auto']
  if (options.width) transforms.push(`w_${options.width}`)
  if (options.height) transforms.push(`h_${options.height}`)
  if (options.width || options.height) transforms.push(`c_${options.crop || 'fill'}`)
  return `${BASE_URL}/image/upload/${transforms.join(',')}/${publicId}`
}

/**
 * Build a Cloudinary video URL.
 * @param {string} publicId
 * @returns {string}
 */
export function cloudinaryVideoUrl(publicId) {
  return `${BASE_URL}/video/upload/f_auto,q_auto/${publicId}`
}

/**
 * Get the Cloudinary folder name for a product ID.
 * @param {string} productId
 * @returns {string}
 */
export function getFolderName(productId) {
  return productIdToFolder[productId] || productId
}

/**
 * Get the logo image URL (known path).
 * @returns {string}
 */
export function getLogoImage() {
  return `${BASE_URL}/image/upload/f_auto,q_auto/logo/logo%20original`
}

export default { cloudinaryUrl, cloudinaryVideoUrl, getFolderName, getLogoImage }
