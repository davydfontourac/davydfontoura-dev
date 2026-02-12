import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const targetDirs = [
  path.join(rootDir, 'public', 'images'),
  path.join(rootDir, 'src', 'assets')
]

const supportedExtensions = new Set(['.png', '.jpg', '.jpeg'])

const walkDir = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      files.push(...await walkDir(fullPath))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

const shouldSkip = async (inputPath, outputPath) => {
  try {
    const [inputStat, outputStat] = await Promise.all([
      fs.stat(inputPath),
      fs.stat(outputPath)
    ])

    return outputStat.mtimeMs >= inputStat.mtimeMs
  } catch {
    return false
  }
}

const convertToWebp = async (inputPath) => {
  const ext = path.extname(inputPath).toLowerCase()
  if (!supportedExtensions.has(ext)) return null

  const outputPath = inputPath.replace(ext, '.webp')
  if (await shouldSkip(inputPath, outputPath)) return null

  await sharp(inputPath)
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath)

  return outputPath
}

const run = async () => {
  const results = []

  for (const dir of targetDirs) {
    try {
      const files = await walkDir(dir)
      for (const file of files) {
        const output = await convertToWebp(file)
        if (output) {
          results.push({ input: file, output })
        }
      }
    } catch (error) {
      console.error(`Falha ao processar ${dir}:`, error)
      process.exitCode = 1
    }
  }

  if (results.length) {
    console.log(`✅ WebP gerados: ${results.length}`)
  } else {
    console.log('ℹ️ Nenhuma imagem precisou ser convertida')
  }
}

run()
