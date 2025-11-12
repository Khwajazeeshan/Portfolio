import data from "../../../Data/Data.json"; // adjust path

export const sendMessageToBot = async (userMessage) => {
    try {
        const response = await fetch("/api/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage, data })
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return { reply: "Oops! Something went wrong." };
    }
};
