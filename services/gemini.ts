
import { GoogleGenAI } from "@google/genai";
import { Message, ImageSize, JournalEntry } from "../types";

export const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not configured. Add it to your .env file.');
  }
  return new GoogleGenAI({ apiKey });
};

export const generateOrnament = async (prompt: string, size: ImageSize): Promise<string | null> => {
  const ai = getGeminiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: `Create a single, beautiful 3D hanging tree ornament. Topic: ${prompt}. The ornament should be magical, intricate, on a plain white background, suitable for a fantasy tree.` }],
      },
      config: {
        imageConfig: { aspectRatio: "1:1", imageSize: size }
      },
    });

    const parts = response?.candidates?.[0]?.content?.parts ?? [];
    for (const part of parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const chatWithSpirit = async (history: Message[], userInput: string, journalEntries: JournalEntry[]): Promise<string> => {
  const ai = getGeminiClient();
  
  // RAG: Trích xuất nội dung nhật ký gần nhất để AI có bối cảnh
  const context = journalEntries.slice(0, 3).map(e => e.content).join("\n");
  
  const geminiHistory = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: geminiHistory,
    config: {
      systemInstruction: `You are the Arboria Spirit. You have access to the user's recent thoughts: "${context}". Use this memory to provide deeply personal, empathetic, and poetic guidance. Always remember what they wrote in their diary to act as a true mentor.`,
    },
  });

  const response = await chat.sendMessage({ message: userInput });
  return response.text || "The winds are quiet now. Tell me more.";
};
