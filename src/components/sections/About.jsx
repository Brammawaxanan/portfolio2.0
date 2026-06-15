import { Button } from "../ui/Button.jsx";
import { InfoCard } from "../ui/InfoCard.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { ResumeDropdown } from "../ui/ResumeDropdown.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const infoCards = [
  { icon: "bi-mortarboard", label: "Education", value: "BSc (Hons) IT - Data Science SLIIT | 3rd Year" },
  { icon: "bi-telephone", label: "Phone", value: "+94 76 176 4440" },
  { icon: "bi-envelope", label: "Email", value: "sbwaxan@gmail.com" },
  { icon: "bi-geo-alt", label: "Location", value: "Colombo, Sri Lanka" },
];

const points = [
  "Strong foundation in Data Analytics, including data cleaning, EDA, visualization, SQL queries, and dashboard development.",
  "Building AI/ML skills using Python, Pandas, NumPy, Scikit-learn, Matplotlib, and machine learning model evaluation.",
  "Learning Data Engineering concepts such as databases, APIs, ETL workflows, MongoDB, and backend integration.",
];

export function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <Reveal>
          <SectionTitle title="About Me" />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-visual" effect="slide-right">
            <div className="about-image-wrapper">
              <span className="glow-circle glow-1" />
              <span className="glow-circle glow-2" />
              <img
                src="/img/profile.jpeg"
                className="about-image"
                alt="Profile photo of Brammawaxanan"
              />
            </div>
            <div className="profile-info-badge">
              <h3>
                Brammawaxanan
                <br />
                Sivanantharajah
              </h3>
              <p>Data Science Undergraduate <br /> AI/ML &amp; Analytics Enthusiast</p>
            </div>
          </Reveal>

          <Reveal className="about-content" effect="slide-left" delay={90}>
            <h3>Aspiring Data Analyst &amp; AI/ML Developer</h3>
            <p>
              I am a 3rd-year Data Science undergraduate at SLIIT, passionate about Data Analytics, Artificial Intelligence, Machine Learning, and Data Engineering. I enjoy working with real-world datasets, cleaning and analyzing data, building predictive models, and creating dashboards that support better decision-making. I am continuously improving my skills in Python, SQL, Power BI, Machine Learning, and modern web technologies.
            </p>

            <div className="info-cards-grid">
              {infoCards.map((card) => (
                <InfoCard key={card.label} {...card} />
              ))}
            </div>

            <div className="about-points">
              {points.map((point) => (
                <p key={point}>
                  <i className="bi bi-arrow-right" aria-hidden="true" />
                  <span>{point}</span>
                </p>
              ))}
            </div>

            <div className="about-buttons">
              <ResumeDropdown />
              <Button href="#contact" variant="outline">
                <i className="bi bi-chat-square" aria-hidden="true" /> Contact Me
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
