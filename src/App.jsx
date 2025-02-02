import React from "react";
import Header from "./Header.jsx";
import ProfilePicture from "./PortfolioPicture.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import SkillsSection from "./SkillsSection.jsx";
import Contact from "./ContactMeForm.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Header />
      <section id="profile-picture">
        <ProfilePicture />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="contact-me">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}

export default App;
