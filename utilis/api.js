require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateAIResponse = async (prompt) => {
  try {
    // Model name check: "gemini-1.5-flash" (Latest stable)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Request format: Prompt ko parts mein bhejna zyada stable hota hai
    const result = await model.generateContent(prompt);
    
    // Response handle karne ka naya tarika
    const response = result.response;
    const text = response.text();

    if (!text) {
        throw new Error("Empty AI response");
    }

    return text;

  } catch (error) {
    console.error("🔥 GEMINI API DETAILS:", error);

    // Rate limit handling
    if (error.status === 429) {
      throw new Error("Quota Exceeded: Kal try karein.");
    }
    
    // Model not found ya authentication issue
    if (error.status === 404) {
        throw new Error("Model Not Found: Model name ya API key check karein.");
    }

    throw new Error("AI response failed");
  }
};

module.exports = generateAIResponse;