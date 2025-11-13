import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ sections }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const scrollToSection = (ref) => {
        if (ref.current) {
            const offset = window.innerWidth < 750 ? 102 : 130;
            const top = ref.current.offsetTop - offset;
            window.scrollTo({ top, behavior: "smooth" });
            setMenuOpen(false); // close mobile menu
        }
    };


    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="profile-img">
                    <img src="/profile.jpg" alt="Profile" />
                </div>
                <h2 className="profile-name">Khawaja Zeeshan</h2>
            </div>

            <div className="navbar-right">
                <ul className="nav-links-desktop">
                    <li onClick={() => scrollToSection(sections.about)}>About</li>
                    <li onClick={() => scrollToSection(sections.resume)}>Resume</li>
                    <li onClick={() => scrollToSection(sections.projects)}>Projects</li>
                    <li onClick={() => scrollToSection(sections.contact)}>Contact</li>
                </ul>

                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                </div>
            </div>

            {menuOpen && (
                <div className="dropdown-card">
                    <ul className="dropdown-links">
                        <li onClick={() => scrollToSection(sections.about)}>About</li>
                        <li onClick={() => scrollToSection(sections.resume)}>Resume</li>
                        <li onClick={() => scrollToSection(sections.projects)}>Projects</li>
                        <li onClick={() => scrollToSection(sections.contact)}>Contact</li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
