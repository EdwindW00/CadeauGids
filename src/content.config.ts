import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Eén product = één markdown-bestand in src/content/producten/<categorie-slug>/.
// De opdrachtgever hoeft later alleen `link` (en `netwerk`) aan te passen om
// van een placeholder-link een echte affiliate-link te maken -- zie
// src/components/ProductCard.astro voor hoe `netwerk` automatisch bepaalt of
// rel="sponsored nofollow" wordt toegevoegd.
const producten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/producten' }),
  schema: z.object({
    naam: z.string(),
    beschrijving: z.string(),
    // URL of lokaal pad (bv. /images/mijn-product.jpg). Zonder opgave wordt
    // een neutrale placeholder-afbeelding gebruikt.
    afbeelding: z.string().default('/images/placeholder-product.svg'),
    // Vrije weergavetekst, bv. "€20 - €35" of "Tot €10".
    prijsindicatie: z.string(),
    // Zelfde bedrag als hierboven, maar als kale getallen (zonder €) t.b.v.
    // de prijsslider-filter op de categoriepagina's. prijsMin mag 0 zijn.
    prijsMin: z.number(),
    prijsMax: z.number(),
    // Placeholder-URL totdat er een echte affiliate-link is (bv. "#").
    link: z.string(),
    netwerk: z.enum(['bol.com', 'TradeTracker', 'Awin', 'n.v.t.']).default('n.v.t.'),
    // Moet overeenkomen met een `slug` uit src/data/categorieen.ts.
    categorie: z.string(),
    // Optioneel, en er mogen meerdere leeftijden tegelijk (bv. geschikt voor
    // zowel tiener als volwassene): [tiener, volwassene]. T.b.v. het
    // leeftijdsfilter op de categoriepagina's, waar je meerdere opties
    // tegelijk kan aanvinken.
    leeftijd: z.array(z.enum(['kind', 'tiener', 'volwassene', 'senior'])).optional(),
    // Zet op true om een product bovenaan / uitgelicht te tonen.
    uitgelicht: z.boolean().default(false),
  }),
});

export const collections = { producten };
