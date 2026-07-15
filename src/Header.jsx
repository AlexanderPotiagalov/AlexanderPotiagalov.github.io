import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FiCommand, FiMenu, FiRefreshCw, FiX } from "react-icons/fi";
import MusicPlayer from "./MusicPlayer.jsx";

const navItems = [
  ["About", "#about"],
  ["Outside", "#outside"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Toolbox", "#skills"],
  ["Contact", "#contact"],
];

function Header({ onOpenCommand, onCyclePalette }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="site-header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="brand" href="#top" aria-label="Alexander Potiagalov home">
        <span className="brand-mark">AP</span>
        <span className="brand-copy">
          <strong>ALEXANDER</strong>
          <small>POTIAGALOV</small>
        </span>
      </a>

      <nav className={open ? "main-nav open" : "main-nav"}>
        {navItems.map(([label, href], i) => (
          <motion.a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.06 }}
          >
            {label}
          </motion.a>
        ))}
      </nav>

      <div className="header-tools">
        <MusicPlayer />
        <button type="button" className="ink-button" onClick={onCyclePalette}>
          <FiRefreshCw />
          <span>RE-INK</span>
        </button>
        <button type="button" className="deck-button" onClick={onOpenCommand}>
          <FiCommand />
          <span>DECK</span>
          <kbd>CTRL K</kbd>
        </button>
        <button
          type="button"
          className="menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </motion.header>
  );
}

Header.propTypes = {
  onOpenCommand: PropTypes.func.isRequired,
  onCyclePalette: PropTypes.func.isRequired,
};

export default Header;
