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
    id: "carenet-featured",
    title: "CareNet – In-Home Care Service Management Platform",
    tech: "React.js • Spring Boot • MySQL",
    description:
      "A full-stack caregiver service management platform that connects clients with caregivers and provides admin task management, assignment tracking, proof verification, billing overview, and dashboard analytics.",
    image: "/img/projects/carenet.png",
    alt: "CareNet In-Home Care Service Management Platform",
    href: "https://github.com/Brammawaxanan/final-carenet-website.git",
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
  id: "edutrack-smart-campus-featured",
  title: "EduTrack – Smart Campus Operations Hub",
  tech: "Spring Boot • React • MySQL • Java ML",
  description:
    "A group full-stack smart campus platform for managing campus resources, bookings, incidents, role-based dashboards, notifications, and admin workflows. My main contribution was developing the ticket management module for handling student requests, status updates, and resolution tracking.",
  image: "/img/projects/edutrack-poster.png",
  alt: "EduTrack Smart Campus Operations Hub",
  href: "https://github.com/KabiththananParan/it3030-paf-2026-smart-campus.git",
  },
  {
  id: "dwbi-ecommerce-analytics-featured",
  title: "E-Commerce DWBI Analytics Project",
  tech: "SSAS • Power BI • OLAP • Data Warehouse",
  description:
    "A data warehousing and business intelligence project built using an e-commerce transactional dataset. The project includes SSAS cube implementation, dimension and measure configuration, OLAP operations such as roll-up, drill-down, slice, dice, and pivot, and interactive Power BI reports for analyzing sales performance, product categories, customer locations, and payment trends.",
  image: "img/projects/dwbi-ecommerce-poster.png",
  alt: "E-Commerce Data Warehouse and Business Intelligence Analytics Project",
  href: "https://mysliit-my.sharepoint.com/:f:/g/personal/it23680920_my_sliit_lk/IgCP0Zs5fg8BSIZOZGHiYiEKAX0EVZMzahSwOZF-MG6el_U?e=nOP8VP",
  },
  {
    id: "iris-svm-classification-featured",
    title: "Iris Flower Species Classification",
    tech: "Python • Scikit-learn • SVM",
    description:
      "A beginner-friendly machine learning classification project that uses the Iris dataset to predict flower species based on sepal and petal measurements. The project includes EDA, correlation analysis, feature scaling, SVM model training, evaluation, and model saving.",
    image: "/img/projects/iris-svm-poster.png",
    alt: "Iris Flower Species Classification using SVM",
    href: "https://github.com/Brammawaxanan/CodeAlpha_IrisClassification_DataScience.git",
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
