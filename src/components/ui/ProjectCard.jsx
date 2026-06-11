export function ProjectCard({
  project,
  position = "",
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}) {
  return (
    <a
      className={`project-card ${position ? `project-card-${position}` : ""}`}
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
