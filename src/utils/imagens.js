/**
 * Utilitário de imagens por pasta (estrutura do projeto).
 * Cada pasta em src/imagens corresponde a um produto ou seção (logo, equipe).
 * Pasta "contato" é ignorada.
 */

// Suporta múltiplos formatos de imagem incluindo HEIC para compatibilidade
const modules = import.meta.glob('../imagens/**/*.{png,jpg,jpeg,webp,svg,gif,bmp,heic,HEIC,JPG,JPEG,WEBP,SVG,GIF,BMP}', { as: 'url', eager: true })

/**
 * Agrupa módulos por nome da pasta (primeiro nível dentro de imagens).
 * Retorna { [folderName]: [url1, url2, ...] } com URLs ordenadas por nome do arquivo.
 * Ignora pasta "contato".
 */
function getImagesByFolder() {
  const byFolder = {}
  for (const path of Object.keys(modules)) {
    const parts = path.replace(/^\.\.\//, '').split('/')
    const imagensIndex = parts.indexOf('imagens')
    if (imagensIndex === -1 || imagensIndex === parts.length - 1) continue
    const folderName = parts[imagensIndex + 1]
    if (folderName === 'contato') continue
    const url = modules[path]
    if (!url) continue
    if (!byFolder[folderName]) byFolder[folderName] = []
    const fileName = parts[parts.length - 1]
    byFolder[folderName].push({ url, fileName })
  }
  for (const folder of Object.keys(byFolder)) {
    byFolder[folder].sort((a, b) => a.fileName.localeCompare(b.fileName))
    byFolder[folder] = byFolder[folder].map((x) => x.url)
  }
  return byFolder
}

const byFolder = getImagesByFolder()

/**
 * Mapeamento: productId -> pasta de imagens (quando o nome da pasta é diferente do id do produto)
 */
const productIdToFolder = {
  tenda_box_truss_9x6: 'tenda_9x6_lona_box_struss'
}

/**
 * Retorna array de URLs das imagens do produto (pasta com nome = id do produto ou mapeada).
 * Mesma pasta para listagem e página de detalhes.
 * @param {string} productId - ID do produto (nome da pasta)
 * @returns {string[]}
 */
export function getProductImages(productId) {
  if (!productId) return []
  const folderName = productIdToFolder[productId] || productId
  const urls = byFolder[folderName]
  return Array.isArray(urls) ? [...urls] : []
}

/**
 * Retorna a primeira imagem do produto (para listagem). Fallback opcional.
 * @param {string} productId - ID do produto
 * @param {string} [fallbackUrl] - URL se não houver imagens na pasta
 * @returns {string|null}
 */
export function getProductFirstImage(productId, fallbackUrl) {
  const urls = getProductImages(productId)
  if (urls.length > 0) return urls[0]
  return fallbackUrl || null
}

/**
 * Retorna a URL da logo institucional (pasta "logo"). Uma única imagem, sem carrossel.
 * @returns {string|null}
 */
export function getLogoImage() {
  const urls = byFolder.logo
  return Array.isArray(urls) && urls.length > 0 ? urls[0] : null
}

/**
 * Retorna array de URLs das fotos da equipe (pasta "equipe") para a página Sobre.
 * @returns {string[]}
 */
export function getEquipeImages() {
  const urls = byFolder.equipe
  return Array.isArray(urls) ? [...urls] : []
}

/**
 * Retorna array de URLs das imagens de cases (pasta "cases").
 * @returns {string[]}
 */
export function getCasesImages() {
  const urls = byFolder.cases
  return Array.isArray(urls) ? [...urls] : []
}

export default { getProductImages, getProductFirstImage, getLogoImage, getEquipeImages, getCasesImages }
