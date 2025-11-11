// scripts/index.ts
import { config } from 'dotenv'
import { OpenAIEmbeddings } from 'langchain/embeddings'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { prepareFragments } from './ingest.js'

config()  // carga OPENAI_API_KEY, VITE_OPENAI_API_KEY

async function main() {
  try {
    // 1) Lee y fragmenta tus PDFs/TXTs
    const docs = await prepareFragments()
    console.log(`📦 Preparados ${docs.length} fragmentos para indexar.`)

    // 2) Genera embeddings y crea un store en memoria
    const embeddings = new OpenAIEmbeddings()
    const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings)

    console.log('✅ VectorStore en memoria creado con éxito.')

    // 3) (Opcional) Para persistirlo a disco:
    //    await vectorStore.save('vectorstore.json')
    //
    //    Y luego para recargar:
    //    const reloaded = await MemoryVectorStore.load(embeddings, 'vectorstore.json')

  } catch (error) {
    console.error('❌ Error en index.ts:', error)
    process.exit(1)
  }
}

main()
