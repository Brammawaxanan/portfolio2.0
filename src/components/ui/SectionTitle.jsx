import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useActiveSectionContext } from "../../hooks/useActiveSectionContext.js";

const RIBBON_ENTER_TRANSITION = {
  type: "spring",
  stiffness: 150,
  damping: 24,
  mass: 0.85,
};

const RIBBON_EXIT_TRANSITION = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
};

function getRibbonGeometry(sectionId, headingElement) {
  const headingRect = headingElement.getBoundingClientRect();
  const sidebarLink = document.querySelector(`[data-section-link="${sectionId}"]`);
  const sidebarRect = sidebarLink?.getBoundingClientRect();
  const hasVisibleSidebar =
    sidebarRect &&
    sidebarRect.width > 0 &&
    sidebarRect.height > 0 &&
    window.matchMedia("(min-width: 960px)").matches;

  if (!hasVisibleSidebar) {
    return {
      left: -headingRect.left,
      width: window.innerWidth,
    };
  }

  const sidebarAnchorX = sidebarRect.left + sidebarRect.width / 2;

  return {
    left: sidebarAnchorX - headingRect.left,
    width: Math.max(window.innerWidth - sidebarAnchorX, headingRect.width),
  };
}

export function SectionTitle({ title, subtitle }) {
  const activeSection = useActiveSectionContext();
  const ribbonControls = useAnimation();
  const headingRef = useRef(null);
  const wasActiveRef = useRef(false);
  const [sectionId, setSectionId] = useState("");
  const [ribbonGeometry, setRibbonGeometry] = useState({ left: 0, width: 0 });
  const shouldReduceMotion = useReducedMotion();
  const isActive = sectionId === activeSection;

  useEffect(() => {
    const parentSection = headingRef.current?.closest("section");
    setSectionId(parentSection?.id ?? "");
  }, []);

  useEffect(() => {
    if (!isActive || !sectionId || !headingRef.current) return undefined;

    let frameId = 0;

    const updateRibbonGeometry = () => {
      if (!headingRef.current) return;
      setRibbonGeometry(getRibbonGeometry(sectionId, headingRef.current));
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateRibbonGeometry);
    };

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isActive, sectionId]);

  useEffect(() => {
    if (!sectionId || !headingRef.current) return;

    if (shouldReduceMotion) {
      ribbonControls.start({
        opacity: isActive ? 1 : 0,
        scaleX: isActive ? 1 : 0,
      });
      wasActiveRef.current = isActive;
      return;
    }

    const geometry = getRibbonGeometry(sectionId, headingRef.current);
    setRibbonGeometry(geometry);

    if (isActive) {
      ribbonControls.set({
        opacity: 0.98,
        x: 0,
        y: 0,
        scaleX: 0,
        filter: "blur(2px)",
      });
      ribbonControls.start({
        opacity: 1,
        x: 0,
        y: 0,
        scaleX: 1,
        filter: "blur(0px)",
        transition: { ...RIBBON_ENTER_TRANSITION, delay: 0.12 },
      });
    } else if (wasActiveRef.current) {
      ribbonControls.start({
        opacity: 0.72,
        x: 0,
        y: 0,
        scaleX: 0,
        filter: "blur(2px)",
        transition: RIBBON_EXIT_TRANSITION,
      });
    } else {
      ribbonControls.set({
        opacity: 0,
        x: 0,
        y: 0,
        scaleX: 0,
        filter: "blur(0px)",
      });
    }

    wasActiveRef.current = isActive;
  }, [isActive, ribbonControls, sectionId, shouldReduceMotion]);

  return (
    <div className={`section-title ${isActive ? "is-active" : ""}`}>
      <div className="section-title-heading" ref={headingRef}>
        <motion.span
          className="section-title-ribbon"
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={ribbonControls}
          style={{
            left: ribbonGeometry.left,
            width: ribbonGeometry.width,
            transformOrigin: "left center",
          }}
        />
        <h2>{title}</h2>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
