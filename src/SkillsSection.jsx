import { motion } from "framer-motion";
import {
  FiActivity,
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGrid,
  FiLayers,
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGit,
  SiGithubactions,
  SiJsonwebtokens,
  SiLinux,
  SiMlflow,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPandas,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const EASE = [0.22, 1, 0.36, 1];

const groups = [
  {
    number: "01",
    title: "AI / ML",
    note: "Models, retrieval, evaluation, and the part where the data fights back.",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Deep Learning",
      "Reinforcement Learning",
      "RAG",
      "CNNs",
    ],
    color: "blue",
  },
  {
    number: "02",
    title: "BACKEND",
    note: "APIs and services that turn a model or product idea into a real system.",
    skills: ["FastAPI", "Node.js", "Express", "Flask", "REST APIs", "JWT"],
    color: "orange",
  },
  {
    number: "03",
    title: "FRONTEND",
    note: "Interfaces people can understand without a user manual.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI"],
    color: "acid",
  },
  {
    number: "04",
    title: "DATA",
    note: "Turning raw information into training signals, context, and decisions.",
    skills: ["SQL", "Pandas", "MongoDB", "Supabase", "Feature Engineering", "MLflow"],
    color: "pink",
  },
  {
    number: "05",
    title: "SHIP MODE",
    note: "The tools that move code from my machine into the actual world.",
    skills: ["Azure", "Docker", "GitHub Actions", "Vercel", "Git", "Linux"],
    color: "white",
  },
];

const skillIcons = {
  Python: SiPython,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "scikit-learn": SiScikitlearn,
  "Deep Learning": FiCpu,
  "Reinforcement Learning": FiActivity,
  RAG: FiSearch,
  CNNs: FiGrid,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Flask: SiFlask,
  "REST APIs": FiCode,
  JWT: SiJsonwebtokens,
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "ShadCN UI": SiShadcnui,
  SQL: FiDatabase,
  Pandas: SiPandas,
  MongoDB: SiMongodb,
  Supabase: SiSupabase,
  "Feature Engineering": FiSliders,
  MLflow: SiMlflow,
  Azure: FiBox,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Vercel: SiVercel,
  Git: SiGit,
  Linux: SiLinux,
};

const skillIconColors = {
  Python: "#306998",
  PyTorch: "#ee4c2c",
  TensorFlow: "#ff6f00",
  "scikit-learn": "#f7931e",
  "Deep Learning": "#6546d7",
  "Reinforcement Learning": "#d81b60",
  RAG: "#00695c",
  CNNs: "#1565c0",
  FastAPI: "#007f73",
  "Node.js": "#3c873a",
  Express: "#4b5563",
  Flask: "#5b4b8a",
  "REST APIs": "#0067b8",
  JWT: "#7b1fa2",
  React: "#087ea4",
  "Next.js": "#404040",
  TypeScript: "#235a97",
  "Tailwind CSS": "#0284a8",
  "ShadCN UI": "#52525b",
  SQL: "#336791",
  Pandas: "#150458",
  MongoDB: "#137333",
  Supabase: "#168f5b",
  "Feature Engineering": "#a63c06",
  MLflow: "#006fba",
  Azure: "#0078d4",
  Docker: "#1267b5",
  "GitHub Actions": "#0969da",
  Vercel: "#404040",
  Git: "#d43f2a",
  Linux: "#5c4b00",
};

function SkillsSection() {
  return (
    <section id="skills" className="skills-section ink-section">
      <div className="page-shell">
        <motion.div className="section-title light">
          <div>
            <span className="micro-label">07 / Toolbox</span>
            <h2>TOOLS I USE<br /><em>TO GET THERE.</em></h2>
          </div>
          <p>
            AI systems first, then the software required to train, serve,
            inspect, and ship them without hand-waving.
          </p>
        </motion.div>

        <div className="tool-grid">
          {groups.map((group, index) => (
            <motion.article
              className={`tool-card ${group.color}`}
              key={group.title}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              transition={{ duration: 0.55, ease: EASE, delay: index * 0.06 }}
            >
              <div className="tool-card-head">
                <span>{group.number}</span>
                <h3>{group.title}</h3>
              </div>
              <p>{group.note}</p>
              <div className="tool-tags">
                {group.skills.map((skill) => {
                  const SkillIcon = skillIcons[skill] || FiLayers;
                  const iconColor = skillIconColors[skill] || "var(--ink)";

                  return (
                    <span
                      className="tool-tag"
                      key={skill}
                    >
                      <SkillIcon
                        className="tool-tag-icon"
                        style={{ color: iconColor }}
                        aria-hidden="true"
                      />
                      {skill}
                    </span>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="education-receipt"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="receipt-hole" />
          <span className="micro-label">Education receipt / keep for your records</span>
          <div className="receipt-main">
            <strong>SIMON FRASER UNIVERSITY</strong>
            <span>BSc Computing Science + Minor in Business</span>
          </div>
          <div className="receipt-meta">
            <span>DEAN&apos;S HONOUR ROLL:</span>
            <span>FALL 2024 + SPRING 2025</span>
            <span>STATUS: IN PROGRESS</span>
          </div>
          <div className="barcode" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
