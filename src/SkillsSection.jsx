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

const marqueeWords = ["BUILD", "TEST", "BREAK", "FIX", "SHIP", "LEARN"];

function SkillsSection() {
  return (
    <section id="skills" className="skills-section ink-section">
      <div className="skills-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy}>
              {marqueeWords.map((word) => (
                <span key={`${copy}-${word}`}>{word}<i>/</i></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="page-shell">
        <div className="section-title light" data-reveal>
          <div>
            <span className="micro-label">06 / Toolbox</span>
            <h2>TOOLS I USE<br /><em>TO GET THERE.</em></h2>
          </div>
          <p>
            AI systems first, then the software required to train, serve,
            inspect, and ship them without hand-waving.
          </p>
        </div>

        <div className="tool-grid">
          {groups.map((group, index) => (
            <article
              className={`tool-card ${group.color}`}
              key={group.title}
              data-reveal
              style={{ "--delay": `${index * 60}ms` }}
            >
              <div className="tool-card-head">
                <span>{group.number}</span>
                <h3>{group.title}</h3>
              </div>
              <p>{group.note}</p>
              <div className="tool-tags">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="education-receipt" data-reveal>
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
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
