// import API from "../../utils/axios";
// import { API_BASE_URL } from "../../../config/apiconfig";

export const sendMessageToBot = async (message) => {
    // Replace with your actual backend URL
    const API_BASE_URL = "http://localhost:5000"; // Example URL
    try {
        const response = await fetch(`${API_BASE_URL}/api/chatbot/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        // Try to parse JSON body even for non-OK responses
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Chatbot API error:", response.status, data || response.statusText);
            // Return the parsed error object when available for frontend handling
            return { error: data?.error || data?.message || `Request failed with status ${response.status}` };
        }

        console.log("Response from chatbot API:", data); // Debugging line
        // No changes needed unless you want to handle the new response format
        // The backend now returns { answer: "..." } on success
        return data;
    } catch (err) {
        console.error("Network or parsing error calling chatbot API:", err);
        return { error: err.message || "Network error" };
    }
};