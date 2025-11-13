import React, { useState, useEffect, forwardRef } from "react";
import {
    SiJavascript, SiNextdotjs, SiMongodb, SiExpress,
    SiTailwindcss, SiVercel, SiCplusplus
} from "react-icons/si";
import {
    FaReact, FaNodeJs, FaGitAlt, FaGithub,
    FaPython, FaHtml5, FaCss3Alt, FaDatabase
} from "react-icons/fa";
import "./Resume.css";

const Resume = forwardRef(({ onComplete }, ref) => {
    const [showMore, setShowMore] = useState(false);

    const skills = [
        { name: "HTML 5", icon: <FaHtml5 />, level: 90 },
        { name: "CSS 3", icon: <FaCss3Alt />, level: 95 },
        { name: "JavaScript", icon: <SiJavascript />, level: 85 },
        { name: "React", icon: <FaReact />, level: 90 },
        { name: "Node.js", icon: <FaNodeJs />, level: 80 },
        { name: "Express.js", icon: <SiExpress />, level: 85 },
        { name: "MongoDB", icon: <SiMongodb />, level: 90 },
        { name: "Next.js", icon: <SiNextdotjs />, level: 85 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85 },
        { name: "C++", icon: <SiCplusplus />, level: 70 },
        { name: "Python", icon: <FaPython />, level: 75 },
        { name: "Git", icon: <FaGitAlt />, level: 85 },
        { name: "GitHub", icon: <FaGithub />, level: 90 },
        { name: "Vercel", icon: <SiVercel />, level: 75 },
    ];

    const visibleSkills = showMore ? skills : skills.slice(0, 3);

    // ✅ Auto trigger next section after small delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 500); // adjust time if needed (2.5s)
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div ref={ref} className="resume-section">
            <h2 className="resume-title">Resume</h2>

            <div className="resume-card">
                <div className="resume-box">
                    <h3 className="box-title">Education</h3>
                    <ul>
                        <li>🎓 BS Computer Science — University of Azad Jammu & Kashmir</li>
                        <li>🏫 Intermediate — Pre-Engineering</li>
                        <li>📘 Matric — ICS</li>
                    </ul>
                </div>

                <div className="resume-box">
                    <h3 className="box-title">Experience</h3>
                    <ul>
                        <li>💻 Frontend Developer — React, Tailwind, UI Design</li>
                        <li>⚙️ Backend Developer — Node.js, Express.js</li>
                        <li><FaDatabase className="icon" /> Database — MongoDB</li>
                        <li><SiNextdotjs className="icon" /> Framework — Next.js</li>
                        <li>🧾 MS Office & Documentation</li>
                    </ul>
                </div>

                <div className="resume-box">
                    <h3 className="box-title">Skills</h3>
                    <div className={`skills-container ${showMore ? "expanded" : ""}`}>
                        {visibleSkills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <div className="skill-info">
                                    <span className="skill-icon">{skill.icon}</span>
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-percent">{skill.level}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? "Hide" : "Show More"}
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Resume;
