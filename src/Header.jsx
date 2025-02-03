import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserAlt,
  FaProjectDiagram,
  FaEnvelope,
  FaAward,
  FaGraduationCap,
  FaCertificate,
  FaLaptopCode,
} from "react-icons/fa";

function Header() {
  useEffect(() => {
    const list = document.querySelectorAll(".list");

    function activateLink() {
      list.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    }

    list.forEach((item) => item.addEventListener("click", activateLink));

    return () => {
      list.forEach((item) => item.removeEventListener("click", activateLink));
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="navigation">
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <a href="#profile-picture" onClick={handleLinkClick}>
            <FaHome className="icon" /> Home
          </a>
        </li>
        <li>
          <a href="#experience" onClick={handleLinkClick}>
            <FaUserAlt className="icon" /> Experience
          </a>
        </li>
        <li>
          <a href="#projects" onClick={handleLinkClick}>
            <FaProjectDiagram className="icon" /> Projects
          </a>
        </li>
        {/* 🔹 Added links to skills-section with query params for tabs */}
        <li>
          <a href="#skills-section" onClick={handleLinkClick}>
            <FaLaptopCode className="icon" /> Skills
          </a>
        </li>
        <li>
          <a
            href="#skills-section?tab=certifications"
            onClick={handleLinkClick}
          >
            <FaCertificate className="icon" /> Certifications
          </a>
        </li>
        <li>
          <a href="#skills-section?tab=education" onClick={handleLinkClick}>
            <FaGraduationCap className="icon" /> Education
          </a>
        </li>
        <li>
          <a href="#skills-section?tab=honors" onClick={handleLinkClick}>
            <FaAward className="icon" /> Awards
          </a>
        </li>
        <li>
          <a href="#contact-me" onClick={handleLinkClick}>
            <FaEnvelope className="icon" /> Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
