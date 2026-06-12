export function InfoCard({ icon, label, value }) {
  return (
    <article className="info-card">
      <div className="info-icon">
        <i className={`bi ${icon}`} aria-hidden="true" />
      </div>
      <div>
        <h3>{label}</h3>
        <p>{value}</p>
      </div>
    </article>
  );
}
