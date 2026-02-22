/**
 * Script para converter arquivos HEIC para PNG e imagens do pórtico (e outras) para PNG
 * Uso: npm run convert-heic
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagensDir = path.join(__dirname, '../src/imagens')

const NON_PNG_EXTENSIONS = ['.heic', '.heif', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']

/**
 * Encontra todos os arquivos HEIC recursivamente
 */
function findHeicFiles(dir) {
  const files = []
  
  try {
    if (!fs.existsSync(dir)) {
      return files
    }
    
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory()) {
        files.push(...findHeicFiles(fullPath))
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase()
        if (ext === '.heic' || ext === '.heif') {
          files.push(fullPath)
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao ler diretório ${dir}:`, error.message)
  }
  
  return files
}

/**
 * Encontra arquivos de imagem que não são PNG (para converter para PNG)
 * Inclui pastas específicas como portico_de_entrada e todas as subpastas de imagens
 */
function findNonPngImageFiles(dir) {
  const files = []
  
  try {
    if (!fs.existsSync(dir)) {
      return files
    }
    
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory()) {
        files.push(...findNonPngImageFiles(fullPath))
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase()
        // Converte para PNG apenas formatos que o sharp converte bem (HEIC já tratado acima)
        if (['.jpg', '.jpeg', '.webp', '.gif', '.bmp'].includes(ext)) {
          files.push(fullPath)
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao ler diretório ${dir}:`, error.message)
  }
  
  return files
}

/**
 * Converte HEIC para PNG usando sharp (se disponível)
 */
async function convertWithSharp(heicPath) {
  try {
    const sharp = await import('sharp').catch(() => null)
    if (!sharp) {
      return false
    }
    
    const outputPath = heicPath.replace(/\.heic$/i, '.png').replace(/\.heif$/i, '.png')
    await sharp.default(heicPath).png().toFile(outputPath)
    console.log(`✅ Convertido: ${path.basename(heicPath)} → ${path.basename(outputPath)}`)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Converte usando heic-convert (se disponível)
 */
async function convertWithHeicConvert(heicPath) {
  try {
    const heicConvert = await import('heic-convert').catch(() => null)
    if (!heicConvert) {
      return false
    }
    
    const inputBuffer = fs.readFileSync(heicPath)
    const outputBuffer = await heicConvert.default({
      buffer: inputBuffer,
      format: 'PNG',
      quality: 0.92
    })
    
    const outputPath = heicPath.replace(/\.heic$/i, '.png').replace(/\.heif$/i, '.png')
    fs.writeFileSync(outputPath, outputBuffer)
    console.log(`✅ Convertido: ${path.basename(heicPath)} → ${path.basename(outputPath)}`)
    return true
  } catch (error) {
    return false
  }
}

/**
 * Converte qualquer imagem (JPG, WEBP, etc.) para PNG usando sharp
 */
async function convertToPngWithSharp(inputPath) {
  try {
    const sharp = await import('sharp').catch(() => null)
    if (!sharp) {
      return false
    }
    const ext = path.extname(inputPath).toLowerCase()
    if (ext === '.png') return true
    const outputPath = path.join(path.dirname(inputPath), path.basename(inputPath, ext) + '.png')
    await sharp.default(inputPath).png().toFile(outputPath)
    console.log(`✅ Convertido: ${path.basename(inputPath)} → ${path.basename(outputPath)}`)
    try {
      fs.unlinkSync(inputPath)
    } catch (_) {}
    return true
  } catch (error) {
    return false
  }
}

// ========== 1. Conversão HEIC → PNG ==========
console.log('🔍 Procurando arquivos HEIC em:', imagensDir)
console.log('')

const heicFiles = findHeicFiles(imagensDir)

if (heicFiles.length > 0) {
  console.log(`📸 Encontrados ${heicFiles.length} arquivo(s) HEIC:\n`)
  for (const file of heicFiles) {
    const relativePath = path.relative(imagensDir, file)
    const stats = fs.statSync(file)
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
    console.log(`  - ${relativePath} (${sizeMB} MB)`)
  }
  console.log('\n🔄 Convertendo HEIC...\n')
  let converted = 0
  let failed = 0
  for (const heicFile of heicFiles) {
    let success = await convertWithSharp(heicFile)
    if (!success) success = await convertWithHeicConvert(heicFile)
    if (success) converted++
    else {
      failed++
      console.log(`❌ Falha: ${path.relative(imagensDir, heicFile)}`)
    }
  }
  console.log(`HEIC: ✅ ${converted} convertidos, ❌ ${failed} falhas`)
} else {
  console.log('✅ Nenhum arquivo HEIC encontrado.')
}

// ========== 2. Conversão outras imagens (ex.: pórtico) → PNG ==========
console.log('\n🔍 Procurando imagens não-PNG (portico_de_entrada e demais pastas)...\n')

const nonPngFiles = findNonPngImageFiles(imagensDir)

if (nonPngFiles.length > 0) {
  console.log(`📸 Encontrados ${nonPngFiles.length} arquivo(s) para converter para PNG:\n`)
  for (const file of nonPngFiles) {
    console.log(`  - ${path.relative(imagensDir, file)}`)
  }
  console.log('\n🔄 Convertendo para PNG...\n')
  let toPngOk = 0
  let toPngFail = 0
  for (const file of nonPngFiles) {
    const success = await convertToPngWithSharp(file)
    if (success) toPngOk++
    else {
      toPngFail++
      console.log(`❌ Falha ao converter para PNG: ${path.relative(imagensDir, file)}`)
    }
  }
  console.log(`PNG: ✅ ${toPngOk} convertidos, ❌ ${toPngFail} falhas`)
} else {
  console.log('✅ Nenhuma imagem não-PNG para converter.')
}

console.log('\n' + '='.repeat(50))
console.log('Concluído.')

if (nonPngFiles.length > 0 || heicFiles.length > 0) {
  console.log('\n💡 Dica: arquivos originais não-PNG foram substituídos pelos PNG quando a conversão teve sucesso.')
}
