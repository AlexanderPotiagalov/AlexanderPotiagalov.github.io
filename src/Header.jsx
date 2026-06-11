import { useState } from "react";
import PropTypes from "prop-types";
import { FiCommand, FiMenu, FiRefreshCw, FiX } from "react-icons/fi";

const navItems = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Toolbox", "#skills"],
  ["Contact", "#contact"],
];

function Header({ onOpenCommand, onCyclePalette }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Alexander Potiagalov home">
        <span className="brand-mark">AP</span>
        <span className="brand-copy">
          <strong>ALEXANDER</strong>
          <small>POTIAGALOV</small>
        </span>
      </a>

      <nav className={open ? "main-nav open" : "main-nav"}>
        {navItems.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-tools">
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
    </header>
  );
}

Header.propTypes = {
  onOpenCommand: PropTypes.func.isRequired,
  onCyclePalette: PropTypes.func.isRequired,
};

export default Header;
