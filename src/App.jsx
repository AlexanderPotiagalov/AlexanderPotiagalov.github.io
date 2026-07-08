import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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

const INTRO_CHARS = [..."Alexander Potiagalov"];

function LoadingScreen() {
  const [phase, setPhase] = useState("enter");
  const timerRef = useRef(null);

  useEffect(() => {
    // last char finishes at ~(19*30 + 550)=1120ms, line at ~1350ms → hold → exit at 2000ms
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
        <p className="intro-name">
          {INTRO_CHARS.map((char, i) => (
            <span key={i} className="intro-char-wrap">
              <span className="intro-char" style={{ "--i": i }}>
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
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

    document.body.classList.add("deck-open");
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("deck-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  const followCommand = (href) => {
    onClose();
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <div className="command-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="command-deck"
        role="dialog"
        aria-modal="true"
        aria-label="Portfolio command deck"
        onMouseDown={(event) => event.stopPropagation()}
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
          {commands.map((command) => (
            <button
              type="button"
              key={command.href}
              onClick={() => followCommand(command.href)}
            >
              <span className="command-key">{command.key}</span>
              <span>
                <strong>{command.label}</strong>
                <small>{command.detail}</small>
              </span>
              <FiArrowUpRight />
            </button>
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
      </section>
    </div>
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
      <LoadingScreen />
      <Header
        onOpenCommand={() => setCommandOpen(true)}
        onCyclePalette={() => setPalette((current) => (current + 1) % 3)}
      />

      <main>
        <Hero />

        <section id="about" className="about-section ink-section">
          <div className="page-shell about-layout" data-reveal>
            <div className="section-stamp">
              <span>02</span>
              <strong>THE SHORT VERSION</strong>
            </div>

            <div className="about-headline">
              <p className="micro-label">Builder / researcher / product person</p>
              <h2>
                MESSY PROBLEM IN.
                <span>USEFUL SOFTWARE OUT.</span>
              </h2>
            </div>

            <div className="about-copy">
              <p className="about-lead">
                I&apos;m a Computing Science student at Simon Fraser University
                working across AI, full-stack development, cybersecurity, and data.
              </p>
              <p>
                I like projects with real constraints and visible outcomes: tools
                analysts can use, platforms people understand, and prototypes that
                survive contact with actual users.
              </p>

              <div className="field-notes" aria-label="Current interests">
                <span>AI engineering</span>
                <span>Security automation</span>
                <span>Product systems</span>
                <span>Fast MVPs</span>
                <span>Clean UX</span>
              </div>
            </div>
          </div>
        </section>

        <OutsideTech />
        <Experience />
        <Projects />
        <SkillsSection />
        <Contact />
      </main>

      <Footer />
      <CommandDeck open={commandOpen} onClose={() => setCommandOpen(false)} />

      <button
        className="floating-command"
        type="button"
        onClick={() => setCommandOpen(true)}
        aria-label="Open command deck"
      >
        <FiCommand />
        <span>COMMAND</span>
        <kbd>CTRL K</kbd>
      </button>
    </div>
  );
}

export default App;
