import { useI18n } from "../../lib/i18n";

/** Subtle strip of truthful operational facts only. */
export function CredibilityStrip() {
  const { t } = useI18n();
  const facts = [t("cred.1"), t("cred.2"), t("cred.3"), t("cred.4"), t("cred.5")];

  return (
    <section className="border-y border-ink/10 bg-cream">
      <div className="container-shell flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-6 text-sm text-ink-soft">
        {facts.map((f, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{f}</span>
            {i < facts.length - 1 && (
              <span className="h-1 w-1 rounded-full bg-accent/60" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
