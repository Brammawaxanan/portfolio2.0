import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 500);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      className={`scroll-top ${isVisible ? "is-visible" : ""}`}
      href="#home"
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up-short" aria-hidden="true" />
    </a>
  );
}
