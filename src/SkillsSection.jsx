import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  FaPython,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaCogs, // Represents C++
  FaCodeBranch, // Represents Git
  FaCertificate,
  FaUniversity,
  FaAward, // Honors & Awards
} from "react-icons/fa";
import { SiMongodb } from "react-icons/si";

import "./index.css"; // Ensure your CSS is properly configured

const SkillsSection = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("skills");

  // Check URL when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const tab = params.get("tab");

    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("skills"); // Default tab
    }
  }, [location]);

  const skills = [
    { name: "Python", icon: <FaPython />, color: "#3776AB" },
    { name: "C/C++", icon: <FaCogs />, color: "#00599C" },
    { name: "JavaScript", icon: <FaJsSquare />, color: "#F7DF1E" },
    { name: "SQL", icon: <FaDatabase />, color: "#F29111" },
    { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
    { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
    { name: "ReactJS", icon: <FaReact />, color: "#61DAFB" },
    { name: "Node.js", icon: <FaNodeJs />, color: "#3C873A" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "Git", icon: <FaCodeBranch />, color: "#F05032" },
    {
      name: "C#",
      icon: <img src="/c-sharp.png" alt="C#" className="skill-icon" />,
      color: "#68217A",
    },
  ];

  const certifications = [
    {
      name: "Complete A.I. & Machine Learning, Data Science Bootcamp",
      provider: "Udemy",
      issued: "Sep 2024",
      credentialID: "UC-8445cb75-5d03-46ed-878d-05e7a8304f7b",
      link: "https://www.udemy.com/certificate/UC-8445cb75-5d03-46ed-878d-05e7a8304f7b/",
      icon: <FaCertificate />,
      color:
        "linear-gradient(135deg,rgba(255, 81, 226, 0.6),rgba(171, 101, 251, 0.6),rgba(85, 82, 255, 0.6),rgba(108, 253, 238, 0.6))",
    },
    {
      name: "The Complete JavaScript Course 2024: From Zero to Expert!",
      provider: "Udemy",
      issued: "Sep 2024",
      credentialID: "UC-e94a2861-6522-4e6b-8d25-59d713354461",
      link: "https://www.udemy.com/certificate/UC-e94a2861-6522-4e6b-8d25-59d713354461/",
      icon: <FaCertificate />,
      color:
        "linear-gradient(135deg,rgba(247, 157, 60, 0.6),rgba(249, 79, 79, 0.6),rgba(251, 72, 212, 0.6),rgba(96, 45, 249, 0.6))",
    },
  ];

  const education = [
    {
      school: "Simon Fraser University",
      degree: "BSc Computer Science & Minor in Business",
      gpa: "3.62",
      honors: "Dean's Honor Roll",
      icon: <FaUniversity />,
      color: "linear-gradient(135deg, #3494e6, #ec6ead)",
    },
    {
      school: "McMath Secondary School",
      degree: "Dogwood Diploma",
      gpa: "4.0",
      honors: "Principal’s Honor Roll (2021-2023)",
      icon: <FaUniversity />,
      color: "linear-gradient(135deg,rgb(250, 118, 122),rgb(250, 181, 162))",
    },
  ];

  const honors = [
    {
      title: "SFU Dean’s Honor Roll",
      issuer: "Simon Fraser University",
      icon: <FaAward />,
      color:
        "linear-gradient(135deg,rgb(253, 122, 126),rgb(250, 149, 121),rgb(253, 132, 219),rgb(170, 138, 246))",
    },
    {
      title: "McMath Principal’s Honor Roll",
      issuer: "McMath Secondary School (2021-2023)",
      icon: <FaAward />,
      color: "linear-gradient(135deg, #f39c12, #e74c3c)",
    },
    {
      title: "Leadership Level 2 Award",
      issuer: "McMath Secondary School – 50+ hours of volunteer work",
      icon: <FaAward />,
      color: "linear-gradient(135deg,rgb(85, 248, 145),rgb(103, 197, 244))",
    },
  ];

  return (
    <section id="skills-section" className="skills-section">
      <div className="tabs">
        <button
          className={activeTab === "skills" ? "active" : ""}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </button>
        <button
          className={activeTab === "certifications" ? "active" : ""}
          onClick={() => setActiveTab("certifications")}
        >
          Certifications
        </button>
        <button
          className={activeTab === "education" ? "active" : ""}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
        <button
          className={activeTab === "honors" ? "active" : ""}
          onClick={() => setActiveTab("honors")}
        >
          Awards
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "skills" && (
          <div className="skills-container">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card"
                style={{ borderColor: skill.color }}
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <p className="skill-name">{skill.name}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="certifications-container">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="cert-card"
                style={{ background: cert.color }}
              >
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-info">
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-provider">{cert.provider}</p>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    View Credential
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "education" && (
          <div className="education-container">
            {education.map((edu, index) => (
              <div
                key={index}
                className="edu-card"
                style={{ background: edu.color }}
              >
                <div className="edu-icon">{edu.icon}</div>
                <div className="edu-info">
                  <h3 className="edu-school">{edu.school}</h3>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-gpa">GPA: {edu.gpa}</p>
                  <p className="edu-honors">{edu.honors}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "honors" && (
          <div className="honors-container">
            {honors.map((honor, index) => (
              <div
                key={index}
                className="honor-card"
                style={{ background: honor.color }}
              >
                <div className="honor-icon">{honor.icon}</div>
                <div className="honor-info">
                  <h3 className="honor-title">{honor.title}</h3>
                  <p className="honor-issuer">{honor.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
