import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const activeSectionRef = useRef(activeSection);

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

      const viewportCenter = window.innerHeight / 2;
      const visibleSections = sections
        .map((section) => {
          const rect = section.getBoundingClientRect();

          return {
            id: section.id,
            distance: Math.abs(rect.top + rect.height / 2 - viewportCenter),
            isVisible: rect.bottom > 0 && rect.top < window.innerHeight,
          };
        })
        .filter((section) => section.isVisible)
        .sort((a, b) => a.distance - b.distance);

      const nextActiveSection = visibleSections[0]?.id;

      if (nextActiveSection && nextActiveSection !== activeSectionRef.current) {
        setActiveSection(nextActiveSection);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [sectionIds]);

  return activeSection;
}
