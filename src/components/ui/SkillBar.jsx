export function SkillBar({ name, value, isActive = false }) {
  return (
    <div className={`skill-bar ${isActive ? "is-active" : ""}`}>
      <div className="skill-meta">
        <span>{name}</span>
        <i>{value}%</i>
      </div>
      <div className="skill-track" aria-hidden="true">
        <span style={{ "--skill-value": `${value}%` }} />
      </div>
    </div>
  );
}
