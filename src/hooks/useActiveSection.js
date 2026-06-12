import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const activeSectionRef = useRef(activeSection);
  const visibleSectionsRef = useRef(new Map());

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let animationFrameId = 0;

    const updateActiveSection = () => {
      animationFrameId = 0;

      const viewportFocusLine = window.innerHeight * 0.45;
      const trackedSectionIds = visibleSectionsRef.current.size
        ? Array.from(visibleSectionsRef.current.keys())
        : sectionIds;
      const observedSections = trackedSectionIds
        .map((id) => {
          const section = document.getElementById(id);

          if (!section) return null;

          const rect = section.getBoundingClientRect();

          return {
            id: section.id,
            ratio:
              visibleSectionsRef.current.get(section.id)?.ratio ??
              (rect.bottom > 0 && rect.top < window.innerHeight ? 1 : 0),
            top: rect.top,
          };
        })
        .filter(Boolean);

      const visibleSections = observedSections
        .filter((section) => section.ratio > 0)
        .map((section) => ({
          ...section,
          distance: Math.abs(section.top - viewportFocusLine),
        }))
        .sort((a, b) => a.distance - b.distance || b.ratio - a.ratio);

      const nextActiveSection = visibleSections[0]?.id;

      if (nextActiveSection && nextActiveSection !== activeSectionRef.current) {
        setActiveSection(nextActiveSection);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSectionsRef.current.set(entry.target.id, {
              id: entry.target.id,
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top,
            });
          } else {
            visibleSectionsRef.current.delete(entry.target.id);
          }
        });

        scheduleUpdate();
      },
      {
        root: null,
        rootMargin: "-28% 0px -42% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      observer.disconnect();
      visibleSectionsRef.current.clear();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeSection;
}
