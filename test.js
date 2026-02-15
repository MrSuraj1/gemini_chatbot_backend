require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",   // 👈 EXACT model name
      contents: "Hello bhai kaise ho?",
    });

    console.log(response.text);

  } catch (error) {
    console.error("FULL ERROR:", error);
  }
}

run();
