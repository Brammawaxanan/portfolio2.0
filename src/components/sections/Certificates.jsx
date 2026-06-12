import { CertificateCard } from "../ui/CertificateCard.jsx";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";

const certificates = [
  {
    icon: "bi-award",
    title: "Frontend Developer Internship",
    organization: "GAOTek Inc",
    year: "2025",
    description:
      "Completed professional frontend development internship focusing on React.js, Tailwind CSS, and modern UI/UX design principles.",
  },
  {
    icon: "bi-certificate",
    title: "Advanced Certificate in English",
    organization: "GANZ Academy",
    year: "2022",
    description:
      "Comprehensive English language certification focusing on communication skills, fluency, pronunciation, and written expression.",
  },
  {
    icon: "bi-mortarboard",
    title: "BSc Information Technology",
    organization: "SLIIT",
    year: "2023 - 2027",
    description:
      "Pursuing degree with specialization in Data Science, focusing on programming, web design, and systems architecture.",
  },
  {
    icon: "bi-star",
    title: "Web Design Excellence",
    organization: "Self-Certified Achievement",
    year: "2024",
    description:
      "Demonstrated expertise in responsive design, UI/UX principles, and modern web technologies through portfolio projects.",
  },
  {
    icon: "bi-code-square",
    title: "Full Stack Development",
    organization: "Self-Certified Achievement",
    year: "2024",
    description:
      "Proficiency in both frontend and backend technologies including HTML, CSS, JavaScript, PHP, Java, and MySQL.",
  },
  {
    icon: "bi-palette",
    title: "Design Tools Mastery",
    organization: "Self-Certified Achievement",
    year: "2024",
    description:
      "Expert proficiency in design tools including Figma, Canva, DaVinci Resolve, and MockFlow for creating engaging visuals.",
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="certifications section">
      <div className="container">
        <Reveal>
          <SectionTitle
            title="Certifications & Achievements"
            subtitle="Professional credentials and accomplishments"
          />
        </Reveal>
        <div className="cert-grid">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.title} delay={index * 60}>
              <CertificateCard certificate={certificate} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
