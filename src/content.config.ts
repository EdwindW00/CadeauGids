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
    prijsindicatie: z.string(),
    // Placeholder-URL totdat er een echte affiliate-link is (bv. "#").
    link: z.string(),
    netwerk: z.enum(['bol.com', 'TradeTracker', 'Awin', 'n.v.t.']).default('n.v.t.'),
    // Moet overeenkomen met een `slug` uit src/data/categorieen.ts.
    categorie: z.string(),
    // Optionele tags t.b.v. de filters op de categoriepagina's.
    prijssegment: z.enum(['budget', 'midden', 'premium']).optional(),
    leeftijd: z.enum(['kind', 'tiener', 'volwassene', 'senior']).optional(),
    // Zet op true om een product bovenaan / uitgelicht te tonen.
    uitgelicht: z.boolean().default(false),
  }),
});

export const collections = { producten };
