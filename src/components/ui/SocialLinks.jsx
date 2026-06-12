const links = [
  { label: "GitHub", href: "https://github.com/Brammawaxanan", icon: "bi-github" },
  { label: "WhatsApp", href: "https://wa.me/94761764440", icon: "bi-whatsapp" },
  { label: "Facebook", href: "https://web.facebook.com/Brammawaxanan", icon: "bi-facebook" },
  { label: "Instagram", href: "https://www.instagram.com/sb_waxan_14/", icon: "bi-instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brammawaxanan14/", icon: "bi-linkedin" },
];

export function SocialLinks() {
  return (
    <div className="social-links">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
          <i className={`bi ${link.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
