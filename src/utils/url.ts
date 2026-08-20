/**
 * Bouwt een interne link/pad op met inachtneming van Astro's `base`-config
 * (bv. '/CadeauGids/' zolang de site op GitHub Pages zonder custom domein
 * draait, of '/' zodra er via public/CNAME een custom domein gebruikt
 * wordt). Astro herschrijft handmatige href/src-strings zoals "/foo" NIET
 * automatisch, dus interne links moeten hier altijd doorheen.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // eindigt altijd op '/'
  return base + path.replace(/^\/+/, '');
}
