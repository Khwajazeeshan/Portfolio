import React, { useState, useEffect, forwardRef } from "react";
import "./Project.css";
import { FaGithub } from "react-icons/fa";

const Project = forwardRef(({ onComplete }, ref) => {
    const [showAll, setShowAll] = useState(false);

    const projects = [
        {
            mainTitle: "FINAL YEAR PROJECT",
            title: "Revamping UAJK Portal Empowered with AI Chatbot",
            link: "https://github.com/Khwajazeeshan/FYP3",
        },
        {
            title: "E-commerce Website (MERN Stack)",
            link: "https://github.com/Khwajazeeshan/E-commerce-Website--MERN-STACK",
        },
        {
            title: "Todo List App (MERN Stack)",
            link: "https://github.com/Khwajazeeshan/Todo-List-App-MERN-STACK",
        },
        {
            title: "Spotify App",
            link: "https://github.com/Khwajazeeshan/Spotify-Clone---Sigma-Web-Development-Project",
        },
        {
            mainTitle: "For Other Projects ",
            title: "Visit GitHub Repository",
            link: "https://github.com/Khwajazeeshan",
        },
    ];

    const displayedProjects = showAll ? projects : projects.slice(0, 3);

    // ✅ Automatically show Contact section after short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500); // adjust delay if needed
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div ref={ref} className="projects-section">
            <h2 className="projects-title">Projects</h2>

            <div className="projects-card">
                {displayedProjects.map((project, index) => (
                    <div className="project-box" key={index}>
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link"
                        >
                            <FaGithub className="github-icon" />
                            <div className="project-text">
                                {project.mainTitle && (
                                    <h4 className="main-title">{project.mainTitle}</h4>
                                )}
                                <span className="project-name">{project.title}</span>
                            </div>
                        </a>
                    </div>
                ))}
                {projects.length > 3 && (
                    <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Hide" : "Show More"}
                    </button>
                )}
            </div>
        </div>
    );
});

export default Project;
