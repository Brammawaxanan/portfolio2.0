import { useEffect, useRef, useState } from "react";
import { skills } from "../../data/skills.js";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { SkillBar } from "../ui/SkillBar.jsx";

const INITIAL_SKILL_COUNT = 9;
const importantSkills = skills.slice(0, INITIAL_SKILL_COUNT);
const remainingSkills = skills.slice(INITIAL_SKILL_COUNT);

export function Skills() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    function checkInView() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const activationPoint = window.innerHeight * 0.84;

      if (rect.top < activationPoint && rect.bottom > 0) {
        setIsInView(true);
      }
    }

    checkInView();
    window.addEventListener("scroll", checkInView, { passive: true });
    window.addEventListener("resize", checkInView);

    return () => {
      window.removeEventListener("scroll", checkInView);
      window.removeEventListener("resize", checkInView);
    };
  }, []);

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Skills"
            subtitle="I am continuously improving my skills in Data Analytics, AI/ML, Data Engineering, and Web Development to build practical data-driven solutions."
            activateOnView
          />
        </Reveal>
        <div className="skills-grid">
          {importantSkills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 55}>
              <SkillBar {...skill} isActive={isInView} index={index} />
            </Reveal>
          ))}
        </div>
        <div
          className={`skills-extra-shell${showAllSkills ? " is-open" : ""}`}
          aria-hidden={!showAllSkills}
        >
          <div className="skills-extra-grid">
            {remainingSkills.map((skill, index) => {
              const skillIndex = index + INITIAL_SKILL_COUNT;

              return (
                <Reveal key={skill.name} delay={index * 55}>
                  <SkillBar
                    {...skill}
                    isActive={isInView && showAllSkills}
                    index={skillIndex}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
        <div className="skills-toggle-wrap">
          <button
            className="button button-secondary skills-toggle"
            type="button"
            aria-expanded={showAllSkills}
            onClick={() => setShowAllSkills((value) => !value)}
          >
            <i className={`bi ${showAllSkills ? "bi-chevron-up" : "bi-chevron-down"}`} aria-hidden="true" />
            {showAllSkills ? "Show Less" : "See More"}
          </button>
        </div>
      </div>
    </section>
  );
}
