import React, { useState, useRef, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

// 🔗 Detecta entorno automáticamente
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5010/asistentep-9f276/us-central1/api"
    : "https://us-central1-asistentep-9f276.cloudfunctions.net/api";


function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [narratorEnabled, setNarratorEnabled] = useState(true);
  const inputRef = useRef();

  // 🔐 Autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      alert(`Error en login: ${err.code} - ${err.message}`);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // ✍️ Limpia formato de markdown en la respuesta
  const renderAnswer = (text) => {
    if (!text) return "";
    let safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let plain = safe
      .replace(/!\[[^\]]*?\]\([^)]+?\)/g, "")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1 ($2)")
      .replace(/```/g, "")
      .replace(/\*\*\*(.+?)\*\*\*/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/___(.+?)___/g, "$1")
      .replace(/__(.+?)__/g, "$1")
      .replace(/_(.+?)_/g, "$1")
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/^>\s?/gm, "")
      .replace(/^\s*[-*]\s+/gm, "• ");
    plain = plain.replace(
      /(https?:\/\/[^\s)]+[^\s.,;:)"\]])/gi,
      (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
    return plain.replace(/\n/g, "<br/>");
  };

  // 💬 Enviar pregunta al backend
  const handleAsk = async () => {
    if (!question.trim()) return;
    setError("");
    setAnswer("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      }

      const data = await response.json();
      setAnswer(data.answer || "");

      // 🔊 Reproducción por voz
      if (narratorEnabled && "speechSynthesis" in window && data.answer) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(data.answer);
        utter.lang = "es-MX";
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      console.error("❌ Error al procesar la pregunta:", err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAsk();
  };

  // 🎤 Reconocimiento de voz
  const handleSpeak = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tu navegador no soporta reconocimiento de voz");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "es-MX";
    recognition.start();
    recognition.onresult = (event) =>
      setQuestion(event.results[0][0].transcript);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {!user ? (
          <>
            <div className="orb-wrap" aria-hidden="true">
              <div className="orb"></div>
              <div className="orb-shadow"></div>
            </div>
            <h2>Acceso restringido</h2>
            <p>Inicia sesión con tu cuenta de Google para usar el asistente.</p>
            <button className="btn-login" onClick={handleLogin}>
              Iniciar sesión con Google
            </button>
          </>
        ) : (
          <>
            <div className="orb-wrap" aria-hidden="true">
              <div className="orb"></div>
              <div className="orb-shadow"></div>
            </div>

            <h1>Asistente de Prácticas</h1>
            <p>
              Bienvenido, {user.displayName} ({user.email})
            </p>
            <button className="btn-logout" onClick={handleLogout}>
              Cerrar sesión
            </button>

            <form onSubmit={handleSubmit} className="form-container">
              <input
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Escribe tu consulta..."
              />
              <div className="form-buttons">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Enviando…" : "Enviar"}
                </button>
                <button
                  type="button"
                  onClick={handleSpeak}
                  disabled={loading}
                  className="btn-secondary"
                >
                  Hablar
                </button>
              </div>
            </form>

            <div className="voice-buttons">
              <button
                type="button"
                className={`btn-voice ${!narratorEnabled ? "active-off" : ""}`}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setNarratorEnabled(false);
                }}
              >
                OFF VOZ
              </button>
              <button
                type="button"
                className={`btn-voice ${narratorEnabled ? "active-on" : ""}`}
                onClick={() => setNarratorEnabled(true)}
              >
                ON VOZ
              </button>
            </div>

            <h2>Respuesta:</h2>
            {error ? (
              <p style={{ color: "red", maxWidth: 600 }}>{error}</p>
            ) : (
              <div
                className="answer-box"
                dangerouslySetInnerHTML={{ __html: renderAnswer(answer) }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
