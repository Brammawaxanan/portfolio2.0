import { useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { TimelineItem } from "../ui/TimelineItem.jsx";

const educationItems = [
  {
    title: "BSc Information Technology",
    place: "SLIIT (Sri Lanka Institute of Information Technology)",
    period: "2023 - 2027",
    description: "Focus Areas: Programming, Web Design, Computer Networks, Systems Design, PHP, Java",
  },
  {
    title: "Advanced Certificate in English",
    place: "GANZ Academy",
    period: "2022 - 6 months",
    description: "Comprehensive English language program enhancing communication skills, fluency, pronunciation, and written expression.",
  },
  {
    title: "G.C.E Advanced Level (A/L)",
    place: "R.K.M Sri Koneswara Hindu College",
    period: "2017 - 2019",
    description: "Subjects: Information Technology, Physics, Chemistry",
  },
];

const experienceItems = [
  {
    title: "Data Entry Operator",
    place: "Mayoora Construction",
    period: "2020 - 2023",
    tools: "Microsoft Excel",
    description:
      "Managed data, updated spreadsheets, ensured accuracy, and maintained project records.",
  },
  {
    title: "Frontend Developer Intern & Digital Marketing",
    place: "GAOTek Inc",
    period: "2025 - 3 months",
    tools: "React.js, Tailwind CSS, Figma, WordPress",
    description:
      "Built responsive React components from Figma, handled product uploads in WordPress, and improved modern frontend, UI/UX, and professional collaboration abilities.",
  },
];

export function Qualifications() {
  const [activeTab, setActiveTab] = useState("education");
  const items = activeTab === "education" ? educationItems : experienceItems;

  return (
    <section id="qualifications" className="qualification section">
      <div className="container narrow-container">
        <Reveal>
          <SectionTitle title="Qualification" subtitle="My personal journey" />
        </Reveal>
        <Reveal className="qualification-tabs" delay={80}>
          <button
            className={activeTab === "education" ? "is-active" : ""}
            type="button"
            aria-pressed={activeTab === "education"}
            onClick={() => setActiveTab("education")}
          >
            <i className="bi bi-mortarboard" aria-hidden="true" />
            Education
          </button>
          <button
            className={activeTab === "work" ? "is-active" : ""}
            type="button"
            aria-pressed={activeTab === "work"}
            onClick={() => setActiveTab("work")}
          >
            <i className="bi bi-briefcase" aria-hidden="true" />
            Work Experience
          </button>
        </Reveal>
        <div className="timeline-panel" key={activeTab}>
          <div className={`timeline ${activeTab === "work" ? "timeline-muted" : ""}`}>
            {items.map((item, index) => (
              <Reveal key={`${item.title}-${item.period}`} delay={index * 90}>
                <TimelineItem item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
