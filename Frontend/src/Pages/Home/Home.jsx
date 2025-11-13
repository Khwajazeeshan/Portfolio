import React, { useEffect, useState } from "react";
import About from "../../components/About/About";
import Resume from "../../components/Resume/Resume";
import Projects from "../../components/Project/Project";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../chatbot/chatbot";
import "./Home.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = ({ sections }) => {
    const [visibleSections, setVisibleSections] = useState(["About"]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const showNextSection = (next) => {
        setVisibleSections((prev) => [...prev, next]);
    };

    // Responsive scroll function
    const scrollToSection = (ref) => {
        if (ref.current) {
            const offset = window.innerWidth < 450 ? 90 : 130; // responsive offset
            const top = ref.current.offsetTop - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    // Example: Scroll to footer dynamically (you can call this on a button click)
    const scrollToFooter = () => {
        if (sections.footer) scrollToSection(sections.footer);
    };

    return (
        <div className="container">
            {visibleSections.includes("About") && (
                <About ref={sections.about} onComplete={() => showNextSection("Resume")} />
            )}
            {visibleSections.includes("Resume") && (
                <Resume ref={sections.resume} onComplete={() => showNextSection("Projects")} />
            )}
            {visibleSections.includes("Projects") && (
                <Projects ref={sections.projects} onComplete={() => showNextSection("Contact")} />
            )}
            {visibleSections.includes("Contact") && (
                <Contact ref={sections.contact} />
            )}
            
            {/* Chatbot */}
            <Chatbot open={isChatOpen} onToggle={toggleChat} />
        </div>
    );
};

export default Home;
