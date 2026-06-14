import { Button } from "../ui/Button.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { ResumeDropdown } from "../ui/ResumeDropdown.jsx";
import { SocialLinks } from "../ui/SocialLinks.jsx";
import { useTypingEffect } from "../../hooks/useTypingEffect.js";

const typedRoles = ["Analyzer", "Designer", "Developer"];

export function Hero() {
  const typedRole = useTypingEffect(typedRoles);

  return (
    <section id="home" className="hero section">
      <img
        src="/img/sbwaxan.png"
        alt="Brammawaxanan Sivanantharajah"
        className="hero-img"
      />
      <Reveal className="hero-content container" delay={80}>
        <p className="eyebrow">IT Undergraduate Portfolio</p>
        <h1>Brammawaxanan Sivanantharajah</h1>
        <p className="hero-role" aria-live="polite">
          I'm a{" "}
          <span className="typed-text">
            {typedRole || "\u00A0"}
            <span className="typing-cursor" aria-hidden="true" />
          </span>
        </p>
        <p className="hero-copy">
          Web Designer and Web Developer studying Information Technology at SLIIT,
          specializing in Data Science.
        </p>
        <SocialLinks />
        <div className="hero-actions">
          <Button href="#projects">View Projects</Button>
          <ResumeDropdown variant="secondary" />
          <Button href="#contact" variant="outline">
            Contact Me
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
