import { Fragment, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiCommand, FiGithub, FiLinkedin, FiMail, FiX } from "react-icons/fi";
import Header from "./Header.jsx";
import Hero from "./PortfolioPicture.jsx";
import OutsideTech from "./OutsideTech.jsx";
import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";
import SkillsSection from "./SkillsSection.jsx";
import Contact from "./ContactMeForm.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

const commands = [
  { label: "Go to about", detail: "The short version", href: "#about", key: "A" },
  { label: "Step outside", detail: "Travel, nature, and life", href: "#outside", key: "O" },
  { label: "Inspect experience", detail: "Where I have shipped", href: "#experience", key: "E" },
  { label: "Open project files", detail: "Selected builds", href: "#projects", key: "P" },
  { label: "Scan the toolbox", detail: "Skills and systems", href: "#skills", key: "S" },
  { label: "Start a conversation", detail: "Email Alexander", href: "#contact", key: "C" },
];

const EASE = [0.22, 1, 0.36, 1];

/* Thin accent bar fixed at the top that fills as you scroll the page */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: "var(--accent)",
        transformOrigin: "left center",
        scaleX,
        zIndex: 10000,
      }}
    />
  );
}

/* Parallax wrapper — children shift vertically at `speed` ratio as page scrolls */
function ParallaxSection({ children, speed = 0.12 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

ParallaxSection.propTypes = { children: PropTypes.node.isRequired, speed: PropTypes.number };

/* Wraps every top-level section with a scroll-triggered reveal */
function SectionReveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.04 }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

SectionReveal.propTypes = { children: PropTypes.node.isRequired };

/* Animated accent rule drawn between sections */
function SectionDivider() {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        height: 2,
        background: "var(--ink)",
        transformOrigin: "left center",
        margin: "0 var(--gutter)",
      }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.7, ease: EASE }}
    />
  );
}

const INTRO_NAME = "Alexander Potiagalov";
const INTRO_WORDS = INTRO_NAME.split(" ").map((word, wordIndex, words) => ({
  word,
  offset:
    words.slice(0, wordIndex).reduce((count, currentWord) => count + currentWord.length, 0) +
    wordIndex,
}));

function LoadingScreen() {
  const [phase, setPhase] = useState("enter");
  const timerRef = useRef(null);

  useEffect(() => {
    // Last char finishes at roughly 1120ms, line at 1350ms, then exit at 2000ms.
    timerRef.current = setTimeout(() => setPhase("exit"), 2000);
    return () => clearTimeout(timerRef.current);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-overlay intro-overlay--${phase}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-curtain-up") setPhase("done");
      }}
    >
      <div className="intro-content">
        <p className="intro-name" aria-label={INTRO_NAME}>
          {INTRO_WORDS.map(({ word, offset }, wordIndex) => (
            <Fragment key={word}>
              {wordIndex > 0 && <span className="intro-name-divider" aria-hidden="true" />}
              <span className="intro-word" aria-hidden="true">
                {[...word].map((char, i) => (
                  <span key={`${word}-${i}`} className="intro-char-wrap">
                    <span className="intro-char" style={{ "--i": offset + i }}>
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </p>
        <span className="intro-line" />
      </div>
    </div>
  );
}

function CommandDeck({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const header = document.querySelector(".site-header");
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (header) header.style.paddingRight = `calc(var(--gutter) + ${scrollbarWidth}px)`;
    document.body.classList.add("deck-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("deck-open");
      document.body.style.paddingRight = "";
      if (header) header.style.paddingRight = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  const followCommand = (href) => {
    onClose();
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-backdrop"
          role="presentation"
          onMouseDown={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.section
            className="command-deck"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio command deck"
            onMouseDown={(event) => event.stopPropagation()}
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="command-head">
              <div>
                <span className="micro-label">Quick navigation</span>
                <h2>COMMAND DECK</h2>
              </div>
              <button type="button" onClick={onClose} aria-label="Close command deck">
                <FiX />
              </button>
            </div>

            <div className="command-list">
              {commands.map((command, i) => (
                <motion.button
                  type="button"
                  key={command.href}
                  onClick={() => followCommand(command.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
                >
                  <span className="command-key">{command.key}</span>
                  <span>
                    <strong>{command.label}</strong>
                    <small>{command.detail}</small>
                  </span>
                  <FiArrowUpRight />
                </motion.button>
              ))}
            </div>

            <div className="command-socials">
              <a href="mailto:apa168@sfu.ca">
                <FiMail /> Email
              </a>
              <a href="https://github.com/AlexanderPotiagalov" target="_blank" rel="noreferrer">
                <FiGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/alexander-potiagalov/"
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin /> LinkedIn
              </a>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

CommandDeck.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

function App() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [palette, setPalette] = useState(0);

  useEffect(() => {
    const handleShortcut = (event) => {
      const target = event.target;
      const typing =
        target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setCommandOpen(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    window.addEventListener("keydown", handleShortcut);

    if (window.location.hash) {
      const targetId = window.location.hash.slice(1);
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <div className={`site palette-${palette}`}>
      <ScrollProgressBar />
      <LoadingScreen />
      <Header
        onOpenCommand={() => setCommandOpen(true)}
        onCyclePalette={() => setPalette((current) => (current + 1) % 3)}
      />

      <main>
        <Hero />

        <SectionDivider />

        <SectionReveal>
          <section id="about" className="about-section ink-section">
            <div className="page-shell about-layout">
              <div className="section-stamp">
                <span>02</span>
                <strong>THE SHORT VERSION</strong>
              </div>

              <motion.div
                className="about-headline"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="micro-label">Builder / researcher / product person</p>
                <h2>
                  MESSY PROBLEM IN.
                  <span>USEFUL <b className="about-software-word">SOFTWARE</b> OUT.</span>
                </h2>
              </motion.div>

              <motion.div
                className="about-copy"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
              >
                <p className="about-lead">
                  I&apos;m a Computing Science student at Simon Fraser University
                  working across AI, full-stack development, cybersecurity, and data.
                </p>
                <p>
                  I like projects with real constraints and visible outcomes: tools
                  analysts can use, platforms people understand, and prototypes that
                  survive contact with actual users.
                </p>

                <motion.div
                  className="field-notes"
                  aria-label="Current interests"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
                >
                  {["AI engineering", "Security automation", "Product systems", "Fast MVPs", "Clean UX"].map((tag) => (
                    <motion.span
                      key={tag}
                      variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } } }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <OutsideTech />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <SkillsSection />
        </SectionReveal>

        <SectionDivider />

        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>

      <Footer />
      <CommandDeck open={commandOpen} onClose={() => setCommandOpen(false)} key="command-deck" />

      <motion.button
        className="floating-command"
        type="button"
        onClick={() => setCommandOpen(true)}
        aria-label="Open command deck"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      >
        <FiCommand />
        <span>COMMAND</span>
        <kbd>CTRL K</kbd>
      </motion.button>
    </div>
  );
}

export default App;
