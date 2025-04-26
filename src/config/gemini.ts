import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

// Hindari NEXT_PUBLIC_ untuk API key
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// Tambahkan pengecekan API key
if (!apiKey) {
  console.error("API key for Gemini is missing");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function generateChat(prompt: string) {
  const systemInstruction = "Anda adalah asisten AI yang cerdas dan membantu, memberikan jawaban detail dan informatif.";

  try {
    // Validasi input
    if (!prompt || !prompt.trim()) {
      return "Prompt tidak boleh kosong";
    }

    console.log("Starting chat with prompt:", prompt.substring(0, 50) + "...");
    
    const chatSession = model.startChat({
      generationConfig,
      history: [],
      systemInstruction
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
  
    console.log("Sending message to Gemini API...");
    // const result = await chatSession.sendMessage(prompt);
    console.log("Response received from API");
    
    if (!response?.candidates || response.candidates.length === 0) {
      console.error("No candidates in response");
      return "Maaf, saya tidak dapat menghasilkan respons saat ini.";
    }
    
    const candidate = response.candidates[0];
    
    if (!candidate.content?.parts || candidate.content.parts.length === 0) {
      console.error("No content parts in candidate");
      return "Maaf, respons tidak memiliki konten yang valid.";
    }

    // Langsung ambil part pertama dari kandidat pertama
    return candidate.content.parts[0].text || "";
    
  } catch (error:any) {
    // Tambahkan logging yang lebih detail
    console.error("Error details:", error);
    
    if (error.message && error.message.includes("API key")) {
      return "Terjadi masalah dengan API key. Silakan periksa konfigurasi.";
    }
    
    if (error.message && error.message.includes("fetch failed")) {
      return "Gagal terhubung ke API Gemini. Periksa koneksi internet server Anda.";
    }

    return `Terjadi kesalahan: ${error.message || "Unknown error"}`;
  }
}