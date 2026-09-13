export function compactRupiah(amount: number, lang: "id" | "en") {
  const million = amount >= 1_000_000;
  const value = amount / (million ? 1_000_000 : 1_000);
  const number = new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-GB", { maximumFractionDigits: 1 }).format(value);
  return `Rp${number}${million ? (lang === "id" ? "jt" : "m") : (lang === "id" ? "rb" : "k")}`;
}