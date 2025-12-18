
import { GoogleGenAI } from "@google/genai";

// Guideline: Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCopilotResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are Microsoft Copilot running on Windows 12. You are helpful, friendly, and concise. Format your answers in clean Markdown. You have deep knowledge of the Windows ecosystem.",
        temperature: 0.7,
      },
    });
    // Guideline: response.text is a property, not a method
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now. Please check your internet connection.";
  }
};

export const getWeatherInfo = async (city: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide current weather for ${city}. Include temperature in Celsius, condition (sunny, rainy, etc.), and a short recommendation for the day. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    // Guideline: response.text is a property, not a method
    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    return { temperature: '--', condition: 'Unknown', recommendation: 'Stay safe!' };
  }
};
