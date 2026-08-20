import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://kadokompas.com';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  trailingSlash: 'always',

  // Custom domein (via public/CNAME) staat op de root, dus geen sub-pad nodig.
  base: '/',
});
