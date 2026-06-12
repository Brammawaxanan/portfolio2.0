import { useMemo } from "react";
import { Navbar } from "./components/layout/Navbar.jsx";
import { Sidebar } from "./components/layout/Sidebar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { ScrollToTop } from "./components/layout/ScrollToTop.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { About } from "./components/sections/About.jsx";
import { Skills } from "./components/sections/Skills.jsx";
import { Qualifications } from "./components/sections/Qualifications.jsx";
import { Projects } from "./components/sections/Projects.jsx";
import { Certificates } from "./components/sections/Certificates.jsx";
import { Services } from "./components/sections/Services.jsx";
import { Contact } from "./components/sections/Contact.jsx";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { ActiveSectionContext } from "./hooks/useActiveSectionContext.js";

const navItems = [
  { id: "home", label: "Home", sectionTitle: "Home", icon: "bi-house" },
  { id: "about", label: "About", sectionTitle: "About Me", icon: "bi-person" },
  { id: "skills", label: "Skills", sectionTitle: "Skills", icon: "bi-star" },
  {
    id: "qualifications",
    label: "Qualification",
    sectionTitle: "Qualification",
    icon: "bi-mortarboard",
  },
  { id: "projects", label: "Projects", sectionTitle: "Projects", icon: "bi-images" },
  { id: "services", label: "Services", sectionTitle: "Services", icon: "bi-hdd-stack" },
  {
    id: "certificates",
    label: "Certifications",
    sectionTitle: "Certifications & Achievements",
    icon: "bi-award",
  },
  { id: "contact", label: "Contact", sectionTitle: "Contact", icon: "bi-envelope" },
];

export function App() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);

  return (
    <ActiveSectionContext.Provider value={activeSection}>
      <Navbar navItems={navItems} activeSection={activeSection} />
      <Sidebar navItems={navItems} activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Qualifications />
        <Projects />
        <Services />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </ActiveSectionContext.Provider>
  );
}
