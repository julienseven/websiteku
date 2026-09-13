import { Link } from "react-router-dom";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ArrowRight } from "./icons";
import { track } from "../../lib/analytics";

type ButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "link" | "primaryOnDark" | "secondaryOnDark";
  size?: "md" | "lg";
  className?: string;
  onClick?: MouseEventHandler;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
};

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap";

const variants = {
  primary: "bg-ink text-cream hover:bg-accent",
  secondary:
    "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  link: "text-ink hover:text-accent",
  primaryOnDark: "bg-cream text-ink hover:bg-accent hover:text-cream",
  secondaryOnDark:
    "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-[18px] text-[15px]",
};

export function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type,
  target,
  rel,
}: ButtonProps) {
  const handleClick: MouseEventHandler = (event) => {
    if (to === "/contact") track("project_start", { source: window.location.pathname });
    onClick?.(event);
  };
  const classes = cn(base, variants[variant], variant !== "link" && sizes[size], className);

  const content = (
    <>
      {children}
      {variant === "link" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} onClick={handleClick}>
      {content}
    </button>
  );
}
