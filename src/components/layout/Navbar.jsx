import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function Navbar({ navItems, activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="topbar">
      <a className="brand-mark" href="#home" onClick={closeMenu}>
        <span>SB</span>
        <strong>Waxan</strong>
      </a>

      <div className="topbar-actions">
        <ThemeToggle />
        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-navigation ${isOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            className={activeSection === item.id ? "is-active" : ""}
            href={`#${item.id}`}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
