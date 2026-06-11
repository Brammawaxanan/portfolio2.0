import { useTheme } from "../../hooks/useTheme.js";

export function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`theme-toggle ${compact ? "is-compact" : ""}`}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      onClick={toggleTheme}
    >
      <i className={`bi ${isDark ? "bi-moon-stars" : "bi-sun"}`} aria-hidden="true" />
      {!compact && <span>{isDark ? "Dark" : "Light"}</span>}
    </button>
  );
}
