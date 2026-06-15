export function ProjectCard({
  project,
  variant = "carousel",
  position = "",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) {
  const theme = project.theme ?? {};
  const cardClassName = [
    "project-card",
    variant === "grid" ? "project-card-grid" : "",
    position ? `project-card-${position}` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const themeStyle = {
    "--project-primary": theme.primary ?? "#2a51d2",
    "--project-primary-rgb": theme.primaryRgb ?? "42 81 210",
    "--project-secondary": theme.secondary ?? "#edf4ff",
    "--project-accent": theme.accent ?? "#79a6ff",
    "--project-wash": theme.wash ?? "#ffffff",
  };

  return (
    <a
      className={cardClassName}
      style={themeStyle}
      href={project.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title} project`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.alt} className="project-image" />
        <div className="project-overlay" aria-hidden="true" />
      </div>
      <div className="project-content">
        <p className="project-tech">{project.tech}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <span className="project-btn">
          View Project <i className="bi bi-arrow-right" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
