import React from "react";

function Projects() {
  const projectData = [
    {
      name: "Vacuum Cleaner Pathfinding Simulation",
      description:
        "A Python-based AI agent that navigates a grid to clean dirt using A*, Greedy, BFS, DFS, UCS, and custom movement heuristics.",
      imageUrl: "/VacuumCleanerAI.png",
      link: "https://github.com/AlexanderPotiagalov/VacuumCleanerAIAgent",
      bgColor: "linear-gradient(135deg, #f39c12, #e74c3c)",
    },
    {
      name: "AVL Tree Implementation",
      description:
        "A functional AVL Tree class in C++ with insertion, deletion, rebalancing, and height tracking optimized for logarithmic operations.",
      imageUrl: "/avltree.webp",
      link: "https://github.com/AlexanderPotiagalov/CS-projects/tree/400714287741c51c4944a724fc3dc0101a844172/AVL%20Tree%20Implementation",
      bgColor: "linear-gradient(135deg, #3498db, #2ecc71)",
    },
    {
      name: "Photon Dash Game",
      description:
        "A space-themed game where players navigate a photon through obstacles. Built using JavaScript, HTML, and CSS with interactive front-end gameplay.",
      imageUrl: "/photon-dash-img.jpg",
      link: "https://github.com/AlexanderPotiagalov/photon-dash",
      bgColor: "linear-gradient(135deg, #1e1f2d, #00bcd4, #ff0066)",
    },
    {
      name: "Mastermind Game Variant",
      description:
        "A C-based Mastermind game that provides feedback on guesses, featuring memory-efficient design validated by Valgrind.",
      imageUrl: "/mastermind-img.webp",
      link: "https://github.com/AlexanderPotiagalov/CS-projects/blob/57b1fbe88f4fe749526005f63269fa247ed6b803/Mastermind.c",
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
