const links = [
  { label: "GitHub", href: "https://github.com/Brammawaxanan", icon: "bi-github" },
  { label: "WhatsApp", href: "https://wa.me/94761764440", icon: "bi-whatsapp" },
  { label: "Facebook", href: "https://web.facebook.com/Brammawaxanan", icon: "bi-facebook" },
  { label: "Instagram", href: "https://www.instagram.com/sb_waxan_14/", icon: "bi-instagram" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brammawaxanan14/", icon: "bi-linkedin" },
  {
    label: "Fiverr Profile",
    displayLabel: "Fiverr",
    href: "https://www.fiverr.com/wax_pixel/buying?source=avatar_menu_profile",
    icon: "fiverr",
    
  },
];

function FiverrIcon() {
  return (
    <svg className="social-fiverr-icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.2 20.5v-8.6H5V8.5h2.2V7.4c0-2.4 1.5-3.9 4.1-3.9h2.2v3.3h-1.6c-.8 0-1.1.3-1.1 1v.7h2.7v3.4h-2.7v8.6H7.2Zm8-8.6h-1.6V8.5h5.2v12h-3.6v-8.6Zm-.2-6.1c0-1.1.9-1.9 2-1.9s2 .8 2 1.9-.9 1.9-2 1.9-2-.8-2-1.9Z"
      />
    </svg>
  );
}

export function SocialLinks() {
  return (
    <div className="social-links">
      {links.map((link) => (
        <a
          key={link.label}
          className="social-link"
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          data-label={link.displayLabel ?? link.label}
          style={link.color ? { "--social-color": link.color } : undefined}
        >
          {link.icon === "fiverr" ? (
            <FiverrIcon />
          ) : (
            <i className={`bi ${link.icon}`} aria-hidden="true" />
          )}
          <span className="social-link-label">{link.displayLabel ?? link.label}</span>
        </a>
      ))}
    </div>
  );
}
