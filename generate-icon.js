// Converter SVG para ICO usando Sharp (alternativa: usar ferramentas online)
// Este arquivo gera um ícone .ico para o app Windows

const fs = require('fs')
const path = require('path')

// ICO com base 64 mínimo (para teste - usar conversor real para produção)
// Aqui vou criar um ícone .ico simples em hexadecimal

const icoHex = Buffer.from([
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x20, 0x20,
  0x00, 0x00, 0x01, 0x00, 0x20, 0x00, 0xA8, 0x08,
  0x00, 0x00, 0x16, 0x00, 0x00, 0x00, 0x28, 0x00,
  0x00, 0x00, 0x20, 0x00, 0x00, 0x00, 0x40, 0x00,
  0x00, 0x00, 0x01, 0x00, 0x20, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x08, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  // ... dados RGBA do ícone
])

// Para Windows, é melhor usar uma imagem PNG e converter
// Vou usar um ícone gerado via código que é simples

const createWindowsIcon = () => {
  const svgPath = path.join(__dirname, 'assets', 'icon.svg')
  const icoPath = path.join(__dirname, 'assets', 'icon.ico')
  
  // Se você tiver ImageMagick ou Sharp instalado, descomente:
  // const sharp = require('sharp')
  // sharp(svgPath).resize(256, 256).toFile(icoPath)
  
  console.log('Para gerar .ico no Windows:')
  console.log('1. Use https://convertio.co/pt/svg-ico/')
  console.log('2. Upload: assets/icon.svg')
  console.log('3. Download como icon.ico')
  console.log('4. Cole em: assets/icon.ico')
}

createWindowsIcon()
