import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../ui/Reveal.jsx";
import { SectionTitle } from "../ui/SectionTitle.jsx";
import { ProjectCard } from "../ui/ProjectCard.jsx";

const INITIAL_PROJECT_COUNT = 3;

const projectCategories = [
  "Data Analyse",
  "AIML",
  "Web Application",
  "Mobile App",
  "Data Engineering",
];

const projects = [
  {
    id: "kids-world-store",
    title: "Kid's World Online shopping store",
    category: "Web Application",
    tech: "Java MVC Architecture",
    description:
      "An online dress store for children offering a seamless platform for browsing, ordering, and managing kids' clothing with a user-friendly interface for parents to shop.",
    image: "/img/projects/kid's wolrd.png",
    alt: "Kid's World Online shopping store",
    href: "https://github.com/Brammawaxanan/Kids-World-Online-Store/tree/main/Kid's%20World",
    theme: {
      primary: "#b46ac9",
      primaryRgb: "180 106 201",
      secondary: "#f8eaf5",
      accent: "#d99bea",
      wash: "#f4f0ff",
    },
  },
  {
    id: "carenet-featured",
    title: "CareNet – In-Home Care Service Management Platform",
    category: "Web Application",
    tech: "React.js • Spring Boot • MySQL",
    description:
      "A full-stack caregiver service management platform that connects clients with caregivers and provides admin task management, assignment tracking, proof verification, billing overview, and dashboard analytics.",
    image: "/img/projects/carenet.png",
    alt: "CareNet In-Home Care Service Management Platform",
    href: "https://github.com/Brammawaxanan/final-carenet-website.git",
    theme: {
      primary: "#2f5b9f",
      primaryRgb: "47 91 159",
      secondary: "#eef4fb",
      accent: "#83a8d8",
      wash: "#f5f8fb",
    },
  },
  {
    id: "online-job-portal",
    title: "Online Job Portal",
    category: "Web Application",
    tech: "PHP Backend",
    description:
      "Hire Hub is a comprehensive job portal connecting employers with job seekers through an intuitive platform for posting opportunities, applying for roles, and managing profiles.",
    image: "/img/projects/online job.png",
    alt: "Online Job Portal",
    href: "https://github.com/Brammawaxanan/online-job-portal/tree/main/jobportal",
    theme: {
      primary: "#428ac8",
      primaryRgb: "66 138 200",
      secondary: "#e9f6ff",
      accent: "#8cc9ff",
      wash: "#f4fbff",
    },
  },
  {
    id: "edutrack-smart-campus-featured",
    title: "EduTrack – Smart Campus Operations Hub",
    category: "Web Application",
    tech: "Spring Boot • React • MySQL • Java ML",
    description:
      "A group full-stack smart campus platform for managing campus resources, bookings, incidents, role-based dashboards, notifications, and admin workflows. My main contribution was developing the ticket management module for handling student requests, status updates, and resolution tracking.",
    image: "/img/projects/edutrack-poster.png",
    alt: "EduTrack Smart Campus Operations Hub",
    href: "https://github.com/KabiththananParan/it3030-paf-2026-smart-campus.git",
    theme: {
      primary: "#557fbe",
      primaryRgb: "85 127 190",
      secondary: "#eef5ff",
      accent: "#9bb7df",
      wash: "#fbf3f5",
    },
  },
  {
    id: "dwbi-ecommerce-analytics-featured",
    title: "E-Commerce DWBI Analytics Project",
    category: "Data Analyse",
    tech: "SSAS • Power BI • OLAP • Data Warehouse",
    description:
      "A data warehousing and business intelligence project built using an e-commerce transactional dataset. The project includes SSAS cube implementation, dimension and measure configuration, OLAP operations such as roll-up, drill-down, slice, dice, and pivot, and interactive Power BI reports for analyzing sales performance, product categories, customer locations, and payment trends.",
    image: "/img/projects/dwbi-ecommerce-poster.png",
    alt: "E-Commerce Data Warehouse and Business Intelligence Analytics Project",
    href: "https://mysliit-my.sharepoint.com/:f:/g/personal/it23680920_my_sliit_lk/IgCP0Zs5fg8BSIZOZGHiYiEKAX0EVZMzahSwOZF-MG6el_U?e=nOP8VP",
    theme: {
      primary: "#315b84",
      primaryRgb: "49 91 132",
      secondary: "#eef4fa",
      accent: "#86aeca",
      wash: "#f6f8fb",
    },
  },
  {
    id: "skypass-flight-booking-app",
    title: "SkyPass Android Flight Booking App",
    category: "Mobile App",
    tech: "Kotlin • XML • Material UI • ConstraintLayout",
    description:
      "A modern Android flight-booking app with a complete booking flow from login and flight search to passenger details and boarding pass confirmation. Built with Kotlin and XML layouts, featuring a clean aviation-themed UI, smooth transitions, and card-based mobile app design.",
    image: "/img/projects/skypass-poster.png",
    alt: "SkyPass Android Flight Booking App",
    href: "YOUR_PROJECT_LINK_HERE",
    theme: {
      primary: "#0077ff",
      primaryRgb: "0 119 255",
      secondary: "#e9fbff",
      accent: "#12c7d8",
      wash: "#f5fdff",
    },
  },
  {
    id: "iris-svm-classification-featured",
    title: "Iris Flower Species Classification",
    category: "Data Analyse",
    tech: "Python • Scikit-learn • SVM",
    description:
      "A beginner-friendly machine learning classification project that uses the Iris dataset to predict flower species based on sepal and petal measurements. The project includes EDA, correlation analysis, feature scaling, SVM model training, evaluation, and model saving.",
    image: "/img/projects/iris-svm-poster.png",
    alt: "Iris Flower Species Classification using SVM",
    href: "https://github.com/Brammawaxanan/CodeAlpha_IrisClassification_DataScience.git",
    theme: {
      primary: "#3f7382",
      primaryRgb: "63 115 130",
      secondary: "#ecf7f4",
      accent: "#8bbbc5",
      wash: "#f6fbf8",
    },
  },
];

const viewOptions = [
  { id: "carousel", label: "Carousel", icon: "bi-sliders" },
  { id: "grid", label: "Grid", icon: "bi-grid-3x3-gap" },
];

const viewVariants = {
  enter: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(5px)",
  },
};

const indicatorTransition = { type: "spring", stiffness: 420, damping: 34 };
const viewTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

const gridContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const gridCardVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(4px)",
  },
};

function ProjectViewToggle({ activeView, onChange }) {
  return (
    <div className="project-view-toggle" role="tablist" aria-label="Project view mode">
      {viewOptions.map((option) => {
        const isActive = activeView === option.id;

        return (
          <button
            key={option.id}
            className={isActive ? "is-active" : ""}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
          >
            {isActive && (
              <motion.span
                className="project-view-indicator"
                layoutId="project-view-indicator"
                transition={indicatorTransition}
              />
            )}
            <i className={`bi ${option.icon}`} aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function ProjectsCarousel({ projects }) {
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
  );
}

function ProjectsGrid({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const categoryCounts = projectCategories.reduce(
    (counts, category) => ({
      ...counts,
      [category]: projects.filter((project) => project.category === category).length,
    }),
    { All: projects.length },
  );
  const filterOptions = [
    "All",
    ...projectCategories
      .slice()
      .sort((firstCategory, secondCategory) => {
        const countDifference = categoryCounts[secondCategory] - categoryCounts[firstCategory];

        if (countDifference !== 0) return countDifference;

        return firstCategory.localeCompare(secondCategory);
      }),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const visibleProjects = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  const hasHiddenProjects = filteredProjects.length > INITIAL_PROJECT_COUNT;

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setShowAllProjects(false);
  }

  return (
    <div className="projects-grid-view">
      <div className="project-filter-bar" role="tablist" aria-label="Filter projects by category">
        {filterOptions.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              className={isActive ? "is-active" : ""}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleCategoryChange(category)}
            >
              {isActive && (
                <motion.span
                  className="project-filter-indicator"
                  layoutId="project-filter-indicator"
                  transition={indicatorTransition}
                />
              )}
              <span>{category}</span>
              <span className="project-filter-count">{categoryCounts[category]}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={selectedCategory}
        className="projects-grid"
        aria-label={`${selectedCategory} projects`}
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.div
              className="project-grid-item"
              key={project.id}
              layout
              variants={gridCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.28, delay: Math.min(index * 0.035, 0.18), ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} variant="grid" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.p
          className="project-empty-state"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          More projects for this category are coming soon.
        </motion.p>
      )}

      {hasHiddenProjects && (
        <div className="projects-more-wrap">
          <button
            className="projects-more-button"
            type="button"
            aria-expanded={showAllProjects}
            onClick={() => setShowAllProjects((current) => !current)}
          >
            <span>{showAllProjects ? "Show Less" : "See More"}</span>
            <i className={`bi ${showAllProjects ? "bi-chevron-up" : "bi-chevron-down"}`} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export function Projects() {
  const [projectView, setProjectView] = useState("carousel");

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <Reveal>
          <SectionTitle title="Projects" subtitle="Most recent works" />
        </Reveal>
        <Reveal delay={80}>
          <div className="projects-view-toolbar">
            <ProjectViewToggle activeView={projectView} onChange={setProjectView} />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={projectView}
              className="projects-view-panel"
              variants={viewVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={viewTransition}
            >
              {projectView === "carousel" ? (
                <ProjectsCarousel projects={projects} />
              ) : (
                <ProjectsGrid projects={projects} />
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
