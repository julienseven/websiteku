import type { ReactNode } from "react";
import type { Service } from "../../data/services";

/**
 * Distinct, on-brand "web concept" preview per service. Rendered as a browser
 * frame containing an abstract miniature website layout — a genuine interface
 * preview rather than generic architectural photography.
 */

function Chrome({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_30px_70px_-35px_rgba(17,17,17,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-[#f6f3ec] px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-ink/5" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Bar({
  w,
  h = 8,
  tone = "bg-ink/10",
  className = "",
}: {
  w: number | string;
  h?: number;
  tone?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full ${tone} ${className}`}
      style={{ width: w, height: h }}
    />
  );
}

function CompanyProfile() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-ink" />
        <Bar w={50} h={5} tone="bg-ink/20" />
        <div className="ml-auto flex gap-2">
          <Bar w={18} h={4} tone="bg-ink/15" />
          <Bar w={18} h={4} tone="bg-ink/15" />
          <Bar w={18} h={4} tone="bg-ink/15" />
        </div>
      </div>
      <div className="space-y-2 pt-1">
        <Bar w="82%" h={13} tone="bg-ink/85" />
        <Bar w="56%" h={13} tone="bg-accent/70" />
      </div>
      <div className="space-y-1.5">
        <Bar w="92%" h={5} />
        <Bar w="74%" h={5} />
        <Bar w="84%" h={5} />
      </div>
      <div className="flex gap-2 pt-1">
        <div className="h-7 w-20 rounded-full bg-ink" />
        <div className="h-7 w-20 rounded-full border border-ink/25" />
      </div>
    </div>
  );
}

function Property({ img }: { img: string }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5">
        <div className="h-6 flex-1 rounded-md bg-ink/5" />
        <div className="h-6 w-14 rounded-md bg-ink/5" />
        <div className="h-6 w-14 rounded-md bg-ink/5" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md border border-ink/10 bg-cream-2"
          >
            <img src={img} alt="" loading="lazy" className="h-12 w-full object-cover" />
            <div className="space-y-1.5 p-2">
              <Bar w="82%" h={5} />
              <Bar w="44%" h={5} tone="bg-accent/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Restaurant({ img }: { img: string }) {
  return (
    <div className="space-y-3">
      <div className="relative h-16 overflow-hidden rounded-md">
        <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <Bar w="38%" h={5} />
            <div className="h-px flex-1 bg-ink/15" />
            <Bar w={22} h={5} tone="bg-ink/20" />
          </div>
        ))}
      </div>
      <div className="mx-auto h-7 w-24 rounded-full bg-accent" />
    </div>
  );
}

function Hospitality({ img }: { img: string }) {
  return (
    <div className="space-y-3">
      <div className="h-20 overflow-hidden rounded-md">
        <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex items-center gap-2 rounded-md border border-ink/10 p-2.5">
        <div className="flex-1 space-y-1.5">
          <Bar w="72%" h={5} />
          <Bar w="48%" h={4} tone="bg-ink/15" />
        </div>
        <div className="h-7 w-14 rounded-full bg-ink" />
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="flex flex-col items-center space-y-3 py-1">
      <div className="h-4 w-12 rounded-full bg-accent/20" />
      <Bar w="76%" h={12} tone="bg-ink/85" />
      <Bar w="48%" h={12} tone="bg-ink/85" />
      <Bar w="64%" h={5} />
      <div className="h-8 w-28 rounded-full bg-ink" />
      <div className="flex gap-3 pt-1">
        <Bar w={40} h={4} tone="bg-ink/15" />
        <Bar w={40} h={4} tone="bg-ink/15" />
      </div>
    </div>
  );
}

function Custom() {
  return (
    <div className="grid grid-cols-[1.1fr_1fr] gap-3">
      <div className="space-y-2 pt-1">
        <Bar w="88%" h={11} tone="bg-ink/85" />
        <Bar w="64%" h={5} />
        <Bar w="76%" h={5} />
        <div className="h-7 w-20 rounded-full bg-accent" />
      </div>
      <div className="rounded-md border border-ink/10 p-2">
        <div className="flex h-14 items-end gap-1">
          {[45, 70, 38, 60, 82, 52].map((v, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-accent/45"
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
        <div className="mt-2 space-y-1.5">
          <Bar w="70%" h={4} />
          <Bar w="46%" h={4} tone="bg-ink/15" />
        </div>
      </div>
    </div>
  );
}

export function ServicePreview({ service }: { service: Service }) {
  let content: ReactNode;
  switch (service.id) {
    case "property":
      content = <Property img={service.image} />;
      break;
    case "restaurant-cafe":
      content = <Restaurant img={service.image} />;
      break;
    case "hospitality":
      content = <Hospitality img={service.image} />;
      break;
    case "landing-page":
      content = <Landing />;
      break;
    case "custom-website":
      content = <Custom />;
      break;
    default:
      content = <CompanyProfile />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-5 md:p-10">
      <div className="w-full max-w-[300px] md:max-w-[340px]">
        <Chrome>{content}</Chrome>
      </div>
    </div>
  );
}
