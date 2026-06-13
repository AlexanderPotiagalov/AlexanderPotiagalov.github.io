import { FiArrowUpRight } from "react-icons/fi";

const experiences = [
  {
    number: "01",
    company: "SOLIDIGM",
    role: "AI Software Engineer Co-op",
    period: "INCOMING",
    color: "acid",
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
    summary:
      "Co-building a student-first subletting platform around the realities of university co-op cycles.",
    signals: ["PRODUCT ENGINEERING", "AI DOC PARSING", "SYSTEM DESIGN", "NEXT.JS"],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience-section ink-section">
      <div className="page-shell">
        <div className="section-title light" data-reveal>
          <div>
            <span className="micro-label">04 / Field history</span>
            <h2>PLACES I&apos;VE<br />MADE THINGS.</h2>
          </div>
          <p>
            Research labs, government teams, and startup rooms. Different
            constraints, same objective: make the thing actually work.
          </p>
        </div>

        <div className="experience-stack">
          {experiences.map((item, index) => (
            <article
              className={`experience-file ${item.color}`}
              key={item.company}
              data-reveal
              style={{ "--delay": `${index * 70}ms` }}
            >
              <div className="experience-number">{item.number}</div>
              <div className="experience-name">
                <span>{item.company}</span>
                <h3>{item.role}</h3>
              </div>
              <p>{item.summary}</p>
              <div className="signal-list">
                {item.signals.map((signal) => <span key={signal}>{signal}</span>)}
              </div>
              <div className="experience-period">
                {item.period}
                <FiArrowUpRight />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
