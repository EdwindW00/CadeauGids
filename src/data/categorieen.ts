// Centrale lijst van hoofdcategorieën (ontvanger x gelegenheid).
//
// Een nieuwe categorie toevoegen = hier één object toevoegen + een map met
// productbestanden in src/content/producten/<slug>/. Er hoeft verder nergens
// in de code iets te veranderen -- de homepage en /cadeaus/[categorie]/
// lezen deze lijst automatisch uit.
//
// LET OP (opdrachtgever): de teksten in `intro` zijn een eerste, unieke
// concepttekst per categorie. Dit is bewust geen lege/dunne pagina, maar het
// moet nog wel door jou nagelezen en aangevuld worden voordat de site live
// gaat -- affiliate-netwerken keuren te generieke content af.

export type Categorie = {
  /** Gebruikt in de URL: /cadeaus/<slug>/ */
  slug: string;
  /** Titel zoals getoond op de pagina en in de navigatie. */
  titel: string;
  /** Unieke <title> voor SEO (mag iets langer/specifieker zijn dan `titel`). */
  metaTitle: string;
  /** Unieke meta description voor SEO (~120-155 tekens). */
  metaDescription: string;
  /** Introductietekst, per paragraaf. */
  intro: string[];
  /** Toont een "seizoensgebonden" label en plaatsing bovenaan het Sinterklaas-blok. */
  seizoensgebonden?: boolean;
  /** Categorieën met prioriteit voor de eerste versie (zie bouwspec). */
  prioriteit?: boolean;
};

export const categorieen: Categorie[] = [
  {
    slug: 'verjaardag-mama',
    titel: 'Verjaardagscadeaus voor mama',
    metaTitle: 'Verjaardagscadeaus voor mama — leuke cadeau-ideeën | CadeauGids',
    metaDescription:
      'Op zoek naar een verjaardagscadeau voor je moeder? Ontdek cadeau-ideeën voor mama, van verwenmomentjes tot persoonlijke cadeaus.',
    prioriteit: true,
    intro: [
      'Een verjaardagscadeau voor je moeder uitzoeken voelt vaak lastiger dan voor wie dan ook: ze heeft vaak al "alles", en juist daarom wil je iets vinden dat net iets meer zegt dan een standaard cadeautje.',
      'Op deze pagina verzamelen we cadeau-ideeën die goed werken voor de meeste moeders: van kleine verwenmomentjes en persoonlijke aandenkens tot iets groters voor een mijlpaal-verjaardag. Filter op prijs of leeftijd om sneller iets passends te vinden.',
    ],
  },
  {
    slug: 'partner-vriendin',
    titel: 'Cadeaus voor je partner of vriend(in)',
    metaTitle: 'Cadeaus voor je partner of vriend(in) — romantische cadeau-ideeën | CadeauGids',
    metaDescription:
      'Cadeau-ideeën voor je partner, vriend of vriendin: van romantisch en persoonlijk tot leuk en verrassend. Voor elke gelegenheid een idee.',
    prioriteit: true,
    intro: [
      'Voor je partner of vriend(in) mag een cadeau best iets persoonlijks hebben: iets dat laat zien dat je hebt nagedacht over wie diegene is, niet alleen wát ze leuk vinden.',
      'Hieronder vind je een mix van romantische, verrassende en praktische cadeau-ideeën -- geschikt voor een verjaardag, jubileum of gewoon omdat je iets liefs wilt doen.',
    ],
  },
  {
    slug: 'verjaardag-zus',
    titel: 'Verjaardagscadeaus voor zus',
    metaTitle: 'Verjaardagscadeaus voor je zus — leuke cadeau-ideeën | CadeauGids',
    metaDescription:
      'Verjaardagscadeau nodig voor je zus? Bekijk cadeau-ideeën die passen bij elke leeftijd en elk budget.',
    prioriteit: true,
    intro: [
      'Je zus ken je als geen ander, en dat maakt het uitzoeken van een cadeau juist leuk: je weet precies welke stijl, humor of hobby bij haar past.',
      'Deze lijst is een startpunt met cadeau-ideeën voor zussen van alle leeftijden, van iets kleins en grappigs tot een cadeau dat ze echt niet had verwacht.',
    ],
  },
  {
    slug: 'verjaardag-broer',
    titel: 'Verjaardagscadeaus voor broer',
    metaTitle: 'Verjaardagscadeaus voor je broer — leuke cadeau-ideeën | CadeauGids',
    metaDescription:
      'Verjaardagscadeau nodig voor je broer? Bekijk cadeau-ideeën die passen bij elke leeftijd en elk budget.',
    prioriteit: true,
    intro: [
      'Een cadeau voor je broer kiezen is vaak een kwestie van weten wat hij leuk vindt: gadgets, lekkers, iets voor onderweg of gewoon iets om mee te lachen.',
      'Op deze pagina zetten we cadeau-ideeën voor broers op een rij, met opties voor elk budget en elke leeftijd.',
    ],
  },
  {
    slug: 'verjaardag-papa',
    titel: 'Verjaardagscadeaus voor papa',
    metaTitle: 'Verjaardagscadeaus voor papa — leuke cadeau-ideeën | CadeauGids',
    metaDescription:
      'Op zoek naar een verjaardagscadeau voor je vader? Ontdek cadeau-ideeën voor papa, van verwenmomentjes tot praktische cadeaus.',
    intro: [
      'Voor papa is een goed cadeau vaak iets dat hij zelf nooit voor zichzelf zou kopen, maar wel stiekem heel leuk vindt.',
      'Van gereedschap en gadgets tot een verwenmoment: hieronder vind je cadeau-ideeën die aanslaan bij de meeste vaders.',
    ],
  },
  {
    slug: 'sinterklaas',
    titel: 'Cadeaus voor Sinterklaas',
    metaTitle: 'Sinterklaascadeaus — leuke cadeau-ideeën voor pakjesavond | CadeauGids',
    metaDescription:
      'Op zoek naar leuke Sinterklaascadeaus? Ontdek cadeau-ideeën voor in de schoen, als surprise-vulling of voor onder de chocoladeletter.',
    seizoensgebonden: true,
    intro: [
      'Sinterklaas komt elk jaar terug, en elk jaar is het weer zoeken naar leuke cadeautjes: voor in de schoen, als surprise-vulling, of gewoon een klein extraatje op pakjesavond.',
      'Deze pagina is bewust "evergreen" opgezet: de structuur blijft elk jaar hetzelfde, en alleen de productlijst hieronder hoeft jaarlijks ververst te worden met actuele ideeën en prijzen.',
    ],
  },
];
