/**
 * Bouwt een interne link/pad op met inachtneming van Astro's `base`-config
 * (normaal gesproken '/' op een custom domein; alleen op een GitHub Pages
 * project-URL zonder custom domein -- bv. '/CadeauGids/' -- moet dit iets
 * anders zijn dan '/'). Astro herschrijft handmatige href/src-strings zoals
 * "/foo" NIET automatisch, dus interne links moeten hier altijd doorheen.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // eindigt altijd op '/'
  return base + path.replace(/^\/+/, '');
}
