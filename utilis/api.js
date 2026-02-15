// // utils/api.js

// require("dotenv").config();
// const { GoogleGenAI } = require("@google/genai");

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const generateAIResponse = async (prompt) => {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: prompt,
//     });

//     return response.text;

//   } catch (error) {
//     console.error("🔥 FULL GEMINI ERROR:", error);
//     throw new Error("AI response failed");
//   }
// };

// module.exports = generateAIResponse;

require("dotenv").config();
// Standard package name aksar @google/generative-ai hota hai
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Gemini AI Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIResponse = async (prompt) => {
  try {
    // 1.5-flash use karein, iski free limit 15 requests per minute hai
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Request bhejna
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;

  } catch (error) {
    // Console mein check karne ke liye detailed log
    console.error("🔥 GEMINI API DETAILS:", error);

    // Agar limit khatam ho gayi ho (Error 429)
    if (error.status === 429 || error.message?.includes("429")) {
      throw new Error("Quota Exceeded: Aaj ki limit khatam ho gayi hai. Kal try karein ya API key badlein.");
    }

    // Baaki kisi bhi error ke liye
    throw new Error("AI response generation mein issue aaya hai.");
  }
};

module.exports = generateAIResponse;