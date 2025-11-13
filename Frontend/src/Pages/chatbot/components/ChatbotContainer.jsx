import React, { useState, useRef, useEffect } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import VoiceChatButton from "./VoiceChatButton";
import { sendMessageToBot } from "../chatbotAPI/chatbotAPI";
import "../styles/chatbot.css"; // make sure to import this

const ChatbotContainer = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { from: "bot", text: "👋 Hi! I’m Zeeshan’s AI assistant. How can I help you ?" }

    ]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (msg) => {
        if (!msg.trim()) return;
        setMessages((prev) => [...prev, { from: "user", text: msg }]);
        setInputValue("");
        setLoading(true);
        try {
            const res = await sendMessageToBot(msg);
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: res?.reply || "Sorry, I didn't get that." }
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "Oops! Something went wrong." }
            ]);
        }
        setLoading(false);
    };

    return (
        <div className="chatbot-modal">
            <div className="chatbot-header">
                <span>Zeeshan's Assistant</span>
                <button className="chatbot-close-btn" onClick={onClose}>
                    <span className="chatbot-close-icon">&times;</span>
                </button>
            </div>

            <ChatMessages
                messages={messages}
                loading={loading}
                messagesEndRef={messagesEndRef}
            />

            <div className="chatbot-input-area">
                <ChatInput
                    onSend={handleSend}
                    disabled={loading}
                    value={inputValue || ""}
                    onChange={(e) => setInputValue(e.target.value || "")}
                >
                    <VoiceChatButton
                        setInputValue={setInputValue}
                        getInputValue={() => inputValue || ""}
                    />
                </ChatInput>
            </div>
        </div>
    );
};

export default ChatbotContainer;
