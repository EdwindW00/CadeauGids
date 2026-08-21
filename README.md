# Kadokompas — cadeau-affiliate website

Statische website (Astro) met cadeau-ideeën per ontvanger/gelegenheid, gehost via
GitHub Pages op **kadokompas.com**. Zie ook de oorspronkelijke bouwspecificatie in
`kadowebsite-bouwspec.md` voor de volledige requirements.

- Repo: [github.com/EdwindW00/CadeauGids](https://github.com/EdwindW00/CadeauGids)
- Live: **https://kadokompas.com** (nadat de DNS hieronder is ingesteld —
  zie ["Custom domein"](#custom-domein-kadokompascom))

## Belangrijk: dit is nog geen kant-en-klare, live site

Dit project is een **technisch complete basis**. Voordat de site voor bezoekers
klaar is, moet de opdrachtgever nog een aantal dingen doen — zie de sectie
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
  utils/url.ts        withBase()-helper voor interne links (zie "Base-path" hieronder)
  styles/global.css    Kleuren, typografie, componentstijlen ("warm en persoonlijk")
public/
  robots.txt, favicon.svg, images/placeholder-product.svg, CNAME
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
prijsindicatie: '€20 - €35'            # vrije weergavetekst, mag ook "Tot €10" zijn
prijsMin: 20                           # zelfde bedrag als kaal getal, t.b.v. de prijsslider
prijsMax: 35                           # idem -- moet overeenkomen met prijsindicatie
link: '#'                              # placeholder tot er een echte affiliate-link is
netwerk: 'n.v.t.'                      # 'bol.com' | 'TradeTracker' | 'Awin' | 'n.v.t.'
categorie: 'verjaardag-mama'           # moet matchen met een slug in categorieen.ts
leeftijd: ['volwassene']               # optioneel, mag meerdere: ['tiener', 'volwassene']
uitgelicht: false                      # optioneel: toont het product bovenaan met een badge
---
```

`leeftijd` mag leeg blijven (geen leeftijdslabel), één waarde bevatten, of
meerdere — `'kind' | 'tiener' | 'volwassene' | 'senior'`. Op de
categoriepagina worden alleen leeftijden getoond die ook echt bij minstens
één product in die categorie voorkomen; kies je er meerdere aan, dan tonen we
producten die bij *minstens één* daarvan passen.

**Zodra je een echte affiliate-link hebt:** vul `link` en `netwerk` in. De site
voegt dan automatisch `rel="sponsored nofollow"` toe aan die link — je hoeft
verder niets in de code aan te passen (zie `src/components/ProductCard.astro`).

**De prijsslider op de categoriepagina** (`src/components/CategoryFilters.astro`)
gebruikt automatisch de laagste `prijsMin` en hoogste `prijsMax` van de
producten in die categorie als schuifgrenzen — daar hoef je zelf niets voor
in te stellen, zolang `prijsMin`/`prijsMax` per product maar kloppen.

## Deployen naar GitHub Pages

Al ingericht: de repo staat op GitHub, Pages staat aan met "Source: GitHub
Actions", en elke push naar `main` bouwt en deployt de site automatisch
(`.github/workflows/deploy.yml`).

### Custom domein (kadokompas.com)

`astro.config.mjs` en `public/CNAME` zijn al ingesteld op `kadokompas.com`. Wat
nog moet gebeuren (bij je domeinregistrar, niet in deze code):

1. Stel bij de DNS-instellingen van `kadokompas.com` **4 A-records** in op de
   apex/root (`@`) die naar GitHub Pages wijzen:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
2. Wil je ook `www.kadokompas.com` laten werken? Voeg een **CNAME-record** toe
   voor `www` naar `edwindw00.github.io`.
3. Wacht tot de DNS is doorgevoerd (kan tot 24u duren) — GitHub Pages
   detecteert het domein dan automatisch en regelt zelf een HTTPS-certificaat.
4. Controleer daarna in **Settings → Pages** op GitHub of "Enforce HTTPS"
   aangevinkt staat.

Volledige uitleg: [GitHub Pages-documentatie over custom domeinen](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

Zolang de DNS nog niet actief is, blijft de site ook bereikbaar op
`https://edwindw00.github.io/CadeauGids/` (let op: als je ooit weer zónder
custom domein zou draaien, moet `base` in `astro.config.mjs` terug naar
`/CadeauGids/` — zie de comments in dat bestand en in `src/utils/url.ts`).

## Wat jij (opdrachtgever) nog moet doen

Dit staat ook zo in de oorspronkelijke bouwspecificatie — dit project regelt
bewust geen accounts, geld of domeinen:

- [x] Definitieve sitenaam (Kadokompas) + domeinnaam (kadokompas.com) gekozen.
- [ ] DNS voor `kadokompas.com` instellen bij je registrar (zie hierboven) —
      dit kan alleen jij doen, ik heb geen toegang tot je domeinregistrar.
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
