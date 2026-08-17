import { media, type Media } from './medias'

/**
 * ─────────────────────────────────────────────────────────────────
 *  CONTENUS ÉDITORIAUX
 *  Territoires, expériences, témoignages, infos pratiques, FAQ.
 *  ✅ = réel  ·  ⚠️ = à fournir
 * ─────────────────────────────────────────────────────────────────
 */

/* ═══ TERRITOIRES ══════════════════════════════════════════════
   ✅ Tous ces lieux sont cités sur 4x4-raid.com (pages Circuits,
   Découvrir le Maroc, Contact). Aucune destination inventée.
   ═══════════════════════════════════════════════════════════════ */
export type Territoire = {
  id: string
  nom: string
  index: string
  soustitre: string
  /** Accroche courte — utilisée en home et en tête de fiche. */
  texte: string
  /** Récit long — page destination uniquement. Chaque paragraphe s'appuie
   *  sur des éléments réellement cités sur 4x4-raid.com. */
  recit: string[]
  marqueurs: string[]
  /** Slugs des raids qui traversent réellement ce territoire. */
  raidSlugs: string[]
  image: Media
  /** Visuels complémentaires — uniquement des photos réelles du site. */
  galerie: Media[]
}

export const territoires: Territoire[] = [
  {
    id: 'atlas',
    index: '01',
    nom: 'Le Haut-Atlas',
    soustitre: 'Altitude 4 168 m',
    texte:
      "La première barrière. On la franchit par des pistes que le goudron n'a jamais atteintes — arganiers, safran, cols, villages accrochés au relief. C'est là que le trajet devient un raid : quelques heures après Marrakech, la notion de route disparaît.",
    recit: [
      "Le Haut-Atlas est le premier obstacle et le premier vertige. Le sommet culmine à 4 168 mètres — la chaîne traverse le pays d'ouest en est et sépare Marrakech du Sud. Tous les raids commencent par là, parce qu'il n'y a pas d'autre façon de descendre vers le désert.",
      "On y monte par des serpentins de pistes oubliées, dans l'authenticité berbère. Le premier circuit du répertoire y consacre une journée entière : quatre-vingt-dix kilomètres de piste, déjeuner à l'Oukaïmeden, retour à Marrakech vers dix-huit heures. C'est le format le plus court — et déjà une vraie sortie de route.",
      "Sur la boucle Sud, le Haut-Atlas est le décor du premier jour : cent vingt kilomètres de piste, la région des arganiers et du safran, et une auberge dans un site unique. Cinq jours plus tard, on le retraverse dans l'autre sens par la traversée du Sarhro puis le col du Tichka.",
    ],
    marqueurs: ['Oukaïmeden', 'Col du Tichka', 'Traversée du Sarhro', 'Arganiers', 'Safran'],
    raidSlugs: ['atlas-oukaimeden', 'haut-atlas-deux-jours', 'boucle-sud-maroc'],
    image: media.atlas,
    galerie: [media.atlas2, media.atlas3, media.atlas4],
  },
  {
    id: 'sahara',
    index: '02',
    nom: 'Le Sahara',
    soustitre: 'Sable, ergs, hors-piste',
    texte:
      "Cratères, palmeraies, lacs secs, Djebel Bani. Puis les ergs. Une journée entière sans une seule trace de piste, cinquante kilomètres de franchissement de dunes, et un bivouac là où plus personne ne passe.",
    recit: [
      "Le grand désert commence après le Djebel Bani. D'abord les canyons, un lac sec, les premiers ergs. Puis le sable prend toute la place : deux cent quarante kilomètres de pistes et de hors-pistes en une seule journée, entre cratères et palmeraies.",
      "Le quatrième jour de la boucle Sud ne comporte aucune piste. Cent vingt kilomètres de hors-piste, dont cinquante de franchissement de dunes. C'est la journée la plus exigeante du répertoire, celle qui demande la technique, et celle dont les participants parlent encore des années après.",
      "Deux bivouacs ponctuent la traversée : les dunes de Chegaga, puis celles de Merzouga. Ni hôtel, ni village. Le désert peut atteindre quarante à cinquante degrés le jour et devenir froid la nuit — la polaire n'est pas une précaution excessive.",
    ],
    marqueurs: ['Dunes de Chegaga', 'Dunes de Merzouga', 'Zagora', 'Djebel Bani', 'Ergs', 'Lac sec'],
    raidSlugs: ['boucle-sud-maroc', 'sur-mesure'],
    image: media.dunes,
    galerie: [media.surMesure, media.decouvrir, media.paysage],
  },
  {
    id: 'dakar',
    index: '03',
    nom: 'Les pistes du Dakar',
    soustitre: 'Le tracé mythique',
    texte:
      "Les parcours empruntés par les rallye-raids historiques traversent ce décor. La passe mythique du Dakar fait partie du répertoire — pas comme une attraction, comme un passage qu'on aborde avec la technique qu'il exige.",
    recit: [
      "Le Maroc a servi de décor à de nombreux rallye-raids. Les pistes du Dakar font partie du répertoire d'étapes, et il est possible de les suivre — c'est même l'une des demandes les plus fréquentes sur les raids sur mesure.",
      "Sur la boucle Sud, le deuxième jour emprunte ces pistes : cent cinquante kilomètres de pistes et de hors-pistes, canyons, Djebel Bani, lac sec, ergs. Le troisième jour rejoint la passe mythique du Dakar après deux cent quarante kilomètres de progression.",
      "Ce n'est pas une reconstitution folklorique. C'est un terrain qui exige de la technique, un briefing quotidien et un véhicule d'accompagnement — exactement le dispositif prévu.",
    ],
    marqueurs: ['Passe du Dakar', 'Canyons', 'Lac sec', 'Hors-piste'],
    raidSlugs: ['boucle-sud-maroc', 'sur-mesure'],
    image: media.decouvrir,
    galerie: [media.dunes, media.atlas4, media.surMesure],
  },
  {
    id: 'kasbah',
    index: '04',
    nom: 'La route des mille Kasbah',
    soustitre: 'Retour par les terres rouges',
    texte:
      "Ouarzazate, Aït Benhaddou, les kasbahs de terre crue. La partie du raid où le paysage redevient habité — et où l'on mesure la distance parcourue depuis le premier col.",
    recit: [
      "Après les dunes de Merzouga, la traversée du Sarhro ramène vers l'habité. Cent vingt kilomètres de piste, deux cent quarante de route, puis la route des mille Kasbah et une nuit d'hôtel à Ouarzazate — la première depuis le début du raid.",
      "Le dernier jour passe par Aït Benhaddou, puis le col du Tichka, et retrouve Marrakech vers dix-huit heures. C'est le moment où l'on mesure ce qui a été parcouru : plus de mille cinq cents kilomètres en boucle.",
      "Ouarzazate est aussi l'une des trois bases de 4x4-raid, avec Marrakech et Laayoune. Les départs peuvent s'y organiser directement.",
    ],
    marqueurs: ['Ouarzazate', 'Aït Benhaddou', 'Col du Tichka', 'Sarhro'],
    raidSlugs: ['boucle-sud-maroc'],
    image: media.paysage,
    galerie: [media.atlas, media.atlas2, media.decouvrir],
  },
  {
    id: 'atlantique',
    index: '05',
    nom: 'Les pistes côtières',
    soustitre: 'Atlantique',
    texte:
      "Pistes côtières, plages, villages de pêcheurs. Un littoral non exploité touristiquement, jalonné tous les quarante ou cinquante kilomètres par un point de ravitaillement. Une autre géométrie du raid : l'écume comme ligne directrice.",
    recit: [
      "Le Maroc est bordé par la Méditerranée et par l'Atlantique. Les pistes côtières font partie des terrains cités au répertoire, au même titre que les canyons, les oueds et les oasis.",
      "Sur les tronçons de plage, on suit simplement l'écume laissée par les vagues. Le littoral est quasi désert, jalonné tous les quarante ou cinquante kilomètres par des villages de pêcheurs où l'accueil est toujours chaleureux — et où l'on se ravitaille.",
      "Agadir est l'un des trois points de départ possibles, avec Marrakech et Ouarzazate. Les itinéraires côtiers se composent sur mesure.",
    ],
    marqueurs: ['Côte Atlantique', 'Agadir', 'Villages de pêcheurs', 'Plages'],
    raidSlugs: ['sur-mesure'],
    image: media.atlas4,
    galerie: [media.paysage, media.atlas3, media.decouvrir],
  },
]

export const getTerritoire = (id: string) => territoires.find((t) => t.id === id)

/* ═══ EXPÉRIENCES ═══════════════════════════════════════════════
   Ce que l'on ressent, pas ce que l'on visite.
   Tous les éléments s'appuient sur du contenu réel du site.
   ═══════════════════════════════════════════════════════════════ */
export type Experience = {
  id: string
  titre: string
  /** Mots-clés courts affichés en tags. */
  mots: string[]
  /** Une sensation par ligne — traitement typographique de la page Expériences. */
  sensations: string[]
  texte: string
  /** Développement éditorial — page Expériences uniquement. */
  recit: string[]
  image: Media
}

export const experiences: Experience[] = [
  {
    id: 'sable',
    titre: 'Le sable',
    mots: ['Dunes', 'Hors-piste', 'Franchissement', 'Silence'],
    sensations: ['Silence.', 'Dunes.', 'Lever de soleil.', 'Aucune trace.'],
    texte:
      "Une journée entière hors-piste. Cinquante kilomètres de dunes. C'est la discipline la plus exigeante du raid et celle dont on parle encore des années après.",
    recit: [
      "Le sable ne se conduit pas comme la piste. Il demande de la vitesse là où l'instinct dit de freiner, de la lecture du terrain, et de savoir quand renoncer à une ligne. C'est une technique — elle s'apprend sur place, en situation.",
      "Le quatrième jour de la boucle Sud y est entièrement consacré : cent vingt kilomètres de hors-piste, dont cinquante de franchissement de dunes. Pas un panneau, pas une trace. Le soir, bivouac au cœur des dunes de Merzouga.",
    ],
    image: media.dunes,
  },
  {
    id: 'volant',
    titre: 'Le volant',
    mots: ['Conduite tout-terrain', 'Pilotage sur sable', 'Progression'],
    sensations: ['Vous conduisez.', 'Terrain.', 'Navigation.', 'Décision.'],
    texte:
      "Vous êtes aux commandes. Que ce soit votre première sortie tout-terrain ou que vous veniez vous perfectionner sur le sable, l'accompagnateur montre les manœuvres — mais c'est vous qui conduisez.",
    recit: [
      "C'est la différence de fond avec un circuit touristique. Vous n'êtes pas transporté : vous pilotez. Pour beaucoup, c'est la première expérience de conduite tout-terrain — apprentissage du franchissement, du pilotage sur sable, de la lecture de piste.",
      "Pour d'autres, c'est du perfectionnement. Dans les deux cas, la mise en situation est sécurisée : road-book, briefing quotidien, véhicule d'accompagnement. Mais vous seul êtes aux commandes.",
    ],
    image: media.surMesure,
  },
  {
    id: 'bivouac',
    titre: 'Le bivouac',
    mots: ['Nuits étoilées', 'Chegaga', 'Merzouga', 'Feu'],
    sensations: ['Nuit.', 'Étoiles.', 'Feu.', 'Personne.'],
    texte:
      "Deux nuits dans le sable sur la boucle Sud. Ni hôtel, ni village. Le moment que les participants citent en premier quand on leur demande ce qu'ils ont retenu.",
    recit: [
      "Deux bivouacs ponctuent la boucle Sud : les dunes de Chegaga au deuxième jour, celles de Merzouga au quatrième. Entre les deux, une auberge au cœur d'une oasis.",
      "C'est systématiquement ce qui revient dans les retours. « La nuit sous les étoiles a été un moment très intense de leur séjour et ils m'en parlaient avec des yeux qui brillaient. » Le bivouac est vécu comme une rupture — tout en offrant du confort.",
    ],
    image: media.atlas3,
  },
  {
    id: 'rencontre',
    titre: 'La rencontre',
    mots: ['Hospitalité', 'Gastronomie', 'Villages berbères'],
    sensations: ['Accueil.', 'Cuisine.', 'Thé.', 'Pique-nique.'],
    texte:
      "Des serpentins de pistes oubliées dans l'authenticité berbère, loin du tourisme de masse. Une population accueillante, une gastronomie de renommée mondiale, et des pique-niques qui sont devenus une signature.",
    recit: [
      "Les itinéraires passent par des villages que le tourisme de masse ignore. Sur le littoral atlantique, les villages de pêcheurs jalonnent la piste tous les quarante ou cinquante kilomètres, et l'accueil y est toujours chaleureux.",
      "La gastronomie marocaine fait le reste. Et puis il y a les pique-niques de Jean-Luc — mentionnés spontanément dans les témoignages, ce qui en dit long.",
    ],
    image: media.atlas2,
  },
]

/* ═══ PROCESS ═══════════════════════════════════════════════════
   Reconstruit à partir du fonctionnement réel décrit sur le site :
   demande → écoute → composition du tracé → raid → retour.
   ═══════════════════════════════════════════════════════════════ */
export const process = [
  {
    index: '01',
    titre: 'Vous racontez',
    texte: "Vos envies, votre niveau, vos dates, votre véhicule si vous en avez un. Aucune case obligatoire.",
  },
  {
    index: '02',
    titre: 'On vous rappelle',
    texte: "Sous 36 heures. Pour comprendre ce que vous cherchez vraiment — pas pour vous vendre un catalogue.",
  },
  {
    index: '03',
    titre: 'Jean-Luc trace',
    texte: "Le tracé est composé avec vous, à partir d'un répertoire d'étapes mis à jour par des repérages permanents.",
  },
  {
    index: '04',
    titre: 'Vous conduisez',
    texte: "Briefing quotidien, road-book, véhicule d'accompagnement. Vous êtes en situation sécurisée mais aux commandes.",
  },
  {
    index: '05',
    titre: 'Vous revenez avec une histoire',
    texte: "C'est la seule chose qu'on ne peut pas mettre sur un devis.",
  },
] as const

/* ═══ TÉMOIGNAGES ══════════════════════════════════════════════
   ✅ 100 % RÉELS — page /temoignages/ de 4x4-raid.com.
   Extraits fidèles, coupes marquées par […], noms conservés.
   ⚠️ Vérifier l'accord des personnes avant remise en ligne (RGPD).
   ═══════════════════════════════════════════════════════════════ */
export type Temoignage = {
  citation: string
  auteur: string
  contexte: string
  vedette?: boolean
}

export const temoignages: Temoignage[] = [
  {
    citation:
      "J'adore le sable et j'ai eu la chance de connaître avec Jean-Luc le Sud Maroc, la Mauritanie, le Mali… Un homme brut, honnête, sensible qui adore partager. Sur le hors-piste, l'inattendu est toujours là, mais Jean-Luc encadre, répare, et nous amène toujours à bon port. À ne pas manquer, ses pique-niques !",
    auteur: 'Pierre-Laurent Fortès',
    contexte: 'France — 5 séjours avec J.-L. Miolane',
    vedette: true,
  },
  {
    citation:
      "Ma première visite au Maroc lors de ce raid de 7 jours avec des copains. Au programme : pistes de l'Atlas, rivières à traverser, dunes, sable, bivouacs dans le désert. J'ai adoré et ai apprécié l'accueil des marocains. Jean-Luc Miolane y est comme un poisson dans l'eau. C'est un vrai renard du désert.",
    auteur: 'Christian Boillat',
    contexte: 'Suisse — Raid 7 jours',
  },
  {
    citation:
      "À aucun moment nous n'avons eu le moindre sentiment d'insécurité, mais plutôt un sentiment d'espace infini et de Liberté, comme nous n'en éprouvons plus en ville. […] Bref, l'AVENTURE de ma vie de citadine !",
    auteur: 'Mireille Viala',
    contexte: 'France',
    vedette: true,
  },
  {
    citation:
      "Le bivouac a été vécu comme une vraie rupture tout en offrant confort et animations. Le Raid 4x4 nous a enchanté par la diversité des paysages extraordinaires visités et la sécurité offerte sans présence pesante de l'encadrement. Un très bon professionnalisme !",
    auteur: 'Jean-Christophe Perrichon',
    contexte: "Directeur Général — L'Oréal Division Produits Professionnels (Suisse)",
  },
  {
    citation:
      "Nous en avons pris plein les yeux… du sable, des cailloux, de la bonne humeur et des souvenirs à la pelle.",
    auteur: 'Frédéric Fievet',
    contexte: 'Directeur commercial — BARDAHL Industrie',
  },
  {
    citation:
      "Je sais que la nuit sous les étoiles a été un moment très intense de leur séjour et qu'ils m'en parlaient avec des yeux qui brillaient de plaisir !",
    auteur: 'Thomas Dussous',
    contexte: 'Agence LFE',
  },
  {
    citation:
      "Ce petit mail pour vous remercier encore une fois de la qualité de vos prestations ainsi que du professionnalisme dont vous avez fait preuve tout au long de notre séjour au Maroc.",
    auteur: 'Olivier Ros',
    contexte: 'Cabinet A.I.A.',
  },
  {
    citation:
      "Il y a eu des moments un peu difficiles mais dans l'ensemble c'était super. Nous sommes retournés avec plein de belles images et franchement cette aventure en ta compagnie restera gravée longtemps !",
    auteur: 'Nadine et Christian Reboul',
    contexte: 'France',
  },
]

/**
 * ✅ RÉEL — références citées sur /raids-4x4-pour-entreprises/.
 * ⚠️ Vérifier les autorisations d'usage de marque avant affichage
 *    des logos. En texte seul, le risque est faible.
 */
export const referencesEntreprises = [
  "L'Oréal",
  'Renault',
  'Gemma Gastronomie SA',
  'Dade Behring',
  'Bardahl',
  'BF Goodrich',
  'Carglass',
  'Labeyrie',
  'Siligom',
] as const

/* ═══ INFOS PRATIQUES ══════════════════════════════════════════
   ✅ RÉEL — page /decouvrir-le-maroc-en-4x4/, resserré et corrigé
   (le texte source contient plusieurs fautes de frappe).
   ═══════════════════════════════════════════════════════════════ */
export const infosPratiques = [
  { titre: 'Formalités', texte: "Passeport en cours de validité pour les voyageurs individuels en provenance d'Europe." },
  { titre: 'Monnaie', texte: "Le dirham. Banques et distributeurs dans les grandes villes, carte bancaire généralement acceptée. Prévoir des espèces." },
  { titre: 'Change', texte: "Bureaux de change dans les aéroports et les grandes villes." },
  { titre: 'Électricité', texte: "220 volts. Presque tous les villages sont électrifiés. Pour les bivouacs, prévoir des lampes torches à piles." },
  { titre: 'Téléphone & internet', texte: "Réseau mobile très bien couvert, y compris dans le désert. Wifi de plus en plus répandu dans les hôtels et restaurants." },
  { titre: 'Circulation', texte: "Routes globalement bonnes, réseau autoroutier en expansion. Réglementation proche de la France, signalisation bilingue arabe-français. Prudence accrue à la tombée de la nuit." },
  { titre: 'Décalage horaire', texte: "Le Maroc vit à l'heure GMT toute l'année : une heure de moins qu'en France en hiver, deux heures en été." },
  { titre: 'Climat', texte: "« Un pays froid où le soleil est chaud. » Le désert peut atteindre 40 à 50 °C le jour et devenir froid la nuit. Prévoir systématiquement une polaire." },
  { titre: 'Santé', texte: "Aucun vaccin exigé, aucun risque sanitaire particulier. Être à jour de ses vaccins habituels. Respecter les règles alimentaires usuelles. Dans le désert, vigilance rare mais réelle vis-à-vis des vipères et scorpions." },
] as const

/* ═══ FAQ ══════════════════════════════════════════════════════
   Chaque réponse s'appuie sur une information réellement publiée.
   Les questions sans réponse disponible sont listées dans
   CONTENU-A-FOURNIR.md plutôt qu'inventées ici.
   ═══════════════════════════════════════════════════════════════ */
export const faq = [
  {
    q: "Faut-il déjà savoir conduire en tout-terrain ?",
    r: "Non. Les raids s'adressent aux débutants comme aux initiés. Pour beaucoup, c'est la première expérience de conduite tout-terrain — apprentissage sur place, mise en situation sécurisée. Les pilotes confirmés viennent, eux, se perfectionner sur le sable et le franchissement de dunes.",
  },
  {
    q: "Est-ce que je conduis moi-même ?",
    r: "Sur les raids, oui : vous êtes seul aux commandes. L'accompagnateur répond à vos questions et montre les meilleures manœuvres, mais il ne prend pas le volant à votre place. Exception : les excursions à la journée au départ de Marrakech, où Jean-Luc pilote et où vous êtes passager.",
  },
  {
    q: "Puis-je venir avec mon propre véhicule ?",
    r: "Oui. 4x4, moto, SSV ou buggy personnel : la formule peut se limiter à un accompagnement avec guide et véhicule de suivi. Une location sur place est également possible.",
  },
  {
    q: "Combien de personnes par véhicule ?",
    r: "Sur les raids entreprises, quatre participants maximum par 4x4, pour des raisons de sécurité et de confort. Sur les excursions à la journée, le forfait couvre une à trois personnes — quatre restent possibles en acceptant d'être trois à l'arrière.",
  },
  {
    q: "Comment se passe la sécurité en hors-piste ?",
    r: "Briefing quotidien — minimum un par jour — avec description du parcours, des difficultés et des consignes de sécurité, plus un contrôle des équipements personnels. Un véhicule d'organisation ouvre les pistes. Road-books, GPS et moyens de communication font partie de l'équipement d'expédition.",
  },
  {
    q: "Quand recevrai-je une réponse à ma demande ?",
    r: "Sous 36 heures. C'est un engagement affiché par l'équipe, disponible tous les jours.",
  },
  {
    q: "Quels sont les tarifs ?",
    r: "PLACEHOLDER_TARIFS",
  },
  {
    q: "Quelle est la meilleure saison ?",
    r: "PLACEHOLDER_SAISON",
  },
] as const
