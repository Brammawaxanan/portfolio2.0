export function SkillCard({ title, skills }) {
  return (
    <article className="skill-card">
      <h3>{title}</h3>
      <div className="tag-list">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </article>
  );
}
