// scripts/ingest.js
import fs from 'fs/promises'
import path from 'path'
import pdfParse from 'pdf-parse'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'

async function loadDocs() {
  const publicDir = path.resolve(process.cwd(), 'public')
  const files = await fs.readdir(publicDir)
  const texts = []

  for (const file of files) {
    const ext = path.extname(file).toLowerCase()
    const full = path.join(publicDir, file)

    if (ext === '.pdf') {
      // 1) Extraer texto del PDF
      const data = await fs.readFile(full)
      const { text } = await pdfParse(data)
      texts.push({ source: file, content: text })
    }
    else if (ext === '.txt') {
      // 2) Leer TXT crudo
      const txt = await fs.readFile(full, 'utf-8')
      texts.push({ source: file, content: txt })
    }
  }

  return texts
}

async function splitDocs(docs) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  })

  // convertimos a la forma que espera langchain
  const lcDocs = docs.map(d => ({
    pageContent: d.content,
    metadata: { source: d.source }
  }))

  return splitter.splitDocuments(lcDocs)
}

async function main() {
  console.log('📥 Cargando documentos…')
  const rawDocs = await loadDocs()

  console.log(`📝 Fragmentando ${rawDocs.length} documentos…`)
  const chunks = await splitDocs(rawDocs)
  console.log(`✅ Generados ${chunks.length} fragmentos de texto.`)

  // Por ahora solo imprimimos un ejemplo; el siguiente paso es indexar
  console.log('Ejemplo de fragmento:', chunks[0])
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
