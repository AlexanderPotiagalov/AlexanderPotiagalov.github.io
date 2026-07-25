import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight, FiBox, FiCheck, FiCommand, FiFileText, FiGitBranch, FiGithub, FiLinkedin, FiMail, FiSearch, FiSettings, FiX } from "react-icons/fi";
import Header from "./Header.jsx";
import Hero from "./PortfolioPicture.jsx";
import OutsideTech from "./OutsideTech.jsx";
import Experience from "./Experience.jsx";
import LinkedInPosts from "./LinkedInPosts.jsx";
import Projects from "./Projects.jsx";
import SkillsSection from "./SkillsSection.jsx";
import Contact from "./ContactMeForm.jsx";
import Footer from "./Footer.jsx";
import "./index.css";

const commands = [
  { label: "Go to about", detail: "The short version", href: "#about", key: "A" },
  { label: "Step outside", detail: "Travel, nature, and life", href: "#outside", key: "O" },
  { label: "Inspect experience", detail: "Where I have shipped", href: "#experience", key: "E" },
  { label: "Read field notes", detail: "Updates from LinkedIn", href: "#updates", key: "U" },
  { label: "Open project files", detail: "Selected builds", href: "#projects", key: "P" },
  { label: "Scan the toolbox", detail: "Skills and systems", href: "#skills", key: "S" },
  { label: "Start a conversation", detail: "Email Alexander", href: "#contact", key: "C" },
];

const EASE = [0.22, 1, 0.36, 1];
const EDITOR_LINE_HEIGHT = 28;
const EDITOR_VISIBLE_LINES = 48;

function EditorLineNumbers() {
  const [firstLine, setFirstLine] = useState(1);

  useEffect(() => {
    let frameId = null;

    const updateLines = () => {
      setFirstLine(Math.floor(window.scrollY / EDITOR_LINE_HEIGHT) + 1);
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId === null) frameId = window.requestAnimationFrame(updateLines);
    };

    updateLines();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="editor-gutter">
      {Array.from({ length: EDITOR_VISIBLE_LINES }, (_, index) => (
        <span key={firstLine + index}>{firstLine + index}</span>
      ))}
    </div>
  );
}

function EditorChrome() {
  return (
    <div className="editor-chrome" aria-hidden="true">
      <aside className="editor-rail">
        <FiFileText className="active" />
        <FiSearch />
        <FiGitBranch />
        <FiBox />
        <FiSettings className="rail-settings" />
      </aside>
      <EditorLineNumbers />
      <div className="editor-status">
        <span><FiGitBranch /> main*</span>
        <span><FiCheck /> Portfolio ready</span>
        <span className="status-spacer" />
        <span>{"{}"} React</span>
        <span>UTF-8</span>
        <span>Ln 1, Col 1</span>
      </div>
    </div>
  );
}

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

function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState("enter");
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      // Reveal the page while the curtain is moving away so it is already
      // painted when the loading screen leaves the viewport.
      setPhase("exit");
      onComplete();
    }, 2000);
    return () => clearTimeout(timerRef.current);
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-overlay intro-overlay--${phase}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-curtain-up") {
          setPhase("done");
        }
      }}
    >
      <div className="intro-content">
        <motion.svg
          className="intro-mark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 140 130"
          role="img"
          aria-label="AP"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { scale: 0.92, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                scale: { duration: 1.1, ease: EASE },
                opacity: { duration: 0.2 },
              },
            },
          }}
          fill="none"
          stroke="url(#intro-ap-stroke)"
        >
          <defs>
            <linearGradient id="intro-ap-stroke" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--intro-mark)" />
              <stop offset="58%" stopColor="var(--intro-mark)" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M7.5 112.5 42.8 18.8c1.8-5 4.9-7.8 9.5-7.8 4.7 0 7.8 2.8 9.7 7.8l19.7 52.8V14.5c0-2.3 1.4-3.7 3.7-3.7h22.2c16.7 0 27.2 9.8 27.2 25.4 0 16.2-10.8 26.3-27.8 26.3h-8.8v48.2c0 2.3-1.4 3.7-3.7 3.7h-9.1c-2.3 0-3.7-1.4-3.7-3.7V96.8H64.2l-5.4-15.2H29.7l-10.5 30.9c-.5 1.4-1.8 2.2-3.4 2.2h-5.7c-2.5 0-3.5-1-2.6-2.2ZM34.9 66.8h18.8l-9-27.4-9.8 27.4Zm63.3-41.2v22.1h8.2c7.9 0 12.1-3.8 12.1-11.2 0-7.1-4.2-10.9-12.1-10.9h-8.2Z"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: { duration: 1.65, ease: [0.65, 0, 0.35, 1] },
                  opacity: { duration: 0.15 },
                },
              },
            }}
          />
        </motion.svg>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

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
  const [introComplete, setIntroComplete] = useState(false);
  const [palette, setPalette] = useState(0);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return "dark";
  });
  const completeIntro = useCallback(() => setIntroComplete(true), []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => window.scrollTo(0, 0);
    resetScroll();
    window.addEventListener("pageshow", resetScroll);

    return () => window.removeEventListener("pageshow", resetScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

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

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <div className={`site theme-${theme} palette-${palette}`}>
      <EditorChrome />
      <ScrollProgressBar />
      <LoadingScreen onComplete={completeIntro} />
      <Header
        isReady={introComplete}
        onOpenCommand={() => setCommandOpen(true)}
        onCyclePalette={() => setPalette((current) => (current + 1) % 3)}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
      />

      <main>
        <Hero isReady={introComplete} />

        <SectionReveal>
          <section id="about" className="about-section ink-section">
            <div className="page-shell about-layout">
              <motion.div
                className="about-headline"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <p className="micro-label">02 / About</p>
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

        <SectionReveal>
          <OutsideTech />
        </SectionReveal>

        <SectionReveal>
          <Experience />
        </SectionReveal>

        <SectionReveal>
          <LinkedInPosts />
        </SectionReveal>

        <SectionReveal>
          <Projects />
        </SectionReveal>

        <SectionReveal>
          <SkillsSection />
        </SectionReveal>

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
        animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
