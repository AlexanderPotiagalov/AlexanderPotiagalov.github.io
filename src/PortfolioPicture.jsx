import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiGithub,
} from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];

const heroCopyVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const heroLineVariants = {
  hidden: { opacity: 0, y: 52 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

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

function PortfolioPicture() {
  const [activePhoto, setActivePhoto] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  // copy drifts up as hero scrolls out (-160px)
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  // portrait drifts up more slowly — parallax depth difference
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  // both fade out as user scrolls past
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

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
    <section ref={heroRef} id="top" className="hero paper-grid">
      <div className="hero-ticker" aria-hidden="true">
      </div>

      <div className="page-shell hero-layout">
        <motion.div
          className="hero-copy"
          variants={heroCopyVariants}
          initial="hidden"
          animate="visible"
          style={{ y: copyY, opacity: heroOpacity }}
        >
          <motion.p className="hero-overline" variants={heroItemVariants}>
            <span />
            Computing Science @ Simon Fraser University
          </motion.p>

          <h1>
            <motion.span className="hero-line line-one" variants={heroLineVariants}>I BUILD</motion.span>
            <motion.span className="hero-line line-two" variants={heroLineVariants}>USEFUL</motion.span>
            <motion.span className="hero-line line-three" variants={heroLineVariants}>SOFTWARE.</motion.span>
          </h1>

          <motion.p className="hero-intro" variants={heroItemVariants}>
            AI, full-stack, cybersecurity, and data. Built with unreasonable
            curiosity and a healthy dislike of useless software.
          </motion.p>

          <motion.div className="hero-actions" variants={heroItemVariants}>
            <motion.a
              className="poster-button primary"
              href="#projects"
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              OPEN THE PROJECT FILES <FiArrowDownRight />
            </motion.a>
            <motion.a
              className="poster-button secondary"
              href="./Alexander_Potiagalov_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              RESUME <FiDownload />
            </motion.a>
          </motion.div>

        </motion.div>

        <motion.div
          className="hero-portrait-wrap"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
          style={{ y: portraitY }}
        >
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
        </motion.div>
      </div>

      <div className="hero-index">
        <span>PORTFOLIO / 2026</span>
        <span>SCROLL TO INSPECT</span>
      </div>
    </section>
  );
}

export default PortfolioPicture;
