import { useInView } from "../../hooks/useInView.js";

export function Reveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  effect = "fade-up",
  ...props
}) {
  const { ref, isInView } = useInView();

  return (
    <Component
      ref={ref}
      className={`reveal reveal-${effect} ${isInView ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
