export function Button({ href, children, variant = "primary", download = false }) {
  return (
    <a className={`button button-${variant}`} href={href} download={download || undefined}>
      {children}
    </a>
  );
}
