import React, { useState, useEffect } from "react";

function PortfolioPicture() {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/trip2.jpg",
    "/trip3.jpg",
    "/1000006728.webp",
    "/1000002501.jpg",
  ];

  const texts = [
    "Alex Potiagalov",
    "A Software Developer",
    "A Future Tech Innovator",
  ];

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[loopIndex % texts.length];
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, loopIndex, texts, typingSpeed]);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(imageTimer);
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-picture">
        <img
          src={images[currentImageIndex]}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="portfolio-description">
        <h1 className="portfolio-heading">
          <span>I'm {currentText}</span> <span className="separator">|</span>
        </h1>
        <p>
          I’m a Computer Science student at Simon Fraser University, pursuing a
          minor in Business. Growing up with parents in the tech industry, I
          developed an early passion for cybersecurity, software development,
          and AI. Over time, I’ve improved my problem-solving skills and learned
          many different languages such as Python, C, C#, C++, JavaScript, HTML,
          and CSS.
        </p>
        <p>
          Beyond coding, I’m fluent in English and Russian, with conversational
          proficiency in French, and I thrive in diverse environments. I enjoy
          tackling complex technical challenges, whether it’s through team
          projects or solving tough LeetCode problems. When I’m not coding,
          you’ll often find me at the gym, fishing, or spending quality time
          with family and friends.
        </p>
        <p>
          I’m passionate about exploring new technologies and frameworks to stay
          ahead in the ever-evolving tech industry. I firmly believe in the
          transformative power of technology and business to improve lives. My
          long-term goal is to drive impactful innovation in AI and software
          engineering, creating solutions that make a difference.
        </p>

        <a
          href="/Resume (4).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="resume-button"
        >
          View My Resume
        </a>
        <a
          href="https://github.com/AlexanderPotiagalov"
          className="btn github-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Account
        </a>
      </div>
    </div>
  );
}

export default PortfolioPicture;
