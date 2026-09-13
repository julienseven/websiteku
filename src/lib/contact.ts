export type Enquiry = {
  name: string;
  business?: string;
  email: string;
  whatsapp?: string;
  website?: string;
  type: string;
  budget: string;
  timeline: string;
  message: string;
  language?: "id" | "en";
  packageName?: string;
};

type Submission = { ok: true } | { ok: false; reason: "unconfigured" | "failed" };

/** A success state requires delivery confirmation, never a simulated delay. */
export async function submitEnquiry(data: Enquiry): Promise<Submission> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  if (!endpoint) return { ok: false, reason: "unconfigured" };
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
    if (!response.ok) return { ok: false, reason: "failed" };
    if (response.status === 204) return { ok: true };
    // A misrouted endpoint may return the site HTML with HTTP 200.
    if (!response.headers.get("content-type")?.includes("application/json")) return { ok: false, reason: "failed" };
    const result = await response.json();
    return result?.ok === true || result?.success === true
      ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  } finally {
    window.clearTimeout(timeout);
  }
}
