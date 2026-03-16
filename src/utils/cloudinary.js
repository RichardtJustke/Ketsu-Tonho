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
 * Global blacklist of images to never show (e.g. pool image for 10x10)
 */
export const GLOBAL_BLACKLIST = ['3ADFC19E4009C6F885C2']

/**
 * Force specific images at the top for some products
 */
export const PRODUCT_PRIORITY_IMAGES = {
  tenda_branca_10x10: [
    'https://res.cloudinary.com/dqvldq2ku/image/upload/v1772154941/Tenda_10x10_branca_1-1920w_qxjkbg.jpg'
  ]
}

/**
 * Filter and sort images list based on blacklist and priorities
 */
export function filterAndOrderImages(productId, urls) {
  if (!urls) return []
  // Filter out blacklisted ones
  let filtered = urls.filter(url => !GLOBAL_BLACKLIST.some(key => url.includes(key)))

  // Add/Promote priority ones
  const priorities = PRODUCT_PRIORITY_IMAGES[productId] || []
  priorities.forEach(pUrl => {
    // If not in list, add it at the start. If in list, move to start
    filtered = [pUrl, ...filtered.filter(u => u !== pUrl)]
  })

  return filtered
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

export default { cloudinaryUrl, cloudinaryVideoUrl, getFolderName, getLogoImage, filterAndOrderImages, GLOBAL_BLACKLIST }
