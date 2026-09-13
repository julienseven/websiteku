import { useI18n, type Lang } from "../../lib/i18n";
import { cn } from "../../utils/cn";

export function LanguageToggle({
  className,
  dark,
}: {
  className?: string;
  dark?: boolean;
}) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={cn(
        "flex items-center rounded-full border p-0.5",
        dark ? "border-cream/25" : "border-ink/15",
        className
      )}
      role="group"
      aria-label="Language / Bahasa"
    >
      {(["id", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={l === "id" ? "Bahasa Indonesia" : "English"}
          className={cn(
            "min-h-11 min-w-11 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors",
            lang === l
              ? dark
                ? "bg-cream text-ink"
                : "bg-ink text-cream"
              : dark
                ? "text-cream/60 hover:text-cream"
                : "text-ink-soft hover:text-ink"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
