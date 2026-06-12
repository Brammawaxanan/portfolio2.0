import { ThemeToggle } from "./ThemeToggle.jsx";

export function Sidebar({ navItems, activeSection }) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <nav>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              className={isActive ? "is-active" : ""}
              href={`#${item.id}`}
              aria-label={item.sectionTitle ?? item.label}
              aria-current={isActive ? "page" : undefined}
              data-section-link={item.id}
            >
              <i className={`bi ${item.icon}`} aria-hidden="true" />
              <span>{item.sectionTitle ?? item.label}</span>
            </a>
          );
        })}
      </nav>
      <ThemeToggle compact />
    </aside>
  );
}
