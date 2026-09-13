import { useId, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Eyebrow } from "./Eyebrow";
import { AsciiPixelsBackground } from "../effects/AsciiPixelsBackground";
import type { AsciiVariant } from "../../three/asciiPixels";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
  ascii = "work",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  ascii?: AsciiVariant | false;
}) {
  const titleId = useId();
  return (
    <section className={cn("ascii-surface page-header", className)} aria-labelledby={titleId}>
      {ascii && <AsciiPixelsBackground variant={ascii} />}
      <div className="container-shell relative z-10">
        <div className="page-header-top">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 id={titleId} className="page-header-title">
          {title}
        </h1>
        {description && (
          <p className="page-header-description">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
