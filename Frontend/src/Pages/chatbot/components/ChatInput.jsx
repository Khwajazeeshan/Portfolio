import React, { useState, useEffect } from "react";

const ChatInput = ({ onSend, disabled, value, onChange, children }) => {
    // Separate responsive states for input and send button
    const [inputSizes, setInputSizes] = useState({ height: 50, fontSize: 16 });
    const [btnSizes, setBtnSizes] = useState({ size: 50, svgSize: 20, marginLeft: 8 });

    useEffect(() => {
        const updateSizes = () => {
            const w = window.innerWidth;

            // Input responsive
            if (w <= 480) setInputSizes({ height: 36, fontSize: 14 });
            else if (w <= 768) setInputSizes({ height: 42, fontSize: 15 });
            else setInputSizes({ height: 50, fontSize: 16 });

            // Button responsive
            if (w <= 480) setBtnSizes({ size: 40, svgSize: 18, marginLeft: 4 });
            else if (w <= 768) setBtnSizes({ size: 42, svgSize: 18, marginLeft: 7 });
            else setBtnSizes({ size: 50, svgSize: 20, marginLeft: 8 });
        };

        updateSizes();
        window.addEventListener("resize", updateSizes);
        return () => window.removeEventListener("resize", updateSizes);
    }, []);

    const inputStyle = {
        flex: 1,
        height: inputSizes.height,
        fontSize: inputSizes.fontSize,
        borderRadius: 16,
        padding: "0 16px",
        border: "none",
        outline: "none",
        marginRight: 4,
    };

    const sendBtnStyle = {
        background: "linear-gradient(#ff4500, #ffb300, #ff4500)",
        border: "none",
        borderRadius: "50%",
        padding: "1px 6px",
        width: btnSizes.size,
        height: btnSizes.size,
        marginLeft: btnSizes.marginLeft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
    };

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                disabled={disabled}
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && onSend(value)}
                placeholder="Type your message..."
            />
            {children}
            <button
                onClick={() => onSend(value)}
                disabled={disabled}
                style={sendBtnStyle}
                title="Send"
                type="button"
            >
                <svg width={btnSizes.svgSize} height={btnSizes.svgSize} fill="#fff" viewBox="0 0 24 24">
                    <path d="M2 21l21-9-21-9v7l15 2-15 2z" />
                </svg>
            </button>
        </div>
    );
};

export default ChatInput;
