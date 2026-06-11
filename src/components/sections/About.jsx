import { Button } from "../ui/Button.jsx";
import { InfoCard } from "../ui/InfoCard.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const infoCards = [
  { icon: "bi-mortarboard", label: "Education", value: "BSc IT @ SLIIT" },
  { icon: "bi-telephone", label: "Phone", value: "+94 76 176 4440" },
  { icon: "bi-envelope", label: "Email", value: "sbwaxan@gmail.com" },
  { icon: "bi-geo-alt", label: "Location", value: "Trincomalee, Sri Lanka" },
];

const points = [
  "I have expertise in both front-end and back-end technologies such as HTML, CSS, JavaScript, PHP, and MySQL",
  "Proficient in design tools like Figma and MockFlow for creating responsive, user-friendly web solutions",
  "Constantly exploring new technologies and contributing to innovative web projects",
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
              <p>Web Designer &amp; Developer</p>
            </div>
          </Reveal>

          <Reveal className="about-content" effect="slide-left" delay={90}>
            <h3>Passionate AI &amp; Web Development Student</h3>
            <p>
              I am a Web Designer &amp; Web Developer currently studying
              Information Technology at SLIIT, specializing in Data Science.
              Passionate about building innovative and functional web solutions,
              I am always eager to expand my skills and collaborate on exciting
              projects.
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
              <Button href="/waxan.pdf" download>
                <i className="bi bi-download" aria-hidden="true" /> Download CV
              </Button>
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
