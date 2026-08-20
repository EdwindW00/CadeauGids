# CadeauGids — cadeau-affiliate website

Statische website (Astro) met cadeau-ideeën per ontvanger/gelegenheid, gebouwd
om via GitHub Pages gehost te worden. Zie ook de oorspronkelijke bouwspecificatie
in `kadowebsite-bouwspec.md` (indien meegeleverd) voor de volledige requirements.

**Werktitel:** "CadeauGids" is een voorlopige naam/huisstijl. Zodra er een
definitieve sitenaam en domein gekozen zijn, zoek dan in de code op
"CadeauGids" en pas dit overal aan (zie ook de TODO's hieronder).

## Belangrijk: dit is nog geen kant-en-klare, live site

Dit project is een **technisch complete basis**. Voordat de site live mag/kan
gaan, moet de opdrachtgever nog een aantal dingen doen — zie de sectie
["Wat jij (opdrachtgever) nog moet doen"](#wat-jij-opdrachtgever-nog-moet-doen)
hieronder.

## Snel starten (lokaal ontwikkelen)

Dit vereist [Node.js](https://nodejs.org/) versie 22.12 of hoger (Astro 7 vereist
dit). GitHub Actions (zie hieronder) gebruikt automatisch Node.js 22, dus de site
bouwt en deployt vanzelf zodra je naar `main` pusht — ook zonder dat je zelf
Node.js hoeft te installeren. Wil je toch lokaal een voorvertoning zien:

```bash
npm install
npm run dev
```

Open daarna `http://localhost:4321`. Voor een productie-build:

```bash
npm run build
npm run preview
```

## Projectstructuur

```
src/
  components/        Herbruikbare UI-onderdelen (Header, Footer, ProductCard, filters)
  content.config.ts  Schema + loader voor het datamodel van producten
  content/
    producten/         Eén map per categorie, één markdown-bestand per product
  data/
    categorieen.ts     Centrale lijst van hoofdcategorieën (titel, intro, SEO-teksten)
  layouts/
    BaseLayout.astro   HTML-skelet incl. SEO meta-tags
  pages/
    index.astro                    Homepage
    cadeaus/[categorie]/index.astro  Genereert /cadeaus/<slug>/ voor elke categorie
    disclaimer.astro, privacy.astro  Wettelijk verplichte pagina's
  styles/global.css    Kleuren, typografie, componentstijlen ("warm en persoonlijk")
public/
  robots.txt, favicon.svg, images/placeholder-product.svg, CNAME.example
.github/workflows/deploy.yml   Automatische build + deploy naar GitHub Pages
```

## Een categorie toevoegen

1. Voeg een object toe aan `src/data/categorieen.ts` (slug, titel, meta-teksten, intro).
2. Maak een map `src/content/producten/<slug>/` met daarin markdown-bestanden voor de producten.
3. Klaar — de homepage en navigatie tonen de nieuwe categorie automatisch, en
   `/cadeaus/<slug>/` wordt bij de volgende build automatisch gegenereerd.

Denk aan categorieën die in de bouwspec genoemd zijn voor later: housewarming,
jubileum, kraamcadeau, bedankje collega, pensioen, Valentijnsdag, Moederdag,
Vaderdag, Kerst.

## Een product toevoegen of bewerken

Maak (of bewerk) een markdown-bestand in `src/content/producten/<categorie-slug>/`:

```md
---
naam: 'Naam van het product'
beschrijving: 'Korte omschrijving, 1-2 zinnen.'
afbeelding: '/images/mijn-foto.jpg'   # of een volledige URL
prijsindicatie: '€20 - €35'
link: '#'                              # placeholder tot er een echte affiliate-link is
netwerk: 'n.v.t.'                      # 'bol.com' | 'TradeTracker' | 'Awin' | 'n.v.t.'
categorie: 'verjaardag-mama'           # moet matchen met een slug in categorieen.ts
prijssegment: 'midden'                 # optioneel: 'budget' | 'midden' | 'premium'
leeftijd: 'volwassene'                 # optioneel: 'kind' | 'tiener' | 'volwassene' | 'senior'
uitgelicht: false                      # optioneel: toont het product bovenaan met een badge
---
```

**Zodra je een echte affiliate-link hebt:** vul `link` en `netwerk` in. De site
voegt dan automatisch `rel="sponsored nofollow"` toe aan die link — je hoeft
verder niets in de code aan te passen (zie `src/components/ProductCard.astro`).

## Deployen naar GitHub Pages

1. Maak een GitHub-repository aan en push deze code naar de `main`-branch.
2. Ga in de repository naar **Settings → Pages** en zet "Source" op
   **"GitHub Actions"**.
3. Elke push naar `main` bouwt en deployt de site automatisch
   (`.github/workflows/deploy.yml`).

### Custom domein koppelen (later)

1. Vervang de placeholder-URL in `astro.config.mjs` (`SITE_URL`) en in
   `public/robots.txt` door het echte domein.
2. Hernoem `public/CNAME.example` naar `public/CNAME` en zet het domein erin
   (één regel, zonder `https://`).
3. Stel bij je domeinregistrar de DNS in volgens de
   [GitHub Pages-documentatie](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

Gebruik je (nog) geen custom domein, maar `<gebruikersnaam>.github.io/<repo-naam>`?
Zet dan in `astro.config.mjs` de `base`-optie op `/<repo-naam>/`.

## Wat jij (opdrachtgever) nog moet doen

Dit staat ook zo in de oorspronkelijke bouwspecificatie — dit project regelt
bewust geen accounts, geld of domeinen:

- [ ] Definitieve sitenaam + domeinnaam kiezen en registreren, en overal
      "CadeauGids" / de placeholder-URL vervangen (zie hierboven).
- [ ] Aanmelden bij bol.com Partnerprogramma, TradeTracker en Awin.
- [ ] Echte affiliate-links verkrijgen en invullen in de productbestanden
      (`link` + `netwerk` per product, zie hierboven).
- [ ] Alle conceptteksten (categorie-intro's in `src/data/categorieen.ts`, en
      de teksten op de homepage) nalezen, aanvullen en waar nodig herschrijven
      — dit zijn bewust unieke eerste-opzet teksten, geen definitieve copy.
      Affiliate-netwerken keuren te generieke/dunne content af.
- [ ] `src/pages/disclaimer.astro` en `src/pages/privacy.astro` invullen op de
      plekken gemarkeerd met `[…INVULLEN]` (bedrijfsnaam, adres, KvK-nummer,
      contact-e-mailadres, datum).
- [ ] Productfoto's toevoegen (nu staat overal een neutrale placeholder-
      afbeelding, `public/images/placeholder-product.svg`).
- [ ] GitHub-repository aanmaken + Pages inschakelen (zie "Deployen" hierboven).
- [ ] Sinterklaas-pagina jaarlijks verversen: de structuur is bewust evergreen
      opgezet (`src/data/categorieen.ts`, categorie `sinterklaas`), dus alleen
      de productlijst in `src/content/producten/sinterklaas/` hoeft elk jaar
      bijgewerkt te worden.

## SEO die al is ingebouwd

- Unieke `<title>` + meta description per pagina (homepage, elke categorie,
  disclaimer, privacy).
- Automatisch gegenereerde XML-sitemap via `@astrojs/sitemap`
  (`/sitemap-index.xml` na een build).
- `public/robots.txt` met verwijzing naar de sitemap.
- Schone URL's: `/cadeaus/verjaardag-mama/`, etc.
- Canonical links en Open Graph-tags per pagina (`src/layouts/BaseLayout.astro`).
