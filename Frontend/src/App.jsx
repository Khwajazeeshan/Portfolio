import React, { useRef, useState, useEffect } from "react";
import Homepage from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
  const aboutRef = useRef(null);
  const resumeRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = {
    about: aboutRef,
    resume: resumeRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {loading && (
        <div className="loader-screen">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      )}

      {!loading && (
        <>
          <Navbar sections={sections} />
          <Homepage sections={sections} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
