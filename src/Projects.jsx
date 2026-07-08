import { useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiLock,
  FiZap,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const projects = [
  {
    id: "subtura",
    index: "01",
    name: "Subtura",
    type: "PRODUCT / FULL-STACK",
    line: "Student subletting without the group-chat archaeology.",
    built:
      "A student-first marketplace for short-term rentals with search, bookings, payments, real-time messaging, maps, and AI-assisted lease parsing.",
    why:
      "University housing cycles rarely fit standard leases. Subtura gives students a purpose-built flow for finding, listing, and managing co-op-term housing.",
    stack: ["REACT", "TYPESCRIPT", "SUPABASE", "STRIPE", "MAPBOX", "FASTAPI"],
    accent: "blue",
    stat: "MVP",
    statLabel: "LIVE PRODUCT",
    artifact: "listings",
    liveUrl: "https://subtura.com",
  },
  {
    id: "trace",
    index: "02",
    name: "Trace",
    type: "BROWSER EXTENSION / AI",
    line: "A private journal for what happened in your browser.",
    built:
      "A local-first Chrome and Edge extension that turns sanitized browser activity into a daily timeline, archive, and optional on-device AI reflection.",
    why:
      "Most activity trackers trade context for surveillance. Trace remembers useful patterns while excluding typed text, search terms, passwords, and filenames.",
    stack: ["JAVASCRIPT", "MANIFEST V3", "CHROME APIs", "GEMINI NANO", "NODE TEST"],
    accent: "paper",
    stat: "LOCAL",
    statLabel: "PRIVACY FIRST",
    artifact: "trace",
    githubUrl: "https://github.com/AlexanderPotiagalov/Trace",
    privateRepo: true,
  },
  {
    id: "prepmate",
    index: "03",
    name: "PrepMate",
    type: "AI / PRODUCT",
    line: "Interview practice that talks back.",
    built:
      "An AI interview assistant with role-specific voice simulations, generated questions, intelligent feedback, and performance analytics.",
    why:
      "Interview preparation is usually passive. PrepMate makes users explain their thinking aloud in a realistic, repeatable practice loop.",
    stack: ["NEXT.JS", "TYPESCRIPT", "FIREBASE", "VAPI", "TAILWIND", "AI APIs"],
    accent: "pink",
    stat: "VOICE",
    statLabel: "INTERACTIVE AI",
    artifact: "wave",
    liveUrl: "https://ai-agent-interview-assistant.vercel.app",
    githubUrl: "https://github.com/AlexanderPotiagalov/PrepMate",
  },
  {
    id: "technotes",
    index: "04",
    name: "TechNotes",
    type: "MERN / PRODUCTIVITY",
    line: "Secure notes and tasks for work that needs a system.",
    built:
      "A full-stack note and task manager with JWT authentication, role-aware access, real-time CRUD workflows, and Redux Toolkit state management.",
    why:
      "It turns scattered tasks and notes into one protected workflow while demonstrating a complete authentication and REST API architecture.",
    stack: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "JWT", "RTK QUERY"],
    accent: "acid",
    stat: "MERN",
    statLabel: "FULL-STACK APP",
    artifact: "technotes",
    liveUrl: "https://technoteshub-dis4.onrender.com",
    githubUrl: "https://github.com/AlexanderPotiagalov/TechNotes",
  },
  {
    id: "deepscan",
    index: "05",
    name: "DeepScan AI",
    type: "AI / COMPUTER VISION",
    line: "Frame-by-frame deepfake detection for suspicious video.",
    built:
      "An AI-powered detection system that processes uploaded video frame by frame and uses a neural network pipeline to surface likely manipulated content.",
    why:
      "Synthetic media is getting easier to produce and harder to inspect manually. DeepScan explores a practical review flow for video authenticity.",
    stack: ["PYTHON", "FASTAPI", "TENSORFLOW", "KERAS", "OPENCV", "NEXT.JS"],
    accent: "orange",
    stat: "CV",
    statLabel: "DEEPFAKE SCAN",
    artifact: "deepscan",
    githubUrl: "https://github.com/AlexanderPotiagalov/DeepScan-AI",
  },
  {
    id: "sketch3d",
    index: "06",
    name: "Sketch3D Converter",
    type: "CREATIVE DEV / 3D",
    line: "Draw it flat. Pull it into the third dimension.",
    built:
      "A React and TypeScript application that captures user strokes, vectorizes them into SVG paths, and extrudes the result into an interactive Three.js model.",
    why:
      "The project connects a familiar drawing interaction to geometry, vector processing, and real-time 3D rendering in one playful workflow.",
    stack: ["REACT", "TYPESCRIPT", "THREE.JS", "REACT KONVA", "SVG", "TAILWIND"],
    accent: "purple",
    stat: "3D",
    statLabel: "SKETCH TO MODEL",
    artifact: "sketch",
    githubUrl: "https://github.com/AlexanderPotiagalov/Sketch3DConverter",
  },
  {
    id: "oceanintel",
    index: "07",
    name: "OceanIntel",
    type: "AI / DATA INTELLIGENCE",
    line: "Fisheries policy documents turned into usable data and insight.",
    built:
      "An interactive Streamlit pipeline that extracts text from fisheries PDFs, summarizes policy with GPT, cross-references species and catch data, and visualizes trends for analysis.",
    why:
      "Policy documents and harvest datasets are difficult to compare manually. OceanIntel connects both sources so researchers can reach relevant evidence faster.",
    stack: ["PYTHON", "STREAMLIT", "OPENAI", "PYMUPDF", "PANDAS", "PLOTLY"],
    accent: "blue",
    stat: "PDF",
    statLabel: "POLICY INTEL",
    artifact: "oceanintel",
    liveUrl: "https://oceanintel.streamlit.app/",
    githubUrl: "https://github.com/AlexanderPotiagalov/OceanIntel",
  },
  {
    id: "vacuum-ai",
    index: "08",
    name: "Vacuum Cleaner AI",
    type: "AI / PATHFINDING",
    line: "A cleaning agent that makes search algorithms visible.",
    built:
      "A Python grid simulator that compares A*, UCS, BFS, DFS, and Greedy search while tracking path length, explored nodes, and execution time.",
    why:
      "Seeing an agent move through the same environment makes the tradeoffs between optimality, speed, heuristics, and search cost much easier to understand.",
    stack: ["PYTHON", "NUMPY", "MATPLOTLIB", "A*", "BFS", "UCS"],
    accent: "acid",
    stat: "A*",
    statLabel: "SEARCH AGENT",
    artifact: "vacuum",
    githubUrl: "https://github.com/AlexanderPotiagalov/VacuumCleanerAIAgent",
  },
  {
    id: "clean-web",
    index: "09",
    name: "Clean the Web",
    type: "BROWSER EXTENSION / SECURITY",
    line: "An instant trust score for the site in front of you.",
    built:
      "A full-stack Chrome extension that checks SSL, domain age, suspicious keywords, crowdsourced reports, and Google Safe Browsing to explain whether a site is safe, suspicious, or a scam.",
    why:
      "Security warnings are often vague or arrive too late. Clean the Web gives people a clear verdict, a score, and the signals behind it before they trust a page.",
    stack: ["JAVASCRIPT", "NODE.JS", "EXPRESS", "MONGODB", "SAFE BROWSING", "WHOIS"],
    accent: "pink",
    stat: "100%",
    statLabel: "TRUST SCORE",
    artifact: "cleanweb",
    githubUrl: "https://github.com/AlexanderPotiagalov/Clean-the-Web-Extension",
  },
];

function ProjectArtifact({ type }) {
  if (type === "listings") {
    return (
      <div className="artifact screenshot-artifact subtura-artifact">
        <img src="./Subtura.png" alt="Subtura student subletting marketplace homepage" />
        <span>LIVE MARKETPLACE / SEARCH / LISTINGS</span>
      </div>
    );
  }

  if (type === "trace") {
    return (
      <div className="artifact trace-artifact" aria-hidden="true">
        <div className="trace-journal">
          <div className="trace-head"><strong>Trace</strong><span>TODAY / LOCAL</span></div>
          <div className="trace-date">YOUR BROWSER, IN PLAIN ENGLISH.</div>
          <div className="trace-time">2h 14m<small>IN VIEW</small></div>
          <div className="trace-metrics">
            <span>PLACES<strong>18</strong></span>
            <span>SEARCHES<strong>9</strong></span>
            <span>EDITS<strong>47</strong></span>
          </div>
          <div className="trace-reflection">A focused build session with a suspicious amount of documentation.</div>
        </div>
        <div className="trace-lock"><FiLock /> ON-DEVICE</div>
      </div>
    );
  }

  if (type === "wave") {
    return (
      <div className="artifact wave-artifact" aria-hidden="true">
        <div className="interview-avatar">AP</div>
        <div className="wave-bars">
          {[16, 30, 52, 26, 68, 42, 22, 58, 36, 18, 48, 28, 12].map((height, index) => (
            <i key={index} style={{ height }} />
          ))}
        </div>
        <div className="feedback-chip">CLARITY 86</div>
        <span className="recording-dot">LIVE PRACTICE</span>
      </div>
    );
  }

  if (type === "technotes") {
    return (
      <div className="artifact screenshot-artifact technotes-artifact">
        <img src="./TechNotes.png" alt="TechNotes application dashboard" />
        <span>JWT AUTH / TASKS / NOTES</span>
      </div>
    );
  }

  if (type === "sketch") {
    return (
      <div className="artifact screenshot-artifact sketch-artifact">
        <img src="./Sketch3dConverter.png" alt="Sketch3D Converter interface" />
        <span>STROKES / SVG / THREE.JS</span>
      </div>
    );
  }

  if (type === "deepscan") {
    return (
      <div className="artifact screenshot-artifact deepscan-artifact">
        <img src="./DeepScanImage.jpeg" alt="DeepScan AI facial analysis visualization" />
        <span>VIDEO / FRAME ANALYSIS / CV</span>
      </div>
    );
  }

  if (type === "oceanintel") {
    return (
      <div className="artifact screenshot-artifact oceanintel-artifact">
        <img src="./OceanIntel.png" alt="OceanIntel fisheries intelligence project cover" />
        <span>PDFS / POLICY / DATA</span>
      </div>
    );
  }

  if (type === "vacuum") {
    return (
      <div className="artifact screenshot-artifact vacuum-artifact">
        <img src="./VacuumCleanerAIWide.png" alt="Vacuum Cleaner AI pathfinding visualizer" />
        <span>A* / BFS / DFS / UCS</span>
      </div>
    );
  }

  return (
    <div className="artifact screenshot-artifact cleanweb-artifact">
      <img src="./CleanTheWeb.png" alt="Clean the Web extension trust score states" />
      <span>TRUST SCORE / THREAT CHECKS</span>
    </div>
  );
}

ProjectArtifact.propTypes = {
  type: PropTypes.string.isRequired,
};

function Projects() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  return (
    <section id="projects" className="projects-section paper-grid">
      <div className="page-shell">
        <div className="section-title" data-reveal>
          <div>
            <span className="micro-label">05 / Selected work</span>
            <h2>PROJECT<br /><em>CASE FILES.</em></h2>
          </div>
          <p>
            Real projects, real links. Pick a file to inspect the product,
            problem, stack, and build decisions behind it.
          </p>
        </div>

        <div className="project-dossier" data-reveal>
          <div className="project-index" role="tablist" aria-label="Select a project">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                type="button"
                role="tab"
                aria-selected={selectedId === project.id}
                className={selectedId === project.id ? "active" : ""}
                onClick={() => setSelectedId(project.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE, delay: index * 0.045 }}
              >
                <span>{project.index}</span>
                <div>
                  <strong>{project.name}</strong>
                  <small>{project.type}</small>
                </div>
                <FiArrowUpRight />
              </motion.button>
            ))}

            <a
              className="all-projects"
              href="https://github.com/AlexanderPotiagalov?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub /> ALL REPOSITORIES <FiArrowUpRight />
            </a>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              className={`project-stage ${selected.accent}`}
              key={selected.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
            <div className="stage-topline">
              <span>FILE {selected.index} / {selected.type}</span>
              <span>STATUS: BUILT</span>
            </div>

            <ProjectArtifact type={selected.artifact} />

            <div className="project-main">
              <div className="project-title-block">
                <span className={`project-stat ${selected.stat.length >= 4 ? "compact" : ""}`}>
                  {selected.stat}
                  <small>{selected.statLabel}</small>
                </span>
                <div>
                  <h3 className={selected.name.length > 12 ? "long-title" : ""}>
                    {selected.name}
                  </h3>
                  <p>{selected.line}</p>
                </div>
              </div>

              <div className="project-links">
                {selected.liveUrl && (
                  <a href={selected.liveUrl} target="_blank" rel="noreferrer">
                    <FiExternalLink /> LIVE SITE <FiArrowUpRight />
                  </a>
                )}
                {selected.githubUrl && (
                  <a href={selected.githubUrl} target="_blank" rel="noreferrer">
                    {selected.privateRepo ? <FiLock /> : <FiGithub />}
                    {selected.privateRepo ? "PRIVATE GITHUB" : "VIEW GITHUB"}
                    <FiArrowUpRight />
                  </a>
                )}
              </div>

              <div className="project-notes">
                <div>
                  <span className="micro-label">What I built</span>
                  <p>{selected.built}</p>
                </div>
                <div>
                  <span className="micro-label">Why it matters</span>
                  <p>{selected.why}</p>
                </div>
              </div>

              <motion.div
                className="project-stack"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                <FiZap />
                {selected.stack.map((item) => (
                  <motion.span
                    key={item}
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Projects;
