import dotenv from "dotenv";
import axios from "axios";
import ChatbotData from "../models/Data.js";

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Axios config for Groq API
const groqAxiosConfig = () => ({
    headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
    },
    timeout: 15000
});

// ------------------ MAIN HANDLER ------------------
export async function sendMessageToBot(req, res) {
    console.log("[Chatbot] Incoming message...");
    const { message } = req.body;

    if (!GROQ_API_KEY) return res.status(500).json({ error: "GROQ API key missing." });
    if (!message?.trim()) return res.status(400).json({ error: "Message is required." });

    try {
        // 1️⃣ Fetch Zeeshan's portfolio data from MongoDB Atlas
        const dataDoc = await ChatbotData.findOne({}).lean();
        if (!dataDoc) return res.status(404).json({ error: "Portfolio data not found in database." });

        // 2️⃣ Build system prompt for Groq
        const systemPrompt = `
You are Khawaja Zeeshan's personal assistant.
Use ONLY the following data to answer.

return only important answer bbelong to question in maximum two lines, not more then two lines and not generate the answer from other sources just generat from give data."
If question is related to khawaja zeeshan but not the specific detail is not found in data then return the  answer, say: "I don't have specific information about this."
If question is irrelevant or out of context, say: "Sorry, I can't assist about this."
`.trim();

        // 3️⃣ Prepare Groq payload
        const endpoint = "https://api.groq.com/openai/v1/chat/completions";
        const payload = {
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "system", content: `Given Data:\n${JSON.stringify(dataDoc, null, 2)}` },
                { role: "user", content: message }
            ],
            temperature: 0.3
        };

        // 4️⃣ Send to Groq API
        console.log("[Chatbot] Sending request to Groq...");
        const response = await axios.post(endpoint, payload, groqAxiosConfig());
        const reply = response?.data?.choices?.[0]?.message?.content?.trim() || "No reply received.";

        console.log("[Chatbot] Reply from Groq:", reply);

        // 5️⃣ Send response to frontend
        return res.json({ reply, source: "groq" });

    } catch (err) {
        console.error("[Chatbot] Error:", err.message || err);
        return res.status(500).json({ error: "Internal server error." });
    }
}
