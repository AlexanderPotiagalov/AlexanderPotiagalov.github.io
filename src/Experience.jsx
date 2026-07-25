import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const experiences = [
  {
    number: "01",
    company: "SOLIDIGM",
    role: "AI Software Engineer Co-op",
    period: "INCOMING",
    color: "acid",
    logo: "./solidigm-logo.png",
    logoAlt: "Solidigm",
    summary:
      "Joining Data Center Engineering to apply machine learning and software engineering to firmware workflows.",
    signals: ["ML SYSTEMS", "MODEL EVALUATION", "PYTHON", "PRODUCTION AI"],
  },
  {
    number: "02",
    company: "SIMON FRASER UNIVERSITY",
    role: "ML & Cybersecurity Research Assistant",
    period: "RESEARCH",
    color: "blue",
    logoType: "sfu",
    logoAlt: "Simon Fraser University",
    summary:
      "Researching AI-assisted SOC alert triage, RAG, threat intelligence, and analyst decision support.",
    signals: ["AI AGENTS", "RAG PIPELINES", "THREAT INTEL", "SOC TOOLING"],
  },
  {
    number: "03",
    company: "FISHERIES & OCEANS CANADA",
    role: "Junior Data Analyst / SDE Intern",
    period: "2025 - 2026",
    color: "orange",
    logoType: "dfo",
    logoAlt: "Fisheries and Oceans Canada",
    summary:
      "Built internal AI tools, an ML model repository, RAG prototypes, and workflow automation for public-sector teams.",
    signals: ["AI APPLICATIONS", "RAG SYSTEMS", "ML INFRA", "FULL-STACK SWE"],
  },
  {
    number: "04",
    company: "SUBTURA",
    role: "Founding Engineer",
    period: "BUILDING NOW",
    color: "pink",
    logo: "./subtura-logo.png",
    logoAlt: "Subtura",
    summary:
      "Co-building a student-first subletting platform around the realities of university co-op cycles.",
    signals: ["PRODUCT ENGINEERING", "AI DOC PARSING", "SYSTEM DESIGN", "NEXT.JS"],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience-section ink-section">
      <div className="page-shell">
        <motion.div className="section-title light">
          <div>
            <span className="micro-label">04 / Field history</span>
            <h2>PLACES I&apos;VE<br />MADE THINGS.</h2>
          </div>
          <p>
            Research labs, government teams, and startup rooms. Different
            constraints, same objective: make the thing actually work.
          </p>
        </motion.div>

        <div className="experience-stack">
          {experiences.map((item, index) => (
            <motion.article
              className={`experience-file ${item.color}`}
              key={item.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.07 }}
            >
              {item.logo ? (
                <span className={`experience-logo experience-primary-logo ${item.color}`}>
                  <img src={item.logo} alt={item.logoAlt} loading="lazy" decoding="async" />
                </span>
              ) : item.logoType === "sfu" ? (
                <span className="experience-logo experience-primary-logo sfu-logo" role="img" aria-label={item.logoAlt}>SFU</span>
              ) : item.logoType === "dfo" ? (
                <span className="experience-logo experience-primary-logo dfo-logo" role="img" aria-label={item.logoAlt}>
                  <i><b>🍁</b></i>
                  <small>FISHERIES<br />&amp; OCEANS</small>
                </span>
              ) : (
                <span className="experience-logo experience-primary-logo canada-logo" role="img" aria-label={item.logoAlt}>
                  <i>🍁</i>
                </span>
              )}
              <div className="experience-name">
                <div className="experience-company">
                  <span>{item.company}</span>
                </div>
                <h3>{item.role}</h3>
              </div>
              <p>{item.summary}</p>
              <div className="signal-list">
                {item.signals.map((signal, si) => (
                  <motion.span
                    key={signal}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.35, ease: EASE, delay: index * 0.07 + si * 0.05 }}
                  >
                    {signal}
                  </motion.span>
                ))}
              </div>
              <div className="experience-period">
                {item.period}
                <FiArrowUpRight />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
