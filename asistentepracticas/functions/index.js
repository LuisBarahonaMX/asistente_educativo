// functions/index.js
const functions = require("firebase-functions");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

// Inicializa OpenAI con la clave almacenada en Firebase Config
const client = new OpenAI({
  apiKey: functions.config().openai.key,
});

// Ruta del archivo de conocimiento (RAG)
const infoPath = path.join(__dirname, "infpracticas.txt");
const infoData = fs.existsSync(infoPath)
  ? fs.readFileSync(infoPath, "utf8")
  : "Información de prácticas no disponible.";

exports.api = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(204).send("");

  try {
    const { question } = req.body || {};
    if (!question) return res.status(400).json({ answer: "Falta la pregunta." });

    // Llamada a OpenAI con contexto
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: `
      Eres el Asistente Virtual de Prácticas Profesionales.
      Usa la siguiente información para responder de forma clara y útil:
      ${infoData}

      Pregunta del estudiante: ${question}
      `,
    });

    const answer = completion.output[0].content[0].text;
    res.json({ answer });
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ error: error.message });
  }
});
