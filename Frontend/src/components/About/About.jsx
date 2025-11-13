import React, { useEffect, useState, forwardRef } from "react";
import "./About.css";

const About = forwardRef(({ onComplete }, ref) => {
    const introWords = ["Hi 👋,", "I'm"];
    const nameLetters = ["K", "h", "a", "w", "a", "j", "a", " ", "Z", "e", "e", "s", "h", "a", "n"];
    const descriptionLines = [
        "A MERN Stack Developer dedicated to building modern, high-performance, and user-centric web applications.",
        "I hold a BS in Computer Science from the University of Azad Jammu and Kashmir, where I built a strong foundation in web technologies, UI/UX design, and real-time development.",
        "My work combines technology and creativity — crafting elegant, functional, and meaningful digital experiences.",
    ];

    const [showIntro, setShowIntro] = useState(false);
    const [showName, setShowName] = useState(false);
    const [visibleLines, setVisibleLines] = useState([]);
    const [profileLoaded, setProfileLoaded] = useState(false); // ✅ For fade-in

    useEffect(() => {
        let hasAnimated = false;

        if (!hasAnimated) {
            hasAnimated = true;

            const introTimer = setTimeout(() => setShowIntro(true), 500);
            const nameTimer = setTimeout(() => setShowName(true), 1500);

            const lineTimers = descriptionLines.map((_, i) =>
                setTimeout(() => {
                    setVisibleLines((prev) => {
                        if (!prev.includes(i)) return [...prev, i]; 
                        return prev;
                    });
                }, 3000 + i * 500)
            );

            const completeTimer = setTimeout(() => {
                if (onComplete) onComplete();
            }, 3000 + descriptionLines.length * 500 + 800);

            return () => {
                clearTimeout(introTimer);
                clearTimeout(nameTimer);
                lineTimers.forEach(clearTimeout);
                clearTimeout(completeTimer);
            };
        }
    }, []);

    useEffect(() => {
        // Small delay to trigger fade-in animation
        const timer = setTimeout(() => setProfileLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section ref={ref} className="about-section">
            <div className="about-left">
                <div className="intro">
                    {showIntro && introWords.map((word, i) => (
                        <span key={i} className="intro-word" style={{ animationDelay: `${i * 0.5}s` }}>
                            {word}&nbsp;
                        </span>
                    ))}
                </div>

                <div className="animated-name">
                    {showName && nameLetters.map((letter, i) => (
                        <span key={i}
                            className={`name-letter ${letter === " " ? "space" : ""}`}
                            style={{ animationDelay: `${i * 0.1}s` }}>
                            {letter}
                        </span>
                    ))}
                </div>

                <div className="about-description">
                    {visibleLines.map((i) => (
                        <p key={i} className="fade-line">{descriptionLines[i]}</p>
                    ))}
                </div>

                {visibleLines.length === descriptionLines.length && (
                    <div className="skills fade-in">
                        <span className="skill-tag">⚡ MERN Stack Development</span>
                        <span className="skill-tag">💡 Real-Time Web Apps</span>
                        <span className="skill-tag">🎨 Modern UI/UX Design</span>
                        <span className="skill-tag">🤖 AI-Powered Solutions</span>
                    </div>
                )}
            </div>

            <div className="about-right">
                <div className="profile-border">
                    <img 
                        src="/profile.jpg" 
                        alt="profile" 
                        className={`profile-pic ${profileLoaded ? "loaded" : ""}`} 
                    />
                </div>
            </div>
        </section>
    );
});

export default About;
