import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { resumes } from "../../data/resumes.js";

const MENU_GAP = 12;
const VIEWPORT_MARGIN = 12;

export function ResumeDropdown({ variant = "secondary" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    left: 0,
    top: 0,
    width: 320,
    placement: "bottom",
    isReady: false,
  });
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const closeTimerRef = useRef(null);

  function updateMenuPosition() {
    const trigger = rootRef.current;

    if (!trigger) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight || 300;
    const maxWidth = Math.min(window.innerWidth - VIEWPORT_MARGIN * 2, window.innerWidth <= 720 ? 340 : 320);
    const width = Math.max(Math.min(maxWidth, Math.max(triggerRect.width, 280)), Math.min(triggerRect.width, maxWidth));
    const preferredLeft = window.innerWidth <= 720
      ? triggerRect.left + triggerRect.width / 2 - width / 2
      : triggerRect.left;
    const left = Math.min(
      Math.max(preferredLeft, VIEWPORT_MARGIN),
      window.innerWidth - width - VIEWPORT_MARGIN,
    );
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const placement = spaceBelow < menuHeight + MENU_GAP && spaceAbove > spaceBelow ? "top" : "bottom";
    const rawTop = placement === "top"
      ? triggerRect.top - menuHeight - MENU_GAP
      : triggerRect.bottom + MENU_GAP;
    const top = Math.min(
      Math.max(rawTop, VIEWPORT_MARGIN),
      window.innerHeight - menuHeight - VIEWPORT_MARGIN,
    );

    setMenuPosition({
      left,
      top,
      width,
      placement,
      isReady: true,
    });
  }

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openMenu() {
    clearCloseTimer();
    setIsOpen(true);
  }

  function scheduleClose() {
    if (isPinned) {
      return;
    }

    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setIsOpen(false), 140);
  }

  function toggleMenu() {
    clearCloseTimer();
    setIsPinned((value) => {
      const nextValue = !value;
      setIsOpen(nextValue);
      return nextValue;
    });
  }

  useLayoutEffect(() => {
    if (!isOpen) {
      setMenuPosition((position) => ({ ...position, isReady: false }));
      return undefined;
    }

    updateMenuPosition();
    const animationFrame = window.requestAnimationFrame(updateMenuPosition);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [isOpen]);

  useEffect(() => {
    function handlePointerDown(event) {
      const clickedTrigger = rootRef.current?.contains(event.target);
      const clickedMenu = menuRef.current?.contains(event.target);

      if (!clickedTrigger && !clickedMenu) {
        setIsOpen(false);
        setIsPinned(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsPinned(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearCloseTimer();
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  const menu = (
    <div
      className={`resume-menu resume-menu-portal${isOpen ? " is-open" : ""} resume-menu-${menuPosition.placement}${menuPosition.isReady ? " is-ready" : ""}`}
      ref={menuRef}
      role="menu"
      aria-label="Choose resume to download"
      style={{
        left: `${menuPosition.left}px`,
        top: `${menuPosition.top}px`,
        width: `${menuPosition.width}px`,
      }}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      {resumes.map((resume) => (
        <a
          className="resume-menu-item"
          href={resume.file}
          download
          key={resume.title}
          role="menuitem"
          onClick={() => {
            setIsOpen(false);
            setIsPinned(false);
          }}
        >
          <span className="resume-menu-icon" aria-hidden="true">
            <i className="bi bi-file-earmark-pdf" />
          </span>
          <span>
            <strong>{resume.title} Resume</strong>
            <small>PDF download</small>
          </span>
        </a>
      ))}
    </div>
  );

  return (
    <div
      className={`resume-dropdown${isOpen ? " is-open" : ""}`}
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        className={`button button-${variant} resume-trigger`}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <i className="bi bi-download" aria-hidden="true" />
        <span>Download CV</span>
        <i className="bi bi-chevron-down resume-trigger-icon" aria-hidden="true" />
      </button>

      {isOpen ? createPortal(menu, document.body) : null}
    </div>
  );
}
