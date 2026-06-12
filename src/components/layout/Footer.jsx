import { SocialLinks } from "../ui/SocialLinks.jsx";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const focusAreas = [
  "Data Science",
  "AI / Machine Learning",
  "Web Development",
  "Networking Labs",
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-shell">
          <div className="footer-brand">
            <a className="footer-mark" href="#home" aria-label="Back to home">
              <span>SB</span>
              <strong>Waxan</strong>
            </a>
            <h2>Brammawaxanan Sivanantharajah</h2>
            <p>
              IT undergraduate building recruiter-ready projects across data,
              AI/ML, web development, and practical networking labs.
            </p>
            <SocialLinks />
          </div>

          <nav className="footer-column" aria-label="Footer navigation">
            <h3>Explore</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-column">
            <h3>Focus</h3>
            <ul>
              {focusAreas.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Copyright {currentYear} SB Waxan. All rights reserved.</span>
          <a href="mailto:sbwaxan@gmail.com">sbwaxan@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
