import React from "react";

function Experience() {
  const experiences = [
    {
      title: "Software Developer",
      duration: "May 2025 – Present",
      frontImage: "/GSDC.png",
      backDescription: `
        <ul>
          <li>Built React/Firebase campus dashboard for 200+ students, real-time data.</li>
          <li>Ran 3 workshops on Next.js, Tailwind; increased turnout 35%.</li>
          <li>Mentored 10+ juniors in JS, cut bugs by 20%.</li>
          <li>Led GDSC outreach initiatives which boosted club visibility and membership.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #3494e6, #ec6ead)",
    },
    {
      title: "Peer Tutor",
      duration: "May 2025 – Present",
      frontImage: "/SFU.jpg",
      backDescription: `
        <ul>
          <li>Tutored peers in CMPT 120, 125, and 295 at SFU.</li>
          <li>Explained assembly, memory, and processor design with clear examples.</li>
          <li>Led 1-on-1 and group sessions to reinforce course concepts.</li>
          <li>Debugged student code and clarified labs for better understanding.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    },
    {
      title: "Software Developer",
      duration: "Jan 2025 – Apr. 2025",
      frontImage: "/sfu_surge_logo.jpg",
      backDescription: `
        <ul>
          <li>Built resume generator using OpenAI and prompt engineering for personalization.</li>
          <li>Connected resumes to 120,000+ jobs via JSearch API matching.</li>
          <li>Designed UI with Nielsen’s heuristics in React and Tailwind.</li>
          <li>Led MVP dev, handling architecture, APIs, and iterative polishing.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    },
    {
      title: " Frontend Developer",
      duration: "Apr. 2024 - Aug. 2024",
      frontImage: "/CJSF.jpg",
      backDescription: `
        <ul>
          <li>Designed & built CJSF Radio site with Agile and boosted engagement. </li>
          <li>Used Headless Drupal + Next.js for dynamic, API-powered frontend.</li>
          <li>Prototyped layouts with Figma which increased donations by over 20%.</li>
          <li>Improved accessibility which ensured full WCAG compliance for usability</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #fbc2eb, #a18cd1)",
    },
  ];

  return (
    <div className="experience-container">
      <h2 className="experience-heading">Experience</h2>
      <div className="experience-cards">
        {experiences.map((experience, index) => (
          <div className="flip-card" key={index}>
            <div
              className="flip-card-inner"
              style={{ background: experience.color }}
            >
              {/* Front Side */}
              <div className="flip-card-front">
                <img
                  src={experience.frontImage}
                  alt={`${experience.title} icon`}
                  className="front-icon-img"
                />
                <h3 className="experience-title">{experience.title}</h3>
                <p className="experience-duration">{experience.duration}</p>
              </div>
              {/* Back Side */}
              <div
                className="flip-card-back"
                dangerouslySetInnerHTML={{
                  __html: experience.backDescription,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Experience;
