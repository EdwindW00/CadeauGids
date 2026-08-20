# Bouwspecificatie: cadeau-affiliate website

Dit document is bedoeld om aan Claude Code te geven. Het beschrijft het deel van het project dat gebouwd kan worden: de website zelf. Alles wat met accounts, geld of persoonsgegevens te maken heeft (domeinregistratie, aanmelden bij affiliate-netwerken, de echte affiliate-links) regelt de opdrachtgever zelf — zie "Wat hier niet in zit" onderaan.

## Doel

Een Nederlandse (evt. ook Belgische) cadeau-website bouwen, georganiseerd per ontvanger/gelegenheid. Op termijn worden productlinks vervangen door affiliate-links (bol.com, TradeTracker, Awin) waarmee commissie wordt verdiend. Dit is een los project, niet gerelateerd aan eerdere referral-tools van de opdrachtgever.

## Belangrijke technische randvoorwaarde: hosting via GitHub

De site wordt gehost via GitHub (GitHub Pages, of een host die automatisch deployt vanuit een GitHub-repo, zoals Vercel/Netlify). Dat betekent:

- **Geen WordPress, geen PHP, geen database.** De site moet volledig **statisch** zijn.
- Bouw de site met een static site generator die goed omgaat met veel contentpagina's, bijvoorbeeld **Astro** of **Eleventy (11ty)**. Astro heeft de voorkeur vanwege content collections (makkelijk content beheren via losse bestanden) en goede performance/SEO defaults.
- Output moet een `dist`/`build`-map met statische HTML/CSS/JS zijn, deploybaar naar GitHub Pages via een GitHub Actions workflow (`.github/workflows/deploy.yml`).

## Sitestructuur / categorieën

Hoofdcategorieën (ontvanger × gelegenheid), elk met een eigen pagina/route:

- Cadeaus voor partner / vriend(in)
- Cadeaus voor Sinterklaas
- Verjaardagscadeaus voor mama
- Verjaardagscadeaus voor papa
- Verjaardagscadeaus voor zus
- Verjaardagscadeaus voor broer

Later toe te voegen (bouw de structuur zo dat dit makkelijk uit te breiden is): housewarming, jubileum, kraamcadeau, bedankje collega, pensioen, Valentijnsdag, Moederdag, Vaderdag, Kerst.

**Prioriteit voor de eerste versie:** verjaardagscadeau mama, cadeau vriendin/partner, cadeau zus/broer. Sinterklaas-content mag apart als seizoenspagina, met een duidelijke "evergreen" structuur zodat hij jaarlijks makkelijk te verversen is.

Elke categoriepagina bevat:
- Een korte, unieke introductietekst (geen dunne/lege pagina — affiliate-netwerken keuren sites met te weinig originele content af)
- Een lijst met cadeausuggesties (zie datamodel)
- Optioneel: filters op prijssegment of leeftijd

## Datamodel voor producten

De echte affiliate-links komen pas later (na goedkeuring bij bol.com/TradeTracker/Awin). Zet daarom elk product in een simpel, makkelijk te bewerken bestand — het liefst één markdown- of YAML-bestand per product, gegroepeerd per categorie (bv. via Astro content collections in `src/content/producten/`). Velden per product:

- `naam`
- `beschrijving` (kort, 1-2 zinnen)
- `afbeelding` (URL of lokaal pad)
- `prijsindicatie`
- `link` (placeholder-URL totdat er een echte affiliate-link is; markeer als `rel="sponsored nofollow"` zodra het een affiliate-link wordt)
- `netwerk` (bol.com / TradeTracker / Awin / n.v.t.)
- `categorie` (koppeling naar bovenstaande hoofdcategorieën)

Doel: de opdrachtgever moet later alléén dit databestand hoeven aan te passen om een echte link te plakken, zonder in de code te duiken.

## Wettelijk verplichte pagina's

- Affiliate-disclaimer (duidelijke vermelding dat de site met affiliate-links werkt)
- Privacy- en cookiebeleid

Beide mogen als simpele statische pagina's, met duidelijk gemarkeerde plekken waar de opdrachtgever later bedrijfs-/contactgegevens moet invullen.

## SEO-basis

- Unieke `<title>` en meta description per pagina
- XML-sitemap (automatisch gegenereerd)
- `robots.txt`
- Schone URL-structuur, bv. `/cadeaus/verjaardag-mama/`
- Snelle laadtijd (statische site helpt hier al bij; let op geoptimaliseerde afbeeldingen)

## Deployment

- Git-repository met de website-code
- GitHub Actions workflow die bij elke push naar `main` automatisch bouwt en deployt naar GitHub Pages
- Structuur zo opzetten dat een custom domein later eenvoudig gekoppeld kan worden (CNAME-bestand)

## Wat hier niet in zit (opdrachtgever regelt dit zelf)

- Domeinnaam kiezen en registreren
- Aanmelden bij bol.com Partnerprogramma, TradeTracker en Awin
- De daadwerkelijke affiliate-links verkrijgen en invullen in het databestand
- Definitieve, uniek geschreven contentteksten per categorie (Claude Code mag een eerste opzet/skelettekst schrijven, maar deze moet door de opdrachtgever nagelezen en aangevuld worden voordat de site live gaat — netwerken keuren te generieke content af)

## Nog te bepalen vóór start

- Definitieve sitenaam + domeinnaam
- Voorkeur voor design/stijl (minimalistisch, speels, kleurrijk, etc.)
- Astro of Eleventy (of andere voorkeur)
