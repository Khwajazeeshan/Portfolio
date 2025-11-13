import React, { useEffect, forwardRef } from "react";
import "./Contact.css";
import { FaMapMarkerAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Contact = forwardRef(({ onComplete }, ref) => {
    // ✅ Trigger callback after short delay (optional)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500); // Adjust timing if needed
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div ref={ref} className="contact-section">
            <h2 className="contact-title">Contact Me</h2>

            <div className="contact-card">
                <div className="contact-box">
                    <FaMapMarkerAlt className="contact-icon" />
                    <span className="contact-text">
                        <a href="https://maps.app.goo.gl/PkvLotjvgrD53nYe7" target="_blank" rel="noopener noreferrer">
                            Muzaffarabad, AJK, Pakistan
                        </a>
                    </span>
                </div>

                <div className="contact-box">
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:khawajazeeshan500@gmail.com" className="contact-link">
                        khawajazeeshan500@gmail.com
                    </a>
                </div>

                <div className="contact-box">
                    <FaWhatsapp className="contact-icon" />
                    <a href="https://wa.me/923488471193" target="_blank" rel="noopener noreferrer" className="contact-link">
                        +92 348 8471193
                    </a>
                </div>
            </div>
        </div>
    );
});

export default Contact;
