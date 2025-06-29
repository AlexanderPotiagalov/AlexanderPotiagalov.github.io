import React from "react";

function Projects() {
  const projectData = [
    {
      name: "Tech Notes",
      description:
        "A full-stack MERN note & task management app with secure JWT auth and responsive UI. Supports real-time CRUD and Redux Toolkit for state management.",
      imageUrl: "/TechNotes.png",
      link: "https://github.com/AlexanderPotiagalov/TechNotes",
      bgColor: "linear-gradient(135deg, #f39c12, #e74c3c)",
    },
    {
      name: "Sketch 3D Converter",
      description:
        "A React & Three.js app that converts hand-drawn strokes into SVGs, classifies them using OpenAI Vision API, and renders 3D extrusions interactively.",
      imageUrl: "/Sketch3dConverter.png",
      link: "https://github.com/AlexanderPotiagalov/Sketch3DConverter",
      bgColor: "linear-gradient(135deg, #3498db, #2ecc71)",
    },
    {
      name: "Clean The Web",
      description:
        "A Chrome extension that flags suspicious websites using Google Safe Browsing & WhoisXML APIs. Analyzes trust via SSL, domain age, and phishing reports.",
      imageUrl: "/CleanTheWeb.png",
      link: "https://github.com/AlexanderPotiagalov/Clean-the-Web-Extension",
      bgColor: "linear-gradient(135deg, #1e1f2d, #00bcd4, #ff0066)",
    },
    {
      name: "Vacuum Cleaner AI",
      description:
        "A Python AI agent that uses BFS, DFS, UCS, A*, and custom heuristics to optimize vacuum pathfinding across a dirt-filled grid environment.",
      imageUrl: "/VacuumCleanerAI.png",
      link: "https://github.com/AlexanderPotiagalov/VacuumCleanerAIAgent",
      bgColor: "linear-gradient(135deg, #8e44ad, #16a085)",
    },
  ];

  return (
    <div className="projects-section">
      <h2 className="projects-heading">My Projects</h2>
      <div className="projects-container">
        {projectData.map((project, index) => (
          <div
            className="project-card"
            key={index}
            style={{ background: project.bgColor }}
          >
            <img
              src={project.imageUrl}
              alt={project.name}
              className="project-image"
            />
            <h3 className="project-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <a
              href={project.link}
              className="project-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
