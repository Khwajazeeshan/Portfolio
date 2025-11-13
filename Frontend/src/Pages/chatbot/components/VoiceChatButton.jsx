import React, { useState, useRef, useEffect } from "react";

const VoiceChatButton = ({ setInputValue }) => {
    const [listening, setListening] = useState(false);
    const [size, setSize] = useState({ width: 48, height: 48, marginLeft: 12, svgSize: 24 });
    const recognitionRef = useRef(null);

    // Handle responsiveness
    useEffect(() => {
        const updateSize = () => {
            const w = window.innerWidth;
            if (w <= 480) {
                setSize({ width: 80, height: 40, marginLeft: 1, svgSize: 19 });
            } else if (w <= 768) {
                setSize({ width: 42, height: 42, marginLeft: 10, svgSize: 20 });
            } else {
                setSize({ width: 48, height: 48, marginLeft: 12, svgSize: 24 });
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Initialize speech recognition
    useEffect(() => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (setInputValue) setInputValue(prev => (prev ? prev + " " : "") + transcript);
        };

        recognitionRef.current.onstart = () => setListening(true);
        recognitionRef.current.onerror = () => setListening(false);
        recognitionRef.current.onend = () => setTimeout(() => setListening(false), 100);

        return () => recognitionRef.current?.abort();
    }, []);

    const handleVoiceClick = () => {
        if (!recognitionRef.current) return;
        listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    };

    return (
        <button
            onClick={handleVoiceClick}
            style={{
                background: listening ? "#ffb300" : "#fff",
                border: "none",
                borderRadius: "50%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                width: size.width,
                height: size.height,
                marginLeft: size.marginLeft,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s"
            }}
            title={listening ? "Stop voice chat" : "Start voice chat"}
        >
            {listening ? (
                <span
                    style={{
                        width: size.svgSize,
                        height: size.svgSize,
                        border: "3px solid #fff",
                        borderTop: "3px solid #ff4500",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}
                />
            ) : (
                <svg
                    width={size.svgSize}
                    height={size.svgSize}
                    fill="#333"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a1 1 0 1 1 2 0 7 7 0 0 1-6 6.92V21a1 1 0 1 1-2 0v-2.08A7 7 0 0 1 5 12a1 1 0 1 1 2 0 5 5 0 0 0 10 0z" />
                </svg>
            )}
            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
        </button>
    );
};

export default VoiceChatButton;
