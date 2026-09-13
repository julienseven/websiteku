import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { submitEnquiry } from "../../lib/contact";
import { useI18n } from "../../lib/i18n";
import { track } from "../../lib/analytics";
import { waLink } from "../../lib/config";
import { CheckIcon, WhatsAppIcon } from "../ui/icons";
import { cn } from "../../utils/cn";

const websiteTypes = ["company-profile", "property", "restaurant-cafe", "hospitality", "landing-page", "portfolio", "custom-website", "unsure"];
const budgetOptions = ["2-5", "5-10", "10-20", "20-plus"];
const timelineOptions = ["asap", "w1", "w2", "m", "flex"];

type Values = {
  name: string; business: string; email: string; whatsapp: string;
  website: string; type: string; budget: string; timeline: string; message: string;
};
type Errors = Partial<Record<keyof Values, string>>;
const initial: Values = { name: "", business: "", email: "", whatsapp: "", website: "", type: "", budget: "", timeline: "", message: "" };

function normalizeService(value: string) {
  const aliases: Record<string, string> = {
    "Company Profile": "company-profile", "Profil Perusahaan": "company-profile",
    Property: "property", Properti: "property",
    "Restaurant & Caf\u00e9": "restaurant-cafe", "Restaurant / Caf\u00e9": "restaurant-cafe", "Restoran & Kafe": "restaurant-cafe",
    Hospitality: "hospitality", "Hotel & Vila": "hospitality",
    "Landing Page": "landing-page", "Custom Website": "custom-website", "Website Khusus": "custom-website", Custom: "custom-website",
  };
  const normalized = aliases[value] ?? value;
  return websiteTypes.includes(normalized) ? normalized : "";
}

function validate(values: Values, requireEmail: boolean): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "form.err.name";
  if (requireEmail && !values.email.trim()) errors.email = "form.err.email";
  else if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "form.err.emailFormat";
  if (values.whatsapp.trim() && (!/^[+\d\s().-]+$/.test(values.whatsapp) || !/^\d{7,15}$/.test(values.whatsapp.replace(/\D/g, "")))) errors.whatsapp = "form.err.whatsapp";
  if (!websiteTypes.includes(values.type)) errors.type = "form.err.type";
  if (!budgetOptions.includes(values.budget)) errors.budget = "form.err.budget";
  if (!timelineOptions.includes(values.timeline)) errors.timeline = "form.err.timeline";
  if (values.message.trim().length < 20) errors.message = "form.err.message";
  return errors;
}

export function ContactForm() {
  const { t, lang } = useI18n();
  const [params] = useSearchParams();
  const [values, setValues] = useState<Values>(() => ({ ...initial, type: normalizeService(params.get("service") ?? "") }));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "ready">("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const sending = useRef(false);
  const mounted = useRef(true);
  const handoffOnly = !import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  const requestedPackage = params.get("package") ?? "";
  const packageName = ["start", "business", "premium"].includes(requestedPackage)
    ? requestedPackage[0].toUpperCase() + requestedPackage.slice(1)
    : undefined;

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    if (status !== "success" && status !== "ready") return;
    success.current?.focus({ preventScroll: true });
    success.current?.scrollIntoView({ block: "center", behavior: "instant" });
  }, [status]);

  function set(key: keyof Values, value: string) {
    if (!started.current) { started.current = true; track("contact_started", { language: lang }); }
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setSubmissionError(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (sending.current) return;
    const nextErrors = validate(values, !handoffOnly);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (handoffOnly) {
      track("contact_submitted", { type: values.type, language: lang, method: "whatsapp_brief", delivery: "not_sent" });
      setStatus("ready");
      return;
    }

    sending.current = true;
    setStatus("sending");
    setSubmissionError(null);
    const result = await submitEnquiry({
      ...values,
      name: values.name.trim(), email: values.email.trim(), message: values.message.trim(),
      language: lang, packageName,
    });
    sending.current = false;
    if (!mounted.current) return;
    if (result.ok) {
      track("contact_submitted", { type: values.type, language: lang, method: "endpoint", delivery: "accepted" });
      setStatus("success");
    } else {
      setStatus("idle");
      setSubmissionError(result.reason === "unconfigured" ? "form.err.unconfigured" : "form.err.send");
    }
  }

  const error = (key: keyof Values) => errors[key]
    ? <p id={`enquiry-${key}-error`} className="mt-2 text-xs text-accent-deep">{t(errors[key]!)}</p>
    : null;

  const brief = [
    t("contact.whatsappMessage"),
    `${t("form.name")}: ${values.name}`,
    values.business && `${t("form.business")}: ${values.business}`,
    values.email && `${t("form.email")}: ${values.email}`,
    values.whatsapp && `WhatsApp: ${values.whatsapp}`,
    values.website && `${t("form.website")}: ${values.website}`,
    `${t("form.type")}: ${t(`service.${values.type}`)}`,
    `${t("form.budget")}: ${t(`budget.${values.budget}`)}`,
    `${t("form.timeline")}: ${t(`timeline.${values.timeline}`)}`,
    packageName && `${t("form.selectedPackage")}: ${packageName}`,
    "", values.message,
  ].filter((line): line is string => typeof line === "string").join("\n");

  if (status === "ready") {
    return <div ref={success} tabIndex={-1} role="status" className="border-t border-ink/15 py-10">
      <CheckIcon className="h-8 w-8 text-accent-deep" />
      <h2 className="mt-5 text-3xl font-semibold">{lang === "id" ? "Brief siap dikirim." : "Your brief is ready."}</h2>
      <p className="mt-3 max-w-md text-ink-soft">{lang === "id" ? "Belum ada pesan yang terkirim. Buka WhatsApp, tinjau brief, lalu tekan Kirim untuk menghubungi Websiteku." : "Nothing has been sent yet. Open WhatsApp, review your brief, then press Send to contact Websiteku."}</p>
      <a href={waLink(brief)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { source: "enquiry_handoff", language: lang })} className="mt-6 inline-flex min-h-14 items-center gap-3 rounded-full bg-ink px-6 py-4 text-cream"><WhatsAppIcon className="h-5 w-5" />{lang === "id" ? "Lanjut ke WhatsApp" : "Continue to WhatsApp"}</a>
      <button type="button" className="mt-4 block min-h-11 underline underline-offset-4" onClick={() => setStatus("idle")}>{lang === "id" ? "Edit brief" : "Edit brief"}</button>
    </div>;
  }

  if (status === "success") {
    return (
      <div ref={success} tabIndex={-1} role="status" className="border-t border-ink/15 py-10 outline-none">
        <CheckIcon className="h-8 w-8 text-accent-deep" />
        <h2 className="mt-5 text-3xl font-semibold">{t("form.success.title")}</h2>
        <p className="mt-3 max-w-md text-ink-soft">{t("form.success.text")}</p>
      </div>
    );
  }

  const fields: { key: "name" | "business" | "email" | "whatsapp"; type: string; autoComplete: string; placeholder: string; required?: boolean }[] = [
    { key: "name", type: "text", autoComplete: "name", placeholder: t("form.placeholder.name"), required: true },
    { key: "business", type: "text", autoComplete: "organization", placeholder: t("form.placeholder.business") },
    { key: "email", type: "email", autoComplete: "email", placeholder: t("form.placeholder.email"), required: !handoffOnly },
    { key: "whatsapp", type: "tel", autoComplete: "tel", placeholder: "+62 8xx xxxx xxxx" },
  ];

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="enquiry-form space-y-8" aria-busy={status === "sending"} data-lenis-prevent>
      {handoffOnly && <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{lang === "id" ? "Isi brief ini, lalu lanjutkan melalui WhatsApp. Kamu bisa meninjau pesan sebelum mengirimnya." : "Fill in your brief, then continue through WhatsApp. You can review the message before sending it."}</p>}
      <div className="flex flex-wrap justify-between gap-3 text-xs text-ink-soft">
        <p>{t("form.required")}</p>
        {packageName && <p>{t("form.selectedPackage")}: <strong className="text-ink">{packageName}</strong></p>}
      </div>
      {Object.values(errors).some(Boolean) && <p role="alert" className="text-sm text-accent-deep">{t("form.err.summary")}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`enquiry-${field.key}`} className="text-sm font-medium">
              {t(`form.${field.key}`)} {field.required && <span className="text-accent-deep">*</span>}
            </label>
            <input
              id={`enquiry-${field.key}`}
              name={field.key}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.key === "whatsapp" ? 25 : 200}
              required={field.required}
              value={values[field.key]}
              onChange={(event) => set(field.key, event.target.value)}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.key])}
              aria-describedby={errors[field.key] ? `enquiry-${field.key}-error` : undefined}
              className="enquiry-input"
            />
            {error(field.key)}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="enquiry-website" className="text-sm font-medium">{t("form.website")}</label>
        <input id="enquiry-website" name="website" type="text" autoComplete="url" maxLength={300} value={values.website} onChange={(event) => set("website", event.target.value)} placeholder={t("form.placeholder.website")} className="enquiry-input" />
      </div>

      <div>
        <label htmlFor="enquiry-type" className="text-sm font-medium">{t("form.type")} <span className="text-accent-deep">*</span></label>
        <select id="enquiry-type" name="type" value={values.type} onChange={(event) => set("type", event.target.value)} required className="enquiry-input" aria-invalid={Boolean(errors.type)} aria-describedby={errors.type ? "enquiry-type-error" : undefined}>
          <option value="" disabled>{t("form.type.placeholder")}</option>
          {websiteTypes.map((type) => <option key={type} value={type}>{t(`service.${type}`)}</option>)}
        </select>
        {error("type")}
      </div>

      {(["budget", "timeline"] as const).map((key) => (
        <fieldset key={key} aria-describedby={errors[key] ? `enquiry-${key}-error` : undefined} aria-invalid={Boolean(errors[key])}>
          <legend className="text-sm font-medium">{t(`form.${key}`)} <span className="text-accent-deep">*</span></legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {(key === "budget" ? budgetOptions : timelineOptions).map((option) => (
              <label key={option} className="enquiry-choice">
                <input className="peer sr-only" type="radio" name={key} value={option} checked={values[key] === option} onChange={() => set(key, option)} required />
                <span className={cn("inline-flex min-h-11 items-center rounded-full border border-ink/20 px-4 py-2 text-sm text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent", "hover:border-ink/50")}>{t(`${key}.${option}`)}</span>
              </label>
            ))}
          </div>
          {error(key)}
        </fieldset>
      ))}

      <div>
        <label htmlFor="enquiry-message" className="text-sm font-medium">{t("form.message")} <span className="text-accent-deep">*</span></label>
        <textarea id="enquiry-message" name="message" rows={5} minLength={20} maxLength={5000} required value={values.message} onChange={(event) => set("message", event.target.value)} placeholder={t("form.message.placeholder")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "enquiry-message-error" : undefined} className="enquiry-input resize-y" />
        {error("message")}
      </div>

      {submissionError && <div role="alert" className="border-l-2 border-accent pl-4">
        <p className="max-w-lg text-sm leading-relaxed text-ink-soft">{t(submissionError)}</p>
        <a href={waLink(brief)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium" onClick={() => track("whatsapp_click", { source: "enquiry_fallback", language: lang })}><WhatsAppIcon className="h-4 w-4" />{t("form.whatsappBrief")}</a>
      </div>}

      <button type="submit" disabled={status === "sending"} aria-busy={status === "sending"} className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-cream transition-colors hover:bg-accent disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {status === "sending" ? t("form.submitting") : handoffOnly ? (lang === "id" ? "Siapkan Brief WhatsApp" : "Prepare WhatsApp Brief") : t("form.submit")}
      </button>
    </form>
  );
}