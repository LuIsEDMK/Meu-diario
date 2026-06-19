import sharp from 'sharp'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const assetsDir = path.join(__dirname, 'assets')
const pngSourcePath = path.join(assetsDir, 'icon.png')
const png512Path = path.join(assetsDir, 'icon@2x.png')
const icoPath = path.join(assetsDir, 'icon.ico')

async function pngToIco(sourcePath, outputPath) {
  const sizes = [16, 32, 48, 256]
  const pngBuffers = []

  for (const size of sizes) {
    const buf = await sharp(sourcePath)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    pngBuffers.push({ size, buf })
  }

  const count = pngBuffers.length
  const headerSize = 6
  const entrySize = 16
  const dataOffset = headerSize + entrySize * count

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const entries = []
  const images = []
  let offset = dataOffset

  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(entrySize)
    entry.writeUInt8(size === 256 ? 0 : size, 0)
    entry.writeUInt8(size === 256 ? 0 : size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(buf.length, 8)
    entry.writeUInt32LE(offset, 12)
    entries.push(entry)
    images.push(buf)
    offset += buf.length
  }

  fs.writeFileSync(outputPath, Buffer.concat([header, ...entries, ...images]))
}

async function generateIcons() {
  try {
    console.log('Gerando PNG 512x512...')
    await sharp(pngSourcePath)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255 } })
      .png()
      .toFile(png512Path)
    console.log('✓ PNG 512x512 criado:', png512Path)

    console.log('Gerando ICO (16, 32, 48, 256px)...')
    await pngToIco(pngSourcePath, icoPath)
    console.log('✓ ICO criado:', icoPath)

    console.log('\n✓ Ícones gerados com sucesso!')
    console.log('Aplicativo pronto!')
  } catch (error) {
    console.error('Erro ao gerar ícones:', error.message)
    process.exit(1)
  }
}

generateIcons()
