import { useState } from "react";
import { useInView } from "../../hooks/useInView.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { SkillBar } from "../ui/SkillBar.jsx";

const primarySkills = [
  { name: "Java", value: 80 },
  { name: "Python", value: 60 },
  { name: "Spring Boot", value: 60 },
  { name: "JavaScript", value: 75 },
  { name: "React", value: 70 },
  { name: "Tailwind CSS", value: 65 },
];

const additionalSkills = [
  { name: "PHP", value: 80 },
  { name: "HTML", value: 90 },
  { name: "CSS", value: 80 },
  { name: "Canva", value: 95 },
  { name: "DaVinci Resolve", value: 75 },
  { name: "Kotlin", value: 60 },
];

export function Skills() {
  const [showMore, setShowMore] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.24 });
  const visibleSkills = showMore
    ? [...primarySkills, ...additionalSkills]
    : primarySkills;

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Skills"
            subtitle="I am continuously improving my skills to become the best web developer and web designer I can be."
          />
        </Reveal>
        <div ref={ref} className="skills-grid">
          {visibleSkills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 55}>
              <SkillBar {...skill} isActive={isInView} />
            </Reveal>
          ))}
        </div>
        <div className="section-action">
          <button className="button button-secondary" type="button" onClick={() => setShowMore((value) => !value)}>
            <i className={`bi ${showMore ? "bi-chevron-up" : "bi-chevron-down"}`} aria-hidden="true" />
            {showMore ? "See Less Skills" : "See More Skills"}
          </button>
        </div>
      </div>
    </section>
  );
}
