// utils/api.js

require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("🔥 FULL GEMINI ERROR:", error);
    throw new Error("AI response failed");
  }
};

module.exports = generateAIResponse;

// require("dotenv").config();

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const generateAIResponse = async (prompt) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return text;

//   } catch (error) {
//     // Console mein check karne ke liye detailed log
//     console.error("🔥 GEMINI API DETAILS:", error);

//     // Agar limit khatam ho gayi ho (Error 429)
//     if (error.status === 429 || error.message?.includes("429")) {
//       throw new Error("Quota Exceeded: Aaj ki limit khatam ho gayi hai. Kal try karein ya API key badlein.");
//     }

//     throw new Error("AI response generation mein issue aaya hai.");
//   }
// };

// module.exports = generateAIResponse;