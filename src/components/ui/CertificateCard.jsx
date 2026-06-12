export function CertificateCard({ certificate }) {
  return (
    <article className="cert-card">
      <div className="cert-icon">
        <i className={`bi ${certificate.icon}`} aria-hidden="true" />
      </div>
      <h3 className="cert-title">{certificate.title}</h3>
      <p className="cert-organization">{certificate.organization}</p>
      <p className="cert-year">
        <i className="bi bi-calendar-event" aria-hidden="true" /> {certificate.year}
      </p>
      <p className="cert-description">{certificate.description}</p>
    </article>
  );
}
