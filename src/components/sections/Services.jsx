import { useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const services = [
  {
    id: "programming",
    icon: "bi-bar-chart",
    title: "Programming",
    items: [
      "Responsive desktop Design",
      "Interactive User System Interfaces",
      "Systematically applying statistical and logical techniques.",
      "Visualizing graphs, charts and preparing reports and dashboards.",
    ],
  },
  {
    id: "designer",
    icon: "bi-cash-stack",
    title: "Designer",
    items: [
      "Intuitive User Interface Design",
      "Responsive and Mobile-First Design",
      "Seamless User Experience Optimization",
      "Accessibility and Usability Enhancements",
    ],
  },
  {
    id: "webdev",
    icon: "bi-code-slash",
    title: "Web Developer",
    items: [
      "I develop the user interface.",
      "Webpage development.",
      "I create Ux element interactions.",
      "Well versed in HTML, CSS, and JavaScript.",
    ],
  },
];

export function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="services" className="services section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Services" subtitle="What I offer" />
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 75}>
            <article className="service-card">
              <div className="service-icon">
                <i className={`bi ${service.icon}`} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <button className="service-link" type="button" onClick={() => setActiveService(service)}>
                View more <i className="bi bi-arrow-right" aria-hidden="true" />
              </button>
            </article>
            </Reveal>
          ))}
        </div>
      </div>

      {activeService && (
        <div className="modal-backdrop" role="presentation" onClick={() => setActiveService(null)}>
          <div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3 id="service-modal-title">{activeService.title}</h3>
              <button type="button" aria-label="Close service details" onClick={() => setActiveService(null)}>
                <i className="bi bi-x-lg" aria-hidden="true" />
              </button>
            </div>
            <ul>
              {activeService.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
