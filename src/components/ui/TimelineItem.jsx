export function TimelineItem({ item }) {
  return (
    <article className="timeline-item">
      <div className="timeline-dot" aria-hidden="true" />
      <div className="timeline-content">
        <h3>{item.title}</h3>
        <p className="timeline-meta">
          <i className="bi bi-building" aria-hidden="true" /> {item.place}
        </p>
        <p className="timeline-meta">
          <i className="bi bi-calendar-event" aria-hidden="true" /> {item.period}
        </p>
        {item.tools && (
          <p className="timeline-meta">
            <i className="bi bi-tools" aria-hidden="true" /> {item.tools}
          </p>
        )}
        <p>{item.description}</p>
      </div>
    </article>
  );
}
