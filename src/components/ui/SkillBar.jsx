function getSkillLevel(value) {
  if (value >= 80) {
    return "Advanced";
  }

  if (value >= 60) {
    return "Intermediate";
  }

  return "Beginner";
}

export function SkillBar({ name, value, isActive = false, index = 0 }) {
  const level = getSkillLevel(value);
  const levelClass = level.toLowerCase();

  return (
    <div className={`skill-bar skill-level-${levelClass} ${isActive ? "is-active" : ""}`}>
      <div className="skill-meta">
        <div>
          <span>{name}</span>
          <strong>{level}</strong>
        </div>
        <i>{value}%</i>
      </div>
      <div className="skill-track" aria-hidden="true">
        <span
          style={{
            "--skill-value": `${value}%`,
            "--skill-delay": `${index * 70}ms`,
          }}
        />
      </div>
    </div>
  );
}
