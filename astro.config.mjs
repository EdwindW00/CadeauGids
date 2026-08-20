import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO (opdrachtgever): vervang dit door het definitieve custom domein
// zodra dat geregistreerd is (en zet `base` hieronder dan terug op '/').
// Tot die tijd draait de site op de GitHub Pages-projecturl.
const SITE_URL = 'https://edwindw00.github.io/CadeauGids/';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  trailingSlash: 'always',

  // De site draait nu op https://edwindw00.github.io/CadeauGids/ (geen
  // custom domein), dus alle interne links moeten onder /CadeauGids/ vallen.
  // TODO (opdrachtgever): zet dit terug op '/' zodra je `public/CNAME` met
  // een custom domein toevoegt (zie README.md > "Custom domein koppelen").
  base: '/CadeauGids/',
});
