import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { ProjectCard } from "../ui/ProjectCard.jsx";

const projects = [
  {
    id: "kids-world-store",
    title: "Kid's World Online shopping store",
    tech: "Java MVC Architecture",
    description:
      "An online dress store for children offering a seamless platform for browsing, ordering, and managing kids' clothing with a user-friendly interface for parents to shop.",
    image: "/img/projects/kid's wolrd.png",
    alt: "Kid's World Online shopping store",
    href: "https://github.com/Brammawaxanan/Kids-World-Online-Store/tree/main/Kid's%20World",
  },
  {
    id: "kids-world-store-featured",
    title: "Kid's World Online shopping store",
    tech: "Java MVC Architecture",
    description:
      "An online dress store for children offering a seamless platform for browsing, ordering, and managing kids' clothing with a user-friendly interface for parents to shop.",
    image: "/img/projects/kid's wolrd.png",
    alt: "Kid's World Online shopping store",
    href: "https://github.com/Brammawaxanan/Kids-World-Online-Store/tree/main/Kid's%20World",
  },
  {
    id: "online-job-portal",
    title: "Online Job Portal",
    tech: "PHP Backend",
    description:
      "Hire Hub is a comprehensive job portal connecting employers with job seekers through an intuitive platform for posting opportunities, applying for roles, and managing profiles.",
    image: "/img/projects/online job.png",
    alt: "Online Job Portal",
    href: "https://github.com/Brammawaxanan/online-job-portal/tree/main/jobportal",
  },
  {
    id: "online-job-portal-featured",
    title: "Online Job Portal",
    tech: "PHP Backend",
    description:
      "Hire Hub is a comprehensive job portal connecting employers with job seekers through an intuitive platform for posting opportunities, applying for roles, and managing profiles.",
    image: "/img/projects/online job.png",
    alt: "Online Job Portal",
    href: "https://github.com/Brammawaxanan/online-job-portal/tree/main/jobportal",
  }
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("forward");
  const hoverFocusTimeoutRef = useRef(null);
  const projectCount = projects.length;

  const normalizeIndex = useCallback((index) => {
    return (index + projectCount) % projectCount;
  }, [projectCount]);

  const goToNext = useCallback(() => {
    setDirection("forward");
    setActiveIndex((current) => normalizeIndex(current + 1));
  }, [normalizeIndex]);

  const goToPrevious = useCallback(() => {
    setDirection("backward");
    setActiveIndex((current) => normalizeIndex(current - 1));
  }, [normalizeIndex]);

  useEffect(() => {
    if (isPaused || projectCount <= 1) return undefined;

    const intervalId = window.setInterval(goToNext, 3000);

    return () => window.clearInterval(intervalId);
  }, [goToNext, isPaused, projectCount]);

  function getProjectPosition(index) {
    let offset = index - activeIndex;

    if (direction === "forward") {
      if (offset < -1) offset += projectCount;
      if (offset > 2) offset -= projectCount;
    } else {
      if (offset > 1) offset -= projectCount;
      if (offset < -2) offset += projectCount;
    }

    if (offset === 0) return "center";
    if (offset === -1) return "left";
    if (offset === 1) return "right";
    if (offset < -1) return "out-left";
    return "out-right";
  }

  function focusProject(index) {
    const position = getProjectPosition(index);

    if (position === "right" || position === "out-right") {
      setDirection("forward");
    }

    if (position === "left" || position === "out-left") {
      setDirection("backward");
    }

    setIsPaused(true);
    setActiveIndex(index);
  }

  function clearHoverFocusTimer() {
    if (hoverFocusTimeoutRef.current !== null) {
      window.clearTimeout(hoverFocusTimeoutRef.current);
      hoverFocusTimeoutRef.current = null;
    }
  }

  function focusProjectAfterHover(index) {
    clearHoverFocusTimer();
    hoverFocusTimeoutRef.current = window.setTimeout(() => {
      focusProject(index);
      hoverFocusTimeoutRef.current = null;
    }, 500);
  }

  useEffect(() => {
    return () => {
      clearHoverFocusTimer();
    };
  }, []);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Projects" subtitle="Most recent works" />
        </Reveal>
        <Reveal delay={80}>
          <div
            className="projects-carousel"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              clearHoverFocusTimer();
              setIsPaused(false);
            }}
          >
            <button
              className="carousel-control carousel-control-prev"
              type="button"
              aria-label="Show previous project"
              onClick={goToPrevious}
            >
              <i className="bi bi-chevron-left" aria-hidden="true" />
            </button>

            <div className="projects-carousel-track">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  position={getProjectPosition(index)}
                  onMouseEnter={() => focusProjectAfterHover(index)}
                  onMouseLeave={clearHoverFocusTimer}
                  onFocus={() => focusProject(index)}
                  onBlur={() => {
                    clearHoverFocusTimer();
                    setIsPaused(false);
                  }}
                />
              ))}
            </div>

            <button
              className="carousel-control carousel-control-next"
              type="button"
              aria-label="Show next project"
              onClick={goToNext}
            >
              <i className="bi bi-chevron-right" aria-hidden="true" />
            </button>

            <div className="carousel-status" aria-live="polite">
              <span>
                {activeIndex + 1} / {projectCount}
              </span>
              <span>{isPaused ? "Paused" : "Auto playing"}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
