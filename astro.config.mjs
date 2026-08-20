import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO (opdrachtgever): vervang dit door het definitieve domein zodra dat
// geregistreerd is. Deze URL wordt gebruikt voor de sitemap en canonical
// links, dus moet kloppen voordat de site live gaat.
const SITE_URL = 'https://www.cadeaugids-voorbeeld.nl';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  trailingSlash: 'always',

  // Als de site (nog) niet op een custom domein staat maar op
  // https://<gebruiker>.github.io/<repo-naam>/, zet dan `base` op
  // '/<repo-naam>/' -- laat dit op '/' staan zodra een custom domein
  // (via public/CNAME) gebruikt wordt.
  base: '/',
});
