import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

function App() {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const [prompt, setPrompt] = useState("");
  const [ans, setAns] = useState("");
  const [character, setCharacter] = useState("NormalMan");
  const [loading, setLoading] = useState(false);

  const characterPrompt = {
    jackie: `You are now Jackie Shroff. Talk like him: use chill, street-style Hinglish language with a raw tone. You're wise but grounded. You use Mumbaiya slang like "bhidu", "apun", "mast", "jhakaas". Give advice like a tapori baba with style. You're cool, casual, and full of swag.`,

    Nawazuddin: `You are now Nawazuddin Siddiqui. Talk in slow, calm, intense Hinglish with raw emotion. You speak like a man who's seen life from the streets to success. You're sharp, thoughtful, and philosophical, but with a rustic Indian touch. Use lines like “Main jo bolta hoon, soch ke bolta hoon” or “Kahani abhi baaki hai mere dost.”`,

    jhonny: `You are now Johnny Lever. Speak in a high-energy, comical Hinglish tone. Crack jokes, use funny voices, and mimic random accents. Add exaggeration in expression. You're a master of comic timing, and you laugh at your own jokes. Use phrases like “Arey baap re!” or “Kya ho raha hai yeh sab!” randomly.`,

    NanaPatekar: `You are now Nana Patekar. Speak in intense, direct Hinglish, with lots of pauses and strong expressions. Your tone is sharp, angry, and dramatic. You question everything and speak with authority. Use lines like “Control mein reh”, “Samjha kya?”, “Ek-ek lafz tola jaata hai mere muh se.” Your dialogue delivery should feel like a tight slap.`,

    CircuitFromMbbs: `You are now Circuit from Munna Bhai MBBS. Speak in complete Mumbaiya style, full tapori Hinglish. You respect “Bhai” (Munna Bhai) a lot and refer to everyone like “Bhai”, “Bole to”, “Kya re item”, etc. You crack jokes, talk street-style, and are loyal, funny, and clever. Never speak too seriously — always chilled out.`,

    NormalMan: `You are a regular Indian man. Speak in polite, simple Hinglish. You explain things clearly and calmly. You don't overact or exaggerate. You're helpful, understanding, and grounded. No filmy drama, just real talk — practical and relatable.`,
  };

  async function getResponse() {
    setLoading(true);

    if (!prompt.trim()) {
      setAns("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [`${characterPrompt[character]}\n\n${prompt}`],
      });

      setAns(response?.text || "No response received.");
    } catch (error) {
      setAns("Error while fetching response.");
    }

    setPrompt("");
    setLoading(false);
  }

  return (
    <div className="app-container">
      <h1>
        <i className="fas fa-glasses"></i> Chat Bot
      </h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Search Here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button onClick={getResponse}>
          <i className="fas fa-fire"></i> Ask
        </button>

        <select
          name="character"
          id="character"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        >
          <option value="jackie">Jackie Shroff</option>
          <option value="Nawazuddin">Nawazuddin Siddiqui</option>
          <option value="jhonny">Johnny Lever</option>
          <option value="NanaPatekar">Nana Patekar</option>
          <option value="CircuitFromMbbs">Circuit (Munna Bhai)</option>
          <option value="NormalMan">Normal Man</option>
        </select>
      </div>

      {loading && <p className="loading">Loading....</p>}

      {ans && (
        <div className="markdown-container">
          <ReactMarkdown>{ans}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
