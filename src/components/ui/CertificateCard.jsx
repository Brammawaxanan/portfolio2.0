export function CertificateCard({ certificate }) {
  const isSectionLink = certificate.href?.startsWith("#");
  const hasLink = Boolean(certificate.href);
  const CardElement = hasLink ? "a" : "article";
  const cardProps = hasLink
    ? {
        href: certificate.href,
        ...(!isSectionLink ? { target: "_blank", rel: "noreferrer" } : {}),
        "aria-label": `View details for ${certificate.title}`,
      }
    : {};

  return (
    <CardElement className={`cert-card ${hasLink ? "cert-card-linkable" : ""}`} {...cardProps}>
      <div className="cert-icon">
        <i className={`bi ${certificate.icon}`} aria-hidden="true" />
      </div>
      <h3 className="cert-title">{certificate.title}</h3>
      <p className="cert-organization">{certificate.organization}</p>
      <p className="cert-year">
        <i className="bi bi-calendar-event" aria-hidden="true" /> {certificate.year}
      </p>
      <p className="cert-description">{certificate.description}</p>
      {!hasLink && (
        <span className="cert-link cert-link-disabled" aria-disabled="true">
          Link Coming Soon <i className="bi bi-lock" aria-hidden="true" />
        </span>
      )}
    </CardElement>
  );
}
