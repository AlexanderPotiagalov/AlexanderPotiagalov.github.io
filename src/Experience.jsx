import React from "react";

function Experience() {
  const experiences = [
    {
      title: "JavaScript Developer",
      duration: "Nov 2024 – Present",
      frontImage: "./src/assets/javascript.png",
      backDescription: `
        <ul>
          <li>Designed a full-stack e-commerce and messaging platform.</li>
          <li>Developed using React, Node.js, and MongoDB.</li>
          <li>Improved performance by 20% through database query optimization.</li>
          <li>Collaborated with a team of 4 to implement real-time chat features.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #3494e6, #ec6ead)",
    },
    {
      title: "Backend Software Developer",
      duration: "Sep 2024 – Present",
      frontImage: "./src/assets/c-sharp.png",
      backDescription: `
        <ul>
          <li>Designed scalable inventory and object interaction systems in Unity.</li>
          <li>Optimized performance and reduced load time by 15% using C#.</li>
          <li>Collaborated closely with designers for seamless interaction logic.</li>
          <li>Ensured smooth UI integration through modular backend development.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    },
    {
      title: "Volunteer at StormHacks",
      duration: "Oct 2024",
      frontImage: "./src/assets/sfu_surge_logo.jpg",
      backDescription: `
        <ul>
          <li>Assisted 100+ participants with technical troubleshooting.</li>
          <li>Supported team collaboration and event facilitation.</li>
          <li>Ensured smooth time management for hackathon events.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #fbc2eb, #a18cd1)",
    },
    {
      title: "President",
      duration: "Sep 2021 – June 2023",
      frontImage: "./src/assets/mayor.png",
      backDescription: `
        <ul>
          <li>Organized coding competitions and gaming events for 20+ participants.</li>
          <li>Conducted workshops on Python, JavaScript, and game development.</li>
          <li>Mentored members in creating mods for Minecraft and Roblox.</li>
          <li>Fostered an innovative club culture with regular events.</li>
        </ul>
      `,
      color: "linear-gradient(135deg, #84fab0, #8fd3f4)",
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
