import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-socials">
                <a
                    href="https://www.facebook.com/share/1P3u7eqgJM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                >
                    <FaFacebook />
                </a>

                <a
                    href="https://www.instagram.com/khawaja.zeeshan_?igsh=MThtcnRwN2J3bWNscw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                >
                    <FaInstagram />
                </a>

                <a
                    href="https://github.com/Khwajazeeshan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                >
                    <FaGithub />
                </a>

                <a
                    href="https://www.linkedin.com/in/khawaja-zeeshan-11a912323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-icon"
                >
                    <FaLinkedin />
                </a>
            </div>

            <div className="footer-text">
                <p>© Khawaja Zeeshan | All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
