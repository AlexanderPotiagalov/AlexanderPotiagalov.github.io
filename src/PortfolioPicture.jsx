import { useEffect, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiGithub,
} from "react-icons/fi";

const photos = [
  {
    src: "./trip3.jpg",
    alt: "Alexander Potiagalov in the mountains",
    label: "MOUNTAIN MODE",
    location: "THE ALPS",
  },
  {
    src: "./1000006728.webp",
    alt: "Alexander Potiagalov outside Alexander House",
    label: "NAME CHECK",
    location: "SFU",
  },
  {
    src: "./1000002501.jpg",
    alt: "Alexander Potiagalov at a student event",
    label: "TEAM MODE",
    location: "VANCOUVER, BC",
  },
];

const tickerItems = [
  "AI ENGINEERING",
  "FULL-STACK SWE",
  "ML SYSTEMS",
  "SECURITY RESEARCH",
];

function PortfolioPicture() {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % photos.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const movePhoto = (direction) => {
    setActivePhoto((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <section id="top" className="hero paper-grid">
      <div className="hero-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={`${copy}-${item}`}>
                  <b>{item}</b><i />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-orbit orbit-one">BUILD<small>LEARN / REPEAT</small></div>
      <div className="hero-orbit orbit-two">SHIP IT<small>THEN POLISH IT</small></div>

      <div className="page-shell hero-layout">
        <div className="hero-copy" data-reveal>
          <p className="hero-overline">
            <span />
            Computing Science @ Simon Fraser University
          </p>

          <h1>
            <span className="hero-line line-one">I BUILD</span>
            <span className="hero-line line-two">USEFUL</span>
            <span className="hero-line line-three">SOFTWARE.</span>
          </h1>

          <p className="hero-intro">
            AI, full-stack, cybersecurity, and data. Built with unreasonable
            curiosity and a healthy dislike of useless software.
          </p>

          <div className="hero-actions">
            <a className="poster-button primary" href="#projects">
              OPEN THE PROJECT FILES <FiArrowDownRight />
            </a>
            <a
              className="poster-button secondary"
              href="./Alexander_Potiagalov_Official_Resume_2026_Coop.pdf"
              target="_blank"
              rel="noreferrer"
            >
              RESUME <FiDownload />
            </a>
          </div>
        </div>

        <div className="hero-portrait-wrap" data-reveal>
          <div className="portrait-stack">
            {photos.map((photo, index) => {
              const position = (index - activePhoto + photos.length) % photos.length;

              return (
                <article
                  className={`portrait-card portrait-position-${position}`}
                  key={photo.src}
                  aria-hidden={position !== 0}
                >
                  <div className="portrait-meta">
                    <span>FIG. 0{index + 1}</span>
                    <span>{photo.location}</span>
                  </div>
                  <div className="portrait-window">
                    <img src={photo.src} alt={position === 0 ? photo.alt : ""} />
                  </div>
                  <div className="portrait-footer">
                    <strong>ALEXANDER POTIAGALOV</strong>
                    <span>{photo.label}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="portrait-controls" aria-label="Portfolio photo controls">
            <button type="button" onClick={() => movePhoto(-1)} aria-label="Previous photo">
              <FiChevronLeft />
            </button>
            <div className="portrait-dots">
              {photos.map((photo, index) => (
                <button
                  type="button"
                  key={photo.src}
                  className={index === activePhoto ? "active" : ""}
                  onClick={() => setActivePhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-pressed={index === activePhoto}
                />
              ))}
            </div>
            <button type="button" onClick={() => movePhoto(1)} aria-label="Next photo">
              <FiChevronRight />
            </button>
          </div>

          <a
            className="github-sticker"
            href="https://github.com/AlexanderPotiagalov"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub />
            VIEW<br />THE CODE
            <FiArrowUpRight />
          </a>

          <div className="incoming-ticket">
            <span>NEXT STOP</span>
            <strong>SOLIDIGM</strong>
            <small>AI SOFTWARE ENGINEER CO-OP</small>
          </div>
        </div>
      </div>

      <div className="hero-index">
        <span>PORTFOLIO / 2026</span>
        <span>SCROLL TO INSPECT</span>
      </div>
    </section>
  );
}

export default PortfolioPicture;
