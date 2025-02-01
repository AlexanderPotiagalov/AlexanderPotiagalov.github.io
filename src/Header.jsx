import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUserAlt,
  FaProjectDiagram,
  FaEnvelope,
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

  return (
    <div className="navigation">
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <a href="#profile-picture">
            <FaHome className="icon" /> Home
          </a>
        </li>
        <li>
          <a href="#experience">
            <FaUserAlt className="icon" /> Experience
          </a>
        </li>
        <li>
          <a href="#projects">
            <FaProjectDiagram className="icon" /> Projects
          </a>
        </li>
        <li>
          <a href="#contact-me">
            <FaEnvelope className="icon" /> Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Header;
