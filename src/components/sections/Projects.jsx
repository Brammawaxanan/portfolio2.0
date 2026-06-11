import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { ProjectCard } from "../ui/ProjectCard.jsx";

const projects = [
  {
    title: "Kid's World Online shopping store",
    tech: "Java MVC Architecture",
    description:
      "An online dress store for children offering a seamless platform for browsing, ordering, and managing kids' clothing with a user-friendly interface for parents to shop.",
    image: "/img/projects/kid's wolrd.png",
    alt: "Kid's World Online shopping store",
    href: "https://github.com/Brammawaxanan/Kids-World-Online-Store/tree/main/Kid's%20World",
  },
  {
    title: "Online Job Portal",
    tech: "PHP Backend",
    description:
      "Hire Hub is a comprehensive job portal connecting employers with job seekers through an intuitive platform for posting opportunities, applying for roles, and managing profiles.",
    image: "/img/projects/online job.png",
    alt: "Online Job Portal",
    href: "https://github.com/Brammawaxanan/online-job-portal/tree/main/jobportal",
  },
];

export function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Projects" subtitle="Most recent works" />
        </Reveal>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
