# INVENTAIRE SEO — 4x4-raid.com

Relevé exhaustif du site existant, août 2026. **13 URLs indexables.**

Ce document est le **contrat du portage**. Toute page reconstruite doit respecter
ligne pour ligne ce qui est marqué 🔒. Ce qui est marqué 🔧 peut être corrigé.

| Symbole | Signification |
|---|---|
| 🔒 | Intouchable — URL, H1, texte indexé |
| 🔧 | À corriger — défaut technique avéré |
| ⚠️ | À arbitrer avec le client |

---

## Constats transversaux

Ces points concernent **toutes** les pages.

### 🔧 Le zoom mobile est bloqué

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,
      maximum-scale=1.0, user-scalable=0">
```

`user-scalable=0` empêche l'utilisateur d'agrandir la page. C'est un échec au
critère WCAG 1.4.4, et Google le signale dans son rapport d'ergonomie mobile.
**À supprimer** — c'est un gain SEO, pas un risque.

### 🔧 Bloc dupliqué en pied de chaque page

Les trois cartes « Raids avec circuits sur mesure » / « Raids 4×4 pour
entreprises » / « Circuits départ de Marrakech » apparaissent en `<h3>` sur
**les 13 pages**, avec le même texte et les mêmes images.

Conséquence : chaque page porte trois H3 identiques à ceux de toutes les
autres. Cela dilue la spécificité sémantique de chaque page sans apporter
aucun contenu propre.

**Le retirer améliore le SEO.** Les liens internes qu'il porte doivent en
revanche être conservés — ils seront réintégrés dans un maillage contextuel,
au sein du texte de chaque page.

### 🔒 Directives d'indexation à conserver

Toutes les pages portent :

```
robots  : follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large
canonical : auto-référencée
og:locale : fr_FR
og:site_name : 4x4-raid.com
```

### ⚠️ Fautes présentes dans le texte indexé

Le contenu comporte des fautes de frappe : « à bort du 4×4 », « nous ferons
reste », « Prévoyer », « la meilleure manière » / « les meilleure manière »,
« s'ìnstalle ».

**Corriger une faute ne change pas la sémantique d'une page** et ne présente
aucun risque de déclassement. Je recommande de les corriger. À valider.

### 🔧 Données structurées : absentes

Aucun balisage Schema.org sur le site actuel. En ajouter (`TravelAgency`,
`TouristTrip`, `Person`, `FAQPage`) est un **gain net** — aucun risque.

---

# 01 · ACCUEIL

| | |
|---|---|
| 🔒 URL | `/` |
| 🔒 Title | `4x4-raid Maroc, Marrakech, Agadir, Ouarzazate - 4x4-raid.com` |
| 🔒 Meta description | `Découvrez les raids de 4x4-raid au Maroc. Africamiol vous compose votre raid sur mesure également en entreprises. Au départ de Marrakech, Agadir, Ouarzazate.` |
| 🔒 H1 | `Les raids de 4×4-raid au Maroc` |
| Publiée | 2020-02-23 · modifiée 2023-11-01 |
| og:image | *(absente)* 🔧 |

### 🔒 Texte indexé — verbatim

> Nous vous proposons le montage et la réalisation de votre raid 4×4 au Maroc de la planification jusqu'à la fin de votre aventure. Savourez, hors des sentiers battus, votre séjour d'exception dans une ambiance Rallye Raids sur des parcours authentiques et originaux, en 4X4, Moto, SSV ou Buggy. Nos raids 4×4 Maroc s'adressent aux passionnés d'aventure, à tous ceux qui souhaitent découvrir des paysages extraordinaires, authentiques et naturels. Grâce à ce plongeon dans la nature sauvage du Maroc, au milieu d'une population accueillante et enjouée, vous vivrez une expérience humaine, chargée d'émotions et de couleurs.
>
> Vous en avez rêvé, alors osez venir vivre avec nous une expérience inoubliable en étant l'acteur au sein de la passion aventureuse du rallye-raid, que vous soyez débutants ou initiés, en famille ou entre amis. Pour les personnes qui désirent conduire : Peut être votre 1ére expérience vers l'aventure et l'évasion avec l'apprentissage de la conduite tout terrain et pour d'autre se perfectionner avec aussi du pilotage sur sable, franchissements de Dunes, …etc. Nous vous mettons en situation sécurisée, mais vous seuls, êtes aux commandes mais soyez rassuré l'accompagnateur répondra à vos questions et vous montrera les meilleurs manœuvres. Vous serez l'auteur et l'acteur d'une vraie aventure, dont vous aurez construit l'itinéraire, grâce aux conseils et aux nombreux repérages de Jean-Luc Miolane.

### 🔒 Liens internes sortants

- `/contact/` — ancre : *Demandez votre offre personnalisée*
- `/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/`
- `/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/`
- `/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/`
- `/circuits-raid-4x4-au-maroc/` — ancre : *Découvrez nos exemples de circuits pour votre raid sur mesure.*

### Intention de recherche ciblée

`raid 4x4 Maroc` · `4x4 raid Marrakech` · `raid Maroc Agadir Ouarzazate`

---

# 02 · CIRCUITS RAID 4X4 AU MAROC

| | |
|---|---|
| 🔒 URL | `/circuits-raid-4x4-au-maroc/` |
| 🔒 Title | `Circuits Raid 4x4 au Maroc - 4x4-raid.com` |
| 🔒 Meta description | `Découvrez nos circuits pour un raid 4x4 au Maroc. En direct ou en boucle, nous organisons votre raid 4x4 au Maroc sur mesure au départ de Marrakech, Agadir ou` |
| 🔒 H1 | `circuits raid 4×4 au maroc` |
| og:image | `Canon6D_Michael_16909-scaled-1024x683.jpg` — alt `Raid 4×4 au Maroc-sur-mesure` |

⚠️ La meta description est **tronquée en plein mot** (« Agadir ou »). À compléter.

### 🔒 Texte indexé — verbatim

> Découvrez nos circuits raid 4×4 au Maroc. En direct ou en boucle, nous organisons vos raid 4×4 au Maroc sur mesure au départ de Marrakech. Notre répertoire de circuits au Sud Maroc compte une multitude d'étapes modulables (journée ou ½ journée). Ceci vous permet de choisir et tracer l'itinéraire et circuit fonction du nombre de jours que vous disposez et du rythme du raid que vous désirez tout en tenant compte des saisons.
>
> Nous vous proposons des circuits (directs ou en boucle). Nous sommes à travers le Maroc, au centre de traditions millénaires, au milieu de contrées désertiques, de dunes, de canyons, des différentes chaînes de l'Atlas, d'océans de sable ainsi que d'oasis. Des couleurs qui font chanter les paysages, de nuits étoilées, des côtes de l'Atlantiques, de rencontres, de diverses gastronomies, de bivouacs, avec sensations fortes ainsi que des émotions que vous n'oublierez jamais.

**H2 🔒** — `Contactez-nous et nous vous composons votre raid 4×4 au Maroc sur mesure.`
*(contient un lien vers `/contact/`)*

### 🔒 Trois blocs de contenu — H3 + texte

**H3 · Raid 4×4 au Maroc sur mesure**

> Fan de sable, vous rêvez de parcourir les dunes inaccessibles sans connaissances et de faire du hors piste en 4×4, moto, ou SSV ou aimeriez venir avec votre propre véhicule ou (Véhicule de location sur place).
> Jean-Luc vous compose votre raid 4×4 au Maroc sur mesure et selon vos envies et besoins.

→ lien *Détails* vers `/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/`

**H3 · Raid 4×4 pour entreprises**

> Séminaires d'incentive, de team-building ou les voyages de récompense de vos employés ou de vos clients. Les liens inaltérables se créent avec cohésion, en permanence l'entraide et la motivation invertissent les équipes.
> Mes 25 ans d'expérience au Maroc me permettent d'être à votre écoute, comprendre vos attentes ainsi que vos enjeux et de vous proposer des solutions originales pour vos raids 4×4 pour entreprises.

→ lien *Détails* vers `/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/`

**H3 · Raids 4×4 au départs de Marrakech**

> D'une journée à 14 nuits. Par les pistes oubliées savourez autrement et hors des sentiers battus votre circuit raid d'exception. Avec une ambiance Raid découverte sur un parcours authentique et original.
> L'ensemble des circuits raid 4×4 Marrakech peuvent être personnalisé selon vos désirs et rêves d'aventure.

→ lien *Détails* vers `/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/`

🔧 Un lien *Demandez votre offre personnalisée* pointe vers `<>` — **lien mort à corriger**.

### Images

| Fichier | alt actuel |
|---|---|
| `Canon6D_Michael_16909-scaled.jpg` | `Raid 4×4 au Maroc sur-mesure` |
| `Canon6D_Michael_16946-scaled.jpg` | `raids-4x4-pour-entreprises` 🔧 |
| `Canon6D_Michael_15482-scaled.jpg` | `circuits-raids-marrakech` 🔧 |

🔧 Deux alt sont des noms de fichiers. À rédiger.

---

# 03 · RAID 4X4 SUR MESURE

| | |
|---|---|
| 🔒 URL | `/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/` |
| 🔒 Title | `Raid 4x4 sur mesure - 4x4-raid.com` |
| 🔒 Meta description | `Découvrez nos circuits pour votre raid 4x4 sur mesure au Maroc. Nous organisons votre raid selon vos désirs et capacités.` |
| 🔒 H1 | `Raid 4×4 sur mesure` |

### 🔒 Texte indexé — verbatim

**H2** — `Vous en avez rêvé d'un raid 4×4 sur mesure?`

> Vous connaissez déjà une partie du Maroc et vous souhaitez en découvrir davantage, le voir différemment, hors des sentiers battus, car il ne vous a pas tout dévoilé ?
>
> Fan de sable, vous rêvez de parcourir les dunes inaccessibles sans connaissance et de faire du hors-piste en 4×4, moto, ou SSV ou aimeriez venir avec votre véhicule et avez juste besoin d'un guide, d'un véhicule d'accompagnement? Jean-Luc vous compose votre raid sur mesure selon vos envies et vos besoins.
>
> Il est possible de suivre les pistes mythiques du Dakar ou d'autres rallye-raids qui ont eu lieu dans le décor de rêve qu'offre le Maroc.
>
> Parlez-nous de vos souhaits, de vos attentes, nous ferons reste.
>
> Parce que nous connaissons parfaitement les recoins de ce merveilleux pays, nous sommes là pour vous écouter, vous conseillez et concevoir avec vous le circuit et tracé de votre Raid de rêve.
>
> Nous nous adaptons et nous chargeons de l'organisation de votre raid. Nous adapterons ensemble la formule de votre convenance, en privilégiant sécurité et qualité. Le but est vous vous n'ayez pour soucis que celui de vous amuser. Vous n'aurez que du plaisir dans votre aventure !
>
> **Découvrez nos circuits comme inspiration pour votre raid 4×4 sur mesure.**

**H3** — `Contactez-nous et osez vivre votre passion.` *(lien vers `/contact/`)*

⚠️ Fautes : « nous ferons reste » → *nous ferons le reste* · « vous conseillez » → *vous conseiller* · « Le but est vous vous n'ayez » → *Le but est que vous n'ayez*

---

# 04 · RAIDS 4X4 POUR ENTREPRISES

| | |
|---|---|
| 🔒 URL | `/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/` |
| 🔒 Title | `Raids 4x4 pour entreprises - 4x4-raid.com` |
| 🔒 Meta description | `Plus de 10 ans d'expérience nous permettent d'être à votre écoute et d'organiser vos Raids 4x4 pour entreprises au Maroc sur mesure.` |
| 🔒 H1 | `RAIDS 4X4 POUR ENTREPRISES` |

⚠️ **Incohérence** : la meta dit « plus de 10 ans », le corps de page dit « 20 ans », la page Circuits dit « 25 ans », la page Guide dit « 45 ans ». À unifier — voir § Arbitrages.

### 🔒 Texte indexé — verbatim

**H2** — `Osez vivre l'aventure des Raids 4×4 pour entreprises`

> Séminaires d'incentive, de team-building ou les voyages de récompense de vos employés ou de vos clients.
>
> Les liens inaltérables se créent avec cohésion, en permanence l'entraide et la motivation invertissent les équipes.
>
> Mes **20 ans d'expérience** au Maroc me permettent d'être à votre écoute, comprendre vos attentes ainsi que vos enjeux et de vous proposer des solutions originales pour vos raids 4×4 pour entreprises. Un dépaysement s'intégrant parfaitement dans votre stratégie, dans le souci de la sécurité et du respect de votre budget.
>
> Nous pouvons organiser toute sorte de raids 4×4 pour entreprises, avec événements, allier détente, travail (dans des salles de travail équipées avec le confort) et émotions lors d'un raid 4×4 pour entreprises.
>
> Faites vivre à vos équipes, commerciaux, clients des moments d'une intensité rare : apprendre à maîtriser un 4×4, à franchir une dune, découvrir l'esprit d'équipe et d'entre-aide.
>
> Nous vous proposons des formules adaptées à vos besoins, avec l'exigence de qualité et sécurité.
>
> Occupation des 4×4 avec max. 4 participants (sécurité/confort). Des Road-books sur mesure et précis, des briefings réguliers (mini 1 par jour) avec : description du parcours, des difficultés, des conseils de sécurité, et un contrôle des équipements personnels.
>
> Quelques références :
>
> L'Oréal – Renault – Gemma Gastronomie SA – Dade Behring – Bardahl – BF Goodrich – Carglass – Labeyrie – Siligom

### Images

`2020/05/MG_1614-scaled.jpg` — alt `Raids pour entreprises`
`2020/05/MG_1533-scaled.jpg` — alt `Raids 4x4 pour entreprise 2` 🔧

---

# 05 · RAID 4X4 MARRAKECH

| | |
|---|---|
| 🔒 URL | `/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/` |
| 🔒 Title | `Raid 4x4 Marrakech - 4x4-raid.com` |
| 🔒 Meta description | `D'une journée à 14 nuits, Jean-Luc vous compose vos circuits Raid 4x4 Marrakech sur mesure. Savourez votre raid par les pistes oubliées et hors des sentier...` |
| 🔒 H1 | `RAID 4×4 MARRAKECH` |

**C'est la page au contenu le plus riche du site.** Elle porte le seul
itinéraire détaillé — c'est un actif SEO majeur, à préserver intégralement.

### 🔒 Texte indexé — verbatim

**H2** — `D'une journée à 14 nuits, Jean-Luc vous compose votre raid 4×4 Marrakech sur mesure.`

> **Par les pistes oubliées** savourez autrement et **hors des sentiers battus** votre circuit raid d'exception. Avec une ambiance Raid découverte sur un **parcours authentique et original**.
>
> L'ensemble des circuits raid 4×4 Marrakech peuvent être **personnalisé selon vos désirs** et rêves d'aventure.

**🔒 Circuit 1 : MARRAKECH / MARRAKECH — 1 journée**

> Départ de Marrakech vers 8h00
> 90 km pistes – 100km goudron (déjeuner à l'Oukameidem)
> Retour Marrakech vers 18h00

**🔒 Circuit 2 : MARRAKECH / MARRAKECH — 2 Jours / 1 Nuit**

> **Jour 1** — Départ de Marrakech vers 9h00 · 100 km pistes – 100km goudron (déjeuner pique-nique) · Dîner et nuit Auberge dans le Haut-Atlas
> **Jour 2** — 60 km pistes – 100km route – Déjeuner à l'Oukameidem · Retour Marrakech vers 18h00

**🔒 Circuit 3 : MARRAKECH / MARRAKECH — Boucle Sud Maroc de plus de 1'500 km. 7 jours / 6 nuits**

> **Jour 1** — Départ de Marrakech 5h30 · 120 km pistes – 180km route. Le Haut-Atlas puis région arganiers et Safran · Ce soir Auberge dans un site unique
> **Jour 2** — 150 km pistes et hors pistes – 80km route · Pistes du « DAKAR » Canyons, Djebel Baní, lac sec, ergs, sable, dunes etc.… · Bivouac dans les dunes de Chegaga
> **Jour 3** — 240 km pistes et hors pistes – 20km route · Le grand désert, pistes et hors pistes, cratéres, palmeraies, ergs, pour rejoindre la passe mythique du DAKAR (Auberge de l'Oasis)
> **Jour 4 – Journée de sable** — 120 Km hors pistes dont 50 km de franchissement de Dunes · Bivouac au cœur des Dunes de Merzouga
> **Jour 5** — 120 km pistes – 240 km route · La traversée du Sarhro, route des mille Kasbah puis Hôtel *** à Ouarzazate
> **Jour 6** — Ait Benhaddou, col du Tichka, retour Marrakech vers 18h00

⚠️ **Le Circuit 3 annonce 7 jours / 6 nuits mais ne détaille que les Jours 1 à 6.**
Le Jour 7 est absent. À arbitrer : fournir le Jour 7, ou corriger en 6 jours / 5 nuits.

### Images

`2020/04/Canon6D_Michael_15486-scaled.jpg` · `Canon6D_Michael_15545-scaled.jpg` ·
`Canon6D_Michael_15558-scaled.jpg` · `Canon6D_Michael_15957-scaled-1024x683.jpg`

🔧 Tous les alt sont des noms de fichiers (`circuits-raids-marrakech-2`…).

---

# 06 · 3 EXCURSIONS 4X4 À MARRAKECH

| | |
|---|---|
| 🔒 URL | `/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/` |
| 🔒 Title | `3 excursions 4x4 à Marrakech - 4x4-raid.com` |
| 🔒 Meta description | `Aux choix. 3 excursions 4x4 à Marrakech. Pistes et hors pistes. En mode tout Terrain. Vous serez à bord du 4x4 piloté par Jean-Luc qui aime partager sa passion.` |
| 🔒 H1 | `3 excursions 4×4 à Marrakech` |

### 🔒 Texte indexé — verbatim

**H2** — `« 4×4-raid » vous propose aux choix 3 excursions 4×4 à Marrakech.`

> Des circuits originaux, sur pistes et hors pistes, en mode tout terrain. L'art et la manière **du plaisir de voyager et du plaisir de découvrir.**
>
> Par des serpentins de pistes oubliées dans l'authenticité Berbére, vous serez à bort du 4×4 piloté par Jean-Luc qui aime partager sa passion et vous fera vivre une vraie aventure durant cette journée hors des sentiers battus et du tourisme de masse. Un itinéraire vous attend avec des moments uniques et des endroits aux vues imprenables.
>
> Mais on *ne va pas tout vous dire pour que vous puissiez découvrir!*
>
> Pour ces 3 excursions 4×4 à Marrakech s'applique un tarif unique pour chacun de ces circuits avec un forfait qui comprends également le pique-nique (déjeuner). Que vous soyez une, deux ou trois personnes, (et même 4 à condition d'accepter d'être 3 sur la banquette arrière).
>
> Possibilité pour plus de 4 personnes, merci de nous contacter.

⚠️ Faute : « à bort » → *à bord*

---

# 07 · GUIDE RAIDS 4X4 MAROC

| | |
|---|---|
| 🔒 URL | `/guide-raids-4x4-maroc/` |
| 🔒 Title | `Guide raids 4x4 Maroc, Marrakech, Agadir, Ouarzazate - 4x4-raid.com` |
| 🔒 Meta description | `C'est Jean-Luc qui sera votre guide raids 4×4 à travers le Maroc. Plus de 30 ans d'expérience des Raids, il est surnommé le Renard du Désert.` |
| 🔒 H1 | `Guide raids 4×4 AU Maroc` |
| og:image | `GoPro_MSC_1581-scaled-1024x768.jpg` — alt `GUIDE RAIDS 4X4 MAROC` |

⚠️ La meta dit **30 ans**, le corps de page dit **45 ans**. Quatrième valeur différente.

### 🔒 Texte indexé — verbatim

**H2** — `GUIDE RAIDS 4X4 MAROC`

> C'est ***Jean-Luc Miolane*** qui sera votre guide pour votre Raid 4×4 à travers le Maroc. **Plus de 45 ans d'expérience des Raids et du sable.**
>
> Pour vous faire partager et savourer intensément l'aventure Jean-Luc. Installé aujourd'hui près de Marrakech, il organise et guide des raids 4×4 *Son but* : donner l'accès aux raids 4×4 à tous ceux qui rêvent rouler sur les traces du Dakar, traverser les différents Atlas, connaitre le désert de sable et franchir ses dunes, etc.… c'est à dire en toute sécurité, faire partager notre riche expérience de terrain et de ce pays avec toutes ses émotions en appréciant la beauté du patrimoine naturel. En sa compagnie, vous découvrirez les plus belles pistes du Maroc, mais aussi du Sud Sahara.
>
> Soucieux de pouvoir vous préparer les plus belles expéditions, Jean-Luc voila déjà 25 ans qu'il s'installe au Maroc pour avoir en vivant sur place : la meilleure logistique, son équipe d'organisation qu'il a formée, ainsi qu'un important répertoire d'étapes mis à jour par des repérages permanents. Sachant qu'il est présent sur toutes les opérations, par son expérience et ses connaissances incomparables du territoire, pistes et hors pistes vous apprécierez le professionnel, mais aussi le personnage convivial, prêt à répondre à la moindre de vos envies. Exigence, sécurité et bonne humeur sont ses maîtres-mots. Il saura vous guider et transformer votre Raid en souvenir inoubliable !

**H3 🔒 — Notre philosophie**

> **Professionnalisme :** Parce que vous méritez mieux qu'un prix, nous analysons les prestations que vous souhaitez. 4×4-raid.com by Africamiol vous propose ensuite une prestation totalement personnalisée adaptée à votre niveau et à vos exigences.
>
> **Sens du service :** Notre équipe est disponible tous les jours et s'engage à vous recontacter dans les 36 heures pour répondre à vos questions.
>
> **Esprit d'innovation :** Parce que l'aventure ne se vit pas dans des guides, 4×4-raid.com by Africamiol s'engage à vous faire découvrir des parcours inédits, des paysages fabuleux.

🔧 Ce bloc « philosophie » est **présent deux fois** sur la page, sous deux
formulations légèrement différentes. Duplication interne à supprimer.

---

# 08 · DÉCOUVRIR LE MAROC EN 4X4

| | |
|---|---|
| 🔒 URL | `/decouvrir-le-maroc-en-4x4/` |
| 🔒 Title | `Découvrir le Maroc en 4x4 - 4x4-raid.com` |
| 🔒 Meta description | `Découvrir le Maroc en 4x4, SSV, Buggy, et Moto. Sa nature encore préservée permet de très belles sorties en 4×4 avec des vues à couper le souffle.` |
| 🔒 H1 | `Découvrir le Maroc en 4×4, SSV, Buggy et Moto` |
| og:image | `Canon6D_Michael_16631-scaled-1024x683.jpg` |

### 🔒 Texte indexé — verbatim

> Avec sa nature encore préservée le Maroc permet de très belles sorties en 4×4 avec des vues à couper le souffle : le grand sud, le Haut Atlas, le grand sud pour apprécier le désert du Sahara, Zagora, les dunes majestueuses de Merzouga, mais aussi des villes magiques comme Marrakech, Fès, Meknès et encore…

**H2** — `Informations pratiques pour découvrir le Maroc en 4×4`

> Le Maroc est un pays de 31 millions d'habitants, riche en histoire et en culture. Sa nature est très diversifiée grâce à sa géographie : bordé par la mer Méditerranée, l'océan Atlantique, le Sahara et traversé par les chaînes du Rif et de l'Atlas (dont le plus haut sommet culmine à 4168m). Sa gastronomie, de renommée mondiale, saura satisfaire tous les goûts. Découvrir le Maroc en 4×4 est sans doute l'une des meilleure manière de profiter de ce magnifique pays.

**🔒 Liste à conserver intégralement** (contenu longue traîne à forte valeur) :

FORMALITES · MONNAIE · CHANGE · ELECTRICITE · TELEPHONE–INTERNET ·
CIRCULATION · DECALAGE HORAIRE · CLIMAT · SANTE

Chaque entrée porte son paragraphe — voir la page source pour le verbatim complet.

⚠️ Fautes : « semunir » → *se munir* · « Prévoyer » → *Prévoyez* · « peut avoir des températures » → *peut connaître*

---

# 09 · ACTUALITÉ

| | |
|---|---|
| 🔒 URL | `/actualite-raids-4x4-maroc/` |
| 🔒 Title | `Actualité raids 4x4 Maroc - 4x4-raid.com` |
| ⚠️ Meta description | `facebook` |
| 🔒 H1 | `Actualité` |

⚠️ **Page vide.** Elle ne contient qu'un bouton « Suivre » vers Facebook, dont
les liens pointent vers `#`. La meta description est le mot « facebook ».

C'est du **contenu mince** (*thin content*) au sens de Google. Trois options :

1. **Alimenter la page** — récits de raids, comptes-rendus. Le meilleur choix SEO.
2. **Rediriger en 301** vers `/circuits-raid-4x4-au-maroc/` et retirer du sitemap.
3. La conserver en l'état — statu quo, aucun gain.

⚠️ Décision client requise. En l'absence de contenu réel, l'option 2 est la
plus saine : une page vide indexée pèse sur la qualité perçue du domaine.

---

# 10 · PHOTOS RAIDS 4X4 MAROC

| | |
|---|---|
| 🔒 URL | `/photos-raids-4x4-maroc/` |
| 🔒 Title | `Photos Raids 4x4 Maroc - 4x4-raid.com` |
| 🔒 Meta description | `Photos Raids 4x4 Maroc. Découvrez les photos de nos Raids 4x4 au Maroc prises par nos clients et inspirez vous pour créer votre aventure sur mesure.` |
| 🔒 H1 | `PHOTOS raids 4×4 maroc` |

### Contenu

Galerie de 8 photographies, chacune liée vers sa version pleine taille.

🔒 Deux titres de section : `Souvenirs d'un raid avec` / `4×4-raid`
⚠️ Mention `VIDEO disponible bientôt` — présente depuis 2020, aucune vidéo.

🔧 **Deux H1 sur cette page** (`Souvenirs d'un raid avec` et `4×4-raid` sont
balisés en H1). À corriger — un seul H1 par page.

### 🔒 Les 8 images de la galerie

```
Canon6D_Michael_15482-scaled.jpg
Canon6D_Michael_15545-scaled.jpg
Canon6D_Michael_15617-scaled.jpg
Canon6D_Michael_15558-scaled.jpg
2020/05/Canon6D_Michael_16895-scaled.jpg
2020/04/Canon6D_Michael_16942-scaled.jpg
Canon6D_Michael_16909-scaled.jpg
Canon6D_Michael_16631-scaled.jpg
```

---

# 11 · TÉMOIGNAGES

| | |
|---|---|
| 🔒 URL | `/temoignages/` |
| 🔒 Title | `Témoignages - 4x4-raid.com` |
| 🔒 Meta description | `Pierre-Laurent Fortès (France) - 5 séjours avec J.-L. Miolane` |
| 🔒 H1 | `Témoignages` |

**Actif SEO fort** — 8 témoignages nominatifs, dont un directeur général
L'Oréal et un directeur commercial Bardahl. À conserver intégralement.

🔧 **Ajouter le balisage `Review` / `AggregateRating`** — gain net, aucun risque.
⚠️ Vérifier l'accord des personnes citées avant remise en ligne (RGPD).

### 🔒 Les 8 témoignages — auteurs et contextes

| Auteur | Contexte |
|---|---|
| Pierre-Laurent Fortès | France — 5 séjours avec J.-L. Miolane |
| Thomas Dussous | Agence LFE |
| Frédéric Fievet | Directeur commercial BARDAHL Industrie |
| Nadine et Christian Reboul | France |
| Olivier ROS | Cabinet A.I.A. |
| Christian Boillat | Suisse |
| Mireille VIALA | France |
| Jean-Christophe Perrichon | DG L'Oréal Division Produits Professionnel (Suisse) |

Texte verbatim de chaque témoignage : voir la page source.

⚠️ Faute : le témoignage de Mireille Viala commence par « e rentre » → *Je rentre*

---

# 12 · PARTENAIRES

| | |
|---|---|
| 🔒 URL | `/partenaires/` |
| 🔒 Title | `Partenaires 4x4-raid - 4x4-raid.com` |
| 🔒 Meta description | `Prestige Voyages - Voyages de luxe` |
| 🔒 H1 | `Nos partenaires` |

### 🔒 Cinq partenaires — texte verbatim

| Partenaire | Lien sortant | Description |
|---|---|---|
| **Prestige Voyages** | `prestige-voyages.com` | Spécialiste du voyage de luxe : Hôtel de charme, Yacht et Jet Privé, Prestige Voyages est un créateur de voyages sur mesure et d'exception. |
| **Mauritiusveo** | `voyage.mauritiusveo.com` | Mauritiusveo organise votre séjour pour des vacances d'exception et une expérience de voyage unique. |
| **USAVeo** | `voyage.usaveo.com` | USAVeo organise votre séjour pour des vacances d'exception et une expérience de voyage unique aux Etats-Unis à New York, Miami … |
| **ChinaVeo** | `voyage.chinaveo.com` | ChinaVeo organise votre séjour pour des vacances d'exception et une expérience de voyage unique à Pekin, Xian, Shanghai, HongKong… |
| **SeychellesVeo** | `voyage.seychellesveo.com` | SeychellesVeo organise votre séjour pour des vacances d'exception et une expérience de voyage unique. |

⚠️ **Cinq liens sortants en `http://`, sans `rel`.** À vérifier :
- Les sites sont-ils encore en ligne ? Un lien vers un domaine expiré est nuisible.
- Passer en `https://` si disponible.
- Ajouter `rel="noopener"`. Si l'échange n'est pas contractuel, envisager `rel="nofollow"`.

---

# 13 · CONTACT

| | |
|---|---|
| 🔒 URL | `/contact/` |
| 🔒 Title | `Contact - 4x4-raid.com` |
| 🔒 Meta description | `Installés au MAROC depuis plus de 25 ans et étant sur place, nous avons les meilleurs ingrédients pour les plus belles aventures, parmi cet univers d'Atlas,` |
| 🔒 H1 | `Contactez nous :` |
| Modifiée | **2025-01-31** — la page la plus récemment mise à jour du site |

⚠️ Meta description tronquée en plein mot. À compléter.

### 🔒 Texte indexé — verbatim

> Installés au MAROC depuis plus de 25 ans et étant sur place, nous avons les meilleurs ingrédients pour les plus belles aventures, parmi cet univers d'Atlas, de déserts, canyons, pistes, hors-pistes, oueds, oasis, sable, dunes, pistes côtières, plages, bivouacs, bonnes adresses, etc….
>
> D'un simple accompagnement avec votre propre 4×4, SSV, Moto, Buggy, jusqu'à la réalisation avec tout compris on vous construira votre Raid 4×4 sur mesure dans l'esprit de vos souhaits.
>
> Jean Luc Miolane

### 🔒 Coordonnées — NAP à reproduire à l'identique

```
EMail     : info@4x4-raid.com
TELEPHONE : 00 212 661 08 55 50
Adresse   : Jean-Luc Miolane Organisation
            Douar Sugtana / Agafay — Marrakech
            BP 21042 – AZLI
            40019 Marrakech   MAROC
```

⚠️ Le **NAP** (Name–Address–Phone) doit être **strictement identique** partout,
y compris dans le balisage `LocalBusiness` et sur Google Business Profile.
Toute variation affaiblit le référencement local.

🔧 **Aucun formulaire n'existe sur cette page.** Seules des coordonnées.
En ajouter un est un gain, pas un risque.

---

# Récapitulatif des 13 URLs

| # | URL | H1 | Priorité SEO |
|---|---|---|---|
| 01 | `/` | Les raids de 4×4-raid au Maroc | 🔴 Maximale |
| 02 | `/circuits-raid-4x4-au-maroc/` | circuits raid 4×4 au maroc | 🔴 Maximale |
| 03 | `/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/` | Raid 4×4 sur mesure | 🔴 Maximale |
| 04 | `/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/` | RAIDS 4X4 POUR ENTREPRISES | 🟠 Haute |
| 05 | `/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/` | RAID 4×4 MARRAKECH | 🔴 Maximale |
| 06 | `/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/` | 3 excursions 4×4 à Marrakech | 🟠 Haute |
| 07 | `/guide-raids-4x4-maroc/` | Guide raids 4×4 AU Maroc | 🟠 Haute |
| 08 | `/decouvrir-le-maroc-en-4x4/` | Découvrir le Maroc en 4×4, SSV, Buggy et Moto | 🟡 Longue traîne |
| 09 | `/actualite-raids-4x4-maroc/` | Actualité | ⚠️ Page vide |
| 10 | `/photos-raids-4x4-maroc/` | PHOTOS raids 4×4 maroc | 🟡 Moyenne |
| 11 | `/temoignages/` | Témoignages | 🟠 Haute — preuve sociale |
| 12 | `/partenaires/` | Nos partenaires | 🟡 Faible |
| 13 | `/contact/` | Contactez nous : | 🟠 Haute — conversion |

---

# Arbitrages en attente

| # | Sujet | Options |
|---|---|---|
| 1 | **Années d'expérience** — 4 valeurs contradictoires (10 / 20 / 25 / 45) | Fixer deux chiffres définitifs : années de raid, années au Maroc |
| 2 | **Jour 7 de la Boucle Sud** — annoncé mais absent | Le fournir, ou corriger en 6 jours / 5 nuits |
| 3 | **Page Actualité** — vide | Alimenter · rediriger en 301 · conserver |
| 4 | **Fautes de frappe** | Corriger (recommandé) · conserver à l'identique |
| 5 | **Liens partenaires** | Vérifier que les 5 domaines sont actifs, passer en https |

---

# Ce que le portage doit garantir

Vérification à faire page par page avant mise en ligne :

- [ ] URL identique au caractère près, slash final compris
- [ ] `title` identique ou amélioré, jamais raccourci
- [ ] `meta description` identique ou complétée
- [ ] H1 unique, texte identique
- [ ] Hiérarchie H2/H3 conservée
- [ ] Texte intégral présent **dans le HTML servi**, pas injecté par JavaScript
- [ ] Liens internes en `<a href>` réels
- [ ] `canonical` auto-référencée
- [ ] Images avec alt rédigé, dimensions déclarées
- [ ] Présence dans le `sitemap.xml`
- [ ] Aucune chaîne de redirection

**Le test décisif :** `curl -s https://4x4-raid.com/<url> | grep "<un extrait du texte>"`
Si la commande ne renvoie rien, Google ne voit pas ce texte au premier passage.
C'est précisément ce que corrige le passage à Astro en sortie statique.
