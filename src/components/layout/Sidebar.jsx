import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ navItems, activeSection }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <nav>
        {navItems.map((item) => (
          <a
            key={item.id}
            className={activeSection === item.id ? "is-active" : ""}
            href={`#${item.id}`}
            aria-label={item.label}
          >
            <i className={`bi ${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <ThemeToggle compact />
    </aside>
  );
}
