import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiResponse = async (prompt: string, history: { role: string, parts: { text: string }[] }[] = []) => {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are the Casas Fabrick Support Assistant. You help clients and site managers with construction project information, architectural advice, and general support. Be professional, concise, and helpful.",
    },
  });

  // For chat history, we need to map it correctly
  // But for a simple call, we can just use sendMessage
  const response = await chat.sendMessage({ message: prompt });
  return response.text;
};

export const getMapsGroundingResponse = async (query: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
    config: {
      tools: [{ googleMaps: {} }],
    },
  });

  return {
    text: response.text,
    groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
