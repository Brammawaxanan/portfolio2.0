export function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.alt} className="project-image" />
        <div className="project-overlay" aria-hidden="true" />
      </div>
      <div className="project-content">
        <p className="project-tech">{project.tech}</p>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <a href={project.href} target="_blank" rel="noreferrer" className="project-btn">
          View Project <i className="bi bi-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
