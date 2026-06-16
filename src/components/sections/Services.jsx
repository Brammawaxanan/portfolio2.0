import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const fiverrProfileUrl = "https://www.fiverr.com/wax_pixel/buying?source=avatar_menu_profile";

const services = [
  {
    id: "data-analysis-reporting",
    icon: "bi-graph-up-arrow",
    title: "Data Analysis & Reporting",
    description:
      "I clean, analyze, and interpret data using Python, SQL, Excel, and Pandas to generate useful insights and reports.",
    details: [
      "Data cleaning and preprocessing",
      "Exploratory data analysis",
      "SQL queries and reports",
      "Excel analysis and summaries",
      "Business insight generation",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
  {
    id: "power-bi-dashboard-design",
    icon: "bi-bar-chart-line",
    title: "Power BI Dashboard Design",
    description:
      "I create interactive and professional dashboards using Power BI to visualize KPIs, trends, and business performance.",
    details: [
      "Interactive BI dashboards",
      "KPI cards and charts",
      "Sales/business dashboards",
      "Data storytelling",
      "Clean and user-friendly reports",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
  {
    id: "ai-ml-model-development",
    icon: "bi-cpu",
    title: "AI/ML Model Development",
    description:
      "I build basic to intermediate machine learning models for prediction, classification, and data-driven decision-making.",
    details: [
      "Machine learning model training",
      "Regression and classification models",
      "Scikit-learn workflows",
      "Model evaluation",
      "Prediction-based applications",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
  {
    id: "data-cleaning-preprocessing",
    icon: "bi-database-check",
    title: "Data Cleaning & Preprocessing",
    description:
      "I prepare raw datasets for analysis and machine learning by cleaning, transforming, and structuring data properly.",
    details: [
      "Missing value handling",
      "Duplicate removal",
      "Feature preparation",
      "Data formatting",
      "Dataset optimization",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
  {
    id: "web-development",
    icon: "bi-code-slash",
    title: "Web Development",
    description:
      "I develop responsive and modern websites using React, JavaScript, Node.js, Express.js, and MongoDB.",
    details: [
      "Responsive frontend design",
      "React components",
      "MERN stack web apps",
      "API integration",
      "Modern UI/UX implementation",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
  {
    id: "portfolio-landing-page-design",
    icon: "bi-window-stack",
    title: "Portfolio & Landing Page Design",
    description:
      "I design attractive personal portfolios, business landing pages, and responsive web pages with clean UI and animations.",
    details: [
      "Personal portfolio websites",
      "Landing pages",
      "Responsive UI design",
      "Smooth animations",
      "Professional layout design",
    ],
    fiverrUrl: fiverrProfileUrl,
  },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function Services() {
  const [activeService, setActiveService] = useState(null);

  function handleServiceCardKeyDown(event, service) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveService(service);
    }
  }

  useEffect(() => {
    if (!activeService) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveService(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeService]);

  return (
    <section id="services" className="services section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Services" subtitle="What I offer" />
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 75}>
              <article
                className="service-card"
                role="button"
                tabIndex={0}
                aria-label={`View details for ${service.title}`}
                onClick={() => setActiveService(service)}
                onKeyDown={(event) => handleServiceCardKeyDown(event, service)}
              >
                <div className="service-icon">
                  <i className={`bi ${service.icon}`} aria-hidden="true" />
                </div>
                <div className="service-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-link" aria-hidden="true">
                  View more <i className="bi bi-arrow-right" aria-hidden="true" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            className="modal-backdrop"
            role="presentation"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setActiveService(null)}
          >
            <motion.div
              className="service-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              aria-describedby="service-modal-description"
              variants={modalVariants}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-header">
                <div className="service-modal-heading">
                  <div className="service-icon service-modal-icon">
                    <i className={`bi ${activeService.icon}`} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="service-modal-kicker">Service details</p>
                    <h3 id="service-modal-title">{activeService.title}</h3>
                  </div>
                </div>
                <button type="button" aria-label="Close service details" onClick={() => setActiveService(null)}>
                  <i className="bi bi-x-lg" aria-hidden="true" />
                </button>
              </div>
              <p id="service-modal-description" className="service-modal-description">
                {activeService.description}
              </p>
              <ul className="service-detail-list">
                {activeService.details.map((item) => (
                  <li key={item}>
                    <i className="bi bi-check2" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className="fiverr-cta" href={activeService.fiverrUrl} target="_blank" rel="noopener noreferrer">
                <span>Hire Me on Fiverr</span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
